import { cn } from '@/lib/utils';

interface ChatBubbleProps {
  role: 'ai' | 'user';
  content: string;
  isStreaming?: boolean;
}

export function ChatBubble({ role, content, isStreaming }: ChatBubbleProps) {
  const isAi = role === 'ai';
  return (
    <div className={cn('flex animate-slide-up-chat', isAi ? 'justify-start' : 'justify-end')}>
      <div className={cn(
        'max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed',
        isAi ? 'bg-brand-50 text-foreground dark:bg-[rgba(75,123,255,0.1)]' : 'bg-primary text-primary-foreground'
      )}>
        <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
        {isStreaming && <span className="inline-block w-1.5 h-4 bg-primary ml-0.5 animate-blink" />}
      </div>
    </div>
  );
}
