import assert from "node:assert/strict";
import { menu, sideOptions, currency } from "../src/data/menu.js";
import type { CartLine } from "../src/types/mojo.js";

/**
 * Challenger Test Suite: Price Math Precision
 * Tests exact penny oracle vs floating point calculation,
 * side combinations, quantity multipliers, and string formatting.
 */

console.log("=== [TEST SUITE 1] Price Math Precision & Penny Oracle ===");

// Exact integer penny oracle
function calculateLineCentsOracle(basePrice: number, sidePrices: number[], qty: number): number {
  const baseCents = Math.round(basePrice * 100);
  const sideCentsSum = sidePrices.reduce((sum, p) => sum + Math.round(p * 100), 0);
  const unitCents = baseCents + sideCentsSum;
  return unitCents * qty;
}

// 1. Verify currency formatting helper
console.log("  [1.1] Testing currency() string formatting helper...");
assert.equal(currency(0), "$0.00");
assert.equal(currency(16.95), "$16.95");
assert.equal(currency(18.45), "$18.45");
assert.equal(currency(100), "$100.00");
assert.equal(currency(0.5), "$0.50");
assert.equal(currency(0.05), "$0.05");
assert.equal(currency(1234.56), "$1234.56");
console.log("  ✓ currency() formats dollar strings with exactly two decimal places.");

// 2. Test all menu items with all possible combinations of sides (powerset of 4 sides = 16 combinations)
console.log("  [1.2] Testing all 17 menu items across all 16 side combinations...");
let totalCombinationsTested = 0;

function getSubsets<T>(array: T[]): T[][] {
  const subsets: T[][] = [[]];
  for (const item of array) {
    const len = subsets.length;
    for (let i = 0; i < len; i++) {
      subsets.push([...subsets[i]!, item]);
    }
  }
  return subsets;
}

const sideSubsets = getSubsets(sideOptions);
assert.equal(sideSubsets.length, 16, "Must have 2^4 = 16 side combinations");

const quantitiesToTest = [1, 2, 3, 5, 7, 10, 25, 50, 100];

for (const item of menu) {
  for (const sides of sideSubsets) {
    // Only items with sidesAllowed should have extra sides in real flow,
    // but test both to verify robustness of math regardless.
    const extrasSum = sides.reduce((sum, s) => sum + s.price, 0);
    const unitPrice = item.price + extrasSum;

    for (const qty of quantitiesToTest) {
      const oracleCents = calculateLineCentsOracle(
        item.price,
        sides.map((s) => s.price),
        qty,
      );
      const appCalculatedTotal = unitPrice * qty;

      // Check penny accuracy
      const appCents = Math.round(appCalculatedTotal * 100);
      assert.equal(
        appCents,
        oracleCents,
        `Mismatch for ${item.name} with sides [${sides.map((s) => s.name).join(",")}] x ${qty}: app=${appCents} cents, oracle=${oracleCents} cents`,
      );

      // Check string format equality
      const oracleFormatted = `$${(oracleCents / 100).toFixed(2)}`;
      const appFormatted = currency(appCalculatedTotal);
      assert.equal(
        appFormatted,
        oracleFormatted,
        `Formatting mismatch for ${item.name}: app=${appFormatted}, oracle=${oracleFormatted}`,
      );

      totalCombinationsTested++;
    }
  }
}
console.log(`  ✓ Successfully verified ${totalCombinationsTested} menu item, side, and quantity permutations against integer-cent oracle.`);

// 3. Test multi-item cart total calculation with diverse combinations
console.log("  [1.3] Testing multi-line cart total precision...");
const simulatedCart: CartLine[] = [
  {
    key: "ropa-vieja::moro|tostones",
    itemId: "ropa-vieja-bowl",
    name: "Ropa Vieja Bowl",
    sides: ["Arroz Moro", "Crispy Tostones con Mojo"],
    price: 16.95 + 0 + 1.5, // 18.45
    qty: 3, // 55.35
  },
  {
    key: "cubano-prensado::maduros",
    itemId: "cubano-prensado",
    name: "Cuban Sandwich Tradicional",
    sides: ["Sweet Plátanos Maduros"],
    price: 14.95 + 1.75, // 16.70
    qty: 2, // 33.40
  },
  {
    key: "tostones-mojo::",
    itemId: "tostones-mojo",
    name: "Crispy Tostones con Mojo",
    sides: [],
    price: 7.25,
    qty: 4, // 29.00
  },
  {
    key: "cafecito-cubano::",
    itemId: "cafecito-cubano",
    name: "Cafecito Cubano",
    sides: [],
    price: 4.25,
    qty: 5, // 21.25
  },
  {
    key: "bandeja-familiar::",
    itemId: "bandeja-familiar",
    name: "Bandeja Criolla Familiar",
    sides: [],
    price: 129.0,
    qty: 1, // 129.00
  },
];

// In cart.tsx: total = lines.reduce((sum, line) => sum + line.qty * line.price, 0)
const cartCount = simulatedCart.reduce((sum, line) => sum + line.qty, 0);
const cartTotal = simulatedCart.reduce((sum, line) => sum + line.qty * line.price, 0);

assert.equal(cartCount, 3 + 2 + 4 + 5 + 1); // 15 items
assert.equal(cartCount, 15);

// Expected exact cents:
// 5535 + 3340 + 2900 + 2125 + 12900 = 26800 cents = $268.00
const expectedTotalCents = 5535 + 3340 + 2900 + 2125 + 12900;
assert.equal(Math.round(cartTotal * 100), expectedTotalCents);
assert.equal(currency(cartTotal), "$268.00");
console.log(`  ✓ Multi-line cart total ($${cartTotal.toFixed(2)}) matches exact cents calculation.`);

// 4. Test side toggling dynamics (Scenario 6.2 from PRD)
console.log("  [1.4] Testing interactive side toggle sequence (PRD Scenario 6.2)...");
{
  const base = 16.95;
  let currentSides: string[] = [];

  const getPrice = (selectedIds: string[]) => {
    const extras = sideOptions
      .filter((s) => selectedIds.includes(s.id))
      .reduce((sum, s) => sum + s.price, 0);
    return base + extras;
  };

  // Step 1: Base price alone
  assert.equal(currency(getPrice(currentSides)), "$16.95");

  // Step 2: Add Arroz Moro (+$0.00)
  currentSides.push("moro");
  assert.equal(currency(getPrice(currentSides)), "$16.95");

  // Step 3: Add Crispy Tostones (+$1.50)
  currentSides.push("tostones");
  assert.equal(currency(getPrice(currentSides)), "$18.45");

  // Step 4: Add Yuca con Mojo (+$2.00)
  currentSides.push("yuca");
  assert.equal(currency(getPrice(currentSides)), "$20.45");

  // Step 5: Remove Crispy Tostones (-$1.50)
  currentSides = currentSides.filter((id) => id !== "tostones");
  assert.equal(currency(getPrice(currentSides)), "$18.95");

  // Step 6: Add Sweet Plátanos Maduros (+$1.75)
  currentSides.push("maduros");
  // 16.95 + 0 + 2.00 + 1.75 = 20.70
  assert.equal(currency(getPrice(currentSides)), "$20.70");

  console.log("  ✓ Interactive side toggle sequence adheres strictly to PRD Scenario 6.2.");
}

console.log("=== [PASS] Price Math Precision & Penny Oracle Passed Cleanly ===\n");
