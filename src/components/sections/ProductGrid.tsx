'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, SearchX } from 'lucide-react';
import { SearchBar } from '@/components/ui/SearchBar';
import { CategoryChip } from '@/components/ui/CategoryChip';
import { Badge } from '@/components/ui/Badge';
import { ProductImage } from '@/components/ui/ProductImage';
import { ProductBottomSheet } from '@/components/ui/ProductBottomSheet';
import { products, categories, type Product } from '@/lib/data';
import { useCart } from '@/lib/store';
import { cn, formatCurrency, calculateDiscount, normalize } from '@/lib/utils';

export function ProductGrid() {
  const {
    searchQuery,
    selectedCategory,
    addItem,
    quantityOf,
    setSearchQuery,
    setSelectedCategory,
  } = useCart();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const query = normalize(searchQuery.trim());
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'todos' || product.category === selectedCategory;
    const matchesSearch =
      !query ||
      normalize(product.name).includes(query) ||
      normalize(product.description).includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="cardapio" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <span className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Cardápio
        </span>
        <h2 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
          Nossos produtos
        </h2>
      </div>

      <div className="mx-auto mb-6 max-w-lg">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      <div className="mb-10">
        <CategoryChip
          categories={categories}
          selected={selectedCategory}
          onChange={setSelectedCategory}
        />
      </div>

      {filteredProducts.length === 0 ? (
        <div className="py-24 text-center">
          <SearchX className="mx-auto mb-4 h-10 w-10 text-ink-3" aria-hidden="true" />
          <p className="font-display text-lg text-ink">Nenhum produto encontrado</p>
          <p className="mt-2 text-sm text-ink-2">
            {/*
              Busca e categoria são combinadas com E. Procurar "chai" com o
              filtro em "Salgados" não devolve nada — e a causa não é o termo.
              Dizer qual filtro está ativo evita que a pessoa conclua que o
              produto não existe.
            */}
            {selectedCategory !== 'todos' && query
              ? `Nada com esse termo dentro de "${
                  categories.find((c) => c.slug === selectedCategory)?.name ??
                  selectedCategory
                }".`
              : 'Tente outro termo ou escolha outra categoria.'}
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('todos');
            }}
            className="focus-ring mt-6 inline-flex min-h-[44px] items-center rounded-full bg-brand px-6 text-sm font-medium text-on-brand transition-colors hover:bg-brand-hover"
          >
            Ver o cardápio inteiro
          </button>
        </div>
      ) : (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
          className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4"
        >
          {filteredProducts.map((product) => {
            const qty = quantityOf(product.id);

            return (
              <motion.article
                key={product.id}
                /*
                  O catálogo de cada card fica legível no próprio DOM. Serve à
                  suíte de testes de navegador e é o que permite ao snapshot
                  estático (scripts/snapshot-html.mjs) recriar filtro, busca e
                  carrinho sem o runtime do React.
                */
                data-product-id={product.id}
                data-product-name={product.name}
                data-product-price={product.price}
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
                <div className="relative aspect-[3/4] overflow-hidden rounded-card bg-surface-2 sm:aspect-[4/5]">
                  <ProductImage src={product.image} alt={product.name} />

                  {/*
                    Botão invisível cobrindo a imagem: abre o detalhe por clique
                    E por teclado. O card não é mais uma <div> com onClick —
                    aquela versão era inalcançável por Tab.
                  */}
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(product)}
                    className="focus-ring absolute inset-0 z-10"
                    aria-label={`Ver detalhes de ${product.name}`}
                  />

                  {product.badge && (
                    <div className="pointer-events-none absolute left-3 top-3 z-20">
                      <Badge badge={product.badge} />
                    </div>
                  )}

                  {qty > 0 && (
                    <span className="pointer-events-none absolute right-3 top-3 z-20 flex h-7 min-w-7 items-center justify-center rounded-full bg-brand px-1.5 text-xs font-bold text-on-brand tabular-nums">
                      {qty}
                    </span>
                  )}

                  {product.originalPrice && (
                    <span className="pointer-events-none absolute bottom-3 right-3 z-20 rounded-full bg-brand px-2 py-1 text-xs font-medium text-on-brand">
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
                    Atalho de adicionar. Visível por padrão no toque; no desktop
                    aparece no hover ou no foco de teclado. A versão anterior era
                    `opacity-0 group-hover:opacity-100`, ou seja: invisível e
                    inalcançável em qualquer celular.
                  */}
                  {product.available && (
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.94 }}
                      onClick={() => addItem(product, 1)}
                      className={cn(
                        'focus-ring absolute bottom-3 left-3 z-30',
                        'flex min-h-[44px] items-center gap-1.5 rounded-full px-4',
                        'bg-brand text-sm font-medium text-on-brand shadow-md',
                        'transition-opacity duration-200',
                        'md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100',
                      )}
                      aria-label={`Adicionar ${product.name} ao pedido`}
                    >
                      <Plus className="h-4 w-4" aria-hidden="true" />
                      Adicionar
                    </motion.button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProduct(product)}
                  className="focus-ring mt-3 rounded-sm text-left"
                >
                  <h3 className="line-clamp-2 text-sm font-medium leading-snug text-ink">
                    {product.name}
                  </h3>
                  <div className="mt-1.5 flex items-center gap-2">
                    {product.originalPrice && (
                      <span className="text-xs text-ink-3 line-through tabular-nums">
                        {formatCurrency(product.originalPrice)}
                      </span>
                    )}
                    <span className="text-sm font-semibold text-ink tabular-nums">
                      {formatCurrency(product.price)}
                    </span>
                  </div>
                </button>
              </motion.article>
            );
          })}
        </motion.div>
      )}

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
