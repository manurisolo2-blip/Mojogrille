'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-charcoal-ink/10 bg-cream-bg/90 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo a la izquierda */}
        <Link
          href="/"
          className="group flex items-baseline gap-2 transition-transform duration-200 hover:scale-[1.02]"
          aria-label="Mojo Grille Inicio"
        >
          <span className="font-display text-3xl font-bold tracking-tight text-charcoal-ink">
            MOJO<span className="text-brand-fire">GRILLE</span>
          </span>
          <span className="hidden sm:inline-block rounded-full bg-leaf-green/15 px-2.5 py-0.5 font-sans text-[11px] font-bold tracking-widest text-leaf-green uppercase">
            Miami
          </span>
        </Link>

        {/* Enlaces de Navegación de Escritorio */}
        <nav className="hidden md:flex items-center gap-8 font-sans text-sm font-semibold text-charcoal-ink/80">
          <Link
            href="#menu"
            className="transition-colors duration-200 hover:text-brand-fire"
          >
            Menú &amp; Bowls
          </Link>
          <Link
            href="#cubanos"
            className="transition-colors duration-200 hover:text-brand-fire"
          >
            Sándwiches Prensados
          </Link>
          <Link
            href="#catering"
            className="transition-colors duration-200 hover:text-brand-fire"
          >
            Catering
          </Link>
          <Link
            href="#locations"
            className="transition-colors duration-200 hover:text-brand-fire"
          >
            Sedes (Miami)
          </Link>
        </nav>

        {/* Botón CTA a la derecha con microanimación */}
        <div className="flex items-center gap-3">
          <motion.a
            href="#menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-fire px-5 py-2.5 font-sans text-sm font-bold text-cream-bg shadow-md shadow-brand-fire/25 transition-all duration-200 hover:bg-brand-fire/90 focus:outline-hidden focus:ring-2 focus:ring-brand-fire focus:ring-offset-2"
          >
            <span>Ordenar Ahora</span>
            <span className="flex h-2 w-2 rounded-full bg-cream-bg animate-pulse" />
          </motion.a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
