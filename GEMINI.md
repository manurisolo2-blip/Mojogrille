# Flujo de Desarrollo Multi-Agente Ágil (Cuarteto Ágil)

Cada vez que el usuario envíe un prompt para crear, modificar, refactorizar o desplegar código, se ejecuta de forma estrictamente secuencial el Cuarteto Ágil de 4 roles especializados. Cada cambio debe pasar por el equipo completo para garantizar agilidad, economía de contexto y máxima calidad técnica y visual.

---

## 1. Diagrama del Flujo de Trabajo

```
[Idea Usuario]
      │
      ▼
[@ProductDesign] ──► [@FullstackDev] ──► [@ContentSEO] ──► [@QualityDevOps] ──► [Producción]
```

---

## 2. Definición de Roles del Cuarteto Ágil

* **`@ProductDesign` (Producto & Diseño UI/UX)**
  * **Misión:** Define criterios de aceptación breves (Given/When/Then) y asegura el cumplimiento de los design tokens visuales (colores, espaciados, tipografías).
  * **Prompt:** *"Traduces la idea del usuario en criterios de aceptación Given/When/Then concisos y verificables. Aseguras el cumplimiento estricto de los design tokens visuales oficiales (colores, tipografías, espaciados) de Mojo Grille sin inventar estilos."*

* **`@FullstackDev` (Ingeniería Frontend & Backend)**
  * **Misión:** Diseña interfaces TypeScript, implementa componentes frontend y lógica backend de forma unificada.
  * **Prompt:** *"Diseñas interfaces y contratos TypeScript estrictos. Implementas componentes frontend modulares y lógica backend/persistencia de forma unificada, respetando al 100% la arquitectura y los design tokens."*

* **`@ContentSEO` (Copywriting & SEO)**
  * **Misión:** Inyecta copy real (inglés con identidad Spanglish de Miami), microcopia de estados y metadatos estructurados (Schema.org, OpenGraph).
  * **Prompt:** *"Reemplazas textos genéricos por copy final en inglés con identidad Spanglish de Miami, defines microcopia para estados (carga/error/éxito) y configuras metadatos estructurados Schema.org y etiquetas OpenGraph."*

* **`@QualityDevOps` (Calidad, Tipos & Despliegue)**
  * **Misión:** Ejecuta compilación limpia, chequeo de tipos (`tsc`), pruebas funcionales y validación de seguridad/despliegue.
  * **Prompt:** *"Ejecutas verificación estricta de compilación y tipos (`tsc --noEmit` / `npm run build`), pruebas funcionales y auditoría de accesibilidad/seguridad antes de validar y autorizar el despliegue a producción."*

---

## 3. Directiva de Ejecución Secuencial y Calidad

1. **Flujo Secuencial Obligatorio:** Todo requerimiento, ajuste o implementación pasa obligatoriamente y en orden por los 4 roles: `[@ProductDesign] ──► [@FullstackDev] ──► [@ContentSEO] ──► [@QualityDevOps]`. Queda estrictamente prohibido omitir o saltar roles en cualquier respuesta.
2. **Optimización de Contexto:** Traspaso directo, conciso y sin ceremonias entre roles, reduciendo drásticamente la sobrecarga de tokens por turno (~50% de reducción).
3. **Verificación Estricta:** `@QualityDevOps` bloquea cualquier despliegue si falla el chequeo de tipos (`tsc --noEmit`) o la compilación limpia (`npm run build`).
4. **Sincronización Automática con GitHub (Post-Verificación):** Al completar y validar cualquier tarea con éxito, `@QualityDevOps` ejecuta automáticamente la sincronización con el repositorio remoto (`git add -A`, `git commit -m "..."` y `git push origin <rama>`), manteniendo el repositorio siempre respaldado y actualizado en GitHub.

---

## 4. Guía Oficial de Estilos e Identidad Visual (Miami-Latin Modernism)

> [!IMPORTANT]
> **Regla de Oro de Diseño**: Todo cambio de estilo, maquetación, decoraciones o componentes DEBE cumplir estrictamente con los tokens y directivas definidos a continuación. Queda estrictamente prohibido inventar colores, usar blanco clínico o violar las directivas de marca.

### 4.0. Directivas Estrictas y Prohibiciones (Strictly Forbidden Defaults)
1. **Prohibido Blanco Clínico y Grises Fríos**: Queda estrictamente prohibido usar fondos blancos puros (`bg-white`), grises fríos (`bg-gray-50`, `bg-slate-100`, `text-gray-400`) y bordes genéricos de utilidad (`border-gray-200`).
2. **Prohibidas Sombras Suaves Genéricas**: Queda prohibido usar sombras difuminadas genéricas (`shadow-md`, `shadow-lg`). Usar exclusivamente bordes finos sólidos (`border border-[#1C1917]/15` o `border-charcoal-ink/15`).
3. **Prohibidas Retículas Simétricas de 3 Columnas**: Queda prohibido usar retículas tradicionales simétricas de 3 columnas para productos o menús; los layouts deben ser asimétricos, táctiles y editoriales estilo CRAV Burgers.
4. **Prohibido Copy Corporativo Genérico**: Evitar clichés corporativos ("fresh ingredients", "fuel your day"). Usar exclusivamente microcopia directa, auténtica y con identidad Spanglish de Miami.
5. **Cero Puntos y Guiones Decorativos**: No usar puntos medios (`·`), viñetas (`•`) ni guiones (`—`, `–`) en encabezados, tickers, badges ni enlaces de navegación.

