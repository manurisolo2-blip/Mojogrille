'use client';

import { useState } from 'react';
import { TopMarquee, Navbar, HeroSection } from '../components/hero';
import { CubanDeconstruction } from '../components/CubanDeconstruction';
import { CuratedMenu } from '../components/CuratedMenu';
import { CravStyleMenuGrid, FloatingCravBar } from '../components/menu';
import { DistrictsCatering } from '../components/DistrictsCatering';
import { Preloader } from '../components/preloader';
import { CartDrawer } from '../components/CartDrawer';

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <main className="min-h-screen bg-cream-bg text-charcoal-ink">
      {/* 0. Preloader Editorial & Inicialización Cinematográfica */}
      <Preloader onComplete={() => setIsLoaded(true)} />

      {/* 1. Top Marquee (Ticker continuo infinito) */}
      <TopMarquee variant="terracotta" />

      {/* 2. Navbar Dinámico Translúcido con Blur */}
      <Navbar />

      {/* 3. Hero Section (Composición interactiva inspirada en CRAV + Producto Central) */}
      <HeroSection />

      {/* 3.5. Fase 5: El Elemento Estrella — Deconstrucción en Scroll (CubanDeconstruction) */}
      <CubanDeconstruction />

      {/* 3.8. Selección de la Plancha — 6 Platos Estelares Curados */}
      <CuratedMenu />

      {/* 4. Catálogo Interactivo de Menú estilo CRAV */}
      <section id="menu" className="border-t border-charcoal-ink/10">
        <CravStyleMenuGrid />
      </section>

      {/* 4.5. Packaging Térmico de Autor & Catering para Distritos */}
      <DistrictsCatering />

      {/* 5. Barra flotante mobile */}
      <FloatingCravBar />

      {/* 6. Panel lateral transaccional nativo (CartDrawer) */}
      <CartDrawer />
    </main>
  );
}
