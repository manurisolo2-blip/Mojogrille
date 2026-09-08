import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface JellyWaveTransitionProps {
  /** Color de la sección superior (HEX o clase CSS) */
  topColor: string;
  /** Color de la sección inferior (HEX o clase CSS) */
  bottomColor: string;
  /** Dirección de la onda: "down" (el color superior penetra en el inferior) o "up" (el color inferior asciende) */
  direction?: "down" | "up";
  /** Activar stickers flotantes artesanales de guarnición (cilantro, naranja agria, ajo) */
  showGarnish?: boolean;
  /** Clases CSS adicionales para el contenedor */
  className?: string;
}

// Variantes de trazado SVG con la misma topología para permitir morfología suave sin parpadeos
const DOWN_PATHS = {
  a: "M 1538 0 L -2 0 L -2 95 Q 192 165 384 125 T 768 115 T 1152 145 T 1538 90 Z",
  b: "M 1538 0 L -2 0 L -2 110 Q 192 75 384 135 T 768 140 T 1152 105 T 1538 120 Z",
  c: "M 1538 0 L -2 0 L -2 80 Q 192 145 384 105 T 768 125 T 1152 160 T 1538 75 Z",
};

const UP_PATHS = {
  a: "M 1538 200 L -2 200 L -2 105 Q 192 35 384 75 T 768 85 T 1152 55 T 1538 110 Z",
  b: "M 1538 200 L -2 200 L -2 85 Q 192 115 384 65 T 768 60 T 1152 95 T 1538 80 Z",
  c: "M 1538 200 L -2 200 L -2 120 Q 192 60 384 100 T 768 75 T 1152 45 T 1538 125 Z",
};

export const JellyWaveTransition: React.FC<JellyWaveTransitionProps> = ({
  topColor,
  bottomColor,
  direction = "down",
  showGarnish = false,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<SVGSVGElement>(null);

  const isDown = direction === "down";
  const paths = isDown ? DOWN_PATHS : UP_PATHS;
  // Si es "down", el SVG rellena el área superior con topColor y el contenedor tiene bottomColor.
  // Si es "up", el SVG rellena el área inferior con bottomColor y el contenedor tiene topColor.
  const containerBg = isDown ? bottomColor : topColor;
  const waveFill = isDown ? topColor : bottomColor;

  // Interacción cinemática con GSAP ScrollTrigger para efecto jelly reactivo a la velocidad de scroll
  useEffect(() => {
    if (typeof window === "undefined" || !waveRef.current || !containerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        // Clamping para mantener sutileza editorial
        const clampedVelocity = Math.max(-1200, Math.min(1200, velocity));
        const skew = clampedVelocity * 0.002;
        const scaleY = 1 + Math.abs(clampedVelocity) * 0.00015;

        gsap.to(waveRef.current, {
          skewY: isDown ? skew : -skew,
          scaleY,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [isDown]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`relative w-full overflow-hidden select-none pointer-events-none leading-none z-20 ${className}`}
      style={{ backgroundColor: containerBg }}
    >
      {/* SVG de onda animada y continua con morfología Framer Motion */}
      <svg
        ref={waveRef}
        viewBox="0 0 1536 200"
        preserveAspectRatio="none"
        className="w-full h-16 sm:h-24 md:h-32 lg:h-40 block transform-gpu will-change-transform"
      >
        <motion.path
          d={paths.a}
          animate={{
            d: [paths.a, paths.b, paths.c, paths.a],
          }}
          transition={{
            duration: 6.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          fill={waveFill}
        />
      </svg>

      {/* Stickers de Guarnición Flotante (Inspiración Crav Burgers en la curva de la ola) */}
      {showGarnish && (
        <div className="absolute top-1/2 -translate-y-1/2 left-6 sm:left-14 md:left-24 z-30 pointer-events-auto flex items-center gap-2 sm:gap-3">
          {/* Sticker 1: Cilantro fresco criollo */}
          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [-4, 6, -4],
            }}
            transition={{
              duration: 4.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.15, rotate: 12 }}
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
            animate={{
              y: [0, 8, 0],
              rotate: [4, -6, 4],
            }}
            transition={{
              duration: 4.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.15, rotate: -12 }}
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
        </div>
      )}
    </div>
  );
};

export default JellyWaveTransition;
