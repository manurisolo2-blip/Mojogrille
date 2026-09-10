import { useState, useEffect } from "react";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { currency } from "@/data/menu";
import { useCart } from "./cart";
import { whatsappHref } from "./whatsapp";

export function MobileActionBar({ onOpenCart }: { onOpenCart: () => void }) {
  const { count, total, lines, location } = useCart();
  const [isVisible, setIsVisible] = useState(false);

  // Aparece al hacer scroll más allá del Hero (~240px)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setIsVisible(scrollY > 240);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsappUrl = whatsappHref(location, lines, total);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:hidden transition-all duration-500 ease-out transform pointer-events-none ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"
      }`}
    >
      <div className="pointer-events-auto flex items-center justify-between gap-3 rounded-none bg-charcoal-ink p-3 pl-4 text-cream-bg shadow-none">
        {/*
          Lado Izquierdo: Contador y Total Acumulado.
          Es un <button> de verdad. Antes era un div con role="button" y
          tabIndex={0} pero sin onKeyDown: recibía el foco, se anunciaba como
          botón y al pulsar Enter o Espacio no pasaba nada.
        */}
        <button
          type="button"
          className="flex items-center gap-3 cursor-pointer select-none text-left"
          onClick={onOpenCart}
          aria-label={
            count > 0
              ? `Open cart, ${count} ${count === 1 ? "item" : "items"}, ${currency(total)}`
              : "Open cart, empty"
          }
        >
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-none bg-charcoal-ink/90 border border-cream-bg/20">
            <ShoppingBag className="h-5 w-5 text-cream-bg" aria-hidden="true" />
            {/* Badge Verde Cilantro (#2F6A4F / leaf-green) */}
            <span
              aria-hidden="true"
              className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-none bg-leaf-green px-1 font-sans text-xs font-black text-cream-bg"
            >
              {count}
            </span>
          </div>

          <div aria-hidden="true" className="flex flex-col text-left">
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-cream-bg/70">
              {count > 0 ? `${count} item${count > 1 ? "s" : ""}` : "Your Order"}
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-cream-bg leading-tight">
              {count > 0 ? currency(total) : "$0.00"}
            </span>
          </div>
        </button>

        {/* Lado Derecho: Botón Rojo Mojo Scarlet (#C41B0E / brand-fire) */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Order via WhatsApp"
          className="group flex min-h-11 items-center justify-center gap-2 rounded-none bg-brand-fire px-5 py-3 font-sans text-sm font-bold text-cream-bg shadow-none transition-colors duration-150 hover:bg-cream-bg hover:text-charcoal-ink"
        >
          <span>Order Now</span>
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </a>
      </div>
    </div>
  );
}

export { FloatingCravBar } from "./FloatingCravBar";
export default MobileActionBar;
