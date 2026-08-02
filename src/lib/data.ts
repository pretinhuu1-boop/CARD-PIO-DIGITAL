/**
 * ============================================================================
 * CATÁLOGO — Caracol Chocolates Cafeteria Tatuapé
 * ============================================================================
 *
 * Coletado em 2026-08-02.
 * Fonte dos produtos: iFood (categoria "Os Queridinhos" — vitrine curada pela
 * própria loja). Nome, descrição e preço são transcrição literal da fonte.
 * Fonte das avaliações: iFood. Fonte de horário/endereço: Google Maps + Instagram.
 *
 * DADO DESCARTADO NA CURADORIA
 * ----------------------------
 * O iFood devolve `unitOriginalPrice: 78.90` em 26 dos 30 produtos — inclusive
 * em água mineral de R$ 12,90. É valor-lixo do cadastro, não preço "de".
 * Publicar isso como desconto seria propaganda falsa em nome do lojista, então
 * NENHUM produto abaixo usa `originalPrice`.
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
  { slug: 'doces', name: 'Doces', emoji: '' },
  { slug: 'salgados', name: 'Salgados', emoji: '' },
  { slug: 'bebidas', name: 'Bebidas', emoji: '' },
];

/* -------------------------------------------------------------------------- */
/* PRODUTOS                                                                    */
/* -------------------------------------------------------------------------- */
/* 10 itens. Os 5 primeiros são a vitrine "Os Queridinhos" do iFood — seleção  */
/* do próprio lojista, não heurística nossa, e por isso levam selo. Os 5       */
/* seguintes são o restante do cardápio, sem selo.                             */
/*                                                                             */
/* `id` = externalCode do iFood (chave estável: o uuid muda conforme a         */
/* categoria em que o item aparece).                                           */
/*                                                                             */
/* PREÇOS: todos do iFood, coletados em 2026-08-02. Não foi possível cruzar    */
/* com o site oficial — o cardápio da unidade                                  */
/* (caracolchocolates.com.br/cardapio-tatuape) redireciona para uma publicação */
/* Adobe InDesign que retorna "Document Not Found", e a loja online vende      */
/* outro catálogo (barras SIGNO 60g, não as 23g da cafeteria). Preço de iFood  */
/* costuma ser mais alto que o de balcão — confirmar com a lojista.            */

export const products: Product[] = [
  {
    id: '10019',
    name: 'Bolo de Cenoura',
    description:
      'Nossa receita caseira de bolo fofinho, feito na loja. Coberto com a autêntica ganache de chocolate ao leite Caracol. Um abraço em forma de doce!',
    price: 37.9,
    image: '/produtos/bolo-de-cenoura.webp',
    category: 'doces',
    badge: { label: 'Os Queridinhos', tone: 'accent' },
    available: true,
  },
  {
    id: '751',
    name: 'Chocolate Quente Cremoso',
    description:
      'O verdadeiro sabor do inverno gaúcho. Bebida densa e aveludada, feita com o puro chocolate Caracol. Enviado em copo térmico.',
    price: 33.9,
    image: '/produtos/chocolate-quente-cremoso.webp',
    category: 'bebidas',
    badge: { label: 'Os Queridinhos', tone: 'accent' },
    servings: '180 ml',
    available: true,
  },
  {
    id: '10082',
    name: 'Coxinha de Frango com Requeijão',
    description:
      'A queridinha da casa! Massa de batata fininha e super recheada com frango desfiado bem temperado e requeijão cremoso. Frita no ponto para chegar dourada até você.',
    price: 17.9,
    image: '/produtos/coxinha-frango-requeijao.webp',
    category: 'salgados',
    badge: { label: 'Os Queridinhos', tone: 'accent' },
    available: true,
  },
  {
    id: '3',
    name: 'Croissant de Chocolate com Morangos',
    description:
      'A união perfeita: a clássica massa folhada Ofner recheada com nossa inconfundível ganache de chocolate ao leite de Gramado e morangos frescos fatiados. Finalizado com raspas de chocolate.',
    price: 52.9,
    image: '/produtos/croissant-chocolate-morangos.webp',
    category: 'doces',
    badge: { label: 'Os Queridinhos', tone: 'accent' },
    available: true,
  },
  {
    id: '1',
    name: 'Mini Fondue - Favorito Cacau',
    description:
      'A experiência da Serra Gaúcha na sua casa! Puro chocolate Caracol derretido, com mini brownies artesanais, marshmallows e morangos frescos (enviados separados para manter o frescor).',
    price: 67.9,
    image: '/produtos/mini-fondue-favorito-cacau.webp',
    category: 'doces',
    badge: { label: 'Os Queridinhos', tone: 'accent' },
    available: true,
  },

  /* Demais itens do cardápio, fora da vitrine "Os Queridinhos" — por isso
     sem selo. Mesma fonte, mesma data de coleta. */
  {
    id: '11',
    name: 'Waffle com Chocolate e Morangos',
    description:
      'Massa artesanal leve e crocante. Acompanha a famosa ganache de chocolate ao leite Caracol, morangos frescos e chantilly. Os complementos vão separados para a massa chegar perfeita até você!',
    price: 53.9,
    image: '/produtos/waffle-chocolate-morangos.webp',
    category: 'doces',
    available: true,
  },
  {
    id: '14',
    name: 'Trio de Brownies Recheados',
    description:
      'Nossa receita exclusiva! Três brownies super macios recheados com Nutella, ganache branca e doce de leite. Acompanha porção de ganache de chocolate Caracol.',
    price: 53.9,
    image: '/produtos/trio-brownies-recheados.webp',
    category: 'doces',
    servings: '3 unidades',
    available: true,
  },
  {
    id: '253',
    name: 'Croissant de Presunto e Queijo',
    description:
      'A legítima massa folhada francesa da Ofner, incrivelmente leve e amanteigada, com recheio tradicional de presunto e queijo.',
    price: 26.9,
    image: '/produtos/croissant-presunto-queijo.webp',
    category: 'salgados',
    available: true,
  },
  {
    id: '10037',
    name: 'Croiffle Presunto e Queijo',
    description:
      'Inovação e sabor! A massa folhada Ofner prensada na chapa de waffle até ficar dourada, com recheio de requeijão, presunto e queijo derretido.',
    price: 33.9,
    image: '/produtos/croiffle-presunto-queijo.webp',
    category: 'salgados',
    available: true,
  },
  {
    id: '10011',
    name: 'Chai Latte',
    description:
      'Uma experiência aromática. Bebida à base de chá preto, leite, cardamomo, cravo, canela, gengibre e mel. Um equilíbrio perfeito e intenso que aquece a alma.',
    price: 21.9,
    image: '/produtos/chai-latte.webp',
    category: 'bebidas',
    available: true,
  },
];

