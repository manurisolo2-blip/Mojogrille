import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  generateRestaurantSchema,
  generateMenuSchema,
  generateMultiLocationRestaurantSchema,
  generateRestaurantAndMenuJsonLd,
  generateFullStructuredDataGraph,
} from "./lib/seo";
import { LOCATIONS, locationsList } from "./data/locations";
import { categories, menu } from "./data/menu";

console.log("--- Starting SEO, Schema.org & Copywriting Verification Suite ---");

// 1. Validate Schema.org Restaurant for all 3 Miami branches
console.log("1. Validating Restaurant schemas for Little Havana, Brickell, and Doral...");
for (const loc of locationsList) {
  const schema = generateRestaurantSchema(loc);
  assert.equal(schema["@context"], "https://schema.org");
  assert.equal(schema["@type"], "Restaurant");
  assert.equal(schema.name, `Mojo Grille - ${loc.name}`);
  assert.equal(schema.telephone, loc.phone);
  assert.equal(schema.priceRange, "$$");
  assert.deepEqual(schema.servesCuisine, ["Cuban", "Caribbean", "Latin American"]);
  assert.equal(schema.address.streetAddress, loc.address.street);
  assert.equal(schema.address.addressRegion, "FL");
  assert.equal(schema.address.addressCountry, "US");
  assert.ok(schema.geo.latitude > 25 && schema.geo.latitude < 26);
  assert.ok(schema.geo.longitude < -80 && schema.geo.longitude > -81);
  assert.equal(schema.aggregateRating.ratingValue, "4.7");
  assert.equal(schema.aggregateRating.reviewCount, "3000");
  assert.equal(schema.potentialAction["@type"], "OrderAction");
  assert.equal(schema.potentialAction.target.urlTemplate, "https://mojogrille.com/#menu");
  console.log(`  ✓ Location '${loc.name}' schema verified.`);
}

// 2. Validate Schema.org Menu schema
console.log("2. Validating Menu schema and item catalog...");
const menuSchema = generateMenuSchema(categories, menu);
assert.equal(menuSchema["@context"], "https://schema.org");
assert.equal(menuSchema["@type"], "Menu");
assert.ok(menuSchema.hasMenuSection.length >= 5, "Expected at least 5 menu sections");

for (const section of menuSchema.hasMenuSection) {
  assert.equal(section["@type"], "MenuSection");
  assert.ok(section.name.length > 0);
  assert.ok(section.hasMenuItem.length > 0, `Section '${section.name}' has no items`);
  for (const item of section.hasMenuItem) {
    assert.equal(item["@type"], "MenuItem");
    assert.ok(item.name.length > 0);
    assert.ok(item.description.length > 0);
    assert.equal(item.offers["@type"], "Offer");
    assert.equal(item.offers.priceCurrency, "USD");
    assert.ok(parseFloat(item.offers.price) > 0);
  }
}
console.log("  ✓ Menu schema and all sections/offers verified.");

// 3. Validate Multi-Location and Full Graph
console.log("3. Validating Multi-Location graph and comprehensive graph...");
const multiLoc = generateMultiLocationRestaurantSchema();
assert.equal(multiLoc["@context"], "https://schema.org");
assert.equal(multiLoc["@graph"].length, 3);

const fullGraph = generateFullStructuredDataGraph(locationsList, categories, menu);
assert.equal(fullGraph["@context"], "https://schema.org");
assert.ok(Array.isArray(fullGraph["@graph"]));
assert.equal(fullGraph["@graph"].length, 4, "Should have 3 restaurants + 1 menu in graph");

const serialized = JSON.stringify(fullGraph);
const roundTrip = JSON.parse(serialized);
assert.equal(roundTrip["@graph"].length, 4);
console.log("  ✓ Full structured data graph verified.");

// 4. Validate public/robots.txt
console.log("4. Validating public/robots.txt...");
const robotsPath = path.resolve(process.cwd(), "public/robots.txt");
assert.ok(fs.existsSync(robotsPath), "robots.txt must exist in public/");
const robotsContent = fs.readFileSync(robotsPath, "utf-8");
assert.ok(robotsContent.includes("User-agent: *"));
assert.ok(robotsContent.includes("Allow: /"));
assert.ok(robotsContent.includes("Sitemap: https://mojogrille.com/sitemap.xml"));
console.log("  ✓ robots.txt verified.");

