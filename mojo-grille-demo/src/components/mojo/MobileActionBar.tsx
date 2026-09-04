import { MessageCircle, ShoppingBag } from "lucide-react";
import { currency } from "@/data/menu";
import { useCart } from "./cart";
import { whatsappHref } from "./whatsapp";

export function MobileActionBar({ onOpenCart }: { onOpenCart: () => void }) {
  const { count, total, lines } = useCart();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md md:hidden">
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
        <button
          type="button"
          onClick={onOpenCart}
          aria-label="View shopping bag"
          className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full border border-border bg-background"
        >
          <ShoppingBag className="h-5 w-5" />
          {count > 0 && (
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-citrus px-1 text-[11px] font-bold text-citrus-foreground">
              {count}
            </span>
          )}
        </button>

        <a
          href={whatsappHref(lines, total)}
          target="_blank"
          rel="noopener noreferrer"
          className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 rounded-full bg-primary px-5 py-3.5 text-primary-foreground shadow-lift transition-colors hover:bg-primary-hover"
        >
          <MessageCircle className="h-5 w-5 shrink-0" />
          <span className="min-w-0 truncate text-sm font-bold">
            {count > 0 ? `Order ${count} item${count > 1 ? "s" : ""}` : "Order on WhatsApp"}
          </span>
          <span className="shrink-0 text-sm font-bold">
            {count > 0 ? currency(total) : "Online"}
          </span>
        </a>
      </div>
    </div>
  );
}
