/**
 * ============================================================================
 * CONFIGURAÇÃO — Restaurante Istambul Tatuapé (halal)
 * ============================================================================
 *
 * Coletado em 2026-08-02. Procedência e lacunas declaradas em
 * `scraped-stores/istambul-tatuape/`.
 * ============================================================================
 */

import type { StoreConfig } from './types';

export type { StoreConfig, StoreHours, StoreSocial } from './types';

export const store: StoreConfig = {
  name: 'Restaurante Istambul',
  orderMode: 'cart',
  tagline: 'Culinária árabe e turca · halal',
  description:
    'Shawarma, esfihas e pratos na brasa no Tatuapé. Salão para refeição no local e pedidos por WhatsApp.',

  whatsapp: '5511959343335', // (11) 95934-3335 — Maps e cardápio online
  phoneDisplay: '(11) 95934-3335',
  bookingUrl: null,

  // O CEP que o Google registra (15390-000) é do interior e não bate com o
  // Tatuapé (03xxx); foi omitido de propósito em vez de repetido. Ficha não
  // reivindicada tem dado sujo.
  address: 'R. Itapura, 1342 — Vila Gomes Cardim, São Paulo - SP',
  city: 'Tatuapé, São Paulo',

  hours: [
    { day: 'Segunda', time: null },
    { day: 'Terça a Domingo', time: '11h - 23h' },
  ],

  social: [
    {
      label: '@restauranteistambul2',
      url: 'https://www.instagram.com/restauranteistambul2/',
    },
    {
      label: 'Cardápio completo e pedido online',
      url: 'https://restauranteistambulhalal-tatuape.pedido.app.br/cardapio/',
    },
  ],

  heroImage: '/loja/salao.webp',
  aboutImage: null,

  // CORRIGIDO na v2. A v1 trazia 0, e a página escrevia "a combinar" por causa
  // de um remendo no montador da mensagem. Agora a ausência está no dado: o
  // cardápio online só revela frete depois de escolher endereço.
  shippingFee: null,
  freeShippingThreshold: null,
  freeGiftThreshold: null,
  minimumOrder: 0,

  // CORRIGIDO na v2. A v1 listava Pix/crédito/débito/dinheiro — chute padrão
  // do template. A procedência diz que formas de pagamento não foram
  // verificadas.
  paymentMethods: [],
};

/** Texto da mensagem do botão flutuante de WhatsApp (contato, fora do pedido). */
export const contactMessage =
  'Olá! Vi o cardápio do Restaurante Istambul e gostaria de fazer um pedido.';
