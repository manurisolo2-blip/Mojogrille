import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type {
  CartLine,
  CartState,
  CartContextType,
  CartToastNotification,
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
export type {
  CartLine,
  CartState,
  CartContextType,
  CartToastNotification,
  AddCartItemInput,
};

const CartContext = createContext<CartContextType | null>(null);

/** How long the "added to your order" confirmation stays on screen. */
const TOAST_DURATION_MS = 3200;

export function CartProvider({
  children,
  defaultLocationId = DEFAULT_LOCATION_ID,
  defaultOpen = false,
}: {
  children: ReactNode;
  defaultLocationId?: LocationId;
  /** Initial drawer state. Useful for SSR snapshots and tests. */
  defaultOpen?: boolean;
}) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [selectedLocationId, setSelectedLocationId] =
    useState<LocationId>(defaultLocationId);
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [toast, setToast] = useState<CartToastNotification | null>(null);

  const toastTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearToastTimeout = useCallback(() => {
    if (toastTimeout.current) {
      clearTimeout(toastTimeout.current);
      toastTimeout.current = null;
    }
  }, []);

  // Never leave a timer running past unmount
  useEffect(() => clearToastTimeout, [clearToastTimeout]);

  const currentLocation = useMemo<Location>(() => {
    return resolveLocation(selectedLocationId);
  }, [selectedLocationId]);

  const dismissToast = useCallback(() => {
    clearToastTimeout();
    setToast(null);
  }, [clearToastTimeout]);

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

        // Surface the transient confirmation, restarting any in-flight timer
        clearToastTimeout();
        const toastId = `${key}-${Date.now()}`;
        setToast({
          id: toastId,
          message: "¡Añadido al pedido criollo!",
          itemName: line.name,
        });
        toastTimeout.current = setTimeout(() => {
          setToast((current) => (current?.id === toastId ? null : current));
          toastTimeout.current = null;
        }, TOAST_DURATION_MS);
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

      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      toggleCart: () => setIsOpen((prev) => !prev),

      toast,
      dismissToast,
    };
  }, [
    lines,
    selectedLocationId,
    currentLocation,
    isOpen,
    toast,
    dismissToast,
    clearToastTimeout,
  ]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
}
