'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Gift, ChevronRight, Tag } from 'lucide-react';
import { promos } from '@/lib/data';
import { cn } from '@/lib/utils';

export function PromoBanner() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % promos.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  const slideVariants = {
    enter: { x: '100%', opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <section
      className="w-full py-6 px-4 sm:px-6 lg:px-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className={cn(
              'relative rounded-2xl border border-white/10 p-6 sm:p-8 bg-gradient-to-r',
              promos[current].bgGradient,
            )}
          >
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
              <div className="flex shrink-0 flex-col items-center justify-center rounded-xl bg-white/10 p-4">
                <Tag className="mb-1 h-5 w-5 text-cream-100" />
                <span className="text-4xl font-bold text-cream-100 sm:text-5xl">
                  {promos[current].discount}%
                </span>
                <span className="text-xs font-medium uppercase tracking-wider text-cream-200/80">
                  OFF
                </span>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <div className="mb-1 flex items-center justify-center gap-2 sm:justify-start">
                  <Gift className="h-4 w-4 text-caramel-400" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-caramel-400">
                    Promo
                  </span>
                </div>
                <h3 className="mb-1 text-lg font-bold text-cream-100 sm:text-xl">
                  {promos[current].title}
                </h3>
                <p className="mb-3 text-sm text-cream-200/80">
                  {promos[current].description}
                </p>

                <button
                  onClick={() => handleCopyCode(promos[current].code)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-mono font-semibold text-cream-100 transition-colors hover:bg-white/20"
                >
                  <span>{promos[current].code}</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-4 flex items-center justify-center gap-2">
          {promos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                index === current
                  ? 'w-6 bg-caramel-500'
                  : 'w-2 bg-chocolate-400/40 hover:bg-chocolate-400/60',
              )}
              aria-label={`Ir para promo ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
