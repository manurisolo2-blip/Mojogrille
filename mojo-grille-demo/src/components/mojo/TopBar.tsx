import { useEffect, useRef, useState } from "react";
import { ChevronDown, MapPin, ShoppingBag } from "lucide-react";
import { useCart } from "./cart";

export function TopBar({ onOpenCart }: { onOpenCart: () => void }) {
  const { count, location, setLocation, availableLocations } = useCart();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40">
      <div className="relative overflow-hidden bg-brand-fire py-2.5 text-cream-bg border-b border-brand-fire/80 shadow-xs select-none">
        <div className="flex overflow-x-hidden">
          {/* Dos contenedores flexibles con white-space: nowrap animados con transform: translateX(-50%) a velocidad constante */}
          <div className="flex w-max will-change-transform animate-marquee font-display text-sm sm:text-base font-bold uppercase tracking-wider">
            {/* Contenedor 1 */}
            <div className="flex shrink-0 items-center gap-6 pr-6 whitespace-nowrap">
              <span>MOJO GRILLE</span>
              <span className="text-mojo-citrus font-serif">✦</span>
              <span>SLOW ROASTED PORK</span>
              <span className="text-mojo-citrus font-serif">✦</span>
              <span>CITRUS MARINATED</span>
              <span className="text-mojo-citrus font-serif">✦</span>
              <span>PRESSED TO PERFECTION</span>
              <span className="text-mojo-citrus font-serif">✦</span>
              <span>MOJO GRILLE</span>
              <span className="text-mojo-citrus font-serif">✦</span>
              <span>SLOW ROASTED PORK</span>
              <span className="text-mojo-citrus font-serif">✦</span>
              <span>CITRUS MARINATED</span>
              <span className="text-mojo-citrus font-serif">✦</span>
              <span>PRESSED TO PERFECTION</span>
              <span className="text-mojo-citrus font-serif">✦</span>
            </div>

            {/* Contenedor 2 (Looping infinito continuo sin saltos) */}
            <div className="flex shrink-0 items-center gap-6 pr-6 whitespace-nowrap" aria-hidden="true">
              <span>MOJO GRILLE</span>
              <span className="text-mojo-citrus font-serif">✦</span>
              <span>SLOW ROASTED PORK</span>
              <span className="text-mojo-citrus font-serif">✦</span>
              <span>CITRUS MARINATED</span>
              <span className="text-mojo-citrus font-serif">✦</span>
              <span>PRESSED TO PERFECTION</span>
              <span className="text-mojo-citrus font-serif">✦</span>
              <span>MOJO GRILLE</span>
              <span className="text-mojo-citrus font-serif">✦</span>
              <span>SLOW ROASTED PORK</span>
              <span className="text-mojo-citrus font-serif">✦</span>
              <span>CITRUS MARINATED</span>
              <span className="text-mojo-citrus font-serif">✦</span>
              <span>PRESSED TO PERFECTION</span>
              <span className="text-mojo-citrus font-serif">✦</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-charcoal-ink/10 bg-cream-bg/95 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <a href="#top" className="flex min-w-0 items-center gap-2.5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-fire font-display text-2xl font-bold text-cream-bg shadow-sm">
              M
            </span>
            <span className="min-w-0">
              <span className="block truncate font-display text-2xl font-bold leading-tight text-charcoal-ink">
                MOJO GRILLE
              </span>
              <span className="block truncate font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-charcoal-ink/60">
                Cuban Kitchen
              </span>
            </span>
          </a>

          <div className="flex shrink-0 items-center gap-2">
            <div ref={dropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-label={`Select location, currently ${location.name}`}
                className="flex items-center gap-1.5 rounded-full border border-charcoal-ink/15 bg-surface-sand px-3 py-1.5 font-sans text-xs font-semibold text-charcoal-ink transition-colors hover:border-charcoal-ink/30 hover:bg-surface-sand/80 sm:px-3.5 sm:py-2"
              >
                <MapPin className="h-3.5 w-3.5 text-brand-fire" />
                <span className="max-w-[90px] truncate sm:max-w-none">{location.name}</span>
                <ChevronDown className={`h-3.5 w-3.5 text-charcoal-ink/60 transition-transform ${open ? "rotate-180" : ""}`} />
              </button>
              {open && (
                <ul
                  role="listbox"
                  aria-label="Miami restaurant locations"
                  className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-charcoal-ink/15 bg-surface-sand shadow-[0_12px_28px_-6px_rgba(20,18,16,0.16)] z-50"
                >
                  {availableLocations.map((loc) => (
                    <li key={loc.id} role="option" aria-selected={loc.id === location.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setLocation(loc.id);
                          setOpen(false);
                        }}
                        className={`block w-full px-4 py-2.5 text-left font-sans text-sm transition-colors hover:bg-cream-bg ${
                          loc.id === location.id ? "font-bold text-brand-fire bg-cream-bg" : "text-charcoal-ink"
                        }`}
                      >
                        <div className="font-semibold">{loc.name}</div>
                        <div className="text-[11px] text-charcoal-ink/70 truncate">{loc.address.street}</div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button
              type="button"
              onClick={onOpenCart}
              aria-label="View shopping bag"
              className="relative grid h-11 w-11 place-items-center rounded-full bg-brand-fire text-cream-bg shadow-[0_4px_12px_-2px_rgba(229,37,22,0.35)] transition-colors hover:bg-brand-fire/90"
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-leaf-green px-1 font-sans text-[11px] font-bold text-cream-bg">
                  {count}
                </span>
              )}
              {count > 0 && (
                <span className="absolute inset-0 animate-ping rounded-full border border-brand-fire/40" />
              )}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
