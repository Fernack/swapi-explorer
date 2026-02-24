'use client';

import { Users } from 'lucide-react';
import { SearchBar } from '@/components/SearchBar';
import { Pagination } from '@/components/Pagination';
import { GridSkeleton } from '@/components/LoadingSkeletons';
import { CharacterCard } from '@/components/CharacterCard';
import { DetailModal } from './DetailModal';
import { useEntityExplorer } from '@/hooks/useEntityExplorer';
import type { Person } from '@/types/swapi';

export function CharactersExplorer() {
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
    } = useEntityExplorer<Person>({
        entity: 'people',
        buildDetail: (selected) => {
            if (!selected) return { title: '', stats: [], extras: [] };

            return {
                title: selected.name,
                stats: [
                    { label: 'Birth Year', value: selected.birth_year },
                    { label: 'Gender', value: selected.gender },
                    { label: 'Height', value: selected.height !== 'unknown' ? `${selected.height} cm` : 'unknown' },
                    { label: 'Mass', value: selected.mass !== 'unknown' ? `${selected.mass} kg` : 'unknown' },
                    { label: 'Hair Color', value: selected.hair_color },
                    { label: 'Eye Color', value: selected.eye_color },
                    { label: 'Skin Color', value: selected.skin_color },
                ],
                extras: [
                    { label: 'Films Appearances', value: selected.films.length },
                    { label: 'Starships', value: selected.starships.length },
                    { label: 'Vehicles', value: selected.vehicles.length },
                    { label: 'Species', value: selected.species.length },
                ],
            };
        },
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                        <Users size={20} className="text-blue-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold gold-text">Characters</h1>
                        <p className="text-sm text-muted-foreground">
                            {totalCount} beings in the galaxy
                        </p>
                    </div>
                </div>
                <SearchBar
                    onSearch={handleSearch}
                    placeholder="Search characters..."
                    className="w-full sm:w-72"
                />
            </div>

            <div className="lightsaber-line" />

            {/* Grid */}
            {loading ? (
                <GridSkeleton count={6} />
            ) : items?.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground">
                    <Users size={48} className="mx-auto mb-4 opacity-30" />
                    <p className="text-lg">No characters found</p>
                    <p className="text-sm mt-1">Try a different search term</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items?.map((person) => (
                        <CharacterCard
                            key={person.url}
                            person={person}
                            onClick={() => openModalFor(person)}
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
