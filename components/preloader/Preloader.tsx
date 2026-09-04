'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export interface PreloaderProps {
  onComplete?: () => void;
  duration?: number;
}

export function Preloader({ onComplete, duration = 1.3 }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const counter = { val: 0 };

    const tl = gsap.timeline({
      defaults: { ease: 'power2.out' },
    });

    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    );

    tl.to(
      counter,
      {
        val: 100,
        duration: duration,
        ease: 'power2.inOut',
        onUpdate: () => {
          const currentVal = Math.round(counter.val);
          setProgress(currentVal);
          if (counterRef.current) {
            counterRef.current.textContent = `${currentVal}%`;
          }
        },
      },
      '-=0.2'
    );

    tl.to({}, { duration: 0.15 });

    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: 'power4.inOut',
      onComplete: () => {
        setIsVisible(false);
        document.body.style.overflow = originalOverflow;
        onComplete?.();
      },
    });

    return () => {
      tl.kill();
      document.body.style.overflow = originalOverflow;
    };
  }, [duration, onComplete]);

  if (!isVisible) {
    return null;
  }

  const getPhaseText = (p: number) => {
    if (p < 30) return 'Encendiendo la plancha criolla...';
    if (p < 65) return 'Macerando carnes en mojo cítrico 24 horas...';
    if (p < 95) return 'Alistando tostones dorados y lechón caliente...';
    return '¡Plancha lista al momento! Abriendo cocina...';
  };

  return (
    <aside
      ref={containerRef}
      role="status"
      aria-live="polite"
      aria-label="Cargando experiencia gastronómica de Mojo Grille"
      className="fixed inset-0 z-50 bg-brand-fire text-cream-bg flex flex-col justify-between p-6 sm:p-10 md:p-14 select-none overflow-hidden will-change-transform shadow-2xl"
    >
      <div className="flex items-center justify-between border-b border-cream-bg/20 pb-4 sm:pb-6">
        <div className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-leaf-green ring-4 ring-leaf-green/30 animate-pulse" />
          <span className="font-sans text-xs sm:text-sm font-bold tracking-widest uppercase text-cream-bg">
            Mojo Grille · Cuban Kitchen
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-xs font-mono tracking-wider text-cream-bg/80">
          <span>25.7617° N, 80.1918° W</span>
          <span>•</span>
          <span>EST. MIAMI, FL</span>
        </div>
      </div>

      <div className="my-auto py-8 text-left max-w-5xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-cream-bg/25 bg-cream-bg/10 px-3.5 py-1 text-[11px] font-sans font-semibold uppercase tracking-wider text-cream-bg mb-4 backdrop-blur-xs">
          <span>🔥</span>
          <span>Fase de Preparación Artesanal</span>
        </div>

        <h1
          ref={headlineRef}
          className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tight leading-[0.85] text-cream-bg"
        >
          PREPARANDO LA PLANCHA CRIOLLA · MIAMI FL
        </h1>

        <p className="mt-4 sm:mt-6 font-accent italic text-2xl sm:text-3xl md:text-4xl text-cream-bg/90 lowercase tracking-normal max-w-2xl leading-relaxed">
          lento, crujiente, sazonado al mojo cítrico y hecho al momento.
        </p>
      </div>

      <div className="border-t border-cream-bg/20 pt-5 sm:pt-7">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="w-full sm:max-w-md lg:max-w-lg space-y-2.5">
            <div className="flex items-center justify-between text-xs sm:text-sm font-sans font-medium text-cream-bg/90">
              <span className="animate-pulse">{getPhaseText(progress)}</span>
              <span className="font-mono text-xs opacity-75">{progress}%</span>
            </div>
            
            <div className="h-1.5 w-full rounded-full bg-cream-bg/20 overflow-hidden">
              <div
                className="h-full bg-cream-bg rounded-full transition-all duration-75 ease-out shadow-[0_0_12px_rgba(246,241,232,0.8)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex items-baseline justify-end gap-1">
            <span
              ref={counterRef}
              className="font-display text-7xl sm:text-8xl md:text-9xl font-bold tracking-tight tabular-nums leading-none text-cream-bg"
            >
              0%
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Preloader;
