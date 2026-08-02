/**
 * ============================================================================
 * CONFIGURAÇÃO — Kokedami · Arte com Plantas (Tatuapé)
 * ============================================================================
 *
 * Coletado em 2026-08-02. Procedência e lacunas declaradas em
 * `scraped-stores/kokedami-tatuape/`.
 * ============================================================================
 */

import type { StoreConfig } from './types';

export type { StoreConfig, StoreHours, StoreSocial } from './types';

export const store: StoreConfig = {
  name: 'Kokedami',
  // Peça única e orçada na conversa: não existe carrinho aqui. Combinado com
  // `price: null` em todos os itens, a página se monta como expositor.
  orderMode: 'enquiry',
  tagline: 'Arte com plantas',
  description:
    'Kokedamas montadas à mão no Tatuapé. Cada peça é única — a escolha da planta e do suporte acontece na conversa.',

  // A bio do Instagram traz "551197530.7287", com um ponto digitado por engano
  // no meio. O número correto foi confirmado contra o telefone do Google Maps.
  whatsapp: '5511975307287',
  phoneDisplay: '(11) 97530-7287',
  bookingUrl: null,

  address: 'R. Itapeti, 622 — Tatuapé, São Paulo - SP, 03324-002',
  city: 'Tatuapé, São Paulo',

  // O Maps mostra só "Abre às 14:00" e não expõe a grade sem interação; o
  // Instagram não informa. Publicar uma grade completa aqui seria inventá-la.
  hours: [{ day: 'Aberto', time: 'a partir das 14h' }],

  social: [
    { label: '@koke.da.mi', url: 'https://www.instagram.com/koke.da.mi/' },
  ],

  heroImage: '/loja/fachada.webp',
  aboutImage: '/loja/interior.webp',

  // Sem checkout, nenhum destes campos chega à tela. Ficam explícitos como
  // "não informado" em vez de sumirem do contrato.
  shippingFee: null,
  freeShippingThreshold: null,
  freeGiftThreshold: null,
  minimumOrder: 0,
  paymentMethods: [],
};

/** Texto da mensagem do botão flutuante de WhatsApp (contato, fora do pedido). */
export const contactMessage =
  'Olá! Vi o expositor da Kokedami e queria saber mais sobre as peças.';
