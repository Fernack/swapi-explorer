import { Suspense } from 'react';
import { Dashboard } from '@/components/Dashboard';
import { GridSkeleton } from '@/components/LoadingSkeletons';

export default function HomePage() {
  return (
    <Suspense fallback={<GridSkeleton count={6} />}>
      <Dashboard />
    </Suspense>
  );
}
