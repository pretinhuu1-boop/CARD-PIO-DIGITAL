'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Plus, Minus, ShoppingBag } from 'lucide-react';
import { SearchBar } from '@/components/ui/SearchBar';
import { CategoryChip } from '@/components/ui/CategoryChip';
import { Badge } from '@/components/ui/Badge';
import { StarRating } from '@/components/ui/StarRating';
import { Button } from '@/components/ui/Button';
import { products, categories } from '@/lib/data';
import { useCart } from '@/lib/store';
import { cn, formatCurrency, calculateDiscount } from '@/lib/utils';

const categoryEmojis: Record<string, string> = {
  'doces-finos': '🍬',
  tortas: '🥧',
  bolos: '🎂',
  brownies: '🍫',
  sobremesas: '🍮',
  salgados: '🥐',
  cafes: '☕',
  'zero-lactose': '🌿',
  cookies: '🍪',
  doces: '🍬',
};

function getCategoryEmoji(slug: string): string {
  return categoryEmojis[slug] || '🍰';
}

export function ProductGrid() {
  const {
    items,
    favorites,
    searchQuery,
    selectedCategory,
    addItem,
    toggleFavorite,
    setSearchQuery,
    setSelectedCategory,
    updateQuantity,
    removeItem,
  } = useCart();

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

  return (
    <section id="cardapio" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#8B1A4A] mb-2">
          Nosso Cardápio
        </h2>
        <p className="text-gray-500">
          Encontre o doce perfeito para qualquer ocasião
        </p>
      </div>

      <div className="mb-6">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      <div className="mb-8">
        <CategoryChip
          categories={categories}
          selected={selectedCategory === 'todos' ? null : selectedCategory}
          onChange={(slug) => setSelectedCategory(slug ?? 'todos')}
        />
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <ShoppingBag className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">Nenhum produto encontrado</p>
          <p className="text-gray-400 text-sm mt-1">
            Tente buscar por outro termo ou categoria
          </p>
        </div>
      ) : (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-30px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product) => {
            const cartItem = items.find((item) => item.product.id === product.id);
            const isFavorited = favorites.includes(product.id);

            return (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                }}
                whileHover={{ y: -4 }}
                className={cn(
                  'rounded-2xl bg-white shadow overflow-hidden',
                  'hover:shadow-lg transition-shadow duration-300'
                )}
              >
                {/* Image Area */}
                <div className="relative h-48 bg-gradient-to-br from-[#FFF8F0] to-[#f5e6d0] flex items-center justify-center overflow-hidden">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-7xl" role="img" aria-label={product.category}>
                      {getCategoryEmoji(product.category)}
                    </span>
                  )}

                  {product.badge && (
                    <div className="absolute top-3 left-3">
                      <Badge variant={product.badge} />
                    </div>
                  )}

                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
                    aria-label={isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                  >
                    <Heart
                      className={cn(
                        'w-5 h-5 transition-colors',
                        isFavorited
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-400 hover:text-red-400'
                      )}
                    />
                  </motion.button>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                    {product.description}
                  </p>

                  <div className="mb-3">
                    <StarRating rating={product.rating} count={product.reviews} size="sm" />
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-4">
                    {product.originalPrice && (
                      <>
                        <span className="text-sm text-gray-400 line-through">
                          {formatCurrency(product.originalPrice)}
                        </span>
                        <span className="text-xs font-semibold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                          -{calculateDiscount(product.originalPrice, product.price)}%
                        </span>
                      </>
                    )}
                    <span className="text-lg font-bold text-[#8B1A4A]">
                      {formatCurrency(product.price)}
                    </span>
                  </div>

                  {/* Add to Cart / Quantity Selector */}
                  <AnimatePresence mode="wait">
                    {!cartItem ? (
                      <motion.div
                        key="add"
                        layoutId={`cart-action-${product.id}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Button
                          variant="primary"
                          size="sm"
                          className="w-full"
                          onClick={() => addItem(product)}
                          disabled={!product.available}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          {product.available ? 'Adicionar' : 'Indisponível'}
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="quantity"
                        layoutId={`cart-action-${product.id}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-between bg-[#FFF8F0] rounded-xl p-1"
                      >
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            if (cartItem.quantity <= 1) {
                              removeItem(product.id);
                            } else {
                              updateQuantity(product.id, cartItem.quantity - 1);
                            }
                          }}
                          className="w-9 h-9 rounded-lg bg-white shadow-sm flex items-center justify-center text-[#8B1A4A] hover:bg-gray-50 transition-colors"
                          aria-label="Diminuir quantidade"
                        >
                          <Minus className="w-4 h-4" />
                        </motion.button>

                        <span className="font-semibold text-[#8B1A4A] min-w-[2rem] text-center">
                          {cartItem.quantity}
                        </span>

                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
                          className="w-9 h-9 rounded-lg bg-[#8B1A4A] shadow-sm flex items-center justify-center text-white hover:bg-[#7a1740] transition-colors"
                          aria-label="Aumentar quantidade"
                        >
                          <Plus className="w-4 h-4" />
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </section>
  );
}
