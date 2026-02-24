import { Skeleton } from '@/components/ui/skeleton';

export function CardSkeleton() {
    return (
        <div className="glass-card rounded-xl p-5 space-y-3 border border-white/8">
            <Skeleton className="h-6 w-3/4 bg-white/10" />
            <Skeleton className="h-4 w-1/2 bg-white/8" />
            <div className="space-y-2 pt-2">
                <Skeleton className="h-3 w-full bg-white/6" />
                <Skeleton className="h-3 w-4/5 bg-white/6" />
                <Skeleton className="h-3 w-3/5 bg-white/6" />
            </div>
        </div>
    );
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: count }).map((_, i) => (
                <CardSkeleton key={i} />
            ))}
        </div>
    );
}
