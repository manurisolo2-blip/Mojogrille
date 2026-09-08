import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { InkStamp } from "./InkStamp";

interface IngredientCalloutProps {
  name: string;
  detail: string;
  side?: "left" | "right";
}

function IngredientCallout({ name, detail, side = "right" }: IngredientCalloutProps) {
  const isLeft = side === "left";

  return (
    <div
      className={`ingredient-callout ${
        isLeft ? "ingredient-callout-left" : "ingredient-callout-right"
      } absolute ${
        isLeft
          ? "right-[78%] sm:right-[82%] md:right-[85%]"
          : "left-[78%] sm:left-[82%] md:left-[85%]"
      } top-1/2 -translate-y-1/2 flex items-center gap-2 sm:gap-3 pointer-events-auto select-none whitespace-nowrap opacity-90 will-change-transform z-30`}
    >
      {isLeft ? (
        <>
          {/* Ficha Tipográfica Izquierda (Alineada a la derecha) */}
          <div className="flex flex-col text-right items-end pr-0.5 sm:pr-1">
            <span className="font-display text-xs sm:text-base md:text-lg lg:text-xl font-bold uppercase tracking-tight text-charcoal-ink leading-tight">
              {name}
            </span>
            <span className="font-sans text-[8px] sm:text-[9px] md:text-[11px] font-semibold uppercase tracking-wider text-charcoal-ink/75 leading-none mt-0.5">
              {detail}
            </span>
          </div>

          {/* Línea Recta y Punto Conector Izquierdo */}
          <div className="flex items-center">
            <span
              className="h-[1.5px] sm:h-[2px] w-6 sm:w-12 md:w-16 lg:w-24 bg-brand-fire inline-block shrink-0 opacity-90"
              aria-hidden="true"
            />
            <span
              className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-brand-fire inline-block shrink-0 shadow-sm"
              aria-hidden="true"
            />
          </div>
        </>
      ) : (
        <>
          {/* Línea Recta y Punto Conector Derecho */}
          <div className="flex items-center">
            <span
              className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-brand-fire inline-block shrink-0 shadow-sm"
              aria-hidden="true"
            />
            <span
              className="h-[1.5px] sm:h-[2px] w-6 sm:w-12 md:w-16 lg:w-24 bg-brand-fire inline-block shrink-0 opacity-90"
              aria-hidden="true"
            />
          </div>

          {/* Ficha Tipográfica Derecha (Alineada a la izquierda) */}
          <div className="flex flex-col text-left items-start pl-0.5 sm:pl-1">
            <span className="font-display text-xs sm:text-base md:text-lg lg:text-xl font-bold uppercase tracking-tight text-charcoal-ink leading-tight">
              {name}
            </span>
            <span className="font-sans text-[8px] sm:text-[9px] md:text-[11px] font-semibold uppercase tracking-wider text-charcoal-ink/75 leading-none mt-0.5">
              {detail}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export function CubanDeconstruction() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const topBreadRef = useRef<HTMLDivElement>(null);
  const picklesRef = useRef<HTMLDivElement>(null);
  const cheeseRef = useRef<HTMLDivElement>(null);
  const mojoPorkRef = useRef<HTMLDivElement>(null);
  const bottomBreadRef = useRef<HTMLDivElement>(null);

  const loadedImagesCountRef = useRef(0);
  const TOTAL_LAYERS = 5;

  const handleLayerImageLoad = () => {
    loadedImagesCountRef.current += 1;
    if (loadedImagesCountRef.current >= TOTAL_LAYERS) {
      ScrollTrigger.refresh();
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.matchMedia({
      // 1. Escritorio (min-width: 1024px): separación amplia garantizada sin ninguna superposición
      "(min-width: 1024px)": function () {
        // Inicializar cada capa en su posición ya separada para garantizar CERO superposición
        gsap.set(topBreadRef.current, { y: -240, rotate: -1 });
        gsap.set(picklesRef.current, { y: -120, rotate: 1.5 });
        gsap.set(cheeseRef.current, { y: 0, rotate: -0.5 });
        gsap.set(mojoPorkRef.current, { y: 120, rotate: 1 });
        gsap.set(bottomBreadRef.current, { y: 240, rotate: -1 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            pin: pinRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2,
          },
        });

        tl.to(
          topBreadRef.current,
          {
            y: -290,
            rotate: -2.5,
            ease: "power1.out",
          },
          0
        )
          .to(
            picklesRef.current,
            {
              y: -145,
              rotate: 2.5,
              ease: "power1.out",
            },
            0
          )
          .to(
            cheeseRef.current,
            {
              y: 0,
              rotate: -1,
              ease: "power1.out",
            },
            0
          )
          .to(
            mojoPorkRef.current,
            {
              y: 145,
              rotate: 1.5,
              ease: "power1.out",
            },
            0
          )
          .to(
            bottomBreadRef.current,
            {
              y: 290,
              rotate: -2,
              ease: "power1.out",
            },
            0
          )
          .fromTo(
            ".ingredient-callout-right",
            {
              opacity: 0.7,
              x: -15,
            },
            {
              opacity: 1,
              x: 0,
              stagger: 0.03,
              ease: "power1.out",
            },
            0
          )
          .fromTo(
            ".ingredient-callout-left",
            {
              opacity: 0.7,
              x: 15,
            },
            {
              opacity: 1,
              x: 0,
              stagger: 0.03,
              ease: "power1.out",
            },
            0
          );

        return () => {
          tl.kill();
        };
      },

      // 2. Móviles y tabletas (max-width: 1023px): separación adaptada para pantallas compactas
      "(max-width: 1023px)": function () {
        gsap.set(topBreadRef.current, { y: -180, rotate: -1 });
        gsap.set(picklesRef.current, { y: -90, rotate: 1 });
        gsap.set(cheeseRef.current, { y: 0, rotate: -0.5 });
        gsap.set(mojoPorkRef.current, { y: 90, rotate: 1 });
        gsap.set(bottomBreadRef.current, { y: 180, rotate: -1 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            pin: pinRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2,
          },
        });

        tl.to(
          topBreadRef.current,
          {
            y: -215,
            rotate: -2,
            ease: "power1.out",
          },
          0
        )
          .to(
            picklesRef.current,
            {
              y: -105,
              rotate: 2,
              ease: "power1.out",
            },
            0
          )
          .to(
            cheeseRef.current,
            {
              y: 0,
              ease: "power1.out",
            },
            0
          )
          .to(
            mojoPorkRef.current,
            {
              y: 105,
              rotate: 1,
              ease: "power1.out",
            },
            0
          )
          .to(
            bottomBreadRef.current,
            {
              y: 215,
              rotate: -1.5,
              ease: "power1.out",
            },
            0
          )
          .fromTo(
            ".ingredient-callout-right",
            {
              opacity: 0.7,
              x: -10,
            },
            {
              opacity: 1,
              x: 0,
              stagger: 0.03,
              ease: "power1.out",
            },
            0
          )
          .fromTo(
            ".ingredient-callout-left",
            {
              opacity: 0.7,
              x: 10,
            },
            {
              opacity: 1,
              x: 0,
              stagger: 0.03,
              ease: "power1.out",
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

    if (document.readyState === "complete") {
      ScrollTrigger.refresh();
    } else {
      window.addEventListener("load", handleWindowLoad);
    }

    const timer1 = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    const timer2 = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener("load", handleWindowLoad);
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
      aria-label="Interactive Deconstruction of the Mojo Grille Cuban Sandwich"
      className="relative h-[180vh] bg-transparent border-b border-charcoal-ink/10 select-none overflow-x-clip"
    >
      <div
        ref={pinRef}
        className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-visible px-4 sm:px-8 relative"
      >
        {/* Tipografía Monumental Marca de Agua (Watermark) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden z-0 select-none opacity-40"
        >
          <span className="font-display text-[26vw] font-black uppercase tracking-tight text-charcoal-ink/5 leading-none select-none">
            ASADO
          </span>
        </div>

        {/* Sello de Tinta Real Artesanal */}
        <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 z-30 hidden md:inline-flex">
          <InkStamp size={135} />
        </div>

        {/* Encabezado Superior de Sección en Inglés */}
        <div className="absolute top-4 sm:top-8 left-0 right-0 text-center px-4 pointer-events-none z-10">
          <h3 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-charcoal-ink mt-0.5 sm:mt-1">
            THE UNFORGIVING CUBANO
          </h3>
          <p className="font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-charcoal-ink/75 mt-1">
            SCROLL TO DECONSTRUCT EVERY LAYER PRESSED AL MOMENTO
          </p>
        </div>

        {/* Contenedor central de capas apiladas con generoso espaciado sin superposición */}
        <div className="relative w-full max-w-[1600px] px-4 sm:px-8 flex items-center justify-center pt-6 sm:pt-10">
          <div className="relative w-[280px] h-[360px] sm:w-[360px] sm:h-[440px] md:w-[460px] md:h-[520px] lg:w-[520px] lg:h-[600px] flex items-center justify-center overflow-visible mx-auto">
            {/* Sombra de Contacto Dinámica en el Piso */}
            <div
              className="absolute -bottom-6 sm:-bottom-10 w-[65%] max-w-[380px] h-5 sm:h-7 rounded-[100%] bg-charcoal-ink/15 blur-xl pointer-events-none animate-sandwich-shadow"
              aria-hidden="true"
            />

            {/* Envoltorio Flotante Suave (Sin transform-style: preserve-3d para eliminar recortes o superposiciones) */}
            <div className="relative w-full h-full flex items-center justify-center animate-sandwich-float will-change-transform">
              {/* Capa 1: Tapa superior de pan cubano (DERECHA) */}
              <div
                ref={topBreadRef}
                className="absolute inset-0 flex items-center justify-center will-change-transform z-50 pointer-events-none overflow-visible"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src="/sandwich/01-top-bread.webp"
                    alt="Toasted artisanal Cuban bread top crust"
                    width={1000}
                    height={545}
                    loading="eager"
                    onLoad={handleLayerImageLoad}
                    className="w-full max-w-[240px] sm:max-w-[300px] md:max-w-[360px] lg:max-w-[400px] max-h-[85px] sm:max-h-[105px] md:max-h-[120px] object-contain select-none drop-shadow-md"
                  />
                  <IngredientCallout
                    name="ARTISANAL TOP CRUST"
                    detail="Golden Griddled Cuban Bread"
                    side="right"
                  />
                </div>
              </div>

              {/* Capa 2: Pepinillos encurtidos y mostaza criolla (IZQUIERDA) */}
              <div
                ref={picklesRef}
                className="absolute inset-0 flex items-center justify-center will-change-transform z-40 pointer-events-none overflow-visible"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src="/sandwich/02-pickles.webp"
                    alt="Tangy dill pickles and yellow mustard slices"
                    width={1000}
                    height={545}
                    loading="eager"
                    onLoad={handleLayerImageLoad}
                    className="w-full max-w-[220px] sm:max-w-[280px] md:max-w-[330px] lg:max-w-[370px] max-h-[85px] sm:max-h-[105px] md:max-h-[120px] object-contain select-none drop-shadow-md"
                  />
                  <IngredientCallout
                    name="CRISP PICKLES & MUSTARD"
                    detail="Crunchy Dill Spears & Yellow Mustard"
                    side="left"
                  />
                </div>
              </div>

              {/* Capa 3: Queso suizo fundido (DERECHA) */}
              <div
                ref={cheeseRef}
                className="absolute inset-0 flex items-center justify-center will-change-transform z-30 pointer-events-none overflow-visible"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src="/sandwich/03-melted-cheese.webp"
                    alt="Melted stretchy Swiss cheese"
                    width={1000}
                    height={545}
                    loading="eager"
                    onLoad={handleLayerImageLoad}
                    className="w-full max-w-[240px] sm:max-w-[300px] md:max-w-[360px] lg:max-w-[400px] max-h-[85px] sm:max-h-[105px] md:max-h-[120px] object-contain select-none drop-shadow-md"
                  />
                  <IngredientCallout
                    name="MELTED SWISS CHEESE"
                    detail="Plancha Melted & Stretchy"
                    side="right"
                  />
                </div>
              </div>

              {/* Capa 4: Pernil asado al mojo cítrico y jamón dulce (IZQUIERDA) */}
              <div
                ref={mojoPorkRef}
                className="absolute inset-0 flex items-center justify-center will-change-transform z-20 pointer-events-none overflow-visible"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src="/sandwich/04-mojo-pork.webp"
                    alt="Slow-roasted 4-hour citrus mojo pork and sweet cured ham"
                    width={1000}
                    height={545}
                    loading="eager"
                    onLoad={handleLayerImageLoad}
                    className="w-full max-w-[240px] sm:max-w-[300px] md:max-w-[360px] lg:max-w-[400px] max-h-[85px] sm:max-h-[105px] md:max-h-[120px] object-contain select-none drop-shadow-md"
                  />
                  <IngredientCallout
                    name="CITRUS MOJO ROAST PORK"
                    detail="Slow-Roasted 4h in Sour Orange & Garlic"
                    side="left"
                  />
                </div>
              </div>

              {/* Capa 5: Tapa inferior de pan cubano prensado (DERECHA) */}
              <div
                ref={bottomBreadRef}
                className="absolute inset-0 flex items-center justify-center will-change-transform z-10 pointer-events-none overflow-visible"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src="/sandwich/05-bottom-bread.webp"
                    alt="Bottom crust of plancha-pressed Cuban bread"
                    width={1000}
                    height={545}
                    loading="eager"
                    onLoad={handleLayerImageLoad}
                    className="w-full max-w-[240px] sm:max-w-[300px] md:max-w-[360px] lg:max-w-[400px] max-h-[85px] sm:max-h-[105px] md:max-h-[120px] object-contain select-none drop-shadow-md"
                  />
                  <IngredientCallout
                    name="CRUNCHY PLANCHA BASE"
                    detail="Toasted with Rich Griddle Juices"
                    side="right"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botón Flotante para Ordenar el Cubano en Inglés */}
        <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 z-30 flex items-center">
          <a
            href="#curated-menu"
            className="bg-charcoal-ink hover:bg-brand-fire text-cream-bg py-3 px-5 sm:px-6 text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-3 rounded-none cursor-pointer group shadow-none"
          >
            <span className="flex items-center gap-2">
              <span>ORDER LIVE-FIRE</span>
              <span className="transition-transform group-hover:translate-x-1">➔</span>
            </span>
            <span className="h-3 w-px bg-cream-bg/30" />
            <span className="font-sans text-xs font-black tracking-tight text-cream-bg">
              $12.95
            </span>
          </a>
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
