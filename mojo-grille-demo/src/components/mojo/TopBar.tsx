import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ChevronDown, MapPin, Menu, X, User, Phone, ArrowRight } from "lucide-react";
import { LatinMarketBagIcon } from "./LatinMarketBagIcon";
import { useCart } from "./cart";
import { AuthSwitch } from "../ui/auth-switch";

export function TopBar({ onOpenCart }: { onOpenCart: () => void }) {
  const { count, location, setLocation, availableLocations } = useCart();
  const [open, setOpen] = useState(false);
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Si estamos cerca del tope o cualquier modal/drawer está abierto, mantener visible
    if (latest <= 60 || menuDrawerOpen || accountModalOpen) {
      setIsVisible(true);
      return;
    }

    const previous = scrollY.getPrevious() ?? 0;
    const diff = latest - previous;

    // Umbral de 5px para filtrar inercia o micro-scrolls
    if (diff > 5) {
      setIsVisible(false);
      if (open) setOpen(false);
    } else if (diff < -5) {
      setIsVisible(true);
    }
  });

  useEffect(() => {
    if (menuDrawerOpen || accountModalOpen) {
      setIsVisible(true);
    }
  }, [menuDrawerOpen, accountModalOpen]);

  // Escucha del hash #cuenta para abrir directamente el apartado
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleHashChange = () => {
      if (window.location.hash === "#cuenta") {
        setAccountModalOpen(true);
      }
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    if (!open && !menuDrawerOpen && !accountModalOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (open) {
          setOpen(false);
        } else if (accountModalOpen) {
          setAccountModalOpen(false);
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
  }, [open, menuDrawerOpen, accountModalOpen]);

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: isVisible ? "0%" : "-100%" }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 z-40 bg-cream-bg transition-colors duration-200 shadow-none will-change-transform"
      >
        <div className="bg-cream-bg">
          <nav className="w-full flex items-center justify-between gap-4 px-4 sm:px-6 md:px-8 lg:px-12 py-3.5">
            {/* Extremo Izquierdo: Titular Monumental MOJO GRILLE */}
            <a
              href="#top"
              className="flex min-w-0 items-center group cursor-pointer select-none"
              aria-label="Mojo Grille Home"
            >
              <span className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-charcoal-ink leading-none transition-colors group-hover:text-brand-fire truncate">
                MOJO GRILLE
              </span>
            </a>

            {/* Extremo Derecho: Botones de Cuenta, Menú y Bolsa de Compra (Incorporados al fondo) */}
            <div className="flex shrink-0 items-center gap-3 sm:gap-4">
              {/* Opción de Cuenta / Club Mojo: Incorporado al fondo de la cabecera */}
              <button
                type="button"
                onClick={() => setAccountModalOpen(true)}
                aria-label="Abrir apartado de creación de cuenta y Club Mojo"
                className="flex items-center gap-1.5 bg-transparent px-2 sm:px-2.5 py-1.5 font-sans text-xs uppercase tracking-widest font-bold text-charcoal-ink transition-colors hover:text-brand-fire hover:bg-charcoal-ink/5 cursor-pointer select-none"
              >
                <User className="h-4 w-4 stroke-[2.2]" />
                <span className="hidden sm:inline">CUENTA</span>
              </button>

              {/* Opción de Menú: Incorporado al fondo de la cabecera */}
              <button
                type="button"
                onClick={() => setMenuDrawerOpen(true)}
                aria-label="Abrir menú de navegación y sedes"
                aria-expanded={menuDrawerOpen}
                className="flex items-center gap-1.5 bg-transparent px-2 sm:px-2.5 py-1.5 font-sans text-xs uppercase tracking-widest font-bold text-charcoal-ink transition-colors hover:text-brand-fire hover:bg-charcoal-ink/5 cursor-pointer select-none"
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
      </motion.header>

      {/* Menú Lateral Desplegable (Slide-over Drawer) */}
      <AnimatePresence>
        {menuDrawerOpen && (
          <div className="fixed inset-0 z-50">
            {/* Backdrop con desenfoque sutil */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-charcoal-ink/40 backdrop-blur-xs"
              onClick={() => setMenuDrawerOpen(false)}
              aria-hidden="true"
            />

            {/* Panel Lateral Drawer en Criollo Cream */}
            {/* Panel Lateral Drawer en Criollo Cream (Minimalista, sin líneas ni recuadros) */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 36 }}
              role="dialog"
              aria-label="Menú de navegación y sedes"
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-cream-bg p-6 sm:p-8 flex flex-col justify-between overflow-y-auto shadow-2xl"
            >
              <div className="space-y-8">
                {/* Encabezado del Menú Drawer */}
                <div className="flex items-center justify-between">
                  <span className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-charcoal-ink">
                    MOJO <span className="text-brand-fire">MENÚ</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setMenuDrawerOpen(false)}
                    aria-label="Cerrar menú"
                    className="p-1.5 text-charcoal-ink hover:text-brand-fire transition-colors cursor-pointer"
                  >
                    <X className="h-6 w-6 stroke-[2.2]" />
                  </button>
                </div>

                {/* 1. NAVEGACIÓN PRINCIPAL (Minimalista, editorial, sin recuadros) */}
                <nav className="space-y-2">
                  <span className="font-sans text-[11px] font-black uppercase tracking-widest text-brand-fire block mb-1">
                    CARTA & EXPERIENCIA
                  </span>
                  {[
                    { href: "#menu", label: "Menú & Bowls Criollos" },
                    { href: "#cubanos", label: "El Sándwich Cubano 3D" },
                    { href: "#reviews", label: "Reseñas Verificadas" },
                    { href: "#catering", label: "Catering para Eventos" },
                  ].map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuDrawerOpen(false)}
                      className="group flex items-center justify-between py-2 text-charcoal-ink hover:text-brand-fire transition-colors cursor-pointer"
                    >
                      <span className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight">
                        {item.label}
                      </span>
                      <ArrowRight className="h-5 w-5 text-brand-fire opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </a>
                  ))}
                </nav>

                {/* 2. SEDES MIAMI (Adaptado al fondo, sin recuadros, badges ni líneas) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-[11px] font-black uppercase tracking-widest text-brand-fire">
                      SEDES MIAMI
                    </span>
                    <span className="font-sans text-xs font-bold text-leaf-green">
                      ● Abierto hoy
                    </span>
                  </div>

                  {/* Selector interactivo de sede */}
                  <div ref={dropdownRef} className="relative">
                    <button
                      type="button"
                      onClick={() => setOpen((v) => !v)}
                      aria-haspopup="listbox"
                      aria-expanded={open}
                      aria-label={`Select location, currently ${location.name}`}
                      className="flex items-center gap-2 font-display text-2xl font-black uppercase tracking-tight text-charcoal-ink hover:text-brand-fire transition-colors cursor-pointer select-none"
                    >
                      <MapPin className="h-4 w-4 text-brand-fire stroke-[2.2] shrink-0" />
                      <span>{location.name}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-charcoal-ink/60 transition-transform shrink-0 ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {open && (
                      <ul
                        role="listbox"
                        aria-label="Miami restaurant locations"
                        className="absolute left-0 right-0 top-full mt-2 py-2 bg-cream-bg shadow-xl z-50 space-y-1"
                      >
                        {availableLocations.map((loc) => (
                          <li key={loc.id} role="option" aria-selected={loc.id === location.id}>
                            <button
                              type="button"
                              onClick={() => {
                                setLocation(loc.id);
                                setOpen(false);
                              }}
                              className={`block w-full px-3 py-2 text-left font-sans text-xs uppercase tracking-wider font-bold transition-colors ${
                                loc.id === location.id
                                  ? "font-black text-brand-fire"
                                  : "text-charcoal-ink hover:text-brand-fire"
                              }`}
                            >
                              <div>{loc.name}</div>
                              <div className="text-[11px] text-charcoal-ink/60 font-normal">
                                {loc.address.street}
                              </div>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <p className="font-sans text-xs text-charcoal-ink/80">
                    {location.address.fullAddress}
                  </p>
                  <p className="font-sans text-xs text-charcoal-ink/60">
                    Horario: 11:00 AM – 10:00 PM · Cocina criolla al momento
                  </p>
                  <a
                    href={`tel:${location.phone.replace(/[^0-9+]/g, "")}`}
                    className="inline-flex items-center gap-1.5 text-brand-fire font-bold text-xs uppercase tracking-wider hover:underline pt-0.5"
                  >
                    <Phone className="h-3 w-3" />
                    <span>{location.phone}</span>
                  </a>
                </div>

                {/* 3. CLUB MOJO / MI CUENTA (Acceso limpio sin duplicar tarjetas ni formularios) */}
                <div className="space-y-1.5">
                  <span className="font-sans text-[11px] font-black uppercase tracking-widest text-brand-fire block">
                    CLUB MOJO MIAMI
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuDrawerOpen(false);
                      setAccountModalOpen(true);
                    }}
                    className="group text-left cursor-pointer select-none"
                  >
                    <p className="font-display text-2xl font-black uppercase tracking-tight text-charcoal-ink group-hover:text-brand-fire transition-colors">
                      MI PASAPORTE & BENEFICIOS →
                    </p>
                    <p className="font-sans text-xs text-charcoal-ink/75 mt-0.5">
                      Gana 1 cafecito de bienvenida y acumula puntos en cada orden.
                    </p>
                  </button>
                </div>
              </div>

              {/* Pie del Menú Drawer */}
              <div className="pt-8 flex items-center justify-between text-[11px] text-charcoal-ink/70 font-sans uppercase tracking-widest font-bold">
                <span>Miami Cuban Kitchen</span>
                <span className="text-brand-fire">Al Momento</span>
              </div>
            </motion.aside>
        </div>
      )}
    </AnimatePresence>

    {/* Apartado Dedicado de Creación de Cuenta y Autenticación (Modal / Dialog) */}
    <AnimatePresence>
      {accountModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop con desenfoque suave */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-charcoal-ink/60 backdrop-blur-xs"
            onClick={() => setAccountModalOpen(false)}
            aria-hidden="true"
          />

          {/* Contenedor del Modal Dual-Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", stiffness: 450, damping: 32 }}
            role="dialog"
            aria-modal="true"
            aria-label="Apartado de cuenta y Club Mojo"
            className="relative z-50 w-full max-w-3xl lg:max-w-4xl bg-cream-bg rounded-3xl sm:rounded-[28px] shadow-2xl my-auto overflow-hidden border border-charcoal-ink/10"
          >
            {/* Botón de Cierre Flotante Minimalista */}
            <button
              type="button"
              onClick={() => setAccountModalOpen(false)}
              aria-label="Cerrar apartado de cuenta"
              className="absolute top-3.5 right-3.5 z-40 p-2 rounded-full text-charcoal-ink hover:text-brand-fire bg-cream-bg/80 backdrop-blur-xs hover:bg-cream-bg shadow-sm transition-all cursor-pointer"
            >
              <X className="h-5 w-5 stroke-[2.2]" />
            </button>

            {/* Módulo de Autenticación / Pasaporte Dual Panel */}
            <AuthSwitch onAuthSuccess={() => {}} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
    </>
  );
}

export default TopBar;
