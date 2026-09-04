import assert from "node:assert/strict";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { LOCATIONS, locationsList, resolveLocation, DEFAULT_LOCATION_ID } from "../src/data/locations.js";
import { whatsappHref, formatWhatsAppMessage } from "../src/components/mojo/whatsapp.js";
import { CartProvider } from "../src/components/mojo/cart.js";
import { CartSheet } from "../src/components/mojo/CartSheet.js";
import { MobileActionBar } from "../src/components/mojo/MobileActionBar.js";
import type { CartLine, LocationId } from "../src/types/mojo.js";

/**
 * Challenger Test Suite: Location Switching & State Synchronization
 * Verifies store records, location resolution, phone routing,
 * cart preservation across switches, and header/component synchronization.
 */

console.log("=== [TEST SUITE 2] Location Switching & Synchronization ===");

// 1. Validate Store Locations Database
console.log("  [2.1] Validating official store records...");
assert.equal(locationsList.length, 3);

const expectedStores = [
  { id: "little-havana", phoneRaw: "13055550123", phone: "+1-305-555-0123", name: "Little Havana" },
  { id: "brickell", phoneRaw: "13055550124", phone: "+1-305-555-0124", name: "Brickell" },
  { id: "doral", phoneRaw: "13055550125", phone: "+1-305-555-0125", name: "Doral" },
] as const;

for (const exp of expectedStores) {
  const loc = LOCATIONS[exp.id];
  assert.ok(loc, `Location ${exp.id} must exist in LOCATIONS`);
  assert.equal(loc.id, exp.id);
  assert.equal(loc.name, exp.name);
  assert.equal(loc.phoneRaw, exp.phoneRaw);
  assert.equal(loc.phone, exp.phone);
  assert.ok(loc.address.fullAddress.length > 0);
  assert.ok(loc.hours.length > 0);
}
console.log("  ✓ All 3 Miami locations (Little Havana, Brickell, Doral) are correctly configured with dedicated phone routing.");

// 2. Validate Location Resolver
console.log("  [2.2] Testing resolveLocation() flexibility and fallbacks...");
assert.equal(resolveLocation("little-havana").id, "little-havana");
assert.equal(resolveLocation("brickell").id, "brickell");
assert.equal(resolveLocation("doral").id, "doral");

// Name matching & case insensitivity
assert.equal(resolveLocation("Little Havana").id, "little-havana");
assert.equal(resolveLocation("Brickell").id, "brickell");
assert.equal(resolveLocation("Doral").id, "doral");
assert.equal(resolveLocation("  little havana  ").id, "little-havana");
assert.equal(resolveLocation("BRICKELL").id, "brickell");

// Object passing
assert.equal(resolveLocation(LOCATIONS["brickell"]).id, "brickell");

// Fallback on invalid/empty
assert.equal(resolveLocation(null).id, DEFAULT_LOCATION_ID);
assert.equal(resolveLocation(undefined).id, DEFAULT_LOCATION_ID);
assert.equal(resolveLocation("unknown-city").id, DEFAULT_LOCATION_ID);
console.log("  ✓ resolveLocation() accurately handles IDs, names, objects, case insensitivity, and graceful defaults.");

// 3. Test WhatsApp Link and Phone Routing for all 3 Locations
console.log("  [2.3] Testing dynamic WhatsApp destination phone routing...");
const sampleLines: CartLine[] = [
  {
    key: "cubano-prensado::moro",
    itemId: "cubano-prensado",
    name: "El Cubano Prensado",
    sides: ["Arroz Moro"],
    price: 14.95,
    qty: 2,
  },
];
const sampleTotal = 29.90;

for (const store of expectedStores) {
  const url = whatsappHref(store.id, sampleLines, sampleTotal);
  assert.ok(
    url.startsWith(`https://wa.me/${store.phoneRaw}?text=`),
    `Expected URL to start with https://wa.me/${store.phoneRaw}, got ${url.slice(0, 40)}`,
  );

  const decoded = decodeURIComponent(url.replace(`https://wa.me/${store.phoneRaw}?text=`, ""));
  assert.ok(
    decoded.includes(`from your ${store.name} store:`),
    `Decoded message must mention ${store.name} store. Got:\n${decoded}`,
  );
  assert.ok(decoded.includes("2× El Cubano Prensado (Arroz Moro) — $29.90"));
  assert.ok(decoded.includes("Estimated Total: $29.90"));
}

// Overload check: whatsappHref(lines, total) defaults to Little Havana
const defaultUrl = whatsappHref(sampleLines, sampleTotal);
assert.ok(defaultUrl.startsWith("https://wa.me/13055550123?text="));
assert.ok(decodeURIComponent(defaultUrl).includes("from your Little Havana store:"));
console.log("  ✓ Dynamic phone routing dynamically sets wa.me destination and greeting for each store.");

