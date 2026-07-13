'use client';

import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: { star: 'h-3.5 w-3.5', text: 'text-xs', gap: 'gap-0.5' },
  md: { star: 'h-4 w-4', text: 'text-sm', gap: 'gap-0.5' },
  lg: { star: 'h-5 w-5', text: 'text-base', gap: 'gap-1' },
};

function StarRating({ rating, count, size = 'md', className }: StarRatingProps) {
  const clampedRating = Math.max(0, Math.min(5, rating));
  const sizes = sizeMap[size];

  return (
    <div className={cn('inline-flex items-center', sizes.gap, className)}>
      <div className={cn('flex items-center', sizes.gap)}>
        {Array.from({ length: 5 }, (_, i) => {
          const fillLevel = Math.max(0, Math.min(1, clampedRating - i));

          return (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 20,
                delay: i * 0.05,
              }}
              className="relative inline-flex"
            >
              {/* Empty star (background) */}
              <Star
                className={cn(
                  sizes.star,
                  'text-gray-200 dark:text-gray-700',
                )}
                fill="currentColor"
                strokeWidth={0}
              />

              {/* Filled star (clipped) */}
              {fillLevel > 0 && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${fillLevel * 100}%` }}
                >
                  <Star
                    className={cn(sizes.star, 'text-[#D4A853]')}
                    fill="currentColor"
                    strokeWidth={0}
                  />
                </span>
              )}
            </motion.span>
          );
        })}
      </div>

      {count !== undefined && (
        <span
          className={cn(
            sizes.text,
            'text-gray-400 dark:text-gray-500 ml-1 tabular-nums',
          )}
        >
          ({count})
        </span>
      )}
    </div>
  );
}

export { StarRating, type StarRatingProps };
