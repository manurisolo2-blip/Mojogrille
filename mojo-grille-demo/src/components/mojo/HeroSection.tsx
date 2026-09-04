import React, { useEffect } from "react";
import { UtensilsCrossed, CalendarHeart, Sparkles } from "lucide-react";
import gsap from "gsap";
import defaultHeroImage from "@/assets/mojo-bowl-ropa-vieja.jpg";

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
  shouldAnimateIn,
}: HeroSectionProps) {
  useEffect(() => {
    if (!shouldAnimateIn || typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-fade-item",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.09,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        ".hero-card-item",
        { opacity: 0, scale: 0.92, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.95,
          ease: "power4.out",
          delay: 0.15,
        }
      );
    });

    return () => ctx.revert();
  }, [shouldAnimateIn]);

  const handleScrollToMenu = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const target = document.getElementById(menuAnchorId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    onOrderClick?.();
  };

  const animItemClass = shouldAnimateIn === false ? "opacity-0 hero-fade-item" : "hero-fade-item";
  const animCardClass = shouldAnimateIn === false ? "opacity-0 hero-card-item" : "hero-card-item";

  return (
    <section
      id="top"
      aria-label="Welcome to Mojo Grille Cuban Kitchen"
      className="relative overflow-hidden bg-cream-bg border-b border-charcoal-ink/10 pt-8 pb-16 md:pt-14 md:pb-24 lg:pt-16 lg:pb-28"
    >
      {/* Destellos / Gradientes Circulares Difuminados en Bordes (CRAV style) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-20 h-96 w-96 rounded-full bg-leaf-green/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 -right-24 h-[450px] w-[450px] rounded-full bg-brand-fire/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-1/3 h-80 w-80 rounded-full bg-mojo-citrus/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          
          {/* Columna Izquierda: Mensaje, Stickers Flotantes y CTAs (7 cols) */}
          <div className="flex flex-col items-start text-left lg:col-span-7 space-y-5">
            
            {/* Pill superior de procedencia */}
            <div className={`inline-flex items-center gap-2 rounded-full border border-charcoal-ink/10 bg-surface-sand px-4 py-1.5 shadow-xs ${animItemClass}`}>
              <span className="h-2 w-2 rounded-full bg-leaf-green animate-pulse" />
              <span className="font-sans text-[11px] font-bold uppercase tracking-widest text-charcoal-ink">
                Authentic Cuban Kitchen • Miami, FL
              </span>
            </div>

            {/* Título Monumental Display */}
            {/* The Authentic Criollo Flavor of Miami, Marinado to Perfection */}
            <h1 className={`font-display text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-charcoal-ink uppercase leading-[0.88] ${animItemClass}`}>
              The Authentic Criollo Flavor of Miami,{" "}
              <span className="relative inline-block text-brand-fire">
                Marinado
                <svg
                  className="absolute -bottom-1 left-0 w-full text-brand-fire/30"
                  viewBox="0 0 100 8"
                  preserveAspectRatio="none"
                  height="6"
                >
                  <path d="M0 5 Q 50 0, 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </span>{" "}
              to <span className="text-leaf-green">Perfection</span>.
            </h1>

            {/* Accent Subtitle Cursiva Artesanal */}
            <p className={`font-accent italic text-2xl sm:text-3xl text-brand-fire lowercase tracking-normal ${animItemClass}`}>
              juicy, crispy &amp; sazonado al mojo criollo.
            </p>

            {/* Subtítulo Descriptivo Sensorial */}
            <p className={`max-w-xl font-sans text-sm sm:text-base leading-relaxed text-charcoal-ink/80 ${animItemClass}`}>
              Artisanal bowls marinated 24h in citrus mojo, freshly pressed Cuban sandwiches &amp; family recipes made al momento.
            </p>

            {/* Stickers flotantes animados con rotación estilo CRAV */}
            <div className={`flex flex-wrap items-center gap-3 pt-1 select-none ${animItemClass}`}>
              {/* Badge 1: Rotado -3deg, fondo surface-sand, icono estrella */}
              <div
                role="status"
                aria-label="Average customer rating in Miami"
                className="-rotate-3 transition-transform duration-300 animate-float rounded-2xl border border-charcoal-ink/10 bg-surface-sand px-4 py-2.5 shadow-sm hover:rotate-0 hover:scale-105 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="text-mojo-citrus text-lg">⭐</span>
                  <div className="text-left">
                    <p className="font-sans text-xs font-black text-charcoal-ink leading-tight">
                      4.7 Stars across +3,000 orders in Miami
                    </p>
                    <p className="font-sans text-[10px] text-charcoal-ink/70">
                      UberEats &amp; Google Miami (4.7 en 3K+ Reviews)
                    </p>
                  </div>
                </div>
              </div>

              {/* Badge 2: Rotado 3deg, fondo verde fresco leaf-green, texto cream-bg */}
              <div className="rotate-3 transition-transform duration-300 animate-float-reverse rounded-2xl bg-leaf-green px-4 py-2.5 text-cream-bg shadow-md shadow-leaf-green/20 hover:rotate-0 hover:scale-105 cursor-pointer">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🌿</span>
                  <div className="text-left">
                    <p className="font-sans text-xs font-black text-cream-bg leading-tight uppercase tracking-wide">
                      100% Fresh Daily
                    </p>
                    <p className="font-sans text-[10px] text-cream-bg/85">
                      Hecho Al Momento
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Botones de Acción (Dual CTA con 60-30-10) */}
            <div className={`mt-4 flex w-full flex-col gap-3.5 sm:w-auto sm:flex-row sm:items-center ${animItemClass}`}>
              <a
                href={`#${menuAnchorId}`}
                onClick={handleScrollToMenu}
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-brand-fire px-8 py-4 font-sans text-base font-bold text-cream-bg shadow-[0_12px_24px_-6px_rgba(229,37,22,0.38)] transition-all duration-300 hover:bg-brand-fire/90 hover:shadow-[0_16px_28px_-6px_rgba(199,31,18,0.45)] hover:-translate-y-0.5 active:translate-y-0"
              >
                <UtensilsCrossed className="h-5 w-5 transition-transform group-hover:rotate-12" />
                <span>See Menu &amp; Order Now</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 font-bold">
                  →
                </span>
              </a>

              <a
                href={cateringHref}
                className="inline-flex items-center justify-center gap-2.5 rounded-full border border-charcoal-ink/20 bg-surface-sand px-7 py-4 font-sans text-base font-semibold text-charcoal-ink shadow-sm transition-all duration-200 hover:bg-surface-sand/80 hover:border-brand-fire/40 hover:shadow"
              >
                <CalendarHeart className="h-5 w-5 text-leaf-green" />
                <span>Catering &amp; Events</span>
              </a>
            </div>

            {/* Microcopy de Confianza y Frescura */}
            <div className={`flex items-center gap-2 text-xs text-charcoal-ink/70 pt-1 ${animItemClass}`}>
              <Sparkles className="h-3.5 w-3.5 text-leaf-green" />
              <span>Fresh ingredients • 15 min pickup • Fast delivery caliente al momento</span>
            </div>
          </div>

          {/* Columna Derecha: Tarjeta de Producto Central con Tag de Precio Flotante (5 cols) */}
          <div className={`relative mx-auto w-full max-w-lg lg:col-span-5 lg:max-w-none ${animCardClass}`}>
            {/* Contenedor Principal de la Imagen */}
            <div className="group relative overflow-hidden rounded-3xl border border-charcoal-ink/10 bg-surface-sand shadow-[0_20px_45px_-15px_rgba(20,18,16,0.18)] transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
              <img
                src={imageUrl}
                alt="Signature Mojo Grille dish: Artisanal Cuban bowl marinated in citrus mojo"
                width={1024}
                height={768}
                loading="eager"
                className="aspect-4/3 w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-60" />

              {/* Tag de Precio Flotante estilo Badge superpuesto en la esquina superior izquierda */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-xl bg-charcoal-ink/90 px-3.5 py-1.5 backdrop-blur-md border border-cream-bg/20 text-cream-bg shadow-lg">
                <span className="font-sans text-base font-black text-mojo-citrus tracking-tight">
                  $15.50
                </span>
                <span className="h-3 w-px bg-cream-bg/20" />
                <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-cream-bg">
                  Al Momento
                </span>
              </div>

              {/* Sello Circular Giratorio estilo CRAV sobrepuesto */}
              <div className="animate-spin [animation-duration:18s] absolute -bottom-4 -right-4 z-20 hidden sm:flex h-20 w-20 items-center justify-center rounded-full bg-brand-fire text-cream-bg p-2 text-center shadow-lg border-2 border-cream-bg select-none">
                <div className="font-sans text-[8px] font-black uppercase tracking-widest leading-tight">
                  ★ AUTÉNTICO ★ SABOR MIAMI
                </div>
              </div>
            </div>

            {/* Badge Flotante Inferior: 🔥 Top Seller: Chicken Fresco Bowl */}
            <div className="absolute -bottom-4 left-4 sm:-bottom-5 sm:left-6 z-20 flex items-center gap-3 rounded-2xl border border-charcoal-ink/10 bg-surface-sand/95 px-4 py-3 shadow-[0_12px_28px_-6px_rgba(20,18,16,0.16)] backdrop-blur-md transition-transform hover:scale-105">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cream-bg text-xl border border-charcoal-ink/10">
                🔥
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-leaf-green">
                  House Favorite • Sabor Criollo
                </span>
                <span className="font-sans text-sm font-bold text-charcoal-ink">
                  Top Seller: Chicken Fresco Bowl
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HeroSection;
