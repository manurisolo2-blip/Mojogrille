import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { currency, sideOptions, type MenuItem } from "@/data/menu";
import { useCart } from "./cart";

export function QuickOrderModal({
  item,
  onClose,
}: {
  item: MenuItem | null;
  onClose: () => void;
}) {
  const { add } = useCart();
  const [sides, setSides] = useState<string[]>([]);

  useEffect(() => {
    setSides([]);
  }, [item?.id]);

  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [item, onClose]);

  if (!item) return null;

  const extras = sideOptions
    .filter((s) => sides.includes(s.id))
    .reduce((sum, s) => sum + s.price, 0);
  const total = item.price + extras;

  const toggle = (id: string) =>
    setSides((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-dish-title"
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
    >
      <button
        type="button"
        aria-label="Close modal backdrop"
        onClick={onClose}
        className="absolute inset-0 bg-charcoal-ink/60 backdrop-blur-sm"
      />
      <div className="relative max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-charcoal-ink/10 bg-cream-bg shadow-[0_25px_50px_-12px_rgba(20,18,16,0.25)] sm:rounded-3xl">
        <div className="relative">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            width={1024}
            height={768}
            className="aspect-4/3 w-full object-cover"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full border border-charcoal-ink/15 bg-cream-bg/90 text-charcoal-ink shadow-sm transition-colors hover:bg-cream-bg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <h3 id="modal-dish-title" className="font-display text-2xl font-bold uppercase tracking-tight text-charcoal-ink">
            {item.name}
          </h3>
          <p className="mt-2 font-sans text-sm leading-relaxed text-charcoal-ink/70">
            {item.description}
          </p>

          {item.sidesAllowed ? (
            <>
              <p className="mt-6 font-sans text-xs font-bold uppercase tracking-[0.14em] text-charcoal-ink/70">
                Choose Your Sides (Guarniciones)
              </p>
              <ul className="mt-3 space-y-2">
                {sideOptions.map((side) => {
                  const selected = sides.includes(side.id);
                  return (
                    <li key={side.id}>
                      <button
                        type="button"
                        onClick={() => toggle(side.id)}
                        className={
                          "grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border px-4 py-3 text-left font-sans transition-all duration-200 " +
                          (selected
                            ? "border-brand-fire bg-surface-sand text-charcoal-ink"
                            : "border-charcoal-ink/10 bg-surface-sand/50 text-charcoal-ink hover:border-charcoal-ink/25 hover:bg-surface-sand")
                        }
                      >
                        <span
                          className={
                            "grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors " +
                            (selected
                              ? "border-brand-fire bg-brand-fire text-cream-bg"
                              : "border-charcoal-ink/20 bg-cream-bg")
                          }
                        >
                          {selected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                        </span>
                        <span className="min-w-0 truncate text-sm font-semibold text-charcoal-ink">
                          {side.name}
                        </span>
                        <span className="shrink-0 text-sm font-medium text-charcoal-ink/60">
                          {side.price === 0 ? "Included" : `+${currency(side.price)}`}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <p className="mt-6 rounded-xl border border-leaf-green/20 bg-leaf-green/10 px-4 py-3 font-sans text-sm font-medium text-leaf-green">
              Freshly prepared al momento with authentic Miami ingredients.
            </p>
          )}

          <button
            type="button"
            onClick={() => {
              add({
                itemId: item.id,
                name: item.name,
                sides: sideOptions.filter((s) => sides.includes(s.id)).map((s) => s.name),
                price: total,
              });
              onClose();
            }}
            className="mt-6 flex w-full items-center justify-between gap-2 rounded-full bg-brand-fire px-6 py-4 font-sans text-base font-bold text-cream-bg shadow-soft transition-all duration-200 hover:bg-brand-fire/90 active:translate-y-0.5"
          >
            <span className="truncate">Add to Order</span>
            <span className="shrink-0 font-bold">• {currency(total)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
