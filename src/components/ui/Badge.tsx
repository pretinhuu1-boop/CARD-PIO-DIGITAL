'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type BadgeVariant = 'maisVendido' | 'novo' | 'promo' | 'zeroLactose' | 'vegano';

interface BadgeProps {
  variant: BadgeVariant;
  className?: string;
}

const variantConfig: Record<BadgeVariant, { label: string; styles: string }> = {
  maisVendido: {
    label: 'Mais Vendido',
    styles:
      'bg-gradient-to-r from-[#D4A853] to-[#E8C36A] text-[#5C3D0A] dark:from-[#B8902E] dark:to-[#D4A853] dark:text-[#FFF8E7]',
  },
  novo: {
    label: 'Novo',
    styles:
      'bg-gradient-to-r from-emerald-400 to-emerald-500 text-white dark:from-emerald-600 dark:to-emerald-500',
  },
  promo: {
    label: 'Promo',
    styles:
      'bg-gradient-to-r from-rose-500 to-red-500 text-white dark:from-rose-600 dark:to-red-500',
  },
  zeroLactose: {
    label: 'Zero Lactose',
    styles:
      'bg-gradient-to-r from-sky-400 to-blue-400 text-white dark:from-sky-600 dark:to-blue-500',
  },
  vegano: {
    label: 'Vegano',
    styles:
      'bg-gradient-to-r from-lime-400 to-green-500 text-white dark:from-lime-600 dark:to-green-600',
  },
};

function Badge({ variant, className }: BadgeProps) {
  const config = variantConfig[variant];

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase whitespace-nowrap',
        'shadow-sm select-none',
        config.styles,
        className,
      )}
    >
      {config.label}
    </motion.span>
  );
}

export { Badge, type BadgeProps, type BadgeVariant };
