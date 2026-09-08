import React, { useEffect, useRef, useState } from "react";
import { UtensilsCrossed, CalendarHeart, Sparkles, Citrus } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import defaultHeroImage from "@/assets/mojo-bowl-ropa-vieja.jpg";
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

  // Referencias para la animación Parallax Scrolling estilo Osmo Supply
  const containerRef = useRef<HTMLElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const floatingBackRef = useRef<HTMLDivElement>(null);
  const titleLayerRef = useRef<HTMLDivElement>(null);
  const cardLayerRef = useRef<HTMLDivElement>(null);
  const foregroundAccentRef = useRef<HTMLDivElement>(null);
  const ctaLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shouldAnimateIn) {
      return undefined;
    }
    const timer = setTimeout(() => setAnimReady(true), 120);
    return () => clearTimeout(timer);
  }, [shouldAnimateIn]);

  // Inicialización de la animación Parallax Multicapa estilo Osmo Supply
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // 1. Pantallas Desktop y Laptops (min-width: 768px): Profundidad 3D cinemática
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });

        // Capa 1: Fondo atmosférico y textura de calor criollo (drift suave)
        if (bgLayerRef.current) {
          tl.to(
            bgLayerRef.current,
            {
              yPercent: 18,
              scale: 1.04,
              ease: "none",
            },
            0
          );
        }

        // Capa 2: Elementos botánicos y aromáticos de fondo (Seville orange, bay leaf)
        if (floatingBackRef.current) {
          tl.to(
            floatingBackRef.current,
            {
              yPercent: -28,
              rotate: -6,
              ease: "none",
            },
            0
          );
        }

        // Capa 3: Tipografía Monumental Intermedia (Se desliza hacia arriba oculta tras el plato)
        if (titleLayerRef.current) {
          tl.to(
            titleLayerRef.current,
            {
              yPercent: -48,
              opacity: 0.82,
              ease: "none",
            },
            0
          );
        }

        // Capa 4: Tarjeta Editorial y Plato Estrella en Primer Plano
        if (cardLayerRef.current) {
          tl.to(
            cardLayerRef.current,
            {
              yPercent: -12,
              scale: 1.025,
              ease: "none",
            },
            0
          );
        }

        // Capa 5: Destellos e Ingredientes flotantes de primer plano
        if (foregroundAccentRef.current) {
          tl.to(
            foregroundAccentRef.current,
            {
              yPercent: -68,
              rotate: 10,
              ease: "none",
            },
            0
          );
        }

        // Capa 6: Botones CTAs interactivos
        if (ctaLayerRef.current) {
          tl.to(
            ctaLayerRef.current,
            {
              yPercent: -6,
              ease: "none",
            },
            0
          );
        }
      });

      // 2. Pantallas Móviles (max-width: 767px): Parallax adaptativo sin solapamientos forzados
      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.9,
            invalidateOnRefresh: true,
          },
        });

        if (titleLayerRef.current) {
          tl.to(titleLayerRef.current, { yPercent: -22, ease: "none" }, 0);
        }
        if (cardLayerRef.current) {
          tl.to(cardLayerRef.current, { yPercent: -8, ease: "none" }, 0);
        }
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

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
      ref={containerRef}
      id="top"
      data-parallax-layers
      aria-label="Welcome to Mojo Grille Cuban Kitchen"
      className="parallax relative overflow-hidden bg-transparent border-b border-charcoal-ink/10 select-none min-h-[95vh] flex flex-col justify-between"
    >
      {/* CAPA 1: FONDO ATMOSFÉRICO & RESPLANDOR CRIOLLO (data-parallax-layer="1") */}
      <div
        ref={bgLayerRef}
        data-parallax-layer="1"
        className="pointer-events-none absolute inset-0 z-0 will-change-transform opacity-60"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[550px] sm:h-[750px] sm:w-[750px] rounded-full bg-radial from-brand-fire/[0.08] via-mojo-citrus/[0.04] to-transparent blur-3xl pointer-events-none" />
        <div className="absolute top-12 left-10 text-[10vw] font-display font-black text-charcoal-ink/[0.02] tracking-tighter uppercase select-none pointer-events-none">
          MIAMI CUBAN KITCHEN
        </div>
        <div className="absolute bottom-16 right-6 text-[12vw] font-display font-black text-charcoal-ink/[0.02] tracking-tighter uppercase select-none pointer-events-none">
          AL MOMENTO
        </div>
      </div>

      {/* CAPA 2: ELEMENTOS BOTÁNICOS & AROMÁTICOS EN PROFUNDIDAD (data-parallax-layer="2") */}
      <div
        ref={floatingBackRef}
        data-parallax-layer="2"
        className="pointer-events-none absolute inset-0 z-5 overflow-hidden will-change-transform"
        aria-hidden="true"
      >
        {/* Rodaja sutil de naranja agria en el cuadrante superior izquierdo */}
        <div className="absolute top-20 left-[5%] sm:left-[8%] lg:left-[12%] flex items-center gap-2 opacity-30 text-mojo-citrus blur-[0.4px]">
          <Citrus className="h-10 w-10 sm:h-14 sm:w-14 stroke-[1.2]" />
          <span className="font-sans text-[9px] font-bold uppercase tracking-widest text-charcoal-ink/40 hidden md:inline-block">
            Naranja Agria de Sevilla
          </span>
        </div>

        {/* Destellos dorados y especias en el cuadrante superior derecho */}
        <div className="absolute top-28 right-[6%] sm:right-[10%] lg:right-[14%] flex items-center gap-2 opacity-30 text-brand-fire blur-[0.3px]">
          <Sparkles className="h-8 w-8 sm:h-12 sm:w-12 stroke-[1.2]" />
          <span className="font-sans text-[9px] font-bold uppercase tracking-widest text-charcoal-ink/40 hidden md:inline-block">
            Mojo Criollo Infusion
          </span>
        </div>
      </div>

      {/* BLOQUE PRINCIPAL HERO CON LAS CAPAS CENTRALES */}
      <div className={`relative z-10 pt-8 pb-14 md:pt-14 md:pb-20 ${animContainerClass}`}>
        <div className="relative mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-8">
          
          {/* CAPA 3: TIPOGRAFÍA MONUMENTAL INTERMEDIA (data-parallax-layer="3") */}
          <div
            ref={titleLayerRef}
            data-parallax-layer="3"
            className={`parallax__layer-title relative z-10 flex flex-col items-center text-center space-y-3 max-w-5xl mx-auto will-change-transform ${animItemClass}`}
          >
            {/* Título de accesibilidad para Screen Readers y SEO Schema */}
            <span className="sr-only">The Authentic Criollo Flavor of Miami, Marinado to Perfection</span>

            {/* Titular Central con Efecto Spotlight HoverHighlightText */}
            <div className="w-full max-w-5xl mx-auto flex justify-center">
              <HoverHighlightText
                as="h1"
                text="HOT CAST IRON. CRUSHED GARLIC. SLOW-ROASTED PERNIL."
                baseClassName="font-display text-5xl sm:text-7xl lg:text-[7.4vw] font-black uppercase tracking-tight text-charcoal-ink/35 leading-[0.87] text-center"
                highlightClassName="font-display text-5xl sm:text-7xl lg:text-[7.4vw] font-black uppercase tracking-tight text-brand-fire leading-[0.87] text-center"
                strokeColor="#E52516"
                strokeWidth={1.5}
                spotlightRadius={180}
                spotlightSoftness={0.82}
                enableGlow
              />
            </div>

            {/* Subtítulo Narrativo Visceral */}
            <p className="mt-2 max-w-3xl font-sans text-sm sm:text-base md:text-lg leading-relaxed text-charcoal-ink/90 text-center">
              No corporate bowls. We cook generational family recipes of slow-roasted pork marinated for 4 hours in Seville sour orange, pressed{" "}
              <span className="font-bold text-brand-fire">al momento</span> in the heart of Brownsville.
            </p>
          </div>

          {/* CAPA 4: ELEMENTO FOTOGRÁFICO CENTRAL & PLACAS EDITORIALES (data-parallax-layer="4") */}
          <div
            ref={cardLayerRef}
            data-parallax-layer="4"
            className={`relative z-20 mx-auto mt-6 md:mt-8 w-full max-w-4xl will-change-transform ${animCardClass}`}
          >
            {/* Contenedor Fotográfico con Marco Rígido Editorial */}
            <div className="group relative overflow-hidden rounded-none bg-surface-sand border border-charcoal-ink/15 shadow-[0_16px_48px_-12px_rgba(20,18,16,0.14)]">
              <img
                src={imageUrl}
                alt="Signature Mojo Grille dish: The Authentic Criollo Flavor of Miami, Marinado to Perfection - Artisanal Cuban bowl marinated in citrus mojo"
                width={1024}
                height={768}
                loading="eager"
                className="aspect-16/10 w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-60" />

              {/* Botón rápido sobre el plato: GRAB THIS BOWL */}
              <button
                type="button"
                onClick={onOrderClick}
                className="absolute bottom-4 left-4 z-20 inline-flex items-center gap-2 rounded-none bg-charcoal-ink text-cream-bg px-4 py-2 font-sans text-[11px] font-bold uppercase tracking-[0.18em] border border-cream-bg/20 hover:bg-brand-fire transition-colors cursor-pointer select-none shadow-md"
              >
                <span>GRAB THIS BOWL</span>
                <span>→</span>
              </button>

              {/* Tag de Precio en formato ticket */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-none bg-charcoal-ink px-3.5 py-1.5 border border-cream-bg/20 text-cream-bg shadow-sm">
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

            {/* Badge Superior Derecho: Social Proof Rating (WCAG & Test Invariant) */}
            <div
              role="status"
              aria-label="Average customer rating in Miami"
              className="absolute -top-4 -right-2 sm:-top-5 sm:-right-4 md:-right-6 z-20 rounded-none bg-surface-sand px-4 py-2.5 border border-charcoal-ink/10 shadow-md select-none cursor-pointer hover:bg-surface-sand/90 transition-colors"
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

            {/* Badge Inferior Desplazado: Ficha de Metadato Editorial */}
            <div className="absolute -bottom-4 right-4 sm:-bottom-5 sm:right-32 md:sm:right-36 z-20 rounded-none bg-leaf-green px-4 py-2.5 text-cream-bg shadow-md select-none cursor-pointer">
              <div className="flex items-center gap-2">
                <div className="text-left">
                  <p className="font-sans text-xs font-black text-cream-bg leading-tight uppercase tracking-wide">
                    EST. MIAMI 100% ARTISANAL MOJO
                  </p>
                  <p className="font-sans text-[10px] text-cream-bg/85">
                    Made Fresh Al Momento
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CAPA 5: INGREDIENTES EN PRIMER PLANO CON PARALLAX RÁPIDO (data-parallax-layer="5") */}
          <div
            ref={foregroundAccentRef}
            data-parallax-layer="5"
            className="pointer-events-none absolute inset-x-0 bottom-12 z-25 flex justify-between px-6 sm:px-12 will-change-transform"
            aria-hidden="true"
          >
            {/* Tostón dorado flotante izquierdo */}
            <div className="hidden lg:flex items-center gap-2 bg-cream-bg/90 border border-charcoal-ink/10 px-3 py-1.5 shadow-sm text-charcoal-ink text-[10px] font-sans font-bold uppercase tracking-wider -rotate-6">
              <span className="text-mojo-citrus font-black">★</span>
              <span>Crujiente al momento</span>
            </div>

            {/* Ajo machacado flotante derecho */}
            <div className="hidden lg:flex items-center gap-2 bg-cream-bg/90 border border-charcoal-ink/10 px-3 py-1.5 shadow-sm text-charcoal-ink text-[10px] font-sans font-bold uppercase tracking-wider rotate-3">
              <span className="text-brand-fire font-black">✦</span>
              <span>Ajo criollo machacado</span>
            </div>
          </div>

          {/* CAPA 6: BOTONES DE LLAMADA A LA ACCIÓN PRIMARIOS (ORDER HOT & CATERING) */}
          <div
            ref={ctaLayerRef}
            className={`relative z-30 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row will-change-transform ${animItemClass}`}
          >
            <MagneticButton
              href={`#${menuAnchorId}`}
              onClick={handleScrollToMenu}
              className="group relative inline-flex items-center justify-center gap-3 rounded-none bg-brand-fire px-9 py-4 font-sans text-sm sm:text-base font-bold uppercase tracking-wider text-cream-bg hover:bg-charcoal-ink transition-colors cursor-pointer select-none shadow-lg shadow-brand-fire/15"
            >
              <UtensilsCrossed className="h-4 w-4 transition-transform group-hover:rotate-12" aria-hidden="true" />
              <span>ORDER HOT</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 font-bold">
                →
              </span>
            </MagneticButton>

            <a
              href={cateringHref}
              className="inline-flex items-center justify-center gap-2.5 rounded-none bg-surface-sand border border-charcoal-ink/15 px-7 py-4 font-sans text-sm sm:text-base font-bold uppercase tracking-wider text-charcoal-ink hover:bg-charcoal-ink hover:text-cream-bg transition-colors select-none"
            >
              <CalendarHeart className="h-4 w-4 text-leaf-green" aria-hidden="true" />
              <span>Catering &amp; Events</span>
            </a>
          </div>

        </div>
      </div>

      {/* OSMO PARALLAX FADE: TRANSICIÓN SUAVE INFERIOR HACIA CUBANDECONSTRUCTION */}
      <div
        className="parallax__fade pointer-events-none absolute bottom-0 left-0 right-0 h-28 sm:h-36 bg-gradient-to-t from-cream-bg via-cream-bg/70 to-transparent z-30"
        aria-hidden="true"
      />
    </section>
  );
}

export default HeroSection;
