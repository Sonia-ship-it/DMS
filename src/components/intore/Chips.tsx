import { cn } from '@/lib/utils';

export function StrengthChip({ label, className }: { label: string; className?: string }) {
  return (
    <span className={cn('inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400', className)}>
      {label}
    </span>
  );
}

export function GapChip({ label, className }: { label: string; className?: string }) {
  return (
    <span className={cn('inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', className)}>
      {label}
    </span>
  );
}
