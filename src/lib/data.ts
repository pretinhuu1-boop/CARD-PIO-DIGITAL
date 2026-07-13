export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  badge?: 'maisVendido' | 'novo' | 'promo' | 'zeroLactose' | 'vegano';
  rating: number;
  reviews: number;
  ingredients?: string[];
  available: boolean;
  tags?: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  isPromo?: boolean;
  servings?: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  emoji: string;
  productCount: number;
}

export interface Promo {
  id: string;
  title: string;
  description: string;
  discount: number;
  code: string;
  bgGradient: string;
}

export interface Combo {
  id: string;
  name: string;
  description: string;
  products: string[];
  originalPrice: number;
  comboPrice: number;
  savings: number;
}

export interface BrandStory {
  title: string;
  subtitle: string;
  paragraphs: string[];
  values: { icon: string; title: string; description: string }[];
}

export interface Tier {
  name: string;
  minPoints: number;
  benefits: string[];
  icon: string;
  color: string;
}

export const freeShippingThreshold = 89.90;
export const freeGiftThreshold = 150.00;

export const categories: Category[] = [
  { slug: 'todos', name: 'Todos', description: 'Todos os produtos', emoji: '✨', productCount: 0 },
  { slug: 'doces-finos', name: 'Doces Finos', description: 'Brigadeiros gourmet, trufas e delícias artesanais', emoji: '🍬', productCount: 6 },
  { slug: 'tortas', name: 'Tortas & Fatias', description: 'Tortas inteiras e fatias individuais', emoji: '🥧', productCount: 5 },
  { slug: 'bolos', name: 'Bolos Artesanais', description: 'Bolos decorados para todas as ocasiões', emoji: '🎂', productCount: 4 },
  { slug: 'brownies', name: 'Brownies & Cookies', description: 'Brownies trufados e cookies artesanais', emoji: '🍫', productCount: 4 },
  { slug: 'sobremesas', name: 'Sobremesas', description: 'Parfaits, zeppole e sobremesas especiais', emoji: '🍨', productCount: 4 },
  { slug: 'salgados', name: 'Salgados Gourmet', description: 'Quiches, empadas e salgados finos', emoji: '🥐', productCount: 4 },
  { slug: 'cafes', name: 'Cafés & Bebidas', description: 'Cafés especiais e bebidas artesanais', emoji: '☕', productCount: 5 },
  { slug: 'zero-lactose', name: 'Zero Lactose', description: 'Opções sem lactose com muito sabor', emoji: '🌿', productCount: 3 },
];

