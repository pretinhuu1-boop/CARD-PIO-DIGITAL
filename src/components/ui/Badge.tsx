'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type BadgeVariant = 'maisVendido' | 'novo' | 'promo' | 'zeroLactose' | 'vegano' | 'chefRecomenda' | 'edicaoLimitada';

interface BadgeProps {
  variant: BadgeVariant;
  className?: string;
}

const variantConfig: Record<BadgeVariant, { label: string; styles: string }> = {
  maisVendido: {
    label: 'Mais Vendido',
    styles: 'bg-caramel-100 text-caramel-800 border border-caramel-200',
  },
  chefRecomenda: {
    label: 'Chef Recomenda',
    styles: 'bg-blush-100 text-blush-800 border border-blush-200',
  },
  novo: {
    label: 'Novidade',
    styles: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
  },
  edicaoLimitada: {
    label: 'Edição Limitada',
    styles: 'bg-chocolate-100 text-chocolate-800 border border-chocolate-200',
  },
  promo: {
    label: 'Promoção',
    styles: 'bg-amber-50 text-amber-800 border border-amber-200',
  },
  zeroLactose: {
    label: 'Zero Lactose',
    styles: 'bg-sky-50 text-sky-800 border border-sky-200',
  },
  vegano: {
    label: 'Vegano',
    styles: 'bg-lime-50 text-lime-800 border border-lime-200',
  },
};

function Badge({ variant, className }: BadgeProps) {
  const config = variantConfig[variant];

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wide whitespace-nowrap',
        'select-none',
        config.styles,
        className,
      )}
    >
      {config.label}
    </motion.span>
  );
}

export { Badge, type BadgeProps, type BadgeVariant };
