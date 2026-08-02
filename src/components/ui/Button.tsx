'use client';

import { forwardRef, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'whatsapp';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
}

const variantStyles: Record<string, string> = {
  primary: 'bg-brand text-on-brand hover:bg-brand-hover shadow-sm',
  secondary: 'bg-surface-2 text-ink border border-line hover:border-line-strong',
  ghost: 'text-ink-2 hover:bg-surface-2 hover:text-ink',
  whatsapp: 'bg-whatsapp text-on-whatsapp hover:bg-whatsapp-hover shadow-sm',
};

/** Altura mínima de 44px em todos os tamanhos: alvo de toque confortável. */
const sizeStyles: Record<string, string> = {
  sm: 'min-h-[44px] px-4 py-2.5 text-sm rounded-control gap-1.5',
  md: 'min-h-[48px] px-6 py-3 text-[15px] rounded-control gap-2',
  lg: 'min-h-[52px] px-8 py-4 text-base rounded-control gap-2.5',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    fullWidth = false,
    disabled,
    className,
    children,
    type = 'button',
    onClick,
    ariaLabel,
  },
  ref,
) {
  const isDisabled = disabled || loading;

  return (
    <motion.button
      ref={ref}
      whileHover={isDisabled ? undefined : { scale: 1.01 }}
      whileTap={isDisabled ? undefined : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      disabled={isDisabled}
      className={cn(
        'focus-ring inline-flex items-center justify-center font-medium select-none',
        'transition-colors duration-200',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        className,
      )}
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </motion.button>
  );
});

export { Button, type ButtonProps };
