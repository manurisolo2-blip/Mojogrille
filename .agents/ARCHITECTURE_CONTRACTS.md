# Mojo Grille — Technical Architecture, Type Contracts & Module Boundaries
**Document ID:** ARCH-MOJO-2026-01  
**Author:** `@TechLead` (Technical Architect)  
**Status:** Approved for Parallel Engineering (`@FrontendDev` & `@BackendDev`)  
**Target Platform:** TanStack Start / React 19 / Vite 8 / Nitro 3 / Tailwind CSS v4 / Cloudflare SSR  
**Reference Documents:**  
- `c:\PaginasWeb\MojoGrille\GEMINI.md` (Workflow & Official Style Guide)  
- `c:\PaginasWeb\MojoGrille\.agents\ORIGINAL_REQUEST.md` (User Request & Acceptance Criteria)  
- `c:\PaginasWeb\MojoGrille\.agents\PRODUCT_REQUIREMENTS.md` (`@ProductLead` PRD)  
- `c:\PaginasWeb\MojoGrille\.agents\DESIGN_SYSTEM.md` (`@DesignSystem` Design Tokens)  
- `c:\PaginasWeb\MojoGrille\.agents\codebase_survey.md` (`@CodebaseExplorer` Audit)  

---

## 1. Executive Summary & Architectural Mission

Per `GEMINI.md`:
> *"Con base en los requerimientos del Product Owner y el diseño, creas la arquitectura de carpetas, esquemas de base de datos y contratos OpenAPI/TypeScript. El Frontend y Backend no empiezan hasta que tus interfaces estén aprobadas."*

This document establishes the authoritative technical blueprint and type contracts for the Mojo Grille platform redesign. It resolves the critical state fragmentation gap identified in Phase 1, institutes strict runtime and compile-time type boundaries, defines unambiguous file ownership between `@FrontendDev` and `@BackendDev` for parallel execution, and guarantees clean compilation (`tsc --noEmit` = 0 errors, `npm run build` = 0 errors).

---

## 2. Key Architecture Gap Resolution: Unified Location & Cart State

### 2.1. The Pre-Phase 2 Gap
In the baseline codebase, store location state (`"Little Havana"`, `"Brickell"`, `"Doral"`) was isolated in a local React state variable inside `TopBar.tsx`. As a result:
- Cart checkout drawers (`CartSheet.tsx`) and the mobile quick-action bar (`MobileActionBar.tsx`) had no visibility into which store the customer selected.
- The WhatsApp checkout URL generator (`whatsappHref(lines, total)`) always defaulted to a single hardcoded phone number (`13055550123`) and omitted store attribution from the outgoing order message.
- Changing location did not propagate to downstream ordering or SEO structured data.

### 2.2. The Unified State Architecture
We elevated store location into the core application state provider (`CartProvider` in `src/components/mojo/cart.tsx`), creating a synchronized single source of truth across all components:

```
                               ┌────────────────────────┐
                               │     CartProvider       │
                               │ (src/.../mojo/cart.tsx)│
                               └───────────┬────────────┘
                                           │
         ┌─────────────────────────────────┼─────────────────────────────────┐
         │                                 │                                 │
         ▼                                 ▼                                 ▼
┌───────────────────┐             ┌───────────────────┐             ┌───────────────────┐
│     TopBar        │             │    CartSheet      │             │  MobileActionBar  │
│                   │             │                   │             │                   │
│ - Reads location  │             │ - Reads location  │             │ - Reads location  │
│ - Calls           │             │ - Calls           │             │ - Calls           │
│   setLocation()   │             │   whatsappHref(   │             │   whatsappHref(   │
│ - Dropdown UI     │             │     location,     │             │     location,     │
│                   │             │     lines, total) │             │     lines, total) │
└───────────────────┘             └───────────────────┘             └───────────────────┘
         │                                 ▲                                 ▲
         └────────── Mutates ──────────────┴─────────────────────────────────┘
                   (Syncs instantly across all mobile & desktop views)
```

### 2.3. State Contract Specification (`CartContextType`)
The context exposes both cart lines, mutations, and store location metadata:

