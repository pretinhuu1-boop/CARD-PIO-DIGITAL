'use client';

import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Category {
  slug: string;
  name: string;
  emoji: string;
  productCount: number;
}

interface CategoryChipProps {
  categories: Category[];
  selected: string | null;
  onChange: (slug: string | null) => void;
  className?: string;
}

function CategoryChip({ categories, selected, onChange, className }: CategoryChipProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    setIsDragging(false);
    dragStartX.current = e.clientX;
    scrollStartX.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const el = scrollRef.current;
    if (!el || !el.hasPointerCapture(e.pointerId)) return;
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 3) setIsDragging(true);
    el.scrollLeft = scrollStartX.current - dx;
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    el.releasePointerCapture(e.pointerId);
  }, []);

  const handleChipClick = (slug: string) => {
    if (isDragging) return;
    onChange(selected === slug ? null : slug);
  };

  return (
    <div
      ref={scrollRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className={cn(
        'flex gap-2 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing',
        'touch-pan-x select-none py-1 -my-1 px-1 -mx-1',
        className,
      )}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {categories.map((category) => {
        const isSelected = selected === category.slug;

        return (
          <motion.button
            key={category.slug}
            layout
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onClick={() => handleChipClick(category.slug)}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap',
              'transition-all duration-200 shrink-0',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel-400/50',
              isSelected
                ? 'bg-chocolate-800 text-cream-50 shadow-md shadow-chocolate-800/15 dark:bg-cream-200 dark:text-chocolate-900'
                : 'bg-cream-100 text-cream-700 border border-cream-300 hover:border-caramel-300 hover:bg-cream-200 dark:bg-chocolate-800/30 dark:text-cream-400 dark:border-chocolate-600 dark:hover:border-caramel-600',
            )}
            type="button"
          >
            <span className="text-base">{category.emoji}</span>
            <span>{category.name}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

export { CategoryChip, type CategoryChipProps, type Category };
