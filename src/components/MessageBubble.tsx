import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { MessageBubbleProps } from '@/types/components';

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'flex gap-3 message-animate',
        isUser ? 'flex-row-reverse' : 'flex-row',
      )}
    >
      <Avatar className="w-8 h-8 flex-shrink-0 mt-1">
        <AvatarFallback
          className={cn(
            'text-xs font-bold',
            isUser ? 'bg-primary/20 text-primary' : 'bg-blue-500/20 text-blue-300',
          )}
        >
          {isUser ? <User size={14} /> : <Bot size={14} />}
        </AvatarFallback>
      </Avatar>

      <div
        className={cn(
          'max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
          isUser
            ? 'bg-primary/15 border border-primary/20 text-foreground rounded-tr-sm'
            : 'bg-blue-500/10 border border-blue-500/15 text-foreground rounded-tl-sm',
        )}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        <span className="text-[10px] text-muted-foreground mt-1 block">
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </div>
  );
}

