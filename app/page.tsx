'use client';

import { useState } from 'react';
import { TopMarquee, Navbar, HeroSection } from '../components/hero';
import { CravStyleMenuGrid } from '../components/menu';
import { Preloader } from '../components/preloader';

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C1917]">
      {/* 0. Preloader Editorial & Inicialización Cinematográfica */}
      <Preloader onComplete={() => setIsLoaded(true)} />

      {/* 1. Top Marquee (Ticker continuo infinito) */}
      <TopMarquee variant="terracotta" />

      {/* 2. Navbar Dinámico Translúcido con Blur */}
      <Navbar />

      {/* 3. Hero Section (Composición interactiva inspirada en CRAV + Producto Central) */}
      <HeroSection />

      {/* 4. Catálogo Interactivo de Menú estilo CRAV */}
      <section id="menu" className="border-t border-[#EAE5DC]">
        <CravStyleMenuGrid />
      </section>
    </main>
  );
}
