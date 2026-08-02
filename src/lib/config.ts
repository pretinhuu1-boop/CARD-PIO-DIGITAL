/**
 * ============================================================================
 * CONFIGURAÇÃO DA LOJA — ARQUIVO DE PREENCHIMENTO
 * ============================================================================
 *
 * Este é o ÚNICO arquivo que precisa ser editado para trocar a loja do
 * template. Nenhum componente contém texto, telefone ou endereço fixo.
 *
 * Para as cores e fontes, edite `src/app/globals.css` (bloco IDENTIDADE VISUAL).
 *
 * Campos marcados com «PREENCHER» são placeholders neutros.
 * ============================================================================
 */

import type { StoreConfig } from './types';

export type { StoreConfig, StoreHours, StoreSocial } from './types';


export const store: StoreConfig = {
  name: 'Nome da Loja', // «PREENCHER»
  tagline: 'Categoria do negócio', // «PREENCHER»
  description:
    'Descrição curta da loja em uma ou duas linhas, usada no hero e no SEO.', // «PREENCHER»

  whatsapp: '', // «PREENCHER» — ex.: '5511999998888'
  phoneDisplay: '(00) 00000-0000', // «PREENCHER»

  address: 'Rua, número — Bairro, Cidade', // «PREENCHER»
  city: 'Cidade - UF', // «PREENCHER»

  hours: [
    { day: 'Seg a Sex', time: '09h - 18h' },
    { day: 'Sábado', time: '09h - 14h' },
    { day: 'Domingo', time: null },
  ],

  social: [], // «PREENCHER» — ex.: [{ label: '@minhaloja', url: 'https://instagram.com/minhaloja' }]

  heroImage: null,
  aboutImage: null,

  shippingFee: null, // «PREENCHER» — null = "a combinar", 0 = grátis de fato
  freeShippingThreshold: null,
  freeGiftThreshold: null,
  minimumOrder: 0,

  // «PREENCHER» com o que a loja de fato aceita. Vazio esconde o campo — é
  // melhor não perguntar do que oferecer uma forma que a loja não aceita.
  paymentMethods: [],
};

/** Texto da mensagem do botão flutuante de WhatsApp (contato, fora do pedido). */
export const contactMessage = 'Olá! Gostaria de mais informações.';
