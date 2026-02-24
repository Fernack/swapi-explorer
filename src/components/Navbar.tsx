'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
    LayoutDashboard,
    Users,
    Globe2,
    Rocket,
    Car,
    Bot,
    Menu,
    X,
    Satellite,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

const navItems = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/characters', label: 'Characters', icon: Users },
    { href: '/planets', label: 'Planets', icon: Globe2 },
    { href: '/starships', label: 'Starships', icon: Rocket },
    { href: '/vehicles', label: 'Vehicles', icon: Car },
    { href: '/chat', label: 'AI Agent', icon: Bot },
];

function NavLink({ href, label, icon: Icon, onClick }: { href: string; label: string; icon: React.ElementType; onClick?: () => void }) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            onClick={onClick}
            className={cn(
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium group',
                isActive
                    ? 'nav-link-active'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
            )}
        >
            <Icon
                size={18}
                className={cn(
                    'transition-all duration-200',
                    isActive ? 'text-primary drop-shadow-[0_0_6px_oklch(0.82_0.18_85)]' : 'group-hover:text-primary'
                )}
            />
            {label}
            {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            )}
        </Link>
    );
}

export function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-white/8 bg-background/80 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="relative">
                        <Satellite
                            size={28}
                            className="text-primary drop-shadow-[0_0_8px_oklch(0.82_0.18_85)] transition-transform group-hover:rotate-12 duration-300"
                        />
                    </div>
                    <div>
                        <span className="gold-text font-bold text-xl tracking-tight">SWAPI</span>
                        <span className="text-muted-foreground text-xs block leading-none">Explorer</span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => (
                        <NavLink key={item.href} {...item} />
                    ))}
                </nav>

                {/* Mobile Nav */}
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu size={20} />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-72 bg-card border-border">
                        <div className="flex items-center gap-2 mb-8 mt-2">
                            <Satellite size={24} className="text-primary" />
                            <span className="gold-text font-bold text-lg">SWAPI Explorer</span>
                        </div>
                        <nav className="flex flex-col gap-1">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.href}
                                    {...item}
                                    onClick={() => setOpen(false)}
                                />
                            ))}
                        </nav>
                        <div className="lightsaber-line mt-8" />
                        <p className="text-xs text-muted-foreground mt-4 text-center">
                            May the Force be with you
                        </p>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
