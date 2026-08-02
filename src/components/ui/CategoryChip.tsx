'use client';

import { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { Category } from '@/lib/data';
import { cn } from '@/lib/utils';

interface CategoryChipProps {
  categories: Category[];
  /** Slug ativo. 'todos' quando nenhum filtro está aplicado. */
  selected: string;
  onChange: (slug: string) => void;
  className?: string;
}

/**
 * Faixa de categorias com arrasto horizontal no desktop.
 *
 * O arrasto NÃO usa `setPointerCapture`: capturar o ponteiro no container
 * redireciona o `click` para ele, e o clique nunca chega ao <button> do chip —
 * o filtro fica morto no mouse (funcionava só no toque e no teclado).
 * Aqui o scroll é feito manualmente enquanto o botão está pressionado, e um
 * ref marca se houve arrasto para suprimir o clique acidental no fim dele.
 */
function CategoryChip({ categories, selected, onChange, className }: CategoryChipProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);
  const pointerDown = useRef(false);
  const didDrag = useRef(false);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    // Só arrasta com o botão primário do mouse; toque usa o scroll nativo.
    if (e.pointerType !== 'mouse') return;
    const el = scrollRef.current;
    if (!el) return;
    pointerDown.current = true;
    didDrag.current = false;
    dragStartX.current = e.clientX;
    scrollStartX.current = el.scrollLeft;
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const el = scrollRef.current;
    if (!el || !pointerDown.current) return;
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 4) didDrag.current = true;
    if (didDrag.current) el.scrollLeft = scrollStartX.current - dx;
  }, []);

  const endDrag = useCallback(() => {
    pointerDown.current = false;
  }, []);

  const handleChipClick = (slug: string) => {
    if (didDrag.current) {
      didDrag.current = false;
      return;
    }
    onChange(slug);
  };

  return (
    <div
      ref={scrollRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      className={cn(
        'no-scrollbar flex gap-2 overflow-x-auto',
        'touch-pan-x py-1 -my-1 px-1 -mx-1',
        className,
      )}
      role="group"
      aria-label="Filtrar por categoria"
    >
      {categories.map((category) => {
        const isSelected = selected === category.slug;

        return (
          <motion.button
            key={category.slug}
            type="button"
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onClick={() => handleChipClick(category.slug)}
            aria-pressed={isSelected}
            className={cn(
              'focus-ring flex shrink-0 items-center gap-2 whitespace-nowrap',
              'min-h-[44px] rounded-full px-4 text-sm font-medium',
              'transition-colors duration-200',
              isSelected
                ? 'bg-brand text-on-brand'
                : 'border border-line bg-surface text-ink-2 hover:border-line-strong hover:text-ink',
            )}
          >
            {category.emoji && (
              <span className="text-base" aria-hidden="true">
                {category.emoji}
              </span>
            )}
            <span>{category.name}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

export { CategoryChip, type CategoryChipProps };
