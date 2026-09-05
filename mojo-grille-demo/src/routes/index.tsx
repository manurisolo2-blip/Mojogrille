import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, MapPin, Phone } from "lucide-react";
import { CartProvider } from "@/components/mojo/cart";
import { TopBar } from "@/components/mojo/TopBar";
import { HeroSection } from "@/components/mojo/HeroSection";
import { CategoryTabs } from "@/components/mojo/CategoryTabs";
import { MenuGrid } from "@/components/mojo/MenuGrid";
import { CravStyleMenuGrid } from "@/components/mojo/CravStyleMenuGrid";
import { QuickOrderModal } from "@/components/mojo/QuickOrderModal";
import { CartSheet } from "@/components/mojo/CartSheet";
import { CartDrawer } from "@/components/mojo/CartDrawer";
import { MobileActionBar } from "@/components/mojo/MobileActionBar";
import { Preloader } from "@/components/mojo/Preloader";
import { CubanDeconstruction } from "@/components/mojo/CubanDeconstruction";
import { CuratedMenu } from "@/components/mojo/CuratedMenu";
import { DistrictsCatering } from "@/components/mojo/DistrictsCatering";
import { EditorialFooter } from "@/components/mojo/EditorialFooter";
import { NoiseOverlay } from "@/components/mojo/NoiseOverlay";
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

  // Refresco de ScrollTrigger al completar la carga de todas las imágenes del DOM
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.refresh();

    const images = Array.from(document.querySelectorAll("img"));
    let loadedCount = 0;
    const totalImages = images.length;

    const handleImageComplete = () => {
      loadedCount++;
      if (loadedCount >= totalImages) {
        ScrollTrigger.refresh();
      }
    };

    if (totalImages === 0) {
      ScrollTrigger.refresh();
    } else {
      images.forEach((img) => {
        if (img.complete) {
          handleImageComplete();
        } else {
          img.addEventListener("load", handleImageComplete, { once: true });
          img.addEventListener("error", handleImageComplete, { once: true });
        }
      });
    }

    const handleWindowLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", handleWindowLoad);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 450);

    return () => {
      window.removeEventListener("load", handleWindowLoad);
      clearTimeout(timer);
    };
  }, []);

  const items = itemsForCategory(category);

  return (
    <CartProvider>
      {/* Editorial Preloader & Cinematic Curtain Exit */}
      <Preloader onComplete={() => setIsLoaded(true)} />

      {/* Textura de grano de papel artesanal editorial */}
      <NoiseOverlay />

      <div className="min-h-dvh bg-cream-canvas text-charcoal-ink pb-24 md:pb-0">
        <TopBar onOpenCart={() => setCartOpen(true)} />
        <main className="bg-transparent">
          <HeroSection
            menuAnchorId="menu"
            cateringHref="#catering"
            shouldAnimateIn={isLoaded}
          />

          {/* Fase 5: El Elemento Estrella — Deconstrucción en Scroll (CubanDeconstruction) */}
          <CubanDeconstruction />

          {/* Selección de la Plancha — 6 Platos Estelares Curados */}
          <CuratedMenu />

          <section id="menu" className="scroll-mt-32">
            <CravStyleMenuGrid onSelect={setSelected} />
          </section>

          {/* Packaging Térmico de Autor & Catering para Distritos */}
          <DistrictsCatering />

          <section
            id="catering"
            className="border-b border-charcoal-ink/20 bg-surface-sand px-4 py-16 sm:px-6 lg:px-8"
          >
            <div className="mx-auto max-w-4xl text-center">
              <div className="inline-flex items-center gap-2 rounded-none border border-charcoal-ink/20 bg-cream-bg px-3.5 py-1 font-mono text-[11px] font-bold text-charcoal-ink uppercase tracking-widest mb-4">
                <span className="h-1.5 w-1.5 bg-brand-fire rounded-none" aria-hidden="true" />
                <span>CRIOLLO FLAVOR FOR YOUR EVENTS</span>
              </div>
              <h2 className="font-display text-4xl sm:text-6xl font-black tracking-tight uppercase text-charcoal-ink leading-none">
                Authentic Criollo Catering for your next celebration
              </h2>
              <p className="mx-auto mt-3 max-w-2xl font-sans text-sm text-charcoal-ink/80 sm:text-base leading-relaxed">
                Family-style bandejas, live pressed Cubano stations, and hot cafecito for
                corporate offices, weddings, and quinces. Booked with 48h notice.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="tel:+13055550123"
                  className="inline-flex items-center gap-2.5 rounded-none border-2 border-charcoal-ink bg-brand-fire px-8 py-4 font-sans text-sm sm:text-base font-bold uppercase tracking-wider text-cream-bg hover:bg-charcoal-ink transition-colors cursor-pointer select-none"
                >
                  <Phone className="h-4 w-4" />
                  <span>Talk to Catering Team: (305) 555-0123</span>
                </a>
              </div>
              <p className="mt-4 font-mono text-xs text-charcoal-ink/70 uppercase tracking-wide">
                Serving Little Havana, Brickell, Doral &amp; greater Miami-Dade · Instant quotes al momento
              </p>
            </div>
          </section>

          {/* Editorial Footer de Alto Impacto */}
          <EditorialFooter onOpenCart={() => setCartOpen(true)} />
        </main>

        <QuickOrderModal item={selected} onClose={() => setSelected(null)} />
        <CartSheet open={cartOpen} onClose={() => setCartOpen(false)} />
        <CartDrawer />
        <MobileActionBar onOpenCart={() => setCartOpen(true)} />
      </div>
    </CartProvider>
  );
}
