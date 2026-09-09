import React, { useEffect, useState } from "react";
import { UtensilsCrossed, CalendarHeart, Star } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { HoverHighlightText } from "@/components/ui/hover-highlight-text";
import { useReducedMotion } from "@/lib/useReducedMotion";

export interface HeroSectionProps {
  onOrderClick?: () => void;
  menuAnchorId?: string;
  cateringHref?: string;
  /**
   * Triggers the cinematic entrance animation for Hero headline and CTAs.
   */
  shouldAnimateIn?: boolean;
}

export function HeroSection({
  onOrderClick,
  menuAnchorId = "menu",
  cateringHref = "#catering",
  shouldAnimateIn = true,
}: HeroSectionProps) {
  const [animReady, setAnimReady] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Si shouldAnimateIn es false (esperando preloader), no mostramos animación aún
    if (!shouldAnimateIn) {
      return undefined;
    }
    // Sin movimiento vestibular no hay por qué escalonar la entrada.
    if (reducedMotion) {
      setAnimReady(true);
      return undefined;
    }
    const timer = setTimeout(() => setAnimReady(true), 150);
    return () => clearTimeout(timer);
  }, [shouldAnimateIn, reducedMotion]);

  const handleScrollToMenu = (e: React.MouseEvent<HTMLElement>) => {
    const target = document.getElementById(menuAnchorId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    onOrderClick?.();
  };

  // Clases dinámicas de entrada. Con prefers-reduced-motion se sustituye el
  // desplazamiento por un fundido corto (nunca traslación ni escalonado).
  const animContainerClass = reducedMotion
    ? animReady
      ? "opacity-100 transition-opacity duration-200 ease-out"
      : "opacity-0"
    : animReady
      ? "opacity-100 translate-y-0 transition-all duration-700 ease-out"
      : "opacity-0 translate-y-6";

  const animItemClass = reducedMotion
    ? animReady
      ? "opacity-100 transition-opacity duration-200 ease-out"
      : "opacity-0"
    : animReady
      ? "opacity-100 translate-y-0 transition-all duration-500 delay-200 ease-out"
      : "opacity-0 translate-y-4";

  return (
    <section
      id="top"
      aria-label="Welcome to Mojo Grille Cuban Kitchen"
      className="relative overflow-hidden bg-transparent border-b border-charcoal-ink/10 select-none"
    >
      {/* Descriptor editorial para lectores de pantalla y buscadores */}
      <p className="sr-only">
        The Authentic Criollo Flavor of Miami, Marinado to Perfection.
      </p>

      {/*
        Fondo fotográfico atenuado. Es decoración, no contenido: el mensaje ya
        está en el titular, así que va oculto a lectores de pantalla.
        La foto queda al 20% bajo un velo crema en degradado; en el peor caso
        (un píxel negro justo detrás) el titular conserva 5.7:1, por encima del
        4.5:1 que pide AA. El degradado cierra en crema opaco para fundir con la
        sección siguiente sin dejar un corte duro.
      */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <img
          src="/assets/mojo-bowl-ropa-vieja.jpg"
          alt=""
          aria-hidden="true"
          decoding="async"
          fetchPriority="high"
          className="h-full w-full object-cover object-center opacity-20"
        />
        {/* Velo crema en degradado: calma el centro donde vive el texto y cierra
            en crema opaco para fundir con la sección siguiente sin corte duro. */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream-bg/50 via-cream-bg/45 to-cream-bg" />
      </div>

      {/* Bloque Principal Hero */}
      <div className={`relative z-10 pt-12 pb-16 md:pt-20 md:pb-24 ${animContainerClass}`}>
        <div className="relative mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-8">
          
          {/* Encabezado Monumental Centrado */}
          <div className="flex flex-col items-center text-center space-y-6 max-w-7xl mx-auto">
            {/*
              Prueba social. Estaba escrita pero oculta en un sr-only: la señal
              de confianza más fuerte del sitio no la veía nadie. Ahora abre el
              hero y de paso orienta antes del titular, que es sensorial y no
              dice qué es el local.
            */}
            <div
              role="status"
              aria-label="Average customer rating in Miami"
              className={`inline-flex items-center gap-2.5 border border-charcoal-ink/15 bg-surface-sand px-4 py-2 ${animItemClass}`}
            >
              <Star
                className="h-4 w-4 shrink-0 fill-mojo-citrus text-mojo-citrus"
                aria-hidden="true"
              />
              <span className="font-sans text-[11px] sm:text-xs font-bold uppercase tracking-[0.08em] sm:tracking-[0.14em] text-charcoal-ink">
                4.7 Stars across +3,000 orders in Miami
              </span>
            </div>

            {/* Titular Central con Efecto Spotlight HoverHighlightText */}
            <div className={`w-full max-w-7xl mx-auto flex justify-center ${animItemClass}`}>
              <HoverHighlightText
                as="h1"
                text="HOT CAST IRON CRUSHED GARLIC SLOW ROASTED PERNIL"
                baseClassName="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[clamp(4rem,9.2vw,9.5rem)] font-black uppercase tracking-tight text-charcoal-ink/70 leading-[0.84] text-center"
                highlightClassName="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[clamp(4rem,9.2vw,9.5rem)] font-black uppercase tracking-tight text-brand-fire leading-[0.84] text-center"
                strokeColor="#E52516"
                strokeWidth={1.5}
                spotlightRadius={220}
                spotlightSoftness={0.84}
                enableGlow
              />
            </div>

            {/* Subtítulo Narrativo Visceral Editorial Amplio */}
            <p className={`max-w-4xl text-balance font-sans text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-charcoal-ink/90 text-center font-normal ${animItemClass}`}>
              No corporate bowls. We cook generational family recipes of slow-roasted pork marinated for 4 hours in Seville sour orange, pressed{" "}
              <span className="font-bold text-brand-fire">al momento</span> in the heart of Brownsville.
            </p>

            {/* Botones de Llamada a la Acción: ORDER HOT y Catering & Events */}
            <div className={`pt-6 sm:pt-8 flex flex-col items-center justify-center gap-4 sm:flex-row ${animItemClass}`}>
              <MagneticButton
                href={`#${menuAnchorId}`}
                onClick={handleScrollToMenu}
                className="group relative inline-flex items-center justify-center gap-3 rounded-none bg-brand-fire px-9 py-4 font-sans text-sm sm:text-base font-bold uppercase tracking-wider text-cream-bg hover:bg-charcoal-ink transition-colors cursor-pointer select-none"
              >
                <UtensilsCrossed className="h-4 w-4 transition-transform group-hover:rotate-12" aria-hidden="true" />
                <span>ORDER HOT</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 font-bold" aria-hidden="true">
                  →
                </span>
              </MagneticButton>

              <a
                href={cateringHref}
                className="inline-flex items-center justify-center gap-2.5 rounded-none bg-surface-sand px-7 py-4 font-sans text-sm sm:text-base font-bold uppercase tracking-wider text-charcoal-ink hover:bg-charcoal-ink hover:text-cream-bg transition-colors select-none"
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
