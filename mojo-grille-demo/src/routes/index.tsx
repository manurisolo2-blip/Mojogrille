import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, MapPin, Phone } from "lucide-react";
import { CartProvider } from "@/components/mojo/cart";
import { TopBar } from "@/components/mojo/TopBar";
import { Hero } from "@/components/mojo/Hero";
import { CategoryTabs } from "@/components/mojo/CategoryTabs";
import { MenuGrid } from "@/components/mojo/MenuGrid";
import { QuickOrderModal } from "@/components/mojo/QuickOrderModal";
import { CartSheet } from "@/components/mojo/CartSheet";
import { MobileActionBar } from "@/components/mojo/MobileActionBar";
import { itemsForCategory, type CategoryId, type MenuItem } from "@/data/menu";

const title = "Mojo Grille | Cocina Cubana Artesanal en Miami";
const description =
  "Bowls criollos, sándwiches cubanos prensados y catering en Miami. Carnes marinadas 24h en mojo cítrico. Pide takeout o delivery en minutos.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "restaurant" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [category, setCategory] = useState<CategoryId>("favoritos");
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  const items = itemsForCategory(category);

  return (
    <CartProvider>
      <div className="min-h-dvh pb-24 md:pb-0">
        <TopBar onOpenCart={() => setCartOpen(true)} />
        <main>
          <Hero />

          <section id="menu" className="scroll-mt-32">
            <CategoryTabs active={category} onChange={setCategory} />
            <div className="mx-auto max-w-6xl px-4 py-8">
              <h2 className="text-2xl font-bold sm:text-3xl">Nuestro menú</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Preparado al instante. Recogida en 15 min o delivery en Miami.
              </p>
              <div className="mt-6">
                <MenuGrid items={items} onSelect={setSelected} />
              </div>
            </div>
          </section>

          <section
            id="catering"
            className="grain border-y border-border bg-accent/50 px-4 py-12"
          >
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold sm:text-4xl">
                Catering criollo para tu próxima celebración
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
                Bandejas familiares, estaciones de cubanos prensados y cafecito para
                oficinas, bodas y quinces. Reservamos con 48h de anticipación.
              </p>
              <a
                href="tel:+13055550123"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-lift transition-colors hover:bg-primary-hover"
              >
                <Phone className="h-5 w-5" />
                Hablar con catering
              </a>
            </div>
          </section>

          <footer className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:grid-cols-3">
            <div>
              <p className="font-display text-lg font-bold">MOJO GRILLE</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Cuban Kitchen · Miami, FL
              </p>
            </div>
            <p className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              1234 SW 8th St, Little Havana, Miami
            </p>
            <p className="flex items-start gap-2 text-sm text-muted-foreground">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              Lun–Dom · 11:00 AM – 10:00 PM
            </p>
          </footer>
        </main>

        <QuickOrderModal item={selected} onClose={() => setSelected(null)} />
        <CartSheet open={cartOpen} onClose={() => setCartOpen(false)} />
        <MobileActionBar onOpenCart={() => setCartOpen(true)} />
      </div>
    </CartProvider>
  );
}
