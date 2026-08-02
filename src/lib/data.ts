/**
 * ============================================================================
 * CATÁLOGO — ARQUIVO DE PREENCHIMENTO
 * ============================================================================
 *
 * Produtos, categorias, combos, avaliações, FAQ e a seção "sobre".
 * Dados de contato/loja ficam em `src/lib/config.ts`.
 *
 * IMAGENS: todo produto tem `image: null` neste template em branco. A grade
 * renderiza um placeholder neutro quando `image` é `null`, então o layout
 * continua correto sem nenhuma imagem. Ao preencher, use caminhos locais
 * (ex.: '/produtos/nome-do-produto.webp') e não URLs externas.
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
  /** Preço de venda em R$. */
  price: number;
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
  /** Usado no filtro. Deve bater com `Product.category`. */
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

/* -------------------------------------------------------------------------- */
/* CATEGORIAS                                                                  */
/* -------------------------------------------------------------------------- */
/* A categoria 'todos' é obrigatória e sempre a primeira.                      */

export const categories: Category[] = [
  { slug: 'todos', name: 'Todos', emoji: '' },
  { slug: 'categoria-1', name: 'Categoria 1', emoji: '' },
  { slug: 'categoria-2', name: 'Categoria 2', emoji: '' },
  { slug: 'categoria-3', name: 'Categoria 3', emoji: '' },
  { slug: 'categoria-4', name: 'Categoria 4', emoji: '' },
  { slug: 'categoria-5', name: 'Categoria 5', emoji: '' },
];

/* -------------------------------------------------------------------------- */
/* PRODUTOS                                                                    */
/* -------------------------------------------------------------------------- */
/* 15 itens de exemplo distribuídos nas 5 categorias, sem imagem.              */
/* Substitua nome, descrição, preço e categoria pelos dados reais da loja.     */

export const products: Product[] = [
  {
    id: 'p-01',
    name: 'Produto 01',
    description: 'Descrição curta do produto, com até duas linhas de texto.',
    price: 10.0,
    image: null,
    category: 'categoria-1',
    badge: { label: 'Mais vendido', tone: 'accent' },
    servings: '1 unidade',
    available: true,
  },
  {
    id: 'p-02',
    name: 'Produto 02',
    description: 'Descrição curta do produto, com até duas linhas de texto.',
    price: 15.0,
    originalPrice: 20.0,
    image: null,
    category: 'categoria-1',
    badge: { label: 'Promoção', tone: 'warning' },
    servings: '1 unidade',
    available: true,
  },
  {
    id: 'p-03',
    name: 'Produto 03',
    description: 'Descrição curta do produto, com até duas linhas de texto.',
    price: 22.5,
    image: null,
    category: 'categoria-1',
    servings: '2 unidades',
    available: true,
  },
  {
    id: 'p-04',
    name: 'Produto 04',
    description: 'Descrição curta do produto, com até duas linhas de texto.',
    price: 30.0,
    image: null,
    category: 'categoria-2',
    badge: { label: 'Novidade', tone: 'success' },
    available: true,
  },
  {
    id: 'p-05',
    name: 'Produto 05',
    description: 'Descrição curta do produto, com até duas linhas de texto.',
    price: 35.9,
    image: null,
    category: 'categoria-2',
    servings: '6 unidades',
    available: true,
  },
  {
    id: 'p-06',
    name: 'Produto 06',
    description: 'Descrição curta do produto, com até duas linhas de texto.',
    price: 42.0,
    image: null,
    category: 'categoria-2',
    available: true,
  },
  {
    id: 'p-07',
    name: 'Produto 07',
    description: 'Descrição curta do produto, com até duas linhas de texto.',
    price: 48.9,
    image: null,
    category: 'categoria-3',
    badge: { label: 'Destaque', tone: 'info' },
    servings: '8 a 10 porções',
    available: true,
  },
  {
    id: 'p-08',
    name: 'Produto 08',
    description: 'Descrição curta do produto, com até duas linhas de texto.',
    price: 55.0,
    originalPrice: 65.0,
    image: null,
    category: 'categoria-3',
    available: true,
  },
  {
    id: 'p-09',
    name: 'Produto 09',
    description: 'Descrição curta do produto, com até duas linhas de texto.',
    price: 60.0,
    image: null,
    category: 'categoria-3',
    available: true,
  },
  {
    id: 'p-10',
    name: 'Produto 10',
    description: 'Descrição curta do produto, com até duas linhas de texto.',
    price: 12.5,
    image: null,
    category: 'categoria-4',
    available: true,
  },
  {
    id: 'p-11',
    name: 'Produto 11',
    description: 'Descrição curta do produto, com até duas linhas de texto.',
    price: 18.0,
    image: null,
    category: 'categoria-4',
    badge: { label: 'Edição limitada', tone: 'neutral' },
    available: true,
  },
  {
    id: 'p-12',
    name: 'Produto 12',
    description: 'Descrição curta do produto, com até duas linhas de texto.',
    price: 25.0,
    image: null,
    category: 'categoria-4',
    available: false,
  },
  {
    id: 'p-13',
    name: 'Produto 13',
    description: 'Descrição curta do produto, com até duas linhas de texto.',
    price: 8.0,
    image: null,
    category: 'categoria-5',
    servings: '300 ml',
    available: true,
  },
  {
    id: 'p-14',
    name: 'Produto 14',
    description: 'Descrição curta do produto, com até duas linhas de texto.',
    price: 9.5,
    image: null,
    category: 'categoria-5',
    servings: '400 ml',
    available: true,
  },
  {
    id: 'p-15',
    name: 'Produto 15',
    description: 'Descrição curta do produto, com até duas linhas de texto.',
    price: 11.0,
    image: null,
    category: 'categoria-5',
    available: true,
  },
];

