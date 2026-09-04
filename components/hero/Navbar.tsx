'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#EAE5DC]/80 bg-[#FAF8F5]/80 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo a la izquierda */}
        <Link
          href="/"
          className="group flex items-baseline gap-2 transition-transform duration-200 hover:scale-[1.02]"
          aria-label="Mojo Grille Inicio"
        >
          <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1917]">
            MOJO<span className="text-[#D95327]">GRILLE</span>
          </span>
          <span className="hidden sm:inline-block rounded-full bg-[#4D7C0F]/15 px-2.5 py-0.5 font-sans text-[11px] font-semibold tracking-wider text-[#4D7C0F] uppercase">
            Miami
          </span>
        </Link>

        {/* Enlaces de Navegación de Escritorio */}
        <nav className="hidden md:flex items-center gap-8 font-sans text-sm font-semibold text-[#1C1917]/80">
          <Link
            href="#menu"
            className="transition-colors duration-200 hover:text-[#D95327]"
          >
            Menú & Bowls
          </Link>
          <Link
            href="#cubanos"
            className="transition-colors duration-200 hover:text-[#D95327]"
          >
            Sándwiches Prensados
          </Link>
          <Link
            href="#catering"
            className="transition-colors duration-200 hover:text-[#D95327]"
          >
            Catering
          </Link>
          <Link
            href="#locations"
            className="transition-colors duration-200 hover:text-[#D95327]"
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
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D95327] px-5 py-2.5 font-sans text-sm font-bold text-white shadow-md shadow-[#D95327]/25 transition-all duration-200 hover:bg-[#B83E16] focus:outline-hidden focus:ring-2 focus:ring-[#D95327] focus:ring-offset-2"
          >
            <span>Ordenar Ahora</span>
            <span className="flex h-2 w-2 rounded-full bg-white animate-pulse" />
          </motion.a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
