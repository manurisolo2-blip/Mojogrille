## 2026-09-04T05:55:29Z

You are @QualityAssurance (QA & Security Tester) for the Mojo Grille platform redesign.
Your mission per GEMINI.md:
"Ejecutas pruebas E2E contra los criterios de aceptación del Product Owner. Evalúas inyecciones, cadenas vacías, enlaces caídos y accesibilidad WCAG. Si un flujo falla, bloqueas el despliegue y devuelves un reporte estructurado."

Read:
- c:\PaginasWeb\MojoGrille\.agents\ORIGINAL_REQUEST.md
- c:\PaginasWeb\MojoGrille\GEMINI.md
- c:\PaginasWeb\MojoGrille\.agents\PRODUCT_REQUIREMENTS.md
- c:\PaginasWeb\MojoGrille\.agents\DESIGN_SYSTEM.md
- c:\PaginasWeb\MojoGrille\.agents\ARCHITECTURE_CONTRACTS.md

Your Objectives:
1. Verify all 12 Acceptance Criteria from PRODUCT_REQUIREMENTS.md:
   - Primary canvas #FAF8F5 (bg-cream) vs #FFFFFF surface containers and #EAE5DC borders.
   - Dual typography: Playfair Display for H1/H2, Plus Jakarta Sans / Inter for H3/body/buttons.
   - Sticky top bar with location switcher (Little Havana, Brickell, Doral) & animated cart counter.
   - Hero banner with Miami Cuban branding, H1, and social proof badge: "⭐ 4.7 Stars across +3,000 orders in Miami (UberEats & Google)".
   - Sticky category navigation with smooth scroll (6 categories).
   - Menu catalog cards with sensory copy, price, badges (Mojo Signature, Popular/Top Seller, Fresco del día), and customization triggers.
   - Side dish customization modal (Arroz Moro, Tostones, Yuca, Maduros) updating unit price dynamically in real time.
   - Slide-out Cart Drawer with line grouping by item+sides, quantity adjustment, and empty states.
   - Direct WhatsApp checkout URL generation with encoded message containing selected location, dishes, sides, and total.
   - Mobile-optimized persistent bottom quick-action bar with cart summary and CTA.
   - SEO metadata with OpenGraph, Schema.org Restaurant/Menu JSON-LD, sitemap.xml, robots.txt.
   - Zero-error compilation verified via npm run build in mojo-grille-demo.
2. WCAG 2.1 AA Accessibility & Contrast Audit:
   - Check contrast ratios for text-charcoal (#1C1917), text-muted (#78716C), mojo-terracotta (#D95327), mojo-lime (#4D7C0F), mojo-gold (#F59E0B) against their respective backgrounds.
   - Verify keyboard navigation, ARIA roles (dialog, tablist, tab), and touch target sizes.
3. Security & Edge Case Testing:
   - Verify empty cart states, zero/negative quantity guards, special character escaping in WhatsApp messages.
4. Execute test suites and `npm run build` in `c:\PaginasWeb\MojoGrille\mojo-grille-demo` to verify 0 errors.
5. Deliverables:
   - Write comprehensive report to `c:\PaginasWeb\MojoGrille\.agents\qa_verification_report.md`.
   - Write handoff report with clear APPROVE / REQUEST_CHANGES verdict to `c:\PaginasWeb\MojoGrille\.agents\quality_assurance_1\handoff.md`.
   - Notify parent orchestrator via send_message.
