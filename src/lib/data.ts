/**
 * ============================================================================
 * CATÁLOGO — Restaurante Istambul Tatuapé (halal)
 * ============================================================================
 *
 * Coletado em 2026-08-02 do cardápio online do próprio restaurante
 * (restauranteistambulhalal-tatuape.pedido.app.br), que roda sobre a
 * plataforma Expresso Delivery. Nome, descrição e preço são transcrição
 * literal da fonte — inclusive a grafia, porque é por ela que o cliente
 * procura o item.
 *
 * DUAS FORMAS DE PREÇO NA MESMA FONTE
 * -----------------------------------
 * Lanches vêm como "à partir de R$ X": o valor é PISO, e há variações de
 * tamanho. Esfihas vêm com preço fechado. Publicar o piso como preço final
 * subestimaria a conta do cliente, então os itens de piso dizem isso na
 * descrição. Só é rotulado o que a fonte rotula.
 *
 * IMAGENS REPETIDAS NA FONTE: a plataforma reaproveita a mesma foto em
 * produtos diferentes (os três Shawarmas de frango dividem uma imagem).
 * Os 10 itens abaixo foram escolhidos também por terem foto distinta.
 * ============================================================================
 */

export type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'info';

export interface Badge {
  label: string;
  tone: BadgeTone;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string | null;
  category: string;
  badge?: Badge;
  servings?: string;
  available: boolean;
}

export interface Category {
  slug: string;
  name: string;
  emoji: string;
}

export interface Combo {
  id: string;
  name: string;
  description: string;
  productIds: string[];
  comboPrice: number;
}

