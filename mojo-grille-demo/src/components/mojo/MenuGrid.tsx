import { Plus } from "lucide-react";
import { currency, type MenuItem } from "@/data/menu";

function Badge({ label }: { label: NonNullable<MenuItem["badge"]> }) {
  if (label === "Mojo Signature") {
    return (
      <span className="absolute left-3 top-3 rounded-full bg-[#D95327] px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
        {label}
      </span>
    );
  }
  if (label === "Popular" || label === "Top Seller") {
    return (
      <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-[#F59E0B]/40 bg-[#FEF3C7] px-2.5 py-1 font-sans text-[11px] font-bold uppercase tracking-wider text-[#B45309] shadow-sm">
        <span className="text-[#F59E0B]" aria-hidden="true">★</span>
        <span>{label}</span>
      </span>
    );
  }
  if (label === "Fresco del día") {
    return (
      <span className="absolute left-3 top-3 rounded-full bg-[#4D7C0F] px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
        {label}
      </span>
    );
  }
  return (
    <span className="absolute left-3 top-3 rounded-full border border-[#EAE5DC] bg-white px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-wider text-[#D95327] shadow-sm">
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
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.id}
          className="group flex flex-col overflow-hidden rounded-2xl border border-[#EAE5DC] bg-white shadow-[0_1px_3px_rgba(28,25,23,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_-8px_rgba(28,25,23,0.14)]"
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
              className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            {item.badge && <Badge label={item.badge} />}
          </button>

          <div className="flex flex-1 flex-col p-5">
            <h3 className="font-sans text-lg font-bold leading-snug text-[#1C1917]">
              <button
                type="button"
                onClick={() => onSelect(item)}
                className="text-left hover:text-[#D95327] transition-colors focus:outline-none focus-visible:underline"
              >
                {item.name}
              </button>
            </h3>
            <p className="mt-2 flex-1 font-sans text-sm leading-relaxed text-[#78716C]">
              {item.description}
            </p>

            <div className="mt-5 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t border-[#EAE5DC]/60 pt-4">
              <p className="truncate font-sans text-base font-bold text-[#1C1917]">
                {currency(item.price)}
              </p>
              <button
                type="button"
                onClick={() => onSelect(item)}
                aria-label={`Personalizar / Añadir ${item.name} (Add)`}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#D95327] px-4 py-2 font-sans text-sm font-bold text-white transition-all duration-200 hover:bg-[#B83E16] hover:shadow-sm active:translate-y-0.5"
              >
                <Plus className="h-4 w-4 stroke-[2.5]" />
                <span>{item.sidesAllowed ? "Personalizar / Añadir" : "Añadir"}</span>
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
