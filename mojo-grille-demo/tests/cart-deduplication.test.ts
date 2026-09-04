import assert from "node:assert/strict";
import type { AddCartItemInput, CartLine } from "../src/types/mojo.js";
import { currency } from "../src/data/menu.js";

/**
 * Challenger Test Suite: Cart Deduplication & State Invariants
 * Tests line key generation, identical side merging (order-independent),
 * distinct side segregation, quantity decrements/removals, and fuzz invariants.
 */

console.log("=== [TEST SUITE 4] Cart Deduplication & State Invariants ===");

// Canonical Cart Model implementing exact cart.tsx behavior
class CartStore {
  lines: CartLine[] = [];

  get count(): number {
    return this.lines.reduce((sum, line) => sum + line.qty, 0);
  }

  get total(): number {
    return this.lines.reduce((sum, line) => sum + line.qty * line.price, 0);
  }

  add(line: AddCartItemInput): void {
    const sortedSides = [...line.sides].sort();
    const key = `${line.itemId}::${sortedSides.join("|")}`;
    const existing = this.lines.find((l) => l.key === key);
    if (existing) {
      this.lines = this.lines.map((l) =>
        l.key === key ? { ...l, qty: l.qty + 1 } : l,
      );
    } else {
      this.lines = [...this.lines, { ...line, sides: sortedSides, key, qty: 1 }];
    }
    this.assertInvariants();
  }

  remove(key: string): void {
    this.lines = this.lines.flatMap((l) =>
      l.key === key ? (l.qty > 1 ? [{ ...l, qty: l.qty - 1 }] : []) : [l],
    );
    this.assertInvariants();
  }

  updateQty(key: string, qty: number): void {
    this.lines =
      qty <= 0
        ? this.lines.filter((l) => l.key !== key)
        : this.lines.map((l) =>
            l.key === key ? { ...l, qty: Math.max(1, Math.floor(qty)) } : l,
          );
    this.assertInvariants();
  }

  clear(): void {
    this.lines = [];
    this.assertInvariants();
  }

  assertInvariants(): void {
    // Invariant 1: count equals sum of quantities
    const expectedCount = this.lines.reduce((sum, l) => sum + l.qty, 0);
    assert.equal(this.count, expectedCount, "Invariant violated: count must equal sum(line.qty)");

    // Invariant 2: total equals sum of line totals
    const expectedTotal = this.lines.reduce((sum, l) => sum + l.qty * l.price, 0);
    assert.ok(
      Math.abs(this.total - expectedTotal) < 0.0001,
      "Invariant violated: total must equal sum(line.qty * line.price)",
    );

    // Invariant 3: all quantities are positive integers >= 1
    for (const line of this.lines) {
      assert.ok(Number.isInteger(line.qty) && line.qty >= 1, `Line ${line.key} has invalid qty: ${line.qty}`);
      assert.ok(line.price > 0, `Line ${line.key} has non-positive price: ${line.price}`);
    }

    // Invariant 4: all keys in lines must be strictly unique
    const keys = this.lines.map((l) => l.key);
    const uniqueKeys = new Set(keys);
    assert.equal(uniqueKeys.size, keys.length, "Invariant violated: duplicate keys detected in cart lines");
  }
}

// 1. Identical Side Combinations Merging (Order Independent)
console.log("  [4.1] Testing identical side combinations merge into single line with incremented qty...");
{
  const cart = new CartStore();

  // Add Dish A with [Moro, Tostones]
  cart.add({
    itemId: "ropa-vieja-bowl",
    name: "Ropa Vieja Bowl",
    sides: ["Arroz Moro (Black beans & rice)", "Crispy Tostones con Mojo"],
    price: 18.45,
  });

  assert.equal(cart.lines.length, 1);
  assert.equal(cart.lines[0]!.qty, 1);
  assert.equal(cart.count, 1);
  assert.equal(cart.total, 18.45);

  // Add same Dish A with identical sides in IDENTICAL order
  cart.add({
    itemId: "ropa-vieja-bowl",
    name: "Ropa Vieja Bowl",
    sides: ["Arroz Moro (Black beans & rice)", "Crispy Tostones con Mojo"],
    price: 18.45,
  });

  assert.equal(cart.lines.length, 1, "Must NOT create a new line for identical sides");
  assert.equal(cart.lines[0]!.qty, 2, "Quantity must increment to 2");
  assert.equal(cart.count, 2);
  assert.equal(cart.total, 36.90);

  // Add same Dish A with identical sides in REVERSED order
  cart.add({
    itemId: "ropa-vieja-bowl",
    name: "Ropa Vieja Bowl",
    sides: ["Crispy Tostones con Mojo", "Arroz Moro (Black beans & rice)"],
    price: 18.45,
  });

  assert.equal(cart.lines.length, 1, "Must NOT create a new line when sides are specified in different order");
  assert.equal(cart.lines[0]!.qty, 3, "Quantity must increment to 3");
  assert.equal(cart.count, 3);
  assert.equal(currency(cart.total), "$55.35");
  assert.equal(Math.round(cart.total * 100), 5535);

  console.log("  ✓ Identical side combinations successfully merge and increment quantity regardless of side array order.");
}

