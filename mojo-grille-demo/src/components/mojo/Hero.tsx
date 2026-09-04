import { Star, UtensilsCrossed, CalendarHeart } from "lucide-react";
import heroImage from "@/assets/mojo-bowl-ropa-vieja.jpg";

function scrollToMenu() {
  document.getElementById("menu")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero() {
  return (
    <section id="top" className="grain overflow-hidden border-b border-border bg-background">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 pb-12 pt-10 md:grid-cols-2 md:gap-12 md:pb-20 md:pt-16">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-citrus-soft px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-citrus">
            Artesanal • Marinado 24h
          </span>

          <h1 className="mt-5 text-[2.1rem] font-bold leading-[1.08] sm:text-5xl md:text-6xl">
            El Auténtico Sabor Criollo de Miami, Marinado a la Perfección
          </h1>

          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Bowls artesanales, sándwiches cubanos prensados y recetas familiares
            preparadas al instante con ingredientes frescos.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 shadow-soft">
            <Star className="h-4 w-4 shrink-0 fill-primary text-primary" />
            <span className="text-sm font-semibold">
              4.7 en +3,000 reseñas en Miami{" "}
              <span className="font-normal text-muted-foreground">(UberEats &amp; Google)</span>
            </span>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={scrollToMenu}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-lift transition-colors hover:bg-primary-hover"
            >
              <UtensilsCrossed className="h-5 w-5" />
              Ver Menú &amp; Pedir
            </button>
            <a
              href="#catering"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-4 text-base font-semibold text-foreground transition-colors hover:bg-muted"
            >
              <CalendarHeart className="h-5 w-5 text-citrus" />
              Reservas / Catering
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-lift">
            <img
              src={heroImage}
              alt="Bowl de ropa vieja con arroz moro y plátanos maduros"
              width={1024}
              height={768}
              className="aspect-4/3 w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-4 left-4 rounded-2xl border border-border bg-card px-4 py-3 shadow-lift">
            <p className="font-display text-lg font-bold leading-none">24 h</p>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
              en mojo cítrico
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
