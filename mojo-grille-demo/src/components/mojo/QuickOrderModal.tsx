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
        className="absolute inset-0 bg-[#1C1917]/60 backdrop-blur-sm"
      />
      <div className="relative max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-[#EAE5DC] bg-white shadow-[0_25px_50px_-12px_rgba(28,25,23,0.25)] sm:rounded-3xl">
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
            className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full border border-[#EAE5DC] bg-white/90 text-[#1C1917] shadow-sm transition-colors hover:bg-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <h3 id="modal-dish-title" className="font-sans text-2xl font-bold leading-tight text-[#1C1917]">
            {item.name}
          </h3>
          <p className="mt-2 font-sans text-sm leading-relaxed text-[#78716C]">
            {item.description}
          </p>

          {item.sidesAllowed ? (
            <>
              <p className="mt-6 font-sans text-xs font-bold uppercase tracking-[0.14em] text-[#78716C]">
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
                            ? "border-[#D95327] bg-[#FAF8F5] text-[#1C1917]"
                            : "border-[#EAE5DC] bg-white text-[#1C1917] hover:border-[#D6CFBF] hover:bg-[#FAF8F5]")
                        }
                      >
                        <span
                          className={
                            "grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors " +
                            (selected
                              ? "border-[#D95327] bg-[#D95327] text-white"
                              : "border-[#EAE5DC] bg-white")
                          }
                        >
                          {selected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                        </span>
                        <span className="min-w-0 truncate text-sm font-semibold text-[#1C1917]">
                          {side.name}
                        </span>
                        <span className="shrink-0 text-sm font-medium text-[#78716C]">
                          {side.price === 0 ? "Included" : `+${currency(side.price)}`}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <p className="mt-6 rounded-xl border border-[#4D7C0F]/20 bg-[#F0F6E8] px-4 py-3 font-sans text-sm font-medium text-[#4D7C0F]">
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
            className="mt-6 flex w-full items-center justify-between gap-2 rounded-full bg-[#D95327] px-6 py-4 font-sans text-base font-bold text-white shadow-soft transition-all duration-200 hover:bg-[#B83E16] active:translate-y-0.5"
          >
            <span className="truncate">Add to Order</span>
            <span className="shrink-0 font-bold">• {currency(total)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
