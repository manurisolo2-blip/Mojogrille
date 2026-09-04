import React from "react";
import { Star, UtensilsCrossed, CalendarHeart, Sparkles } from "lucide-react";
import defaultHeroImage from "@/assets/mojo-bowl-ropa-vieja.jpg";

export interface HeroSectionProps {
  /** Acción opcional al hacer clic en el botón primario de pedido */
  onOrderClick?: () => void;
  /** Identificador de la sección del menú para el scroll suave (default: "menu") */
  menuAnchorId?: string;
  /** Identificador de la sección o enlace de catering (default: "#catering") */
  cateringHref?: string;
  /** URL o import de imagen destacada */
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
      aria-label="Inicio y presentación de Mojo Grille"
      className="relative overflow-hidden bg-[#FAF8F5] border-b border-[#EAE5DC] pt-8 pb-14 md:pt-14 md:pb-20 lg:pt-16 lg:pb-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Columna Izquierda: Mensaje, Prueba Social y CTAs */}
          <div className="flex flex-col items-start text-left">
            
            {/* 2. Badge de Prueba Social (Above the Fold, ubicado arriba del título principal) */}
            <div
              role="status"
              aria-label="Calificación promedio de clientes"
              className="inline-flex items-center gap-2 rounded-full border border-[#F59E0B]/35 bg-[#F4EFEA] px-3.5 py-1.5 text-xs font-semibold text-[#1C1917] shadow-sm transition-transform hover:scale-[1.02]"
            >
              <span className="flex items-center text-[#F59E0B]" aria-hidden="true">
                <Star className="h-3.5 w-3.5 fill-[#F59E0B] stroke-[#F59E0B]" />
              </span>
              <span className="leading-none tracking-tight">
                <strong className="font-bold">4.7 Estrellas</strong> en +3,000 pedidos en Miami{" "}
                <span className="font-normal text-[#78716C]">(UberEats &amp; Google)</span>
              </span>
            </div>

            {/* 3. Tipografía & Copywriting: H1 Editorial */}
            <h1 className="mt-5 font-serif text-3xl font-bold tracking-tight text-[#1C1917] sm:text-5xl lg:text-6xl leading-[1.08]">
              El Auténtico Sabor Criollo de Miami, Marinado a la Perfección
            </h1>

            {/* Subtítulo Descriptivo Sensorial */}
            <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-[#78716C] sm:text-lg lg:text-xl">
              Bowls artesanales marinado 24h en mojo cítrico, sándwiches cubanos prensados y recetas familiares preparadas al momento.
            </p>

            {/* 4. Botones de Acción (Dual CTA) */}
            <div className="mt-8 flex w-full flex-col gap-3.5 sm:w-auto sm:flex-row sm:items-center">
              {/* Botón Primario: Ver Menú & Pedir */}
              <a
                href={`#${menuAnchorId}`}
                onClick={handleScrollToMenu}
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#D95327] px-7 py-4 font-sans text-base font-bold text-white shadow-[0_12px_24px_-6px_rgba(217,83,39,0.38)] transition-all duration-200 hover:bg-[#B83E16] hover:shadow-[0_16px_28px_-6px_rgba(184,62,22,0.45)] hover:-translate-y-0.5 active:translate-y-0"
              >
                <UtensilsCrossed className="h-5 w-5 transition-transform group-hover:rotate-12" />
                <span>Ver Menú &amp; Pedir</span>
              </a>

              {/* Botón Secundario: Catering para Eventos */}
              <a
                href={cateringHref}
                className="inline-flex items-center justify-center gap-2.5 rounded-full border border-[#EAE5DC] bg-white px-7 py-4 font-sans text-base font-semibold text-[#1C1917] shadow-sm transition-all duration-200 hover:bg-[#FAF8F5] hover:border-[#D6CFBF] hover:shadow"
              >
                <CalendarHeart className="h-5 w-5 text-[#4D7C0F]" />
                <span>Catering para Eventos</span>
              </a>
            </div>

            {/* Microcopy de Confianza y Frescura */}
            <div className="mt-6 flex items-center gap-2 text-xs text-[#78716C]">
              <Sparkles className="h-3.5 w-3.5 text-[#4D7C0F]" />
              <span>Ingredientes frescos • Retiro en 15 min • Delivery rápido</span>
            </div>
          </div>

          {/* Columna Derecha: Composición Visual con Tarjeta Flotante */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            {/* Contenedor Principal de la Imagen */}
            <div className="relative overflow-hidden rounded-3xl border border-[#EAE5DC] bg-white shadow-[0_20px_45px_-15px_rgba(28,25,23,0.18)]">
              <img
                src={imageUrl}
                alt="Plato emblemático de Mojo Grille: Bowl criollo marinado en mojo cítrico con carne deshebrada, plátanos maduros y arroz moro"
                width={1024}
                height={768}
                loading="eager"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60" />
            </div>

            {/* 5. Tarjeta Flotante: 🔥 Top Seller: Chicken Fresco Bowl */}
            <div className="absolute -bottom-4 left-4 sm:-bottom-5 sm:left-6 z-10 flex items-center gap-3 rounded-2xl border border-[#EAE5DC] bg-white/95 px-4 py-3 shadow-[0_12px_28px_-6px_rgba(28,25,23,0.16)] backdrop-blur-md transition-transform hover:scale-105">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FAF8F5] text-xl border border-[#EAE5DC]">
                🔥
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#4D7C0F]">
                  Favorito de la Casa
                </span>
                <span className="font-sans text-sm font-bold text-[#1C1917]">
                  Top Seller: Chicken Fresco Bowl
                </span>
              </div>
            </div>

            {/* Badge Secundario Flotante: Marinado 24h */}
            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 z-10 hidden sm:flex items-center gap-1.5 rounded-full border border-[#EAE5DC] bg-[#FAF8F5] px-3.5 py-1.5 shadow-md">
              <span className="h-2 w-2 rounded-full bg-[#4D7C0F] animate-pulse" />
              <span className="text-xs font-semibold text-[#1C1917]">Marinado 24h</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
