import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, MapPin, Phone } from "lucide-react";
import { CartProvider } from "@/components/mojo/cart";
import { TopBar } from "@/components/mojo/TopBar";
import { HeroSection } from "@/components/mojo/HeroSection";
import { CategoryTabs } from "@/components/mojo/CategoryTabs";
import { MenuGrid } from "@/components/mojo/MenuGrid";
import { CravStyleMenuGrid } from "@/components/mojo/CravStyleMenuGrid";
import { QuickOrderModal } from "@/components/mojo/QuickOrderModal";
import { CartSheet } from "@/components/mojo/CartSheet";
import { MobileActionBar } from "@/components/mojo/MobileActionBar";
import { Preloader } from "@/components/mojo/Preloader";
import { ScrollLayerAssembly } from "@/components/mojo/ScrollLayerAssembly";
import { itemsForCategory, type CategoryId, type MenuItem } from "@/data/menu";
import { locationsList } from "@/data/locations";

const title = "Mojo Grille | Authentic Cuban Kitchen & Bowls in Miami";
const description =
  "Artisanal Cuban bowls, freshly pressed Cubano sandwiches, and party catering in Miami. Marinated 24h in citrus mojo. Fast takeout & delivery al momento.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      {
        name: "keywords",
        content:
          "Cuban food Miami, Cuban restaurant Little Havana, lechón asado, Cuban bowls, cubano sandwich, ropa vieja, catering Miami, cafecito cubano, mojo criollo, Brickell Cuban food, Doral takeout",
      },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "restaurant" },
      { property: "og:url", content: "https://mojogrille.com/" },
      { property: "og:site_name", content: "Mojo Grille Cuban Kitchen" },
      { property: "og:locale", content: "en_US" },
      { property: "og:locale:alternate", content: "es_US" },
      { property: "og:image", content: "https://mojogrille.com/og-image.jpg" },
      {
        property: "og:image:alt",
        content: "Mojo Grille Cuban Kitchen - Authentic Cuban Bowls & Pressed Sandwiches in Miami",
      },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: "https://mojogrille.com/og-image.jpg" },
      { name: "twitter:image:alt", content: "Mojo Grille Cuban Kitchen Miami" },
    ],
    links: [{ rel: "canonical", href: "https://mojogrille.com/" }],
  }),
  component: Index,
});

function Index() {
  const [category, setCategory] = useState<CategoryId>("favoritos");
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const items = itemsForCategory(category);

  return (
    <CartProvider>
      {/* Editorial Preloader & Cinematic Curtain Exit */}
      <Preloader onComplete={() => setIsLoaded(true)} />

      <div className="min-h-dvh bg-[#FAF8F5] text-[#1C1917] pb-24 md:pb-0">
        <TopBar onOpenCart={() => setCartOpen(true)} />
        <main className="bg-[#FAF8F5]">
          <HeroSection
            menuAnchorId="menu"
            cateringHref="#catering"
            shouldAnimateIn={isLoaded}
          />

          {/* Fase 5: El Elemento Estrella — Deconstrucción en Scroll (Scroll-Driven Layer Assembly) */}
          <ScrollLayerAssembly />

          <section id="menu" className="scroll-mt-32 bg-cream-bg">
            <CravStyleMenuGrid onSelect={setSelected} />
          </section>

          <section
            id="catering"
            className="grain border-y border-charcoal-ink/10 bg-surface-sand px-4 py-14 sm:px-6"
          >
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-leaf-green/30 bg-leaf-green/10 px-3.5 py-1 text-xs font-semibold text-leaf-green mb-4">
                🎉 Sabor Criollo Para Tus Eventos
              </div>
              <h2 className="font-display text-3xl font-bold tracking-tight uppercase text-charcoal-ink sm:text-5xl">
                Authentic Criollo Catering for your next celebration
              </h2>
              <p className="mx-auto mt-3 max-w-xl font-sans text-sm text-charcoal-ink/70 sm:text-base leading-relaxed">
                Family-style bandejas, live pressed Cubano stations, and hot cafecito for
                corporate offices, weddings, and quinces. Booked with 48h notice.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="tel:+13055550123"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-fire px-7 py-4 font-sans text-base font-bold text-cream-bg shadow-[0_12px_24px_-6px_rgba(229,37,22,0.38)] transition-all duration-200 hover:bg-brand-fire/90 hover:-translate-y-0.5"
                >
                  <Phone className="h-5 w-5" />
                  Talk to Catering Team: (305) 555-0123
                </a>
              </div>
              <p className="mt-4 font-sans text-xs text-charcoal-ink/70">
                Serving Little Havana, Brickell, Doral &amp; greater Miami-Dade · Cotizaciones al momento
              </p>
            </div>
          </section>

          <footer className="border-t border-charcoal-ink/10 bg-cream-bg py-14">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="font-display text-2xl font-bold uppercase tracking-tight text-charcoal-ink">MOJO GRILLE</p>
                  <p className="mt-1 font-sans text-xs uppercase tracking-wider text-brand-fire font-bold">
                    Cuban Kitchen · Miami, FL
                  </p>
                  <p className="mt-3 font-sans text-xs leading-relaxed text-charcoal-ink/70">
                    Authentic Cuban bowls, freshly pressed Cubano sandwiches &amp; family recipes made al momento. Marinated 24 hours in citrus mojo.
                  </p>
                </div>

                {locationsList.map((loc) => (
                  <div key={loc.id} className="font-sans text-sm">
                    <p className="font-bold text-charcoal-ink flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-brand-fire shrink-0" />
                      {loc.name} Store
                    </p>
                    <p className="mt-1.5 text-xs text-charcoal-ink/70 leading-relaxed">
                      {loc.address.fullAddress}
                    </p>
                    <a
                      href={`tel:${loc.phone}`}
                      className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-brand-fire hover:underline"
                    >
                      <Phone className="h-3 w-3" />
                      {loc.phone}
                    </a>
                    <p className="mt-1 flex items-center gap-1 text-[11px] text-charcoal-ink/60">
                      <Clock className="h-3 w-3 text-charcoal-ink/60" />
                      {loc.hours}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10 border-t border-charcoal-ink/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-charcoal-ink/60">
                <p>© {new Date().getFullYear()} Mojo Grille Cuban Kitchen. Todos los derechos reservados.</p>
                <p className="flex items-center gap-3">
                  <span>Little Havana</span>
                  <span>•</span>
                  <span>Brickell</span>
                  <span>•</span>
                  <span>Doral</span>
                </p>
              </div>
            </div>
          </footer>
        </main>

        <QuickOrderModal item={selected} onClose={() => setSelected(null)} />
        <CartSheet open={cartOpen} onClose={() => setCartOpen(false)} />
        <MobileActionBar onOpenCart={() => setCartOpen(true)} />
      </div>
    </CartProvider>
  );
}
