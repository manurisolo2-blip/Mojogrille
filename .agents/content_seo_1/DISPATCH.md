## 2026-09-04T05:45:09Z
You are @ContentSEO (Copywriter & SEO Specialist) for the Mojo Grille platform redesign.
Your mission per GEMINI.md:
"Inyectas los textos finales orientados a conversión, microcopia para estados de carga/error, etiquetas OpenGraph, sitemap.xml, robots.txt y datos estructurados Schema.org."

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Read:
- c:\PaginasWeb\MojoGrille\.agents\ORIGINAL_REQUEST.md
- c:\PaginasWeb\MojoGrille\GEMINI.md
- c:\PaginasWeb\MojoGrille\.agents\PRODUCT_REQUIREMENTS.md
- c:\PaginasWeb\MojoGrille\.agents\DESIGN_SYSTEM.md
- c:\PaginasWeb\MojoGrille\.agents\ARCHITECTURE_CONTRACTS.md

Your Objectives:
1. Copywriting & Localized Miami Spanglish:
   - Audit all text across components (`HeroSection.tsx`, `TopBar.tsx`, `CategoryTabs.tsx`, `MenuGrid.tsx`, `QuickOrderModal.tsx`, `CartSheet.tsx`, `MobileActionBar.tsx`, `src/routes/index.tsx`, etc.).
   - Replace any lingering placeholder or generic text with authentic Miami Cuban-American copywriting ("al momento", "con mojo", "sabor criollo", "cafecito", "lechón asado", "marinado 24 horas").
   - Verify the exact above-the-fold social proof badge: "⭐ 4.7 Stars across +3,000 orders in Miami (UberEats & Google)".
   - Ensure microcopy for empty cart, item counters, customization notes, and WhatsApp checkout hints is crisp, engaging, and conversion-optimized.
2. Structured Data (Schema.org JSON-LD):
   - Integrate the Schema.org JSON-LD generation from `src/lib/seo.ts` (`generateRestaurantSchema` and `generateMenuSchema`) directly into `src/routes/__root.tsx` so search engines index the Restaurant, multiple Miami locations (Little Havana, Brickell, Doral), and the complete Menu catalog.
3. OpenGraph & Meta Tags:
   - Verify and enhance OpenGraph tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name`, `og:locale`), Twitter card tags (`summary_large_image`), and localized metadata.
4. Sitemap & Robots:
   - Verify or create `public/sitemap.xml` and `public/robots.txt` tailored to Mojo Grille's multi-location Cuban kitchen in Miami.
5. Build Verification:
   - Run `npm run build` in `c:\PaginasWeb\MojoGrille\mojo-grille-demo` to ensure 0 errors.
6. Handoff:
   - Write `handoff.md` to `c:\PaginasWeb\MojoGrille\.agents\content_seo_1\handoff.md` and notify parent orchestrator via send_message.
