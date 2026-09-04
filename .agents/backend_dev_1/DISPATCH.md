## 2026-09-04T05:34:11Z

You are @BackendDev (Backend & Data Engineer) for the Mojo Grille platform redesign.
Your mission per GEMINI.md:
"Creas la capa de persistencia y endpoints. Validas entradas con esquemas estrictos (Zod), implementas lógica de negocio, manejas contratos estandarizados y aseguras datos y cálculos óptimos."

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Read:
- c:\PaginasWeb\MojoGrille\.agents\ORIGINAL_REQUEST.md
- c:\PaginasWeb\MojoGrille\GEMINI.md
- c:\PaginasWeb\MojoGrille\.agents\PRODUCT_REQUIREMENTS.md
- c:\PaginasWeb\MojoGrille\.agents\DESIGN_SYSTEM.md
- c:\PaginasWeb\MojoGrille\.agents\ARCHITECTURE_CONTRACTS.md

Files Owned by You:
- `src/types/mojo.ts`
- `src/data/locations.ts`
- `src/data/menu.ts`
- `src/components/mojo/cart.tsx`
- `src/components/mojo/whatsapp.ts`
- `src/lib/seo.ts`
(DO NOT touch files owned by @FrontendDev: TopBar, HeroSection, CategoryTabs, MenuGrid, QuickOrderModal, CartSheet, MobileActionBar, styles.css).

Your Objectives:
1. Ensure `src/types/mojo.ts` contains complete TypeScript types and Zod schemas as specified in `ARCHITECTURE_CONTRACTS.md`.
2. Implement `src/data/locations.ts` with complete data for Little Havana, Brickell, and Doral (addresses, phones, clean phoneRaw digits for WhatsApp, opening hours, `DEFAULT_LOCATION`, `locationsList`, `resolveLocation`).
3. Enrich `src/data/menu.ts` with a rich, authentic culinary catalog of Miami Cuban-American food across all 6 categories (favoritos, bowls, sandwiches, sides, bebidas, catering). Include signature dishes (Lechón Asado al Mojo Criollo, Mojo Chicken Bowl, Cuban Sandwich Tradicional, Media Noche, Vaca Frita, Ropa Vieja, Yuca con Mojo de la Casa, Tostones, Maduros, Arroz Moro, Flan Tradicional, Cafecito Cubano, etc.), accurate prices, sensory descriptions, badges (Mojo Signature, Popular, Top Seller, Fresco del día), and sideOptions.
4. Ensure `src/components/mojo/cart.tsx` has complete state management:
   - Stores and synchronizes `selectedLocation` (defaulting to 'little-havana') and exposes `location`, `setLocation`, `availableLocations`.
   - Manages cart lines with deterministic key `${itemId}::${[...sides].sort().join('|')}`.
   - Calculates `count` and `total` dynamically.
   - Provides `add`, `remove`, `clear`, `updateQty`.
5. Ensure `src/components/mojo/whatsapp.ts` generates clean WhatsApp URLs routing to the selected location's phone number with itemized dishes, sides, and totals:
   `https://wa.me/{phoneRaw}?text={encodedMessage}`.
6. Implement `src/lib/seo.ts` generating Schema.org Restaurant and Menu JSON-LD structured data.
7. Run `npm run build` in `c:\PaginasWeb\MojoGrille\mojo-grille-demo` to verify 0 errors.
8. Write `handoff.md` in `c:\PaginasWeb\MojoGrille\.agents\backend_dev_1\handoff.md` and notify the parent orchestrator via send_message.
