import type { Metadata } from 'next';
import { VehiclesExplorer } from '@/components/VehiclesExplorer';

export const metadata: Metadata = {
  title: 'Vehicles',
  description:
    'Explore all vehicles in the Star Wars universe. From the Millennium Falcon to AT-ATs.',
};

export default function VehiclesPage() {
  return <VehiclesExplorer />;
}
