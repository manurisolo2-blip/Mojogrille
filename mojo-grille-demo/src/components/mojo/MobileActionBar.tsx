import { useState, useEffect } from "react";
import { ShoppingBag } from "lucide-react";
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
      <div className="pointer-events-auto flex items-center justify-between gap-3 rounded-none bg-charcoal-ink p-3 pl-4 text-cream-bg shadow-none border-2 border-charcoal-ink">
        {/* Lado Izquierdo: Contador y Total Acumulado */}
        <div
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={onOpenCart}
          role="button"
          tabIndex={0}
          aria-label="Open cart"
        >
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-none bg-charcoal-ink/90 border border-cream-bg/20">
            <ShoppingBag className="h-5 w-5 text-cream-bg" />
            {/* Badge Verde Cilantro (#2F6A4F / leaf-green) */}
            <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-none bg-leaf-green px-1 font-sans text-[10px] font-black text-cream-bg border border-charcoal-ink">
              {count}
            </span>
          </div>

          <div className="flex flex-col text-left">
            <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-cream-bg/70">
              {count > 0 ? `${count} item${count > 1 ? "s" : ""}` : "Your Order"}
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-cream-bg leading-tight">
              {count > 0 ? currency(total) : "$0.00"}
            </span>
          </div>
        </div>

        {/* Lado Derecho: Botón Rojo Mojo Scarlet (#E52516 / brand-fire) */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Order via WhatsApp"
          className="group flex items-center justify-center gap-2 rounded-none border-2 border-brand-fire bg-brand-fire px-5 py-3 font-sans text-sm font-bold text-cream-bg shadow-none transition-colors duration-150 hover:bg-cream-bg hover:text-charcoal-ink focus:outline-none"
        >
          <span>Order Now</span>
          <span className="font-bold text-base transition-transform group-hover:translate-x-1">
            ➔
          </span>
        </a>
      </div>
    </div>
  );
}

export { FloatingCravBar } from "./FloatingCravBar";
export default MobileActionBar;