---

### 4.1. Sistema Cromático Oficial (Tokens Semánticos)

| Token UI | Nombre Comercial | HEX | RGB | Rol en la Interfaz |
| :--- | :--- | :--- | :--- | :--- |
| **`cream-bg`** | Toasted Cream | `#F7EFE2` | 247, 239, 226 | Canvas principal de toda la web. Elimina el blanco frío y evoca pan tostado. |
| **`charcoal-ink`** | Charred Cast Iron | `#1C1917` | 28, 25, 23 | Tipografía principal, bordes finos divisorios (`border-[#1C1917]/15`) y textos legales. |
| **`brand-fire`** | Mojo Seville Orange | `#EA580C` | 234, 88, 12 | Color de choque primario (CTAs, titulares hero, preloader y acentos de hover). |
| **`surface-sand`** | Yuca Sand | `#ECE4D5` | 236, 228, 213 | Fondo de tarjetas de producto, módulos y contenedor del cart drawer. |
| **`mojo-citrus`** | Crispy Plantain | `#EAB308` | 234, 179, 8 | Tono complementario para etiquetas de tostado, badges y microindicadores. |
| **`leaf-green`** | Cilantro Green | `#15803D` | 21, 128, 61 | Acento secundario para elementos frescos, hierbas y opciones vegetarianas. |

#### Regla de Distribución Cromática (Regla 60-30-10):
* **60%**: Toasted Cream (`#F7EFE2`) como lienzo constante en todo el scroll.
* **30%**: Charred Cast Iron (`#1C1917`) para textos, bordes de separación y estructuras de navegación.
* **10%**: Mojo Seville Orange (`#EA580C`) reservado para captar atención en botones, precios, badges y marquesinas.

---

### 4.2. Trío Tipográfico y Escala Modular

* **A. Fuente Display (Cinética y Titulares de Choque):** Clash Display, Syne, Bebas Neue o Druk style (`--font-display`).
  * *Tratamiento:* `font-bold uppercase tracking-tight leading-[0.85]`
* **B. Fuente Sans-Serif (UI, Lectura y Fichas Técnicas):** General Sans, Satoshi, Plus Jakarta Sans o Inter (`--font-sans`).
  * *Tratamiento:* Geometría moderna, alto interletrado en textos pequeños (`tracking-wide text-xs uppercase font-medium`).
* **C. Fuente Editorial / Accent (Contraste Artesanal):** Fraunces, Instrument Serif o Playfair Display Italic (`--font-accent`).
  * *Tratamiento:* `font-serif italic font-normal lowercase tracking-normal text-brand-fire`.

#### Jerarquía y Escala de Tipografías (Type Scale)

| Nivel / Rol | Familia | Tamaño / Leading | Kerning (Tracking) | Transformación y Ejemplo |
| :--- | :--- | :--- | :--- | :--- |
| **Monumental (Hero/Ticker)** | Display | `text-[9vw]` / `leading-[0.85]` | `tracking-tight` | uppercase (`"CUBANO PRESS"`) |
| **H1 (Secciones)** | Display | `text-5xl md:text-7xl` / `leading-none` | `tracking-tight` | uppercase (`"FOUR-HOUR ROASTED"`) |
| **Accent Subtitle** | Serif Italic | `text-2xl md:text-3xl` / `leading-snug` | `tracking-normal` | lowercase (`"juicy, crispy and fully loaded"`) |
| **H2 (Nombres de Plato)** | Display | `text-2xl md:text-3xl` / `leading-tight` | `tracking-tight` | uppercase (`"MOJO PORK BOWL"`) |
| **Badges / Metadatos** | Sans-Serif | `text-[11px]` / `leading-none` | `tracking-widest` | uppercase font-bold (`"42G PROTEIN 6-8 MIN"`) |
| **Body (Descripciones)** | Sans-Serif | `text-sm md:text-base` / `leading-relaxed` | `tracking-normal` | normal-case font-normal |
| **Precios / Acciones** | Sans-Serif | `text-base md:text-lg` / `leading-tight` | `tracking-tight` | font-bold (`"$12.95 AÑADIR"`) |

---

### 4.3. Estructura UI, Tono y Animación Cinética
* **Maquetación Asimétrica & Editorial**: Evitar retículas simétricas de tarjeta estándar. Componer layouts asimétricos, de estética editorial y textura táctil con referencias a benchmarks como CRAV Burgers.
* **Animaciones Cinéticas**: Implementar Framer Motion o GSAP para transiciones de scroll suaves (scrub con desaceleración gradual, sin saltos abruptos), hover previews interactivos y deconstrucción de capas.


