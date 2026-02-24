import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot } from 'lucide-react';

export function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <Avatar className="w-8 h-8 flex-shrink-0">
        <AvatarFallback className="bg-blue-500/20 text-blue-300 text-xs">
          <Bot size={14} />
        </AvatarFallback>
      </Avatar>
      <div className="bg-blue-500/10 border border-blue-500/15 rounded-2xl rounded-tl-sm px-4 py-3">
        <div className="flex gap-1 items-center h-4">
          {[0, 1, 2].map((i) => (
            <span
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

