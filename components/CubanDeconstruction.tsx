'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flame, Clock, Award, Sparkles } from 'lucide-react';
import { TapeLabel } from './TapeLabel';
import { InkStamp } from './InkStamp';

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

    // ScrollTrigger.matchMedia para adaptar la animación según el ancho de viewport
    ScrollTrigger.matchMedia({
      // 1. Escritorio (min-width: 1024px): separación completa con tarjeta lateral flotante a la derecha
      '(min-width: 1024px)': function () {
        gsap.set([topBreadRef.current, bottomBreadRef.current], {
          rotateX: 20,
          transformPerspective: 1000,
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

        return () => {
          tl.kill();
        };
      },

      // 2. Móviles y tabletas (max-width: 1023px): reducción de desplazamientos Y en un 40% y entrada vertical
      '(max-width: 1023px)': function () {
        gsap.set([topBreadRef.current, bottomBreadRef.current], {
          rotateX: 16,
          transformPerspective: 1000,
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

        // Desplazamientos reducidos 40% (-220 -> -132, -110 -> -66, -30 -> -18, 50 -> 30, 190 -> 114)
        tl.to(
          topBreadRef.current,
          {
            y: -132,
            rotate: -2,
            rotateX: 16,
            ease: 'power1.out',
          },
          0
        )
          .to(
            picklesRef.current,
            {
              y: -66,
              rotate: 3,
              ease: 'power1.out',
            },
            0
          )
          .to(
            cheeseRef.current,
            {
              y: -18,
              rotate: -1,
              ease: 'power1.out',
            },
            0
          )
          .to(
            mojoPorkRef.current,
            {
              y: 30,
              scale: 1.05,
              ease: 'power1.out',
            },
            0
          )
          .to(
            bottomBreadRef.current,
            {
              y: 114,
              rotate: 1,
              rotateX: 16,
              ease: 'power1.out',
            },
            0
          )
          .fromTo(
            sideCardRef.current,
            {
              opacity: 0,
              y: 35,
            },
            {
              opacity: 1,
              y: 0,
              ease: 'power2.out',
            },
            0
          );

        return () => {
          tl.kill();
        };
      },
    });

    // Listener de carga de ventana para refrescar ScrollTrigger
    const handleWindowLoad = () => {
      ScrollTrigger.refresh();
    };

    if (document.readyState === 'complete') {
      ScrollTrigger.refresh();
    } else {
      window.addEventListener('load', handleWindowLoad);
    }

    // Doble verificación con temporizadores para refrescar tras hidratación
    const timer1 = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    const timer2 = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('load', handleWindowLoad);
      ScrollTrigger.clearMatchMedia();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === containerRef.current) {
          t.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="cuban-deconstruction"
      aria-label="Deconstrucción interactiva del Sándwich Cubano Mojo Grille"
      className="relative h-[300vh] bg-transparent border-b border-charcoal-ink/10 select-none overflow-x-clip"
    >
      <div
        ref={pinRef}
        className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-visible px-4 sm:px-8"
      >
        {/* Etiqueta tipo cinta adhesiva en la esquina de la deconstrucción */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-8 z-30 pointer-events-none">
          <TapeLabel>24H CITRUS MARINADE · SLOW ROASTED</TapeLabel>
        </div>

        {/* Sello de Tinta Real Artesanal */}
        <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 z-30 hidden md:inline-flex">
          <InkStamp size={135} />
        </div>

        {/* Encabezado Superior de Sección */}
        <div className="absolute top-4 sm:top-8 left-0 right-0 text-center px-4 pointer-events-none z-10">
          <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-brand-fire">
            ANATOMY OF A CLASSIC · PRESSED HOT
          </span>
          <h3 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-charcoal-ink mt-0.5 sm:mt-1">
            THE UNFORGIVING CUBANO
          </h3>
          <p className="font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-charcoal-ink/75 mt-1">
            SCROLL TO DECONSTRUCT EVERY LAYER · PRESSED AL MOMENTO
          </p>
        </div>

        {/* Contenedor central y tarjeta lateral/inferior con layout adaptable */}
        <div className="relative w-full max-w-[1600px] px-4 sm:px-8 flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-14 pt-12 sm:pt-16 lg:pt-0">
          
          {/* Contenedor central de capas apiladas con perspectiva CSS y overflow visible */}
          <div
            className="relative w-[260px] h-[210px] sm:w-[340px] sm:h-[280px] md:w-[420px] md:h-[360px] lg:w-[480px] lg:h-[460px] flex items-center justify-center overflow-visible [perspective:1000px]"
            style={{ perspective: '1000px' }}
          >
            
            {/* Capa 1: Tapa superior de pan cubano (rotateX 20deg) */}
            <div
              ref={topBreadRef}
              className="absolute inset-0 flex items-center justify-center will-change-transform z-50 pointer-events-none overflow-visible"
              style={{ willChange: 'transform', transform: 'rotateX(20deg)' }}
            >
              <Image
                src="/sandwich/01-top-bread.webp"
                alt="Toasted artisanal Cuban bread top crust"
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
              className="absolute inset-0 flex items-center justify-center will-change-transform z-40 pointer-events-none overflow-visible"
              style={{ willChange: 'transform' }}
            >
              <Image
                src="/sandwich/02-pickles.webp"
                alt="Tangy dill pickles and yellow mustard slices"
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
              className="absolute inset-0 flex items-center justify-center will-change-transform z-30 pointer-events-none overflow-visible"
              style={{ willChange: 'transform' }}
            >
              <Image
                src="/sandwich/03-melted-cheese.webp"
                alt="Melted stretchy Swiss cheese"
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
              className="absolute inset-0 flex items-center justify-center will-change-transform z-20 pointer-events-none overflow-visible"
              style={{ willChange: 'transform' }}
            >
              <Image
                src="/sandwich/04-mojo-pork.webp"
                alt="Slow-roasted 4-hour citrus mojo pork and sweet cured ham"
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
              className="absolute inset-0 flex items-center justify-center will-change-transform z-10 pointer-events-none overflow-visible"
              style={{ willChange: 'transform', transform: 'rotateX(20deg)' }}
            >
              <Image
                src="/sandwich/05-bottom-bread.webp"
                alt="Bottom crust of plancha-pressed Cuban bread"
                width={1000}
                height={545}
                priority
                onLoad={handleLayerImageLoad}
                className="w-full h-auto object-contain drop-shadow-[0_25px_25px_rgba(20,18,16,0.25)] select-none"
              />
            </div>

          </div>

          {/* Bloque editorial integrado al fondo crema (sin marco rígido ni elementos redondeados) */}
          <div
            ref={sideCardRef}
            className="w-[90%] max-w-sm lg:max-w-xs bg-transparent border-l-2 border-brand-fire pl-5 lg:pl-6 py-2 will-change-transform z-30 select-none mt-1 sm:mt-2 lg:mt-0"
          >
            {/* Etiqueta de corte editorial */}
            <div className="flex items-center gap-2 mb-1.5">
              <span className="h-1.5 w-1.5 rounded-none bg-brand-fire" aria-hidden="true" />
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-brand-fire">
                ANATOMY OF A CLASSIC
              </span>
            </div>

            {/* Título Display Monumental */}
            <h4 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-charcoal-ink leading-[0.9]">
              THE UNFORGIVING CUBANO
            </h4>

            {/* Subtítulo Editorial */}
            <p className="font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.12em] text-charcoal-ink/70 mt-1 mb-3">
              PRESSED BREAD · MOJO PERNIL · CALIBRATED TANG
            </p>

            {/* Puntos Clave de Calle / Comanda */}
            <div className="space-y-2.5 border-t border-charcoal-ink/15 pt-3">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-charcoal-ink bg-surface-sand px-2 py-0.5 border border-charcoal-ink/20">
                    BREAD
                  </span>
                  <span className="font-sans text-xs font-bold uppercase tracking-tight text-charcoal-ink">
                    Crusty &amp; Golden
                  </span>
                </div>
                <p className="font-sans text-[11px] sm:text-xs text-charcoal-ink/80 leading-snug mt-0.5">
                  Dense crumb. Plancha-pressed on hot cast iron until crackling crisp.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-cream-bg bg-brand-fire px-2 py-0.5">
                    MEAT
                  </span>
                  <span className="font-sans text-xs font-bold uppercase tracking-tight text-charcoal-ink">
                    Live-Fire Mojo Pernil
                  </span>
                </div>
                <p className="font-sans text-[11px] sm:text-xs text-charcoal-ink/80 leading-snug mt-0.5">
                  Basted in citrus mojo drippings and golden garlic on sizzling cast iron.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-charcoal-ink bg-surface-sand px-2 py-0.5 border border-charcoal-ink/20">
                    PICKLES
                  </span>
                  <span className="font-sans text-xs font-bold uppercase tracking-tight text-charcoal-ink">
                    Calibrated Tang
                  </span>
                </div>
                <p className="font-sans text-[11px] sm:text-xs text-charcoal-ink/80 leading-snug mt-0.5">
                  Crisp dill pickles calibrated to cut through the rich roasted pork.
                </p>
              </div>
            </div>

            {/* Ficha Técnica Integrada con Píldoras Estilo Crav */}
            <div className="mt-3.5 pt-2.5 border-t border-charcoal-ink/15 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-charcoal-ink/5 border border-charcoal-ink/10 text-charcoal-ink text-xs font-bold uppercase tracking-wider rounded-full">
                <Clock className="h-3 w-3 text-brand-fire" aria-hidden="true" />
                4H ROASTED
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-charcoal-ink/5 border border-charcoal-ink/10 text-charcoal-ink text-xs font-bold uppercase tracking-wider rounded-full">
                <Award className="h-3 w-3 text-leaf-green" aria-hidden="true" />
                LECHÓN CRIOLLO
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-leaf-green/10 border border-leaf-green/30 text-leaf-green text-xs font-bold uppercase tracking-wider rounded-full">
                <Sparkles className="h-3 w-3 text-leaf-green" aria-hidden="true" />
                100% ARTISANAL
              </span>
            </div>

            {/* Enlace CTA sutil */}
            <div className="mt-3.5 pt-1">
              <a
                href="#curated-menu"
                className="inline-flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-brand-fire hover:text-charcoal-ink transition-colors group cursor-pointer"
              >
                <span>ORDER HOT</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>

        </div>

        {/* Indicador de scroll */}
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-charcoal-ink/60 font-sans text-[10px] sm:text-xs tracking-wider uppercase font-semibold pointer-events-none">
          <span className="animate-bounce">↓</span>
          <span>Scroll to deconstruct</span>
        </div>
      </div>
    </section>
  );
}

export default CubanDeconstruction;
