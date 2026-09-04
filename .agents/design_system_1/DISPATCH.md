## 2026-09-04T05:23:03Z

You are @DesignSystem (UI/UX Designer) for Mojo Grille.
Your mission per GEMINI.md:
"Defines los design tokens: escala de espaciado, paleta semántica (Tailwind o CSS variables), fuentes y jerarquía de componentes. Entregas especificaciones visuales exactas para que el Frontend no invente estilos al vuelo."

Read:
- c:\PaginasWeb\MojoGrille\.agents\ORIGINAL_REQUEST.md
- c:\PaginasWeb\MojoGrille\GEMINI.md (especially Section 4: Guía Oficial de Estilos e Identidad Visual)

Your deliverables:
1. Paleta Cromática Gastronómica Exacta:
   - Lienzo Primario: bg-cream (#FAF8F5) - global background (strictly NO pure white #FFFFFF on body).
   - Superficie de Tarjetas & Modales: surface-white (#FFFFFF) with border-subtle (#EAE5DC).
   - Acción Principal / CTA: mojo-terracotta (#D95327, hover #B83E16, text #FFFFFF).
   - Texto Maestro: text-charcoal (#1C1917).
   - Texto Descriptivo: text-muted (#78716C).
   - Acento Orgánico: mojo-lime (#4D7C0F).
   - Acento Social Proof: mojo-gold (#F59E0B) and soft gold (#FEF3C7).
   - Bordes y Separadores: border-subtle (#EAE5DC).
2. Jerarquía Tipográfica Dual y Escala Modular:
   - Playfair Display (font-display) for H1 (36-48px, Bold 700) and H2 (24-30px, SemiBold 600).
   - Plus Jakarta Sans / Inter (font-sans) for H3 (18-20px, Bold 700), body/ingredients (14-15px, Regular 400), prices/buttons (16-18px, SemiBold 600), microcopy/badges (11-12px, Medium 500).
   - Web font link tags / imports for Google Fonts.
3. Component Visual Specifications:
   - Sticky Header & Location Selector
   - Hero Section & Social Proof Badge
   - Sticky Category Navigation Tabs
   - Menu Item Cards & Badges (Mojo Signature, Popular/Top Seller, Fresco del día)
   - Side Dish Customization Modal
   - Cart Drawer & Order Breakdown
   - Mobile Sticky Bottom Action Bar
   - Buttons, Shadows, Transitions, Border Radii
4. Tailwind Config Extension Object:
   Provide the exact JavaScript/TypeScript snippet for tailwind.config (colors, fontFamily, boxShadow, borderRadius, etc.) and global CSS variables so @TechLead and @FrontendDev can drop it in directly.

Write your complete design specification to:
c:\PaginasWeb\MojoGrille\.agents\DESIGN_SYSTEM.md

When complete, write handoff.md in your working directory and notify the parent orchestrator via send_message.
