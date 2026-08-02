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
   * Valor do frete em R$. `null` = **não informado** pela loja.
   *
   * Não use 0 para dizer "não sei": 0 significa gratuidade, e afirmar frete
   * grátis em nome do lojista sem fonte cria uma política de entrega que ele
   * nunca declarou. Com `null` a página escreve "a combinar".
   *
   * Este campo já foi APAGADO do schema por uma loja que não tinha o dado —
   * o efeito foi um contrato incompatível entre lojas. Ausência é valor, não
   * mudança de forma.
   */
  shippingFee: number | null;
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

  /**
   * Formas de pagamento oferecidas no checkout.
   *
   * `[]` = não informado: o campo some do checkout em vez de exibir uma lista
   * padrão que ninguém confirmou. A lista genérica "Pix / Crédito / Débito /
   * Dinheiro" é chute do template, não dado da loja.
   */
  paymentMethods: string[];

  /**
   * Imagem da seção "sobre" (caminho em /public), ou `null`.
   *
   * Existe para lojas cujo acervo de fotos é o próprio argumento de venda —
   * ateliê, salão, espaço físico.
   */
  aboutImage: string | null;
}

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
