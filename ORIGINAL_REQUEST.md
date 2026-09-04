# Original User Request

## 2026-09-04T05:20:04Z

Rediseño integral y modernización de la plataforma web de Mojo Grille (mejora superior a https://mojogrille.com/), implementando la Guía Oficial de Estilos e Identidad Visual (lienzo crema cálido, acentos terracota, lima y oro), jerarquía tipográfica dual (Playfair Display + Plus Jakarta Sans/Inter), catálogo interactivo con modal de personalización de guarniciones y flujo de pedidos hacia WhatsApp.

Working directory: c:/PaginasWeb/MojoGrille/mojo-grille-demo
Integrity mode: development

El usuario ha solicitado explícitamente orquestar el equipo multi-agente especializado definido en GEMINI.md:
- `@ProductLead`: Criterios de aceptación Given/When/Then.
- `@DesignSystem`: Design tokens, escala modular tipográfica y paleta cromática gastronómica.
- `@TechLead`: Contratos estrictos TypeScript y arquitectura.
- `@FrontendDev` & `@BackendDev`: Implementación de interfaz, componentes modulares y estado del carrito en paralelo.
- `@ContentSEO`: Copywriting en inglés con toques auténticos de Miami Spanglish y metadatos estructurados.
- `@QualityAssurance`: Verificación E2E y auditoría de accesibilidad/contraste.
- `@DevOpsInfra`: Compilación limpia, configuración Vercel/Nitro y sincronización Git.

---

## Requirements

### R1. Sistema de Diseño e Identidad Visual Gastronómica
La interfaz debe implementar de forma estricta los tokens semánticos oficiales:
- Lienzo Primario global: `bg-cream` (`#FAF8F5`). Queda prohibido el blanco clínico `#FFFFFF` en fondos generales.
- Superficie de Tarjetas y Modales: `surface-white` (`#FFFFFF`).
- Acción Principal / CTA: `mojo-terracotta` (`#D95327`, hover `#B83E16`, texto `#FFFFFF`).
- Texto Maestro: `text-charcoal` (`#1C1917`).
- Texto Descriptivo / Metadata: `text-muted` (`#78716C`).
- Acento Orgánico: `mojo-lime` (`#4D7C0F`) para badges de frescura e ingredientes del día.
- Acento Social Proof: `mojo-gold` (`#F59E0B`) para ratings y sellos de popularidad.
- Bordes y Separadores: `border-subtle` (`#EAE5DC`).

### R2. Jerarquía Tipográfica Dual y Escala Modular
- **Editorial / Display:** `Playfair Display` para H1 Hero Title (36px–48px Bold 700) y H2 Títulos de Secciones (24px–30px SemiBold 600).
- **Sans-serif Funcional:** `Plus Jakarta Sans` / `Inter` para H3 Nombres de Platos (18px–20px Bold 700), Descripciones sensoriales (14px–15px Regular 400), Precios y Botones (16px–18px SemiBold 600) y Microcopy/Badges (11px–12px Medium 500).

### R3. Copywriting & Localización Miami Spanglish
- Todo el contenido redactado en inglés con toques auténticos de la cultura cubano-americana de Miami (ej. "al momento", "con mojo", "sabor criollo", "cafecito", "lechón asado").
- Badge above-the-fold con prueba social: "⭐ 4.7 Stars across +3,000 orders in Miami (UberEats & Google)".
- Metadatos OpenGraph y Schema.org configurados para SEO gastronómico.

### R4. Experiencia Interactiva de Menú, Carrito y Checkout WhatsApp
- Barra superior sticky con selector de sede (Little Havana, Brickell, Doral) y contador de carrito animado.
- Pestañas de categorías fijas (sticky) con scroll suave y estado activo contrastado.
- Modal de personalización rápida para platos con selección interactiva de guarniciones (Arroz Moro, Tostones, Yuca, Maduros).
- Drawer lateral de carrito de compras con desglose de ítems, cálculo en tiempo real y botón de pedido hacia WhatsApp con mensaje codificado.
- Barra inferior persistente de acción rápida optimizada para dispositivos móviles.

---

## Acceptance Criteria

### Compilación y Calidad Técnica
- [ ] `npm run build` en `mojo-grille-demo` compila con 0 errores de TypeScript, Vite y Nitro.
- [ ] No existen enlaces rotos, imports faltantes ni dependencias desalineadas.

### Fidelidad Visual y Accesibilidad
- [ ] El fondo global de la página (`body`) es `#FAF8F5` (`bg-cream`) y los contenedores son `#FFFFFF` con borde `#EAE5DC`.
- [ ] Las fuentes cargadas en `<head>` incluyen `Playfair Display`, `Plus Jakarta Sans` e `Inter`.
- [ ] H1 y H2 aplican `font-display` (`Playfair Display`).
- [ ] H3, descripciones, precios y badges aplican `font-sans` (`Plus Jakarta Sans` / `Inter`).
- [ ] Los badges del menú diferencian con precisión: "Mojo Signature" en terracota (`#D95327`), "Popular"/"Top Seller" en oro (`#F59E0B`/`#FEF3C7`), y "Fresco del día" en lima (`#4D7C0F`).

### Flujo Funcional de Usuario
- [ ] Hacer clic en "See Menu & Order Now" realiza scroll suave hasta `#menu`.
- [ ] El modal de pedido permite añadir/quitar guarniciones actualizando el precio total de forma instantánea.
- [ ] El carrito permite sumar platos, ver el total estimado y abrir WhatsApp con el pedido desglosado.
- [ ] La barra móvil inferior sincroniza en tiempo real la cantidad de productos y el total.
