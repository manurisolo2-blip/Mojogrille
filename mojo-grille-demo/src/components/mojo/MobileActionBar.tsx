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
      <div className="pointer-events-auto flex items-center justify-between gap-3 rounded-2xl bg-[#1C1917] p-3 pl-4 text-white shadow-[0_16px_36px_rgba(0,0,0,0.45)] border border-[#292524] backdrop-blur-lg">
        {/* Lado Izquierdo: Contador y Total Acumulado */}
        <div
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={onOpenCart}
          role="button"
          tabIndex={0}
          aria-label="Abrir carrito"
        >
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-stone-800/90 border border-stone-700">
            <ShoppingBag className="h-5 w-5 text-[#FAF8F5]" />
            {/* Badge Verde Lima (#4D7C0F) */}
            <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#4D7C0F] px-1 font-sans text-[11px] font-black text-white shadow-xs">
              {count}
            </span>
          </div>

          <div className="flex flex-col text-left">
            <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-[#FAF8F5]/70">
              {count > 0 ? `${count} plato${count > 1 ? "s" : ""}` : "Tu Pedido"}
            </span>
            <span className="font-sans text-base font-black tracking-tight text-white">
              {count > 0 ? currency(total) : "$0.00"}
            </span>
          </div>
        </div>

        {/* Lado Derecho: Botón Terracota (#D95327) con pulsación elástica */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Hacer Pedido por WhatsApp"
          className="group flex items-center justify-center gap-2 rounded-xl bg-[#D95327] px-5 py-3 font-sans text-sm font-bold text-white shadow-md shadow-[#D95327]/30 transition-transform duration-150 hover:bg-[#B83E16] active:scale-95 focus:outline-none"
        >
          <span>Hacer Pedido</span>
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
