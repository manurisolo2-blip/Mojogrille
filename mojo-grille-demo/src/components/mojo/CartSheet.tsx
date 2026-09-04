import { Minus, ShoppingBag, X } from "lucide-react";
import { currency } from "@/data/menu";
import { useCart } from "./cart";
import { whatsappHref } from "./whatsapp";

export function CartSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lines, total, count, remove, clear } = useCart();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Cerrar carrito"
        onClick={onClose}
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
      />
      <aside className="relative flex h-full w-full max-w-sm flex-col border-l border-border bg-card shadow-lift">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border px-5 py-4">
          <h2 className="truncate text-xl font-bold">Tu pedido</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {count === 0 ? (
            <div className="mt-12 text-center">
              <ShoppingBag className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-3 text-sm text-muted-foreground">
                Tu carrito está vacío. Empieza por los favoritos.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {lines.map((line) => (
                <li
                  key={line.key}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 rounded-xl border border-border bg-background p-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">
                      {line.qty}× {line.name}
                    </p>
                    {line.sides.length > 0 && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        {line.sides.join(" · ")}
                      </p>
                    )}
                    <p className="mt-1 text-sm font-semibold">
                      {currency(line.price * line.qty)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(line.key)}
                    aria-label={`Quitar ${line.name}`}
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border hover:bg-muted"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-border px-5 py-4">
          <div className="flex items-center justify-between text-sm font-semibold">
            <span>Total estimado</span>
            <span>{currency(total)}</span>
          </div>
          <a
            href={whatsappHref(lines, total)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block rounded-full bg-primary px-6 py-3.5 text-center text-base font-bold text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            Pedir por WhatsApp
          </a>
          {count > 0 && (
            <button
              type="button"
              onClick={clear}
              className="mt-2 w-full py-2 text-xs font-semibold text-muted-foreground hover:text-foreground"
            >
              Vaciar carrito
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}
