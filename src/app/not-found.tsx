import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search, Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
      <div className="w-14 h-14 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
        <Search className="text-blue-300" size={26} />
      </div>
      <h1 className="text-2xl font-bold gold-text">Page not found</h1>
      <p className="text-sm text-muted-foreground max-w-md">
        We couldn&apos;t find the page you were looking for in this quadrant of the galaxy.
      </p>
      <Button asChild className="mt-2 flex items-center gap-2">
        <Link href="/">
          <Home size={14} />
          Back to dashboard
        </Link>
      </Button>
    </div>
  );
}

