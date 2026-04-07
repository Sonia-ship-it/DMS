import { useState, KeyboardEvent } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  variant?: 'primary' | 'neutral';
  className?: string;
}

export function TagInput({ tags, onChange, placeholder = 'Type and press Enter...', variant = 'primary', className }: TagInputProps) {
  const [input, setInput] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      if (!tags.includes(input.trim())) {
        onChange([...tags, input.trim()]);
      }
      setInput('');
    } else if (e.key === 'Backspace' && !input && tags.length) {
      onChange(tags.slice(0, -1));
    }
  };

  const pillClass = variant === 'primary'
    ? 'bg-brand-100 text-brand-700 dark:bg-[rgba(75,123,255,0.1)] dark:text-[#4B7BFF]'
    : 'bg-muted text-muted-foreground';

  return (
    <div className={cn('flex flex-wrap gap-2 p-2 rounded-lg border bg-background min-h-[42px] focus-within:ring-2 focus-within:ring-ring', className)}>
      {tags.map((tag) => (
        <span key={tag} className={cn('inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium', pillClass)}>
          {tag}
          <button type="button" onClick={() => onChange(tags.filter((t) => t !== tag))} className="hover:opacity-70" aria-label={`Remove ${tag}`}>
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={tags.length === 0 ? placeholder : ''}
        className="flex-1 min-w-[120px] bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      />
    </div>
  );
}
