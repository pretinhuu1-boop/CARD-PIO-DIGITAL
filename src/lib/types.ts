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
