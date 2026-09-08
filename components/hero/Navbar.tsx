'use client';

import Link from 'next/link';

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full bg-cream-bg transition-all duration-300">
      <div className="mx-auto flex h-20 max-w-[1600px] w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand name en grande sin logo ni subtitulo */}
        <Link
          href="/"
          className="group flex items-center transition-transform duration-200 hover:scale-[1.01]"
          aria-label="Mojo Grille Home"
        >
          <span className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-charcoal-ink leading-none transition-colors group-hover:text-brand-fire">
            MOJO GRILLE
          </span>
        </Link>

        {/* Enlaces de Navegación de Escritorio */}
        <nav className="hidden md:flex items-center gap-8 font-sans text-sm font-semibold text-charcoal-ink/80">
          <Link
            href="#menu"
            className="transition-colors duration-200 hover:text-brand-fire"
          >
            Menu &amp; Bowls
          </Link>
          <Link
            href="#cubanos"
            className="transition-colors duration-200 hover:text-brand-fire"
          >
            Pressed Cubanos
          </Link>
          <Link
            href="#catering"
            className="transition-colors duration-200 hover:text-brand-fire"
          >
            Catering
          </Link>
          <Link
            href="#reviews"
            className="transition-colors duration-200 hover:text-brand-fire"
          >
            Google Reviews
          </Link>
        </nav>

        {/* Botón CTA a la derecha */}
        <div className="flex items-center gap-3">
          <a
            href="#menu"
            className="inline-flex items-center justify-center gap-2 rounded-none bg-brand-fire px-5 py-2.5 font-sans text-sm font-bold text-cream-bg shadow-none transition-all duration-200 hover:bg-charcoal-ink focus:outline-hidden"
          >
            <span>ORDER HOT</span>
            <span className="flex h-2 w-2 rounded-none bg-cream-bg animate-pulse" />
          </a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
