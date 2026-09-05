import React, { useState, useRef, useEffect } from "react";
import { ArrowUp, MapPin, Clock, Send, Sparkles, Heart } from "lucide-react";
import gsap from "gsap";

export interface EditorialFooterProps {
  onOpenCart?: () => void;
}

export function EditorialFooter({ onOpenCart }: EditorialFooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const backToTopRef = useRef<HTMLButtonElement>(null);

  // Efecto magnético interactivo en el microbotón 'Volver Arriba' con GSAP
  useEffect(() => {
    const btn = backToTopRef.current;
    if (!btn || typeof window === "undefined") return;

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
  }, []);

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
      className="relative bg-cream-bg text-charcoal-ink border-t border-charcoal-ink/10 pt-20 pb-8 px-6 md:px-12 select-none overflow-hidden"
    >
      {/* 1. Titular Masivo Superior (Width Completo) */}
      <div className="w-full border-b border-charcoal-ink/10 pb-12 sm:pb-16 overflow-hidden">
        <h1 className="text-[12vw] font-display uppercase tracking-tight text-brand-fire leading-none select-none text-center sm:text-left transition-colors duration-300 hover:text-charcoal-ink">
          MOJO GRILLE
        </h1>
        <div className="flex flex-col sm:flex-row items-center justify-between mt-3 text-xs sm:text-sm font-sans uppercase tracking-widest text-charcoal-ink/70">
          <p className="font-semibold">CUBAN KITCHEN &amp; ARTISANAL PLANCHA · MIAMI, FL</p>
          <p className="font-accent italic text-base sm:text-lg text-brand-fire normal-case mt-1 sm:mt-0">
            authentic criollo flavor marinated 24 hours in citrus mojo
          </p>
        </div>
      </div>

      {/* 2. Grilla de Información (3 Columnas de Alto Impacto) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 py-14 sm:py-18 border-b border-charcoal-ink/10">
        
        {/* Columna 1: Horarios de Plancha y Ubicación Física */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2 text-brand-fire">
            <MapPin className="h-4 w-4" />
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-charcoal-ink">
              Location &amp; Plancha Hours
            </h3>
          </div>

          <div className="space-y-1 font-sans text-sm text-charcoal-ink/85">
            <p className="font-bold text-base text-charcoal-ink">Brownsville Central Kitchen</p>
            <p>2920 NW 27th Ave, Miami, FL 33142</p>
            <p className="text-xs text-charcoal-ink/60">Pickup hubs: Little Havana · Brickell · Doral</p>
          </div>

          <div className="pt-2 border-t border-charcoal-ink/10 space-y-1 font-sans text-xs text-charcoal-ink/75 leading-relaxed">
            <div className="flex items-center gap-1.5 font-bold text-charcoal-ink">
              <Clock className="h-3.5 w-3.5 text-brand-fire" />
              <span>Plancha Active al Momento:</span>
            </div>
            <p>Monday to Thursday: 11:00 AM – 10:00 PM</p>
            <p>Friday &amp; Saturday: 11:00 AM – 11:30 PM</p>
            <p>Sunday: 12:00 PM – 9:00 PM</p>
          </div>
        </div>

        {/* Columna 2: Enlaces de Navegación Rápida */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2 text-brand-fire">
            <Sparkles className="h-4 w-4" />
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-charcoal-ink">
              Quick Navigation
            </h3>
          </div>

          <ul className="space-y-2.5 font-sans text-sm font-semibold text-charcoal-ink/80">
            <li>
              <a
                href="#menu"
                className="hover:text-brand-fire hover:translate-x-1 inline-flex transition-transform duration-200"
              >
                ✦ Full Menu &amp; Criollo Bowls
              </a>
            </li>
            <li>
              <a
                href="#cuban-deconstruction"
                className="hover:text-brand-fire hover:translate-x-1 inline-flex transition-transform duration-200"
              >
                ✦ Anatomy of the Pressed Cubano
              </a>
            </li>
            <li>
              <a
                href="#curated-menu"
                className="hover:text-brand-fire hover:translate-x-1 inline-flex transition-transform duration-200"
              >
                ✦ Plancha Selection (Signature Dishes)
              </a>
            </li>
            <li>
              <a
                href="#districts-catering"
                className="hover:text-brand-fire hover:translate-x-1 inline-flex transition-transform duration-200"
              >
                ✦ Thermal Packaging &amp; Corporate Catering
              </a>
            </li>
            <li>
              <button
                type="button"
                onClick={onOpenCart}
                className="hover:text-brand-fire hover:translate-x-1 inline-flex items-center gap-1.5 transition-transform duration-200 cursor-pointer text-left"
              >
                ✦ View Order / Order Drawer
              </button>
            </li>
          </ul>
        </div>

        {/* Columna 3: Registro a Newsletter en una Sola Línea */}
        <div className="md:col-span-4 space-y-4">
          <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-charcoal-ink">
            Criollo Dispatch &amp; Secret Drops
          </h3>
          <p className="font-sans text-xs sm:text-sm text-charcoal-ink/75 leading-relaxed">
            Get early access to exclusive small-batch citrus mojo, pop-up tastings, and secret perks for Miami gatherings.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="pt-2">
            <div className="flex items-center border-b-2 border-charcoal-ink/30 pb-2 focus-within:border-brand-fire transition-colors">
              <input
                type="email"
                required
                placeholder="your-email@miami.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent font-sans text-sm text-charcoal-ink placeholder:text-charcoal-ink/40 focus:outline-hidden"
              />
              <button
                type="submit"
                className="shrink-0 font-sans text-xs font-extrabold uppercase tracking-widest text-brand-fire hover:text-charcoal-ink transition-colors cursor-pointer px-2 py-1"
              >
                JOIN
              </button>
            </div>
            {subscribed && (
              <p className="mt-2 text-xs font-sans font-bold text-leaf-green animate-in fade-in">
                You're on the list! Welcome to the Mojo Grille table.
              </p>
            )}
          </form>

          <p className="text-[11px] font-sans text-charcoal-ink/50 pt-1">
            No spam. Pure plancha heat, culture, and high-craft criollo food.
          </p>
        </div>

      </div>

      {/* 3. Barra Inferior Legal & Marca de Agua */}
      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-charcoal-ink/60">
        <p>© {new Date().getFullYear()} MOJO GRILLE LLC · ALL RIGHTS RESERVED · MIAMI-LATIN MODERNISM</p>
        <div className="flex items-center gap-4">
          <span>25.7617° N, 80.1918° W</span>
          <span>•</span>
          <span className="inline-flex items-center gap-1">
            Crafted with <Heart className="h-3 w-3 text-brand-fire fill-brand-fire" /> and Seville Sour Orange
          </span>
        </div>
      </div>

      {/* 4. Botonera Flotante 'Volver Arriba' Cuadrada Magnética */}
      <button
        ref={backToTopRef}
        type="button"
        onClick={handleScrollToTop}
        aria-label="Back to top of page"
        className="fixed bottom-6 right-6 z-40 h-12 w-12 rounded-none bg-charcoal-ink text-cream-bg shadow-none flex items-center justify-center hover:bg-brand-fire hover:text-cream-bg transition-colors duration-200 cursor-pointer border-2 border-charcoal-ink active:scale-95 group"
      >
        <ArrowUp className="h-5 w-5 stroke-[2.5] group-hover:-translate-y-0.5 transition-transform duration-200" />
      </button>
    </footer>
  );
}

export default EditorialFooter;
