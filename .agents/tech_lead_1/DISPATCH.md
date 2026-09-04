## 2026-09-04T05:27:42Z
You are @TechLead (Technical Architect) for the Mojo Grille platform redesign.
Your mission per GEMINI.md:
"Con base en los requerimientos del Product Owner y el diseño, creas la arquitectura de carpetas, esquemas de base de datos y contratos OpenAPI/TypeScript. El Frontend y Backend no empiezan hasta que tus interfaces estén aprobadas."

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Read:
- c:\PaginasWeb\MojoGrille\.agents\ORIGINAL_REQUEST.md
- c:\PaginasWeb\MojoGrille\GEMINI.md
- c:\PaginasWeb\MojoGrille\.agents\PRODUCT_REQUIREMENTS.md
- c:\PaginasWeb\MojoGrille\.agents\DESIGN_SYSTEM.md
- c:\PaginasWeb\MojoGrille\.agents\codebase_survey.md

Your objectives:
1. Address the Key Architecture Gap identified by @ProductLead and Codebase Explorer:
   - Location state is currently isolated in `TopBar.tsx`.
   - Design the unified application state contract in `src/components/mojo/cart.tsx` (or a dedicated types/state module) so that `selectedLocation` ('little-havana' | 'brickell' | 'doral'), location details (name, phone, address), cart lines, and WhatsApp URL generation are fully synchronized across all components (`TopBar`, `MenuGrid`, `QuickOrderModal`, `CartSheet`, `MobileActionBar`).
2. Define strict, complete TypeScript interfaces and schemas for:
   - `Location`, `LocationId`
   - `Category`, `BadgeType`
   - `SideOption`, `MenuItem`
   - `CartLine`, `CartState`, `CartContextType`
   - `WhatsAppOrderPayload`, `whatsappHref(location: LocationId | Location, lines: CartLine[], total: number)`
3. Define the Folder Architecture & Module Boundaries:
   - Identify exact files owned by @FrontendDev (e.g. `TopBar.tsx`, `HeroSection.tsx`, `CategoryTabs.tsx`, `MenuGrid.tsx`, `QuickOrderModal.tsx`, `CartSheet.tsx`, `MobileActionBar.tsx`, styles).
   - Identify exact files owned by @BackendDev / Data Engineer (e.g. `data/menu.ts`, `data/locations.ts`, `cart.tsx`, `whatsapp.ts`, `seo.ts`).
   - Define exact import paths and interface contracts so both can execute in parallel without merge conflicts or type mismatches.
4. Implement the core type definitions and contracts in code (e.g., `src/types/mojo.ts` and updating `cart.tsx` / `whatsapp.ts` signatures).
5. Verify that `npm run build` in `c:\PaginasWeb\MojoGrille\mojo-grille-demo` succeeds with 0 errors after your contract changes.
6. Write the complete architectural specification to:
   `c:\PaginasWeb\MojoGrille\.agents\ARCHITECTURE_CONTRACTS.md`

When complete, write handoff.md in your working directory and notify the parent orchestrator via send_message.
