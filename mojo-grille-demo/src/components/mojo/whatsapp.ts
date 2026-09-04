import { currency } from "@/data/menu";
import type { CartLine } from "./cart";

const PHONE = "13055550123"; // demo

export function whatsappHref(lines: CartLine[], total: number) {
  const body =
    lines.length === 0
      ? "Hola Mojo Grille! Quiero hacer un pedido."
      : [
          "Hola Mojo Grille! Quiero pedir:",
          ...lines.map(
            (l) =>
              `• ${l.qty}× ${l.name}${l.sides.length ? ` (${l.sides.join(", ")})` : ""} — ${currency(
                l.price * l.qty,
              )}`,
          ),
          `Total: ${currency(total)}`,
        ].join("\n");

  return `https://wa.me/${PHONE}?text=${encodeURIComponent(body)}`;
}
