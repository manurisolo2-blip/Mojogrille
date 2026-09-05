'use client';

import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Preloader } from '../components/Preloader';
import { CartDrawer } from '../components/CartDrawer';
import { Navbar } from '../components/hero/Navbar';
import { HeroSection } from '../components/HeroSection';
import { CubanDeconstruction } from '../components/CubanDeconstruction';
import { CuratedMenu } from '../components/CuratedMenu';
import { DistrictsCatering } from '../components/DistrictsCatering';
import { EditorialFooter } from '../components/EditorialFooter';
import { FloatingCravBar } from '../components/menu/FloatingCravBar';
import { NoiseOverlay } from '../components/NoiseOverlay';

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Refresco de ScrollTrigger al completar la carga de todas las imágenes del DOM
  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // 1. Refresco inicial
    ScrollTrigger.refresh();

    // 2. Monitorear carga individual de todas las imágenes del DOM
    const images = Array.from(document.querySelectorAll('img'));
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
          img.addEventListener('load', handleImageComplete, { once: true });
          img.addEventListener('error', handleImageComplete, { once: true });
        }
      });
    }

    // 3. Listener global a la carga completa de ventana y fallback de seguridad
    const handleWindowLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('load', handleWindowLoad);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 450);

    return () => {
      window.removeEventListener('load', handleWindowLoad);
      clearTimeout(timer);
    };
  }, []);

  return (
    <main className="min-h-screen bg-cream-canvas text-charcoal-ink select-none overflow-x-hidden">
      {/* 1. Preloader Editorial con salida de cortina cinematográfica GSAP */}
      <Preloader onComplete={() => setIsLoaded(true)} />

      {/* 2. Cart Drawer: Panel lateral transaccional nativo */}
      <CartDrawer />

      {/* Textura de grano de papel artesanal editorial */}
      <NoiseOverlay />

      {/* Barra de navegación superior fija translúcida con blur */}
      <Navbar />

      {/* 3. Hero Section interactivo con magnetic CTAs y producto insignia */}
      <HeroSection shouldAnimateIn={isLoaded} />

      {/* 4. Cuban Deconstruction: Deconstrucción en scroll de 5 capas con scrub GSAP */}
      <CubanDeconstruction />

      {/* 6. Curated Menu: Selección de la plancha con 6 platos estelares y badges técnicos */}
      <CuratedMenu />

      {/* 7. Districts Catering: Packaging térmico de autor y catering por distritos */}
      <DistrictsCatering />

      {/* 8. Editorial Footer: Titular monumental, 3 columnas y botón magnético 'Volver Arriba' */}
      <EditorialFooter />

      {/* Barra flotante mobile para conversión rápida */}
      <FloatingCravBar />
    </main>
  );
}