export interface Review {
  id: string;
  name: string;
  initials: string;
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

export const categories: Category[] = [
  { slug: 'todos', name: 'Todos', emoji: '' },
  { slug: 'lanches', name: 'Lanches', emoji: '' },
  { slug: 'esfihas', name: 'Esfihas', emoji: '' },
];

/* -------------------------------------------------------------------------- */
/* PRODUTOS                                                                    */
/* -------------------------------------------------------------------------- */
/* `id` = ordem estável dentro da categoria de origem. O cardápio completo tem */
/* 11 categorias; estas duas foram publicadas por terem preço e foto próprios. */

const PISO = 'Valor a partir de — há variações de tamanho.';

export const products: Product[] = [
  {
    id: 'lanche-shawarma-carne-arabe',
    name: 'Shawarma de Carne (estilo árabe)',
    description: `Tomate, cebola, picles, carne, tahine, salsinha. ${PISO}`,
    price: 25.0,
    image: '/produtos/shawarma-carne-arabe.webp',
    category: 'lanches',
    available: true,
  },
  {
    id: 'lanche-shawarma-misto',
    name: 'Shawarma Misto',
    description: `Tomate, frango, cebola, picles, carne, batata frita, pasta de alho, salsinha. ${PISO}`,
    price: 25.0,
    image: '/produtos/shawarma-misto.webp',
    category: 'lanches',
    available: true,
  },
  {
    id: 'lanche-falafel-vegetariano',
    name: 'Falafel (vegetariano) estilo árabe',
    description: `Tomate, picles, pão sírio, massa de grão de bico. ${PISO}`,
    price: 25.0,
    image: '/produtos/falafel-vegetariano.webp',
    category: 'lanches',
    badge: { label: 'Vegetariano', tone: 'success' },
    available: true,
  },
  {
    id: 'lanche-tawook',
    name: 'Tawook',
    description: `Picles, batata frita, pasta de alho, pão sírio, peito de frango em cubos assado na chapa. ${PISO}`,
    price: 27.0,
    image: '/produtos/tawook.webp',
    category: 'lanches',
    available: true,
  },
  {
    id: 'lanche-sujke-pimenta',
    name: 'Sujke com Pimenta',
    description: `Alface, batata, picles, carne moída apimentada, pão sírio, pasta de alho, tomate. ${PISO}`,
    price: 27.0,
    image: '/produtos/sujuk-pimenta.webp',
    category: 'lanches',
    available: true,
  },
  {
    id: 'lanche-shawarma-pao-folha',
    name: 'Shawarma de Carne (árabe) no pão folha',
    description: `Tomate, cebola, picles, carne, tahine, pão folhado. ${PISO}`,
    price: 28.0,
    image: '/produtos/shawarma-pao-folha.webp',
    category: 'lanches',
    available: true,
  },

  /* Esfihas: preço fechado na fonte, sem "a partir de". */
  {
    id: 'esfiha-carne',
    name: 'Esfiha de Carne',
    description: 'Esfiha aberta, assada na hora.',
    price: 12.0,
    image: '/produtos/esfiha-carne.webp',
    category: 'esfihas',
    available: true,
  },
  {
    id: 'esfiha-zatar',
    name: 'Esfiha de Zatar',
    description: 'Mistura de ervas com gergelim e azeite sobre a massa.',
    price: 12.0,
    image: '/produtos/esfiha-zatar.webp',
    category: 'esfihas',
    available: true,
  },
  {
    id: 'esfiha-frango',
    name: 'Esfiha de Frango',
    description: 'Recheio de frango desfiado temperado.',
    price: 12.0,
    image: '/produtos/esfiha-frango.webp',
    category: 'esfihas',
    available: true,
  },
  {
    id: 'esfiha-queijo',
    name: 'Esfiha de Queijo',
    description: 'Queijo muçarela derretido sobre a massa.',
    price: 12.0,
    image: '/produtos/esfiha-queijo.webp',
    category: 'esfihas',
    available: true,
  },
];

/* -------------------------------------------------------------------------- */
/* COMBOS                                                                      */
/* -------------------------------------------------------------------------- */
/*
  Vazio de propósito. O restaurante anuncia quatro "COMBO FAMILIAR" no cardápio
  online, mas nenhum deles exibe preço na listagem, e três são marcados
  "⚠️ Apenas Retirada". Publicar combo sem preço quebraria o carrinho; publicar
  com preço estimado seria inventar. Registrados em scraped-stores/.
*/
export const combos: Combo[] = [];

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
  title: 'Cozinha árabe e turca, halal, no Tatuapé',
  subtitle: 'Salão para refeição no local, na Rua Itapura',
  paragraphs: [
    'O Istambul serve shawarma, esfihas, pratos na brasa e doces árabes. A cozinha segue os preceitos halal.',
    'O salão fica na Rua Itapura, 1342, com espaço amplo para refeição no local. O Google registra ticket médio de R$ 40 a 60 por pessoa, informado por 64 visitantes.',
    'Este cardápio mostra uma seleção. O catálogo completo tem onze seções, incluindo churrasco na brasa, frango assado, pide turco e sobremesas.',
  ],
  values: [
    { icon: '', title: 'Halal', description: 'Cozinha conforme os preceitos halal.' },
    { icon: '', title: '4,8 no Google', description: '106 avaliações da unidade Tatuapé.' },
    { icon: '', title: 'Salão amplo', description: 'Refeição no local, terça a domingo.' },
    { icon: '', title: '11 seções', description: 'Da brasa ao pide turco e aos doces.' },
  ],
};

/* -------------------------------------------------------------------------- */
/* AVALIAÇÕES                                                                  */
/* -------------------------------------------------------------------------- */
/* Vazio: as avaliações do Google desta unidade não foram transcritas nesta    */
/* coleta. A seção fica oculta em vez de exibir depoimento genérico.           */

export const reviews: Review[] = [];

/* -------------------------------------------------------------------------- */
/* FAQ                                                                         */
/* -------------------------------------------------------------------------- */

export const faqs: FAQ[] = [
  {
    question: 'Como faço para pedir?',
    answer:
      'Monte seu pedido aqui e clique em "Enviar pedido pelo WhatsApp". Você também pode pedir direto pelo cardápio online do restaurante, com o catálogo completo.',
  },
  {
    question: 'Por que alguns itens dizem "a partir de"?',
    answer:
      'Porque têm variações de tamanho. O valor mostrado é o menor da faixa; o preço final se confirma no atendimento.',
  },
  {
    question: 'A comida é halal?',
    answer: 'Sim. A casa se apresenta como Restaurante Istambul halal.',
  },
  {
    question: 'Qual o horário e onde fica?',
    answer:
      'R. Itapura, 1342 — Vila Gomes Cardim, Tatuapé. Terça a domingo, das 11h às 23h. Segunda não abre.',
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
