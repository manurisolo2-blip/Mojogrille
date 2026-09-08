import { useEffect, useRef, useState } from "react";
import { ChevronDown, MapPin, Menu, X, UserPlus, Phone, ArrowRight } from "lucide-react";
import { LatinMarketBagIcon } from "./LatinMarketBagIcon";
import { useCart } from "./cart";
import { AuthSwitch } from "../ui/auth-switch";

export function TopBar({ onOpenCart }: { onOpenCart: () => void }) {
  const { count, location, setLocation, availableLocations } = useCart();
  const [open, setOpen] = useState(false);
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);
  const [accountToast, setAccountToast] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open && !menuDrawerOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (open) {
          setOpen(false);
        } else if (menuDrawerOpen) {
          setMenuDrawerOpen(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, menuDrawerOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 bg-cream-bg transition-colors duration-200">
        <div className="bg-cream-bg">
          <nav className="w-full flex items-center justify-between gap-4 px-4 sm:px-6 md:px-8 lg:px-12 py-3.5">
            {/* Extremo Izquierdo: Titular Monumental MOJO GRILLE */}
            <a
              href="#top"
              className="flex min-w-0 items-center group cursor-pointer select-none"
              aria-label="Mojo Grille Home"
            >
              <span className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-charcoal-ink leading-none transition-colors group-hover:text-brand-fire">
                MOJO GRILLE
              </span>
            </a>

            {/* Extremo Derecho: Botón MENÚ y Bolsa de Compra */}
            <div className="flex shrink-0 items-center gap-3">
              {/* Opción de Menú: Siguiendo el diseño editorial brutalista */}
              <button
                type="button"
                onClick={() => setMenuDrawerOpen(true)}
                aria-label="Abrir menú de navegación y sedes"
                aria-expanded={menuDrawerOpen}
                className="flex items-center gap-2 rounded-none border border-charcoal-ink/20 bg-surface-sand px-3.5 py-2 font-sans text-xs uppercase tracking-widest font-bold text-charcoal-ink transition-all hover:bg-charcoal-ink hover:text-cream-bg cursor-pointer select-none"
              >
                <Menu className="h-4 w-4 stroke-[2.2]" />
                <span className="hidden sm:inline">MENÚ</span>
              </button>

              {/* Bolsa de Compra: Círculo Rojo con Bolsa de Supermercado Latinoamericano */}
              <button
                type="button"
                onClick={onOpenCart}
                aria-label="View shopping bag"
                className="relative grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-full bg-brand-fire text-cream-bg shadow-none transition-all hover:bg-charcoal-ink active:scale-95 cursor-pointer select-none"
              >
                <LatinMarketBagIcon className="h-5 w-5 stroke-[2] text-cream-bg" />
                {count > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full border border-cream-bg bg-leaf-green px-1 font-sans text-[10px] font-black text-cream-bg shadow-none">
                    {count}
                  </span>
                )}
                {count > 0 && (
                  <span className="absolute inset-0 animate-ping rounded-full border border-brand-fire/40 pointer-events-none" />
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Menú Lateral Desplegable (Slide-over Drawer) */}
      {menuDrawerOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop con desenfoque sutil */}
          <div
            className="fixed inset-0 bg-charcoal-ink/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMenuDrawerOpen(false)}
            aria-hidden="true"
          />

          {/* Panel Lateral Drawer en Criollo Cream */}
          <aside
            role="dialog"
            aria-label="Menú de navegación y sedes"
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-cream-bg border-l border-charcoal-ink/15 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto shadow-2xl"
          >
            <div>
              {/* Encabezado del Menú Drawer */}
              <div className="flex items-center justify-between pb-5 border-b border-charcoal-ink/10">
                <span className="font-display text-3xl font-black uppercase tracking-tight text-charcoal-ink">
                  MOJO <span className="text-brand-fire">MENÚ</span>
                </span>
                <button
                  type="button"
                  onClick={() => setMenuDrawerOpen(false)}
                  aria-label="Cerrar menú"
                  className="grid h-9 w-9 place-items-center rounded-none border border-charcoal-ink/20 bg-surface-sand text-charcoal-ink hover:bg-charcoal-ink hover:text-cream-bg transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5 stroke-[2.2]" />
                </button>
              </div>

              {/* Contenido del Menú Drawer */}
              <div className="py-6 space-y-6">
                {/* 1. SECCIÓN: UBICACIÓN DEL LUGAR */}
                <div className="rounded-none bg-surface-sand p-4 border border-charcoal-ink/10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-brand-fire stroke-[2.2]" />
                      <span className="font-sans text-[11px] font-black uppercase tracking-widest text-charcoal-ink">
                        UBICACIÓN / SEDES MIAMI
                      </span>
                    </div>
                    <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-leaf-green bg-leaf-green/10 px-2 py-0.5 border border-leaf-green/20">
                      Abierto Hoy
                    </span>
                  </div>

                  {/* Selector interactivo de sede con atributos ARIA requeridos */}
                  <div ref={dropdownRef} className="relative">
                    <button
                      type="button"
                      onClick={() => setOpen((v) => !v)}
                      aria-haspopup="listbox"
                      aria-expanded={open}
                      aria-label={`Select location, currently ${location.name}`}
                      className="w-full flex items-center justify-between gap-2 rounded-none border border-charcoal-ink/15 bg-cream-bg px-3.5 py-2.5 font-sans text-xs uppercase tracking-wider font-bold text-charcoal-ink transition-colors hover:bg-cream-bg/80 select-none shadow-none cursor-pointer"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <MapPin className="h-3.5 w-3.5 text-brand-fire stroke-[2.2] shrink-0" />
                        <span className="truncate font-bold">{location.name}</span>
                      </div>
                      <ChevronDown
                        className={`h-3.5 w-3.5 text-charcoal-ink/60 transition-transform shrink-0 ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {open && (
                      <ul
                        role="listbox"
                        aria-label="Miami restaurant locations"
                        className="absolute left-0 right-0 top-full mt-1.5 overflow-hidden rounded-none bg-cream-bg shadow-xl z-50 border border-charcoal-ink/15"
                      >
                        {availableLocations.map((loc) => (
                          <li key={loc.id} role="option" aria-selected={loc.id === location.id}>
                            <button
                              type="button"
                              onClick={() => {
                                setLocation(loc.id);
                                setOpen(false);
                              }}
                              className={`block w-full px-4 py-2.5 text-left font-sans text-sm transition-colors hover:bg-surface-sand ${
                                loc.id === location.id
                                  ? "font-bold text-brand-fire bg-surface-sand"
                                  : "text-charcoal-ink"
                              }`}
                            >
                              <div className="font-semibold text-xs uppercase tracking-wide">
                                {loc.name}
                              </div>
                              <div className="text-[11px] text-charcoal-ink/70 truncate">
                                {loc.address.street}
                              </div>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Ficha técnica detallada de la sede */}
                  <div className="mt-3 pt-3 border-t border-charcoal-ink/10 space-y-1.5 font-sans text-xs text-charcoal-ink/80">
                    <p className="font-semibold text-charcoal-ink">
                      {location.address.fullAddress}
                    </p>
                    <p className="text-[11px] text-charcoal-ink/70">
                      Horario: 11:00 AM – 10:00 PM · Cocina criolla al momento
                    </p>
                    <a
                      href={`tel:${location.phone.replace(/[^0-9+]/g, "")}`}
                      className="inline-flex items-center gap-1.5 text-brand-fire font-bold text-[11px] uppercase tracking-wider hover:underline pt-1"
                    >
                      <Phone className="h-3 w-3" />
                      <span>{location.phone}</span>
                    </a>
                  </div>
                </div>

                {/* 2. SECCIÓN: APARTADO PARA CREAR CUENTA (EN PREPARACIÓN) */}
                <div className="rounded-none bg-surface-sand/80 p-4 border border-charcoal-ink/10 relative overflow-hidden">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-sans text-[10px] font-black uppercase tracking-widest text-cream-bg bg-brand-fire px-2 py-0.5">
                      CLUB MOJO
                    </span>
                    <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-charcoal-ink/60 border border-charcoal-ink/20 px-1.5 py-0.5">
                      PRÓXIMAMENTE
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-black uppercase tracking-tight text-charcoal-ink">
                    CREAR CUENTA
                  </h3>
                  <p className="font-sans text-xs text-charcoal-ink/80 mt-1 leading-relaxed">
                    Únete a la familia Mojo Grille para acumular puntos por cada lechón o bowl, recibir un cafecito de cortesía en tu cumpleaños y pedir en 1 clic.
                  </p>
                  <div className="my-3.5">
                    <AuthSwitch title="Component Example" />
                  </div>
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={() => setAccountToast(true)}
                      className="w-full flex items-center justify-center gap-2 rounded-none border border-brand-fire bg-cream-bg py-2.5 px-4 font-sans text-xs font-bold uppercase tracking-wider text-brand-fire transition-all hover:bg-brand-fire hover:text-cream-bg cursor-pointer select-none"
                    >
                      <UserPlus className="h-3.5 w-3.5 stroke-[2.2]" />
                      <span>REGISTRARSE (PRONTO)</span>
                    </button>
                  </div>
                  {accountToast && (
                    <p className="mt-2.5 text-[11px] font-sans font-bold text-leaf-green bg-leaf-green/10 border border-leaf-green/20 p-2 text-center">
                      ✓ Apartado en preparación: ¡Estamos horneando la experiencia de usuarios! Estará disponible muy pronto.
                    </p>
                  )}
                </div>

                {/* 3. SECCIÓN: NAVEGACIÓN DIRECTA */}
                <div className="space-y-1 pt-2">
                  <div className="font-sans text-[10px] font-bold uppercase tracking-widest text-charcoal-ink/50 px-1 mb-2">
                    SECCIONES DE LA CARTA
                  </div>
                  <nav className="space-y-1">
                    {[
                      { href: "#menu", label: "Menú & Bowls de Lechón" },
                      { href: "#cubanos", label: "El Sándwich Cubano 3D" },
                      { href: "#reviews", label: "Reseñas de Google" },
                      { href: "#catering", label: "Catering para Eventos" },
                    ].map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={() => setMenuDrawerOpen(false)}
                        className="flex items-center justify-between p-3 font-sans text-sm font-bold uppercase tracking-wide text-charcoal-ink hover:bg-surface-sand hover:text-brand-fire transition-colors cursor-pointer"
                      >
                        <span>{item.label}</span>
                        <ArrowRight className="h-4 w-4 stroke-[2] opacity-50" />
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </div>

            {/* Pie del Menú Drawer */}
            <div className="pt-4 border-t border-charcoal-ink/10 flex items-center justify-between text-[11px] text-charcoal-ink/60 font-sans uppercase tracking-wider">
              <span>Miami Cuban Kitchen</span>
              <span className="font-bold text-brand-fire">Al Momento</span>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

export default TopBar;
