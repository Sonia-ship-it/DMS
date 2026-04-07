import { cn } from '@/lib/utils';
import type { ConfidenceLevel } from '@/data/mockData';

const styles: Record<ConfidenceLevel, string> = {
  High: 'bg-brand-100 text-brand-700',
  Medium: 'bg-amber/10 text-amber',
  Low: 'bg-destructive/10 text-destructive',
};

export function ConfidenceBadge({ level, className }: { level: ConfidenceLevel; className?: string }) {
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', styles[level], className)}>
      {level}
    </span>
  );
}
