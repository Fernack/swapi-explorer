'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,_#1e293b,_#020617)] text-foreground">
        <div className="max-w-md w-full px-6 py-8 glass-card border border-red-500/30 rounded-2xl text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/40 flex items-center justify-center">
              <AlertCircle className="text-red-400" size={24} />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p className="text-sm text-muted-foreground">
            An unexpected error occurred while rendering this page. You can try again or return to the
            dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center mt-4">
            <Button
              variant="outline"
              onClick={reset}
              className="flex items-center justify-center gap-2 border-white/20"
            >
              <RefreshCw size={14} />
              Try again
            </Button>
            <Button asChild className="flex items-center justify-center gap-2">
              <Link href="/">
                <Home size={14} />
                Go to dashboard
              </Link>
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}

