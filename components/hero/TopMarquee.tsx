'use client';

import { motion } from 'framer-motion';

interface TopMarqueeProps {
  variant?: 'terracotta' | 'lime';
}

const MARQUEE_ITEMS = [
  '★ 24H CITRUS MARINATED MOJO',
  '★ FRESH LOCAL INGREDIENTS',
  '★ 4.7 STARS (+3,000 MIAMI REVIEWS)',
  '★ HANDCRAFTED BOWLS & CUBAN SANDWICHES',
];

export function TopMarquee({ variant = 'terracotta' }: TopMarqueeProps) {
  const bgClass =
    variant === 'lime'
      ? 'bg-[#4D7C0F] border-[#3F660C]'
      : 'bg-[#D95327] border-[#B83E16]';

  return (
    <aside
      aria-label="Destacados de Mojo Grille"
      className={`relative z-50 w-full overflow-hidden py-2 text-white select-none border-b ${bgClass} shadow-xs`}
    >
      <div className="relative flex overflow-x-hidden">
        {/* Usando framer-motion con fallback garantizado por animate-marquee */}
        <motion.div
          className="flex gap-8 whitespace-nowrap w-max font-sans text-xs sm:text-sm font-black tracking-widest uppercase items-center"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ ease: 'linear', duration: 24, repeat: Infinity }}
        >
          {/* Cadena duplicada para looping sin saltos */}
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map(
            (phrase, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-8 text-white/95 drop-shadow-xs"
              >
                <span>{phrase}</span>
                <span className="text-white/60 font-serif text-sm select-none">✦</span>
              </span>
            )
          )}
        </motion.div>
      </div>
    </aside>
  );
}

export default TopMarquee;
