import { Plus } from "lucide-react";
import { currency, type MenuItem } from "@/data/menu";

function Badge({ label }: { label: NonNullable<MenuItem["badge"]> }) {
  if (label === "Mojo Signature") {
    return (
      <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#D95327] px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-wider text-white shadow-md">
        <span>★</span> {label}
      </span>
    );
  }
  if (label === "Popular" || label === "Top Seller") {
    return (
      <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#F59E0B] px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-wider text-[#1C1917] shadow-md">
        <span>⭐</span> {label}
      </span>
    );
  }
  if (label === "Fresco del día") {
    return (
      <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#4D7C0F] px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-wider text-white shadow-md">
        <span>🌿</span> {label}
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
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.id}
          className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-[#EAE5DC] bg-white p-4 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#D95327]/30"
        >
          <div>
            <button
              type="button"
              onClick={() => onSelect(item)}
              className="relative block w-full overflow-hidden rounded-2xl bg-[#FAF8F5] text-left focus:outline-none"
              aria-label={`View details for ${item.name}`}
            >
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                width={1024}
                height={768}
                className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {item.badge && <Badge label={item.badge} />}
            </button>

            <div className="mt-4 px-1">
              <h3 className="font-display uppercase tracking-tight text-2xl font-bold leading-tight text-[#1C1917] transition-colors group-hover:text-brand-fire">
                <button
                  type="button"
                  onClick={() => onSelect(item)}
                  className="text-left focus:outline-none focus-visible:underline"
                >
                  {item.name}
                </button>
              </h3>
              <p className="mt-2 font-sans text-xs sm:text-sm leading-relaxed text-[#78716C] line-clamp-3">
                {item.description}
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-[#EAE5DC]/80 px-1 pt-4">
            <div>
              <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-[#78716C] block">
                Price
              </span>
              <p className="font-sans text-xl font-black text-[#1C1917]">
                {currency(item.price)}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onSelect(item)}
              aria-label={`Personalizar / Añadir ${item.name} (Add)`}
              className="inline-flex items-center gap-2 rounded-full bg-[#D95327] px-4 py-2.5 font-sans text-sm font-bold text-white shadow-md shadow-[#D95327]/25 transition-all duration-200 hover:bg-[#B83E16] active:scale-95"
            >
              <Plus className="h-4 w-4 stroke-[3]" />
              <span>{item.sidesAllowed ? "Customize" : "Add"}</span>
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

export default MenuGrid;
