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
    'bg-[#8B1A4A] text-white shadow-lg shadow-[#8B1A4A]/20 hover:bg-[#A0284C] dark:bg-[#A0284C] dark:hover:bg-[#8B1A4A]',
  secondary:
    'bg-[#FFF8F0] text-[#8B1A4A] border border-[#8B1A4A]/20 hover:bg-[#8B1A4A]/5 dark:bg-[#2A1520] dark:text-[#E8A0B8] dark:border-[#A0284C]/30 dark:hover:bg-[#A0284C]/10',
  ghost:
    'text-[#8B1A4A] hover:bg-[#8B1A4A]/5 dark:text-[#E8A0B8] dark:hover:bg-[#A0284C]/10',
  outline:
    'border-2 border-[#8B1A4A] text-[#8B1A4A] hover:bg-[#8B1A4A] hover:text-white dark:border-[#A0284C] dark:text-[#E8A0B8] dark:hover:bg-[#A0284C] dark:hover:text-white',
};

const sizeStyles: Record<string, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-lg gap-1.5',
  md: 'px-5 py-2.5 text-base rounded-xl gap-2',
  lg: 'px-7 py-3.5 text-lg rounded-xl gap-2.5',
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
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <motion.button
        ref={ref}
        whileHover={isDisabled ? undefined : { scale: 1.03 }}
        whileTap={isDisabled ? undefined : { scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        disabled={isDisabled}
        className={cn(
          'inline-flex items-center justify-center font-semibold transition-colors duration-200 select-none',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B1A4A]/50 focus-visible:ring-offset-2',
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
