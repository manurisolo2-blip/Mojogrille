import { currency } from "@/data/menu";
import type { CartLine } from "./cart";

const PHONE = "13055550123"; // demo

export function whatsappHref(lines: CartLine[], total: number) {
  const body =
    lines.length === 0
      ? "Hello Mojo Grille! I'd like to place an order."
      : [
          "Hello Mojo Grille! I'd like to order:",
          ...lines.map(
            (l) =>
              `• ${l.qty}× ${l.name}${l.sides.length ? ` (${l.sides.join(", ")})` : ""} — ${currency(
                l.price * l.qty,
              )}`,
          ),
          `Estimated Total: ${currency(total)}`,
          "Muchas gracias!",
        ].join("\n");

  return `https://wa.me/${PHONE}?text=${encodeURIComponent(body)}`;
}
