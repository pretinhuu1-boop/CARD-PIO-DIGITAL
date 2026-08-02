'use client';

import type { Badge as BadgeData, BadgeTone } from '@/lib/data';
import { cn } from '@/lib/utils';

interface BadgeProps {
  badge: BadgeData;
  className?: string;
}

/**
 * Selo genérico. O rótulo vem de `data.ts` — o componente só decide a cor,
 * então criar um selo novo não exige tocar em código.
 */
const toneStyles: Record<BadgeTone, string> = {
  neutral: 'bg-surface-3 text-ink-2 border-line',
  accent: 'bg-accent-soft text-accent border-line',
  success: 'bg-success-soft text-success border-success/25',
  warning: 'bg-warning-soft text-warning border-warning/25',
  info: 'bg-info-soft text-info border-info/25',
};

function Badge({ badge, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-1',
        'text-[11px] font-medium tracking-wide select-none',
        toneStyles[badge.tone],
        className,
      )}
    >
      {badge.label}
    </span>
  );
}

export { Badge, type BadgeProps };
