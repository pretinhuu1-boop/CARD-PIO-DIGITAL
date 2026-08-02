'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, SearchX, MessageCircle, Search, X } from 'lucide-react';
import { SearchBar } from '@/components/ui/SearchBar';
import { CategoryChip } from '@/components/ui/CategoryChip';
import { CategoryRail } from '@/components/ui/CategoryRail';
import { Badge } from '@/components/ui/Badge';
import { Price } from '@/components/ui/Price';
import { ProductImage } from '@/components/ui/ProductImage';
import { ProductBottomSheet } from '@/components/ui/ProductBottomSheet';
import { products, categories, type Product, type Category } from '@/lib/data';
import { hasCheckout, hasPerItemContact, isSellable } from '@/lib/format';
import { useCart } from '@/lib/store';
import { store } from '@/lib/config';
import { buildItemEnquiryMessage, buildWhatsAppUrl } from '@/lib/whatsapp';
import { cn, calculateDiscount, normalize } from '@/lib/utils';

/**
 * O catálogo inteiro, em seções ancoradas.
 *
 * A versão anterior FILTRAVA: escolher uma categoria escondia todas as outras.
 * Com onze seções e 146 produtos isso significa que o visitante via 3% do
 * cardápio por vez e precisava adivinhar que havia mais. Aqui a página mostra
 * tudo e o controle de categoria NAVEGA — a categoria ativa acompanha a
 * rolagem em vez de comandá-la.
 *
 * A busca é a única coisa que ainda reduz o conjunto, porque aí reduzir é o
 * pedido explícito do visitante. Durante a busca as âncoras somem: navegar por
 * seção dentro de um resultado de busca não quer dizer nada.
 *
 * MOBILE
 * ------
 * Busca e categorias dividem UMA barra fixa. Empilhadas, custavam ~124px da
 * primeira tela antes de qualquer produto aparecer — quase uma linha inteira
 * de card num aparelho de 812px. A busca fica como ícone e só ocupa a barra
 * quando é acionada.
 */

/** Banda fina no meio da tela. A seção que a cruza é a "seção atual". */
const SPY_BAND = '-45% 0px -50% 0px';

