import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import {
  LocationSchema,
  MenuItemSchema,
  SideOptionSchema,
  CartLineSchema,
  WhatsAppOrderPayloadSchema,
} from "../src/types/mojo.js";
import { LOCATIONS, locationsList } from "../src/data/locations.js";
import { menu, sideOptions } from "../src/data/menu.js";

/**
 * ============================================================================
 * Mojo Grille Platform Redesign — Master Challenger Stress Harness
 * ============================================================================
 * Coordinates automated empirical verification across all required vectors:
 * 1. Price math precision (penny oracle vs float)
 * 2. Location switching synchronization
 * 3. WhatsApp wa.me link URL encoding robustness
 * 4. Cart line deduplication & fuzz state invariants
 * 5. Runtime Zod schema contract validation
 */

const startTime = Date.now();
console.log("\n===============================================================");
console.log(" MOJO GRILLE PLATFORM REDESIGN — ADVERSARIAL VERIFICATION SUITE");
console.log("===============================================================\n");

// --- PHASE 1: Runtime Zod Schema Conformance ---
console.log("--- [PHASE 1] Runtime Zod Contract Conformance ---");

// Validate all locations against LocationSchema
for (const loc of locationsList) {
  const result = LocationSchema.safeParse(loc);
  assert.ok(result.success, `Location ${loc.id} failed Zod schema validation: ${JSON.stringify(result)}`);
}
console.log(`  ✓ All ${locationsList.length} store locations conform to LocationSchema.`);

// Validate all side options against SideOptionSchema
for (const side of sideOptions) {
  const result = SideOptionSchema.safeParse(side);
  assert.ok(result.success, `Side option ${side.id} failed Zod schema validation: ${JSON.stringify(result)}`);
}
console.log(`  ✓ All ${sideOptions.length} side options conform to SideOptionSchema.`);

// Validate all 17 menu items against MenuItemSchema
for (const item of menu) {
  const result = MenuItemSchema.safeParse(item);
  assert.ok(result.success, `Menu item ${item.id} failed Zod schema validation: ${JSON.stringify(result)}`);
}
console.log(`  ✓ All ${menu.length} menu items conform to MenuItemSchema.`);

// Validate CartLine and WhatsAppOrderPayload schemas
const testCartLine = {
  key: "ropa-vieja::moro",
  itemId: "ropa-vieja",
  name: "Ropa Vieja",
  sides: ["Arroz Moro"],
  price: 16.95,
  qty: 2,
};
assert.ok(CartLineSchema.safeParse(testCartLine).success);

const testPayload = {
  location: "brickell",
  lines: [testCartLine],
  total: 33.9,
};
assert.ok(WhatsAppOrderPayloadSchema.safeParse(testPayload).success);
console.log("  ✓ CartLine and WhatsAppOrderPayload schemas strictly enforce type boundaries.\n");

// --- PHASE 2: Execute Dedicated Subsuites ---
const suites = [
  { name: "Price Math Precision & Penny Oracle", file: "tests/price-math.test.ts" },
  { name: "Location Switching & State Synchronization", file: "tests/location-sync.test.ts" },
  { name: "WhatsApp URL Encoding & Escaping Robustness", file: "tests/url-encoding.test.ts" },
  { name: "Cart Deduplication & Fuzz State Invariants", file: "tests/cart-deduplication.test.ts" },
];

let allPassed = true;

for (const suite of suites) {
  console.log(`--- [RUNNING] ${suite.name} (${suite.file}) ---`);
  const res = spawnSync("npx", ["tsx", "--loader", "./mock-image-loader.mjs", suite.file], {
    shell: true,
    encoding: "utf-8",
    cwd: resolve("."),
  });

  if (res.status === 0) {
    console.log(res.stdout);
  } else {
    allPassed = false;
    console.error(`FAILED: ${suite.name}`);
    console.error(res.stdout);
    console.error(res.stderr);
    break;
  }
}

const elapsedMs = Date.now() - startTime;
console.log("===============================================================");
if (allPassed) {
  console.log(` ALL CHALLENGER TEST SUITES PASSED CLEANLY (${elapsedMs}ms)`);
  console.log(" VERDICT: APPROVE");
} else {
  console.log(` CHALLENGER TESTS ENCOUNTERED FAILURES (${elapsedMs}ms)`);
  console.log(" VERDICT: REQUEST_CHANGES");
  process.exit(1);
}
console.log("===============================================================\n");
