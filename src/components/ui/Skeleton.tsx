'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps {
  variant?: 'text' | 'card' | 'circle' | 'image';
  width?: string;
  height?: string;
  className?: string;
}

const shimmerClass =
  'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_ease-in-out_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent dark:before:via-white/10';

const variantStyles: Record<string, string> = {
  text: 'h-4 w-full rounded-md',
  card: 'h-48 w-full rounded-2xl',
  circle: 'h-12 w-12 rounded-full',
  image: 'h-40 w-full rounded-xl aspect-square',
};

function Skeleton({ variant = 'text', width, height, className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'bg-gray-200/80 dark:bg-gray-700/50',
        shimmerClass,
        variantStyles[variant],
        className,
      )}
      style={{ width, height }}
      role="status"
      aria-label="Carregando..."
    />
  );
}

export { Skeleton, type SkeletonProps };
