import { cn } from '@/lib/utils';

interface SuggestionChipsProps {
  suggestions: string[];
  onSelect: (s: string) => void;
  className?: string;
}

export function SuggestionChips({ suggestions, onSelect, className }: SuggestionChipsProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {suggestions.map((s) => (
        <button
          key={s}
          onClick={() => onSelect(s)}
          className="px-3 py-1.5 rounded-full text-xs font-medium border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
        >
          {s}
        </button>
      ))}
    </div>
  );
}
