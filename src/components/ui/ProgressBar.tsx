'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/utils';

interface ProgressBarProps {
  current: number;
  target: number;
  label: string;
  icon: string;
  completedText: string;
  className?: string;
}

function ProgressBar({
  current,
  target,
  label,
  icon,
  completedText,
  className,
}: ProgressBarProps) {
  const percentage = Math.min((current / target) * 100, 100);
  const isCompleted = current >= target;
  const remaining = Math.max(target - current, 0);

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between mb-2">
        <span className="flex items-center gap-1.5 text-sm font-medium text-chocolate-700 dark:text-cream-300">
          <span className="text-base">{icon}</span>
          {label}
        </span>
        <AnimatePresence mode="wait">
          {isCompleted ? (
            <motion.span
              key="completed"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-sm font-semibold text-emerald-600 dark:text-emerald-400"
            >
              {completedText}
            </motion.span>
          ) : (
            <motion.span
              key="remaining"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-sm font-medium text-cream-600 dark:text-cream-500"
            >
              Falta {formatCurrency(remaining)}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div
        className={cn(
          'relative h-2.5 w-full overflow-hidden rounded-full',
          'bg-cream-200 dark:bg-chocolate-700',
        )}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.1 }}
          className={cn(
            'absolute inset-y-0 left-0 rounded-full',
            isCompleted
              ? 'bg-emerald-500'
              : 'bg-gradient-to-r from-caramel-500 to-caramel-400',
          )}
        />
      </div>

      <div className="mt-1 flex justify-end">
        <span className="text-xs text-cream-500 dark:text-cream-600 tabular-nums">
          {formatCurrency(current)} / {formatCurrency(target)}
        </span>
      </div>
    </div>
  );
}

export { ProgressBar, type ProgressBarProps };
