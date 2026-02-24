import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { StatBadge } from '@/components/StatBadge';
import { DetailModalProps } from '@/types/components';

export function DetailModal({ title, stats, extras, open, onClose }: DetailModalProps) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="bg-card border-white/12 max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-xl gold-text">{title}</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[60vh]">
                    <div className="space-y-4 pr-2">
                        <div className="grid grid-cols-2 gap-3">
                            {stats.map((s) => (
                                <StatBadge key={s.label} label={s.label} value={s.value?.toString() || 'unknown'} />
                            ))}
                        </div>
                        {extras && extras.length > 0 && (
                            <>
                                <Separator className="bg-white/8" />
                                <div className="flex gap-3 text-sm">
                                    {extras.map((e, i) => (
                                        <React.Fragment key={i}>
                                            <span className="text-foreground font-semibold">{e.value}</span>
                                            <span className="text-muted-foreground">{e.label}</span>
                                            {i < extras.length - 1 && <span className="mx-1 text-white/20">|</span>}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}