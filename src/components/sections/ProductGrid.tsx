'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ShoppingBag } from 'lucide-react';
import { SearchBar } from '@/components/ui/SearchBar';
import { CategoryChip } from '@/components/ui/CategoryChip';
import { Badge } from '@/components/ui/Badge';
import { ProductBottomSheet } from '@/components/ui/ProductBottomSheet';
import { products, categories, type Product } from '@/lib/data';
import { useCart } from '@/lib/store';
import { cn, formatCurrency, calculateDiscount } from '@/lib/utils';

export function ProductGrid() {
  const {
    items,
    searchQuery,
    selectedCategory,
    addItem,
    setSearchQuery,
    setSelectedCategory,
  } = useCart();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'todos' || product.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const getCartQuantity = (productId: string) => {
    const item = items.find((i) => i.product.id === productId);
    return item?.quantity ?? 0;
  };

  return (
    <section id="cardapio" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-sm tracking-[0.2em] uppercase text-caramel-600 font-medium">
          Nosso Cardápio
        </span>
        <h2 className="mt-3 font-display text-4xl sm:text-5xl text-chocolate-800 dark:text-cream-100">
          Uma seleção feita com carinho
        </h2>
        <p className="mt-4 text-cream-700 dark:text-cream-500 max-w-md mx-auto">
          Cada produto é preparado artesanalmente com ingredientes selecionados
        </p>
      </div>

      <div className="mb-6 max-w-lg mx-auto">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      <div className="mb-10">
        <CategoryChip
          categories={categories}
          selected={selectedCategory === 'todos' ? null : selectedCategory}
          onChange={(slug) => setSelectedCategory(slug ?? 'todos')}
        />
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-24">
          <ShoppingBag className="mx-auto h-12 w-12 text-cream-400 mb-4" />
          <p className="text-cream-700 text-lg font-display">Nenhum produto encontrado</p>
          <p className="text-cream-500 text-sm mt-2">
            Tente buscar por outro termo ou categoria
          </p>
        </div>
      ) : (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
        >
          {filteredProducts.map((product) => {
            const qty = getCartQuantity(product.id);

            return (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="group cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <div className={cn(
                  'relative overflow-hidden rounded-2xl bg-cream-100 dark:bg-chocolate-800/40',
                  'aspect-[3/4] sm:aspect-[4/5]',
                )}>
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-cream-200 to-cream-300">
                      <span className="text-6xl opacity-60">🍰</span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-chocolate-950/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {product.badge && (
                    <div className="absolute top-3 left-3">
                      <Badge variant={product.badge} />
                    </div>
                  )}

                  {qty > 0 && (
                    <div className="absolute top-3 right-3">
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-caramel-500 text-white text-xs font-bold shadow-md">
                        {qty}
                      </span>
                    </div>
                  )}

                  {product.originalPrice && (
                    <div className="absolute bottom-3 right-3">
                      <span className="text-xs font-medium text-white bg-chocolate-800/80 backdrop-blur-sm px-2 py-1 rounded-full">
                        -{calculateDiscount(product.originalPrice, product.price)}%
                      </span>
                    </div>
                  )}

                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      addItem(product);
                    }}
                    className={cn(
                      'absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-2 rounded-full',
                      'bg-white/90 backdrop-blur-sm text-chocolate-800',
                      'text-xs font-medium shadow-md',
                      'opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0',
                      'hover:bg-white',
                      !product.available && 'opacity-50 pointer-events-none',
                    )}
                    disabled={!product.available}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Adicionar
                  </motion.button>
                </div>

                <div className="mt-3 px-0.5">
                  <h3 className="font-medium text-sm text-chocolate-800 dark:text-cream-200 leading-snug line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="mt-1.5 flex items-center gap-2">
                    {product.originalPrice && (
                      <span className="text-xs text-cream-600 line-through">
                        {formatCurrency(product.originalPrice)}
                      </span>
                    )}
                    <span className="text-sm font-semibold text-chocolate-800 dark:text-cream-100">
                      {formatCurrency(product.price)}
                    </span>
                  </div>
                </div>
              </motion.div>
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
