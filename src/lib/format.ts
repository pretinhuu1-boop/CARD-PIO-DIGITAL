/**
 * ============================================================================
 * FORMATO DA PÁGINA — ARQUIVO DERIVADO, NÃO EDITE
 * ============================================================================
 *
 * O formato NÃO é uma preferência: sai do dado que a fonte sustenta.
 *
 *   preço público em algum produto  ->  'cardapio'   (catálogo + carrinho)
 *   produtos sem preço nenhum       ->  'expositor'  (a foto é o produto)
 *   nenhum produto                  ->  'landing'    (apresentação + contato)
 *
 * Forçar cardápio numa loja sem preço obriga a inventar número, e o número
 * inventado sai publicado em nome do lojista. Por isso a regra mora no código
 * e não num campo que alguém pode preencher errado.
 *
 * Este módulo importa de `data.ts` e nunca o contrário — mantém a direção do
 * grafo de módulos numa via só.
 * ============================================================================
 */

import {
  products,
  combos,
  reviews,
  faqs,
  type Product,
  type NavSection,
} from './data';
import { store } from './config';
import type { OrderMode } from './types';

export type StoreFormat = 'cardapio' | 'expositor' | 'landing';

/**
 * Produto com preço resolvido.
 *
 * Só isto entra no carrinho. Estreitar o tipo aqui evita espalhar checagem de
 * `null` por CartDrawer, store, whatsapp e bottom sheet — o compilador passa a
 * garantir que item sem preço nunca chega ao checkout.
 */
export type SellableProduct = Product & { price: number };

/** Tem preço e está disponível: pode ir para o carrinho. */
export function isSellable(product: Product): product is SellableProduct {
  return product.available && product.price !== null;
}

/** Tem preço, disponível ou não: a página pode exibir valor. */
export function hasPrice(product: Product): product is SellableProduct {
  return product.price !== null;
}

export function deriveStoreFormat(
  catalog: Product[],
  orderMode: OrderMode,
): StoreFormat {
  if (catalog.length === 0) return 'landing';
  // Preço + carrinho = cardápio. Preço sem carrinho (serviço agendado) e
  // catálogo sem preço (peça orçada) caem os dois no expositor: a página
  // mostra o item e a negociação acontece na conversa.
  if (catalog.some(hasPrice) && orderMode === 'cart') return 'cardapio';
  return 'expositor';
}

/** Formato desta loja. Recalculado a cada build a partir de `data.ts`. */
export const storeFormat: StoreFormat = deriveStoreFormat(
  products,
  store.orderMode,
);

/**
 * Só o cardápio tem checkout.
 *
 * Expositor e landing não ganham ícone de carrinho: controle que não leva a
 * lugar nenhum é pior que a ausência dele.
 */
export const hasCheckout = storeFormat === 'cardapio';

/** O expositor conversa item a item pelo WhatsApp, sem carrinho. */
export const hasPerItemContact = storeFormat === 'expositor';

/** Landing não tem catálogo, então não tem busca nem navegação por categoria. */
export const hasCatalog = storeFormat !== 'landing';

/* -------------------------------------------------------------------------- */
/* NAVEGAÇÃO                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Derivada do conteúdo: seção sem dado não vira link para âncora inexistente.
 * Link de menu apontando para âncora que não existe é defeito, não enfeite.
 */
export const navSections: NavSection[] = [
  ...(hasCatalog
    ? [
        {
          id: 'catalogo',
          label: storeFormat === 'expositor' ? 'Peças' : 'Cardápio',
        },
      ]
    : []),
  ...(hasCheckout && combos.length > 0
    ? [{ id: 'combos', label: 'Combos' }]
    : []),
  ...(reviews.length > 0 ? [{ id: 'avaliacoes', label: 'Avaliações' }] : []),
  { id: 'sobre', label: 'Sobre' },
  ...(faqs.length > 0
    ? [{ id: 'faq', label: 'FAQ', footerLabel: 'Perguntas frequentes' }]
    : []),
];
