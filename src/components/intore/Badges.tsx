import { cn } from '@/lib/utils';

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  const styles: Record<string, string> = {
    Active: 'bg-slate-100 text-slate-900',
    Draft: 'bg-transparent text-slate-400 border border-slate-200',
    Closed: 'bg-transparent text-slate-300',
    Completed: 'bg-slate-100 text-slate-900',
    Failed: 'bg-transparent text-slate-400 border border-slate-200',
  };

  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium', styles[status] || 'bg-transparent text-slate-400 border border-slate-200', className)}>
      {status}
    </span>
  );
}

export function TypeBadge({ type, className }: { type: string; className?: string }) {
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-50 text-brand-700 dark:bg-[rgba(75,123,255,0.1)] dark:text-[#4B7BFF]', className)}>
      {type}
    </span>
  );
}