// 5. Validate public/sitemap.xml
console.log("5. Validating public/sitemap.xml...");
const sitemapPath = path.resolve(process.cwd(), "public/sitemap.xml");
assert.ok(fs.existsSync(sitemapPath), "sitemap.xml must exist in public/");
const sitemapContent = fs.readFileSync(sitemapPath, "utf-8");
assert.ok(sitemapContent.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'));
assert.ok(sitemapContent.includes("<loc>https://mojogrille.com/</loc>"));
assert.ok(sitemapContent.includes("<loc>https://mojogrille.com/#menu</loc>"));
assert.ok(sitemapContent.includes("<loc>https://mojogrille.com/#catering</loc>"));
assert.ok(sitemapContent.includes("<loc>https://mojogrille.com/#location-little-havana</loc>"));
assert.ok(sitemapContent.includes("<loc>https://mojogrille.com/#location-brickell</loc>"));
assert.ok(sitemapContent.includes("<loc>https://mojogrille.com/#location-doral</loc>"));
assert.ok(sitemapContent.includes("<lastmod>2026-09-04</lastmod>"));
console.log("  ✓ sitemap.xml verified.");

// 6. Validate public/og-image.jpg
console.log("6. Validating public/og-image.jpg...");
const ogImagePath = path.resolve(process.cwd(), "public/og-image.jpg");
assert.ok(fs.existsSync(ogImagePath), "og-image.jpg must exist in public/");
const ogImageStats = fs.statSync(ogImagePath);
assert.ok(ogImageStats.size > 10000, "og-image.jpg must be a valid image asset");
console.log(`  ✓ og-image.jpg verified (${ogImageStats.size} bytes).`);

// 7. Validate Copywriting Requirements in Components
console.log("7. Validating Copywriting requirements in source files...");

const heroPath = path.resolve(process.cwd(), "src/components/mojo/HeroSection.tsx");
const heroContent = fs.readFileSync(heroPath, "utf-8");
const heroText = heroContent.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
assert.ok(
  heroText.includes("4.7 Stars across +3,000 orders in Miami"),
  "Hero must contain social proof rating badge",
);
assert.ok(
  heroContent.includes("The Authentic Criollo Flavor of Miami, Marinado to Perfection"),
  "Hero must contain exact H1 title",
);
assert.ok(
  heroContent.includes("al momento"),
  "Hero must contain 'al momento' copywriting",
);

const cartSheetPath = path.resolve(process.cwd(), "src/components/mojo/CartSheet.tsx");
const cartSheetContent = fs.readFileSync(cartSheetPath, "utf-8");
assert.ok(
  cartSheetContent.includes("Your cart is empty. Start with our signature favorites!"),
  "CartSheet must contain required empty cart message",
);
assert.ok(
  cartSheetContent.includes("Order via WhatsApp"),
  "CartSheet must contain 'Order via WhatsApp' button",
);
assert.ok(
  cartSheetContent.includes("Instant order confirmation directly with our"),
  "CartSheet must contain WhatsApp conversion confirmation hint",
);

const rootPath = path.resolve(process.cwd(), "src/routes/__root.tsx");
const rootContent = fs.readFileSync(rootPath, "utf-8");
assert.ok(rootContent.includes("generateRestaurantSchema"), "__root.tsx must import generateRestaurantSchema");
assert.ok(rootContent.includes("generateMenuSchema"), "__root.tsx must import generateMenuSchema");
assert.ok(rootContent.includes('application/ld+json'), "__root.tsx must contain JSON-LD script");
assert.ok(rootContent.includes("og:title"), "__root.tsx must contain og:title");
assert.ok(rootContent.includes("og:image"), "__root.tsx must contain og:image");
assert.ok(rootContent.includes("og:url"), "__root.tsx must contain og:url");
assert.ok(rootContent.includes("og:locale"), "__root.tsx must contain og:locale");
assert.ok(rootContent.includes("og:site_name"), "__root.tsx must contain og:site_name");
assert.ok(rootContent.includes("twitter:card"), "__root.tsx must contain twitter:card");
assert.ok(rootContent.includes("geo.region"), "__root.tsx must contain geo.region");

console.log("  ✓ Component and Route copywriting & metadata verified.");

console.log("\nALL SEO, SCHEMA.ORG & COPYWRITING VERIFICATIONS PASSED CLEANLY!");
