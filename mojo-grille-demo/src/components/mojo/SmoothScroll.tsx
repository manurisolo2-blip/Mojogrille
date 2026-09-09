import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";
import { useReducedMotion } from "@/lib/useReducedMotion";

export interface SmoothScrollProps {
  children: ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Registrar ScrollTrigger con GSAP en cliente
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    // El scroll inercial es un disparador vestibular clásico: con
    // prefers-reduced-motion se deja el scroll nativo del navegador y sólo se
    // mantiene ScrollTrigger sincronizado.
    if (reducedMotion) {
      ScrollTrigger.refresh();
      return undefined;
    }

    // 1. Instanciar Lenis con física fluida
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;
    if (typeof window !== "undefined") {
      (window as unknown as { lenis: Lenis }).lenis = lenis;
    }

    // 2. Vincular el evento scroll de Lenis a ScrollTrigger.update()
    lenis.on("scroll", ScrollTrigger.update);

    // 3. Unificar el ticker de GSAP con lenis.raf y desactivar lag smoothing
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // 4. Limpieza (cleanup) en desmontaje para evitar pérdidas de memoria
    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
      if (typeof window !== "undefined") {
        delete (window as unknown as { lenis?: Lenis }).lenis;
      }
    };
  }, [reducedMotion]);

  return <>{children}</>;
}

export default SmoothScroll;