```typescript
export interface CartState {
  lines: CartLine[];
  count: number;
  total: number;
  selectedLocation: LocationId;
  location: Location;
}

export interface CartContextType extends CartState {
  availableLocations: readonly Location[];
  setLocation: (locationId: LocationId) => void;
  add: (line: AddCartItemInput) => void;
  remove: (key: string) => void;
  clear: () => void;
}
```

---

## 3. Strict TypeScript Contracts (`src/types/mojo.ts`)

All domain types are centralized in `src/types/mojo.ts` and paired with runtime Zod schemas.

### 3.1. Location Contracts
```typescript
export const LOCATION_IDS = ["little-havana", "brickell", "doral"] as const;
export type LocationId = (typeof LOCATION_IDS)[number];

export interface LocationAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  fullAddress: string;
}

export interface Location {
  id: LocationId;
  name: string;
  slug: string;
  phone: string;     // E.164 / display format: "+1-305-555-0123"
  phoneRaw: string;  // Plain digits for wa.me / tel: "13055550123"
  address: LocationAddress;
  hours: string;     // e.g. "Mon–Sun · 11:00 AM – 10:00 PM"
  isPrimary?: boolean;
}
```

### 3.2. Categories & Badges
```typescript
export const CATEGORY_IDS = [
  "favoritos",
  "bowls",
  "sandwiches",
  "sides",
  "bebidas",
  "catering",
] as const;
export type CategoryId = (typeof CATEGORY_IDS)[number];

export interface Category {
  id: CategoryId;
  label: string;
  description?: string;
}

export const BADGE_TYPES = [
  "Mojo Signature",
  "Popular",
  "Top Seller",
  "Fresco del día",
] as const;
export type BadgeType = (typeof BADGE_TYPES)[number];
```

### 3.3. Menu Items & Side Options
```typescript
export interface SideOption {
  id: string; // "moro" | "tostones" | "yuca" | "maduros"
  name: string;
  price: number;
  isIncluded?: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: CategoryId;
  badge?: BadgeType | undefined;
  sidesAllowed: boolean;
  featured?: boolean | undefined;
}
```

### 3.4. Cart Lines & Deduplication
```typescript
export interface CartLine {
  /**
   * Deterministic deduplication key:
   * Format: `${itemId}::${[...sides].sort().join('|')}`
   */
  key: string;
  itemId: string;
  name: string;
  sides: string[];
  price: number; // Unit price including chosen sides
  qty: number;   // Positive integer >= 1
}

export type AddCartItemInput = Omit<CartLine, "key" | "qty">;
```

### 3.5. WhatsApp Order Payload & Checkout Link
```typescript
export interface WhatsAppOrderPayload {
  location: LocationId | Location;
  lines: CartLine[];
  total: number;
  customerName?: string;
  customerNotes?: string;
}

export function whatsappHref(
  location: LocationId | Location,
  lines: CartLine[],
  total: number,
): string;
export function whatsappHref(
  lines: CartLine[],
  total: number,
): string;
```

---

## 4. Runtime Zod Validation Schemas

To ensure strict data integrity, runtime inputs are validated via Zod schemas in `src/types/mojo.ts`:

| Type | Zod Schema Export | Key Validations |
| :--- | :--- | :--- |
| `LocationId` | `LocationIdSchema` | Must match `"little-havana" \| "brickell" \| "doral"`. |
| `Location` | `LocationSchema` | Validates `phoneRaw` matches `/^\d{10,15}$/`, requires valid address fields. |
| `CategoryId` | `CategoryIdSchema` | Validates 1 of 6 canonical category IDs. |
| `BadgeType` | `BadgeTypeSchema` | Validates 1 of 4 official badge names. |
| `SideOption` | `SideOptionSchema` | `price >= 0`, `id` and `name` non-empty. |
| `MenuItem` | `MenuItemSchema` | `price > 0`, `category` matches `CategoryIdSchema`, `sidesAllowed: boolean`. |
| `CartLine` | `CartLineSchema` | `qty >= 1` integer, `price > 0`, `key` non-empty string. |
| `WhatsAppOrderPayload` | `WhatsAppOrderPayloadSchema` | Validates `location`, non-empty `lines` array, non-negative `total`. |

---

## 5. Module Boundaries & Team Ownership Matrix

