'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { findSellableById, type Product } from '@/lib/data';
import { isSellable, type SellableProduct } from '@/lib/format';

/**
 * Carrinho global sem dependência externa.
 *
 * Linhas do pedido são identificadas por `lineId` (produto + observação), e não
 * pelo id do produto: o mesmo item com observações diferentes vira duas linhas,
 * como numa comanda real.
 */

export interface CartItem {
  /** `${product.id}::${notes}` — chave estável da linha do pedido. */
  lineId: string;
  /** Só produto com preço entra no carrinho — ver `isSellable`. */
  product: SellableProduct;
  quantity: number;
  /** Observação do cliente para esta linha. String vazia quando não há. */
  notes: string;
}

export interface CustomerData {
  name: string;
  phone: string;
  /** 'entrega' exige endereço; 'retirada' não. */
  fulfillment: 'entrega' | 'retirada';
  address: string;
  payment: string;
  /** Troco para quanto, quando o pagamento é em dinheiro. */
  changeFor: string;
}

interface CartState {
  items: CartItem[];
  customer: CustomerData;
  searchQuery: string;
  selectedCategory: string;
}

const STORAGE_KEY = 'cardapio:cart:v1';

const emptyCustomer: CustomerData = {
  name: '',
  phone: '',
  fulfillment: 'entrega',
  address: '',
  payment: '',
  changeFor: '',
};

const initialState: CartState = {
  items: [],
  customer: emptyCustomer,
  searchQuery: '',
  selectedCategory: 'todos',
};

let state: CartState = initialState;

const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return state;
}

/**
 * O servidor nunca tem carrinho. Devolver sempre o estado inicial evita
 * divergência de hidratação com o que foi restaurado do localStorage.
 */
function getServerSnapshot() {
  return initialState;
}

function makeLineId(productId: string, notes: string) {
  return `${productId}::${notes.trim()}`;
}

/* -------------------------------------------------------------------------- */
/* Persistência                                                                */
/* -------------------------------------------------------------------------- */

function persist() {
  if (typeof window === 'undefined') return;
  try {
    const payload = {
      items: state.items.map((i) => ({
        productId: i.product.id,
        quantity: i.quantity,
        notes: i.notes,
      })),
      customer: state.customer,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // localStorage indisponível (modo privado, cota cheia). Segue em memória.
  }
}

let hydrated = false;

/**
 * Restaura o carrinho salvo. Só roda uma vez, após a montagem, e reconstrói
 * cada linha a partir do catálogo atual — assim um preço que mudou desde a
 * última visita nunca entra na nota do pedido, e produtos removidos do
 * catálogo somem em vez de quebrar.
 */
function hydrate() {
  if (hydrated || typeof window === 'undefined') return;
  hydrated = true;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    const parsed = JSON.parse(raw) as {
      items?: { productId: string; quantity: number; notes: string }[];
      customer?: Partial<CustomerData>;
    };

    const items: CartItem[] = [];
    for (const saved of parsed.items ?? []) {
      const product = findSellableById(saved.productId);
      // `isSellable` cobre indisponível E sem preço: um item que perdeu o
      // preço desde a última visita não pode voltar ao carrinho valendo zero.
      if (!product || !isSellable(product)) continue;
      const quantity = Math.max(1, Math.floor(Number(saved.quantity) || 1));
      const notes = typeof saved.notes === 'string' ? saved.notes : '';
      items.push({ lineId: makeLineId(product.id, notes), product, quantity, notes });
    }

    state = {
      ...state,
      items,
      customer: { ...emptyCustomer, ...(parsed.customer ?? {}) },
    };
    emitChange();
  } catch {
    // Payload corrompido: ignora e começa com carrinho vazio.
  }
}

/* -------------------------------------------------------------------------- */
/* Ações                                                                       */
/* -------------------------------------------------------------------------- */

function addItem(product: Product, quantity = 1, notes = '') {
  // Estreita para SellableProduct: daqui pra baixo o compilador garante preço.
  if (!isSellable(product)) return;

  const qty = Math.max(1, Math.floor(quantity));
  const cleanNotes = notes.trim();
  const lineId = makeLineId(product.id, cleanNotes);
  const existing = state.items.find((i) => i.lineId === lineId);

  state = {
    ...state,
    items: existing
      ? state.items.map((i) =>
          i.lineId === lineId ? { ...i, quantity: i.quantity + qty } : i,
        )
      : [...state.items, { lineId, product, quantity: qty, notes: cleanNotes }],
  };

  persist();
  emitChange();
}

function removeItem(lineId: string) {
  state = { ...state, items: state.items.filter((i) => i.lineId !== lineId) };
  persist();
  emitChange();
}

function updateQuantity(lineId: string, quantity: number) {
  if (quantity <= 0) {
    removeItem(lineId);
    return;
  }
  state = {
    ...state,
    items: state.items.map((i) => (i.lineId === lineId ? { ...i, quantity } : i)),
  };
  persist();
  emitChange();
}

function clearCart() {
  state = { ...state, items: [] };
  persist();
  emitChange();
}

function setCustomer(patch: Partial<CustomerData>) {
  state = { ...state, customer: { ...state.customer, ...patch } };
  persist();
  emitChange();
}

function setSearchQuery(searchQuery: string) {
  state = { ...state, searchQuery };
  emitChange();
}

function setSelectedCategory(selectedCategory: string) {
  state = { ...state, selectedCategory };
  emitChange();
}

/* -------------------------------------------------------------------------- */
/* Hook                                                                        */
/* -------------------------------------------------------------------------- */

export function useCart() {
  const snap = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    hydrate();
  }, []);

  const total = snap.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const count = snap.items.reduce((sum, item) => sum + item.quantity, 0);

  /** Soma de todas as linhas de um mesmo produto, independente da observação. */
  const quantityOf = (productId: string) =>
    snap.items
      .filter((i) => i.product.id === productId)
      .reduce((sum, i) => sum + i.quantity, 0);

  return {
    items: snap.items,
    customer: snap.customer,
    searchQuery: snap.searchQuery,
    selectedCategory: snap.selectedCategory,
    total,
    count,
    quantityOf,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    setCustomer,
    setSearchQuery,
    setSelectedCategory,
  };
}
