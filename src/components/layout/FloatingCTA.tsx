'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { useCart } from '@/lib/store';
import { cn, formatCurrency } from '@/lib/utils';

interface FloatingCTAProps {
  onOpenCart: () => void;
}

function FloatingCTA({ onOpenCart }: FloatingCTAProps) {
  const { count, total } = useCart();

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className={cn(
            'fixed bottom-0 left-0 right-0 z-40',
            'pb-[env(safe-area-inset-bottom)]',
            'pointer-events-none',
          )}
        >
          <div
            className={cn(
              'mx-auto max-w-5xl px-4 pb-4 sm:px-6 sm:pb-6',
              'pointer-events-auto',
            )}
          >
            <motion.button
              onClick={onOpenCart}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className={cn(
                'flex items-center w-full gap-3 px-5 py-3.5 sm:py-4',
                'rounded-2xl',
                'bg-[#8B1A4A]/95 dark:bg-[#8B1A4A]/90',
                'backdrop-blur-xl',
                'shadow-2xl shadow-[#8B1A4A]/30',
                'border border-white/10',
                'text-white',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A853] focus-visible:ring-offset-2',
                'transition-colors duration-200',
              )}
            >
              {/* Icon + count */}
              <div className="relative flex-shrink-0">
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
                <motion.span
                  key={count}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className={cn(
                    'absolute -top-1.5 -right-1.5',
                    'flex items-center justify-center',
                    'min-w-[18px] h-[18px] px-1',
                    'rounded-full bg-[#D4A853]',
                    'text-[10px] font-bold text-[#1A0A10]',
                    'tabular-nums',
                  )}
                >
                  {count}
                </motion.span>
              </div>

              {/* Label */}
              <span className="text-sm sm:text-base font-semibold">
                Ver Pedido
              </span>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Total */}
              <motion.span
                key={total.toFixed(2)}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm sm:text-base font-bold tabular-nums"
              >
                {formatCurrency(total)}
              </motion.span>

              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 opacity-60" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { FloatingCTA };
