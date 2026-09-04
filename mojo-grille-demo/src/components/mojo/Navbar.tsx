export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-charcoal-ink/10 bg-cream-bg/90 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex h-20 max-w-[1600px] w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo a la izquierda */}
        <a
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
        </a>

        {/* Enlaces de Navegación de Escritorio */}
        <nav className="hidden md:flex items-center gap-8 font-sans text-sm font-semibold text-charcoal-ink/80">
          <a
            href="#menu"
            className="transition-colors duration-200 hover:text-brand-fire"
          >
            Menú &amp; Bowls
          </a>
          <a
            href="#cubanos"
            className="transition-colors duration-200 hover:text-brand-fire"
          >
            Sándwiches Prensados
          </a>
          <a
            href="#catering"
            className="transition-colors duration-200 hover:text-brand-fire"
          >
            Catering
          </a>
          <a
            href="#locations"
            className="transition-colors duration-200 hover:text-brand-fire"
          >
            Sedes (Miami)
          </a>
        </nav>

        {/* Botón CTA a la derecha con microanimación */}
        <div className="flex items-center gap-3">
          <a
            href="#menu"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-fire px-5 py-2.5 font-sans text-sm font-bold text-cream-bg shadow-md shadow-brand-fire/25 transition-all duration-200 hover:scale-105 hover:bg-brand-fire/90 active:scale-95 focus:outline-hidden focus:ring-2 focus:ring-brand-fire focus:ring-offset-2"
          >
            <span>ORDENAR CALIENTE</span>
            <span className="flex h-2 w-2 rounded-full bg-cream-bg animate-pulse" />
          </a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;