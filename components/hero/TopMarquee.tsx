'use client';

import { motion } from 'framer-motion';

interface TopMarqueeProps {
  variant?: 'terracotta' | 'lime';
}

const MARQUEE_ITEMS = [
  'MOJO GRILLE',
  'SLOW ROASTED PORK',
  'CITRUS MARINATED',
  'PRESSED TO PERFECTION',
];

export function TopMarquee({ variant = 'terracotta' }: TopMarqueeProps) {
  const bgClass =
    variant === 'lime'
      ? 'bg-leaf-green border-leaf-green/80 text-cream-bg'
      : 'bg-brand-fire border-brand-fire/80 text-cream-bg';

  return (
    <aside
      aria-label="Mojo Grille highlights marquee"
      className={`relative z-50 w-full overflow-hidden py-2.5 text-cream-bg select-none border-b ${bgClass} shadow-xs`}
    >
      <div className="relative flex overflow-x-hidden">
        {/* Dos contenedores flexibles con white-space: nowrap animados a velocidad constante (transform: translateX(-50%)) */}
        <div className="flex w-max will-change-transform animate-marquee font-display text-sm sm:text-base md:text-lg font-bold tracking-wider uppercase">
          {/* Primer contenedor flexible */}
          <div className="flex shrink-0 items-center gap-6 pr-6 whitespace-nowrap">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((phrase, index) => (
              <span key={`marq-1-${index}`} className="inline-flex items-center gap-6">
                <span>{phrase}</span>
                <span className="text-mojo-citrus text-base select-none">·</span>
              </span>
            ))}
          </div>

          {/* Segundo contenedor flexible para loop continuo infinito idéntico */}
          <div className="flex shrink-0 items-center gap-6 pr-6 whitespace-nowrap" aria-hidden="true">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((phrase, index) => (
              <span key={`marq-2-${index}`} className="inline-flex items-center gap-6">
                <span>{phrase}</span>
                <span className="text-mojo-citrus text-base select-none">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default TopMarquee;