To enable `@FrontendDev` and `@BackendDev` to develop in parallel without merge conflicts, code ownership is partitioned into non-overlapping module sets:

```
┌────────────────────────────────────────────────────────────────────────┐
│                          MODULE OWNERSHIP MAP                          │
├───────────────────────────────────┬────────────────────────────────────┤
│    @FrontendDev (UI & Styling)    │     @BackendDev (Data & Logic)     │
├───────────────────────────────────┼────────────────────────────────────┤
│ • src/components/mojo/TopBar.tsx  │ • src/types/mojo.ts                │
│ • src/components/mojo/HeroSection │ • src/data/locations.ts            │
│ • src/components/mojo/CategoryTabs│ • src/data/menu.ts                 │
│ • src/components/mojo/MenuGrid.tsx│ • src/components/mojo/cart.tsx     │
│ • src/components/mojo/QuickOrder  │ • src/components/mojo/whatsapp.ts  │
│ • src/components/mojo/CartSheet   │ • src/lib/seo.ts                   │
│ • src/components/mojo/MobileAction│                                    │
│ • src/styles.css                  │                                    │
│ • src/routes/index.tsx (Layout)   │                                    │
└───────────────────────────────────┴────────────────────────────────────┘
```

### 5.1. Detailed Responsibilities

#### `@FrontendDev` (Frontend Engineer)
- **Files Owned:**
  - `src/components/mojo/TopBar.tsx`: Sticky navigation, brand monogram, active store dropdown, shopping bag button with pulsing counter.
  - `src/components/mojo/HeroSection.tsx`: Above-the-fold banner, social proof badge (`4.7 Stars`), Playfair Display H1, dual CTAs with smooth-scroll to `#menu`.
  - `src/components/mojo/CategoryTabs.tsx`: Sticky horizontal tab strip, active terracotta styling (`#D95327`), smooth horizontal swiping (`no-scrollbar`).
  - `src/components/mojo/MenuGrid.tsx`: Responsive 3-column dish grid, food imagery hover zoom, badge pill styling by type.
  - `src/components/mojo/QuickOrderModal.tsx`: Side customization modal/bottom-sheet, checkbox multi-select toggles, live unit price recalculation.
  - `src/components/mojo/CartSheet.tsx`: Slide-out cart drawer, line item list, quantity adjustment, estimated total, WhatsApp CTA trigger.
  - `src/components/mojo/MobileActionBar.tsx`: Fixed bottom action bar, iOS safe-area insets, live cart count and subtotal, direct WhatsApp trigger.
  - `src/styles.css`: Tailwind v4 theme tokens, semantic utility classes (`bg-cream`, `surface-white`, `border-subtle`, `text-charcoal`).
- **Contract Consumption:**
  - Consumes `useCart()` for `count`, `lines`, `total`, `location`, `selectedLocation`, `setLocation`, `availableLocations`.
  - Consumes `whatsappHref(location, lines, total)` from `@/components/mojo/whatsapp`.
  - Consumes `menu`, `categories`, `itemsForCategory`, `currency` from `@/data/menu`.

#### `@BackendDev` (Backend / Data Engineer)
- **Files Owned:**
  - `src/types/mojo.ts`: Canonical TypeScript interfaces, Zod schemas, type guards.
  - `src/data/locations.ts`: Store locations database (Little Havana, Brickell, Doral), addresses, phone numbers, resolver helpers.
  - `src/data/menu.ts`: Menu catalog items, category list, side options, query filter functions.
  - `src/components/mojo/cart.tsx`: React Context cart store, line deduplication logic, local state synchronization.
  - `src/components/mojo/whatsapp.ts`: Multi-store WhatsApp message builder, phone routing, URL encoding.
  - `src/lib/seo.ts`: Schema.org JSON-LD generation utilities for Restaurant and Menu.
- **Contract Guarantees:**
  - Guarantees backward compatibility: `useCart()` preserves all legacy methods while adding `location`, `selectedLocation`, `setLocation`, `availableLocations`.
  - Guarantees overloaded `whatsappHref`: supports both `whatsappHref(location, lines, total)` and `whatsappHref(lines, total)`.

---

## 6. Import Paths & Dependency Graph

