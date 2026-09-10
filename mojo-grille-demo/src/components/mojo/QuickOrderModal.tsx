import { useEffect, useRef, useState } from "react";
import { Check, X } from "lucide-react";
import { currency, sideOptions, type MenuItem } from "@/data/menu";
import { useCart } from "./cart";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { useBodyScrollLock } from "@/lib/useBodyScrollLock";

export function QuickOrderModal({
  item,
  onClose,
}: {
  item: MenuItem | null;
  onClose: () => void;
}) {
  const { add } = useCart();
  const [sides, setSides] = useState<string[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);

  useFocusTrap(panelRef, item !== null);
  useBodyScrollLock(item !== null);

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
      {/* Fondo decorativo: cerrar con clic fuera sigue funcionando, pero ya no
          ocupa un puesto en el recorrido del tabulador delante del diálogo. */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-charcoal-ink/60"
      />
      <div
        ref={panelRef}
        className="relative max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-none bg-cream-bg shadow-none sm:rounded-none"
      >
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
            className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-none bg-cream-bg text-charcoal-ink transition-colors hover:bg-brand-fire hover:text-cream-bg cursor-pointer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="p-6">
          <h3 id="modal-dish-title" className="font-display text-3xl font-bold uppercase tracking-tight text-charcoal-ink leading-none">
            {item.name}
          </h3>
          <p className="mt-2 font-sans text-base leading-relaxed text-charcoal-ink/80">
            {item.description}
          </p>

          {item.sidesAllowed ? (
            <>
              <p className="mt-6 font-sans text-xs font-bold uppercase tracking-widest text-charcoal-ink/80 border-b border-charcoal-ink/15 pb-2">
                CHOOSE YOUR SIDES & EXTRAS
              </p>
              <ul className="mt-3 space-y-2">
                {sideOptions.map((side) => {
                  const selected = sides.includes(side.id);
                  return (
                    <li key={side.id}>
                      {/*
                        aria-pressed convierte esto en un conmutador para el
                        lector de pantalla. Antes se anunciaba sólo como
                        "botón", sin decir si la guarnición estaba elegida.
                      */}
                      <button
                        type="button"
                        onClick={() => toggle(side.id)}
                        aria-pressed={selected}
                        className={
                          "grid min-h-11 w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-none px-4 py-3 text-left font-sans transition-colors cursor-pointer " +
                          (selected
                            ? "bg-surface-sand text-charcoal-ink font-bold"
                            : "text-charcoal-ink hover:bg-surface-sand")
                        }
                      >
                        <span
                          className={
                            "grid h-5 w-5 shrink-0 place-items-center rounded-none transition-colors " +
                            (selected
                              ? "bg-brand-fire text-cream-bg"
                              : "bg-surface-sand")
                          }
                        >
                          {selected && <Check className="h-3.5 w-3.5 stroke-[3]" aria-hidden="true" />}
                        </span>
                        <span className="min-w-0 truncate text-sm font-semibold text-charcoal-ink">
                          {side.name}
                        </span>
                        <span className="shrink-0 font-sans text-sm font-bold text-charcoal-ink/70">
                          {side.price === 0 ? "INCLUDED" : `+${currency(side.price)}`}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <p className="mt-6 rounded-none bg-leaf-green/10 px-4 py-3 font-sans text-sm font-bold uppercase text-leaf-green">
              MADE AL MOMENTO 100% ARTISANAL MIAMI
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
            className="mt-6 flex w-full items-center justify-between gap-2 rounded-none bg-brand-fire px-6 py-4 font-sans text-sm sm:text-base font-bold uppercase tracking-wider text-cream-bg hover:bg-charcoal-ink transition-colors cursor-pointer select-none shadow-none"
          >
            <span className="truncate">ADD TO ORDER</span>
            <span className="shrink-0 font-display text-xl">{currency(total)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
