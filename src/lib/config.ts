/**
 * ============================================================================
 * CONFIGURAÇÃO DA LOJA — Kokedami, Arte com Plantas
 * ============================================================================
 *
 * Coletado em 2026-08-02. Fontes em
 * `scraped-stores/kokedami-tatuape/kokedami-tatuape.md`.
 *
 * Esta loja não vende por carrinho: não há preço público e cada peça é
 * artesanal. Toda ação leva para o WhatsApp.
 * ============================================================================
 */

export interface StoreHours {
  day: string;
  time: string | null;
}

export interface StoreSocial {
  label: string;
  url: string;
}

export interface StoreConfig {
  name: string;
  tagline: string;
  description: string;

  /** Apenas dígitos, com país + DDD. Vazio desabilita os botões. */
  whatsapp: string;
  phoneDisplay: string;

  address: string;
  city: string;

  hours: StoreHours[];
  social: StoreSocial[];

  /** Foto de capa. `null` = hero neutro. */
  heroImage: string | null;
  /** Segunda foto, usada na seção "sobre". */
  aboutImage: string | null;
}

export const store: StoreConfig = {
  name: 'Kokedami',
  tagline: 'Arte com plantas',
  description:
    'Kokedamas montadas à mão no Tatuapé. Cada peça é única — a escolha da planta e do suporte acontece na conversa.',

  // Linktree da bio do Instagram. A bio traz "551197530.7287" com um ponto
  // digitado por engano no meio; o número correto é o do Google Maps.
  whatsapp: '5511975307287',
  phoneDisplay: '(11) 97530-7287',

  address: 'R. Itapeti, 622 — Tatuapé, São Paulo - SP, 03324-002',
  city: 'Tatuapé, São Paulo',

  // Google Maps mostra "Abre às 14:00" no domingo. A grade completa não é
  // publicada nem no Maps nem no Instagram — confirmar com a loja.
  hours: [{ day: 'Aberto', time: 'a partir das 14h' }],

  social: [
    { label: '@koke.da.mi', url: 'https://www.instagram.com/koke.da.mi/' },
  ],

  heroImage: '/loja/fachada.webp',
  aboutImage: '/loja/interior.webp',
};

/** Mensagem do botão flutuante de WhatsApp (contato geral). */
export const contactMessage =
  'Olá! Vi o expositor da Kokedami e queria saber mais sobre as peças.';

/** Mensagem ao falar sobre uma peça específica do expositor. */
export function pieceMessage(title: string): string {
  return `Olá! Vi a peça "${title}" no expositor da Kokedami e queria saber mais.`;
}
