import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { TapeLabel } from "./TapeLabel";
import { InkStamp } from "./InkStamp";

export interface BowlLayerSpec {
  id: string;
  num: string;
  tag: string;
  title: string;
  cookTime: string;
  ingredients: string;
  image: string;
  alt: string;
}

export const BOWL_LAYERS: BowlLayerSpec[] = [
  {
    id: "pollo",
    num: "01",
    tag: "TOP FLAVOR CORE",
    title: "Pollo Marinado al Mojo",
    cookTime: "24H MARINADE / 12 MIN LIVE FIRE SEAR",
    ingredients:
      "Tender chicken breast, Seville sour orange, crushed garlic, wild oregano, roasted cumin and sea salt",
    image: "/bowl/01-pollo-marinado.webp",
    alt: "Pollo marinado al mojo criollo con hierbas frescas",
  },
  {
    id: "maduros",
    num: "02",
    tag: "SWEET ACCENT",
    title: "Plátanos Maduros",
    cookTime: "8 MIN PLANCHA CARAMELIZATION",
    ingredients:
      "Naturally sweet ripe plantains, raw cane glaze and sea salt with crispy caramelized edges",
    image: "/bowl/04-platanos-maduros.webp",
    alt: "Plátanos maduros caramelizados en plancha caliente",
  },
  {
    id: "frijoles",
    num: "03",
    tag: "SAVORY STEW",
    title: "Frijoles Negros Criollos",
    cookTime: "3.5 HOURS SLOW SIMMER",
    ingredients:
      "Cuban black beans, Spanish olive sofrito, sweet bell pepper, yellow onion and cumin broth",
    image: "/bowl/03-frijoles-negros.webp",
    alt: "Frijoles negros cubanos estofados lentamente con sofrito",
  },
  {
    id: "arroz",
    num: "04",
    tag: "GOLDEN FOUNDATION",
    title: "Arroz Amarillo Dorado",
    cookTime: "30 MIN STEAMED IN BROTH",
    ingredients:
      "Long grain rice, wild achiote oil, Spanish saffron, roasted garlic reduction and sweet peppers",
    image: "/bowl/02-arroz-amarillo.webp",
    alt: "Arroz amarillo criollo dorado con achiote y azafrán",
  },
];

