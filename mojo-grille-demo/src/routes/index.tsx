import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone } from "lucide-react";
import { CartProvider, useCart } from "@/components/mojo/cart";
import { TopBar } from "@/components/mojo/TopBar";
import { HeroSection } from "@/components/mojo/HeroSection";
import { CravStyleMenuGrid } from "@/components/mojo/CravStyleMenuGrid";
import { QuickOrderModal } from "@/components/mojo/QuickOrderModal";
import { CartSheet } from "@/components/mojo/CartSheet";
import { CartToast } from "@/components/mojo/CartToast";
import { MobileActionBar } from "@/components/mojo/MobileActionBar";
import { Preloader } from "@/components/mojo/Preloader";
import { CubanDeconstruction } from "@/components/mojo/CubanDeconstruction";
import { CuratedMenu } from "@/components/mojo/CuratedMenu";
import { GoogleReviewsSection } from "@/components/mojo/GoogleReviewsSection";
import { EditorialFooter } from "@/components/mojo/EditorialFooter";
import { NoiseOverlay } from "@/components/mojo/NoiseOverlay";
import { JellyWaveTransition } from "@/components/mojo/JellyWaveTransition";
import type { MenuItem } from "@/data/menu";

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
  return (
    <CartProvider>
      <IndexContent />
    </CartProvider>
  );
}

/**
 * Page body. Lives inside CartProvider so every cart surface (TopBar counter,
 * drawer, mobile bar, toast) reads and writes the exact same cart state.
 */
function IndexContent() {
  const { openCart } = useCart();
  const [selected, setSelected] = useState<MenuItem | null>(null);
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

  return (
    <>
      {/* Editorial Preloader & Cinematic Curtain Exit */}
      <Preloader onComplete={() => setIsLoaded(true)} />

      {/* Textura de grano de papel artesanal editorial */}
      <NoiseOverlay />

      <div className="min-h-dvh bg-cream-bg text-charcoal-ink">
        <TopBar onOpenCart={openCart} />
        <main className="bg-transparent pb-20 md:pb-0">
          {/* Contenedor del Hero con pin/sticky: el hero se queda fijo y el fondo inferior sube tapándolo */}
          <div className="relative h-[200dvh]">
            <div className="sticky top-0 h-dvh w-full overflow-hidden z-10">
              <HeroSection
                menuAnchorId="menu"
                cateringHref="#catering"
                shouldAnimateIn={isLoaded}
              />
            </div>
          </div>

          {/* El fondo inferior que sube y tapa el hero */}
          <div className="relative z-20 -mt-[100dvh] bg-cream-bg shadow-[0_-24px_50px_rgba(20,18,16,0.14)] border-t border-charcoal-ink/10">
            {/* Fase 5: El Elemento Estrella: Deconstrucción en Scroll (CubanDeconstruction) */}
            <CubanDeconstruction />

            {/* Transición 1: Onda Orgánica Jelly (Criollo Cream -> Mojo Scarlet) con stickers de guarnición */}
            <JellyWaveTransition
              topColor="#F2ECE1"
              bottomColor="#C41B0E"
              direction="down"
              showGarnish
            />

            {/* Selección de la Plancha: 6 Platos Estelares Curados (Mojo Scarlet Live-Fire Section) */}
            <CuratedMenu />

            {/* Transición 2: Onda Orgánica Jelly (Mojo Scarlet -> Criollo Cream) */}
            <JellyWaveTransition
              topColor="#C41B0E"
              bottomColor="#F2ECE1"
              direction="up"
            />

            <section id="menu" className="scroll-mt-[124px] lg:scroll-mt-[144px]">
              <CravStyleMenuGrid onSelect={setSelected} />
            </section>

            {/* Testimonios de clientes con enlace a las reseñas reales de Google Maps */}
            <GoogleReviewsSection />

            <section
              id="catering"
              className="scroll-mt-[124px] lg:scroll-mt-[144px] bg-transparent px-4 py-16 sm:px-6 lg:px-8"
            >
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="font-display text-4xl sm:text-6xl font-black tracking-tight uppercase text-charcoal-ink leading-none">
                  Authentic Criollo Catering for your next celebration
                </h2>
                <p className="mx-auto mt-3 max-w-2xl font-sans text-base text-charcoal-ink/80 leading-relaxed">
                  Family-style bandejas, live pressed Cubano stations, and hot cafecito for
                  corporate offices, weddings, and quinces. Booked with 48h notice.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <a
                    href="tel:+13055550123"
                    className="inline-flex min-h-11 items-center gap-2.5 rounded-none bg-brand-fire px-8 py-4 font-sans text-sm sm:text-base font-bold uppercase tracking-wider text-cream-bg hover:bg-charcoal-ink transition-colors cursor-pointer select-none"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    <span>Talk to Catering Team: (305) 555-0123</span>
                  </a>
                </div>
                <p className="mt-4 font-sans text-sm font-semibold text-charcoal-ink/70 uppercase tracking-wider">
                  Serving Little Havana, Brickell, Doral &amp; greater Miami-Dade, instant quotes al momento
                </p>
              </div>
            </section>

            {/* Transición hacia el Footer Rojo Mojo Scarlet */}
            <JellyWaveTransition
              topColor="#F2ECE1"
              bottomColor="#C41B0E"
              direction="down"
            />

            {/* Editorial Footer de Alto Impacto */}
            <EditorialFooter onOpenCart={openCart} />
          </div>
        </main>

        <QuickOrderModal item={selected} onClose={() => setSelected(null)} />
        <CartSheet />
        <CartToast />
        <MobileActionBar onOpenCart={openCart} />
      </div>
    </>
  );
}
