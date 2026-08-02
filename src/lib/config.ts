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

export interface StoreHours {
  /** Ex.: 'Seg a Sex' */
  day: string;
  /** Ex.: '9h - 18h' — use `null` para "Fechado" */
  time: string | null;
}

export interface StoreSocial {
  /** Rótulo exibido. Ex.: '@minhaloja' */
  label: string;
  /** URL completa. Ex.: 'https://instagram.com/minhaloja' */
  url: string;
}

export interface StoreConfig {
  /** Nome da loja. Aparece no header, hero, footer, título da aba e no pedido. */
  name: string;
  /** Frase curta acima do nome no hero. Ex.: 'Confeitaria artesanal' */
  tagline: string;
  /** Descrição de 1-2 linhas exibida no hero e usada no SEO. */
  description: string;

  /**
   * WhatsApp que RECEBE os pedidos.
   * Formato: apenas dígitos, com código do país + DDD. Ex.: '5511999998888'.
   * Deixe string vazia para desabilitar os botões de WhatsApp.
   */
  whatsapp: string;
  /** Telefone formatado para exibição. Ex.: '(11) 99999-8888' */
  phoneDisplay: string;

  /** Endereço completo em uma linha. Use string vazia se a loja não tem ponto físico. */
  address: string;
  /** Cidade/região curta exibida no hero. Ex.: 'São Paulo - SP' */
  city: string;

  /** Horários de funcionamento exibidos no footer. */
  hours: StoreHours[];

  /** Redes sociais exibidas no footer. Deixe [] para ocultar. */
  social: StoreSocial[];

  /**
   * Imagem de fundo do hero (URL ou caminho em /public).
   * `null` = hero neutro sem imagem (padrão do template em branco).
   * Quando preenchida, o texto do hero passa a branco sobre um véu escuro
   * que garante contraste mínimo AA — não remova o véu.
   */
  heroImage: string | null;

  /**
   * Valor mínimo do subtotal para frete grátis.
   * `null` desativa a barra de progresso de frete grátis.
   */
  freeShippingThreshold: number | null;
  /**
   * Valor mínimo do subtotal para liberar brinde.
   * `null` desativa a barra de progresso de brinde.
   */
  freeGiftThreshold: number | null;
  /**
   * Valor mínimo do pedido. O checkout fica bloqueado abaixo disso.
   * Use 0 para não exigir mínimo.
   */
  minimumOrder: number;
}

/**
 * Loja: Caracol Chocolates Cafeteria Tatuapé
 * Coletado em 2026-08-02 de Google Maps, Instagram (@caracol.tatuape),
 * Linktree e iFood. Ver `scraped-stores/caracol-chocolates-tatuape/`.
 *
 * Frete e formas de pagamento NÃO entram aqui: nenhuma fonte pública informa
 * a política real da loja, e o cardápio não coleta dados do cliente. Os dois
 * assuntos se resolvem na conversa do WhatsApp, com quem sabe a resposta.
 */
export const store: StoreConfig = {
  name: 'Caracol Chocolates Tatuapé',
  tagline: 'Cafeteria e chocolateria',
  description:
    'Cafeteria, eventos e o melhor do chocolate de Gramado, no coração do Tatuapé.',

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

  heroImage: '/produtos/croissant-chocolate-morangos.webp',

  freeShippingThreshold: null,
  freeGiftThreshold: null,
  minimumOrder: 35, // confirmado no iFood
};

/** Texto da mensagem do botão flutuante de WhatsApp (contato, fora do pedido). */
export const contactMessage =
  'Olá! Vi o cardápio da Caracol Tatuapé e gostaria de mais informações.';
