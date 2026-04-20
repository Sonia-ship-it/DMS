import { AlertTriangle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BiasWarningProps {
  message: string;
  onDismiss: () => void;
  className?: string;
}

export function BiasWarning({ message, onDismiss, className }: BiasWarningProps) {
  return (
    <div className={cn('flex items-start gap-3 p-4 rounded-xl bg-amber/10 border border-amber/20 animate-slide-down', className)}>
      <AlertTriangle className="h-5 w-5 text-amber shrink-0 mt-0.5" />
      <p className="flex-1 text-sm text-foreground">{message}</p>
      <button onClick={onDismiss} className="shrink-0 p-1 rounded-lg hover:bg-amber/10 transition-colors" aria-label="Dismiss warning">
        <X className="h-4 w-4 text-muted-foreground" />
      </button>
    </div>
  );
}
