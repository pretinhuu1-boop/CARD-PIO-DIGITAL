/**
 * ============================================================================
 * CONFIGURAÇÃO — Alooks Hair Studio Tatuapé
 * ============================================================================
 *
 * Coletado em 2026-08-02. Procedência e lacunas declaradas em
 * `scraped-stores/alooks-tatuape/`.
 * ============================================================================
 */

import type { StoreConfig } from './types';

export type { StoreConfig, StoreHours, StoreSocial } from './types';

export const store: StoreConfig = {
  name: 'Alooks Hair Studio',
  // Serviço se AGENDA. Os 378 itens têm preço público, mas nada vai para um
  // carrinho: cada serviço abre a conversa de agendamento.
  orderMode: 'enquiry',
  tagline: 'Salão de beleza · Tatuapé',
  description:
    'Cabelo, unhas, sobrancelhas, depilação e maquiagem na Rua Itapeti. Atendimento com hora marcada, de terça a sábado.',

  /*
    ⚠️ BLOQUEADO DE PROPÓSITO — NÃO PREENCHER SEM CONFIRMAR COM O SALÃO.

    O número 11 91304-2702 aparece na página Trinks desta unidade, mas tem
    FONTE ÚNICA e é diferente do fixo da ficha do Google, (11) 2892-9005. O
    Instagram é da marca com duas unidades e lista a do Aricanduva primeiro,
    com telefone próprio — não serve de confirmação.

    Link de WhatsApp errado manda o cliente da loja para o número de outra
    pessoa. String vazia desabilita todos os botões de WhatsApp, que é o
    comportamento certo enquanto o dado não estiver confirmado.
  */
  whatsapp: '',
  phoneDisplay: '(11) 2892-9005', // fixo da ficha do Google, confirmado

  address: 'R. Itapeti, 518 — Tatuapé, São Paulo - SP, 03324-002',
  city: 'Tatuapé, São Paulo',

  // Grade completa extraída dos aria-label da tabela do Google.
  hours: [
    { day: 'Domingo', time: null },
    { day: 'Segunda', time: null },
    { day: 'Terça a Sábado', time: '09h - 20h' },
  ],

  social: [
    {
      // Perfil da MARCA, com duas unidades. Rotulado como tal para não sugerir
      // que o conteúdo de lá é todo desta loja.
      label: '@alookshairstudio (perfil da marca)',
      url: 'https://www.instagram.com/alookshairstudio/',
    },
    {
      label: 'Agenda online no Trinks',
      url: 'https://www.trinks.com/alooks',
    },
  ],

  // Foto do próprio letreiro, publicada pela loja no Google Maps. É da loja.
  heroImage: '/loja/letreiro.webp',
  aboutImage: null,

  // Salão não entrega nem cobra pedido mínimo: sem checkout, nada disto vai
  // à tela. Explícito como não informado em vez de sumir do contrato.
  shippingFee: null,
  freeShippingThreshold: null,
  freeGiftThreshold: null,
  minimumOrder: 0,

  // A ficha do Google informa: crédito, débito e pagamento por aproximação.
  // Sem checkout o campo não aparece, mas o dado fica registrado.
  paymentMethods: ['Cartão de crédito', 'Cartão de débito', 'Pagamento por aproximação'],
};

/** Texto da mensagem do botão flutuante de WhatsApp (contato, fora do pedido). */
export const contactMessage =
  'Olá! Vi a página do Alooks Hair Studio e gostaria de agendar um horário.';
