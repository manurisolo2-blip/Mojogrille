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
      <div className="relative max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-none border-2 border-charcoal-ink bg-cream-bg shadow-none sm:rounded-none">
        <div className="relative">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            width={1024}
            height={768}
            className="aspect-4/3 w-full object-cover border-b-2 border-charcoal-ink"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-none border-2 border-charcoal-ink bg-cream-bg text-charcoal-ink transition-colors hover:bg-brand-fire hover:text-cream-bg hover:border-brand-fire cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <h3 id="modal-dish-title" className="font-display text-3xl font-bold uppercase tracking-tight text-charcoal-ink leading-none">
            {item.name}
          </h3>
          <p className="mt-2 font-sans text-sm leading-relaxed text-charcoal-ink/80">
            {item.description}
          </p>

          {item.sidesAllowed ? (
            <>
              <p className="mt-6 font-sans text-xs font-bold uppercase tracking-widest text-charcoal-ink/80 border-b border-charcoal-ink/15 pb-2">
                CHOOSE YOUR SIDES · EXTRAS
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
                          "grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-none border px-4 py-3 text-left font-sans transition-colors cursor-pointer " +
                          (selected
                            ? "border-brand-fire bg-surface-sand text-charcoal-ink font-bold"
                            : "border-charcoal-ink/20 bg-surface-sand/40 text-charcoal-ink hover:border-charcoal-ink hover:bg-surface-sand")
                        }
                      >
                        <span
                          className={
                            "grid h-5 w-5 shrink-0 place-items-center rounded-none border transition-colors " +
                            (selected
                              ? "border-brand-fire bg-brand-fire text-cream-bg"
                              : "border-charcoal-ink/30 bg-cream-bg")
                          }
                        >
                          {selected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                        </span>
                        <span className="min-w-0 truncate text-sm font-semibold text-charcoal-ink">
                          {side.name}
                        </span>
                        <span className="shrink-0 font-sans text-xs font-bold text-charcoal-ink/70">
                          {side.price === 0 ? "INCLUDED" : `+${currency(side.price)}`}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <p className="mt-6 rounded-none border border-leaf-green/30 bg-leaf-green/10 px-4 py-3 font-sans text-xs font-bold uppercase text-leaf-green">
              MADE AL MOMENTO · 100% ARTISANAL MIAMI
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
            className="mt-6 flex w-full items-center justify-between gap-2 rounded-none border-2 border-brand-fire bg-brand-fire px-6 py-4 font-sans text-sm sm:text-base font-bold uppercase tracking-wider text-cream-bg hover:bg-charcoal-ink hover:border-charcoal-ink transition-colors cursor-pointer select-none shadow-none"
          >
            <span className="truncate">ADD TO ORDER</span>
            <span className="shrink-0 font-display text-xl">• {currency(total)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
