'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export interface PreloaderProps {
  /**
   * Callback invocado inmediatamente al terminar de subir la cortina,
   * permitiendo desbloquear el scroll inercial e iniciar la entrada del Hero.
   */
  onComplete?: () => void;
  /**
   * Duración en segundos para la cuenta de 0% a 100%.
   * Por defecto 1.8 segundos según especificación editorial.
   */
  duration?: number;
}

export function Preloader({ onComplete, duration = 1.8 }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Bloquear scroll nativo e inercial de Lenis durante la precarga
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if ((window as unknown as { lenis?: { stop: () => void } }).lenis) {
      (window as unknown as { lenis: { stop: () => void } }).lenis.stop();
    }

    const counter = { val: 0 };
    const tl = gsap.timeline();

    // 1. Conteo dinámico de 0% a 100% en exactamente 1.8 segundos
    tl.to(counter, {
      val: 100,
      duration: duration,
      ease: 'power2.inOut',
      onUpdate: () => {
        const currentVal = Math.round(counter.val);
        if (counterRef.current) {
          counterRef.current.textContent = `${currentVal}%`;
        }
      },
    });

    // 2. Breve micro-pausa de 0.05s para percibir el 100% completo
    tl.to({}, { duration: 0.05 });

    // 3. Cortina de salida deslizándose hacia arriba con curva cinematográfica
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: 'power4.inOut',
      onComplete: () => {
        setIsLoaded(true);
        setIsVisible(false);
        document.body.style.overflow = originalOverflow;

        // Desbloquear scroll inercial de Lenis
        if ((window as unknown as { lenis?: { start: () => void } }).lenis) {
          (window as unknown as { lenis: { start: () => void } }).lenis.start();
        }

        onComplete?.();
      },
    });

    return () => {
      tl.kill();
      document.body.style.overflow = originalOverflow;
      if ((window as unknown as { lenis?: { start: () => void } }).lenis) {
        (window as unknown as { lenis: { start: () => void } }).lenis.start();
      }
    };
  }, [duration, onComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <aside
      ref={containerRef}
      role="status"
      aria-live="polite"
      aria-label="Loading Mojo Grille artisanal dining experience"
      data-loaded={isLoaded}
      className="fixed inset-0 z-[9999] bg-brand-fire text-cream-bg flex flex-col justify-between p-6 md:p-12 overflow-hidden select-none will-change-transform shadow-none"
    >
      {/* Barra Superior Editorial */}
      <div className="flex items-center justify-between border-b border-cream-bg/20 pb-4">
        <span className="font-sans text-xs sm:text-sm font-semibold tracking-widest uppercase text-cream-bg">
          MOJO GRILLE MIAMI ARTISANAL KITCHEN
        </span>
        <span className="font-sans text-xs sm:text-sm tracking-widest text-cream-bg/80">
          25.7617° N, 80.1918° W
        </span>
      </div>

      {/* Centro Monumental: Contador Display + Titular Editorial */}
      <div className="my-auto py-8 text-center flex flex-col items-center justify-center">
        <div className="overflow-hidden">
          <span
            ref={counterRef}
            className="block font-display text-[22vw] sm:text-[20vw] md:text-[18vw] font-bold leading-[0.8] tracking-tight tabular-nums text-cream-bg select-none"
          >
            0%
          </span>
        </div>
        <p className="mt-6 sm:mt-8 font-sans text-xs sm:text-sm md:text-base font-bold uppercase tracking-widest text-cream-bg/90">
          HEATING UP THE CRIOLLO PLANCHA...
        </p>
      </div>

      {/* Barra Inferior Editorial */}
      <div className="border-t border-cream-bg/20 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="font-sans text-xs sm:text-sm font-medium tracking-widest uppercase text-cream-bg/80">
          SLOW ROASTED CITRUS MARINATED EST. MIAMI
        </p>
        <div className="hidden sm:flex items-center gap-2">
          <span className="h-2 w-2 rounded-none bg-cream-bg animate-pulse" aria-hidden="true" />
          <span className="font-sans text-[11px] font-bold uppercase tracking-widest text-cream-bg/70">
            100% ARTISANAL MOJO
          </span>
        </div>
      </div>
    </aside>
  );
}

export default Preloader;
