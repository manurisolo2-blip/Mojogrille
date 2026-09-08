import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import { LatinMarketBagIcon } from './LatinMarketBagIcon';

export interface LocationItem {
  id: string;
  name: string;
  address: string;
  hours: string;
  phone: string;
}

export const DEFAULT_LOCATIONS: LocationItem[] = [
  {
    id: 'little-havana',
    name: 'Little Havana',
    address: '1420 SW 8th St, Miami, FL 33135',
    hours: '11:00 AM – 10:00 PM',
    phone: '(305) 555-0182',
  },
  {
    id: 'brickell',
    name: 'Brickell',
    address: '801 Brickell Ave, Miami, FL 33131',
    hours: '11:00 AM – 11:00 PM',
    phone: '(305) 555-0194',
  },
  {
    id: 'doral',
    name: 'Doral',
    address: '3450 NW 87th Ave, Doral, FL 33178',
    hours: '11:00 AM – 9:30 PM',
    phone: '(305) 555-0147',
  },
];

interface TopBarProps {
  cartCount?: number;
  onOpenCart?: () => void;
  currentLocation?: LocationItem;
  locations?: LocationItem[];
  onSelectLocation?: (location: LocationItem) => void;
}

export function TopBar({
  cartCount = 0,
  onOpenCart,
  currentLocation = DEFAULT_LOCATIONS[0],
  locations = DEFAULT_LOCATIONS,
  onSelectLocation,
}: TopBarProps) {
  const [open, setOpen] = useState(false);
  const [selectedLoc, setSelectedLoc] = useState<LocationItem>(currentLocation);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedLoc(currentLocation);
  }, [currentLocation]);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 bg-cream-bg/95 backdrop-blur-md">
      <div className="bg-cream-bg/95">
        <nav className="mx-auto flex max-w-[1600px] w-full items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
          <a
            href="#top"
            className="flex min-w-0 items-center group cursor-pointer select-none"
            aria-label="Mojo Grille Home"
          >
            <span className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-charcoal-ink leading-none transition-colors group-hover:text-brand-fire">
              MOJO GRILLE
            </span>
          </a>

          <div className="flex shrink-0 items-center gap-2.5">
            {/* Location dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-label={`Select location, currently ${selectedLoc.name}`}
                className="flex items-center gap-2 rounded-none bg-surface-sand px-3 py-2 font-sans text-[11px] uppercase tracking-wider font-bold text-charcoal-ink transition-colors hover:bg-surface-sand/80 sm:px-3.5 sm:py-2 select-none shadow-none cursor-pointer"
              >
                <MapPin className="h-3.5 w-3.5 text-brand-fire stroke-[2.2]" />
                <span className="max-w-[95px] truncate sm:max-w-none font-bold">{selectedLoc.name}</span>
                <ChevronDown className={`h-3.5 w-3.5 text-charcoal-ink/60 transition-transform ${open ? 'rotate-180' : ''}`} />
              </button>
              {open && (
                <ul
                  role="listbox"
                  aria-label="Miami restaurant locations"
                  className="absolute right-0 mt-2 w-48 overflow-hidden rounded-none bg-surface-sand shadow-none z-50 border border-charcoal-ink/10"
                >
                  {locations.map((loc) => (
                    <li key={loc.id} role="option" aria-selected={loc.id === selectedLoc.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedLoc(loc);
                          onSelectLocation?.(loc);
                          setOpen(false);
                        }}
                        className={`block w-full px-4 py-2.5 text-left font-sans text-sm transition-colors hover:bg-cream-bg ${
                          loc.id === selectedLoc.id ? 'font-bold text-brand-fire bg-cream-bg' : 'text-charcoal-ink'
                        }`}
                      >
                        <div className="font-semibold">{loc.name}</div>
                        <div className="text-[11px] text-charcoal-ink/70 truncate">{loc.address}</div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Cart icon bag */}
            <button
              type="button"
              onClick={onOpenCart}
              aria-label="View shopping bag"
              className="relative grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-full bg-brand-fire text-cream-bg shadow-none transition-all hover:bg-charcoal-ink active:scale-95 cursor-pointer select-none"
            >
              <LatinMarketBagIcon className="h-5 w-5 stroke-[2] text-cream-bg" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full border border-cream-bg bg-leaf-green px-1 font-sans text-[10px] font-black text-cream-bg shadow-none">
                  {cartCount}
                </span>
              )}
              {cartCount > 0 && (
                <span className="absolute inset-0 animate-ping rounded-full border border-brand-fire/40 pointer-events-none" />
              )}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default TopBar;
