'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { useCart } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';

interface FloatingCTAProps {
  onOpenCart: () => void;
}

/** Barra fixa com o total. Aparece assim que há algo no pedido. */
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
          className="pointer-events-none fixed inset-x-0 bottom-0 z-40 pb-[env(safe-area-inset-bottom)]"
        >
          {/* Espaço à direita para não cobrir o botão flutuante do WhatsApp. */}
          <div className="pointer-events-auto mx-auto max-w-5xl px-4 pb-4 pr-24 sm:px-6 sm:pb-6 sm:pr-28">
            <motion.button
              type="button"
              onClick={onOpenCart}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="focus-ring flex min-h-[56px] w-full items-center gap-3 rounded-card bg-brand px-5 text-on-brand shadow-lg transition-colors hover:bg-brand-hover"
            >
              <span className="relative shrink-0">
                <ShoppingBag className="h-5 w-5" aria-hidden="true" />
                <span className="absolute -right-2 -top-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-on-brand px-1 text-[10px] font-bold text-brand tabular-nums">
                  {count}
                </span>
              </span>

              <span className="text-[15px] font-semibold">Ver pedido</span>
              <span className="flex-1" />
              <span className="text-[15px] font-bold tabular-nums">
                {formatCurrency(total)}
              </span>
              <ChevronRight className="h-5 w-5 opacity-70" aria-hidden="true" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { FloatingCTA };
