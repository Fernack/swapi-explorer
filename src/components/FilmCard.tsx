import type { FilmCardProps } from '@/types/components';

const EPISODE_LABELS = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

const EPISODE_COLORS: Record<number, string> = {
  1: '#a855f7',
  2: '#f97316',
  3: '#ef4444',
  4: '#eab308',
  5: '#3b82f6',
  6: '#22c55e',
  7: '#06b6d4',
};

export function FilmCard({ film }: FilmCardProps) {
  const roman = EPISODE_LABELS[film.episode_id] || String(film.episode_id);
  const color = EPISODE_COLORS[film.episode_id] || '#eab308';

  return (
    <div
      className="glass-card rounded-xl p-4 border border-white/8 hover:border-white/15 transition-all"
      style={{ borderLeftColor: color, borderLeftWidth: '3px' }}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
          style={{ background: `${color}20`, color }}
        >
          {roman}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm text-foreground truncate">{film.title}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Dir. {film.director} · {new Date(film.release_date).getFullYear()}
          </p>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2 opacity-70">
            {film.opening_crawl.slice(0, 120).trim()}...
          </p>
          <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
            <span>{film.characters.length} chars</span>
            <span>·</span>
            <span>{film.planets.length} planets</span>
            <span>·</span>
            <span>{film.starships.length} ships</span>
          </div>
        </div>
      </div>
    </div>
  );
}

