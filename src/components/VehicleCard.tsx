import { getIdFromUrl } from "@/lib/swapi";
import { Car, Package, Users } from "lucide-react";
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { StatBadge } from '@/components/StatBadge';
import type { VehicleCardProps } from '@/types/components';

export function formatCredits(credits: string): string {
  if (credits === 'unknown') return 'unknown';
  const num = parseInt(credits, 10);
  if (isNaN(num)) return credits;
  return num.toLocaleString();
}

export function VehicleCard({ vehicle, onClick }: VehicleCardProps) {
  const id = getIdFromUrl(vehicle.url);
  return (
    <button
      onClick={onClick}
      id={`vehicle-card-${id}`}
      className="glass-card card-hover rounded-xl p-5 text-left w-full border border-white/8 group cursor-pointer"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
          <Car size={18} className="text-purple-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors leading-tight truncate">
            {vehicle.name}
          </h3>
          <p className="text-xs text-muted-foreground truncate">{vehicle.model}</p>
        </div>
        <Badge variant="outline" className="text-xs border border-purple-500/30 bg-purple-500/10 text-purple-300 whitespace-nowrap ml-1">
          {vehicle.vehicle_class}
        </Badge>
      </div>

      <Separator className="bg-white/6 mb-3" />

      <div className="grid grid-cols-3 gap-3">
        <StatBadge label="Length" value={vehicle.length !== 'unknown' ? `${vehicle.length}m` : 'unknown'} />
        <StatBadge label="Crew" value={vehicle.crew} />
        <StatBadge label="Max Speed" value={vehicle.max_atmosphering_speed !== 'unknown' ? `${vehicle.max_atmosphering_speed}km/h` : 'unknown'} />
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Users size={11} />
        <span>{vehicle.passengers} passengers</span>
        <span className="mx-1">·</span>
        <Package size={11} />
        <span>{formatCredits(vehicle.cost_in_credits)} credits</span>
      </div>
    </button>
  );
}