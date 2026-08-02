/**
 * ============================================================================
 * CONTRATO DE DADOS — NÃO EDITE AO MONTAR UMA LOJA
 * ============================================================================
 *
 * As formas que `src/lib/data.ts` preenche. Vivem separadas do conteúdo por um
 * motivo medido: quando cada loja carregava a própria cópia das interfaces
 * dentro do seu `data.ts`, o contrato divergia loja a loja sem nada acusar —
 * uma ganhava um campo novo, as outras ficavam para trás, e a divergência só
 * aparecia quando alguém tentava reaproveitar um componente.
 *
 * Campo novo entra aqui, uma vez, para todas.
 * ============================================================================
 */

/** Tom visual de um selo. Mapeado para as cores semânticas em globals.css. */
export type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'info';

export interface Badge {
  /** Texto exibido no selo. Ex.: 'Mais vendido' */
  label: string;
  tone: BadgeTone;
}

export interface Product {
  /** Identificador único e estável. Usado no carrinho e no pedido. */
  id: string;
  name: string;
  description: string;
  /**
   * Preço de venda em R$, ou `null` para "sob consulta".
   *
   * `null` não é lacuna a preencher: é a resposta correta quando a loja não
   * publica preço em fonte nenhuma. Peça artesanal, sob medida ou orçada caso
   * a caso funciona assim. Um catálogo inteiro com `price: null` faz a página
   * virar expositor sozinha — ver `src/lib/format.ts`.
   *
   * NUNCA preencha com preço vindo de busca genérica do ramo: isso é preço de
   * concorrente publicado em nome desta loja.
   */
  price: number | null;
  /**
   * `true` quando a fonte diz "a partir de" — o valor é PISO, não preço final.
   *
   * Publicar piso como valor fechado subestima a conta do cliente. Marque item
   * a item, exatamente como a fonte marca; não deduza pela categoria.
   */
  priceFrom?: boolean;
  /** Preço "de" riscado. Omita quando não houver desconto. */
  originalPrice?: number;
  /** Caminho da imagem em /public, ou `null` para usar o placeholder. */
  image: string | null;
  /** Deve corresponder a um `slug` de `categories`. */
  category: string;
  badge?: Badge;
  /** Rendimento/porção. Ex.: '12 unidades'. Omita se não se aplica. */
  servings?: string;
  /** Produtos indisponíveis aparecem esmaecidos e não podem ser adicionados. */
  available: boolean;
}

export interface Category {
  /** Âncora da seção e chave de navegação. Deve bater com `Product.category`. */
  slug: string;
  name: string;
  /** Emoji ou string vazia para não exibir ícone. */
  emoji: string;
}

export interface Combo {
  id: string;
  name: string;
  description: string;
  /** IDs de `products`. Ao adicionar o combo, todos entram no carrinho. */
  productIds: string[];
  /** Preço promocional do conjunto. */
  comboPrice: number;
}

export interface Review {
  id: string;
  name: string;
  /** Iniciais exibidas no avatar. */
  initials: string;
  /** 1 a 5. */
  rating: number;
  text: string;
  date: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface AboutSection {
  title: string;
  subtitle: string;
  paragraphs: string[];
  values: { icon: string; title: string; description: string }[];
}

export interface NavSection {
  id: string;
  /** Rótulo curto, usado no header. */
  label: string;
  /** Rótulo do rodapé, quando ele usa um nome mais longo. */
  footerLabel?: string;
}

/* -------------------------------------------------------------------------- */
/* CONFIGURAÇÃO DA LOJA                                                        */
/* -------------------------------------------------------------------------- */

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

/**
 * Como o cliente fecha negócio.
 *
 *   'cart'     escolhe itens, soma, envia o pedido — comida, produto físico
 *   'enquiry'  fala com a loja sobre um item — serviço agendado, peça orçada
 *
 * NÃO é derivável do dado: um salão publica preço de 378 serviços e mesmo
 * assim nada ali vai para um carrinho, porque corte de cabelo se agenda. É
 * fato do negócio, então é decisão declarada — com fonte, no arquivo de
 * procedência da loja.
 */
export type OrderMode = 'cart' | 'enquiry';

export interface StoreConfig {
  /** Nome da loja. Aparece no header, hero, footer, título da aba e no pedido. */
  name: string;
  /** Carrinho ou conversa. Ver `OrderMode`. */
  orderMode: OrderMode;
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

  /**
   * Canal de agendamento/orçamento quando NÃO há WhatsApp confirmado.
   *
   * Existe porque "sem WhatsApp" não pode virar "sem nenhuma ação": uma
   * página de serviço sem caminho para agendar não serve para nada. Mas
   * publicar um número não confirmado é pior — manda o cliente da loja para
   * o telefone de outra pessoa.
   *
   * `whatsapp` vence quando os dois existem. `null` quando não há canal
   * alternativo.
   */
  bookingUrl: string | null;

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
