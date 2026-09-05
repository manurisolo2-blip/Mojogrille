import { useState, useEffect } from "react";
import { ShoppingBag, X, MessageCircle, MapPin, CheckCircle2 } from "lucide-react";
import { currency } from "@/data/menu";
import { useCart } from "./cart";
import { whatsappHref } from "./whatsapp";

export function FloatingCravBar({ onOpenFullCart }: { onOpenFullCart?: () => void }) {
  const { count, total, lines, location, setLocation, availableLocations } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Aparece al hacer scroll más allá del Hero (~260px)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setIsVisible(scrollY > 240);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Chequeo inicial

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsappUrl = whatsappHref(location, lines, total);

  return (
    <>
      {/* Barra de Acción Inferior Flotante (Solo visible en móvil/tablet) */}
      <div
        className={`fixed bottom-4 left-4 right-4 z-50 md:hidden transition-all duration-500 ease-out transform ${
          isVisible
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-24 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between gap-3 rounded-none bg-charcoal-ink p-3 pl-4 text-cream-bg shadow-none border-2 border-charcoal-ink">
          
          {/* Lado Izquierdo: Contador y Total Acumulado */}
          <div
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => (onOpenFullCart ? onOpenFullCart() : setIsModalOpen(true))}
          >
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-none bg-charcoal-ink/90 border border-cream-bg/20">
              <ShoppingBag className="h-5 w-5 text-cream-bg" />
              {/* Badge Verde Cilantro (leaf-green) */}
              <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-none bg-leaf-green px-1 font-mono text-[10px] font-black text-cream-bg border border-charcoal-ink">
                {count}
              </span>
            </div>

            <div className="flex flex-col text-left">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-cream-bg/70">
                {count > 0 ? `${count} item${count > 1 ? "s" : ""}` : "Your Order"}
              </span>
              <span className="font-display text-lg font-bold tracking-tight text-cream-bg leading-tight">
                {count > 0 ? currency(total) : "$0.00"}
              </span>
            </div>
          </div>

          {/* Lado Derecho: Botón Rojo Mojo Scarlet (#E52516 / brand-fire) */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            aria-label="Order via WhatsApp"
            className="group flex items-center justify-center gap-2 rounded-none border-2 border-brand-fire bg-brand-fire px-5 py-3 font-sans text-sm font-bold text-cream-bg shadow-none transition-colors duration-150 hover:bg-cream-bg hover:text-charcoal-ink focus:outline-none"
          >
            <span>Order Now</span>
            <span className="font-bold text-base transition-transform group-hover:translate-x-1">
              ➔
            </span>
          </button>

        </div>
      </div>

      {/* Modal Simplificado de Pedido por WhatsApp */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-charcoal-ink/60 p-0 sm:p-4 backdrop-blur-xs transition-opacity">
          <div
            className="w-full max-w-md rounded-none bg-cream-bg p-5 sm:p-6 shadow-none border-2 border-charcoal-ink text-charcoal-ink max-h-[85vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-order-title"
          >
            {/* Cabecera del Modal */}
            <div className="flex items-center justify-between border-b-2 border-charcoal-ink pb-4">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-none bg-brand-fire text-cream-bg font-display font-bold text-base border border-charcoal-ink">
                  M
                </span>
                <div>
                  <h3 id="modal-order-title" className="font-display text-xl font-bold tracking-tight uppercase text-charcoal-ink">
                    Confirm WhatsApp Order
                  </h3>
                  <p className="font-sans text-xs text-charcoal-ink/60">
                    Mojo Grille Cuban Kitchen • Miami
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-none border border-charcoal-ink/20 p-1.5 text-charcoal-ink/60 hover:bg-surface-sand hover:text-charcoal-ink transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Selector de Sede */}
            <div className="mt-4 rounded-none bg-surface-sand p-3 border border-charcoal-ink/20">
              <div className="flex items-center justify-between mb-2 text-xs font-semibold text-charcoal-ink/70">
                <span className="flex items-center gap-1.5 text-leaf-green font-bold">
                  <CheckCircle2 className="h-4 w-4" /> Selected Location
                </span>
                <span className="font-mono text-[10px] uppercase">Change</span>
              </div>
              <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
                {availableLocations.map((loc) => (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => setLocation(loc.id)}
                    className={`rounded-none px-3 py-1.5 text-xs font-bold transition-colors ${
                      location.id === loc.id
                        ? "bg-brand-fire text-cream-bg border border-charcoal-ink"
                        : "bg-cream-bg text-charcoal-ink border border-charcoal-ink/20 hover:bg-surface-sand"
                    }`}
                  >
                    {loc.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Desglose de Platos Seleccionados */}
            <div className="mt-4">
              <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-charcoal-ink/70 mb-2">
                Order Summary ({count})
              </h4>
              {lines.length === 0 ? (
                <div className="rounded-none border border-dashed border-charcoal-ink/30 bg-surface-sand/50 p-6 text-center">
                  <p className="text-sm font-medium text-charcoal-ink/70">
                    No items selected yet.
                  </p>
                  <p className="mt-1 text-xs text-brand-fire font-semibold">
                    Choose your favorite bowls and cubanos above!
                  </p>
                </div>
              ) : (
                <ul className="space-y-2 max-h-48 overflow-y-auto no-scrollbar rounded-none bg-surface-sand p-3 border border-charcoal-ink/20">
                  {lines.map((line) => (
                    <li
                      key={line.key}
                      className="flex items-start justify-between text-xs py-1.5 border-b border-charcoal-ink/10 last:border-none"
                    >
                      <div>
                        <span className="font-bold text-charcoal-ink">
                          {line.qty}x {line.name}
                        </span>
                        {line.sides.length > 0 && (
                          <p className="text-[10px] text-leaf-green font-semibold">
                            +{line.sides.join(", ")}
                          </p>
                        )}
                      </div>
                      <span className="font-bold text-charcoal-ink">
                        {currency(line.price * line.qty)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Total Estimado */}
            <div className="mt-4 flex items-center justify-between rounded-none bg-surface-sand p-3.5 border border-charcoal-ink/20">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-charcoal-ink">
                Estimated Total
              </span>
              <span className="font-display text-xl font-bold text-brand-fire">
                {currency(total)}
              </span>
            </div>

            {/* Botón Principal para Enviar por WhatsApp */}
            <div className="mt-5 space-y-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsModalOpen(false)}
                className="flex w-full items-center justify-center gap-2.5 rounded-none border-2 border-charcoal-ink bg-leaf-green py-3.5 px-4 font-sans text-sm font-bold text-cream-bg shadow-none transition-all hover:bg-charcoal-ink"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Send Order to WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-full py-2 text-center font-mono text-[11px] uppercase tracking-wider font-semibold text-charcoal-ink/60 hover:text-brand-fire"
              >
                Continue browsing menu
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default FloatingCravBar;