export const products: Product[] = [
  // Doces Finos
  {
    id: 'df-1',
    name: 'Brigadeiro Gourmet (cx 12un)',
    description: 'Caixa premium com 12 brigadeiros em sabores exclusivos: belga, pistache, maracujá e mais',
    price: 54.90,
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_32LW5eC5KZQPF2BSp47dcBMOdI6/hf_20260713_183404_76c441ad-f2d2-4218-9ec0-a359cf44a4e1_min.webp',
    category: 'doces-finos',
    badge: 'maisVendido',
    rating: 4.9,
    reviews: 324,
    available: true,
    tags: ['gourmet', 'presente', 'premium'],
    isBestSeller: true,
    servings: '12 unidades',
  },
  {
    id: 'df-2',
    name: 'Trufas Artesanais (cx 6un)',
    description: 'Seleção de trufas com chocolate belga 70%, recheios cremosos e acabamento impecável',
    price: 42.90,
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_32LW5eC5KZQPF2BSp47dcBMOdI6/hf_20260713_183441_516af657-545c-402d-847c-8f48026dbefe_min.webp',
    category: 'doces-finos',
    rating: 4.8,
    reviews: 187,
    available: true,
    tags: ['chocolate', 'presente'],
    servings: '6 unidades',
  },
  {
    id: 'df-3',
    name: 'Palha Italiana Premium',
    description: 'Palha italiana com chocolate nobre, leite condensado artesanal e biscoito crocante',
    price: 38.90,
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_32LW5eC5KZQPF2BSp47dcBMOdI6/hf_20260713_183443_67e28cc2-78c8-4d76-9fa5-0ab3125b3603_min.webp',
    category: 'doces-finos',
    badge: 'novo',
    rating: 4.7,
    reviews: 98,
    available: true,
    tags: ['chocolate', 'crocante'],
    isNew: true,
    servings: '8 unidades',
  },
  {
    id: 'df-4',
    name: 'Bem-Casados (cx 20un)',
    description: 'Bem-casados tradicionais com massa amanteigada e doce de leite caseiro',
    price: 69.90,
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_32LW5eC5KZQPF2BSp47dcBMOdI6/hf_20260713_183445_9685cd06-021f-4385-9721-1b9ec648f1a3_min.webp',
    category: 'doces-finos',
    rating: 4.9,
    reviews: 156,
    available: true,
    tags: ['casamento', 'presente', 'tradicional'],
    servings: '20 unidades',
  },
  {
    id: 'df-5',
    name: 'Cajuzinho Gourmet (cx 12un)',
    description: 'Cajuzinhos artesanais com amendoim premium torrado e cobertura especial',
    price: 44.90,
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_32LW5eC5KZQPF2BSp47dcBMOdI6/hf_20260713_183446_999f2063-132f-4bac-b11f-073417faa43a_min.webp',
    category: 'doces-finos',
    rating: 4.6,
    reviews: 72,
    available: true,
    tags: ['tradicional', 'amendoim'],
    servings: '12 unidades',
  },
  {
    id: 'df-6',
    name: 'Olho de Sogra (cx 12un)',
    description: 'Ameixa recheada com doce de leite e coco, coberta com chocolate',
    price: 49.90,
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_32LW5eC5KZQPF2BSp47dcBMOdI6/hf_20260713_183453_6c340108-5f55-4123-a8f8-ae366dcbc932_min.webp',
    category: 'doces-finos',
    rating: 4.7,
    reviews: 63,
    available: true,
    tags: ['ameixa', 'tradicional'],
    servings: '12 unidades',
  },

  // Tortas & Fatias
  {
    id: 'to-1',
    name: 'Torta de Limão Siciliano',
    description: 'Base crocante de biscoito, curd de limão siciliano fresco e merengue italiano maçaricado',
    price: 89.90,
    originalPrice: 109.90,
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_32LW5eC5KZQPF2BSp47dcBMOdI6/hf_20260713_183454_c08d616a-32b6-497c-807a-57e83ad9b9a6_min.webp',
    category: 'tortas',
    badge: 'promo',
    rating: 4.9,
    reviews: 213,
    available: true,
    tags: ['cítrico', 'premium'],
    isPromo: true,
    servings: '8-10 fatias',
  },
  {
    id: 'to-2',
    name: 'Cheesecake Frutas Vermelhas',
    description: 'Cheesecake NY style ultra cremoso com calda artesanal de frutas vermelhas frescas',
    price: 79.90,
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_32LW5eC5KZQPF2BSp47dcBMOdI6/hf_20260713_183456_51bc9c38-08ac-4322-83e6-d84edafc43f8_min.webp',
    category: 'tortas',
    badge: 'maisVendido',
    rating: 4.9,
    reviews: 289,
    available: true,
    tags: ['cremoso', 'frutas'],
    isBestSeller: true,
    servings: '8-10 fatias',
  },
  {
    id: 'to-3',
    name: 'Torta Holandesa',
    description: 'Camadas de creme de baunilha, biscoito e calda de chocolate belga',
    price: 74.90,
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_32LW5eC5KZQPF2BSp47dcBMOdI6/hf_20260713_183457_67f0d36b-3932-4cb4-bd70-109d76ba0abb_min.webp',
    category: 'tortas',
    rating: 4.7,
    reviews: 145,
    available: true,
    tags: ['chocolate', 'clássico'],
    servings: '8-10 fatias',
  },
  {
    id: 'to-4',
    name: 'Fatia de Torta (escolha o sabor)',
    description: 'Fatia generosa da torta do dia - consulte sabores disponíveis',
    price: 16.90,
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_32LW5eC5KZQPF2BSp47dcBMOdI6/hf_20260713_183505_29c79ed5-724f-435e-8915-ea2f3e79a630_min.webp',
    category: 'tortas',
    rating: 4.8,
    reviews: 167,
    available: true,
    tags: ['individual', 'lanche'],
    servings: '1 fatia',
  },
  {
    id: 'to-5',
    name: 'Torta de Morango com Chocolate',
    description: 'Base de brownie, ganache de chocolate meio amargo e morangos frescos',
    price: 94.90,
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_32LW5eC5KZQPF2BSp47dcBMOdI6/hf_20260713_183506_92d9a2d1-92f3-428c-9cd7-5b6c86de497c_min.webp',
    category: 'tortas',
    badge: 'novo',
    rating: 4.8,
    reviews: 56,
    available: true,
    tags: ['morango', 'chocolate'],
    isNew: true,
    servings: '8-10 fatias',
  },

  // Bolos Artesanais
  {
    id: 'bo-1',
    name: 'Bolo Red Velvet Premium',
    description: 'Bolo red velvet com camadas de cream cheese artesanal e frutas vermelhas frescas',
    price: 99.90,
    originalPrice: 119.90,
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_32LW5eC5KZQPF2BSp47dcBMOdI6/hf_20260713_183507_6a414511-e5ce-45b1-9087-023f83b05c42_min.webp',
    category: 'bolos',
    badge: 'maisVendido',
    rating: 4.9,
    reviews: 267,
    available: true,
    tags: ['premium', 'festa', 'aniversário'],
    isBestSeller: true,
    isPromo: true,
    servings: '12-15 fatias',
  },
  {
    id: 'bo-2',
    name: 'Bolo de Cenoura com Brigadeiro',
    description: 'Bolo de cenoura ultra fofinho com cobertura generosa de brigadeiro cremoso',
    price: 64.90,
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_32LW5eC5KZQPF2BSp47dcBMOdI6/hf_20260713_183508_cb814870-a0a8-486a-bf68-f254fd2c3092_min.webp',
    category: 'bolos',
    rating: 4.8,
    reviews: 198,
    available: true,
    tags: ['clássico', 'família'],
    servings: '10-12 fatias',
  },
  {
    id: 'bo-3',
    name: 'Bolo de Chocolate Belga',
    description: 'Três camadas de bolo de chocolate com ganache de chocolate belga 60%',
    price: 89.90,
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_32LW5eC5KZQPF2BSp47dcBMOdI6/hf_20260713_183515_2bc41537-4f05-43f3-9244-76bcf6f980f3_min.webp',
    category: 'bolos',
    rating: 4.9,
    reviews: 234,
    available: true,
    tags: ['chocolate', 'festa'],
    servings: '12-15 fatias',
  },
  {
    id: 'bo-4',
    name: 'Naked Cake Frutas',
    description: 'Naked cake rústico com creme de confeiteiro, frutas frescas da estação e flores comestíveis',
    price: 109.90,
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_32LW5eC5KZQPF2BSp47dcBMOdI6/hf_20260713_183516_0cad6709-b85e-4581-93ca-0d069e160b36_min.webp',
    category: 'bolos',
    badge: 'novo',
    rating: 4.8,
    reviews: 87,
    available: true,
    tags: ['rústico', 'casamento', 'festa'],
    isNew: true,
    servings: '15-20 fatias',
  },

  // Brownies & Cookies
  {
    id: 'br-1',
    name: 'Brownie Belga Trufado',
    description: 'Brownie intenso com chocolate belga 70%, centro trufado e crocância perfeita',
    price: 16.90,
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_32LW5eC5KZQPF2BSp47dcBMOdI6/hf_20260713_183518_4b0dcb7b-51f8-4607-94ee-7e8ddd667436_min.webp',
    category: 'brownies',
    badge: 'maisVendido',
    rating: 4.8,
    reviews: 312,
    available: true,
    tags: ['gourmet', 'chocolate'],
    isBestSeller: true,
    servings: '1 unidade',
  },
  {
    id: 'br-2',
    name: 'Cookie Double Chocolate',
    description: 'Cookie gigante artesanal com gotas de chocolate branco e ao leite, center soft',
    price: 14.90,
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_32LW5eC5KZQPF2BSp47dcBMOdI6/hf_20260713_183519_5c6b3f2c-b79c-47b4-8ece-fd1151aec5f2_min.webp',
    category: 'brownies',
    rating: 4.7,
    reviews: 178,
    available: true,
    tags: ['crocante', 'chocolate'],
    servings: '1 unidade',
  },
  {
    id: 'br-3',
    name: 'Brownie Box (4un)',
    description: 'Caixa com 4 brownies sortidos: tradicional, nozes, cream cheese e Nutella',
    price: 49.90,
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_32LW5eC5KZQPF2BSp47dcBMOdI6/hf_20260713_183525_a7b2d23a-1f36-450d-8afe-6d4744e15785_min.webp',
    category: 'brownies',
    badge: 'promo',
    rating: 4.9,
    reviews: 145,
    originalPrice: 59.90,
    available: true,
    tags: ['caixa', 'presente'],
    isPromo: true,
    servings: '4 unidades',
  },
  {
    id: 'br-4',
    name: 'Cookie Jar (6un)',
    description: 'Pote com 6 cookies artesanais em sabores variados - perfeito para presentear',
    price: 54.90,
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_32LW5eC5KZQPF2BSp47dcBMOdI6/hf_20260713_183527_0970cee7-b59a-459b-8de0-c6a6162eb8aa_min.webp',
    category: 'brownies',
    rating: 4.6,
    reviews: 89,
    available: true,
    tags: ['presente', 'sortido'],
    servings: '6 unidades',
  },

  // Sobremesas
  {
    id: 'sb-1',
    name: 'Parfait de Frutas & Granola',
    description: 'Camadas de iogurte grego, frutas frescas da estação, granola artesanal e mel orgânico',
    price: 24.90,
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_32LW5eC5KZQPF2BSp47dcBMOdI6/hf_20260713_183529_8fef5684-83b7-436c-869a-e6326cc2a9c6_min.webp',
    category: 'sobremesas',
    badge: 'novo',
    rating: 4.7,
    reviews: 112,
    available: true,
    tags: ['saudável', 'frutas'],
    isNew: true,
    servings: '1 porção',
  },
  {
    id: 'sb-2',
    name: 'Zeppola com Nutella',
    description: 'Zeppole italianas quentinhas, fritas na hora, com Nutella e açúcar de confeiteiro',
    price: 22.90,
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_32LW5eC5KZQPF2BSp47dcBMOdI6/hf_20260713_183529_99058cff-9767-4edc-8116-8a8bc159274c_min.webp',
    category: 'sobremesas',
    badge: 'maisVendido',
    rating: 4.9,
    reviews: 245,
    available: true,
    tags: ['quente', 'italiano'],
    isBestSeller: true,
    servings: '6 unidades',
  },
  {
    id: 'sb-3',
    name: 'Bolo de Pote (escolha o sabor)',
    description: 'Bolo de pote cremoso nos sabores: Ninho, Prestígio, Brigadeiro ou Red Velvet',
    price: 18.90,
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_32LW5eC5KZQPF2BSp47dcBMOdI6/hf_20260713_183536_c26b0d76-6189-4be4-b5e8-f95d6c141702_min.webp',
    category: 'sobremesas',
    rating: 4.6,
    reviews: 167,
    available: true,
    tags: ['individual', 'cremoso'],
    servings: '1 pote (300ml)',
  },
  {
    id: 'sb-4',
    name: 'Pudim de Leite Condensado',
    description: 'Pudim artesanal de leite condensado com calda de caramelo na medida certa',
    price: 14.90,
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_32LW5eC5KZQPF2BSp47dcBMOdI6/hf_20260713_183537_7f9a2b38-c8ed-406e-9137-c3c2ffc8a450_min.webp',
    category: 'sobremesas',
    rating: 4.8,
    reviews: 198,
    available: true,
    tags: ['tradicional', 'caramelo'],
    servings: '1 fatia',
  },

  // Salgados Gourmet
  {
    id: 'sg-1',
    name: 'Quiche Lorraine',
    description: 'Quiche clássica com bacon artesanal, queijo gruyère e creme fresco',
    price: 59.90,
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_32LW5eC5KZQPF2BSp47dcBMOdI6/hf_20260713_183539_2f8b4ce5-3c73-46c7-acfa-309c59bd5dcb_min.webp',
    category: 'salgados',
    rating: 4.7,
    reviews: 134,
    available: true,
    tags: ['quiche', 'almoço'],
    servings: '6-8 fatias',
  },
  {
    id: 'sg-2',
    name: 'Empada Gourmet (6un)',
    description: 'Mini empadas artesanais: frango com catupiry, palmito e camarão',
    price: 34.90,
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_32LW5eC5KZQPF2BSp47dcBMOdI6/hf_20260713_183541_a0dca5fc-09d6-405d-b053-6e8ceca78cc0_min.webp',
    category: 'salgados',
    badge: 'maisVendido',
    rating: 4.8,
    reviews: 223,
    available: true,
    tags: ['mini', 'sortido'],
    isBestSeller: true,
    servings: '6 unidades',
  },
  {
    id: 'sg-3',
    name: 'Coxinha Gourmet (6un)',
    description: 'Coxinhas artesanais com recheio cremoso de frango desfiado e catupiry',
    price: 29.90,
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_32LW5eC5KZQPF2BSp47dcBMOdI6/hf_20260713_183555_ce3f0e10-a6f9-401f-b8eb-058751a60ae8_min.webp',
    category: 'salgados',
    rating: 4.7,
    reviews: 189,
    available: true,
    tags: ['frito', 'tradicional'],
    servings: '6 unidades',
  },
  {
    id: 'sg-4',
    name: 'Mini Quiche Sortida (8un)',
    description: 'Seleção de mini quiches: queijo, espinafre, tomate seco e cogumelos',
    price: 44.90,
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_32LW5eC5KZQPF2BSp47dcBMOdI6/hf_20260713_183556_05e67c99-c50c-447f-93f9-d15a01a758dd_min.webp',
    category: 'salgados',
    badge: 'vegano',
    rating: 4.6,
    reviews: 78,
    available: true,
    tags: ['mini', 'vegetariano'],
    servings: '8 unidades',
  },

  // Cafés & Bebidas
  {
    id: 'cf-1',
    name: 'Café Especial Coado',
    description: 'Café de origem única, torrado artesanalmente e coado na hora',
    price: 9.90,
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_32LW5eC5KZQPF2BSp47dcBMOdI6/hf_20260713_183558_048fdcd2-88b9-4ae6-96c2-ceef10d78cdd_min.webp',
    category: 'cafes',
    rating: 4.8,
    reviews: 345,
    available: true,
    tags: ['quente', 'especial'],
    servings: '200ml',
  },
  {
    id: 'cf-2',
    name: 'Cappuccino Cremoso',
    description: 'Espresso duplo com leite vaporizado e espuma aveludada, finalizado com canela',
    price: 14.90,
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_32LW5eC5KZQPF2BSp47dcBMOdI6/hf_20260713_183559_83a2f41f-9caf-471c-86f2-e2d2e618e5eb_min.webp',
    category: 'cafes',
    badge: 'maisVendido',
    rating: 4.9,
    reviews: 278,
    available: true,
    tags: ['quente', 'cremoso'],
    isBestSeller: true,
    servings: '300ml',
  },
  {
    id: 'cf-3',
    name: 'Chocolate Quente Belga',
    description: 'Chocolate quente feito com chocolate belga derretido e leite integral',
    price: 16.90,
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_32LW5eC5KZQPF2BSp47dcBMOdI6/hf_20260713_183607_6817d955-ee74-41e5-bbe0-b774a0fbea53_min.webp',
    category: 'cafes',
    rating: 4.8,
    reviews: 167,
    available: true,
    tags: ['quente', 'chocolate'],
    servings: '300ml',
  },
  {
    id: 'cf-4',
    name: 'Suco Natural da Estação',
    description: 'Suco natural feito na hora com frutas frescas da estação',
    price: 12.90,
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_32LW5eC5KZQPF2BSp47dcBMOdI6/hf_20260713_183609_bb89dde1-b0de-4f49-9099-e232040f478b_min.webp',
    category: 'cafes',
    rating: 4.5,
    reviews: 89,
    available: true,
    tags: ['frio', 'natural', 'saudável'],
    servings: '400ml',
  },
  {
    id: 'cf-5',
    name: 'Limonada Suíça',
    description: 'Limonada cremosa com leite condensado, limão fresco e gelo',
    price: 13.90,
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_32LW5eC5KZQPF2BSp47dcBMOdI6/hf_20260713_183612_6a9b36e3-00fe-45b1-8497-5a1f846fad84_min.webp',
    category: 'cafes',
    badge: 'novo',
    rating: 4.7,
    reviews: 56,
    available: true,
    tags: ['frio', 'refrescante'],
    isNew: true,
    servings: '400ml',
  },

  // Zero Lactose
  {
    id: 'zl-1',
    name: 'Brownie Zero Lactose',
    description: 'Brownie intenso sem lactose, feito com chocolate 70% e óleo de coco',
    price: 18.90,
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_32LW5eC5KZQPF2BSp47dcBMOdI6/hf_20260713_183613_e65b3b71-a985-47d6-8a10-82e4dea9a3be_min.webp',
    category: 'zero-lactose',
    badge: 'zeroLactose',
    rating: 4.7,
    reviews: 89,
    available: true,
    tags: ['sem lactose', 'chocolate'],
    servings: '1 unidade',
  },
  {
    id: 'zl-2',
    name: 'Bolo de Banana Zero Lactose',
    description: 'Bolo úmido de banana com canela, sem lactose, cobertura de chocolate vegano',
    price: 54.90,
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_32LW5eC5KZQPF2BSp47dcBMOdI6/hf_20260713_183625_bf251b4b-9a1b-451b-86a6-1737179cb6f1_min.webp',
    category: 'zero-lactose',
    badge: 'zeroLactose',
    rating: 4.8,
    reviews: 67,
    available: true,
    tags: ['sem lactose', 'banana'],
    servings: '8-10 fatias',
  },
  {
    id: 'zl-3',
    name: 'Brigadeiro Zero Lactose (cx 8un)',
    description: 'Brigadeiros gourmet sem lactose em sabores exclusivos',
    price: 44.90,
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_32LW5eC5KZQPF2BSp47dcBMOdI6/hf_20260713_183626_a94384cb-4102-459c-ac44-5c36493c65e5_min.webp',
    category: 'zero-lactose',
    badge: 'zeroLactose',
    rating: 4.6,
    reviews: 45,
    available: true,
    tags: ['sem lactose', 'gourmet'],
    servings: '8 unidades',
  },
];

