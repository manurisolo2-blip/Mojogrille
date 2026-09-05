'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import { LatinMarketBagIcon } from './LatinMarketBagIcon';

export interface LocationItem {
  id: string;
  name: string;
  address: { street: string };
}

export interface TopBarProps {
  onOpenCart?: () => void;
  count?: number;
  currentLocation?: LocationItem;
  locations?: LocationItem[];
  onSelectLocation?: (id: string) => void;
}

const DEFAULT_LOCATIONS: LocationItem[] = [
  { id: 'little-havana', name: 'Little Havana', address: { street: '1234 SW 8th St' } },
  { id: 'brickell', name: 'Brickell', address: { street: '901 S Miami Ave' } },
  { id: 'doral', name: 'Doral', address: { street: '8400 NW 36th St' } },
];

export function TopBar({
  onOpenCart,
  count = 0,
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
    <header className="sticky top-0 z-40 border-b border-charcoal-ink/10 bg-cream-bg/95 backdrop-blur-md">
      <div className="bg-cream-bg/95">
        <nav className="mx-auto flex max-w-[1600px] w-full items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <a href="#top" className="flex min-w-0 items-center gap-2.5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-none bg-brand-fire font-display text-2xl font-bold text-cream-bg border border-charcoal-ink">
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

          <div className="flex shrink-0 items-center gap-2.5">
            {/* Selector de Sede: Minimalista, Rectangular (Sin Redondeado) */}
            <div ref={dropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-label={`Select location, currently ${selectedLoc.name}`}
                className="flex items-center gap-2 rounded-none border border-charcoal-ink/20 bg-cream-bg px-3 py-2 font-mono text-[11px] uppercase tracking-wider font-semibold text-charcoal-ink transition-colors hover:border-charcoal-ink hover:bg-surface-sand sm:px-3.5 sm:py-2 select-none shadow-none cursor-pointer"
              >
                <MapPin className="h-3.5 w-3.5 text-brand-fire stroke-[2.2]" />
                <span className="max-w-[95px] truncate sm:max-w-none font-bold">{selectedLoc.name}</span>
                <ChevronDown className={`h-3.5 w-3.5 text-charcoal-ink/60 transition-transform ${open ? 'rotate-180' : ''}`} />
              </button>
              {open && (
                <ul
                  role="listbox"
                  aria-label="Miami restaurant locations"
                  className="absolute right-0 mt-2 w-48 overflow-hidden rounded-none border-2 border-charcoal-ink bg-surface-sand shadow-none z-50"
                >
                  {locations.map((loc) => (
                    <li key={loc.id} role="option" aria-selected={loc.id === selectedLoc.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedLoc(loc);
                          onSelectLocation?.(loc.id);
                          setOpen(false);
                        }}
                        className={`block w-full px-4 py-2.5 text-left font-sans text-sm transition-colors hover:bg-cream-bg ${
                          loc.id === selectedLoc.id ? 'font-bold text-brand-fire bg-cream-bg' : 'text-charcoal-ink'
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

            {/* Círculo Rojo con Bolsa de Supermercado Latinoamericano */}
            <button
              type="button"
              onClick={onOpenCart}
              aria-label="View shopping bag"
              className="relative grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-full bg-brand-fire text-cream-bg shadow-none transition-all hover:bg-charcoal-ink active:scale-95 cursor-pointer border border-charcoal-ink/10 select-none"
            >
              <LatinMarketBagIcon className="h-5 w-5 stroke-[2] text-cream-bg" />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full border border-cream-bg bg-leaf-green px-1 font-mono text-[10px] font-bold text-cream-bg shadow-xs">
                  {count}
                </span>
              )}
              {count > 0 && (
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
