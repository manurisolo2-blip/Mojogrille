import { CheckCircle2, X } from "lucide-react";
import { useCart } from "./cart";

/**
 * Transient "added to your order" confirmation.
 *
 * Rendered permanently so the exit transition can play; visibility is driven
 * purely by the presence of `toast` in the cart context. "View" opens the
 * single cart drawer (CartSheet).
 */
export function CartToast() {
  const { toast, dismissToast, openCart } = useCart();

  return (
    <div
      className={`fixed top-5 right-5 z-60 max-w-sm rounded-none bg-charcoal-ink text-cream-bg p-4 flex items-center justify-between gap-3 select-none transition-all duration-300 ease-out transform ${
        toast
          ? "translate-y-0 opacity-100 scale-100 pointer-events-auto"
          : "-translate-y-6 opacity-0 scale-95 pointer-events-none"
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-none bg-brand-fire text-cream-bg">
          <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="text-left">
          <p className="font-sans text-xs font-bold text-cream-bg">
            {toast?.message || "Added to your order!"}
          </p>
          <p className="font-sans text-[11px] text-cream-bg/70 line-clamp-1">
            {toast?.itemName}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            dismissToast();
            openCart();
          }}
          tabIndex={toast ? 0 : -1}
          className="rounded-none bg-cream-bg/20 px-2.5 py-1 font-sans text-[10px] font-bold uppercase tracking-wider text-cream-bg hover:bg-brand-fire transition-colors cursor-pointer"
        >
          View
        </button>
        <button
          type="button"
          onClick={dismissToast}
          tabIndex={toast ? 0 : -1}
          className="tap-target text-cream-bg/60 hover:text-cream-bg p-1 cursor-pointer"
          aria-label="Dismiss notification"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export default CartToast;
