import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { UtensilsCrossed, CalendarHeart } from "lucide-react";
import defaultHeroImage from "@/assets/mojo-chicken-burger.png";
import { MagneticButton } from "./MagneticButton";
import { InkStamp } from "./InkStamp";
import { HoverHighlightText } from "@/components/ui/hover-highlight-text";

export interface HeroSectionProps {
  onOrderClick?: () => void;
  menuAnchorId?: string;
  cateringHref?: string;
  imageUrl?: string;
  /**
   * Triggers the cinematic entrance animation for Hero headline,
   * floating stickers, CTAs, and central product card.
   */
  shouldAnimateIn?: boolean;
}

export function HeroSection({
  onOrderClick,
  menuAnchorId = "menu",
  cateringHref = "#catering",
  imageUrl = defaultHeroImage,
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

  const animCardClass = animReady
    ? "opacity-100 scale-100 transition-all duration-700 delay-300 ease-out"
    : "opacity-0 scale-95";

  return (
    <section
      id="top"
      aria-label="Welcome to Mojo Grille Cuban Kitchen"
      className="relative overflow-hidden bg-transparent border-b border-charcoal-ink/10 select-none"
    >
      {/* 2. Bloque Principal Hero */}
      <div className={`relative pt-8 pb-16 md:pt-14 md:pb-24 ${animContainerClass}`}>
        <div className="relative mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-8">
          
          {/* Encabezado Monumental Centrado (Ocupa más espacio visual) */}
          <div className="flex flex-col items-center text-center space-y-4 max-w-7xl mx-auto">
            {/* Titular Central con Efecto Spotlight HoverHighlightText */}
            <div className={`w-full max-w-7xl mx-auto flex justify-center ${animItemClass}`}>
              <HoverHighlightText
                as="h1"
                text="HOT CAST IRON. CRUSHED GARLIC. SLOW-ROASTED PERNIL."
                baseClassName="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[9.2vw] font-black uppercase tracking-tight text-charcoal-ink/35 leading-[0.84] text-center"
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
          </div>

          {/* Objeto Flotante Central: Crispy Mojo Chicken Burger */}
          <div className={`relative mx-auto mt-8 sm:mt-12 w-full max-w-4xl flex flex-col items-center justify-center ${animCardClass}`}>
            
            {/* Badge Superior: Social Proof Rating (En móvil centrado arriba sin colisiones, en desktop anclado a la esquina) */}
            <div
              role="status"
              aria-label="Average customer rating in Miami"
              className="z-30 mb-4 sm:mb-0 sm:absolute sm:-top-7 sm:right-2 md:right-8 rounded-none bg-surface-sand px-3.5 py-2 sm:px-4 sm:py-2.5 select-none cursor-pointer hover:bg-surface-sand/90 transition-colors inline-flex items-center shadow-md border border-charcoal-ink/10"
            >
              <div className="flex items-center gap-2">
                <div className="text-left">
                  <p className="font-sans text-xs font-black text-charcoal-ink leading-tight">
                    4.7 Stars across +3,000 orders in Miami
                  </p>
                  <p className="font-sans text-[10px] text-charcoal-ink/70">
                    UberEats &amp; Google Miami (4.7 across 3K+ Reviews)
                  </p>
                </div>
              </div>
            </div>

            {/* Contenedor Flotante del Sándwich */}
            <div className="relative w-full max-w-xl flex flex-col items-center justify-center pt-2 sm:pt-4">
              
              {/* Sándwich con Animación de Flotación Continua (Framer Motion + fallback CSS) */}
              <motion.div
                animate={{
                  y: [-12, 12, -12],
                  rotate: [-1.5, 1.5, -1.5],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="animate-sandwich-float relative z-10 flex items-center justify-center w-full"
              >
                <img
                  src={imageUrl}
                  alt="Signature Mojo Grille dish: The Authentic Criollo Flavor of Miami, Marinado to Perfection - Artisanal Crispy Mojo Chicken Sandwich al momento"
                  width={760}
                  height={570}
                  loading="eager"
                  className="w-full max-w-[320px] sm:max-w-[440px] md:max-w-[520px] h-auto object-contain drop-shadow-2xl select-none pointer-events-none"
                />

                {/* Badge o Etiqueta Flotante Interactiva de Plato: CRISPY MOJO CHICKEN */}
                <div className="pointer-events-auto absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-6 md:-left-8 z-30 flex items-center gap-3 rounded-none bg-charcoal-ink text-cream-bg px-3 py-2 sm:px-4 sm:py-2.5 border border-cream-bg/20 shadow-xl select-none">
                  <div className="text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="font-display text-xs sm:text-sm font-bold tracking-tight text-cream-bg uppercase">
                        CRISPY MOJO CHICKEN
                      </span>
                      <span className="rounded-none bg-brand-fire px-1.5 py-0.5 font-sans text-[9px] font-black text-cream-bg uppercase tracking-wider">
                        NEW
                      </span>
                    </div>
                    <p className="font-sans text-[11px] sm:text-xs font-bold text-mojo-citrus">
                      $13.95 <span className="text-cream-bg/70 font-normal">· AL MOMENTO</span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onOrderClick}
                    className="ml-1 inline-flex items-center gap-1 rounded-none bg-brand-fire text-cream-bg px-2.5 py-1.5 sm:px-3 sm:py-1.5 font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-wider hover:bg-cream-bg hover:text-charcoal-ink transition-colors cursor-pointer"
                  >
                    <span>AÑADIR</span>
                    <span aria-hidden="true">→</span>
                  </button>
                </div>

                {/* Sello de Tinta Real Artesanal */}
                <div className="absolute -bottom-6 -right-4 sm:-right-8 z-20 hidden sm:flex pointer-events-none">
                  <InkStamp size={115} className="bg-cream-bg/95 p-1" />
                </div>
              </motion.div>

              {/* Sombra de Contacto Difuminada en la Base con Animación Sincronizada */}
              <motion.div
                aria-hidden="true"
                animate={{
                  scale: [0.94, 1.06, 0.94],
                  opacity: [0.18, 0.32, 0.18],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="animate-sandwich-shadow h-6 sm:h-9 w-48 sm:w-72 rounded-[100%] bg-charcoal-ink/20 blur-xl -mt-3 sm:-mt-5 pointer-events-none"
              />

              {/* Badge Desplazado: Ficha de Metadato Editorial */}
              <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 -left-12 lg:-left-16 z-20 rounded-none bg-leaf-green px-3.5 py-2 text-cream-bg select-none shadow-md">
                <div className="text-left">
                  <p className="font-sans text-[11px] font-black text-cream-bg leading-tight uppercase tracking-wide">
                    EST. MIAMI 100% ARTISANAL MOJO
                  </p>
                  <p className="font-sans text-[9px] text-cream-bg/85">
                    Made Fresh Al Momento
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Botón de Llamada a la Acción Primario: ORDER HOT */}
          <div className={`mt-10 sm:mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row ${animItemClass}`}>
            <MagneticButton
              href={`#${menuAnchorId}`}
              onClick={handleScrollToMenu}
              className="group relative inline-flex items-center justify-center gap-3 rounded-none bg-brand-fire px-9 py-4 font-sans text-sm sm:text-base font-bold uppercase tracking-wider text-cream-bg hover:bg-charcoal-ink transition-colors cursor-pointer select-none shadow-lg"
            >
              <UtensilsCrossed className="h-4 w-4 transition-transform group-hover:rotate-12" aria-hidden="true" />
              <span>ORDER HOT</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 font-bold" aria-hidden="true">
                →
              </span>
            </MagneticButton>

            <a
              href={cateringHref}
              className="inline-flex items-center justify-center gap-2.5 rounded-none bg-surface-sand px-7 py-4 font-sans text-sm sm:text-base font-bold uppercase tracking-wider text-charcoal-ink hover:bg-charcoal-ink hover:text-cream-bg transition-colors select-none shadow-sm"
            >
              <CalendarHeart className="h-4 w-4 text-leaf-green" aria-hidden="true" />
              <span>Catering &amp; Events</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