All cross-module imports must follow the established TypeScript path alias `@/*` -> `./src/*`:

```typescript
// Types & Validation Schemas
import type { 
  Location, 
  LocationId, 
  MenuItem, 
  CartLine, 
  CartContextType,
  BadgeType,
  SideOption 
} from "@/types/mojo";
import { 
  MenuItemSchema, 
  CartLineSchema, 
  LocationSchema 
} from "@/types/mojo";

// Store Locations Data
import { 
  LOCATIONS, 
  locationsList, 
  DEFAULT_LOCATION, 
  resolveLocation 
} from "@/data/locations";

// Menu Catalog Data
import { 
  menu, 
  categories, 
  sideOptions, 
  itemsForCategory, 
  currency 
} from "@/data/menu";

// Application State Hook
import { useCart, CartProvider } from "@/components/mojo/cart";

// WhatsApp Checkout Link Generation
import { whatsappHref, formatWhatsAppMessage } from "@/components/mojo/whatsapp";

// Schema.org Structured Data
import { generateRestaurantSchema, generateMenuSchema } from "@/lib/seo";
```

---

## 7. WhatsApp Checkout Protocol & Specification

### 7.1. Message Structure
The generated WhatsApp message follows the exact format required by `PRODUCT_REQUIREMENTS.md US-08`:

```
Hello Mojo Grille! I'd like to order from your [Store Name] store:
• [Qty]× [Dish Name] ([Side 1], [Side 2]) — $[Line Total]
• [Qty]× [Dish Name] — $[Line Total]
Estimated Total: $[Grand Total]
Muchas gracias!
```

### 7.2. Empty Cart Fallback
If the user clicks the WhatsApp button before adding items:
```
Hello Mojo Grille! I'd like to place an order from your [Store Name] store.
```

### 7.3. Store Phone Routing
The URL is routed directly to the selected store:
- **Little Havana (`little-havana`):** `https://wa.me/13055550123?text=...`
- **Brickell (`brickell`):** `https://wa.me/13055550124?text=...`
- **Doral (`doral`):** `https://wa.me/13055550125?text=...`

---

## 8. Schema.org / SEO Data Architecture

For Phase 3 (`@ContentSEO`), `src/lib/seo.ts` exports structured data generators ready to be injected into `<script type="application/ld+json">`:

1. **`generateRestaurantSchema(location: Location)`**:
   - `@type: "Restaurant"`
   - `name: "Mojo Grille - [Store Name]"`
   - `servesCuisine: ["Cuban", "Caribbean", "Latin American"]`
   - `priceRange: "$$"`
   - `telephone`: Store-specific phone
   - `address`: Store-specific postal address
   - `aggregateRating`: 4.7 stars across 3,000 orders
   - `potentialAction`: OrderAction targeting `https://mojogrille.com/#menu`

2. **`generateMenuSchema(categories: Category[], menu: MenuItem[])`**:
   - `@type: "Menu"`
   - `hasMenuSection`: Array of `MenuSection` objects for each category with nested `MenuItem` and `Offer` elements.

---

## 9. Verification & Build Attestation

### 9.1. TypeScript Strict Typecheck
```bash
npx tsc --noEmit
```
- **Exit Code:** `0`
- **Output:** 0 type errors, 0 warnings.
- **Strict Flags Verified:**
  - `strict: true`
  - `noImplicitOverride: true`
  - `noImplicitReturns: true`
  - `noPropertyAccessFromIndexSignature: true`
  - `noUncheckedIndexedAccess: true`
  - `exactOptionalPropertyTypes: true`
  - `noUncheckedSideEffectImports: true`

### 9.2. Production Build Execution
```bash
npm run build
```
- **Engine:** Vite 8.1.5 + TanStack Start 1.168.32 + Nitro 3.0.260603-beta
- **Client Bundle (`.output/public/`):** 1,887 modules transformed, clean CSS & JS chunks.
- **SSR Bundle (`.output/server/`):** Nitro Cloudflare-module worker generated in 1.15s.
- **Exit Code:** `0` (Clean compilation, zero errors).

---

*Architectural specification authored and ratified by `@TechLead` for Phase 2 parallel implementation.*
