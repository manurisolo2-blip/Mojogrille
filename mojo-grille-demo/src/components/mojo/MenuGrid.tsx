import { Plus } from "lucide-react";
import { currency, type MenuItem } from "@/data/menu";

function Badge({ label }: { label: NonNullable<MenuItem["badge"]> }) {
  const isCitrus = label === "Fresco del día";
  return (
    <span
      className={
        "absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide shadow-soft " +
        (isCitrus
          ? "bg-citrus text-citrus-foreground"
          : "bg-card text-primary")
      }
    >
      {label}
    </span>
  );
}

export function MenuGrid({
  items,
  onSelect,
}: {
  items: MenuItem[];
  onSelect: (item: MenuItem) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.id}
          className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-shadow hover:shadow-lift"
        >
          <button
            type="button"
            onClick={() => onSelect(item)}
            className="relative block text-left"
            aria-label={`View details for ${item.name}`}
          >
            <img
              src={item.image}
              alt={item.name}
              loading="lazy"
              width={1024}
              height={768}
              className="aspect-4/3 w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            {item.badge && <Badge label={item.badge} />}
          </button>

          <div className="flex flex-1 flex-col p-4">
            <h3 className="text-lg font-bold leading-tight">{item.name}</h3>
            <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>

            <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              <p className="truncate text-base font-bold">{currency(item.price)}</p>
              <button
                type="button"
                onClick={() => onSelect(item)}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                <Plus className="h-4 w-4" />
                Add
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
