import type { Metadata } from 'next';
import { PlanetsExplorer } from '@/components/PlanetsExplorer';

export const metadata: Metadata = {
  title: 'Planets',
  description:
    'Explore all planets in the Star Wars universe. From desert Tatooine to forest Endor, discover every world.',
};

export default function PlanetsPage() {
  return <PlanetsExplorer />;
}
