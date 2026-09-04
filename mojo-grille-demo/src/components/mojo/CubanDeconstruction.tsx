import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flame, Clock, Award, Sparkles } from "lucide-react";

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
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    // ScrollTrigger.matchMedia para adaptar la animación según el ancho de viewport
    ScrollTrigger.matchMedia({
      // 1. Escritorio (min-width: 1024px): separación completa con tarjeta lateral flotante a la derecha
      "(min-width: 1024px)": function () {
        gsap.set([topBreadRef.current, bottomBreadRef.current], {
          rotateX: 20,
          transformPerspective: 1000,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            pin: pinRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });

        tl.to(
          topBreadRef.current,
          {
            y: -220,
            rotate: -3,
            rotateX: 20,
            ease: "power1.out",
          },
          0
        )
          .to(
            picklesRef.current,
            {
              y: -110,
              rotate: 4,
              ease: "power1.out",
            },
            0
          )
          .to(
            cheeseRef.current,
            {
              y: -30,
              rotate: -1,
              ease: "power1.out",
            },
            0
          )
          .to(
            mojoPorkRef.current,
            {
              y: 50,
              scale: 1.08,
              ease: "power1.out",
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
              ease: "power2.out",
            },
            0
          )
          .to(
            bottomBreadRef.current,
            {
              y: 190,
              rotate: 1,
              rotateX: 20,
              ease: "power1.out",
            },
            0
          );

        return () => {
          tl.kill();
        };
      },

      // 2. Móviles y tabletas (max-width: 1023px): reducción de desplazamientos Y en un 40% y entrada vertical
      "(max-width: 1023px)": function () {
        gsap.set([topBreadRef.current, bottomBreadRef.current], {
          rotateX: 16,
          transformPerspective: 1000,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            pin: pinRef.current,
            start: "top top",
            end: "bottom bottom",
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
            ease: "power1.out",
          },
          0
        )
          .to(
            picklesRef.current,
            {
              y: -66,
              rotate: 3,
              ease: "power1.out",
            },
            0
          )
          .to(
            cheeseRef.current,
            {
              y: -18,
              rotate: -1,
              ease: "power1.out",
            },
            0
          )
          .to(
            mojoPorkRef.current,
            {
              y: 30,
              scale: 1.05,
              ease: "power1.out",
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
              ease: "power2.out",
            },
            0
          )
          .to(
            bottomBreadRef.current,
            {
              y: 114,
              rotate: 1,
              rotateX: 16,
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
      aria-label="Deconstrucción interactiva del Sándwich Cubano Mojo Grille"
      className="relative h-[300vh] bg-cream-bg border-b border-charcoal-ink/10 select-none overflow-x-clip"
    >
      <div
        ref={pinRef}
        className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-visible px-4 sm:px-8"
      >
        {/* Encabezado Superior de Sección */}
        <div className="absolute top-4 sm:top-8 left-0 right-0 text-center px-4 pointer-events-none z-10">
          <span className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-brand-fire">
            ✦ Arquitectura Gastronómica Artesanal ✦
          </span>
          <h3 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-charcoal-ink mt-0.5 sm:mt-1">
            Anatomía del Cubano Prensado
          </h3>
          <p className="font-accent italic text-base sm:text-xl lg:text-2xl text-charcoal-ink/80 lowercase mt-0.5">
            desplaza para deconstruir cada capa de sabor criollo al momento
          </p>
        </div>

        {/* Contenedor central y tarjeta lateral/inferior con layout adaptable */}
        <div className="relative w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-14 pt-12 sm:pt-16 lg:pt-0">
          
          {/* Contenedor central de capas apiladas con perspectiva CSS y overflow visible */}
          <div
            className="relative w-[260px] h-[210px] sm:w-[340px] sm:h-[280px] md:w-[420px] md:h-[360px] lg:w-[480px] lg:h-[460px] flex items-center justify-center overflow-visible [perspective:1000px]"
            style={{ perspective: "1000px" }}
          >
            
            {/* Capa 1: Tapa superior de pan cubano (rotateX 20deg) */}
            <div
              ref={topBreadRef}
              className="absolute inset-0 flex items-center justify-center will-change-transform z-50 pointer-events-none overflow-visible"
              style={{ willChange: "transform", transform: "rotateX(20deg)" }}
            >
              <img
                src="/sandwich/01-top-bread.webp"
                alt="Tapa superior de pan cubano tostado"
                width={1000}
                height={545}
                loading="eager"
                onLoad={handleLayerImageLoad}
                className="w-full h-auto object-contain drop-shadow-[0_25px_25px_rgba(20,18,16,0.25)] select-none"
              />
            </div>

            {/* Capa 2: Pepinillos encurtidos y mostaza criolla */}
            <div
              ref={picklesRef}
              className="absolute inset-0 flex items-center justify-center will-change-transform z-40 pointer-events-none overflow-visible"
              style={{ willChange: "transform" }}
            >
              <img
                src="/sandwich/02-pickles.webp"
                alt="Láminas de pepinillo dill encurtido y mostaza criolla"
                width={1000}
                height={545}
                loading="eager"
                onLoad={handleLayerImageLoad}
                className="w-full h-auto object-contain drop-shadow-[0_25px_25px_rgba(20,18,16,0.25)] select-none"
              />
            </div>

            {/* Capa 3: Queso suizo fundido */}
            <div
              ref={cheeseRef}
              className="absolute inset-0 flex items-center justify-center will-change-transform z-30 pointer-events-none overflow-visible"
              style={{ willChange: "transform" }}
            >
              <img
                src="/sandwich/03-melted-cheese.webp"
                alt="Queso suizo fundido y elástico"
                width={1000}
                height={545}
                loading="eager"
                onLoad={handleLayerImageLoad}
                className="w-full h-auto object-contain drop-shadow-[0_25px_25px_rgba(20,18,16,0.25)] select-none"
              />
            </div>

            {/* Capa 4: Pernil asado al mojo cítrico y jamón dulce */}
            <div
              ref={mojoPorkRef}
              className="absolute inset-0 flex items-center justify-center will-change-transform z-20 pointer-events-none overflow-visible"
              style={{ willChange: "transform" }}
            >
              <img
                src="/sandwich/04-mojo-pork.webp"
                alt="Pernil de cerdo asado 4 horas al mojo cítrico y jamón dulce"
                width={1000}
                height={545}
                loading="eager"
                onLoad={handleLayerImageLoad}
                className="w-full h-auto object-contain drop-shadow-[0_25px_25px_rgba(20,18,16,0.25)] select-none"
              />
            </div>

            {/* Capa 5: Tapa inferior de pan cubano prensado (rotateX 20deg) */}
            <div
              ref={bottomBreadRef}
              className="absolute inset-0 flex items-center justify-center will-change-transform z-10 pointer-events-none overflow-visible"
              style={{ willChange: "transform", transform: "rotateX(20deg)" }}
            >
              <img
                src="/sandwich/05-bottom-bread.webp"
                alt="Tapa inferior de pan cubano prensado"
                width={1000}
                height={545}
                loading="eager"
                onLoad={handleLayerImageLoad}
                className="w-full h-auto object-contain drop-shadow-[0_25px_25px_rgba(20,18,16,0.25)] select-none"
              />
            </div>

          </div>

          {/* Tarjeta de información editorial (lateral en escritorio, inferior al 90% en móviles) */}
          <div
            ref={sideCardRef}
            className="w-[90%] max-w-sm lg:max-w-xs rounded-2xl lg:rounded-3xl bg-surface-sand/95 backdrop-blur-md p-4 sm:p-5 lg:p-6 border border-charcoal-ink/10 shadow-[0_16px_36px_-10px_rgba(20,18,16,0.18)] will-change-transform z-30 transition-shadow hover:shadow-2xl mt-1 sm:mt-2 lg:mt-0"
          >
            {/* Etiqueta roja CRAV Style */}
            <div className="inline-flex items-center gap-1.5 rounded-md bg-brand-fire px-2.5 py-1 text-[10px] font-sans font-bold uppercase tracking-widest text-cream-bg shadow-xs">
              <Flame className="h-3 w-3" />
              <span>ANATOMÍA DEL CLÁSICO</span>
            </div>

            {/* Título Display */}
            <h4 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-tight text-charcoal-ink mt-2 sm:mt-3 leading-none">
              PERNIL AL MOJO CRIOLLO
            </h4>

            {/* Subtítulo Cursivo */}
            <p className="font-accent italic text-sm sm:text-base lg:text-lg text-brand-fire lowercase mt-0.5 sm:mt-1">
              slow-roasted pork &amp; swiss melt
            </p>

            {/* Descripción Sensorial Compacta */}
            <p className="font-sans text-[11px] sm:text-xs lg:text-sm text-charcoal-ink/80 mt-1.5 sm:mt-2 leading-relaxed line-clamp-3 sm:line-clamp-none">
              Carne de cerdo marinada durante 24 horas en naranja agria, ajo confitado, comino y orégano silvestre. Horneada 4 horas hasta deshebrarse sobre jamón glaseado, queso suizo fundido y pepinillos crujientes en pan prensado al momento.
            </p>

            {/* Badges de Cocción y Nutricionales */}
            <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-1.5 sm:gap-2 pt-2.5 sm:pt-3 border-t border-charcoal-ink/10">
              <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full bg-charcoal-ink/10 px-2.5 sm:px-3 py-0.5 sm:py-1 font-sans text-[10px] sm:text-xs font-bold text-charcoal-ink">
                <Clock className="h-3 w-3 text-brand-fire" />
                4-HOUR ROASTED
              </span>

              <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full bg-charcoal-ink/10 px-2.5 sm:px-3 py-0.5 sm:py-1 font-sans text-[10px] sm:text-xs font-bold text-charcoal-ink">
                <Award className="h-3 w-3 text-leaf-green" />
                42G PROTEIN
              </span>

              <span className="inline-flex items-center gap-1 rounded-full bg-leaf-green/15 px-2.5 sm:px-3 py-0.5 sm:py-1 font-sans text-[10px] sm:text-[11px] font-bold text-leaf-green">
                <Sparkles className="h-3 w-3" />
                100% ARTESANAL
              </span>
            </div>
          </div>

        </div>

        {/* Indicador de scroll */}
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-charcoal-ink/60 font-sans text-[10px] sm:text-xs tracking-wider uppercase font-semibold pointer-events-none">
          <span className="animate-bounce">↓</span>
          <span>Desplaza para deconstruir</span>
        </div>
      </div>
    </section>
  );
}

export default CubanDeconstruction;
