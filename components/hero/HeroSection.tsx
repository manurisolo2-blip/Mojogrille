'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UtensilsCrossed, CalendarHeart, Sparkles } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

const TICKER_ITEMS = [
  'MOJO GRILLE',
  'SLOW ROASTED PORK',
  'CITRUS MARINATED',
  'PRESSED TO PERFECTION',
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#F6F2E9] border-b border-charcoal-ink/10 pt-8 pb-16 sm:pt-14 sm:pb-24 select-none">
      {/* Destellos / Gradientes Circulares Difuminados en Bordes (CRAV style) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-20 h-96 w-96 rounded-full bg-leaf-green/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -right-24 h-[480px] w-[480px] rounded-full bg-brand-fire/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-1/4 h-80 w-80 rounded-full bg-mojo-citrus/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado Monumental Centrado */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-5xl mx-auto">
          
          {/* Pill superior de procedencia */}
          <div className="inline-flex items-center gap-2 rounded-full border border-charcoal-ink/10 bg-surface-sand px-4 py-1.5 shadow-xs">
            <span className="h-2 w-2 rounded-full bg-leaf-green animate-pulse" aria-hidden="true" />
            <span className="font-sans text-[11px] font-bold uppercase tracking-widest text-charcoal-ink">
              Authentic Cuban Kitchen • Miami, FL
            </span>
          </div>

          {/* Titular Monumental en Caja Alta Centrado (text-[10vw] leading-[0.85] font-display uppercase tracking-tight text-mojoRed) */}
          {/* The Authentic Criollo Flavor of Miami, Marinado to Perfection */}
          <h1 className="font-display text-[8.5vw] sm:text-[9.5vw] lg:text-[10vw] font-bold tracking-tight text-brand-fire uppercase leading-[0.85] text-center">
            The Authentic Criollo Flavor of Miami, <span className="font-accent italic lowercase text-charcoal-ink block sm:inline">Marinado to Perfection</span>.
          </h1>

          {/* Accent Subtitle Editorial */}
          <p className="font-accent italic text-2xl sm:text-3xl lg:text-4xl text-charcoal-ink lowercase tracking-normal">
            juicy, crispy &amp; sazonado al mojo criollo · slow cooked al momento.
          </p>

          <p className="max-w-2xl font-sans text-sm sm:text-base leading-relaxed text-charcoal-ink/75">
            Artisanal bowls marinated 24h in citrus mojo, freshly pressed Cuban sandwiches &amp; family recipes made al momento in Little Havana, Brickell and Doral.
          </p>
        </div>

        {/* Elemento Fotográfico Central y Stickers */}
        <div className="relative mx-auto mt-10 w-full max-w-2xl">
          
          {/* Contenedor Fotográfico con Profundidad 3D y Sombra Volumétrica */}
          <div className="group relative overflow-hidden rounded-3xl border border-charcoal-ink/10 bg-surface-sand shadow-[0_24px_50px_-12px_rgba(20,18,16,0.22)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_32px_64px_-16px_rgba(20,18,16,0.28)]">
            <img
              src="/assets/mojo-bowl-ropa-vieja.jpg"
              alt="Signature Mojo Grille dish: Artisanal Cuban bowl marinated in citrus mojo"
              width={1024}
              height={768}
              loading="eager"
              className="aspect-16/10 w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

            {/* Tag de Precio Flotante estilo CRAV */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-xl bg-charcoal-ink/90 px-3.5 py-1.5 backdrop-blur-md border border-cream-bg/20 text-cream-bg shadow-lg">
              <span className="font-sans text-base font-black text-mojo-citrus tracking-tight">
                $15.50
              </span>
              <span className="h-3 w-px bg-cream-bg/20" />
              <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-cream-bg">
                Al Momento
              </span>
            </div>

            {/* Sello Circular Giratorio CRAV Style */}
            <div className="animate-spin [animation-duration:18s] absolute -bottom-3 -right-3 z-20 hidden sm:flex h-20 w-20 items-center justify-center rounded-full bg-brand-fire text-cream-bg p-2 text-center shadow-xl border-2 border-cream-bg select-none">
              <div className="font-sans text-[8px] font-black uppercase tracking-widest leading-tight">
                ★ AUTÉNTICO ★ SABOR MIAMI
              </div>
            </div>
          </div>

          {/* Badge Izquierdo: Social Proof Rating */}
          <motion.div
            role="status"
            aria-label="Average customer rating in Miami"
            whileHover={{ scale: 1.06, rotate: 0 }}
            className="absolute -top-4 -left-4 sm:-top-5 sm:-left-6 z-20 -rotate-3 transition-transform duration-300 animate-float rounded-2xl border border-charcoal-ink/10 bg-surface-sand px-4 py-2.5 shadow-md select-none cursor-pointer"
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

          {/* Badge Derecho: Frescura 100% Hecho Al Momento */}
          <motion.div
            whileHover={{ scale: 1.06, rotate: 0 }}
            className="absolute -bottom-4 -left-3 sm:-bottom-5 sm:-left-4 z-20 rotate-2 transition-transform duration-300 animate-float-reverse rounded-2xl bg-leaf-green px-4 py-2.5 text-cream-bg shadow-md shadow-leaf-green/20 select-none cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg" aria-hidden="true">🌿</span>
              <div className="text-left">
                <p className="font-sans text-xs font-black text-cream-bg leading-tight uppercase tracking-wide">
                  100% Fresh Daily
                </p>
                <p className="font-sans text-[10px] text-cream-bg/85">
                  Hecho Al Momento
                </p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Botón de Llamada a la Acción Primario con Efecto Magnético (GSAP) */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <MagneticButton
            href="#menu"
            className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-brand-fire px-9 py-4.5 font-sans text-base sm:text-lg font-bold text-cream-bg shadow-[0_16px_32px_-8px_rgba(229,37,22,0.42)] transition-all duration-300 hover:bg-brand-fire/90 hover:shadow-[0_20px_38px_-6px_rgba(199,31,18,0.52)] cursor-pointer"
          >
            <UtensilsCrossed className="h-5 w-5 transition-transform group-hover:rotate-12" aria-hidden="true" />
            <span>See Menu &amp; Order Now</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 font-bold">
              →
            </span>
          </MagneticButton>

          <a
            href="#catering"
            className="inline-flex items-center justify-center gap-2.5 rounded-full border border-charcoal-ink/20 bg-surface-sand px-7 py-4.5 font-sans text-base font-semibold text-charcoal-ink shadow-sm transition-all duration-200 hover:bg-surface-sand/80 hover:border-brand-fire/40"
          >
            <CalendarHeart className="h-5 w-5 text-leaf-green" aria-hidden="true" />
            <span>Catering &amp; Events</span>
          </a>
        </div>

        {/* Microcopia de Confianza y Rapidez */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-charcoal-ink/70">
          <Sparkles className="h-3.5 w-3.5 text-leaf-green" aria-hidden="true" />
          <span>Fresh ingredients • 15 min pickup • Fast delivery caliente al momento</span>
        </div>

      </div>

      {/* Marquesina Tipográfica Cinética Integrada (2 Contenedores Flexibles Continuos) */}
      <div className="mt-12 overflow-hidden border-y border-charcoal-ink/10 bg-brand-fire py-3 text-cream-bg shadow-xs">
        <div className="flex overflow-x-hidden whitespace-nowrap">
          <div className="flex w-max will-change-transform animate-marquee font-display text-base sm:text-lg md:text-xl font-bold uppercase tracking-wider">
            {/* Contenedor 1 */}
            <div className="flex shrink-0 items-center gap-6 pr-6 whitespace-nowrap">
              {[...TICKER_ITEMS, ...TICKER_ITEMS].map((phrase, idx) => (
                <span key={`hero-nxt-t1-${idx}`} className="inline-flex items-center gap-6">
                  <span>{phrase}</span>
                  <span className="text-mojo-citrus font-serif text-base select-none" aria-hidden="true">✦</span>
                </span>
              ))}
            </div>

            {/* Contenedor 2 */}
            <div className="flex shrink-0 items-center gap-6 pr-6 whitespace-nowrap" aria-hidden="true">
              {[...TICKER_ITEMS, ...TICKER_ITEMS].map((phrase, idx) => (
                <span key={`hero-nxt-t2-${idx}`} className="inline-flex items-center gap-6">
                  <span>{phrase}</span>
                  <span className="text-mojo-citrus font-serif text-base select-none" aria-hidden="true">✦</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

export default HeroSection;
