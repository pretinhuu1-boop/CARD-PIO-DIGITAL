'use client';

import { useSyncExternalStore } from 'react';
import { type Product } from '@/lib/data';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  favorites: string[];
  searchQuery: string;
  selectedCategory: string;
}

type Listener = () => void;

let state: CartState = {
  items: [],
  favorites: [],
  searchQuery: '',
  selectedCategory: 'todos',
};

const listeners = new Set<Listener>();

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return state;
}

function addItem(product: Product) {
  const existing = state.items.find((i) => i.product.id === product.id);
  if (existing) {
    state = {
      ...state,
      items: state.items.map((i) =>
        i.product.id === product.id
          ? { ...i, quantity: i.quantity + 1 }
          : i,
      ),
    };
  } else {
    state = {
      ...state,
      items: [...state.items, { product, quantity: 1 }],
    };
  }
  emitChange();
}

function removeItem(productId: string) {
  state = {
    ...state,
    items: state.items.filter((i) => i.product.id !== productId),
  };
  emitChange();
}

function updateQuantity(productId: string, quantity: number) {
  if (quantity <= 0) {
    removeItem(productId);
    return;
  }
  state = {
    ...state,
    items: state.items.map((i) =>
      i.product.id === productId ? { ...i, quantity } : i,
    ),
  };
  emitChange();
}

function clearCart() {
  state = { ...state, items: [] };
  emitChange();
}

function toggleFavorite(productId: string) {
  const isFav = state.favorites.includes(productId);
  state = {
    ...state,
    favorites: isFav
      ? state.favorites.filter((id) => id !== productId)
      : [...state.favorites, productId],
  };
  emitChange();
}

function setSearchQuery(query: string) {
  state = { ...state, searchQuery: query };
  emitChange();
}

function setSelectedCategory(category: string) {
  state = { ...state, selectedCategory: category };
  emitChange();
}

export function useCart() {
  const snap = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const total = snap.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const count = snap.items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    items: snap.items,
    favorites: snap.favorites,
    searchQuery: snap.searchQuery,
    selectedCategory: snap.selectedCategory,
    total,
    count,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleFavorite,
    setSearchQuery,
    setSelectedCategory,
  };
}
