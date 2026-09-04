import { Minus, Plus, MapPin, ShoppingBag, X } from "lucide-react";
import { currency } from "@/data/menu";
import { useCart } from "./cart";
import { whatsappHref } from "./whatsapp";

export function CartSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lines, total, count, add, remove, clear, location } = useCart();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Close cart"
        onClick={onClose}
        className="absolute inset-0 bg-[#1C1917]/60 backdrop-blur-sm"
      />
      <aside
        role="dialog"
        aria-label="Your Order Shopping Cart"
        aria-modal="true"
        className="relative flex h-full w-full max-w-sm flex-col border-l border-[#EAE5DC] bg-white shadow-[0_25px_50px_-12px_rgba(28,25,23,0.25)]"
      >
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-[#EAE5DC] px-5 py-4">
          <h2 className="truncate font-serif text-xl font-bold text-[#1C1917]">Your Order</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[#1C1917] transition-colors hover:bg-[#FAF8F5]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Selected Store Location Banner */}
        <div className="flex items-center justify-between gap-2 border-b border-[#EAE5DC] bg-[#FAF8F5] px-5 py-2.5">
          <div className="flex min-w-0 items-center gap-2 text-xs">
            <MapPin className="h-4 w-4 shrink-0 text-[#D95327]" />
            <div className="min-w-0">
              <span className="font-bold text-[#1C1917]">{location.name} Store</span>
              <span className="ml-1.5 hidden text-[#78716C] sm:inline">• {location.address.street}</span>
            </div>
          </div>
          <span className="shrink-0 rounded-full bg-[#EAE5DC]/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#78716C]">
            Pickup
          </span>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {count === 0 ? (
            <div className="mt-12 text-center">
              <ShoppingBag className="mx-auto h-8 w-8 text-[#78716C]" />
              <p className="mt-3 font-sans text-sm text-[#78716C]">
                Your cart is empty. Start with our signature favorites!
              </p>
              <p className="mt-1.5 font-sans text-xs font-medium text-[#D95327]">
                ¡Pide tu lechón asado, bowl criollo o cafecito al momento!
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {lines.map((line) => (
                <li
                  key={line.key}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 rounded-xl border border-[#EAE5DC] bg-[#FAF8F5] p-3.5"
                >
                  <div className="min-w-0">
                    <p className="truncate font-sans text-sm font-bold text-[#1C1917]">
                      {line.qty}× {line.name}
                    </p>
                    {line.sides.length > 0 && (
                      <p className="mt-1 font-sans text-xs text-[#78716C]">
                        {line.sides.join(" · ")}
                      </p>
                    )}
                    <p className="mt-1 font-sans text-sm font-semibold text-[#1C1917]">
                      {currency(line.price * line.qty)}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5 self-center">
                    <button
                      type="button"
                      onClick={() => remove(line.key)}
                      aria-label={`Decrease quantity of ${line.name}`}
                      className="grid h-8 w-8 place-items-center rounded-full border border-[#EAE5DC] bg-white text-[#78716C] transition-colors hover:bg-[#FAF8F5] hover:text-[#1C1917] active:scale-95"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="min-w-[18px] text-center font-sans text-xs font-bold text-[#1C1917]">
                      {line.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        add({
                          itemId: line.itemId,
                          name: line.name,
                          sides: line.sides,
                          price: line.price,
                        })
                      }
                      aria-label={`Increase quantity of ${line.name}`}
                      className="grid h-8 w-8 place-items-center rounded-full border border-[#EAE5DC] bg-white text-[#78716C] transition-colors hover:bg-[#FAF8F5] hover:text-[#1C1917] active:scale-95"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-[#EAE5DC] px-5 py-4">
          <div className="flex items-center justify-between font-sans text-sm font-semibold">
            <span className="text-[#78716C]">Estimated Total</span>
            <span className="text-base font-bold text-[#1C1917]">{currency(total)}</span>
          </div>
          <a
            href={whatsappHref(location, lines, total)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block rounded-full bg-[#D95327] px-6 py-3.5 text-center font-sans text-base font-bold text-white shadow-soft transition-all duration-200 hover:bg-[#B83E16]"
          >
            Order via WhatsApp
          </a>
          <p className="mt-2 text-center font-sans text-[11px] text-[#78716C]">
            📲 Instant order confirmation directly with our {location.name} kitchen
          </p>
          {count > 0 && (
            <button
              type="button"
              onClick={clear}
              className="mt-2 w-full py-2 font-sans text-xs font-semibold text-[#78716C] transition-colors hover:text-[#1C1917]"
            >
              Clear Cart
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}
