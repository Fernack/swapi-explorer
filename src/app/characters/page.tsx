import type { Metadata } from 'next';
import { CharactersExplorer } from '@/components/CharactersExplorer';

export const metadata: Metadata = {
  title: 'Characters',
  description:
    'Browse all Star Wars characters from the SWAPI database. Search and explore heroes, villains, and everyone in between.',
};

export default function CharactersPage() {
  return <CharactersExplorer />;
}