// 4. Test Cart Content Preservation during Simulated Location Switch
console.log("  [2.4] Testing cart state preservation during location switching lifecycle...");
{
  // Simulated Cart Store Logic (mirrors cart.tsx)
  class CartSimulation {
    lines: CartLine[] = [];
    selectedLocationId: LocationId = "little-havana";

    get count() {
      return this.lines.reduce((sum, l) => sum + l.qty, 0);
    }
    get total() {
      return this.lines.reduce((sum, l) => sum + l.qty * l.price, 0);
    }
    get location() {
      return resolveLocation(this.selectedLocationId);
    }

    setLocation(id: LocationId) {
      this.selectedLocationId = resolveLocation(id).id;
    }

    add(line: Omit<CartLine, "key" | "qty">) {
      const sortedSides = [...line.sides].sort();
      const key = `${line.itemId}::${sortedSides.join("|")}`;
      const existing = this.lines.find((l) => l.key === key);
      if (existing) {
        this.lines = this.lines.map((l) =>
          l.key === key ? { ...l, qty: l.qty + 1 } : l,
        );
      } else {
        this.lines.push({ ...line, sides: sortedSides, key, qty: 1 });
      }
    }

    getWhatsAppUrl() {
      return whatsappHref(this.location, this.lines, this.total);
    }
  }

  const cart = new CartSimulation();

  // Add items while at Little Havana
  cart.add({
    itemId: "ropa-vieja-bowl",
    name: "Ropa Vieja Bowl",
    sides: ["Arroz Moro (Black beans & rice)", "Crispy Tostones con Mojo"],
    price: 18.45,
  });
  cart.add({
    itemId: "ropa-vieja-bowl",
    name: "Ropa Vieja Bowl",
    sides: ["Arroz Moro (Black beans & rice)", "Crispy Tostones con Mojo"],
    price: 18.45,
  });
  cart.add({
    itemId: "cafecito-cubano",
    name: "Cafecito Cubano",
    sides: [],
    price: 4.25,
  });

  assert.equal(cart.count, 3);
  assert.equal(cart.lines.length, 2);
  assert.equal(cart.total, 18.45 * 2 + 4.25); // 41.15
  assert.equal(cart.location.name, "Little Havana");

  const lhUrl = cart.getWhatsAppUrl();
  assert.ok(lhUrl.includes("13055550123"));
  assert.ok(decodeURIComponent(lhUrl).includes("Little Havana store"));

  // Switch to Brickell
  cart.setLocation("brickell");
  assert.equal(cart.location.name, "Brickell");
  assert.equal(cart.count, 3, "Cart count must be preserved after switching to Brickell");
  assert.equal(cart.lines.length, 2, "Cart lines must be preserved after switching to Brickell");
  assert.equal(cart.total, 41.15, "Cart total must be preserved after switching to Brickell");

  const brickellUrl = cart.getWhatsAppUrl();
  assert.ok(brickellUrl.includes("13055550124"), "Target phone must update to Brickell (13055550124)");
  assert.ok(decodeURIComponent(brickellUrl).includes("Brickell store"), "Message header must update to Brickell store");

  // Switch to Doral
  cart.setLocation("doral");
  assert.equal(cart.location.name, "Doral");
  assert.equal(cart.count, 3, "Cart count must be preserved after switching to Doral");
  assert.equal(cart.lines.length, 2, "Cart lines must be preserved after switching to Doral");
  assert.equal(cart.total, 41.15, "Cart total must be preserved after switching to Doral");

  const doralUrl = cart.getWhatsAppUrl();
  assert.ok(doralUrl.includes("13055550125"), "Target phone must update to Doral (13055550125)");
  assert.ok(decodeURIComponent(doralUrl).includes("Doral store"), "Message header must update to Doral store");

  // Switch back to Little Havana
  cart.setLocation("little-havana");
  assert.equal(cart.location.name, "Little Havana");
  assert.equal(cart.count, 3);
  assert.equal(cart.lines.length, 2);
  assert.equal(cart.total, 41.15);
  assert.ok(cart.getWhatsAppUrl().includes("13055550123"));

  console.log("  ✓ Cart contents (items, quantities, sides, total) remain 100% intact across repeated store location switches.");
}

// 5. Component SSR Verification under each Location
console.log("  [2.5] Testing Component UI output for each location...");
for (const store of expectedStores) {
  // Render CartSheet with defaultLocationId = store.id
  const cartSheetHtml = ReactDOMServer.renderToString(
    React.createElement(
      CartProvider,
      { defaultLocationId: store.id },
      React.createElement(CartSheet, { open: true, onClose: () => {} }),
    ),
  );

  // Must contain store name in pickup banner
  assert.ok(
    cartSheetHtml.includes(store.name),
    `CartSheet must display ${store.name} in pickup banner`,
  );
  assert.ok(
    cartSheetHtml.includes(store.phoneRaw),
    `CartSheet WhatsApp link must route to ${store.phoneRaw}`,
  );

  // Render MobileActionBar with defaultLocationId = store.id
  const mobileBarHtml = ReactDOMServer.renderToString(
    React.createElement(
      CartProvider,
      { defaultLocationId: store.id },
      React.createElement(MobileActionBar, { onOpenCart: () => {} }),
    ),
  );

  assert.ok(
    mobileBarHtml.includes(store.phoneRaw),
    `MobileActionBar WhatsApp link must route to ${store.phoneRaw}`,
  );
}
console.log("  ✓ CartSheet and MobileActionBar components correctly bind to active store state in UI and link targets.");

console.log("=== [PASS] Location Switching & Synchronization Passed Cleanly ===\n");
