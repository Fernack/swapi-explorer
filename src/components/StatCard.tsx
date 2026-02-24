import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import type { StatCardProps } from '@/types/components';

export function StatCard({
  title,
  value,
  icon: Icon,
  href,
  color,
  description,
}: StatCardProps) {
  return (
    <Link href={href} id={`stat-card-${title.toLowerCase()}`}>
      <Card className="glass-card card-hover border-white/8 group cursor-pointer h-full">
        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ background: `${color}15`, border: `1px solid ${color}30` }}
            >
              <Icon size={20} style={{ color }} />
            </div>
            <ArrowRight
              size={16}
              className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all"
            />
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-foreground">{value.toLocaleString()}</p>
            <p className="text-sm font-medium text-foreground/80">{title}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

