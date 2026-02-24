import { getIdFromUrl } from "@/lib/swapi";
import { Package, Rocket, Users } from "lucide-react";
import { StatBadge } from '@/components/StatBadge';
import { Badge } from '@/components/ui/badge';
import { Separator } from "./ui/separator";
import type { StarshipCardProps } from '@/types/components';

export function StarshipCard({ ship, onClick }: StarshipCardProps) {
  const id = getIdFromUrl(ship.url);
  return (
    <button
      onClick={onClick}
      id={`starship-card-${id}`}
      className="glass-card card-hover rounded-xl p-5 text-left w-full border border-white/8 group cursor-pointer"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
          <Rocket size={18} className="text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors leading-tight truncate">
            {ship.name}
          </h3>
          <p className="text-xs text-muted-foreground truncate">{ship.model}</p>
        </div>
        <Badge variant="outline" className="text-xs border border-primary/30 bg-primary/10 text-primary whitespace-nowrap ml-1">
          {ship.starship_class}
        </Badge>
      </div>

      <Separator className="bg-white/6 mb-3" />

      <div className="grid grid-cols-3 gap-3">
        <StatBadge label="Length" value={ship.length !== 'unknown' ? `${ship.length}m` : 'unknown'} />
        <StatBadge label="Crew" value={ship.crew} />
        <StatBadge label="Hyperdrive" value={ship.hyperdrive_rating} />
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Users size={11} />
        <span>{ship.passengers} passengers</span>
        <span className="mx-1">·</span>
        <Package size={11} />
        <span>{ship.cargo_capacity !== 'unknown' ? `${parseInt(ship.cargo_capacity).toLocaleString()}kg cargo` : 'unknown cargo'}</span>
      </div>
    </button>
  );
}