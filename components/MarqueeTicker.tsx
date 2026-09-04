'use client';

import React from 'react';

export interface MarqueeTickerProps {
  variant?: 'brand' | 'charcoal' | 'cream';
  text?: string;
  speed?: string; // Tailwind duration class or style
}

const DEFAULT_TICKER_TEXT =
  'MOJO GRILLE · SLOW ROASTED PORK · CITRUS MARINATED · PRESSED TO PERFECTION · MIAMI FL · 100% ARTISANAL MOJO';

export function MarqueeTicker({
  variant = 'brand',
  text = DEFAULT_TICKER_TEXT,
}: MarqueeTickerProps) {
  const getThemeClasses = () => {
    switch (variant) {
      case 'charcoal':
        return 'bg-charcoal-ink text-cream-bg border-charcoal-ink/20';
      case 'cream':
        return 'bg-surface-sand text-charcoal-ink border-charcoal-ink/10';
      case 'brand':
      default:
        return 'bg-brand-fire text-cream-bg border-brand-fire/80';
    }
  };

  return (
    <aside
      aria-label="Marquesina cinética de Mojo Grille"
      className={`relative w-full overflow-hidden py-3 sm:py-4 select-none border-y shadow-xs ${getThemeClasses()}`}
    >
      <div className="relative flex overflow-x-hidden">
        {/* Contenedores con translate infinito a velocidad constante */}
        <div className="flex w-max will-change-transform animate-marquee font-display text-lg sm:text-2xl md:text-3xl font-black uppercase tracking-wider">
          {/* Bloque 1 */}
          <div className="flex shrink-0 items-center gap-8 pr-8 whitespace-nowrap">
            {[1, 2, 3, 4].map((idx) => (
              <span key={`ticker-a-${idx}`} className="inline-flex items-center gap-8">
                <span>{text}</span>
                <span className="text-mojo-citrus font-serif text-xl sm:text-2xl select-none" aria-hidden="true">
                  ✦
                </span>
              </span>
            ))}
          </div>

          {/* Bloque 2 duplicado para bucle continuo 100% fluido */}
          <div className="flex shrink-0 items-center gap-8 pr-8 whitespace-nowrap" aria-hidden="true">
            {[1, 2, 3, 4].map((idx) => (
              <span key={`ticker-b-${idx}`} className="inline-flex items-center gap-8">
                <span>{text}</span>
                <span className="text-mojo-citrus font-serif text-xl sm:text-2xl select-none">
                  ✦
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default MarqueeTicker;
