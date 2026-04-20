import { cn } from '@/lib/utils';

interface ScoreBarProps {
  score: number;
  className?: string;
  showLabel?: boolean;
}

export function ScoreBar({ score, className, showLabel = true }: ScoreBarProps) {
  const color = score >= 70 ? 'bg-score-high' : score >= 50 ? 'bg-score-medium' : 'bg-score-low';
  
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden" role="progressbar" aria-valuenow={score} aria-valuemin={0} aria-valuemax={100} aria-label={`Match score: ${score}%`}>
        <div
          className={cn('h-full rounded-full animate-score-fill', color)}
          style={{ '--score-width': `${score}%`, width: `${score}%` } as React.CSSProperties}
        />
      </div>
      {showLabel && <span className="text-sm font-semibold min-w-[3ch] text-right">{score}%</span>}
    </div>
  );
}