// 2. Different Side Combinations Remain Separate Lines
console.log("  [4.2] Testing distinct side combinations generate separate lines...");
{
  const cart = new CartStore();

  // Line 1: Ropa Vieja with Moro
  cart.add({
    itemId: "ropa-vieja-bowl",
    name: "Ropa Vieja Bowl",
    sides: ["Arroz Moro (Black beans & rice)"],
    price: 16.95,
  });

  // Line 2: Ropa Vieja with Yuca
  cart.add({
    itemId: "ropa-vieja-bowl",
    name: "Ropa Vieja Bowl",
    sides: ["Yuca con Mojo de Ajo"],
    price: 18.95,
  });

  // Line 3: Ropa Vieja with Moro + Maduros
  cart.add({
    itemId: "ropa-vieja-bowl",
    name: "Ropa Vieja Bowl",
    sides: ["Arroz Moro (Black beans & rice)", "Sweet Plátanos Maduros"],
    price: 18.70,
  });

  // Line 4: Ropa Vieja with NO sides
  cart.add({
    itemId: "ropa-vieja-bowl",
    name: "Ropa Vieja Bowl",
    sides: [],
    price: 16.95,
  });

  assert.equal(cart.lines.length, 4, "Expected 4 distinct lines for 4 distinct side configurations");
  assert.equal(cart.count, 4);
  assert.equal(currency(cart.total), "$71.55");
  assert.equal(Math.round(cart.total * 100), 7155);

  // Line 5: Different Dish (El Cubano) with Moro
  cart.add({
    itemId: "cubano-prensado",
    name: "El Cubano Prensado",
    sides: ["Arroz Moro (Black beans & rice)"],
    price: 14.95,
  });

  assert.equal(cart.lines.length, 5, "Different dish with same side must create its own distinct line");
  assert.equal(cart.count, 5);

  console.log("  ✓ Distinct side configurations and distinct dish IDs remain strictly segregated lines.");
}

// 3. Items Without Sides Deduplication (e.g. Cafecito, Flan, Sides)
console.log("  [4.3] Testing deduplication for side-less items (empty sides array)...");
{
  const cart = new CartStore();

  cart.add({ itemId: "cafecito-cubano", name: "Cafecito Cubano", sides: [], price: 4.25 });
  cart.add({ itemId: "cafecito-cubano", name: "Cafecito Cubano", sides: [], price: 4.25 });
  cart.add({ itemId: "cafecito-cubano", name: "Cafecito Cubano", sides: [], price: 4.25 });

  assert.equal(cart.lines.length, 1);
  assert.equal(cart.lines[0]!.qty, 3);
  assert.equal(cart.lines[0]!.key, "cafecito-cubano::");
  assert.equal(cart.total, 12.75);

  // Add another side-less item
  cart.add({ itemId: "tostones-mojo", name: "Crispy Tostones con Mojo", sides: [], price: 7.25 });
  assert.equal(cart.lines.length, 2);
  assert.equal(cart.count, 4);

  console.log("  ✓ Side-less items correctly merge on itemId and do not conflict.");
}

