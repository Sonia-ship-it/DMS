import { cn } from '@/lib/utils';

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  const styles: Record<string, string> = {
    Active: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Draft: 'bg-slate-50 text-slate-600 border-slate-100',
    Closed: 'bg-slate-100 text-slate-400 border-slate-200',
    Completed: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Failed: 'bg-rose-50 text-rose-700 border-rose-100',
    IN: 'bg-indigo-50 text-indigo-700 border-indigo-100 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-800',
    OUT: 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800',
    RETURNED: 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800',
    Pending: 'bg-amber-50 text-amber-700 border-amber-100',
    Resolved: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  };

  return (
    <span className={cn('inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-all', styles[status] || 'bg-slate-50 text-slate-500 border-slate-100', className)}>
      {status}
    </span>
  );
}

export function TypeBadge({ type, className }: { type: string; className?: string }) {
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-50 text-brand-700 dark:bg-[rgba(234, 88, 12,0.1)] dark:text-[#EA580C]', className)}>
      {type}
    </span>
  );
}
