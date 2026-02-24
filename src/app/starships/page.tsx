import type { Metadata } from 'next';
import { ShipsExplorer } from '@/components/ShipsExplorer';

export const metadata: Metadata = {
  title: 'Starships',
  description:
    'Explore all starships in the Star Wars universe. From the Millennium Falcon to AT-ATs.',
};

export default function StarshipsPage() {
  return <ShipsExplorer />;
}
