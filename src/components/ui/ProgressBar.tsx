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
        <span className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
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
              className="text-sm font-medium text-gray-500 dark:text-gray-400"
            >
              Falta {formatCurrency(remaining)}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div
        className={cn(
          'relative h-3 w-full overflow-hidden rounded-full',
          'bg-gray-100 dark:bg-gray-800',
        )}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.1 }}
          className={cn(
            'absolute inset-y-0 left-0 rounded-full',
            isCompleted
              ? 'bg-gradient-to-r from-emerald-400 to-emerald-500'
              : 'bg-gradient-to-r from-[#8B1A4A] to-[#D4A853]',
          )}
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
              backgroundSize: '200% 100%',
            }}
            animate={{ backgroundPosition: ['200% 0%', '-200% 0%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>

        {isCompleted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-full bg-emerald-400/30"
          />
        )}
      </div>

      <div className="mt-1 flex justify-end">
        <span className="text-xs text-gray-400 dark:text-gray-500 tabular-nums">
          {formatCurrency(current)} / {formatCurrency(target)}
        </span>
      </div>
    </div>
  );
}

export { ProgressBar, type ProgressBarProps };