export const promos: Promo[] = [
  {
    id: 'promo-1',
    title: 'Semana do Brigadeiro',
    description: 'Todos os brigadeiros gourmet com 20% OFF',
    discount: 20,
    code: 'BRIGADEIRO20',
    bgGradient: 'from-[#8B1A4A] to-[#D4A853]',
  },
  {
    id: 'promo-2',
    title: 'Combo Café da Tarde',
    description: 'Café + fatia de bolo a partir de R$ 19,90',
    discount: 15,
    code: 'CAFETARDE15',
    bgGradient: 'from-[#D4A853] to-[#8B1A4A]',
  },
  {
    id: 'promo-3',
    title: 'Frete Grátis',
    description: 'Em pedidos acima de R$ 89,90 para toda São Paulo',
    discount: 100,
    code: 'FRETEGRATIS',
    bgGradient: 'from-[#2D1B2E] to-[#8B1A4A]',
  },
  {
    id: 'promo-4',
    title: 'Ganhe um Brinde',
    description: 'Brinde especial em compras acima de R$ 150',
    discount: 0,
    code: 'BRINDE150',
    bgGradient: 'from-[#8B1A4A] via-[#A0284C] to-[#D4A853]',
  },
];

export const combos: Combo[] = [
  {
    id: 'combo-1',
    name: 'Combo Festa Completa',
    description: 'Tudo para uma festa inesquecível',
    products: ['Bolo Red Velvet Premium', 'Brigadeiro Gourmet (cx 12un)', 'Palha Italiana Premium'],
    originalPrice: 193.70,
    comboPrice: 159.90,
    savings: 33.80,
  },
  {
    id: 'combo-2',
    name: 'Combo Café & Doce',
    description: 'O par perfeito para o lanche da tarde',
    products: ['Cappuccino Cremoso', 'Brownie Belga Trufado', 'Cookie Double Chocolate'],
    originalPrice: 46.70,
    comboPrice: 36.90,
    savings: 9.80,
  },
  {
    id: 'combo-3',
    name: 'Combo Tortas Premium',
    description: 'Seleção gourmet das nossas melhores tortas',
    products: ['Torta de Limão Siciliano', 'Cheesecake Frutas Vermelhas'],
    originalPrice: 169.80,
    comboPrice: 144.90,
    savings: 24.90,
  },
  {
    id: 'combo-4',
    name: 'Combo Presente Especial',
    description: 'Surpreenda quem você ama',
    products: ['Bem-Casados (cx 20un)', 'Trufas Artesanais (cx 6un)', 'Brigadeiro Gourmet (cx 12un)'],
    originalPrice: 167.70,
    comboPrice: 139.90,
    savings: 27.80,
  },
];