/* -------------------------------------------------------------------------- */
/* COMBOS                                                                      */
/* -------------------------------------------------------------------------- */
/* Deixe [] para ocultar a seção inteira.                                      */

export const combos: Combo[] = [
  {
    id: 'c-01',
    name: 'Combo 01',
    description: 'Descrição curta do combo.',
    productIds: ['p-01', 'p-04', 'p-13'],
    comboPrice: 45.0,
  },
  {
    id: 'c-02',
    name: 'Combo 02',
    description: 'Descrição curta do combo.',
    productIds: ['p-07', 'p-08'],
    comboPrice: 95.0,
  },
  {
    id: 'c-03',
    name: 'Combo 03',
    description: 'Descrição curta do combo.',
    productIds: ['p-02', 'p-05', 'p-14'],
    comboPrice: 55.0,
  },
];

/**
 * Converte um combo num item vendável.
 *
 * O combo entra no pedido como UMA linha, pelo preço do combo — se entrasse
 * como produtos avulsos, o carrinho cobraria a soma dos preços cheios e
 * contradiria o desconto anunciado no card.
 */
export function comboAsProduct(combo: Combo): Product {
  const names = combo.productIds
    .map((id) => products.find((p) => p.id === id)?.name)
    .filter(Boolean)
    .join(' + ');

  return {
    id: `combo-${combo.id}`,
    name: combo.name,
    description: names,
    price: combo.comboPrice,
    image: null,
    category: 'combos',
    available: combo.productIds.every(
      (id) => products.find((p) => p.id === id)?.available,
    ),
  };
}

/**
 * Resolve qualquer id vendável — produto avulso ou combo.
 * Usado ao restaurar o carrinho do localStorage.
 */
export function findSellableById(id: string): Product | undefined {
  const product = products.find((p) => p.id === id);
  if (product) return product;

  const combo = combos.find((c) => `combo-${c.id}` === id);
  return combo ? comboAsProduct(combo) : undefined;
}

/* -------------------------------------------------------------------------- */
/* SOBRE                                                                       */
/* -------------------------------------------------------------------------- */

export const about: AboutSection = {
  title: 'Sobre',
  subtitle: 'Subtítulo da seção sobre',
  paragraphs: [
    'Primeiro parágrafo sobre a loja: origem, proposta e o que a diferencia.',
    'Segundo parágrafo: processo, matéria-prima ou forma de trabalho.',
    'Terceiro parágrafo: posicionamento atual e público atendido.',
  ],
  values: [
    { icon: '', title: 'Valor 1', description: 'Descrição curta do primeiro diferencial.' },
    { icon: '', title: 'Valor 2', description: 'Descrição curta do segundo diferencial.' },
    { icon: '', title: 'Valor 3', description: 'Descrição curta do terceiro diferencial.' },
    { icon: '', title: 'Valor 4', description: 'Descrição curta do quarto diferencial.' },
  ],
};

/* -------------------------------------------------------------------------- */
/* AVALIAÇÕES                                                                  */
/* -------------------------------------------------------------------------- */
/* Deixe [] para ocultar a seção inteira.                                      */

export const reviews: Review[] = [
  {
    id: 'r-01',
    name: 'Nome do cliente 1',
    initials: 'C1',
    rating: 5,
    text: 'Texto da avaliação do cliente, com duas ou três linhas de comentário.',
    date: 'há 1 semana',
  },
  {
    id: 'r-02',
    name: 'Nome do cliente 2',
    initials: 'C2',
    rating: 5,
    text: 'Texto da avaliação do cliente, com duas ou três linhas de comentário.',
    date: 'há 2 semanas',
  },
  {
    id: 'r-03',
    name: 'Nome do cliente 3',
    initials: 'C3',
    rating: 4,
    text: 'Texto da avaliação do cliente, com duas ou três linhas de comentário.',
    date: 'há 1 mês',
  },
];

/* -------------------------------------------------------------------------- */
/* FAQ                                                                         */
/* -------------------------------------------------------------------------- */
/* Deixe [] para ocultar a seção inteira.                                      */

export const faqs: FAQ[] = [
  {
    question: 'Como faço para realizar um pedido?',
    answer:
      'Adicione os produtos ao carrinho, preencha seus dados e clique em "Enviar pedido pelo WhatsApp". Você será levado à conversa com a nota do pedido já montada.',
  },
  {
    question: 'Qual o prazo de entrega?',
    answer: 'Resposta sobre prazos de entrega e retirada.',
  },
  {
    question: 'Quais são as formas de pagamento?',
    answer: 'Resposta sobre as formas de pagamento aceitas.',
  },
  {
    question: 'Vocês atendem quais regiões?',
    answer: 'Resposta sobre a área de cobertura de entrega.',
  },
];

/* -------------------------------------------------------------------------- */

export interface NavSection {
  id: string;
  label: string;
  footerLabel?: string;
}

/** Derivada do conteúdo: seção sem dado não vira link para âncora inexistente. */
export const navSections: NavSection[] = [
  { id: 'cardapio', label: 'Cardápio' },
  ...(combos.length > 0 ? [{ id: 'combos', label: 'Combos' }] : []),
  ...(reviews.length > 0 ? [{ id: 'avaliacoes', label: 'Avaliações' }] : []),
  { id: 'sobre', label: 'Sobre' },
  ...(faqs.length > 0
    ? [{ id: 'faq', label: 'FAQ', footerLabel: 'Perguntas frequentes' }]
    : []),
];
