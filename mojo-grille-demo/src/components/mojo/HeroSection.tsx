import React, { useEffect, useRef, useState } from "react";
import { UtensilsCrossed, CalendarHeart, Star, ArrowRight } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { HoverHighlightText } from "@/components/ui/hover-highlight-text";
import { HeroVideoBackground } from "./HeroVideoBackground";
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
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
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
      ref={sectionRef}
      id="top"
      aria-label="Welcome to Mojo Grille Cuban Kitchen"
      className="relative z-10 w-full h-full min-h-dvh flex flex-col justify-center bg-transparent select-none"
    >
      {/* Descriptor editorial para lectores de pantalla y buscadores */}
      <p className="sr-only">
        The Authentic Criollo Flavor of Miami, Marinado to Perfection.
      </p>

      {/*
        Fondo de vídeo estático: se mantiene fijo dentro del contenedor del hero.
      */}
      <HeroVideoBackground
        videoSrc="/assets/hero-kitchen-loop.mp4"
        posterSrc="/assets/mojo-bowl-ropa-vieja.jpg"
        opacity={0.45}
      />

      {/* Bloque Principal Hero */}
      <div
        ref={contentRef}
        className={`relative z-10 pt-20 sm:pt-24 md:pt-28 pb-12 md:pb-20 ${animContainerClass}`}
      >
        <div className="relative mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-8">
          
          {/* Encabezado Monumental Centrado */}
          <div className="flex flex-col items-center text-center space-y-6 max-w-7xl mx-auto">
            {/*
              Prueba social sin cápsula. Estaba metida en un rectángulo
              translúcido con borde y desenfoque; la estrella y el texto se
              apoyan solos sobre el fondo y se leen igual.

              Deliberadamente sin región viva: es contenido fijo, y marcarlo
              como tal hacía que se anunciara solo al cargar, pisando la
              lectura del titular. El texto ya se lee como contenido normal.
            */}
            <div
              className={`inline-flex items-center gap-2.5 ${animItemClass}`}
            >
              <Star
                className="h-4 w-4 shrink-0 fill-mojo-citrus text-mojo-citrus"
                aria-hidden="true"
              />
              <span className="font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.08em] sm:tracking-[0.14em] text-charcoal-ink">
                4.7 Stars across +3,000 orders in Miami
              </span>
            </div>

            {/* Titular Central con Efecto Spotlight HoverHighlightText */}
            {/* overflow-x-clip contiene el resplandor del titular, que se
                extiende -1.5rem a cada lado y a 375px se salía del viewport
                generando scroll horizontal. */}
            <div className={`w-full max-w-7xl mx-auto flex justify-center overflow-x-clip ${animItemClass}`}>
              <HoverHighlightText
                as="h1"
                text="HOT CAST IRON CRUSHED GARLIC SLOW ROASTED PERNIL"
                baseClassName="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[clamp(4rem,9.2vw,9.5rem)] font-black uppercase tracking-tight text-charcoal-ink leading-[0.84] text-center"
                highlightClassName="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[clamp(4rem,9.2vw,9.5rem)] font-black uppercase tracking-tight text-brand-fire leading-[0.84] text-center"
                strokeColor="#C41B0E"
                strokeWidth={1.5}
                spotlightRadius={220}
                spotlightSoftness={0.84}
                enableGlow
              />
            </div>

            {/* Subtítulo Narrativo Visceral Editorial Amplio */}
            {/*
              24 horas, no 4: es la cifra que repiten la meta description, la
              rejilla de menú y el footer. Antes el hero se contradecía con el
              resto del sitio.
            */}
            <p className={`max-w-4xl text-balance font-sans text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-charcoal-ink text-center font-normal ${animItemClass}`}>
              No corporate bowls. We cook generational family recipes of slow-roasted pork marinated for 24 hours in Seville sour orange, pressed{" "}
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
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
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
