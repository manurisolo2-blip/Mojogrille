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
> **Regla de Oro de Diseño**: Todo cambio de estilo, maquetación, decoraciones o componentes DEBE cumplir estrictamente con los tokens y jerarquías definidos a continuación. Queda prohibido inventar colores o utilizar blanco clínico (`#FFFFFF`) como fondo general.

### 4.1. Paleta Cromática y Tokens Semánticos (Mojo Grille)

| Token UI | Nombre Comercial | HEX | RGB | Rol en la Interfaz |
| :--- | :--- | :--- | :--- | :--- |
| **`cream-bg`** | Criollo Cream | `#F6F1E8` | 246, 241, 232 | Fondo principal de la web. Elimina el brillo frío del `#FFFFFF` y evoca el pan tostado. |
| **`brand-fire`** | Mojo Scarlet | `#E52516` | 229, 37, 22 | Color de choque primario (análogo al `#f91814` de Crav). Se usa en CTAs, titulares hero, preloader y acentos de hover. |
| **`charcoal-ink`** | Pressed Dark | `#141210` | 20, 18, 16 | Tipografía principal, bordes finos divisorios (`border-charcoal-ink/10`) y textos legales. |
| **`surface-sand`** | Yuca Sand | `#ECE4D5` | 236, 228, 213 | Fondo de tarjetas de producto, badges nutricionales y contenedor del cart drawer. |
| **`mojo-citrus`** | Citrus Glaze | `#FFA826` | 255, 168, 38 | Tono complementario para etiquetas de picante, badges de tiempo de cocción y microindicadores. |
| **`leaf-green`** | Cilantro Fresh | `#2F6A4F` | 47, 106, 79 | Acento secundario para elementos "100% Fresco" o ítems vegetarianos. |

#### Regla de Distribución Cromática (Regla 60-30-10):
* **60%**: Criollo Cream (`#F6F1E8`) como lienzo constante en todo el scroll.
* **30%**: Pressed Dark (`#141210`) para textos, bordes de separación y estructuras de navegación.
* **10%**: Mojo Scarlet (`#E52516`) reservado con máxima saturación para llamar la atención del ojo hacia botones, marcas de agua, precios y marquesinas.

---

### 4.2. Trío Tipográfico y Escala Modular

* **A. Fuente Display (Cinética y Titulares de Choque):** `Bebas Neue` o `Syne` (`--font-display`).
  * *Tratamiento:* `font-bold uppercase tracking-tight leading-[0.85]`
* **B. Fuente Sans-Serif (UI, Lectura y Fichas Técnicas):** `Plus Jakarta Sans` o `Inter` (`--font-sans`).
  * *Tratamiento:* Geometría moderna, alto interletrado en textos pequeños (`tracking-wide text-xs uppercase font-medium`).
* **C. Fuente Editorial / Accent (Contraste Artesanal):** `Instrument Serif` o `Playfair Display Italic` (`--font-accent`).
  * *Tratamiento:* `font-serif italic font-normal lowercase tracking-normal text-brand-fire`.

#### Jerarquía y Escala de Tipografías (Type Scale)

| Nivel / Rol | Familia | Tamaño / Leading | Kerning (Tracking) | Transformación y Ejemplo |
| :--- | :--- | :--- | :--- | :--- |
| **Monumental (Hero/Ticker)** | Display | `text-[9vw]` / `leading-[0.85]` | `tracking-tight` | uppercase (`"CUBANO PRESS"`) |
| **H1 (Secciones)** | Display | `text-5xl md:text-7xl` / `leading-none` | `tracking-tight` | uppercase (`"FOUR-HOUR ROASTED"`) |
| **Accent Subtitle** | Serif Italic | `text-2xl md:text-3xl` / `leading-snug` | `tracking-normal` | lowercase (`"juicy, crispy & fully loaded"`) |
| **H2 (Nombres de Plato)** | Display | `text-2xl md:text-3xl` / `leading-tight` | `tracking-tight` | uppercase (`"MOJO PORK BOWL"`) |
| **Badges / Metadatos** | Sans-Serif | `text-[11px]` / `leading-none` | `tracking-widest` | uppercase font-bold (`"42G PROTEIN · 6-8 MIN"`) |
| **Body (Descripciones)** | Sans-Serif | `text-sm md:text-base` / `leading-relaxed` | `tracking-normal` | normal-case font-normal |
| **Precios / Acciones** | Sans-Serif | `text-base md:text-lg` / `leading-tight` | `tracking-tight` | font-bold (`"$12.95 · AÑADIR"`) |


