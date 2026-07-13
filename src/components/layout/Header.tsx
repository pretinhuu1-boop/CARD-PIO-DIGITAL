'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/store';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onOpenCart: () => void;
}

function Header({ onOpenCart }: HeaderProps) {
  const { count } = useCart();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [prevCount, setPrevCount] = useState(count);
  const [bouncing, setBouncing] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 40);
  });

  useEffect(() => {
    if (count !== prevCount && count > 0) {
      setBouncing(true);
      const timer = setTimeout(() => setBouncing(false), 600);
      setPrevCount(count);
      return () => clearTimeout(timer);
    }
    setPrevCount(count);
  }, [count, prevCount]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-[#FFF8F0]/95 dark:bg-[#1A0A10]/95 shadow-lg shadow-[#8B1A4A]/5 backdrop-blur-xl'
          : 'bg-[#FFF8F0]/60 dark:bg-[#1A0A10]/60 backdrop-blur-md',
      )}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div
          className={cn(
            'flex items-center justify-between transition-all duration-500',
            scrolled ? 'h-14 sm:h-16' : 'h-16 sm:h-20',
          )}
        >
          {/* Brand */}
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <span className="text-xl sm:text-2xl" aria-hidden="true">
              🧁
            </span>
            <h1
              className={cn(
                'font-serif font-bold tracking-tight transition-all duration-500',
                'text-[#8B1A4A] dark:text-[#E8A0B8]',
                scrolled
                  ? 'text-lg sm:text-xl'
                  : 'text-xl sm:text-2xl',
              )}
            >
              Doces Dondoca
            </h1>
          </motion.div>

          {/* Cart button */}
          <motion.button
            onClick={onOpenCart}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className={cn(
              'relative flex items-center justify-center rounded-full transition-colors duration-200',
              'w-10 h-10 sm:w-11 sm:h-11',
              'bg-[#8B1A4A]/10 hover:bg-[#8B1A4A]/20',
              'dark:bg-[#E8A0B8]/10 dark:hover:bg-[#E8A0B8]/20',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B1A4A]/50 focus-visible:ring-offset-2',
            )}
            aria-label={`Carrinho com ${count} ${count === 1 ? 'item' : 'itens'}`}
          >
            <ShoppingBag
              className={cn(
                'w-5 h-5 sm:w-[22px] sm:h-[22px]',
                'text-[#8B1A4A] dark:text-[#E8A0B8]',
              )}
            />

            {/* Animated badge */}
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key="badge"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: bouncing ? [1, 1.4, 1] : 1,
                    opacity: 1,
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 15,
                  }}
                  className={cn(
                    'absolute -top-1 -right-1 flex items-center justify-center',
                    'min-w-[20px] h-5 px-1 rounded-full',
                    'bg-[#8B1A4A] dark:bg-[#D4A853]',
                    'text-[11px] font-bold text-white dark:text-[#1A0A10]',
                    'shadow-md shadow-[#8B1A4A]/30',
                    'tabular-nums',
                  )}
                >
                  {count > 99 ? '99+' : count}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Bottom border accent */}
      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-[#D4A853]/40 to-transparent"
        animate={{ opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.header>
  );
}

export { Header };
