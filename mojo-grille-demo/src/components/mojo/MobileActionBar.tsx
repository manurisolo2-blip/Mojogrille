import { MessageCircle, ShoppingBag } from "lucide-react";
import { currency } from "@/data/menu";
import { useCart } from "./cart";
import { whatsappHref } from "./whatsapp";

export function MobileActionBar({ onOpenCart }: { onOpenCart: () => void }) {
  const { count, total, lines, location } = useCart();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#EAE5DC] bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md md:hidden">
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
        <button
          type="button"
          onClick={onOpenCart}
          aria-label="View shopping bag"
          className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#EAE5DC] bg-[#FAF8F5] text-[#1C1917] transition-colors hover:bg-[#F4EFEA]"
        >
          <ShoppingBag className="h-5 w-5" />
          {count > 0 && (
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#4D7C0F] px-1 font-sans text-[11px] font-bold text-white">
              {count}
            </span>
          )}
        </button>

        <a
          href={whatsappHref(location, lines, total)}
          target="_blank"
          rel="noopener noreferrer"
          className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 rounded-full bg-[#D95327] px-5 py-3.5 font-sans text-white shadow-[0_4px_16px_rgba(217,83,39,0.35)] transition-all duration-200 hover:bg-[#B83E16]"
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
