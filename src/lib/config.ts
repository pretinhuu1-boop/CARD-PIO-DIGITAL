/**
 * ============================================================================
 * CONFIGURAÇÃO — TBT Lounge Tatuapé
 * ============================================================================
 *
 * Coletado em 2026-08-02. Procedência e lacunas declaradas em
 * `scraped-stores/tbt-lounge-tatuape/`.
 * ============================================================================
 */

import type { StoreConfig } from './types';

export type { StoreConfig, StoreHours, StoreSocial } from './types';

export const store: StoreConfig = {
  name: 'TBT Lounge',
  orderMode: 'cart',
  tagline: 'Bar e lounge · Tatuapé',
  description:
    'O famoso baile do TBT. Drinks, garrafas, narguilé e camarote na Rua Itapura.',

  // O Linktree da casa publica `wa.me/11951240157`, SEM o código do país —
  // assim o WhatsApp interpreta como número dos EUA. O correto, a partir do
  // telefone (11) 95124-0157, é 55 + 11 + 951240157.
  whatsapp: '5511951240157',
  phoneDisplay: '(11) 95124-0157',
  bookingUrl: null,

  address: 'R. Itapura, 1267 — Vila Gomes Cardim, São Paulo - SP',
  city: 'Tatuapé, São Paulo',

  // Grade completa não publicada em fonte nenhuma. "Consulte no WhatsApp" em
  // vez de inventar horário para uma casa noturna.
  hours: [{ day: 'Consulte no WhatsApp', time: null }],

  social: [
    { label: '@tbtloungetatuape', url: 'https://www.instagram.com/tbtloungetatuape' },
    { label: 'Cardápio completo', url: 'https://tbt-lounge.cluvi.com.br/tbt-lounge/menu-digital' },
  ],

  heroImage: '/loja/camarote.webp',
  aboutImage: null,

  // CORRIGIDO na v2. A v1 trazia `shippingFee: 0`, que a página renderizava
  // como "Grátis" — mas a procedência diz que frete NÃO foi verificado. Era
  // uma política de entrega afirmada em nome da casa sem nenhuma fonte.
  shippingFee: null,
  freeShippingThreshold: null,
  freeGiftThreshold: null,
  minimumOrder: 0,

  // CORRIGIDO na v2. A v1 listava Pix/crédito/débito/dinheiro, que é o chute
  // padrão do template, não dado desta casa.
  paymentMethods: [],
};

/** Texto da mensagem do botão flutuante de WhatsApp (contato, fora do pedido). */
export const contactMessage =
  'Olá! Gostaria de informações sobre mesas e camarotes no TBT Lounge.';
