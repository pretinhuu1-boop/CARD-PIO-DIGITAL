'use client';

import { motion } from 'framer-motion';
import { cn, formatCurrency } from '@/lib/utils';

interface ProgressBarProps {
  current: number;
  target: number;
  label: string;
  completedText: string;
  className?: string;
}

/** Barra de progresso para metas de valor (frete grátis, brinde). */
function ProgressBar({
  current,
  target,
  label,
  completedText,
  className,
}: ProgressBarProps) {
  const percentage = Math.min((current / target) * 100, 100);
  const isCompleted = current >= target;
  const remaining = Math.max(target - current, 0);

  return (
    <div className={cn('w-full', className)}>
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-ink">{label}</span>
        <span
          className={cn(
            'text-sm font-medium',
            isCompleted ? 'text-success' : 'text-ink-2',
          )}
        >
          {isCompleted ? completedText : `Falta ${formatCurrency(remaining)}`}
        </span>
      </div>

      <div
        className="relative h-2 w-full overflow-hidden rounded-full bg-surface-3"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={target}
        aria-valuenow={Math.min(current, target)}
        aria-label={label}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: 'spring', stiffness: 80, damping: 20 }}
          className={cn(
            'absolute inset-y-0 left-0 rounded-full',
            isCompleted ? 'bg-success' : 'bg-brand',
          )}
        />
      </div>
    </div>
  );
}

export { ProgressBar, type ProgressBarProps };
