'use client';

import { Globe2 } from 'lucide-react';
import { SearchBar } from '@/components/SearchBar';
import { Pagination } from '@/components/Pagination';
import { GridSkeleton } from '@/components/LoadingSkeletons';
import { formatPlanetPopulation, PlanetCard } from '@/components/PlanetCard';
import { DetailModal } from './DetailModal';
import { useEntityExplorer } from '@/hooks/useEntityExplorer';
import type { Planet } from '@/types/swapi';

export function PlanetsExplorer() {
    const {
        items,
        loading,
        page,
        setPage,
        totalCount,
        totalPages,
        handleSearch,
        isModalOpen,
        closeModal,
        openModalFor,
        detail,
    } = useEntityExplorer<Planet>({
        entity: 'planets',
        buildDetail: (selected) => {
            if (!selected) return { title: '', stats: [], extras: [] };

            return {
                title: selected.name,
                stats: [
                    { label: 'Climate', value: selected.climate },
                    { label: 'Terrain', value: selected.terrain },
                    { label: 'Population', value: formatPlanetPopulation(selected.population) },
                    { label: 'Gravity', value: selected.gravity },
                    {
                        label: 'Diameter',
                        value:
                            selected.diameter !== 'unknown'
                                ? `${parseInt(selected.diameter, 10).toLocaleString()} km`
                                : 'unknown',
                    },
                    {
                        label: 'Surface Water',
                        value: selected.surface_water !== 'unknown' ? `${selected.surface_water}%` : 'unknown',
                    },
                    {
                        label: 'Rotation Period',
                        value:
                            selected.rotation_period !== 'unknown'
                                ? `${selected.rotation_period} hrs`
                                : 'unknown',
                    },
                    {
                        label: 'Orbital Period',
                        value:
                            selected.orbital_period !== 'unknown'
                                ? `${selected.orbital_period} days`
                                : 'unknown',
                    },
                ],
                extras: [
                    { label: 'Known Residents', value: selected.residents.length },
                    { label: 'Film Appearances', value: selected.films.length },
                ],
            };
        },
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                        <Globe2 size={20} className="text-green-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold gold-text">Planets</h1>
                        <p className="text-sm text-muted-foreground">{totalCount} worlds to explore</p>
                    </div>
                </div>
                <SearchBar onSearch={handleSearch} placeholder="Search planets..." className="w-full sm:w-72" />
            </div>

            <div className="lightsaber-line" />

            {loading ? (
                <GridSkeleton count={6} />
            ) : items.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground">
                    <Globe2 size={48} className="mx-auto mb-4 opacity-30" />
                    <p className="text-lg">No planets found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((planet) => (
                        <PlanetCard
                            key={planet.url}
                            planet={planet}
                            onClick={() => openModalFor(planet)}
                        />
                    ))}
                </div>
            )}

            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            <DetailModal
                title={detail.title}
                stats={detail.stats}
                extras={detail.extras}
                open={isModalOpen}
                onClose={closeModal}
            />
        </div>
    );
}
