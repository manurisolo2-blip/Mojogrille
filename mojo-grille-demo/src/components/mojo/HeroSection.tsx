import React, { useEffect, useRef, useState } from "react";
import { UtensilsCrossed, CalendarHeart, Sparkles, Citrus } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  shouldAnimateIn = true,
}: HeroSectionProps) {
  const [animReady, setAnimReady] = useState(false);

  // Referencias para la animación Parallax Scrolling estilo Osmo Supply
  const trackRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const topFoodRef = useRef<HTMLDivElement>(null);
  const titleLayerRef = useRef<HTMLDivElement>(null);
  const bottomFoodRef = useRef<HTMLDivElement>(null);
  const ctaLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shouldAnimateIn) return undefined;
    const timer = setTimeout(() => setAnimReady(true), 120);
    return () => clearTimeout(timer);
  }, [shouldAnimateIn]);

  // Inicialización de la animación de Scroll Pinned Parallax Multicapa (Osmo Supply)
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // 1. Pantallas Desktop y Laptops (min-width: 768px): Animación de deslizamiento cinemático
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: trackRef.current,
            pin: stageRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });

        // Capa 1: Fondo atmosférico con pulso cálido
        if (bgLayerRef.current) {
          tl.to(
            bgLayerRef.current,
            {
              scale: 1.08,
              opacity: 0.9,
              ease: "none",
            },
            0
          );
        }

        // Capa 2: Comida que se queda arriba (Top Bread tostado y aromáticos que enmarcan la cabecera)
        if (topFoodRef.current) {
          tl.to(
            topFoodRef.current,
            {
              yPercent: -14,
              scale: 0.97,
              ease: "none",
            },
            0
          );
        }

        // Capa 3: Tipografía Monumental Intermedia (Asciende con fuerza y se desliza DETRÁS de la comida superior)
        if (titleLayerRef.current) {
          tl.to(
            titleLayerRef.current,
            {
              yPercent: -58,
              opacity: 0.6,
              ease: "none",
            },
            0
          );
        }

        // Capa 4: Comida inferior en primer plano (Lechón asado crujiente, queso suizo fundido y pepinillos)
        if (bottomFoodRef.current) {
          tl.to(
            bottomFoodRef.current,
            {
              yPercent: 32,
              scale: 1.05,
              ease: "none",
            },
            0
          );
        }

        // Capa 5: CTAs y badges sutiles
        if (ctaLayerRef.current) {
          tl.to(
            ctaLayerRef.current,
            {
              yPercent: -8,
              ease: "none",
            },
            0
          );
        }
      });

      // 2. Pantallas Móviles (max-width: 767px): Parallax optimizado para touch screens
      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: trackRef.current,
            pin: stageRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.9,
            invalidateOnRefresh: true,
          },
        });

        if (titleLayerRef.current) {
          tl.to(titleLayerRef.current, { yPercent: -35, ease: "none" }, 0);
        }
        if (topFoodRef.current) {
          tl.to(topFoodRef.current, { yPercent: -10, ease: "none" }, 0);
        }
        if (bottomFoodRef.current) {
          tl.to(bottomFoodRef.current, { yPercent: 18, ease: "none" }, 0);
        }
      });
    }, trackRef);

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

  const animContainerClass = animReady
    ? "opacity-100 transition-opacity duration-700 ease-out"
    : "opacity-0";

  return (
    <section
      ref={trackRef}
      id="top"
      data-parallax-layers
      aria-label="Welcome to Mojo Grille Cuban Kitchen"
      className="parallax relative w-full h-[180vh] md:h-[220vh] bg-cream-bg select-none"
    >
      {/* CONTENEDOR ANCLADO (PINNED STAGE): OCUPA 100vh MIENTRAS SE DESLIZA EL SCROLL */}
      <div
        ref={stageRef}
        className={`sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between ${animContainerClass}`}
      >
        {/* ========================================================================= */}
        {/* CAPA 1: FONDO BIEN APLICADO (RESPLANDOR SOLAR CRIOLLO + MARCA DE AGUA)    */}
        {/* ========================================================================= */}
        <div
          ref={bgLayerRef}
          data-parallax-layer="1"
          className="pointer-events-none absolute inset-0 z-0 will-change-transform opacity-75"
          aria-hidden="true"
        >
          {/* Resplandor radial cálido inspirado en el calor de Little Havana */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] sm:h-[950px] sm:w-[950px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,168,38,0.18)_0%,rgba(229,37,22,0.07)_40%,transparent_75%)] blur-3xl pointer-events-none" />
          
          {/* Tipografías de fondo en marca de agua */}
          <div className="absolute top-20 left-8 text-[9vw] font-display font-black text-charcoal-ink/[0.025] tracking-tight uppercase select-none pointer-events-none">
            MIAMI CUBAN KITCHEN
          </div>
          <div className="absolute bottom-28 right-8 text-[11vw] font-display font-black text-charcoal-ink/[0.025] tracking-tight uppercase select-none pointer-events-none">
            AL MOMENTO
          </div>

          {/* Patrón sutil de puntos de plancha de hierro */}
          <div className="absolute inset-0 bg-[radial-gradient(#141210_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.035] pointer-events-none" />
        </div>

        {/* ========================================================================= */}
        {/* CAPA 2: COMIDA QUE SE QUEDA ARRIBA (PAN CUBANO TOSTADO & AROMÁTICOS)     */}
        {/* ========================================================================= */}
        <div
          ref={topFoodRef}
          data-parallax-layer="2"
          className="pointer-events-none absolute -top-8 sm:-top-12 md:-top-16 inset-x-0 z-20 flex flex-col items-center justify-start will-change-transform"
          aria-hidden="true"
        >
          {/* Pan superior crujiente dorado a la plancha como visera orgánica */}
          <div className="relative w-full max-w-[500px] sm:max-w-[700px] md:max-w-[850px] lg:max-w-[960px] px-4 flex justify-center">
            <img
              src="/sandwich/01-top-bread.webp"
              alt=""
              width={960}
              height={380}
              loading="eager"
              className="w-full object-contain drop-shadow-[0_28px_40px_rgba(20,18,16,0.32)] filter"
            />
            {/* Acentos botánicos flotantes cerca del pan superior */}
            <div className="absolute top-1/2 left-8 sm:left-14 -translate-y-1/2 flex items-center gap-2 text-mojo-citrus opacity-40 blur-[0.2px] rotate-[-12deg]">
              <Citrus className="h-10 w-10 sm:h-14 sm:w-14 stroke-[1.5]" />
            </div>
            <div className="absolute top-1/2 right-8 sm:right-14 -translate-y-1/2 flex items-center gap-2 text-brand-fire opacity-40 blur-[0.2px] rotate-[15deg]">
              <Sparkles className="h-8 w-8 sm:h-12 sm:w-12 stroke-[1.5]" />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CAPA 3: TIPOGRAFÍA MONUMENTAL INTERMEDIA (SLIDES BEHIND TOP FOOD)        */}
        {/* ========================================================================= */}
        <div
          ref={titleLayerRef}
          data-parallax-layer="3"
          className="parallax__layer-title absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 will-change-transform pointer-events-none"
        >
          {/* Requisito de Accesibilidad H1 estricto para SEO y Screen Readers */}
          <h1 className="sr-only">
            The Authentic Criollo Flavor of Miami, Marinado to Perfection
          </h1>

          {/* Titular Monumental con efecto de foco y resplandor al cursor */}
          <div className="pointer-events-auto max-w-6xl w-full mx-auto">
            <HoverHighlightText
              as="h1"
              text="HOT CAST IRON. CRUSHED GARLIC. SLOW-ROASTED PERNIL."
              baseClassName="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[7.6vw] font-black uppercase tracking-tight text-charcoal-ink/35 leading-[0.86] text-center"
              highlightClassName="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[7.6vw] font-black uppercase tracking-tight text-brand-fire leading-[0.86] text-center"
              strokeColor="#E52516"
              strokeWidth={1.5}
              spotlightRadius={200}
              spotlightSoftness={0.82}
              enableGlow
            />
          </div>

          {/* Subtítulo Narrativo Visceral en Spanglish de Miami */}
          <p className="mt-4 sm:mt-6 max-w-2xl font-sans text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-charcoal-ink/90 font-medium pointer-events-auto px-4">
            No corporate bowls. We cook generational family recipes of slow-roasted pork marinated for 4 hours in Seville sour orange, pressed{" "}
            <span className="font-bold text-brand-fire">al momento</span> in the heart of Brownsville.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* CAPA 4: COMIDA INFERIOR EN PRIMER PLANO (LECHÓN, QUESO Y PAN INFERIOR)   */}
        {/* ========================================================================= */}
        <div
          ref={bottomFoodRef}
          data-parallax-layer="4"
          className="pointer-events-none absolute -bottom-10 sm:-bottom-16 md:-bottom-20 inset-x-0 z-25 flex flex-col items-center justify-end will-change-transform"
          aria-hidden="true"
        >
          <div className="relative w-full max-w-[500px] sm:max-w-[700px] md:max-w-[850px] lg:max-w-[960px] px-4 flex justify-center">
            {/* Capas unidas del sándwich artesanal cortadas limpiamente en PNG/WEBP */}
            <div className="relative w-full flex flex-col items-center">
              {/* Mojo Pork & Cheese layer */}
              <img
                src="/sandwich/04-mojo-pork.webp"
                alt=""
                width={880}
                height={280}
                loading="eager"
                className="w-[88%] object-contain drop-shadow-[0_16px_28px_rgba(20,18,16,0.35)] -mb-8 sm:-mb-12 relative z-2"
              />
              {/* Pickles & Mustard garnish */}
              <img
                src="/sandwich/02-pickles.webp"
                alt=""
                width={780}
                height={220}
                loading="eager"
                className="w-[82%] object-contain drop-shadow-[0_12px_22px_rgba(20,18,16,0.3)] -mb-10 sm:-mb-14 relative z-3"
              />
              {/* Pan inferior tostado */}
              <img
                src="/sandwich/05-bottom-bread.webp"
                alt=""
                width={960}
                height={320}
                loading="eager"
                className="w-full object-contain drop-shadow-[0_24px_38px_rgba(20,18,16,0.4)] relative z-1"
              />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CAPA 5: BADGES EDITORIALES FLOTANTES & TICKETS DE PRECIO (Z-INDEX 30)     */}
        {/* ========================================================================= */}
        {/* 1. Badge Social Proof (Requisito de QA & WCAG AA) */}
        <div
          role="status"
          aria-label="Average customer rating in Miami"
          className="absolute top-20 right-4 sm:top-24 sm:right-8 md:right-12 z-30 bg-surface-sand px-3.5 py-2 sm:px-4 sm:py-2.5 border border-charcoal-ink/15 shadow-md select-none cursor-pointer hover:bg-surface-sand/90 transition-colors"
        >
          <div className="text-left">
            <p className="font-sans text-[11px] sm:text-xs font-black text-charcoal-ink leading-tight">
              4.7 Stars across +3,000 orders in Miami
            </p>
            <p className="font-sans text-[9px] sm:text-[10px] text-charcoal-ink/70">
              UberEats &amp; Google Miami (4.7 across 3K+ Reviews)
            </p>
          </div>
        </div>

        {/* 2. Ticket de Precio en Formato Comanda */}
        <div className="absolute top-20 left-4 sm:top-24 sm:left-8 md:left-12 z-30 flex items-center gap-2 bg-charcoal-ink px-3.5 py-1.5 border border-cream-bg/20 text-cream-bg shadow-md select-none">
          <span className="font-sans text-xs sm:text-sm font-black text-mojo-citrus tracking-tight">
            $15.50
          </span>
          <span className="h-3 w-px bg-cream-bg/20" />
          <span className="font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-cream-bg">
            Al Momento
          </span>
        </div>

        {/* 3. Sello de Tinta Artesanal en Esquina */}
        <div className="absolute bottom-8 right-6 z-30 hidden lg:flex">
          <InkStamp size={115} className="bg-cream-bg/95 p-1" />
        </div>

        {/* ========================================================================= */}
        {/* CAPA 6: BOTONES DE ACCIÓN PRIMARIA (ORDER HOT & CATERING)                 */}
        {/* ========================================================================= */}
        <div
          ref={ctaLayerRef}
          className="relative z-30 pb-8 sm:pb-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 pointer-events-auto"
        >
          <MagneticButton
            href={`#${menuAnchorId}`}
            onClick={handleScrollToMenu}
            className="group relative inline-flex items-center justify-center gap-3 rounded-none bg-brand-fire px-8 py-3.5 sm:px-9 sm:py-4 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-cream-bg hover:bg-charcoal-ink transition-colors cursor-pointer select-none shadow-xl shadow-brand-fire/20"
          >
            <UtensilsCrossed className="h-4 w-4 transition-transform group-hover:rotate-12" aria-hidden="true" />
            <span>ORDER HOT</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 font-bold">
              →
            </span>
          </MagneticButton>

          <a
            href={cateringHref}
            className="inline-flex items-center justify-center gap-2.5 rounded-none bg-surface-sand border border-charcoal-ink/15 px-6 py-3.5 sm:px-7 sm:py-4 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-charcoal-ink hover:bg-charcoal-ink hover:text-cream-bg transition-colors select-none shadow-md"
          >
            <CalendarHeart className="h-4 w-4 text-leaf-green" aria-hidden="true" />
            <span>Catering &amp; Events</span>
          </a>
        </div>

        {/* ========================================================================= */}
        {/* OSMO PARALLAX FADE: DEGRADADO INFERIOR HACIA CUBANDECONSTRUCTION           */}
        {/* ========================================================================= */}
        <div
          className="parallax__fade pointer-events-none absolute bottom-0 left-0 right-0 h-32 sm:h-44 bg-gradient-to-t from-cream-bg via-cream-bg/85 to-transparent z-30"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

export default HeroSection;