/* -------------------------------------------------------------------------- */
/* COMBOS                                                                      */
/* -------------------------------------------------------------------------- */
/* Vazio por decisão: a seção inteira fica oculta.                             */
/* A loja tem 3 combos reais no iFood ("Conforto de Gramado" R$ 50,99,         */
/* "Duo Croissant Royal" R$ 104,99 e "Clássico" R$ 39,99) — registrados em     */
/* scraped-stores/caracol-chocolates-tatuape/ caso voltem a ser publicados.    */

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
  title: 'O chocolate de Gramado no Tatuapé',
  subtitle: 'Fábrica própria na Serra Gaúcha desde 1982',
  paragraphs: [
    'A Caracol nasceu em 1982, em Canela, batizada com o nome da Cascata do Caracol. Em 2001 levou a fábrica para Gramado e se tornou pioneira na produção de chocolate na Serra Gaúcha.',
    'A unidade do Tatuapé traz esse chocolate para a zona leste de São Paulo em formato de cafeteria: doces, salgados e bebidas feitos na loja, além de espaço para eventos.',
    'É também uma casa pensada para família — o espaço kids é gratuito, com mini cozinha, mesa de desenho, videogame e jogos de tabuleiro.',
  ],
  values: [
    {
      icon: '',
      title: 'Chocolate de Gramado',
      description: 'Fábrica própria na Serra Gaúcha há mais de 40 anos.',
    },
    {
      icon: '',
      title: 'Espaço kids gratuito',
      description: 'Mini cozinha, mesa de desenho, videogame e jogos.',
    },
    {
      icon: '',
      title: 'Massa folhada Ofner',
      description: 'Croissants e croiffles feitos com a legítima massa francesa.',
    },
    {
      icon: '',
      title: '4,7 no Google',
      description: 'Avaliação da unidade Tatuapé entre os clientes.',
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* AVALIAÇÕES                                                                  */
/* -------------------------------------------------------------------------- */
/* Avaliação real e literal do iFood. As outras 4 avaliações recentes da loja  */
/* são nota 5 sem texto escrito — sem conteúdo para exibir, ficaram de fora.   */

export const reviews: Review[] = [
  {
    id: 'r-ifood-4788',
    name: 'Victor',
    initials: 'V',
    rating: 4,
    text: 'O Chocolate Quente Cremoso é realmente muito bom — sabor rico e textura agradável. O único ponto a melhorar é a quantidade servida, que ficou abaixo do esperado. No geral, um ótimo produto com potencial para 5 estrelas.',
    date: '07/06/2026',
  },
];

/* -------------------------------------------------------------------------- */
/* FAQ                                                                         */
/* -------------------------------------------------------------------------- */

export const faqs: FAQ[] = [
  {
    question: 'Como faço para realizar um pedido?',
    answer:
      'Adicione os produtos ao carrinho, preencha seus dados e clique em "Enviar pedido pelo WhatsApp". Você será levado à conversa com a nota do pedido já montada.',
  },
  {
    question: 'Qual é o pedido mínimo?',
    answer: 'O pedido mínimo é de R$ 35,00.',
  },
  {
    question: 'Onde vocês ficam e qual o horário?',
    answer:
      'R. Itapeti, 601 — Tatuapé, São Paulo/SP. Terça a sábado das 9h às 18h e domingo das 10h às 19h. Segunda-feira não abrimos.',
  },
  {
    question: 'A loja tem espaço para crianças?',
    answer:
      'Sim, e o acesso é gratuito: mini cozinha, mesa de desenho, videogame e jogos de tabuleiro. A casa também recebe eventos.',
  },
];
