import { getIdFromUrl } from '@/lib/swapi';
import { StatBadge } from '@/components/StatBadge';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, Swords, Star } from 'lucide-react';
import type { CharacterCardProps } from '@/types/components';

const GENDER_COLORS: Record<string, string> = {
  male: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  female: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
  hermaphrodite: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  none: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
  'n/a': 'bg-gray-500/20 text-gray-300 border-gray-500/30',
};

export function CharacterCard({ person, onClick }: CharacterCardProps) {
  const id = getIdFromUrl(person.url);
  const genderClass = GENDER_COLORS[person.gender] ?? GENDER_COLORS['n/a'];

  return (
    <button
      onClick={onClick}
      id={`character-card-${id}`}
      className="glass-card card-hover rounded-xl p-5 text-left w-full border border-white/8 group cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
            <User size={18} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
              {person.name}
            </h3>
            <p className="text-xs text-muted-foreground">Born {person.birth_year}</p>
          </div>
        </div>
        <Badge variant="outline" className={`text-xs border ${genderClass}`}>
          {person.gender === 'n/a' ? 'N/A' : person.gender}
        </Badge>
      </div>

      <Separator className="bg-white/6 mb-3" />

      <div className="grid grid-cols-3 gap-3">
        <StatBadge label="Height" value={person.height !== 'unknown' ? `${person.height}cm` : 'unknown'} />
        <StatBadge label="Mass" value={person.mass !== 'unknown' ? `${person.mass}kg` : 'unknown'} />
        <StatBadge label="Hair" value={person.hair_color} />
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Star size={11} className="text-primary" />
        <span>
          {person.films.length} film{person.films.length !== 1 ? 's' : ''}
        </span>
        <span className="mx-1">·</span>
        <Swords size={11} />
        <span>
          {person.starships.length} ship{person.starships.length !== 1 ? 's' : ''}
        </span>
      </div>
    </button>
  );
}

