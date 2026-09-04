'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UtensilsCrossed, CalendarHeart, Sparkles } from 'lucide-react';
import { MagneticButton } from './hero/MagneticButton';
import { InkStamp } from './InkStamp';

export interface HeroSectionProps {
  onOrderClick?: () => void;
  menuAnchorId?: string;
  cateringHref?: string;
  shouldAnimateIn?: boolean;
}

export function HeroSection({
  onOrderClick,
  menuAnchorId = 'menu',
  cateringHref = '#catering',
}: HeroSectionProps) {
  const handleScrollToMenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById(menuAnchorId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    onOrderClick?.();
  };

  return (
    <section
      id="top"
      aria-label="Hero Section Mojo Grille"
      className="relative overflow-hidden bg-cream-bg border-b border-charcoal-ink/10 select-none"
    >
      {/* Bloque Principal Hero */}

      {/* 2. Bloque Principal Hero */}
      <div className="relative pt-10 pb-16 sm:pt-16 sm:pb-24">
        <div className="relative mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-8">
          
          {/* Ficha de Metadato Flotante Superior (Ticket de Comanda) */}
          <div className="flex flex-col items-center text-center space-y-3 max-w-5xl mx-auto">
            {/* Eyebrow de Comanda y Filosofía */}
            <p className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-fire select-none">
              [ 100% MARINADO CRIOLLO // SIN ATAJOS ]
            </p>

            {/* Titular Central Impactante: HIERRO CALIENTE. AJO TRITURADO. PERNIL ASADO. */}
            <h1 className="font-display text-5xl sm:text-7xl lg:text-[7.5vw] font-black uppercase tracking-tight text-charcoal-ink leading-[0.88] text-center max-w-5xl">
              HIERRO CALIENTE.{' '}
              <span className="font-accent font-serif italic font-normal lowercase tracking-normal text-brand-fire">
                ajo triturado.
              </span>{' '}
              PERNIL ASADO.
            </h1>

            {/* Subtítulo Narrativo Visceral */}
            <p className="mt-3 max-w-3xl font-sans text-sm sm:text-base md:text-lg leading-relaxed text-charcoal-ink/90 text-center">
              No hacemos bowls corporativos. Cocinamos recetas familiares de cerdo macerado durante 4 horas en naranja agria, prensadas{' '}
              <span className="font-bold text-brand-fire">al momento</span> en el corazón de Brownsville.
            </p>
          </div>

          {/* Elemento Fotográfico Central con Placas Editoriales */}
          <div className="relative mx-auto mt-10 w-full max-w-4xl">
            
            {/* Contenedor Fotográfico con Marco Rígido Editorial */}
            <div className="group relative overflow-hidden rounded-none border-2 border-charcoal-ink bg-surface-sand">
              <img
                src="/assets/mojo-bowl-ropa-vieja.jpg"
                alt="Signature Mojo Grille dish: The Authentic Criollo Flavor of Miami, Marinado to Perfection - Artisanal Cuban bowl marinated in citrus mojo"
                width={1024}
                height={768}
                loading="eager"
                className="aspect-16/10 w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

              {/* Botón rápido sobre el plato: AGARRAR ESTE BOWL */}
              <button
                type="button"
                onClick={onOrderClick}
                className="absolute bottom-4 left-4 z-20 inline-flex items-center gap-2 rounded-none bg-charcoal-ink text-cream-bg px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-widest border border-cream-bg/20 hover:bg-brand-fire transition-colors cursor-pointer select-none"
              >
                <span>AGARRAR ESTE BOWL</span>
                <span>→</span>
              </button>

              {/* Tag de Precio en formato ticket */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-none bg-charcoal-ink px-3.5 py-1.5 border border-cream-bg/20 text-cream-bg">
                <span className="font-sans text-base font-black text-mojo-citrus tracking-tight">
                  $15.50
                </span>
                <span className="h-3 w-px bg-cream-bg/20" />
                <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-cream-bg">
                  Al Momento
                </span>
              </div>

              {/* Sello de Tinta Real Artesanal */}
              <div className="absolute -bottom-6 -right-6 z-20 hidden sm:flex">
                <InkStamp size={125} className="bg-cream-bg/95 p-1" />
              </div>
            </div>

            {/* Badge Izquierdo: Social Proof Rating (Invariante QA) */}
            <motion.div
              role="status"
              aria-label="Average customer rating in Miami"
              whileHover={{ scale: 1.02 }}
              className="absolute -top-4 -left-4 sm:-top-5 sm:-left-6 z-20 rounded-none border-2 border-charcoal-ink bg-surface-sand px-4 py-2.5 select-none cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="text-mojo-citrus text-lg" aria-hidden="true">⭐</span>
                <div className="text-left">
                  <p className="font-sans text-xs font-black text-charcoal-ink leading-tight">
                    4.7 Stars across +3,000 orders in Miami
                  </p>
                  <p className="font-sans text-[10px] text-charcoal-ink/70">
                    UberEats &amp; Google Miami (4.7 en 3K+ Reviews)
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Badge Derecho: Ficha de Metadato Editorial */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="absolute -bottom-4 -right-3 sm:-bottom-5 sm:-right-4 z-20 rounded-none border border-charcoal-ink/20 bg-leaf-green px-4 py-2.5 text-cream-bg select-none cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg" aria-hidden="true">🌿</span>
                <div className="text-left">
                  <p className="font-sans text-xs font-black text-cream-bg leading-tight uppercase tracking-wide">
                    EST. MIAMI · 100% ARTISANAL MOJO
                  </p>
                  <p className="font-sans text-[10px] text-cream-bg/85">
                    Hecho Al Momento
                  </p>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Botón Primario de Acción: A LA PLANCHA */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <MagneticButton
              href={menuAnchorId ? `#${menuAnchorId}` : '#menu'}
              onClick={handleScrollToMenu}
              className="group relative inline-flex items-center justify-center gap-3 rounded-none border-2 border-brand-fire bg-brand-fire px-9 py-4 font-sans text-sm sm:text-base font-bold uppercase tracking-wider text-cream-bg hover:bg-charcoal-ink hover:border-charcoal-ink transition-colors cursor-pointer select-none"
            >
              <UtensilsCrossed className="h-4 w-4 transition-transform group-hover:rotate-12" aria-hidden="true" />
              <span>A LA PLANCHA</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 font-bold">
                →
              </span>
            </MagneticButton>

            <a
              href={cateringHref}
              className="inline-flex items-center justify-center gap-2.5 rounded-none border-2 border-charcoal-ink bg-surface-sand px-7 py-4 font-sans text-sm sm:text-base font-bold uppercase tracking-wider text-charcoal-ink hover:bg-charcoal-ink hover:text-cream-bg transition-colors select-none"
            >
              <CalendarHeart className="h-4 w-4 text-leaf-green" aria-hidden="true" />
              <span>Catering &amp; Events</span>
            </a>
          </div>

          {/* Microcopia de Confianza y Rapidez */}
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-charcoal-ink/70">
            <Sparkles className="h-3.5 w-3.5 text-leaf-green" aria-hidden="true" />
            <span>Fresh ingredients • 15 min pickup • Fast delivery caliente al momento</span>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HeroSection;