export function Catalog() {
  const { searchQuery, setSearchQuery, addItem, quantityOf } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const query = normalize(searchQuery.trim());
  const searching = query.length > 0;

  /** Categorias que têm produto. Seção vazia não vira âncora morta. */
  const sections = useMemo(() => {
    return categories
      .filter((c) => c.slug !== 'todos')
      .map((category) => ({
        category,
        items: products.filter((p) => p.category === category.slug),
      }))
      .filter((s) => s.items.length > 0);
  }, []);

  const [active, setActive] = useState(() => sections[0]?.category.slug ?? '');

  const results = useMemo(() => {
    if (!searching) return [];
    return products.filter(
      (p) =>
        normalize(p.name).includes(query) ||
        normalize(p.description).includes(query),
    );
  }, [query, searching]);

  /* Scroll-spy. Desligado durante a busca, quando não há seção a espiar. */
  useEffect(() => {
    if (searching || sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActive(visible.target.id.replace(/^cat-/, ''));
      },
      { rootMargin: SPY_BAND, threshold: 0 },
    );

    const nodes = sections
      .map((s) => document.getElementById(`cat-${s.category.slug}`))
      .filter((el): el is HTMLElement => el !== null);

    nodes.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [searching, sections]);

  const goToSection = useCallback((slug: string) => {
    // Marca imediatamente: esperar o observer faz o controle parecer travado.
    setActive(slug);
    document
      .getElementById(`cat-${slug}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const closeMobileSearch = useCallback(() => {
    setSearchOpen(false);
    setSearchQuery('');
  }, [setSearchQuery]);

  const railCategories: Category[] = sections.map((s) => s.category);
  const hasRail = railCategories.length > 1;

  return (
    <section
      id="catalogo"
      className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16"
    >
      {/* Desktop: busca inline, acima do conteúdo. */}
      <div className="mb-8 hidden max-w-lg lg:block">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      {/* Mobile: uma barra fixa só, com busca e categorias. */}
      <div className="sticky top-16 z-30 -mx-4 mb-6 border-b border-line bg-surface/95 px-4 py-2 backdrop-blur lg:hidden">
        {searchOpen || searching ? (
          <div className="flex items-center gap-2">
            <div className="min-w-0 flex-1">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                autoFocus={searchOpen}
              />
            </div>
            <button
              type="button"
              onClick={closeMobileSearch}
              className="focus-ring flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink-2"
              aria-label="Fechar busca"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="focus-ring flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-ink-2"
              aria-label="Buscar no catálogo"
            >
              <Search className="h-5 w-5" aria-hidden="true" />
            </button>
            {hasRail && (
              <div className="min-w-0 flex-1">
                <CategoryChip
                  categories={railCategories}
                  selected={active}
                  onChange={goToSection}
                />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="lg:grid lg:grid-cols-[13rem_1fr] lg:gap-12">
        <aside className="hidden lg:block">
          {!searching && hasRail && (
            <CategoryRail
              categories={railCategories}
              active={active}
              onNavigate={goToSection}
            />
          )}
        </aside>

        <div className="min-w-0">
          {searching ? (
            <SearchResults
              results={results}
              term={searchQuery.trim()}
              onClear={() => setSearchQuery('')}
              onSelect={setSelectedProduct}
              onAdd={addItem}
              quantityOf={quantityOf}
            />
          ) : (
            sections.map(({ category, items }) => (
              <section
                key={category.slug}
                id={`cat-${category.slug}`}
                data-category-slug={category.slug}
                /* Compensa header fixo + barra fixa do mobile, senão a âncora
                   para com o título escondido atrás dos dois. */
                className="scroll-mt-32 pb-12 lg:scroll-mt-24 lg:pb-14"
              >
                <h2 className="mb-5 font-display text-xl text-ink sm:text-2xl lg:text-3xl">
                  {category.emoji && (
                    <span className="mr-2" aria-hidden="true">
                      {category.emoji}
                    </span>
                  )}
                  {category.name}
                </h2>
                <ProductCards
                  items={items}
                  onSelect={setSelectedProduct}
                  onAdd={addItem}
                  quantityOf={quantityOf}
                />
              </section>
            ))
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <ProductBottomSheet
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

interface CardsProps {
  items: Product[];
  onSelect: (p: Product) => void;
  onAdd: (p: Product, q?: number) => void;
  quantityOf: (id: string) => number;
}

function SearchResults({
  results,
  term,
  onClear,
  onSelect,
  onAdd,
  quantityOf,
}: Omit<CardsProps, 'items'> & {
  results: Product[];
  term: string;
  onClear: () => void;
}) {
  if (results.length === 0) {
    return (
      <div className="py-20 text-center">
        <SearchX className="mx-auto mb-4 h-10 w-10 text-ink-3" aria-hidden="true" />
        <p className="font-display text-lg text-ink">
          Nada encontrado para “{term}”
        </p>
        <p className="mx-auto mt-2 max-w-sm text-sm text-ink-2">
          A busca cobre nome e descrição de todos os itens do catálogo.
        </p>
        {/* Estado vazio SEM saída deixa o visitante preso na própria busca. */}
        <button
          type="button"
          onClick={onClear}
          className="focus-ring mt-6 inline-flex min-h-[44px] items-center rounded-control bg-brand px-5 text-sm font-medium text-on-brand"
        >
          Limpar busca e ver tudo
        </button>
      </div>
    );
  }

  return (
    <>
      <p className="mb-5 text-sm text-ink-2" role="status">
        {results.length} {results.length === 1 ? 'item' : 'itens'} para “{term}”
      </p>
      <ProductCards
        items={results}
        onSelect={onSelect}
        onAdd={onAdd}
        quantityOf={quantityOf}
      />
    </>
  );
}

function ProductCards({ items, onSelect, onAdd, quantityOf }: CardsProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}
      className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3"
    >
      {items.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          quantity={quantityOf(product.id)}
          onSelect={onSelect}
          onAdd={onAdd}
        />
      ))}
    </motion.div>
  );
}

function ProductCard({
  product,
  quantity,
  onSelect,
  onAdd,
}: {
  product: Product;
  quantity: number;
  onSelect: (p: Product) => void;
  onAdd: (p: Product, q?: number) => void;
}) {
  const sellable = isSellable(product);

  return (
    <motion.article
      /*
        O catálogo de cada card fica legível no próprio DOM. Serve à suíte de
        testes de navegador e é o que permite ao snapshot estático recriar
        busca, navegação e carrinho sem o React. Sem estes `data-*` o gerador
        sai em silêncio e o arquivo nasce estático, sem erro nenhum.
      */
      data-product-id={product.id}
      data-product-name={product.name}
      data-product-price={product.price ?? ''}
      data-product-category={product.category}
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className="group flex flex-col"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-surface-2">
        <ProductImage src={product.image} alt={product.name} />

        {/* Alvo de clique E de teclado sobre a imagem. Uma <div> com onClick
            aqui era inalcançável por Tab. */}
        <button
          type="button"
          onClick={() => onSelect(product)}
          className="focus-ring absolute inset-0 z-10"
          aria-label={`Ver detalhes de ${product.name}`}
        />

        {product.badge && (
          <div className="pointer-events-none absolute left-2 top-2 z-20 sm:left-3 sm:top-3">
            <Badge badge={product.badge} />
          </div>
        )}

        {quantity > 0 && (
          <span className="pointer-events-none absolute right-2 top-2 z-20 flex h-7 min-w-7 items-center justify-center rounded-full bg-brand px-1.5 text-xs font-bold text-on-brand tabular-nums sm:right-3 sm:top-3">
            {quantity}
          </span>
        )}

        {product.originalPrice != null && product.price != null && (
          <span className="pointer-events-none absolute bottom-2 right-2 z-20 rounded-full bg-brand px-2 py-1 text-xs font-medium text-on-brand sm:bottom-3 sm:right-3">
            -{calculateDiscount(product.originalPrice, product.price)}%
          </span>
        )}

        {!product.available && (
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-surface/75">
            <span className="rounded-full bg-surface px-3 py-1.5 text-xs font-medium text-ink-2">
              Indisponível
            </span>
          </div>
        )}

        {/*
          Visível por padrão no toque; no desktop aparece no hover ou no foco de
          teclado. A versão `opacity-0 group-hover:opacity-100` era invisível e
          inalcançável em qualquer celular.

          No celular o rótulo some e sobra o ícone: "Adicionar" por extenso num
          card de 171px empurra o botão para fora da imagem.
        */}
        {hasCheckout && sellable && (
          <motion.button
            type="button"
            whileTap={{ scale: 0.94 }}
            onClick={() => onAdd(product, 1)}
            className={cn(
              'focus-ring absolute bottom-2 left-2 z-30 sm:bottom-3 sm:left-3',
              'flex h-11 min-w-11 items-center justify-center gap-1.5 rounded-full px-3 sm:px-4',
              'bg-brand text-sm font-medium text-on-brand shadow-md',
              'transition-opacity duration-200',
              'md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100',
            )}
            aria-label={`Adicionar ${product.name} ao pedido`}
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Adicionar</span>
          </motion.button>
        )}

        {/* Expositor: sem carrinho, cada peça abre a conversa já dizendo qual. */}
        {hasPerItemContact && store.whatsapp && (
          <a
            href={buildWhatsAppUrl(buildItemEnquiryMessage(product.name))}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'focus-ring absolute bottom-2 left-2 z-30 sm:bottom-3 sm:left-3',
              'flex h-11 min-w-11 items-center justify-center gap-1.5 rounded-full px-3 sm:px-4',
              'bg-brand text-sm font-medium text-on-brand shadow-md',
            )}
            aria-label={`Perguntar sobre ${product.name} no WhatsApp`}
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Perguntar</span>
          </a>
        )}
      </div>

      <button
        type="button"
        onClick={() => onSelect(product)}
        className="focus-ring mt-2.5 rounded-sm text-left"
      >
        <h3 className="line-clamp-2 text-sm font-medium leading-snug text-ink">
          {product.name}
        </h3>
        <div className="mt-1.5">
          <Price product={product} size="sm" />
        </div>
      </button>
    </motion.article>
  );
}
