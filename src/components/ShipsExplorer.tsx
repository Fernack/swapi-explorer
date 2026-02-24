'use client';

import { Rocket } from 'lucide-react';
import { SearchBar } from '@/components/SearchBar';
import { Pagination } from '@/components/Pagination';
import { GridSkeleton } from '@/components/LoadingSkeletons';
import { StarshipCard } from './StarshipCard';
import { DetailModal } from './DetailModal';
import { useEntityExplorer } from '@/hooks/useEntityExplorer';
import type { Starship } from '@/types/swapi';

export function ShipsExplorer() {
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
    } = useEntityExplorer<Starship>({
        entity: 'starships',
        buildDetail: (selected) => {
            if (!selected) return { title: '', stats: [], extras: [] };

            return {
                title: selected.name,
                stats: [
                    { label: 'Model', value: selected.model },
                    { label: 'Manufacturer', value: selected.manufacturer },
                    { label: 'Class', value: selected.starship_class },
                    { label: 'Length', value: `${selected.length} m` },
                    { label: 'Crew', value: selected.crew },
                    { label: 'Passengers', value: selected.passengers },
                    {
                        label: 'Max Speed',
                        value:
                            selected.max_atmosphering_speed !== 'unknown'
                                ? `${selected.max_atmosphering_speed} km/h`
                                : 'unknown',
                    },
                    {
                        label: 'Cargo',
                        value:
                            selected.cargo_capacity !== 'unknown'
                                ? `${selected.cargo_capacity} kg`
                                : 'unknown',
                    },
                    {
                        label: 'Cost',
                        value:
                            selected.cost_in_credits !== 'unknown'
                                ? `${selected.cost_in_credits} credits`
                                : 'unknown',
                    },
                    { label: 'Consumables', value: selected.consumables },
                    { label: 'Hyperdrive', value: selected.hyperdrive_rating },
                    { label: 'MGLT', value: selected.MGLT },
                ],
                extras: [
                    { label: 'Known Pilots', value: selected.pilots.length },
                    { label: 'Film Appearances', value: selected.films.length },
                ],
            };
        },
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <Rocket size={20} className="text-primary" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold gold-text">Ships</h1>
                        <p className="text-sm text-muted-foreground">{totalCount} starships</p>
                    </div>
                </div>
                <SearchBar onSearch={handleSearch} placeholder="Search starships..." className="w-full sm:w-72" />
            </div>
            <div className="lightsaber-line" />
            {loading ? (
                <GridSkeleton count={6} />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((ship) => (
                        <StarshipCard key={ship.url} ship={ship} onClick={() => openModalFor(ship)} />
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
