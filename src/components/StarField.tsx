'use client';

import { useEffect, useRef } from 'react';

export function StarField() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const starCount = 150;
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            const size = Math.random() * 2.5 + 0.5;
            star.className = 'star';
            star.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        --duration: ${Math.random() * 4 + 2}s;
        --delay: ${Math.random() * 4}s;
        --opacity: ${Math.random() * 0.6 + 0.2};
      `;
            fragment.appendChild(star);
        }

        container.appendChild(fragment);

        return () => {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        };
    }, []);

    return <div ref={containerRef} className="star-field" aria-hidden="true" />;
}
