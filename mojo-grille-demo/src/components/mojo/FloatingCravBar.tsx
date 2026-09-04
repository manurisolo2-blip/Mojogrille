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
        <div className="flex items-center justify-between gap-3 rounded-2xl bg-[#1C1917] p-3 pl-4 text-white shadow-[0_16px_36px_rgba(0,0,0,0.45)] border border-[#292524] backdrop-blur-lg">
          
          {/* Lado Izquierdo: Contador y Total Acumulado */}
          <div
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => (onOpenFullCart ? onOpenFullCart() : setIsModalOpen(true))}
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
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            aria-label="Hacer Pedido por WhatsApp"
            className="group flex items-center justify-center gap-2 rounded-xl bg-[#D95327] px-5 py-3 font-sans text-sm font-bold text-white shadow-md shadow-[#D95327]/30 transition-transform duration-150 hover:bg-[#B83E16] active:scale-95 focus:outline-none"
          >
            <span>Hacer Pedido</span>
            <span className="font-bold text-base transition-transform group-hover:translate-x-1">
              ➔
            </span>
          </button>

        </div>
      </div>

      {/* Modal Simplificado de Pedido por WhatsApp */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4 backdrop-blur-xs transition-opacity">
          <div
            className="w-full max-w-md rounded-t-3xl sm:rounded-3xl bg-[#FAF8F5] p-5 sm:p-6 shadow-2xl border border-[#EAE5DC] text-[#1C1917] max-h-[85vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-order-title"
          >
            {/* Cabecera del Modal */}
            <div className="flex items-center justify-between border-b border-[#EAE5DC] pb-4">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#D95327] text-white font-serif font-bold text-sm">
                  M
                </span>
                <div>
                  <h3 id="modal-order-title" className="font-serif text-lg font-bold text-[#1C1917]">
                    Confirmar Pedido WhatsApp
                  </h3>
                  <p className="font-sans text-xs text-[#78716C]">
                    Mojo Grille Cuban Kitchen • Miami
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-1.5 text-[#78716C] hover:bg-[#EAE5DC] hover:text-[#1C1917] transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Selector de Sede */}
            <div className="mt-4 rounded-2xl bg-white p-3 border border-[#EAE5DC]">
              <div className="flex items-center justify-between mb-2 text-xs font-semibold text-[#78716C]">
                <span className="flex items-center gap-1.5 text-[#4D7C0F]">
                  <CheckCircle2 className="h-4 w-4" /> Sede Seleccionada
                </span>
                <span>Cambiar</span>
              </div>
              <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
                {availableLocations.map((loc) => (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => setLocation(loc.id)}
                    className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-colors ${
                      location.id === loc.id
                        ? "bg-[#D95327] text-white shadow-xs"
                        : "bg-[#FAF8F5] text-[#1C1917] border border-[#EAE5DC] hover:bg-[#F4EFEA]"
                    }`}
                  >
                    {loc.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Desglose de Platos Seleccionados */}
            <div className="mt-4">
              <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-[#78716C] mb-2">
                Resumen de Platos ({count})
              </h4>
              {lines.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#EAE5DC] bg-white p-6 text-center">
                  <p className="text-sm font-medium text-[#78716C]">
                    Aún no has seleccionado ningún plato.
                  </p>
                  <p className="mt-1 text-xs text-[#D95327] font-semibold">
                    ¡Elige tus bowls y cubanos favoritos arriba!
                  </p>
                </div>
              ) : (
                <ul className="space-y-2 max-h-48 overflow-y-auto no-scrollbar rounded-2xl bg-white p-3 border border-[#EAE5DC]">
                  {lines.map((line) => (
                    <li
                      key={line.key}
                      className="flex items-start justify-between text-xs py-1.5 border-b border-[#EAE5DC]/60 last:border-none"
                    >
                      <div>
                        <span className="font-bold text-[#1C1917]">
                          {line.qty}x {line.name}
                        </span>
                        {line.sides.length > 0 && (
                          <p className="text-[10px] text-[#4D7C0F] font-semibold">
                            +{line.sides.join(", ")}
                          </p>
                        )}
                      </div>
                      <span className="font-bold text-[#1C1917]">
                        {currency(line.price * line.qty)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Total Estimado */}
            <div className="mt-4 flex items-center justify-between rounded-2xl bg-[#F4EFEA] p-3.5 border border-[#EAE5DC]">
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#1C1917]">
                Total Estimado
              </span>
              <span className="font-sans text-xl font-black text-[#D95327]">
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
                className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#4D7C0F] py-3.5 px-4 font-sans text-sm font-bold text-white shadow-lg shadow-[#4D7C0F]/30 transition-all hover:bg-[#3F660C] active:scale-98"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Enviar Pedido a WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-full py-2 text-center font-sans text-xs font-semibold text-[#78716C] hover:text-[#1C1917]"
              >
                Continuar eligiendo platos
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default FloatingCravBar;
