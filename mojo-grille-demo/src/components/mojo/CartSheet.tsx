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
        className="absolute inset-0 bg-charcoal-ink/60 backdrop-blur-sm"
      />
      <aside
        role="dialog"
        aria-label="Your Order Shopping Cart"
        aria-modal="true"
        className="relative flex h-full w-full max-w-sm flex-col border-l-2 border-charcoal-ink bg-cream-bg shadow-none"
      >
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-charcoal-ink/20 px-5 py-4">
          <h2 className="truncate font-display text-2xl font-bold uppercase tracking-tight text-charcoal-ink">Your Order</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-none border border-charcoal-ink text-charcoal-ink transition-colors hover:bg-brand-fire hover:text-cream-bg hover:border-brand-fire cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Selected Store Location Banner */}
        <div className="flex items-center justify-between gap-2 border-b border-charcoal-ink/20 bg-surface-sand px-5 py-2.5">
          <div className="flex min-w-0 items-center gap-2 text-xs">
            <MapPin className="h-4 w-4 shrink-0 text-brand-fire" />
            <div className="min-w-0">
              <span className="font-bold text-charcoal-ink">{location.name} Store</span>
              <span className="ml-1.5 hidden text-charcoal-ink/60 sm:inline">, {location.address.street}</span>
            </div>
          </div>
          <span className="shrink-0 rounded-none border border-charcoal-ink/30 bg-cream-bg px-2 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wider text-charcoal-ink">
            Pickup
          </span>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {count === 0 ? (
            <div className="mt-12 text-center">
              <ShoppingBag className="mx-auto h-8 w-8 text-charcoal-ink/50" />
              <p className="mt-3 font-sans text-sm text-charcoal-ink/70">
                Your cart is empty. Start with our signature favorites!
              </p>
              <p className="mt-1.5 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-fire">
                HOT LECHÓN ASADO CRIOLLO BOWLS CAFECITO AL MOMENTO
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {lines.map((line) => (
                <li
                  key={line.key}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 rounded-none border border-charcoal-ink/20 bg-surface-sand p-3.5"
                >
                  <div className="min-w-0">
                    <p className="truncate font-sans text-sm font-bold text-charcoal-ink">
                      {line.qty}× {line.name}
                    </p>
                    {line.sides.length > 0 && (
                      <p className="mt-1 font-sans text-xs text-charcoal-ink/60">
                        {line.sides.join(", ")}
                      </p>
                    )}
                    <p className="mt-1 font-sans text-sm font-semibold text-charcoal-ink">
                      {currency(line.price * line.qty)}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5 self-center">
                    <button
                      type="button"
                      onClick={() => remove(line.key)}
                      aria-label={`Decrease quantity of ${line.name}`}
                      className="grid h-7 w-7 place-items-center rounded-none border border-charcoal-ink bg-cream-bg text-charcoal-ink transition-colors hover:bg-charcoal-ink hover:text-cream-bg cursor-pointer"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="min-w-[18px] text-center font-sans text-xs font-bold text-charcoal-ink">
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
                      className="grid h-7 w-7 place-items-center rounded-none border border-charcoal-ink bg-cream-bg text-charcoal-ink transition-colors hover:bg-charcoal-ink hover:text-cream-bg cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t-2 border-charcoal-ink px-5 py-4 bg-surface-sand">
          <div className="flex items-center justify-between font-sans text-sm font-semibold">
            <span className="text-charcoal-ink/70">Estimated Total</span>
            <span className="text-base font-bold text-charcoal-ink">{currency(total)}</span>
          </div>
          <a
            href={whatsappHref(location, lines, total)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block rounded-none border-2 border-brand-fire bg-brand-fire px-6 py-3.5 text-center font-sans text-base font-bold uppercase tracking-wider text-cream-bg hover:bg-charcoal-ink hover:border-charcoal-ink transition-colors cursor-pointer select-none shadow-none"
          >
            Order via WhatsApp
          </a>
          <p className="mt-2 text-center font-sans text-[11px] text-charcoal-ink/60">
            Instant order confirmation directly with our {location.name} kitchen
          </p>
          {count > 0 && (
            <button
              type="button"
              onClick={clear}
              className="mt-2 w-full py-2 font-sans text-xs font-semibold text-charcoal-ink/60 transition-colors hover:text-charcoal-ink"
            >
              Clear Cart
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}
