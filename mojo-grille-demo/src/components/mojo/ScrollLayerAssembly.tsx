import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface LayerInfo {
  tag: string;
  title: string;
  desc: string;
}

const LAYERS_INFO: LayerInfo[] = [
  {
    tag: "Top Bun",
    title: "Pressed Cuban Bread",
    desc: "Golden crusty exterior with melted butter pressed crisp under live-fire cast iron.",
  },
  {
    tag: "Tangy Crunch",
    title: "Dill Pickles & Criollo Mustard",
    desc: "Crisp pickle spears paired with spiced mustard to cut through the rich roasted meats.",
  },
  {
    tag: "Melted Comfort",
    title: "Melted Swiss Cheese",
    desc: "Gooey, golden ribbons hugging the savory, slow-cooked layers.",
  },
  {
    tag: "Flavor Core",
    title: "4-Hour Slow-Roasted Mojo Pork",
    desc: "Marinated in Seville sour orange, garlic confit, and wild oregano with sweet ham.",
  },
  {
    tag: "Solid Base",
    title: "Artisanal Cuban Bread Base",
    desc: "Tender crumb and plancha-pressed foundation absorbing all savory criollo drippings.",
  },
];

export function ScrollLayerAssembly() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const topBunRef = useRef<HTMLImageElement>(null);
  const picklesRef = useRef<HTMLImageElement>(null);
  const cheeseRef = useRef<HTMLImageElement>(null);
  const porkRef = useRef<HTMLImageElement>(null);
  const bottomBunRef = useRef<HTMLImageElement>(null);
  const infoCardRef = useRef<HTMLDivElement>(null);

  const [activeStep, setActiveStep] = useState(3); // Default focal point: Mojo Pork

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: pinRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          onUpdate: (self) => {
            // Sincroniza la ficha informativa según el progreso (0.0 a 1.0)
            const p = self.progress;
            if (p < 0.2) setActiveStep(0);
            else if (p < 0.4) setActiveStep(1);
            else if (p < 0.6) setActiveStep(2);
            else if (p < 0.85) setActiveStep(3);
            else setActiveStep(4);
          },
        },
      });

      // 1. Desplazamiento vertical y rotación de capas (Scrub)
      tl.to(
        topBunRef.current,
        {
          y: -180,
          rotate: -4,
          ease: "power1.out",
        },
        0
      )
        .to(
          picklesRef.current,
          {
            y: -90,
            rotate: 2,
            ease: "power1.out",
          },
          0
        )
        .to(
          cheeseRef.current,
          {
            y: -20,
            rotate: -1,
            ease: "power1.out",
          },
          0
        )
        .to(
          porkRef.current,
          {
            y: 35,
            scale: 1.05,
            ease: "power1.out",
          },
          0
        )
        .to(
          bottomBunRef.current,
          {
            y: 140,
            rotate: 1,
            ease: "power1.out",
          },
          0
        )
        .fromTo(
          infoCardRef.current,
          { opacity: 0.3, y: 15 },
          { opacity: 1, y: 0, ease: "none" },
          0
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const currentInfo: LayerInfo = LAYERS_INFO[activeStep] ?? {
    tag: "Flavor Core",
    title: "4-Hour Slow-Roasted Mojo Pork",
    desc: "Marinated in Seville sour orange, garlic confit, and wild oregano with sweet ham.",
  };

  return (
    <section
      ref={containerRef}
      id="cuban-sandwich-layers"
      aria-label="Interactive deconstruction of the Mojo Grille Cuban Sandwich"
      className="relative h-[180vh] bg-cream-bg border-b border-charcoal-ink/10 select-none"
    >
      <div
        ref={pinRef}
        className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-8"
      >
        {/* Encabezado Superior de Sección */}
        <div className="absolute top-8 md:top-12 left-0 right-0 text-center px-4 pointer-events-none z-10">
          <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-brand-fire">
            100% FRESH CRIOLLO PRESSED HOT
          </span>
          <h3 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-charcoal-ink mt-1">
            THE UNFORGIVING CUBANO
          </h3>
          <p className="font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-charcoal-ink/75 mt-1">
            SCROLL TO DECONSTRUCT EACH LAYER OF CRIOLLO FLAVOR
          </p>
        </div>

        {/* Contenedor central de capas apiladas */}
        <div className="relative w-72 h-72 sm:w-96 sm:h-96 md:w-[480px] md:h-[480px] flex items-center justify-center">
          {/* Capa 1: Tapa superior de pan cubano tostado */}
          <img
            ref={topBunRef}
            src="/layers/top-bread.webp"
            alt="Top bun of toasted plancha Cuban bread"
            className="absolute w-full object-contain pointer-events-none drop-shadow-xl will-change-transform z-50"
          />

          {/* Capa 2: Láminas de pepinillo encurtido y mostaza criolla */}
          <img
            ref={picklesRef}
            src="/layers/pickles.webp"
            alt="Dill pickles and criollo mustard"
            className="absolute w-full object-contain pointer-events-none drop-shadow-md will-change-transform z-40"
          />

          {/* Capa 3: Queso suizo fundido */}
          <img
            ref={cheeseRef}
            src="/layers/cheese.webp"
            alt="Gooey melted Swiss cheese"
            className="absolute w-full object-contain pointer-events-none drop-shadow-md will-change-transform z-30"
          />

          {/* Capa 4: Jamón serrano / pierna de cerdo asada 4 horas al mojo de ajo */}
          <img
            ref={porkRef}
            src="/layers/mojo-pork.webp"
            alt="4-hour slow-roasted citrus mojo pork and sweet ham"
            className="absolute w-full object-contain pointer-events-none drop-shadow-xl will-change-transform z-20"
          />

          {/* Capa 5: Tapa inferior de pan cubano prensado */}
          <img
            ref={bottomBunRef}
            src="/layers/bottom-bread.webp"
            alt="Bottom base of pressed artisanal Cuban bread"
            className="absolute w-full object-contain pointer-events-none drop-shadow-2xl will-change-transform z-10"
          />
        </div>

        {/* Ficha descriptiva de ingredientes sincronizada con el scroll */}
        <div
          ref={infoCardRef}
          className="absolute bottom-10 sm:bottom-12 md:bottom-auto md:right-12 lg:right-20 max-w-xs sm:max-w-sm rounded-none bg-surface-sand p-5 border-2 border-charcoal-ink shadow-none transition-all duration-300 z-30"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-sans text-[11px] uppercase tracking-widest text-brand-fire font-bold">
              {currentInfo.tag}
            </span>
            <span className="font-sans text-[10px] text-charcoal-ink/60 font-semibold">
              Layer {activeStep + 1} of 5
            </span>
          </div>

          <h4 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-tight text-charcoal-ink leading-tight">
            {currentInfo.title}
          </h4>

          <p className="text-xs sm:text-sm text-charcoal-ink/80 mt-1.5 leading-relaxed">
            {currentInfo.desc}
          </p>

          <div className="mt-3 flex items-center gap-1.5 pt-2 border-t border-charcoal-ink/10 text-[10px] font-bold text-leaf-green">
            <span>100% Fresh Ingredients</span>
            <span>Made al momento</span>
          </div>
        </div>

        {/* Indicador sutil de scroll hacia abajo */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-charcoal-ink/60 font-sans text-xs tracking-wider uppercase font-semibold">
          <span className="animate-bounce">↓</span>
          <span>Scroll to assemble</span>
        </div>
      </div>
    </section>
  );
}

export default ScrollLayerAssembly;
