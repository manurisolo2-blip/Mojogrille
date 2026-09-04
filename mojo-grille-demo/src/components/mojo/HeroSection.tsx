import React from "react";
import { UtensilsCrossed, CalendarHeart, Sparkles } from "lucide-react";
import defaultHeroImage from "@/assets/mojo-bowl-ropa-vieja.jpg";

export interface HeroSectionProps {
  onOrderClick?: () => void;
  menuAnchorId?: string;
  cateringHref?: string;
  imageUrl?: string;
}

export function HeroSection({
  onOrderClick,
  menuAnchorId = "menu",
  cateringHref = "#catering",
  imageUrl = defaultHeroImage,
}: HeroSectionProps) {
  const handleScrollToMenu = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const target = document.getElementById(menuAnchorId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    onOrderClick?.();
  };

  return (
    <section
      id="top"
      aria-label="Welcome to Mojo Grille Cuban Kitchen"
      className="relative overflow-hidden bg-[#FAF8F5] border-b border-[#EAE5DC] pt-8 pb-16 md:pt-14 md:pb-24 lg:pt-16 lg:pb-28"
    >
      {/* Destellos / Gradientes Circulares Difuminados en Bordes (CRAV style) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-20 h-96 w-96 rounded-full bg-[#4D7C0F]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 -right-24 h-[450px] w-[450px] rounded-full bg-[#D95327]/12 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-1/3 h-80 w-80 rounded-full bg-[#F59E0B]/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          
          {/* Columna Izquierda: Mensaje, Stickers Flotantes y CTAs (7 cols) */}
          <div className="flex flex-col items-start text-left lg:col-span-7 space-y-5">
            
            {/* Pill superior de procedencia */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#EAE5DC] bg-white px-4 py-1.5 shadow-xs">
              <span className="h-2 w-2 rounded-full bg-[#4D7C0F] animate-pulse" />
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#1C1917]">
                Authentic Cuban Kitchen • Miami, FL
              </span>
            </div>

            {/* Título de gran escala con palabras clave acentuadas */}
            <h1 className="font-serif text-3xl font-extrabold tracking-tight text-[#1C1917] sm:text-5xl lg:text-6xl leading-[1.1]">
              The Authentic Criollo Flavor of Miami,{" "}
              <span className="relative inline-block text-[#D95327]">
                Marinado
                <svg
                  className="absolute -bottom-1 left-0 w-full text-[#D95327]/30"
                  viewBox="0 0 100 8"
                  preserveAspectRatio="none"
                  height="6"
                >
                  <path d="M0 5 Q 50 0, 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </span>{" "}
              to <span className="text-[#4D7C0F]">Perfection</span>.
            </h1>

            {/* Subtítulo Descriptivo Sensorial */}
            <p className="max-w-xl font-sans text-base leading-relaxed text-[#78716C] sm:text-lg">
              Artisanal bowls marinated 24h in citrus mojo, freshly pressed Cuban sandwiches &amp; family recipes made al momento.
            </p>

            {/* Stickers flotantes animados con rotación estilo CRAV */}
            <div className="flex flex-wrap items-center gap-3 pt-1 select-none">
              {/* Badge 1: Rotado -3deg, fondo blanco, icono estrella */}
              <div className="-rotate-3 transition-transform duration-300 animate-float rounded-2xl border border-[#EAE5DC] bg-white px-4 py-2.5 shadow-sm hover:rotate-0 hover:scale-105 cursor-pointer">
                <div className="flex items-center gap-2">
                  <span className="text-[#F59E0B] text-lg">⭐</span>
                  <div className="text-left">
                    <p className="font-sans text-xs font-black text-[#1C1917] leading-tight">
                      4.7 en 3K+ Reviews
                    </p>
                    <p className="font-sans text-[10px] text-[#78716C]">
                      UberEats &amp; Google Miami
                    </p>
                  </div>
                </div>
              </div>

              {/* Badge 2: Rotado 3deg, fondo verde fresco (#4D7C0F), texto blanco */}
              <div className="rotate-3 transition-transform duration-300 animate-float-reverse rounded-2xl bg-[#4D7C0F] px-4 py-2.5 text-white shadow-md shadow-[#4D7C0F]/20 hover:rotate-0 hover:scale-105 cursor-pointer">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🌿</span>
                  <div className="text-left">
                    <p className="font-sans text-xs font-black text-white leading-tight">
                      100% Fresh Daily
                    </p>
                    <p className="font-sans text-[10px] text-white/80">
                      Hecho Al Momento
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Botones de Acción (Dual CTA) */}
            <div className="mt-4 flex w-full flex-col gap-3.5 sm:w-auto sm:flex-row sm:items-center">
              <a
                href={`#${menuAnchorId}`}
                onClick={handleScrollToMenu}
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#D95327] px-8 py-4 font-sans text-base font-bold text-white shadow-[0_12px_24px_-6px_rgba(217,83,39,0.38)] transition-all duration-300 hover:bg-[#B83E16] hover:shadow-[0_16px_28px_-6px_rgba(184,62,22,0.45)] hover:-translate-y-0.5 active:translate-y-0"
              >
                <UtensilsCrossed className="h-5 w-5 transition-transform group-hover:rotate-12" />
                <span>See Menu &amp; Order Now</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 font-bold">
                  →
                </span>
              </a>

              <a
                href={cateringHref}
                className="inline-flex items-center justify-center gap-2.5 rounded-full border border-[#EAE5DC] bg-white px-7 py-4 font-sans text-base font-semibold text-[#1C1917] shadow-sm transition-all duration-200 hover:bg-[#FAF8F5] hover:border-[#D6CFBF] hover:shadow"
              >
                <CalendarHeart className="h-5 w-5 text-[#4D7C0F]" />
                <span>Catering &amp; Events</span>
              </a>
            </div>

            {/* Microcopy de Confianza y Frescura */}
            <div className="flex items-center gap-2 text-xs text-[#78716C] pt-1">
              <Sparkles className="h-3.5 w-3.5 text-[#4D7C0F]" />
              <span>Fresh ingredients • 15 min pickup • Fast delivery caliente al momento</span>
            </div>
          </div>

          {/* Columna Derecha: Tarjeta de Producto Central con Tag de Precio Flotante (5 cols) */}
          <div className="relative mx-auto w-full max-w-lg lg:col-span-5 lg:max-w-none">
            {/* Contenedor Principal de la Imagen */}
            <div className="group relative overflow-hidden rounded-3xl border border-[#EAE5DC] bg-white shadow-[0_20px_45px_-15px_rgba(28,25,23,0.18)] transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
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
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-xl bg-[#1C1917]/90 px-3.5 py-1.5 backdrop-blur-md border border-white/20 text-white shadow-lg">
                <span className="font-sans text-base font-black text-[#F59E0B] tracking-tight">
                  $15.50
                </span>
                <span className="h-3 w-px bg-white/20" />
                <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-[#FAF8F5]">
                  Al Momento
                </span>
              </div>

              {/* Sello Circular Giratorio estilo CRAV sobrepuesto */}
              <div className="animate-spin [animation-duration:18s] absolute -bottom-4 -right-4 z-20 hidden sm:flex h-20 w-20 items-center justify-center rounded-full bg-[#D95327] text-white p-2 text-center shadow-lg border-2 border-white select-none">
                <div className="font-sans text-[8px] font-black uppercase tracking-widest leading-tight">
                  ★ AUTÉNTICO ★ SABOR MIAMI
                </div>
              </div>
            </div>

            {/* Badge Flotante Inferior: 🔥 Top Seller: Chicken Fresco Bowl */}
            <div className="absolute -bottom-4 left-4 sm:-bottom-5 sm:left-6 z-20 flex items-center gap-3 rounded-2xl border border-[#EAE5DC] bg-white/95 px-4 py-3 shadow-[0_12px_28px_-6px_rgba(28,25,23,0.16)] backdrop-blur-md transition-transform hover:scale-105">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FAF8F5] text-xl border border-[#EAE5DC]">
                🔥
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#4D7C0F]">
                  House Favorite • Sabor Criollo
                </span>
                <span className="font-sans text-sm font-bold text-[#1C1917]">
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
