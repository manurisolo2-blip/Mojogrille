import React, { useId, useState, useRef, useEffect } from "react";
import { ArrowUp, MapPin, Clock, Sparkles, Heart } from "lucide-react";
import gsap from "gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

export interface EditorialFooterProps {
  onOpenCart?: () => void;
}

export function EditorialFooter({ onOpenCart }: EditorialFooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const backToTopRef = useRef<HTMLButtonElement>(null);
  const emailFieldId = useId();
  const reducedMotion = useReducedMotion();

  // Efecto magnético interactivo en el microbotón 'Volver Arriba' con GSAP.
  // Con prefers-reduced-motion ni siquiera se engancha el listener: además de
  // ser movimiento no solicitado, escuchaba `mousemove` en `window` durante
  // toda la vida de la página y calculaba una hipotenusa en cada píxel.
  useEffect(() => {
    const btn = backToTopRef.current;
    if (!btn || typeof window === "undefined") return;
    if (reducedMotion) {
      gsap.set(btn, { x: 0, y: 0 });
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);

      if (distance < 80) {
        gsap.to(btn, {
          x: deltaX * 0.35,
          y: deltaY * 0.35,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.45,
          ease: "elastic.out(1, 0.4)",
          overwrite: "auto",
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.45,
        ease: "elastic.out(1, 0.4)",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      btn.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [reducedMotion]);

  const handleScrollToTop = () => {
    if (typeof window === "undefined") return;

    // Scroll inercial con Lenis si está disponible, con fallback nativo
    const windowWithLenis = window as unknown as {
      lenis?: { scrollTo: (target: number | string, opts?: { duration?: number }) => void };
    };

    if (windowWithLenis.lenis?.scrollTo) {
      windowWithLenis.lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => {
      setSubscribed(false);
    }, 4500);
  };

  return (
    <footer
      id="footer"
      aria-label="Mojo Grille editorial footer"
      className="relative bg-brand-fire text-cream-bg pt-16 pb-28 md:pb-12 px-6 md:px-12 overflow-hidden"
    >
      {/*
        1. Marca de agua superior. Era un <h1>, que daba dos h1 en la home (el
        otro es el titular del hero) y ponía el encabezado principal del
        documento en un adorno del pie. Es decorativo, así que ahora es un div
        oculto a lectores de pantalla: el nombre del negocio ya está en el
        <title>, en el logo de la cabecera y en los datos estructurados.
      */}
      <div className="w-full border-b border-cream-bg/20 pb-10 sm:pb-14 overflow-hidden">
        <div
          aria-hidden="true"
          className="text-[12vw] font-display uppercase tracking-tight text-cream-bg leading-none select-none text-center sm:text-left"
        >
          MOJO GRILLE
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between mt-3 text-sm font-sans uppercase tracking-widest text-cream-bg">
          <p className="font-semibold">CUBAN KITCHEN &amp; ARTISANAL PLANCHA MIAMI, FL</p>
          <p className="font-sans text-sm font-bold uppercase tracking-[0.15em] text-cream-bg mt-1 sm:mt-0">
            AUTHENTIC CRIOLLO FLAVOR 24-HOUR CITRUS MOJO
          </p>
        </div>
      </div>

      {/* 2. Grilla de Información (3 Columnas de Alto Impacto) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 py-12 sm:py-16 border-b border-cream-bg/20">
        
        {/* Columna 1: Horarios de Plancha y Ubicación Física */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2 text-cream-bg">
            <MapPin className="h-4 w-4" />
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-cream-bg">
              Location &amp; Plancha Hours
            </h3>
          </div>

          <div className="space-y-1 font-sans text-base text-cream-bg">
            <p className="font-bold text-base text-cream-bg">Brownsville Central Kitchen</p>
            <p>2920 NW 27th Ave, Miami, FL 33142</p>
            <p className="text-sm text-cream-bg">Pickup hubs: Little Havana, Brickell, Doral</p>
          </div>

          <div className="pt-2 border-t border-cream-bg/20 space-y-1 font-sans text-sm text-cream-bg leading-relaxed">
            <div className="flex items-center gap-1.5 font-bold text-cream-bg">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Plancha Active al Momento:</span>
            </div>
            <p>Monday to Thursday: 11:00 AM to 10:00 PM</p>
            <p>Friday &amp; Saturday: 11:00 AM to 11:30 PM</p>
            <p>Sunday: 12:00 PM to 9:00 PM</p>
          </div>
        </div>

        {/* Columna 2: Enlaces de Navegación Rápida */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2 text-cream-bg">
            <Sparkles className="h-4 w-4" />
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-cream-bg">
              Quick Navigation
            </h3>
          </div>

          <ul className="space-y-2.5 font-sans text-sm font-semibold text-cream-bg">
            <li>
              <a
                href="#menu"
                className="inline-flex min-h-11 items-center hover:underline hover:translate-x-1 transition-transform duration-200"
              >
                Full Menu &amp; Criollo Bowls
              </a>
            </li>
            <li>
              <a
                href="#cuban-deconstruction"
                className="inline-flex min-h-11 items-center hover:underline hover:translate-x-1 transition-transform duration-200"
              >
                Deconstruction of the Pressed Cubano
              </a>
            </li>
            <li>
              <a
                href="#curated-menu"
                className="inline-flex min-h-11 items-center hover:underline hover:translate-x-1 transition-transform duration-200"
              >
                Plancha Selection (Signature Dishes)
              </a>
            </li>
            <li>
              <a
                href="#catering"
                className="inline-flex min-h-11 items-center hover:underline hover:translate-x-1 transition-transform duration-200"
              >
                Thermal Packaging &amp; Corporate Catering
              </a>
            </li>
            <li>
              <button
                type="button"
                onClick={onOpenCart}
                className="inline-flex min-h-11 items-center gap-1.5 hover:underline hover:translate-x-1 transition-transform duration-200 cursor-pointer text-left"
              >
                View Order / Order Drawer
              </button>
            </li>
          </ul>
        </div>

        {/* Columna 3: Registro a Newsletter en una Sola Línea */}
        <div className="md:col-span-4 space-y-4">
          <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-cream-bg">
            Criollo Dispatch &amp; Secret Drops
          </h3>
          <p className="font-sans text-base text-cream-bg leading-relaxed">
            Get early access to exclusive small-batch citrus mojo, pop-up tastings, and secret perks for Miami gatherings.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="pt-2">
            {/*
              Etiqueta real, no sólo placeholder: el placeholder desaparece en
              cuanto escribes y muchos lectores de pantalla no lo anuncian, así
              que el campo se presentaba sin nombre.
            */}
            <label htmlFor={emailFieldId} className="sr-only">
              Email address for the Criollo Dispatch newsletter
            </label>
            <div className="flex items-center border-b-2 border-cream-bg/40 pb-2 focus-within:border-cream-bg transition-colors">
              <input
                id={emailFieldId}
                type="email"
                required
                autoComplete="email"
                placeholder="your-email@miami.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full min-h-11 bg-transparent font-sans text-base text-cream-bg placeholder:text-cream-bg/80 focus:outline-hidden"
              />
              <button
                type="submit"
                className="shrink-0 min-h-11 font-sans text-xs font-extrabold uppercase tracking-widest bg-cream-bg text-brand-fire hover:bg-charcoal-ink hover:text-cream-bg transition-colors cursor-pointer px-4 py-1.5"
              >
                JOIN
              </button>
            </div>
            {/*
              role="status" en un contenedor siempre presente: si la región
              viva se monta a la vez que el texto, muchos lectores no la
              anuncian. Vacío mientras no hay alta.
            */}
            <p role="status" className="mt-2 text-sm font-sans font-bold text-cream-bg">
              {subscribed ? "You're on the list! Welcome to the Mojo Grille table." : ""}
            </p>
          </form>

          <p className="text-sm font-sans text-cream-bg pt-1">
            No spam. Pure plancha heat, culture, and high-craft criollo food.
          </p>
        </div>

      </div>

      {/* 3. Barra Inferior Legal & Marca de Agua */}
      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-cream-bg">
        <p>© {new Date().getFullYear()} MOJO GRILLE LLC ALL RIGHTS RESERVED MIAMI-LATIN MODERNISM</p>
        <div className="flex items-center gap-4">
          <span>25.7617° N, 80.1918° W</span>
          <span className="inline-flex items-center gap-1">
            Crafted with <Heart className="h-3 w-3" aria-hidden="true" /> and Seville Sour Orange
          </span>
        </div>
      </div>

      {/* 4. Botonera Flotante 'Volver Arriba' Cuadrada Magnética */}
      <button
        ref={backToTopRef}
        type="button"
        onClick={handleScrollToTop}
        aria-label="Back to top of page"
        className="fixed bottom-[calc(6.5rem+env(safe-area-inset-bottom))] md:bottom-6 right-6 z-40 h-12 w-12 rounded-none bg-charcoal-ink text-cream-bg shadow-none flex items-center justify-center hover:bg-cream-bg hover:text-brand-fire transition-colors duration-200 cursor-pointer active:scale-95 group"
      >
        <ArrowUp className="h-5 w-5 stroke-[2.5] group-hover:-translate-y-0.5 transition-transform duration-200" />
      </button>
    </footer>
  );
}

export default EditorialFooter;
