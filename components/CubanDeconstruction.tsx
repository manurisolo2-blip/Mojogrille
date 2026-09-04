'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flame, Clock, Award, Sparkles } from 'lucide-react';

export function CubanDeconstruction() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const topBreadRef = useRef<HTMLDivElement>(null);
  const picklesRef = useRef<HTMLDivElement>(null);
  const cheeseRef = useRef<HTMLDivElement>(null);
  const mojoPorkRef = useRef<HTMLDivElement>(null);
  const bottomBreadRef = useRef<HTMLDivElement>(null);
  const sideCardRef = useRef<HTMLDivElement>(null);

  const loadedImagesCountRef = useRef(0);
  const TOTAL_LAYERS = 5;

  const handleLayerImageLoad = () => {
    loadedImagesCountRef.current += 1;
    if (loadedImagesCountRef.current >= TOTAL_LAYERS) {
      ScrollTrigger.refresh();
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Configurar inclinación inicial 3D en las tapas de los panes
      gsap.set([topBreadRef.current, bottomBreadRef.current], {
        rotateX: 20,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: pinRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });

      // 1. Deconstrucción vertical de capas con perspectiva tridimensional
      tl.to(
        topBreadRef.current,
        {
          y: -220,
          rotate: -3,
          rotateX: 20,
          ease: 'power1.out',
        },
        0
      )
        .to(
          picklesRef.current,
          {
            y: -110,
            rotate: 4,
            ease: 'power1.out',
          },
          0
        )
        .to(
          cheeseRef.current,
          {
            y: -30,
            rotate: -1,
            ease: 'power1.out',
          },
          0
        )
        .to(
          mojoPorkRef.current,
          {
            y: 50,
            scale: 1.08,
            ease: 'power1.out',
          },
          0
        )
        .to(
          bottomBreadRef.current,
          {
            y: 190,
            rotate: 1,
            rotateX: 20,
            ease: 'power1.out',
          },
          0
        )
        // 2. Entrada suave sincronizada de la tarjeta lateral (opacidad + traslación en X)
        .fromTo(
          sideCardRef.current,
          {
            opacity: 0,
            x: 80,
          },
          {
            opacity: 1,
            x: 0,
            ease: 'power2.out',
          },
          0
        );
    }, containerRef);

    const handleWindowLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('load', handleWindowLoad);

    // Refresh tras montaje en caso de imágenes ya cacheadas en memoria
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', handleWindowLoad);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="cuban-deconstruction"
      aria-label="Deconstrucción interactiva del Sándwich Cubano Mojo Grille"
      className="relative h-[300vh] bg-cream-bg border-b border-charcoal-ink/10 select-none"
    >
      <div
        ref={pinRef}
        className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-8"
      >
        {/* Encabezado Superior de Sección */}
        <div className="absolute top-6 sm:top-10 left-0 right-0 text-center px-4 pointer-events-none z-10">
          <span className="font-sans text-[11px] font-bold uppercase tracking-widest text-brand-fire">
            ✦ Arquitectura Gastronómica Artesanal ✦
          </span>
          <h3 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-charcoal-ink mt-1">
            Anatomía del Cubano Prensado
          </h3>
          <p className="font-accent italic text-lg sm:text-2xl text-charcoal-ink/80 lowercase mt-0.5">
            desplaza para deconstruir cada capa de sabor criollo al momento
          </p>
        </div>

        {/* Contenedor central y tarjeta lateral en grid flexible */}
        <div className="relative w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-16 pt-8 md:pt-0">
          
          {/* Contenedor central cuadrado de capas apiladas con perspectiva CSS */}
          <div
            className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] md:w-[500px] md:h-[500px] flex items-center justify-center [perspective:1000px] [transform-style:preserve-3d]"
            style={{ perspective: '1000px' }}
          >
            
            {/* Capa 1: Tapa superior de pan cubano (rotateX 20deg) */}
            <div
              ref={topBreadRef}
              className="absolute inset-0 flex items-center justify-center will-change-transform z-50 pointer-events-none"
              style={{ willChange: 'transform', transform: 'rotateX(20deg)', transformStyle: 'preserve-3d' }}
            >
              <Image
                src="/sandwich/01-top-bread.webp"
                alt="Tapa superior de pan cubano tostado"
                width={1000}
                height={545}
                priority
                onLoad={handleLayerImageLoad}
                className="w-full h-auto object-contain drop-shadow-[0_25px_25px_rgba(20,18,16,0.25)] select-none"
              />
            </div>

            {/* Capa 2: Pepinillos encurtidos y mostaza criolla */}
            <div
              ref={picklesRef}
              className="absolute inset-0 flex items-center justify-center will-change-transform z-40 pointer-events-none"
              style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}
            >
              <Image
                src="/sandwich/02-pickles.webp"
                alt="Láminas de pepinillo dill encurtido y mostaza criolla"
                width={1000}
                height={545}
                priority
                onLoad={handleLayerImageLoad}
                className="w-full h-auto object-contain drop-shadow-[0_25px_25px_rgba(20,18,16,0.25)] select-none"
              />
            </div>

            {/* Capa 3: Queso suizo fundido */}
            <div
              ref={cheeseRef}
              className="absolute inset-0 flex items-center justify-center will-change-transform z-30 pointer-events-none"
              style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}
            >
              <Image
                src="/sandwich/03-melted-cheese.webp"
                alt="Queso suizo fundido y elástico"
                width={1000}
                height={545}
                priority
                onLoad={handleLayerImageLoad}
                className="w-full h-auto object-contain drop-shadow-[0_25px_25px_rgba(20,18,16,0.25)] select-none"
              />
            </div>

            {/* Capa 4: Pernil asado al mojo cítrico y jamón dulce */}
            <div
              ref={mojoPorkRef}
              className="absolute inset-0 flex items-center justify-center will-change-transform z-20 pointer-events-none"
              style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}
            >
              <Image
                src="/sandwich/04-mojo-pork.webp"
                alt="Pernil de cerdo asado 4 horas al mojo cítrico y jamón dulce"
                width={1000}
                height={545}
                priority
                onLoad={handleLayerImageLoad}
                className="w-full h-auto object-contain drop-shadow-[0_25px_25px_rgba(20,18,16,0.25)] select-none"
              />
            </div>

            {/* Capa 5: Tapa inferior de pan cubano prensado (rotateX 20deg) */}
            <div
              ref={bottomBreadRef}
              className="absolute inset-0 flex items-center justify-center will-change-transform z-10 pointer-events-none"
              style={{ willChange: 'transform', transform: 'rotateX(20deg)', transformStyle: 'preserve-3d' }}
            >
              <Image
                src="/sandwich/05-bottom-bread.webp"
                alt="Tapa inferior de pan cubano prensado"
                width={1000}
                height={545}
                priority
                onLoad={handleLayerImageLoad}
                className="w-full h-auto object-contain drop-shadow-[0_25px_25px_rgba(20,18,16,0.25)] select-none"
              />
            </div>

          </div>

          {/* Tarjeta lateral flotante editorial (estilo CRAV Burgers) */}
          <div
            ref={sideCardRef}
            className="w-full max-w-xs sm:max-w-sm rounded-3xl bg-surface-sand/90 backdrop-blur-md p-6 border border-charcoal-ink/10 shadow-[0_20px_45px_-12px_rgba(20,18,16,0.18)] will-change-transform z-40 transition-shadow hover:shadow-2xl"
          >
            {/* Etiqueta roja CRAV Style */}
            <div className="inline-flex items-center gap-1.5 rounded-md bg-brand-fire px-2.5 py-1 text-[10px] font-sans font-bold uppercase tracking-widest text-cream-bg shadow-xs">
              <Flame className="h-3 w-3" />
              <span>ANATOMÍA DEL CLÁSICO</span>
            </div>

            {/* Título Display */}
            <h4 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-charcoal-ink mt-3 leading-none">
              PERNIL AL MOJO CRIOLLO
            </h4>

            {/* Subtítulo Cursivo */}
            <p className="font-accent italic text-lg text-brand-fire lowercase mt-1">
              slow-roasted pork &amp; swiss melt
            </p>

            {/* Descripción Sensorial */}
            <p className="font-sans text-xs sm:text-sm text-charcoal-ink/80 mt-2.5 leading-relaxed">
              Carne de cerdo marinada durante 24 horas en naranja agria, ajo confitado, comino y orégano silvestre. Horneada a fuego lento durante 4 horas hasta deshebrarse sobre jamón glaseado, queso suizo fundido y pepinillos crujientes en pan artesanal prensado al momento.
            </p>

            {/* Badges de Cocción y Nutricionales */}
            <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-charcoal-ink/10">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-charcoal-ink/10 px-3 py-1 font-sans text-xs font-bold text-charcoal-ink">
                <Clock className="h-3 w-3 text-brand-fire" />
                4-HOUR SLOW ROASTED
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-charcoal-ink/10 px-3 py-1 font-sans text-xs font-bold text-charcoal-ink">
                <Award className="h-3 w-3 text-leaf-green" />
                42G PROTEIN
              </span>

              <span className="inline-flex items-center gap-1 rounded-full bg-leaf-green/15 px-3 py-1 font-sans text-[11px] font-bold text-leaf-green">
                <Sparkles className="h-3 w-3" />
                100% ARTESANAL
              </span>
            </div>
          </div>

        </div>

        {/* Indicador de scroll */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-charcoal-ink/60 font-sans text-xs tracking-wider uppercase font-semibold pointer-events-none">
          <span className="animate-bounce">↓</span>
          <span>Desplaza para deconstruir</span>
        </div>
      </div>
    </section>
  );
}

export default CubanDeconstruction;
