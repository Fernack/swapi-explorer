'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getVisiblePageNumbers } from '@/lib/pagination';
import type { PaginationProps } from '@/types/components';

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    const visiblePages = getVisiblePageNumbers(currentPage, totalPages);

    return (
        <div className="flex items-center justify-center gap-2 mt-8">
            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-40"
            >
                <ChevronLeft size={16} />
                Prev
            </Button>

            <div className="flex items-center gap-1">
                {visiblePages.map((page) => (
                    <Button
                        key={page}
                        variant={currentPage === page ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => onPageChange(page)}
                        className={
                            currentPage === page
                                ? 'bg-primary text-primary-foreground border-primary min-w-[36px]'
                                : 'border-white/10 bg-white/5 hover:bg-white/10 min-w-[36px]'
                        }
                    >
                        {page}
                    </Button>
                ))}
            </div>

            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-40"
            >
                Next
                <ChevronRight size={16} />
            </Button>
        </div>
    );
}
