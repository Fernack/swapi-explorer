import { getFilms, getPeople, getPlanets, getStarships, getVehicles, getSpecies } from '@/lib/swapi';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
    Users, Globe2, Rocket, Car, Film as FilmIcon,
    Dna, Clapperboard, Star
} from 'lucide-react';
import type { CSSProperties } from 'react';
import { StatCard } from '@/components/StatCard';
import { FilmCard } from '@/components/FilmCard';

const GENDER_COLORS: Record<string, string> = {
    male: '#3b82f6',
    female: '#ec4899',
    'n/a': '#9ca3af',
    none: '#9ca3af',
    hermaphrodite: '#a855f7',
};

export async function Dashboard() {
    const [peopleData, planetsData, starshipsData, vehiclesData, speciesData, filmsData] =
        await Promise.all([
            getPeople(1),
            getPlanets(1),
            getStarships(1),
            getVehicles(1),
            getSpecies(1),
            getFilms(),
        ]);

    const stats = [
        {
            title: 'Characters',
            value: peopleData.count,
            icon: Users,
            href: '/characters',
            color: '#3b82f6',
            description: 'Beings across the galaxy',
        },
        {
            title: 'Planets',
            value: planetsData.count,
            icon: Globe2,
            href: '/planets',
            color: '#22c55e',
            description: 'Worlds to explore',
        },
        {
            title: 'Starships',
            value: starshipsData.count,
            icon: Rocket,
            href: '/starships',
            color: '#eab308',
            description: 'Vessels of the fleet',
        },
        {
            title: 'Vehicles',
            value: vehiclesData.count,
            icon: Car,
            href: '/vehicles',
            color: '#a855f7',
            description: 'Ground & air vehicles',
        },
        {
            title: 'Species',
            value: speciesData.count,
            icon: Dna,
            href: '/characters',
            color: '#f97316',
            description: 'Unique life forms',
        },
        {
            title: 'Films',
            value: filmsData.count,
            icon: FilmIcon,
            href: '/characters',
            color: '#ef4444',
            description: 'Saga episodes',
        },
    ];

    if (!filmsData.results) {
        return <div>Failed to load films data</div>;
    }

    const sortedFilms = [...filmsData.results].sort(
        (a, b) => a.episode_id - b.episode_id
    );

    // Recent characters
    const recentPeople = peopleData.results.slice(0, 5);

    // Gender distribution
    const genders = peopleData.results.reduce(
        (acc, p) => { acc[p.gender] = (acc[p.gender] || 0) + 1; return acc; },
        {} as Record<string, number>
    );

    return (
        <div className="space-y-8">
            {/* Hero */}
            <div className="relative overflow-hidden rounded-2xl holographic p-8 border border-primary/15">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <Star size={16} className="text-primary" />
                        <Badge variant="outline" className="text-xs border-primary/30 text-primary bg-primary/10">
                            Galaxy Database
                        </Badge>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold gold-text mb-2">
                        Star Wars Explorer
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-xl">
                        Explore the complete Star Wars universe — characters, planets, starships, and more.
                        Powered by the official SWAPI database.
                    </p>
                </div>
                {/* Decorative rings */}
                <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full border border-primary/5 opacity-50" />
                <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full border border-primary/8 opacity-50" />
            </div>

            {/* Stats Grid */}
            <section>
                <h2 className="text-lg font-semibold text-muted-foreground mb-4 flex items-center gap-2">
                    <Clapperboard size={16} />
                    Universe Statistics
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    {stats.map((stat) => (
                        <StatCard key={stat.title} {...stat} />
                    ))}
                </div>
            </section>

            {/* Two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Films Timeline */}
                <section>
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <FilmIcon size={16} className="text-red-400" />
                        <span>Saga Films</span>
                        <Badge variant="outline" className="text-xs ml-1 border-white/15">{filmsData.count} films</Badge>
                    </h2>
                    <div className="space-y-3">
                        {sortedFilms.map((film) => (
                            <FilmCard key={film.url} film={film} />
                        ))}
                    </div>
                </section>

                {/* Right column */}
                <div className="space-y-6">
                    {/* Gender Chart */}
                    <section>
                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Users size={16} className="text-blue-400" />
                            Character Demographics
                        </h2>
                        <Card className="glass-card border-white/8">
                            <CardContent className="p-5 space-y-4">
                                {Object.entries(genders)
                                    .sort(([, a], [, b]) => b - a)
                                    .map(([gender, count]) => {
                                        const pct = Math.round((count / peopleData.results.length) * 100);
                                        const color = GENDER_COLORS[gender] ?? '#9ca3af';
                                        return (
                                            <div key={gender} className="space-y-1.5">
                                                <div className="flex justify-between text-sm">
                                                    <span className="capitalize text-muted-foreground">{gender === 'n/a' ? 'N/A' : gender}</span>
                                                    <span className="font-medium" style={{ color }}>{count} ({pct}%)</span>
                                                </div>
                                                <Progress
                                                    value={pct}
                                                    className="h-1.5 bg-white/8"
                                                    style={{ '--progress-foreground': color } as CSSProperties}
                                                />
                                            </div>
                                        );
                                    })}
                                <Separator className="bg-white/8" />
                                <p className="text-xs text-muted-foreground">
                                    From {peopleData.count} total characters in the database
                                </p>
                            </CardContent>
                        </Card>
                    </section>

                    {/* Quick Access */}
                    <section>
                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Rocket size={16} className="text-primary" />
                            Quick Access
                        </h2>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { href: '/characters', label: 'Browse Characters', icon: Users, color: '#3b82f6' },
                                { href: '/planets', label: 'Explore Planets', icon: Globe2, color: '#22c55e' },
                                { href: '/starships', label: 'View Ships', icon: Rocket, color: '#eab308' },
                                { href: '/chat', label: 'Ask AI Agent', icon: Star, color: '#a78bfa' },
                            ].map(({ href, label, icon: Icon, color }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className="glass-card card-hover rounded-xl p-4 flex flex-col items-center gap-2 text-center border border-white/8 group"
                                >
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                                        style={{ background: `${color}15`, border: `1px solid ${color}25` }}
                                    >
                                        <Icon size={18} style={{ color }} />
                                    </div>
                                    <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                                        {label}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
