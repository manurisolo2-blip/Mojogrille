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
      <div className="bg-[#1C1917] px-4 py-2 text-center font-sans text-[11px] font-medium tracking-wide text-[#FAF8F5] sm:text-xs">
        📍 Miami, FL • Little Havana · Brickell · Doral • Open today until 10:00 PM • Fast Takeout &amp; Delivery Caliente al Momento
      </div>

      <div className="border-b border-[#EAE5DC] bg-white/95 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <a href="#top" className="flex min-w-0 items-center gap-2.5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#D95327] font-serif text-lg font-bold text-white shadow-sm">
              M
            </span>
            <span className="min-w-0">
              <span className="block truncate font-serif text-base font-bold leading-tight text-[#1C1917] sm:text-lg">
                MOJO GRILLE
              </span>
              <span className="block truncate font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[#78716C]">
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
                className="flex items-center gap-1.5 rounded-full border border-[#EAE5DC] bg-[#FAF8F5] px-3 py-1.5 font-sans text-xs font-semibold text-[#1C1917] transition-colors hover:border-[#D6CFBF] hover:bg-[#F4EFEA] sm:px-3.5 sm:py-2"
              >
                <MapPin className="h-3.5 w-3.5 text-[#D95327]" />
                <span className="max-w-[90px] truncate sm:max-w-none">{location.name}</span>
                <ChevronDown className={`h-3.5 w-3.5 text-[#78716C] transition-transform ${open ? "rotate-180" : ""}`} />
              </button>
              {open && (
                <ul
                  role="listbox"
                  aria-label="Miami restaurant locations"
                  className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-[#EAE5DC] bg-white shadow-[0_12px_28px_-6px_rgba(28,25,23,0.16)] z-50"
                >
                  {availableLocations.map((loc) => (
                    <li key={loc.id} role="option" aria-selected={loc.id === location.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setLocation(loc.id);
                          setOpen(false);
                        }}
                        className={`block w-full px-4 py-2.5 text-left font-sans text-sm transition-colors hover:bg-[#FAF8F5] ${
                          loc.id === location.id ? "font-bold text-[#D95327] bg-[#FAF8F5]" : "text-[#1C1917]"
                        }`}
                      >
                        <div className="font-semibold">{loc.name}</div>
                        <div className="text-[11px] text-[#78716C] truncate">{loc.address.street}</div>
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
              className="relative grid h-11 w-11 place-items-center rounded-full bg-[#D95327] text-white shadow-[0_4px_12px_-2px_rgba(217,83,39,0.35)] transition-colors hover:bg-[#B83E16]"
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#4D7C0F] px-1 font-sans text-[11px] font-bold text-white">
                  {count}
                </span>
              )}
              {count > 0 && (
                <span className="absolute inset-0 animate-ping rounded-full border border-[#D95327]/40" />
              )}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
