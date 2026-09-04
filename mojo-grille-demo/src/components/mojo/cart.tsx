import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type {
  CartLine,
  CartState,
  CartContextType,
  AddCartItemInput,
  LocationId,
  Location,
} from "@/types/mojo";
import {
  locationsList,
  DEFAULT_LOCATION_ID,
  resolveLocation,
} from "@/data/locations";

// Re-export type contracts for backward compatibility and clean ergonomics
export type { CartLine, CartState, CartContextType, AddCartItemInput };

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({
  children,
  defaultLocationId = DEFAULT_LOCATION_ID,
}: {
  children: ReactNode;
  defaultLocationId?: LocationId;
}) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [selectedLocationId, setSelectedLocationId] =
    useState<LocationId>(defaultLocationId);

  const currentLocation = useMemo<Location>(() => {
    return resolveLocation(selectedLocationId);
  }, [selectedLocationId]);

  const api = useMemo<CartContextType>(() => {
    return {
      lines,
      count: lines.reduce((sum, line) => sum + line.qty, 0),
      total: lines.reduce((sum, line) => sum + line.qty * line.price, 0),
      selectedLocation: selectedLocationId,
      location: currentLocation,
      availableLocations: locationsList,
      setLocation: (locationId: LocationId) => {
        const resolved = resolveLocation(locationId);
        setSelectedLocationId(resolved.id);
      },
      add: (line: AddCartItemInput) => {
        const sortedSides = [...line.sides].sort();
        const key = `${line.itemId}::${sortedSides.join("|")}`;
        setLines((prev) => {
          const existing = prev.find((l) => l.key === key);
          if (existing) {
            return prev.map((l) =>
              l.key === key ? { ...l, qty: l.qty + 1 } : l,
            );
          }
          return [...prev, { ...line, sides: sortedSides, key, qty: 1 }];
        });
      },
      remove: (key: string) =>
        setLines((prev) =>
          prev.flatMap((l) =>
            l.key === key ? (l.qty > 1 ? [{ ...l, qty: l.qty - 1 }] : []) : [l],
          ),
        ),
      updateQty: (key: string, qty: number) => {
        setLines((prev) =>
          qty <= 0
            ? prev.filter((l) => l.key !== key)
            : prev.map((l) =>
                l.key === key ? { ...l, qty: Math.max(1, Math.floor(qty)) } : l,
              ),
        );
      },
      clear: () => setLines([]),
    };
  }, [lines, selectedLocationId, currentLocation]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
}
