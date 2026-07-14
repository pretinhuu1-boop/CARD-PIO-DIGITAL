'use client';

import { forwardRef, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
}

const variantStyles: Record<string, string> = {
  primary:
    'bg-chocolate-800 text-cream-50 shadow-md shadow-chocolate-800/10 hover:bg-chocolate-700 dark:bg-cream-300 dark:text-chocolate-900 dark:hover:bg-cream-200',
  secondary:
    'bg-cream-200 text-chocolate-800 border border-cream-400 hover:bg-cream-300 dark:bg-chocolate-800/50 dark:text-cream-200 dark:border-chocolate-600 dark:hover:bg-chocolate-700/50',
  ghost:
    'text-chocolate-700 hover:bg-cream-200 dark:text-cream-300 dark:hover:bg-chocolate-800/50',
  outline:
    'border-2 border-chocolate-800 text-chocolate-800 hover:bg-chocolate-800 hover:text-cream-50 dark:border-cream-400 dark:text-cream-300 dark:hover:bg-cream-300 dark:hover:text-chocolate-900',
};

const sizeStyles: Record<string, string> = {
  sm: 'px-4 py-2 text-sm rounded-xl gap-1.5',
  md: 'px-6 py-3 text-[15px] rounded-xl gap-2',
  lg: 'px-8 py-4 text-base rounded-2xl gap-2.5',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
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
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <motion.button
        ref={ref}
        whileHover={isDisabled ? undefined : { scale: 1.02 }}
        whileTap={isDisabled ? undefined : { scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        disabled={isDisabled}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-200 select-none',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel-400/50 focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className,
        )}
        type={type}
        onClick={onClick}
      >
        {loading && (
          <Loader2
            className={cn(
              'animate-spin',
              size === 'sm' ? 'h-3.5 w-3.5' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4',
            )}
          />
        )}
        {children}
      </motion.button>
    );
  },
);

Button.displayName = 'Button';

export { Button, type ButtonProps };