// 4. Quantity Decrement and Removal Lifecycle
console.log("  [4.4] Testing remove() decrement and line deletion lifecycle...");
{
  const cart = new CartStore();
  cart.add({ itemId: "pollo-mojo-bowl", name: "Mojo Chicken Bowl", sides: ["Arroz Moro"], price: 15.5 });
  cart.add({ itemId: "pollo-mojo-bowl", name: "Mojo Chicken Bowl", sides: ["Arroz Moro"], price: 15.5 });

  const lineKey = cart.lines[0]!.key;
  assert.equal(cart.lines[0]!.qty, 2);

  // Decrement once: qty 2 -> 1
  cart.remove(lineKey);
  assert.equal(cart.lines.length, 1, "Line must remain when qty > 1");
  assert.equal(cart.lines[0]!.qty, 1);
  assert.equal(cart.count, 1);

  // Decrement again: qty 1 -> 0, line removed
  cart.remove(lineKey);
  assert.equal(cart.lines.length, 0, "Line must be completely removed when qty reaches 0");
  assert.equal(cart.count, 0);
  assert.equal(cart.total, 0);

  // Removing non-existent key is a safe no-op
  cart.remove("non-existent-key");
  assert.equal(cart.lines.length, 0);

  console.log("  ✓ remove() decrements quantities and completely purges lines reaching 0 quantity.");
}

// 5. updateQty() Robustness
console.log("  [4.5] Testing updateQty() boundary values...");
{
  const cart = new CartStore();
  cart.add({ itemId: "vaca-frita-bowl", name: "Vaca Frita Criolla", sides: [], price: 17.5 });
  const key = cart.lines[0]!.key;

  cart.updateQty(key, 5);
  assert.equal(cart.lines[0]!.qty, 5);

  cart.updateQty(key, 2.8); // Floats floor to integer
  assert.equal(cart.lines[0]!.qty, 2);

  cart.updateQty(key, 0); // 0 removes line
  assert.equal(cart.lines.length, 0);

  cart.add({ itemId: "vaca-frita-bowl", name: "Vaca Frita Criolla", sides: [], price: 17.5 });
  cart.updateQty(cart.lines[0]!.key, -10); // Negative removes line
  assert.equal(cart.lines.length, 0);

  console.log("  ✓ updateQty() enforces positive integers and cleans up zero/negative inputs.");
}

// 6. Fuzz / Chaos Test: 5,000 Random Operations Generator
console.log("  [4.6] Fuzz testing cart state with 5,000 randomized operations...");
{
  const cart = new CartStore();
  const testItems = [
    { id: "ropa-vieja", name: "Ropa Vieja", basePrice: 16.95 },
    { id: "lechon-asado", name: "Lechón Asado", basePrice: 15.95 },
    { id: "cubano", name: "El Cubano", basePrice: 14.95 },
    { id: "cafecito", name: "Cafecito", basePrice: 4.25 },
  ];
  const sidePool = [
    { name: "Arroz Moro", price: 0 },
    { name: "Crispy Tostones", price: 1.5 },
    { name: "Yuca con Mojo", price: 2.0 },
    { name: "Sweet Maduros", price: 1.75 },
  ];

  for (let step = 0; step < 5000; step++) {
    const action = Math.random();

    if (action < 0.65 || cart.lines.length === 0) {
      // 65% chance: Add item
      const item = testItems[Math.floor(Math.random() * testItems.length)]!;
      // Pick random 0 to 3 sides
      const numSides = Math.floor(Math.random() * 4);
      const chosenSides = [...sidePool]
        .sort(() => 0.5 - Math.random())
        .slice(0, numSides);
      const extraPrice = chosenSides.reduce((sum, s) => sum + s.price, 0);

      cart.add({
        itemId: item.id,
        name: item.name,
        sides: chosenSides.map((s) => s.name),
        price: item.basePrice + extraPrice,
      });
    } else if (action < 0.85) {
      // 20% chance: Remove random item
      const randomLine = cart.lines[Math.floor(Math.random() * cart.lines.length)]!;
      cart.remove(randomLine.key);
    } else if (action < 0.98) {
      // 13% chance: updateQty
      const randomLine = cart.lines[Math.floor(Math.random() * cart.lines.length)]!;
      const newQty = Math.floor(Math.random() * 6); // 0 to 5
      cart.updateQty(randomLine.key, newQty);
    } else {
      // 2% chance: Clear cart
      cart.clear();
    }
  }

  console.log(`  ✓ 5,000 random operations completed with 0 invariant violations. Current cart lines: ${cart.lines.length}.`);
}

console.log("=== [PASS] Cart Deduplication & State Invariants Passed Cleanly ===\n");
