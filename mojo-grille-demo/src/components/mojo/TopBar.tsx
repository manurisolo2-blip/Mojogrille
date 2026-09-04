import { useState } from "react";
import { ChevronDown, MapPin, ShoppingBag } from "lucide-react";
import { useCart } from "./cart";

const locations = ["Little Havana", "Brickell", "Doral"];

export function TopBar({ onOpenCart }: { onOpenCart: () => void }) {
  const { count } = useCart();
  const [location, setLocation] = useState(locations[0]);
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-foreground px-4 py-2 text-center text-[11px] font-medium tracking-wide text-background sm:text-xs">
        📍 Miami, FL • Open today until 10:00 PM • Fast Takeout &amp; Delivery Caliente
      </div>

      <div className="border-b border-border bg-card/90 backdrop-blur-md">
        <nav className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3">
          <a href="#top" className="flex min-w-0 items-center gap-2.5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary font-display text-lg font-bold text-primary-foreground">
              M
            </span>
            <span className="min-w-0">
              <span className="block truncate font-display text-base font-bold leading-tight sm:text-lg">
                MOJO GRILLE
              </span>
              <span className="block truncate text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Cuban Kitchen
              </span>
            </span>
          </a>

          <div className="flex shrink-0 items-center gap-2">
            <div className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
              >
                <MapPin className="h-3.5 w-3.5 text-primary" />
                {location}
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
              {open && (
                <ul className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border border-border bg-card shadow-lift">
                  {locations.map((loc) => (
                    <li key={loc}>
                      <button
                        type="button"
                        onClick={() => {
                          setLocation(loc);
                          setOpen(false);
                        }}
                        className="block w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-muted"
                      >
                        {loc}
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
              className="relative grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-soft transition-colors hover:bg-primary-hover"
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-citrus px-1 text-[11px] font-bold text-citrus-foreground">
                  {count}
                </span>
              )}
              {count > 0 && (
                <span className="absolute inset-0 animate-ping rounded-full border border-primary/40" />
              )}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
