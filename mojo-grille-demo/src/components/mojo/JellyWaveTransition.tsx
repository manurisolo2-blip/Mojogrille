import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

export interface JellyWaveTransitionProps {
  /** Color de la sección superior (HEX o clase CSS) */
  topColor: string;
  /** Color de la sección inferior (HEX o clase CSS) */
  bottomColor: string;
  /** Dirección de la onda: "down" (el color superior penetra en el inferior) o "up" (el color inferior asciende) */
  direction?: "down" | "up";
  /** Activar stickers flotantes artesanales de guarnición (cilantro, naranja agria) */
  showGarnish?: boolean;
  /** Clases CSS adicionales para el contenedor */
  className?: string;
}

// Trazados SVG con coordenadas que se extienden más allá de los bordes (-8 a 1544 horizontal, -4 a 224 vertical)
// para evitar cualquier línea o artefacto por subpixel rendering o antialiasing del navegador.
//
// Nota: la cobertura del hueco que abre la traslación NO se resuelve dentro del
// SVG. El elemento raíz <svg> recorta a su viewBox (overflow: hidden de la hoja
// de estilos del navegador), así que un <rect> de sangrado fuera del viewBox no
// se dibuja. Se usa una banda DOM (BLEED_PX) que viaja con el wrapper animado.
const DOWN_PATHS = {
  a: "M 1544 -4 L -8 -4 L -8 135 C 250 55, 450 180, 768 120 C 1080 60, 1320 170, 1544 100 Z",
  b: "M 1544 -4 L -8 -4 L -8 115 C 250 85, 450 150, 768 135 C 1080 85, 1320 145, 1544 120 Z",
  c: "M 1544 -4 L -8 -4 L -8 145 C 250 35, 450 195, 768 105 C 1080 45, 1320 185, 1544 85 Z",
};

/**
 * Alto de la banda de sangrado, en px. Debe superar con holgura el
 * desplazamiento vertical máximo del wrapper (±32px) en cualquier breakpoint.
 */
const BLEED_PX = 240;

/**
 * Sobreancho del wrapper animado a cada lado, en px. El wrapper también se
 * desplaza en horizontal (±20px), así que tanto el SVG como la banda deben
 * sobresalir del contenedor más que ese recorrido; si midieran justo el 100%,
 * el desplazamiento destaparía el fondo del contenedor por un costado. El
 * `overflow-hidden` del contenedor recorta el sobrante.
 */
const BLEED_X_PX = 64;

const UP_PATHS = {
  a: "M 1544 224 L -8 224 L -8 85 C 250 165, 450 40, 768 100 C 1080 160, 1320 50, 1544 120 Z",
  b: "M 1544 224 L -8 224 L -8 105 C 250 135, 450 70, 768 85 C 1080 135, 1320 75, 1544 100 Z",
  c: "M 1544 224 L -8 224 L -8 75 C 250 185, 450 25, 768 115 C 1080 175, 1320 35, 1544 135 Z",
};

