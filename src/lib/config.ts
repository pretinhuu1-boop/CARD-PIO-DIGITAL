/**
 * ============================================================================
 * CONFIGURAÇÃO — Caracol Chocolates Cafeteria Tatuapé
 * ============================================================================
 *
 * Coletado em 2026-08-02. Procedência e lacunas declaradas em
 * `scraped-stores/caracol-chocolates-tatuape/`.
 * ============================================================================
 */

import type { StoreConfig } from './types';

export type { StoreConfig, StoreHours, StoreSocial } from './types';

export const store: StoreConfig = {
  name: 'Caracol Chocolates Tatuapé',
  orderMode: 'cart', // cafeteria: o cliente monta o pedido e envia
  tagline: 'Cafeteria e chocolateria',
  description:
    'Cafeteria, eventos e o melhor do chocolate de Gramado, no coração do Tatuapé.',

  // O fixo do Maps é (11) 2365-3520, número DIFERENTE. Este é o WhatsApp que a
  // própria loja publica no Linktree, e é o canal de pedido.
  whatsapp: '5511997365921', // linktr.ee/caracol.chocolates.tatuape
  phoneDisplay: '(11) 99736-5921',

  address: 'R. Itapeti, 601 — Tatuapé, São Paulo - SP, 03324-002',
  city: 'São Paulo - SP',

  // Instagram (@caracol.tatuape): "Ter a sáb 9h-18h/dom 10h-19h"
  hours: [
    { day: 'Segunda', time: null },
    { day: 'Terça a Sábado', time: '09h - 18h' },
    { day: 'Domingo', time: '10h - 19h' },
  ],

  social: [
    { label: '@caracol.tatuape', url: 'https://www.instagram.com/caracol.tatuape' },
    {
      label: 'Pedir no iFood',
      url: 'https://www.ifood.com.br/delivery/sao-paulo-sp/caracol-chocolates-tatuape-vila-gomes-cardim/d527f516-05cc-4d6d-888e-c0806ab9edfc',
    },
  ],

  // Sem foto de fachada em fonte alguma. O hero usa foto própria da loja
  // (Croissant de Chocolate com Morangos), vinda do iFood.
  heroImage: '/loja/hero.webp',
  aboutImage: null,

  // NÃO ENCONTRADO em fonte alguma. `null` faz a página escrever "a combinar"
  // em vez de prometer entrega grátis que a loja nunca declarou.
  shippingFee: null,
  freeShippingThreshold: null,
  freeGiftThreshold: null,
  minimumOrder: 35, // confirmado no iFood

  // NÃO ENCONTRADO. Lista vazia esconde o campo no checkout — a lista genérica
  // do template seria chute nosso publicado em nome da loja.
  paymentMethods: [],
};

/** Texto da mensagem do botão flutuante de WhatsApp (contato, fora do pedido). */
export const contactMessage =
  'Olá! Gostaria de mais informações sobre a Caracol Chocolates Tatuapé.';
