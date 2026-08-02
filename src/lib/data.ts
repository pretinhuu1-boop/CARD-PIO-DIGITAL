/**
 * ============================================================================
 * CATÁLOGO — Kokedami · Arte com Plantas (Tatuapé)
 * ============================================================================
 *
 * Coletado em 2026-08-02. Procedência em `scraped-stores/kokedami-tatuape/`.
 *
 * EXPOSITOR, NÃO CARDÁPIO
 * -----------------------
 * Todos os itens têm `price: null`, e é por isso que a página se monta como
 * expositor: sem carrinho, cada peça abrindo conversa no WhatsApp.
 *
 * O preço não é uma lacuna a preencher. Não existe em fonte pública nenhuma —
 * não há site, e-commerce nem linktree de loja — e kokedama é peça única: a
 * planta, o porte e o suporte mudam o valor. "Sob consulta" é como o negócio
 * funciona, não falha da coleta.
 *
 * NUNCA preencher com a faixa de mercado. A busca devolve R$ 43–90 de outras
 * kokedamarias (Xique Xique, Meu Kokedama, Orquidário Ibáñez) — isso é preço
 * de concorrente publicado em nome desta loja.
 *
 * LIMITE DECLARADO DOS NOMES
 * --------------------------
 * Os títulos descrevem O QUE APARECE NA FOTOGRAFIA. NÃO são a nomenclatura
 * comercial da loja: a loja não publica nomenclatura.
 * ============================================================================
 */

/*
 * As FORMAS destes dados vivem em `src/lib/types.ts` e são reexportadas aqui
 * por conveniência de import. Ao montar uma loja você mexe SÓ no conteúdo
 * abaixo — campo novo entra no contrato, não numa cópia local.
 */
export type {
  BadgeTone,
  Badge,
  Product,
  Category,
  Combo,
  Review,
  FAQ,
  AboutSection,
  NavSection,
} from './types';

import type {
  Product,
  Category,
  Combo,
  Review,
  FAQ,
  AboutSection,
} from './types';

/* -------------------------------------------------------------------------- */
/* CATEGORIAS                                                                  */
/* -------------------------------------------------------------------------- */
/* Uma só. A loja não publica divisão de catálogo, e inventar seções aqui seria */
/* organizar a loja no lugar dela. Com uma categoria a barra de navegação nem   */
/* aparece — não há entre o que navegar.                                       */

export const categories: Category[] = [
  { slug: 'pecas', name: 'Peças em exposição', emoji: '' },
];

/* -------------------------------------------------------------------------- */
/* PEÇAS                                                                       */
/* -------------------------------------------------------------------------- */
/* Fotografias publicadas pelo próprio estabelecimento no Google Maps.         */
/* A descrição só cita o que é visível na foto.                                */

export const products: Product[] = [
  {
    id: 'orquidea',
    name: 'Orquídea',
    description: 'Haste amarela sobre esfera de musgo, apoiada sem vaso.',
    price: null,
    image: '/pecas/orquidea.webp',
    category: 'pecas',
    available: true,
  },
  {
    id: 'aglaonema',
    name: 'Aglaonema',
    description: 'Folhagem rosada. O tamanho cabe nas duas mãos.',
    price: null,
    image: '/pecas/aglaonema.webp',
    category: 'pecas',
    available: true,
  },
  {
    id: 'singonio-suporte',
    name: 'Singônio com suporte',
    description: 'Esfera suspensa dentro de um cubo de metal preto.',
    price: null,
    image: '/pecas/singonio-suporte.webp',
    category: 'pecas',
    available: true,
  },
  {
    id: 'podocarpo-suporte',
    name: 'Podocarpo com suporte',
    description: 'Porte vertical em base aramada, junto à janela.',
    price: null,
    image: '/pecas/podocarpo-suporte.webp',
    category: 'pecas',
    available: true,
  },
  {
    id: 'anturio-verde',
    name: 'Antúrio',
    description: 'Folhas largas sobre disco de madeira.',
    price: null,
    image: '/pecas/anturio-verde.webp',
    category: 'pecas',
    available: true,
  },
  {
    id: 'anturios-vitrine',
    name: 'Antúrios na vitrine',
    description: 'Floração vermelha na bancada que dá para a rua.',
    price: null,
    image: '/pecas/anturios-vitrine.webp',
    category: 'pecas',
    available: true,
  },
];

