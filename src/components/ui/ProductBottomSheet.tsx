'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Minus } from 'lucide-react';
import { type Product } from '@/lib/data';
import { useCart } from '@/lib/store';
import { cn, formatCurrency } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

interface ProductBottomSheetProps {
  product: Product;
  onClose: () => void;
}

export function ProductBottomSheet({ product, onClose }: ProductBottomSheetProps) {
  const { items, addItem, updateQuantity, removeItem } = useCart();
  const cartItem = items.find((i) => i.product.id === product.id);
  const [quantity, setQuantity] = useState(cartItem?.quantity ?? 1);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleAddToCart = () => {
    if (cartItem) {
      updateQuantity(product.id, quantity);
    } else {
      for (let i = 0; i < quantity; i++) {
        addItem(product);
      }
      if (quantity > 1) {
        updateQuantity(product.id, quantity);
      }
    }
    onClose();
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
        aria-hidden="true"
      />

      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={cn(
          'fixed inset-x-0 bottom-0 z-[70]',
          'max-h-[90vh] overflow-y-auto overscroll-contain',
          'bg-[var(--background)] dark:bg-chocolate-900',
          'rounded-t-3xl shadow-2xl shadow-black/20',
        )}
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
      >
        <div className="sticky top-0 z-10 flex justify-center pt-3 pb-2 bg-[var(--background)] dark:bg-chocolate-900">
          <div className="w-10 h-1 rounded-full bg-cream-400" />
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-cream-200/80 dark:bg-chocolate-700 flex items-center justify-center text-cream-700 dark:text-cream-300 hover:bg-cream-300 transition-colors"
          aria-label="Fechar"
        >
          <X className="w-4.5 h-4.5" />
        </button>

        {product.image && (
          <div className="relative w-full aspect-[16/10] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <div className="absolute bottom-4 left-4">
                <Badge variant={product.badge} />
              </div>
            )}
          </div>
        )}

        <div className="px-6 pb-6">
          <div className="pt-5">
            <h2 className="font-display text-2xl text-chocolate-800 dark:text-cream-100">
              {product.name}
            </h2>

            <div className="mt-2 flex items-center gap-3">
              <span className="text-xl font-semibold text-chocolate-800 dark:text-cream-100">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-cream-600 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          <p className="mt-4 text-sm text-cream-700 dark:text-cream-400 leading-relaxed">
            {product.description}
          </p>

          {product.servings && (
            <div className="mt-4 flex items-center gap-2 text-sm text-cream-600">
              <span className="w-1.5 h-1.5 rounded-full bg-caramel-400" />
              {product.servings}
            </div>
          )}

          {product.ingredients && product.ingredients.length > 0 && (
            <div className="mt-5 pt-5 border-t border-cream-300 dark:border-chocolate-700">
              <h3 className="text-xs tracking-[0.15em] uppercase text-cream-600 font-medium mb-3">
                Ingredientes
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ingredient) => (
                  <span
                    key={ingredient}
                    className="px-3 py-1.5 rounded-full text-xs bg-cream-200 text-cream-700 dark:bg-chocolate-700 dark:text-cream-400"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-5 pt-5 border-t border-cream-300 dark:border-chocolate-700">
            <label
              htmlFor="product-notes"
              className="text-xs tracking-[0.15em] uppercase text-cream-600 font-medium"
            >
              Observações
            </label>
            <textarea
              id="product-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Alguma observação sobre o produto?"
              rows={2}
              className="mt-2 w-full rounded-xl bg-cream-100 dark:bg-chocolate-800 border border-cream-300 dark:border-chocolate-600 px-4 py-3 text-sm text-chocolate-800 dark:text-cream-200 placeholder:text-cream-500 resize-none outline-none focus:border-caramel-400 transition-colors"
            />
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center gap-3 bg-cream-100 dark:bg-chocolate-800 rounded-xl px-2 py-1.5">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-9 h-9 rounded-lg bg-white dark:bg-chocolate-700 shadow-sm flex items-center justify-center text-chocolate-700 dark:text-cream-300 hover:bg-cream-50 transition-colors"
                aria-label="Diminuir quantidade"
              >
                <Minus className="w-4 h-4" />
              </motion.button>
              <span className="w-8 text-center font-semibold text-chocolate-800 dark:text-cream-100 tabular-nums">
                {quantity}
              </span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setQuantity(quantity + 1)}
                className="w-9 h-9 rounded-lg bg-chocolate-800 dark:bg-cream-200 shadow-sm flex items-center justify-center text-cream-50 dark:text-chocolate-900 hover:bg-chocolate-700 dark:hover:bg-cream-100 transition-colors"
                aria-label="Aumentar quantidade"
              >
                <Plus className="w-4 h-4" />
              </motion.button>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              disabled={!product.available}
              className={cn(
                'flex-1 py-4 rounded-xl font-medium text-[15px] transition-colors',
                'bg-chocolate-800 text-cream-50 hover:bg-chocolate-700 shadow-md shadow-chocolate-800/10',
                'dark:bg-cream-200 dark:text-chocolate-900 dark:hover:bg-cream-100',
                'disabled:opacity-50 disabled:cursor-not-allowed',
              )}
            >
              {product.available ? (
                <span className="flex items-center justify-center gap-2">
                  Adicionar ao Pedido
                  <span className="text-cream-300 dark:text-chocolate-600">
                    {formatCurrency(product.price * quantity)}
                  </span>
                </span>
              ) : (
                'Indisponível'
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
