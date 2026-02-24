import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { StarField } from '@/components/StarField';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'SWAPI Explorer — Star Wars Universe',
    template: '%s | SWAPI Explorer',
  },
  description:
    'Explore the Star Wars universe interactively. Browse characters, planets, starships, and vehicles from the official Star Wars API (SWAPI). Powered by an AI agent.',
  keywords: ['Star Wars', 'SWAPI', 'Star Wars API', 'characters', 'planets', 'starships'],
  openGraph: {
    title: 'SWAPI Explorer — Star Wars Universe',
    description: 'Explore the Star Wars universe interactively with AI assistance.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
        <StarField />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
            {children}
          </main>
          <footer className="border-t border-white/6 py-6 text-center text-xs text-muted-foreground">
            <p>
              Built with ❤️ using{' '}
              <span className="text-primary">Next.js 15</span>,{' '}
              <span className="text-primary">TypeScript</span>,{' '}
              <span className="text-primary">Tailwind CSS</span> &{' '}
              <span className="text-primary">shadcn/ui</span>
            </p>
            <p className="mt-1">
              Data from{' '}
              <a
                href="https://swapi.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                swapi.dev
              </a>{' '}
              · May the Force be with you 🌟
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
