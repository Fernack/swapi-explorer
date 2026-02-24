import { getIdFromUrl } from '@/lib/swapi';
import { StatBadge } from '@/components/StatBadge';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Globe2, Users, Droplets, Wind } from 'lucide-react';
import type { PlanetCardProps } from '@/types/components';

const TERRAIN_COLORS: Record<string, string> = {
  desert: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  ocean: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  jungle: 'bg-green-500/20 text-green-300 border-green-500/30',
  forest: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  mountains: 'bg-stone-400/20 text-stone-300 border-stone-400/30',
  plains: 'bg-lime-500/20 text-lime-300 border-lime-500/30',
  tundra: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  ice: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
  swamp: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  cityscape: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  'gas giant': 'bg-rose-500/20 text-rose-300 border-rose-500/30',
};

function getTerrainColor(terrain: string): string {
  const lowerTerrain = terrain.toLowerCase();
  for (const [key, value] of Object.entries(TERRAIN_COLORS)) {
    if (lowerTerrain.includes(key)) return value;
  }
  return 'bg-white/10 text-white/70 border-white/20';
}

export function formatPlanetPopulation(pop: string): string {
  if (pop === 'unknown') return 'unknown';
  const num = parseInt(pop, 10);
  if (Number.isNaN(num)) return pop;
  if (num >= 1e12) return `${(num / 1e12).toFixed(1)}T`;
  if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
  return num.toString();
}

export function PlanetCard({ planet, onClick }: PlanetCardProps) {
  const id = getIdFromUrl(planet.url);
  const terrainClass = getTerrainColor(planet.terrain);
  const firstTerrain = planet.terrain.split(',')[0].trim();

  return (
    <button
      onClick={onClick}
      id={`planet-card-${id}`}
      className="glass-card card-hover rounded-xl p-5 text-left w-full border border-white/8 group cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
            <Globe2 size={18} className="text-green-400" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
              {planet.name}
            </h3>
            <p className="text-xs text-muted-foreground capitalize">{planet.climate}</p>
          </div>
        </div>
        <Badge variant="outline" className={`text-xs border capitalize ${terrainClass}`}>
          {firstTerrain}
        </Badge>
      </div>

      <Separator className="bg-white/6 mb-3" />

      <div className="grid grid-cols-3 gap-3">
        <StatBadge label="Population" value={formatPlanetPopulation(planet.population)} />
        <StatBadge
          label="Diameter"
          value={
            planet.diameter !== 'unknown'
              ? `${parseInt(planet.diameter, 10).toLocaleString()}km`
              : 'unknown'
          }
        />
        <StatBadge label="Gravity" value={planet.gravity} />
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Droplets size={11} className="text-blue-400" />
        <span>{planet.surface_water}% water</span>
        <span className="mx-1">·</span>
        <Wind size={11} />
        <span>{planet.orbital_period}d orbit</span>
        <span className="mx-1">·</span>
        <Users size={11} />
        <span>{planet.residents.length} residents</span>
      </div>
    </button>
  );
}

