import { currency } from "@/data/menu";
import { resolveLocation } from "@/data/locations";
import type { CartLine, Location, LocationId, WhatsAppOrderPayload } from "@/types/mojo";

/**
 * Generates the human-readable formatted order message for WhatsApp.
 * Incorporates selected Miami store location, item breakdown, customized sides,
 * line prices, estimated grand total, and courteous closing.
 */
export function formatWhatsAppMessage(
  locationInput: LocationId | Location | string,
  lines: CartLine[],
  total: number,
): string {
  const loc = resolveLocation(locationInput);

  if (lines.length === 0) {
    return `Hello Mojo Grille! I'd like to place an order from your ${loc.name} store.`;
  }

  const itemLines = lines.map((l) => {
    const sidesText = l.sides.length > 0 ? ` (${l.sides.join(", ")})` : "";
    return `• ${l.qty}× ${l.name}${sidesText} — ${currency(l.price * l.qty)}`;
  });

  return [
    `Hello Mojo Grille! I'd like to order from your ${loc.name} store:`,
    ...itemLines,
    `Estimated Total: ${currency(total)}`,
    "Muchas gracias!",
  ].join("\n");
}

/**
 * Builds the wa.me checkout link.
 *
 * Supported Signatures:
 * 1. `whatsappHref(location, lines, total)` — Full contract with multi-store routing.
 * 2. `whatsappHref(lines, total)` — Backward-compatible overload defaulting to Little Havana.
 */
export function whatsappHref(
  location: LocationId | Location,
  lines: CartLine[],
  total: number,
): string;
export function whatsappHref(lines: CartLine[], total: number): string;
export function whatsappHref(
  arg1: LocationId | Location | CartLine[],
  arg2?: CartLine[] | number,
  arg3?: number,
): string {
  let location: Location;
  let lines: CartLine[];
  let total: number;

  if (Array.isArray(arg1)) {
    // Overload: whatsappHref(lines, total)
    location = resolveLocation();
    lines = arg1;
    total = typeof arg2 === "number" ? arg2 : 0;
  } else {
    // Contract: whatsappHref(location, lines, total)
    location = resolveLocation(arg1);
    lines = Array.isArray(arg2) ? arg2 : [];
    total = typeof arg3 === "number" ? arg3 : 0;
  }

  const message = formatWhatsAppMessage(location, lines, total);
  return `https://wa.me/${location.phoneRaw}?text=${encodeURIComponent(message)}`;
}

/**
 * Helper to build WhatsApp checkout URL from a validated payload object.
 */
export function buildWhatsAppCheckout(payload: WhatsAppOrderPayload): {
  url: string;
  phone: string;
  message: string;
} {
  const loc = resolveLocation(payload.location);
  const message = formatWhatsAppMessage(loc, payload.lines, payload.total);
  const url = `https://wa.me/${loc.phoneRaw}?text=${encodeURIComponent(message)}`;

  return {
    url,
    phone: loc.phone,
    message,
  };
}