export const brandStory: BrandStory = {
  title: 'Nossa História',
  subtitle: 'Feito com amor desde 2018',
  paragraphs: [
    'A Doces Dondoca nasceu de uma paixão genuína pela confeitaria artesanal e do desejo de criar experiências memoráveis através de cada sabor.',
    'Na nossa cozinha na Vila Gomes Cardim, cada receita é desenvolvida com ingredientes criteriosamente selecionados, técnicas refinadas e a dedicação de quem acredita que um doce bem feito tem o poder de transformar momentos simples em memórias inesquecíveis.',
    'Hoje, somos referência em São Paulo por nossos bolos decorados, doces finos gourmet e cafés especiais — sempre preservando a essência artesanal que nos define.',
  ],
  values: [
    { icon: '🎨', title: 'Artesanal', description: 'Cada peça é feita à mão com atenção obsessiva aos detalhes' },
    { icon: '🌿', title: 'Ingredientes Nobres', description: 'Chocolate belga, frutas frescas e insumos premium selecionados' },
    { icon: '💜', title: 'Feito com Amor', description: 'Carinho e dedicação em cada etapa da produção' },
    { icon: '⭐', title: 'Excelência', description: 'Compromisso inabalável com a qualidade e sua satisfação' },
  ],
};

export const loyaltyTiers: Tier[] = [
  {
    name: 'Bronze',
    minPoints: 0,
    benefits: ['Acúmulo de 1 ponto por real', 'Acesso antecipado a promoções'],
    icon: '🥉',
    color: '#CD7F32',
  },
  {
    name: 'Prata',
    minPoints: 500,
    benefits: ['1.5 pontos por real gasto', 'Frete grátis acima de R$ 50', '5% de desconto em bolos'],
    icon: '🥈',
    color: '#C0C0C0',
  },
  {
    name: 'Ouro',
    minPoints: 1500,
    benefits: ['2 pontos por real gasto', 'Frete grátis sem mínimo', '10% de desconto em tudo', 'Brinde no aniversário'],
    icon: '🥇',
    color: '#D4A853',
  },
  {
    name: 'Diamante',
    minPoints: 5000,
    benefits: ['3 pontos por real gasto', 'Frete grátis sempre', '15% de desconto em tudo', 'Degustação exclusiva', 'Atendimento VIP'],
    icon: '💎',
    color: '#B9F2FF',
  },
];