export function BowlDeconstruction() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Progreso de scroll normalizado con física suave
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 26,
    stiffness: 190,
    mass: 0.5,
  });

  // Transformaciones para las 4 capas flotantes
  // Capa 1: Pollo Marinado (se eleva hacia arriba)
  const yPollo = useTransform(smoothProgress, [0, 0.75], [0, -185]);
  const rotatePollo = useTransform(smoothProgress, [0, 0.75], [0, -3]);
  const scalePollo = useTransform(smoothProgress, [0, 0.75], [1, 1.05]);

  // Capa 2: Plátanos Maduros (se eleva ligeramente hacia arriba)
  const yMaduros = useTransform(smoothProgress, [0, 0.75], [0, -60]);
  const rotateMaduros = useTransform(smoothProgress, [0, 0.75], [0, 3]);
  const scaleMaduros = useTransform(smoothProgress, [0, 0.75], [1, 1.02]);

  // Capa 3: Frijoles Negros (desciende ligeramente)
  const yFrijoles = useTransform(smoothProgress, [0, 0.75], [0, 60]);
  const rotateFrijoles = useTransform(smoothProgress, [0, 0.75], [0, -2]);
  const scaleFrijoles = useTransform(smoothProgress, [0, 0.75], [1, 1.01]);

  // Capa 4: Arroz Amarillo (desciende a la base)
  const yArroz = useTransform(smoothProgress, [0, 0.75], [0, 185]);
  const rotateArroz = useTransform(smoothProgress, [0, 0.75], [0, 1]);
  const scaleArroz = useTransform(smoothProgress, [0, 0.75], [1, 1.03]);

  // Progreso de dibujo de las líneas vectoriales (0 a 1)
  const lineProgress = useTransform(smoothProgress, [0.08, 0.7], [0, 1]);

  // Opacidad activa de cada ficha tipográfica según scroll
  const opacityCard1 = useTransform(smoothProgress, [0, 0.2, 0.5, 1], [0.35, 1, 0.7, 0.85]);
  const opacityCard2 = useTransform(smoothProgress, [0.15, 0.35, 0.65, 1], [0.35, 1, 0.7, 0.85]);
  const opacityCard3 = useTransform(smoothProgress, [0.3, 0.5, 0.8, 1], [0.35, 1, 0.7, 0.85]);
  const opacityCard4 = useTransform(smoothProgress, [0.45, 0.7, 0.9, 1], [0.35, 1, 1, 1]);

  return (
    <section
      ref={containerRef}
      id="bowl-deconstruction"
      aria-label="Deconstrucción interactiva del Bowl Criollo Mojo Grille"
      className="relative h-[250vh] sm:h-[280vh] bg-transparent border-b border-[#1C1917]/15 select-none overflow-clip"
    >
      {/* Contenedor Fijo mientras se hace scroll (position: sticky) */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-4 sm:px-8 relative overflow-hidden">
        
        {/* Texto Monumental de Fondo (Watermark Depth) */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[22vw] sm:text-[18vw] lg:text-[16vw] text-charcoal-ink/[0.03] leading-none tracking-tighter uppercase pointer-events-none select-none -z-10 whitespace-nowrap"
        >
          BOWL CRIOLLO
        </div>

        {/* Etiqueta tipo cinta adhesiva en la esquina superior izquierda */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-8 z-30 pointer-events-none">
          <TapeLabel>24H CITRUS MARINADE LIVE FIRE</TapeLabel>
        </div>

        {/* Sello de Tinta Real Artesanal */}
        <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 z-30 hidden md:inline-flex">
          <InkStamp size={135} />
        </div>

        {/* Encabezado Superior de Sección */}
        <div className="absolute top-3 sm:top-6 left-0 right-0 text-center px-4 pointer-events-none z-20">
          <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-brand-fire">
            100% FRESH CRIOLLO ASSEMBLED TO ORDER
          </span>
          <h3 className="font-display text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-charcoal-ink mt-0.5 sm:mt-1">
            ANATOMY OF THE CRIOLLO BOWL
          </h3>
          <p className="font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-charcoal-ink/75 mt-0.5 sm:mt-1">
            SCROLL TO DECONSTRUCT EVERY ARTISANAL LAYER PREPARED AL MOMENTO
          </p>
        </div>

        {/* Escenario Central: Layout de 3 columnas (Fichas Izquierda | 4 Capas Flotantes | Fichas Derecha) */}
        <div className="relative w-full max-w-[1500px] h-[580px] sm:h-[620px] flex items-center justify-between gap-4 lg:gap-8 pt-16 sm:pt-20">

          {/* Columna Izquierda de Fichas Tipográficas (Desktop) */}
          <div className="hidden lg:flex flex-col justify-between w-[320px] xl:w-[350px] h-full z-20 py-6">
            
            {/* Ficha 01: Pollo Marinado */}
            <motion.div
              style={{ opacity: opacityCard1 }}
              className="border border-[#1C1917]/15 bg-surface-sand p-5 rounded-none relative transition-colors duration-200"
            >
              <div className="flex items-center justify-between border-b border-[#1C1917]/10 pb-2 mb-2">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-fire">
                  01 // TOP LAYER
                </span>
                <span className="font-mono text-[10px] font-bold uppercase px-2 py-0.5 border border-brand-fire/30 text-brand-fire bg-brand-fire/5">
                  SIGNATURE
                </span>
              </div>
              <h4 className="font-display text-2xl font-bold uppercase tracking-tight text-charcoal-ink">
                {BOWL_LAYERS[0]!.title}
              </h4>
              <div className="mt-2">
                <span className="font-mono text-[11px] font-bold text-charcoal-ink uppercase tracking-wider block">
                  {BOWL_LAYERS[0]!.cookTime}
                </span>
              </div>
              <p className="mt-2 font-sans text-xs text-charcoal-ink/80 leading-relaxed">
                {BOWL_LAYERS[0]!.ingredients}
              </p>
            </motion.div>

            {/* Ficha 03: Frijoles Negros */}
            <motion.div
              style={{ opacity: opacityCard3 }}
              className="border border-[#1C1917]/15 bg-surface-sand p-5 rounded-none relative transition-colors duration-200"
            >
              <div className="flex items-center justify-between border-b border-[#1C1917]/10 pb-2 mb-2">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-fire">
                  03 // SAVORY CORE
                </span>
                <span className="font-mono text-[10px] font-bold uppercase px-2 py-0.5 border border-[#1C1917]/20 text-charcoal-ink bg-cream-bg">
                  SLOW COOKED
                </span>
              </div>
              <h4 className="font-display text-2xl font-bold uppercase tracking-tight text-charcoal-ink">
                {BOWL_LAYERS[2]!.title}
              </h4>
              <div className="mt-2">
                <span className="font-mono text-[11px] font-bold text-charcoal-ink uppercase tracking-wider block">
                  {BOWL_LAYERS[2]!.cookTime}
                </span>
              </div>
              <p className="mt-2 font-sans text-xs text-charcoal-ink/80 leading-relaxed">
                {BOWL_LAYERS[2]!.ingredients}
              </p>
            </motion.div>

          </div>

          {/* Lienzo Central con las 4 Capas Flotantes del Bowl */}
          <div className="relative flex-1 flex items-center justify-center h-full overflow-visible [perspective:1000px]">
            
            {/* SVG Vectorial con las líneas sutiles conectando capas y fichas (Desktop) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden lg:block overflow-visible"
              viewBox="0 0 800 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Línea 01: Pollo Marinado (Hacia izquierda superior) */}
              <motion.path
                d="M 330 180 L 190 140 L 40 140"
                stroke="#1C1917"
                strokeWidth="1.25"
                strokeDasharray="4 4"
                strokeOpacity="0.35"
                style={{ pathLength: lineProgress }}
              />
              <circle cx="330" cy="180" r="3.5" fill="#EA580C" />
              <rect x="34" y="136" width="8" height="8" fill="#1C1917" />

              {/* Línea 02: Plátanos Maduros (Hacia derecha superior) */}
              <motion.path
                d="M 470 240 L 610 170 L 760 170"
                stroke="#1C1917"
                strokeWidth="1.25"
                strokeDasharray="4 4"
                strokeOpacity="0.35"
                style={{ pathLength: lineProgress }}
              />
              <circle cx="470" cy="240" r="3.5" fill="#EA580C" />
              <rect x="756" y="166" width="8" height="8" fill="#1C1917" />

              {/* Línea 03: Frijoles Negros (Hacia izquierda inferior) */}
              <motion.path
                d="M 320 370 L 180 430 L 40 430"
                stroke="#1C1917"
                strokeWidth="1.25"
                strokeDasharray="4 4"
                strokeOpacity="0.35"
                style={{ pathLength: lineProgress }}
              />
              <circle cx="320" cy="370" r="3.5" fill="#EA580C" />
              <rect x="34" y="426" width="8" height="8" fill="#1C1917" />

              {/* Línea 04: Arroz Amarillo (Hacia derecha inferior) */}
              <motion.path
                d="M 480 440 L 620 470 L 760 470"
                stroke="#1C1917"
                strokeWidth="1.25"
                strokeDasharray="4 4"
                strokeOpacity="0.35"
                style={{ pathLength: lineProgress }}
              />
              <circle cx="480" cy="440" r="3.5" fill="#EA580C" />
              <rect x="756" y="466" width="8" height="8" fill="#1C1917" />
            </svg>

            {/* Contenedor cilíndrico de capas apiladas con perspectiva 3D */}
            <div
              className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[440px] md:h-[440px] flex items-center justify-center overflow-visible"
              style={{ perspective: "1000px" }}
            >
              {/* Capa 1: Pollo Marinado al Mojo (Superior) */}
              <motion.div
                style={{
                  y: yPollo,
                  rotate: rotatePollo,
                  scale: scalePollo,
                  rotateX: 20,
                  transformPerspective: 1000,
                }}
                className="absolute inset-0 flex items-center justify-center will-change-transform z-40 pointer-events-none"
              >
                <img
                  src={BOWL_LAYERS[0]!.image}
                  alt={BOWL_LAYERS[0]!.alt}
                  width={800}
                  height={800}
                  loading="eager"
                  className="w-full h-full object-contain select-none"
                />
              </motion.div>

              {/* Capa 2: Plátanos Maduros Caramelizados */}
              <motion.div
                style={{
                  y: yMaduros,
                  rotate: rotateMaduros,
                  scale: scaleMaduros,
                  rotateX: 20,
                  transformPerspective: 1000,
                }}
                className="absolute inset-0 flex items-center justify-center will-change-transform z-30 pointer-events-none"
              >
                <img
                  src={BOWL_LAYERS[1]!.image}
                  alt={BOWL_LAYERS[1]!.alt}
                  width={800}
                  height={800}
                  loading="eager"
                  className="w-full h-full object-contain select-none"
                />
              </motion.div>

              {/* Capa 3: Frijoles Negros Criollos */}
              <motion.div
                style={{
                  y: yFrijoles,
                  rotate: rotateFrijoles,
                  scale: scaleFrijoles,
                  rotateX: 20,
                  transformPerspective: 1000,
                }}
                className="absolute inset-0 flex items-center justify-center will-change-transform z-20 pointer-events-none"
              >
                <img
                  src={BOWL_LAYERS[2]!.image}
                  alt={BOWL_LAYERS[2]!.alt}
                  width={800}
                  height={800}
                  loading="eager"
                  className="w-full h-full object-contain select-none"
                />
              </motion.div>

              {/* Capa 4: Arroz Amarillo Dorado (Base) */}
              <motion.div
                style={{
                  y: yArroz,
                  rotate: rotateArroz,
                  scale: scaleArroz,
                  rotateX: 20,
                  transformPerspective: 1000,
                }}
                className="absolute inset-0 flex items-center justify-center will-change-transform z-10 pointer-events-none"
              >
                <img
                  src={BOWL_LAYERS[3]!.image}
                  alt={BOWL_LAYERS[3]!.alt}
                  width={800}
                  height={800}
                  loading="eager"
                  className="w-full h-full object-contain select-none"
                />
              </motion.div>
            </div>
          </div>

          {/* Columna Derecha de Fichas Tipográficas (Desktop) */}
          <div className="hidden lg:flex flex-col justify-between w-[320px] xl:w-[350px] h-full z-20 py-6">
            
            {/* Ficha 02: Plátanos Maduros */}
            <motion.div
              style={{ opacity: opacityCard2 }}
              className="border border-[#1C1917]/15 bg-surface-sand p-5 rounded-none relative transition-colors duration-200"
            >
              <div className="flex items-center justify-between border-b border-[#1C1917]/10 pb-2 mb-2">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-fire">
                  02 // SWEET ACCENT
                </span>
                <span className="font-mono text-[10px] font-bold uppercase px-2 py-0.5 border border-leaf-green/30 text-leaf-green bg-leaf-green/5">
                  CARAMELIZED
                </span>
              </div>
              <h4 className="font-display text-2xl font-bold uppercase tracking-tight text-charcoal-ink">
                {BOWL_LAYERS[1]!.title}
              </h4>
              <div className="mt-2">
                <span className="font-mono text-[11px] font-bold text-charcoal-ink uppercase tracking-wider block">
                  {BOWL_LAYERS[1]!.cookTime}
                </span>
              </div>
              <p className="mt-2 font-sans text-xs text-charcoal-ink/80 leading-relaxed">
                {BOWL_LAYERS[1]!.ingredients}
              </p>
            </motion.div>

            {/* Ficha 04: Arroz Amarillo Dorado */}
            <motion.div
              style={{ opacity: opacityCard4 }}
              className="border border-[#1C1917]/15 bg-surface-sand p-5 rounded-none relative transition-colors duration-200"
            >
              <div className="flex items-center justify-between border-b border-[#1C1917]/10 pb-2 mb-2">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-fire">
                  04 // FOUNDATION
                </span>
                <span className="font-mono text-[10px] font-bold uppercase px-2 py-0.5 border border-brand-fire/30 text-brand-fire bg-brand-fire/5">
                  GOLDEN GRAINS
                </span>
              </div>
              <h4 className="font-display text-2xl font-bold uppercase tracking-tight text-charcoal-ink">
                {BOWL_LAYERS[3]!.title}
              </h4>
              <div className="mt-2">
                <span className="font-mono text-[11px] font-bold text-charcoal-ink uppercase tracking-wider block">
                  {BOWL_LAYERS[3]!.cookTime}
                </span>
              </div>
              <p className="mt-2 font-sans text-xs text-charcoal-ink/80 leading-relaxed">
                {BOWL_LAYERS[3]!.ingredients}
              </p>
            </motion.div>

          </div>

        </div>

        {/* Fichas Tipográficas en Dispositivos Móviles / Tabletas (debajo del bowl) */}
        <div className="lg:hidden w-full max-w-lg mt-4 z-20">
          <div className="grid grid-cols-2 gap-2">
            {BOWL_LAYERS.map((layer) => (
              <div
                key={layer.id}
                className="border border-[#1C1917]/15 bg-surface-sand p-2.5 rounded-none text-left"
              >
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-brand-fire block">
                  {layer.num} // {layer.tag}
                </span>
                <h5 className="font-display text-xs sm:text-sm font-bold uppercase tracking-tight text-charcoal-ink leading-tight mt-0.5">
                  {layer.title}
                </h5>
                <span className="font-mono text-[9px] font-bold text-charcoal-ink/75 uppercase tracking-wide block mt-1">
                  {layer.cookTime}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default BowlDeconstruction;
