/**
 * ============================================================================
 * EXPOSITOR — Kokedami, Arte com Plantas
 * ============================================================================
 *
 * Coletado em 2026-08-02 de Google Maps (ficha, fotos do proprietário e
 * avaliações) e Instagram @koke.da.mi.
 *
 * POR QUE ISTO NÃO É UM CATÁLOGO
 * ------------------------------
 * A loja não publica preço nem nome de produto em lugar nenhum: não tem site,
 * não está em iFood/99Food/Keeta/Rappi (são delivery de comida) e o Instagram
 * não expõe legenda sem login. Kokedama é peça artesanal — planta, porte e
 * suporte mudam o valor, e a venda acontece na conversa.
 *
 * Inventar preço aqui seria publicar número que a lojista nunca disse. Então a
 * página é um EXPOSITOR: a foto é o produto, a legenda descreve o que está na
 * foto, e cada peça leva para o WhatsApp.
 *
 * LIMITE DECLARADO: os títulos das peças descrevem a fotografia (a planta que
 * aparece nela). NÃO são o nome comercial que a loja usa — a loja não publica
 * nomenclatura. Trocar por nomes reais é a primeira coisa a fazer com acesso
 * à lojista.
 * ============================================================================
 */

export interface Piece {
  id: string;
  /** Título descritivo do que aparece na foto. Ver limite declarado acima. */
  title: string;
  /** Uma linha sobre a peça. Só cita o que é visível na fotografia. */
  caption: string;
  image: string;
  /** Proporção usada na grade — quebra o ritmo e evita cara de catálogo. */
  span?: 'tall' | 'wide';
}

export interface Quote {
  id: string;
  /** Primeiro nome + inicial. A avaliação é pública; o nome completo não vai. */
  name: string;
  text: string;
  date: string;
}

export interface AboutSection {
  title: string;
  subtitle: string;
  paragraphs: string[];
  values: { icon: string; title: string; description: string }[];
}

/* -------------------------------------------------------------------------- */
/* PEÇAS EM EXPOSIÇÃO                                                          */
/* -------------------------------------------------------------------------- */
/* Fotografias do próprio estabelecimento, publicadas por ele no Google Maps.  */

export const pieces: Piece[] = [
  {
    id: 'orquidea',
    title: 'Orquídea',
    caption: 'Haste amarela sobre esfera de musgo, apoiada sem vaso.',
    image: '/pecas/orquidea.webp',
    span: 'tall',
  },
  {
    id: 'aglaonema',
    title: 'Aglaonema',
    caption: 'Folhagem rosada. O tamanho cabe nas duas mãos.',
    image: '/pecas/aglaonema.webp',
  },
  {
    id: 'singonio-suporte',
    title: 'Singônio com suporte',
    caption: 'Esfera suspensa dentro de um cubo de metal preto.',
    image: '/pecas/singonio-suporte.webp',
    span: 'tall',
  },
  {
    id: 'podocarpo-suporte',
    title: 'Podocarpo com suporte',
    caption: 'Porte vertical em base aramada, junto à janela.',
    image: '/pecas/podocarpo-suporte.webp',
  },
  {
    id: 'anturio-verde',
    title: 'Antúrio',
    caption: 'Folhas largas sobre disco de madeira.',
    image: '/pecas/anturio-verde.webp',
  },
  {
    id: 'anturios-vitrine',
    title: 'Antúrios na vitrine',
    caption: 'Floração vermelha na bancada que dá para a rua.',
    image: '/pecas/anturios-vitrine.webp',
    span: 'wide',
  },
];

/* -------------------------------------------------------------------------- */
/* VOZES                                                                       */
/* -------------------------------------------------------------------------- */
/*
  Avaliações reais do Google (5,0 · 77 avaliações), transcritas literalmente.

  CUIDADO QUE CUSTOU UMA CONFERÊNCIA: o Maps concatena a RESPOSTA DA LOJA no
  mesmo bloco de texto da avaliação. Duas destas vinham com a fala da própria
  dona grudada no fim — publicar assim seria atribuir ao cliente algo que ele
  não escreveu. O texto abaixo já vem separado.
*/

export const quotes: Quote[] = [
  {
    id: 'q-lucas',
    name: 'Lucas H.',
    text: 'A Micheli demonstra ter muito conhecimento dessa arte de cultivo de plantas e me senti seguro em comprar e cuidar, apesar da minha pouca experiência com plantas em geral.',
    date: 'há 1 mês',
  },
  {
    id: 'q-sandra',
    name: 'Sandra M.',
    text: 'A loja é perfeita, uma kokedama mais linda que a outra. Gostei tanto que resolvi participar da oficina e adorei.',
    date: 'há 2 meses',
  },
  {
    id: 'q-larissa',
    name: 'Larissa C.',
    text: 'Passei e vi a loja, e achei maravilhosa por fora. Mas por dentro, a experiência foi ainda mais incrível.',
    date: 'há 5 meses',
  },
  {
    id: 'q-gabor',
    name: 'Gabor G.',
    text: 'Lindíssimo trabalho. Comprei para a minha esposa e, quando viu, tirou foto para mandar para toda a família.',
    date: 'há 6 meses',
  },
  {
    id: 'q-vic',
    name: 'Vic T.',
    text: 'Experiência maravilhosa e ambiente acolhedor para todos.',
    date: 'há 5 meses',
  },
  {
    id: 'q-vanessa',
    name: 'Vanessa R.',
    text: 'Ganhei de uma pessoa muito especial na minha vida. Depois disso me apaixonei e comprei outros.',
    date: 'há 4 meses',
  },
];

/* -------------------------------------------------------------------------- */
/* SOBRE                                                                       */
/* -------------------------------------------------------------------------- */

export const about: AboutSection = {
  title: 'Uma esfera de musgo, uma planta, nenhum vaso',
  subtitle: 'Kokedama é a técnica japonesa que sustenta a raiz em terra e musgo',
  paragraphs: [
    'A Kokedami fica na Rua Itapeti, no Tatuapé, e é atendida pela Michele. Cada peça é montada à mão: a planta, a esfera e o suporte são escolhidos juntos.',
    'Além da loja, a casa recebe oficinas — várias das avaliações são de quem entrou para comprar e voltou para aprender a fazer.',
    'Não há tabela de preço publicada porque não há duas peças iguais. O valor sai na conversa, junto com a escolha da planta.',
  ],
  values: [
    {
      icon: '',
      title: '5,0 no Google',
      description: '77 avaliações da unidade Tatuapé.',
    },
    {
      icon: '',
      title: 'Feito à mão',
      description: 'Cada esfera é montada peça a peça na loja.',
    },
    {
      icon: '',
      title: 'Oficinas',
      description: 'Aulas para montar a própria kokedama.',
    },
    {
      icon: '',
      title: 'Entrega expressa',
      description: 'Retirada na loja ou entrega combinada no WhatsApp.',
    },
  ],
};

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
  ...(pieces.length > 0 ? [{ id: 'expositor', label: 'Expositor' }] : []),
  { id: 'sobre', label: 'Sobre' },
  ...(quotes.length > 0 ? [{ id: 'vozes', label: 'Vozes' }] : []),
];
