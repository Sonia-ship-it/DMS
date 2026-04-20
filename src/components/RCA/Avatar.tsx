import { cn } from '@/lib/utils';

export function Avatar({ name, color, size = 'md', className }: { name: string; color?: string; size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
  const sizeClass = { sm: 'h-8 w-8 text-xs', md: 'h-10 w-10 text-sm', lg: 'h-16 w-16 text-xl' }[size];

  return (
    <div className={cn('rounded-full flex items-center justify-center font-semibold text-primary-foreground shrink-0', color || 'bg-primary', sizeClass, className)}>
      {initials}
    </div>
  );
}
