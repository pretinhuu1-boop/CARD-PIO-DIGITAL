/**
 * ============================================================================
 * CATÁLOGO — TBT Lounge Tatuapé
 * ============================================================================
 *
 * Coletado em 2026-08-02 do cardápio digital do próprio estabelecimento
 * (tbt-lounge.cluvi.com.br), pela API pública da plataforma Cluvi
 * (supplier_id 3344). Nome, descrição e preço são transcrição literal.
 *
 * A API IGNORA O FILTRO DE CATEGORIA
 * ----------------------------------
 * `products.json?main_category_id=<id>` devolve os MESMOS 100 itens para
 * qualquer id. As oito chamadas somaram 800 registros que, deduplicados por
 * `id`, são 100. Confiar no parâmetro produziria um cardápio com cada item
 * repetido oito vezes. A categoria verdadeira vem do campo `category_label`
 * de cada produto, e é por ele que o agrupamento abaixo foi feito.
 *
 * LIMITE DECLARADO: a API devolve no máximo 100 itens e ignora `page`,
 * `offset`, `limit` e `per_page`. O cardápio da casa pode ser maior.
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
  { slug: 'drinks', name: "Drinks", emoji: '' },
  { slug: 'combos', name: "Combos", emoji: '' },
  { slug: 'cervejas', name: "Cervejas", emoji: '' },
  { slug: 'japa', name: "Só um japinha…", emoji: '' },
  { slug: 'espumantes', name: "Espumantes", emoji: '' },
  { slug: 'doses', name: "Doses", emoji: '' },
  { slug: 'garrafas', name: "Garrafas", emoji: '' },];

/* -------------------------------------------------------------------------- */
/* PRODUTOS                                                                    */
/* -------------------------------------------------------------------------- */
/* 15 itens de exemplo distribuídos nas 5 categorias, sem imagem.              */
/* Substitua nome, descrição, preço e categoria pelos dados reais da loja.     */

export const products: Product[] = [
  {
    id: 'gordons-pink-c-tonica',
    name: "GORDONS PINK C/ TONICA",
    description: "Gin Gordon´s Pink",
    price: 40.0,
    image: '/produtos/gordons-pink-c-tonica.webp',
    category: 'drinks',
    available: true,
  },
  {
    id: 'gin-tonica-gordons',
    name: "Gin Tônica  Gordons",
    description: "Gordon’s London Dry",
    price: 40.0,
    image: '/produtos/gin-tonica-gordons.webp',
    category: 'drinks',
    available: true,
  },
  {
    id: 'johnnie-walker-black-label',
    name: "Johnnie Walker Black Label",
    description: "Os combos acompanham 4 Red Bull + 4 gelos de côco.",
    price: 750.0,
    image: '/produtos/johnnie-walker-black-label.webp',
    category: 'combos',
    available: true,
  },
  {
    id: 'heineken-355ml',
    name: "Heineken 355ml",
    description: "Cervejas — servido no TBT.",
    price: 15.0,
    image: '/produtos/heineken-355ml.webp',
    category: 'cervejas',
    available: true,
  },
  {
    id: 'temaki-cru',
    name: "Temaki Cru",
    description: "Só um japinha… — servido no TBT.",
    price: 40.0,
    image: '/produtos/temaki-cru.webp',
    category: 'japa',
    available: true,
  },
  {
    id: 'chandon',
    name: "Chandon",
    description: "Espumantes — servido no TBT.",
    price: 250.0,
    image: '/produtos/chandon.webp',
    category: 'espumantes',
    available: true,
  },
  {
    id: 'johnnie-walker-blonde',
    name: "Johnnie Walker Blonde",
    description: "Com Redbull",
    price: 50.0,
    image: '/produtos/johnnie-walker-blonde.webp',
    category: 'doses',
    available: true,
  },
  {
    id: 'licor-43',
    name: "Licor 43",
    description: "Garrafas — servido no TBT.",
    price: 500.0,
    image: '/produtos/licor-43.webp',
    category: 'garrafas',
    available: true,
  },
  {
    id: 'gordons-pink',
    name: "Gordons Pink",
    description: "REDBULL",
    price: 399.99,
    image: '/produtos/gordons-pink.webp',
    category: 'combos',
    available: true,
  },
  {
    id: 'ciroc',
    name: "CIROC",
    description: "Combos — servido no TBT.",
    price: 650.0,
    image: '/produtos/ciroc.webp',
    category: 'combos',
    available: true,
  },
];

/* -------------------------------------------------------------------------- */
/* COMBOS                                                                      */
/* -------------------------------------------------------------------------- */
/* Deixe [] para ocultar a seção inteira.                                      */

/* Vazio: a casa tem categorias chamadas "Combos", mas elas são produtos
   avulsos (garrafa + energéticos), não pacotes de itens do catálogo. */
export const combos: Combo[] = [];

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
  title: 'O famoso baile do TBT',
  subtitle: 'Bar e lounge no Tatuapé, com camarotes e narguilé',
  paragraphs: [
    'O TBT Lounge fica na Rua Itapura, 1267, no Tatuapé. A casa se apresenta no próprio perfil como "famoso baile do TBT".',
    'O cardápio vai de drinks e doses a garrafas, combos com energético e gelo de coco, cervejas, espumantes e uma seção de comida japonesa.',
    'O Google registra ticket acima de R$ 200 por pessoa, informado por 30 visitantes, e nota 4,0 em 141 avaliações.',
  ],
  values: [
    { icon: '', title: 'Camarotes', description: 'Reserva de mesa e camarote pelo WhatsApp.' },
    { icon: '', title: 'Narguilé', description: 'Um dos assuntos mais citados nas avaliações.' },
    { icon: '', title: 'Combos', description: 'Garrafa com energéticos e gelo de coco.' },
    { icon: '', title: 'Só um japinha', description: 'Seção de comida japonesa no cardápio.' },
  ],
};

/* -------------------------------------------------------------------------- */
/* AVALIAÇÕES                                                                  */
/* -------------------------------------------------------------------------- */
/* Deixe [] para ocultar a seção inteira.                                      */

/* Vazio: a casa tem 4,0 com 141 avaliações — nota MISTA. Publicar só as
   positivas seria selecionar a dedo o que favorece. Ou entram com o mesmo
   critério das negativas, ou não entram. */
export const reviews: Review[] = [];

/* -------------------------------------------------------------------------- */
/* FAQ                                                                         */
/* -------------------------------------------------------------------------- */
/* Deixe [] para ocultar a seção inteira.                                      */

export const faqs: FAQ[] = [
  {
    question: 'Como faço para pedir ou reservar?',
    answer:
      'Monte seu pedido aqui e clique em "Enviar pedido pelo WhatsApp". Reserva de mesa e camarote também é pelo WhatsApp.',
  },
  {
    question: 'Este é o cardápio completo?',
    answer:
      'Não. Esta é uma seleção. O cardápio digital da casa tem mais itens, incluindo narguilés, soft drinks e mais garrafas.',
  },
  {
    question: 'O que vem nos combos?',
    answer:
      'Conforme a descrição da própria casa, os combos acompanham 4 Red Bull e 4 gelos de côco.',
  },
  {
    question: 'Onde fica e qual o horário?',
    answer:
      'R. Itapura, 1267 — Vila Gomes Cardim, Tatuapé. O horário não é publicado de forma completa em nenhuma fonte; confirme no WhatsApp.',
  },
];

/* -------------------------------------------------------------------------- */
/* NAVEGAÇÃO                                                                   */
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
