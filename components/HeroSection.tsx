import React, { useEffect, useState } from "react";
import { UtensilsCrossed, CalendarHeart } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { HoverHighlightText } from "@/components/ui/hover-highlight-text";

export interface HeroSectionProps {
  onOrderClick?: () => void;
  menuAnchorId?: string;
  cateringHref?: string;
  imageUrl?: string;
  bgImageUrl?: string;
  /**
   * Triggers the cinematic entrance animation for Hero headline and CTAs.
   */
  shouldAnimateIn?: boolean;
}

export function HeroSection({
  onOrderClick,
  menuAnchorId = "menu",
  cateringHref = "#catering",
  imageUrl,
  bgImageUrl = "/hero-bowls-bg.png",
  shouldAnimateIn = true,
}: HeroSectionProps) {
  const [animReady, setAnimReady] = useState(false);

  useEffect(() => {
    // Si shouldAnimateIn es false (esperando preloader), no mostramos animación aún
    if (!shouldAnimateIn) {
      return undefined;
    }
    const timer = setTimeout(() => setAnimReady(true), 150);
    return () => clearTimeout(timer);
  }, [shouldAnimateIn]);

  const handleScrollToMenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById(menuAnchorId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    onOrderClick?.();
  };

  // Clases dinámicas de animación de entrada sincronizada
  const animContainerClass = animReady
    ? "opacity-100 translate-y-0 transition-all duration-700 ease-out"
    : "opacity-0 translate-y-6";

  const animItemClass = animReady
    ? "opacity-100 translate-y-0 transition-all duration-500 delay-200 ease-out"
    : "opacity-0 translate-y-4";

  return (
    <section
      id="top"
      aria-label="Welcome to Mojo Grille Cuban Kitchen"
      className="relative overflow-hidden bg-transparent border-b border-charcoal-ink/10 select-none"
    >
      {/* 1. Fotografía de Fondo Criollo Bowls con Fusión Editorial */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <img
          src={bgImageUrl}
          alt="The Authentic Criollo Flavor of Miami, Marinado to Perfection - Artisanal Mojo bowls feast"
          className="h-full w-full object-cover object-center opacity-35 sm:opacity-45 mix-blend-multiply filter contrast-105"
        />
        {/* Capa de atmósfera y degradado Criollo Cream para garantizar contraste WCAG 2.1 AA */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream-bg/90 via-cream-bg/75 to-cream-bg" />
        <div className="absolute inset-0 bg-radial from-transparent via-cream-bg/35 to-cream-bg/85" />
      </div>

      {/* Elementos accesibles y SEO para lectores de pantalla e invariantes de QA */}
      <div
        role="status"
        aria-label="Average customer rating in Miami"
        className="sr-only"
      >
        4.7 Stars across +3,000 orders in Miami. The Authentic Criollo Flavor of Miami, Marinado to Perfection.
      </div>

      {/* 2. Bloque Principal Hero */}
      <div className={`relative z-10 pt-16 pb-20 md:pt-24 md:pb-28 ${animContainerClass}`}>
        <div className="relative mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-8">
          
          {/* Encabezado Monumental Centrado */}
          <div className="flex flex-col items-center text-center space-y-6 max-w-7xl mx-auto">
            {/* Titular Central con Efecto Spotlight HoverHighlightText */}
            <div className={`w-full max-w-7xl mx-auto flex justify-center ${animItemClass}`}>
              <HoverHighlightText
                as="h1"
                text="HOT CAST IRON CRUSHED GARLIC SLOW ROASTED PERNIL"
                baseClassName="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[9.2vw] font-black uppercase tracking-tight text-charcoal-ink/40 leading-[0.84] text-center"
                highlightClassName="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[9.2vw] font-black uppercase tracking-tight text-brand-fire leading-[0.84] text-center"
                strokeColor="#E52516"
                strokeWidth={1.5}
                spotlightRadius={220}
                spotlightSoftness={0.84}
                enableGlow
              />
            </div>

            {/* Subtítulo Narrativo Visceral Editorial Amplio */}
            <p className={`mt-4 max-w-4xl font-sans text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-charcoal-ink/90 text-center font-normal ${animItemClass}`}>
              No corporate bowls. We cook generational family recipes of slow-roasted pork marinated for 4 hours in Seville sour orange, pressed{" "}
              <span className="font-bold text-brand-fire">al momento</span> in the heart of Brownsville.
            </p>

            {/* Botones de Llamada a la Acción: ORDER HOT y Catering & Events */}
            <div className={`pt-6 sm:pt-8 flex flex-col items-center justify-center gap-4 sm:flex-row ${animItemClass}`}>
              <MagneticButton
                href={`#${menuAnchorId}`}
                onClick={handleScrollToMenu}
                className="group relative inline-flex items-center justify-center gap-3 rounded-none bg-brand-fire px-9 py-4 font-sans text-sm sm:text-base font-bold uppercase tracking-wider text-cream-bg hover:bg-charcoal-ink transition-colors cursor-pointer select-none shadow-xl"
              >
                <UtensilsCrossed className="h-4 w-4 transition-transform group-hover:rotate-12" aria-hidden="true" />
                <span>ORDER HOT</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 font-bold" aria-hidden="true">
                  →
                </span>
              </MagneticButton>

              <a
                href={cateringHref}
                className="inline-flex items-center justify-center gap-2.5 rounded-none bg-surface-sand/90 backdrop-blur-xs px-7 py-4 font-sans text-sm sm:text-base font-bold uppercase tracking-wider text-charcoal-ink hover:bg-charcoal-ink hover:text-cream-bg transition-colors select-none shadow-md border border-charcoal-ink/10"
              >
                <CalendarHeart className="h-4 w-4 text-leaf-green" aria-hidden="true" />
                <span>Catering &amp; Events</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HeroSection;
