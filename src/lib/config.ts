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

  /** Valor do frete padrão em R$. Use 0 para frete sempre grátis. */
  shippingFee: number;
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

  /** Formas de pagamento oferecidas na etapa de checkout. */
  paymentMethods: string[];
}

/**
 * Loja: Restaurante Istambul Tatuapé (halal)
 * Coletado em 2026-08-02. Procedência em
 * `scraped-stores/istambul-tatuape/istambul-tatuape.md`.
 *
 * NÃO VERIFICADO (confirmar antes de publicar):
 *   - frete e pedido mínimo: o cardápio online não expõe sem escolher endereço
 *   - formas de pagamento: nenhuma fonte lista
 */
export const store: StoreConfig = {
  name: 'Restaurante Istambul',
  tagline: 'Culinária árabe e turca · halal',
  description:
    'Shawarma, esfihas e pratos na brasa no Tatuapé. Salão para refeição no local e pedidos por WhatsApp.',

  whatsapp: '5511959343335', // (11) 95934-3335 — Maps e cardápio online
  phoneDisplay: '(11) 95934-3335',

  // O CEP que o Google registra (15390-000) é do interior e não bate com o
  // Tatuapé; foi omitido de propósito em vez de repetido.
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

  shippingFee: 0,
  freeShippingThreshold: null,
  freeGiftThreshold: null,
  minimumOrder: 0,

  paymentMethods: ['Pix', 'Cartão de crédito', 'Cartão de débito', 'Dinheiro'],
};

/** Texto da mensagem do botão flutuante de WhatsApp (contato, fora do pedido). */
export const contactMessage =
  'Olá! Vi o cardápio do Restaurante Istambul e gostaria de fazer um pedido.';
