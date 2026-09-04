import { TopMarquee, Navbar, HeroSection } from '../components/hero';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C1917]">
      {/* 1. Top Marquee (Ticker continuo infinito) */}
      <TopMarquee variant="terracotta" />

      {/* 2. Navbar Dinámico Translúcido con Blur */}
      <Navbar />

      {/* 3. Hero Section (Composición interactiva inspirada en CRAV + Producto Central) */}
      <HeroSection />

      {/* Anclas de navegación de soporte para el menú */}
      <section id="menu" className="border-t border-[#EAE5DC] bg-white py-16 text-center">
        <div className="mx-auto max-w-4xl px-4">
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-[#D95327]">
            Nuestros Favoritos
          </span>
          <h2 className="mt-2 font-serif text-3xl font-bold text-[#1C1917]">
            Bowls Criollos & Sándwiches Prensados
          </h2>
          <p className="mt-2 text-sm text-[#78716C]">
            Preparados al momento con mojo de naranja agria, ajo natural y especias cubanas.
          </p>
        </div>
      </section>
    </main>
  );
}
