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
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
      />
      <div className="relative max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-border bg-card shadow-lift sm:rounded-3xl">
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
            className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-card/90 text-foreground shadow-soft"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5">
          <h3 className="text-2xl font-bold leading-tight">{item.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {item.description}
          </p>

          {item.sidesAllowed ? (
            <>
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
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
                          "grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors " +
                          (selected
                            ? "border-primary bg-accent"
                            : "border-border bg-background hover:bg-muted")
                        }
                      >
                        <span
                          className={
                            "grid h-5 w-5 shrink-0 place-items-center rounded-md border " +
                            (selected
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border")
                          }
                        >
                          {selected && <Check className="h-3.5 w-3.5" />}
                        </span>
                        <span className="min-w-0 truncate text-sm font-semibold">
                          {side.name}
                        </span>
                        <span className="shrink-0 text-sm text-muted-foreground">
                          {side.price === 0 ? "Included" : `+${currency(side.price)}`}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <p className="mt-6 rounded-xl bg-citrus-soft px-4 py-3 text-sm font-medium text-citrus">
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
            className="mt-6 grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-full bg-primary px-6 py-4 text-base font-bold text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            <span className="truncate text-left">Add to Order</span>
            <span className="shrink-0">{currency(total)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
