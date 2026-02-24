'use client';

import { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { SearchBarProps } from '@/types/components';

export function SearchBar({ onSearch, placeholder = 'Search...', className }: SearchBarProps) {
    const [value, setValue] = useState('');

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;
            setValue(newValue);
            onSearch(newValue);
        },
        [onSearch]
    );

    const handleClear = () => {
        setValue('');
        onSearch('');
    };

    return (
        <div className={cn('relative group', className)}>
            <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
            />
            <Input
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className="pl-9 pr-9 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/8 transition-all"
            />
            {value && (
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 hover:bg-white/10"
                    onClick={handleClear}
                >
                    <X size={14} />
                </Button>
            )}
        </div>
    );
}