/* -------------------------------------------------------------------------- */
/* COMBOS                                                                      */
/* -------------------------------------------------------------------------- */
/* Sem preço não há combo: conjunto com desconto exige valor para descontar.   */

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
  title: 'Uma esfera de musgo, uma planta, nenhum vaso',
  subtitle:
    'Kokedama é a técnica japonesa que sustenta a raiz em terra e musgo',
  paragraphs: [
    'A Kokedami fica na Rua Itapeti, no Tatuapé, e é atendida pela Michele. Cada peça é montada à mão: a planta, a esfera e o suporte são escolhidos juntos.',
    'Além da loja, a casa recebe oficinas — várias das avaliações são de quem entrou para comprar e voltou para aprender a fazer.',
    'Não há tabela de preço publicada porque não há duas peças iguais. O valor sai na conversa, junto com a escolha da planta.',
  ],
  values: [
    { icon: '', title: '5,0 no Google', description: '77 avaliações da unidade Tatuapé.' },
    { icon: '', title: 'Feito à mão', description: 'Cada esfera é montada peça a peça na loja.' },
    { icon: '', title: 'Oficinas', description: 'Aulas para montar a própria kokedama.' },
    { icon: '', title: 'Entrega expressa', description: 'Retirada na loja ou entrega combinada no WhatsApp.' },
  ],
};

/* -------------------------------------------------------------------------- */
/* AVALIAÇÕES                                                                  */
/* -------------------------------------------------------------------------- */
/*
  Avaliações reais do Google (5,0 · 77 avaliações), transcritas literalmente.
  A nota da loja é 5,0 cravado, então toda avaliação publicada é 5 estrelas.

  CUIDADO QUE CUSTOU UMA CONFERÊNCIA: o Maps concatena a RESPOSTA DA LOJA no
  mesmo bloco de texto da avaliação. Duas destas vinham com a fala da própria
  dona grudada no fim — publicar assim seria atribuir ao cliente algo que ele
  não escreveu. O texto abaixo já vem separado.

  Nome: primeiro nome + inicial. A avaliação é pública; o nome completo não vai.
*/

export const reviews: Review[] = [
  {
    id: 'q-lucas',
    name: 'Lucas H.',
    initials: 'LH',
    rating: 5,
    text: 'A Micheli demonstra ter muito conhecimento dessa arte de cultivo de plantas e me senti seguro em comprar e cuidar, apesar da minha pouca experiência com plantas em geral.',
    date: 'há 1 mês',
  },
  {
    id: 'q-sandra',
    name: 'Sandra M.',
    initials: 'SM',
    rating: 5,
    text: 'A loja é perfeita, uma kokedama mais linda que a outra. Gostei tanto que resolvi participar da oficina e adorei.',
    date: 'há 2 meses',
  },
  {
    id: 'q-larissa',
    name: 'Larissa C.',
    initials: 'LC',
    rating: 5,
    text: 'Passei e vi a loja, e achei maravilhosa por fora. Mas por dentro, a experiência foi ainda mais incrível.',
    date: 'há 5 meses',
  },
  {
    id: 'q-gabor',
    name: 'Gabor G.',
    initials: 'GG',
    rating: 5,
    text: 'Lindíssimo trabalho. Comprei para a minha esposa e, quando viu, tirou foto para mandar para toda a família.',
    date: 'há 6 meses',
  },
  {
    id: 'q-vic',
    name: 'Vic T.',
    initials: 'VT',
    rating: 5,
    text: 'Experiência maravilhosa e ambiente acolhedor para todos.',
    date: 'há 5 meses',
  },
  {
    id: 'q-vanessa',
    name: 'Vanessa R.',
    initials: 'VR',
    rating: 5,
    text: 'Ganhei de uma pessoa muito especial na minha vida. Depois disso me apaixonei e comprei outros.',
    date: 'há 4 meses',
  },
];

/* -------------------------------------------------------------------------- */
/* FAQ                                                                         */
/* -------------------------------------------------------------------------- */

export const faqs: FAQ[] = [
  {
    question: 'Por que não tem preço no site?',
    answer:
      'Cada kokedama é montada à mão e nenhuma é igual à outra: a planta, o porte e o suporte mudam o valor. O preço sai na conversa, junto com a escolha da peça.',
  },
  {
    question: 'Dá para escolher a planta?',
    answer:
      'Sim. A escolha da planta, da esfera e do suporte é feita junto com a loja — é parte de como a peça é montada.',
  },
  {
    question: 'Vocês entregam?',
    answer:
      'Há retirada na loja e entrega expressa combinada pelo WhatsApp. A área de cobertura e o valor são acertados na conversa.',
  },
  {
    question: 'Vocês dão oficinas?',
    answer:
      'Sim. A casa recebe oficinas de montagem de kokedama. As datas são informadas pelo WhatsApp e pelo Instagram.',
  },
];
