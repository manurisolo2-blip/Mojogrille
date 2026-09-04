import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type CartLine = {
  key: string;
  itemId: string;
  name: string;
  sides: string[];
  price: number;
  qty: number;
};

type CartApi = {
  lines: CartLine[];
  count: number;
  total: number;
  add: (line: Omit<CartLine, "key" | "qty">) => void;
  remove: (key: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartApi | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  const api = useMemo<CartApi>(() => {
    return {
      lines,
      count: lines.reduce((sum, line) => sum + line.qty, 0),
      total: lines.reduce((sum, line) => sum + line.qty * line.price, 0),
      add: (line) => {
        const key = `${line.itemId}::${[...line.sides].sort().join("|")}`;
        setLines((prev) => {
          const existing = prev.find((l) => l.key === key);
          if (existing) {
            return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + 1 } : l));
          }
          return [...prev, { ...line, key, qty: 1 }];
        });
      },
      remove: (key) =>
        setLines((prev) =>
          prev.flatMap((l) =>
            l.key === key ? (l.qty > 1 ? [{ ...l, qty: l.qty - 1 }] : []) : [l],
          ),
        ),
      clear: () => setLines([]),
    };
  }, [lines]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