export const JellyWaveTransition: React.FC<JellyWaveTransitionProps> = ({
  topColor,
  bottomColor,
  direction = "down",
  showGarnish = false,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const isDown = direction === "down";
  const paths = isDown ? DOWN_PATHS : UP_PATHS;

  // Si es "down", el fondo del contenedor es bottomColor y la onda rellena la parte superior con topColor.
  // Si es "up", el fondo del contenedor es topColor y la onda rellena la parte inferior con bottomColor.
  const containerBg = isDown ? bottomColor : topColor;
  const waveFill = isDown ? topColor : bottomColor;

  // Seguimiento reactivo del scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Animación física de bajada o subida al hacer scroll:
  // Si direction === "down", la onda baja de -32px a +32px
  // Si direction === "up", la onda sube de +32px a -32px
  const yRaw = useTransform(
    scrollYProgress,
    [0, 1],
    isDown ? [-32, 32] : [32, -32]
  );
  const y = useSpring(yRaw, { stiffness: 130, damping: 26, mass: 0.75 });

  // Expansión / oleaje dinámico de la onda al entrar en pantalla
  const scaleYRaw = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 1.25, 0.9]);
  const scaleY = useSpring(scaleYRaw, { stiffness: 130, damping: 26, mass: 0.75 });

  // Desplazamiento horizontal de marea
  const xRaw = useTransform(
    scrollYProgress,
    [0, 1],
    isDown ? [-20, 20] : [20, -20]
  );
  const x = useSpring(xRaw, { stiffness: 130, damping: 26, mass: 0.75 });

  // Parallax reactivo para los stickers de guarnición
  const stickerYRaw = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isDown ? [-22, 16, -12] : [22, -16, 12]
  );
  const stickerY = useSpring(stickerYRaw, { stiffness: 140, damping: 24 });

  const stickerRotateRaw = useTransform(
    scrollYProgress,
    [0, 1],
    isDown ? [-8, 14] : [8, -14]
  );
  const stickerRotate = useSpring(stickerRotateRaw, { stiffness: 140, damping: 24 });

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`relative w-full overflow-hidden select-none pointer-events-none leading-none -my-px z-20 ${className}`}
      style={{ backgroundColor: containerBg }}
    >
      {/* Contenedor animado al scroll con física de subida/bajada y oleaje elástico */}
      <motion.div
        style={{
          width: `calc(100% + ${BLEED_X_PX * 2}px)`,
          marginLeft: -BLEED_X_PX,
          transformOrigin: isDown ? "top center" : "bottom center",
          ...(reducedMotion ? {} : { y, scaleY, x }),
        }}
        className="relative h-full will-change-transform"
      >
        {/*
          Banda de sangrado: vive DENTRO del wrapper animado, así se traslada
          junto al SVG y tapa el fondo del contenedor que la traslación deja al
          descubierto (una línea del color de la sección destino). Se extiende
          hacia el borde por el que se puede abrir la costura: arriba cuando la
          onda baja, abajo cuando sube.
        */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 ${isDown ? "bottom-full" : "top-full"}`}
          style={{ height: BLEED_PX, backgroundColor: waveFill }}
        />

        <svg
          viewBox="0 0 1536 220"
          preserveAspectRatio="none"
          className="block w-full h-16 sm:h-24 md:h-32 lg:h-36 pointer-events-none"
        >
          {/* Rectángulos de sangrado (Bleed rects) para garantizar cobertura total sin hendiduras */}
          {isDown ? (
            <rect x="-64" y="-80" width="1664" height="85" fill={waveFill} />
          ) : (
            <rect x="-64" y="215" width="1664" height="85" fill={waveFill} />
          )}

          <motion.path
            d={paths.a}
            {...(reducedMotion
              ? {}
              : {
                  animate: { d: [paths.a, paths.b, paths.c, paths.a] },
                  transition: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut" as const,
                  },
                })}
            fill={waveFill}
          />
        </svg>
      </motion.div>

      {/* Stickers de Guarnición Flotante con rebote en scroll (Inspiración Crav Burgers en la curva de la ola) */}
      {showGarnish && (
        <motion.div
          style={reducedMotion ? {} : { y: stickerY, rotate: stickerRotate }}
          className="absolute top-1/2 -translate-y-1/2 left-6 sm:left-14 md:left-24 z-30 pointer-events-auto flex items-center gap-2 sm:gap-3 will-change-transform"
        >
          {/* Sticker 1: Cilantro fresco criollo */}
          <motion.div
            {...(reducedMotion
              ? {}
              : {
                  animate: { y: [0, -7, 0], rotate: [-3, 5, -3] },
                  transition: {
                    duration: 4.2,
                    repeat: Infinity,
                    ease: "easeInOut" as const,
                  },
                })}
            whileHover={{ scale: 1.15, rotate: 10 }}
            className="group relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-cream-bg border border-charcoal-ink/15 shadow-lg shadow-black/10 cursor-pointer"
            title="100% Cilantro Criollo Fresco"
          >
            <span className="text-base sm:text-lg select-none" role="img" aria-label="Cilantro Leaf">
              🌿
            </span>
            <span className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-charcoal-ink text-cream-bg text-[9px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 opacity-0 transition-opacity group-hover:opacity-100 rounded-none shadow-sm">
              Cilantro
            </span>
          </motion.div>

          {/* Conector sutil entre stickers */}
          <div className="h-0.5 w-3 sm:w-5 bg-charcoal-ink/20" />

          {/* Sticker 2: Naranja agria de Sevilla / Mojo */}
          <motion.div
            {...(reducedMotion
              ? {}
              : {
                  animate: { y: [0, 7, 0], rotate: [3, -5, 3] },
                  transition: {
                    duration: 4.8,
                    repeat: Infinity,
                    ease: "easeInOut" as const,
                  },
                })}
            whileHover={{ scale: 1.15, rotate: -10 }}
            className="group relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-cream-bg border border-charcoal-ink/15 shadow-lg shadow-black/10 cursor-pointer"
            title="Naranja Agria de Sevilla — Mojo Signature"
          >
            <span className="text-base sm:text-lg select-none" role="img" aria-label="Sour Orange">
              🍊
            </span>
            <span className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-charcoal-ink text-cream-bg text-[9px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 opacity-0 transition-opacity group-hover:opacity-100 rounded-none shadow-sm">
              Mojo Citrus
            </span>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default JellyWaveTransition;
