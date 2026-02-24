import { cn } from '@/lib/utils';
import type { StatBadgeProps } from '@/types/components';

export function StatBadge({ label, value, className }: StatBadgeProps) {
    const isUnknown = value === 'unknown' || value === 'n/a' || value === 'N/A';
    return (
        <div className={cn('flex flex-col gap-0.5', className)}>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{label}</span>
            <span className={cn('text-sm font-semibold', isUnknown ? 'text-muted-foreground' : 'text-foreground')}>
                {isUnknown ? '—' : value}
            </span>
        </div>
    );
}
