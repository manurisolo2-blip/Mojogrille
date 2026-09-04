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

## 4. Guía Oficial de Estilos e Identidad Visual (Mojo Grille)

> [!IMPORTANT]
> **Regla de Oro de Diseño**: Todo cambio de estilo, maquetación, decoraciones o componentes DEBE cumplir estrictamente con los tokens y jerarquías definidos a continuación. Queda prohibido inventar colores o utilizar blanco clínico (`#FFFFFF`) como fondo general.

### 4.1. Paleta Cromática Gastronómica y Tokens Semánticos

| Rol del Color | Token Tailwind / CSS | Valor HEX | Uso Específico |
| :--- | :--- | :--- | :--- |
| **Lienzo Primario** | `bg-cream` | `#FAF8F5` | Fondo global de la aplicación. Reduce cansancio visual y aporta tono editorial cálido. |
| **Superficie de Tarjetas** | `surface-white` | `#FFFFFF` | Contenedores de ítems, modales y drawer. Da realce limpio a fotos de producto. |
| **Acción Principal / CTA** | `mojo-terracotta` | `#D95327` | Botones maestros ("Pedir en Línea", "Añadir"), botones de acción rápida y enlaces destacados. |
| **CTA Hover / Active** | `mojo-terracotta-dark`| `#B83E16` | Estado interactivo al pasar el cursor o presionar botones principales. |
| **Texto Maestro** | `text-charcoal` | `#1C1917` | Títulos, subtítulos, nombres de platos y precios. Máximo contraste sin ser negro puro. |
| **Texto Descriptivo** | `text-muted` | `#78716C` | Ingredientes, metadata de horarios, notas al pie y descripciones secundarias. |
| **Acento Orgánico** | `mojo-lime` | `#4D7C0F` | Badges de frescura ("Ingrediente del día", "Receta Casera", "Veggie"). |
| **Acento Social Proof** | `mojo-gold` | `#F59E0B` | Iconografía de estrellas de calificación y sellos de popularidad. |
| **Bordes y Separadores** | `border-subtle` | `#EAE5DC` | Contornos de tarjetas, divisiones de listas y líneas de navegación secundaria. |

### 4.2. Sistema Tipográfico Dual y Escala Modular

* **Display / Editorial:** `Playfair Display` o `Fraunces` (voz artesanal, caribeña y cálida).
* **Sans-serif Funcional:** `Inter` o `Plus Jakarta Sans` (lectura ergonómica en móviles).

| Nivel Tipográfico | Familia Sugerida | Peso & Tamaño | Aplicación en Interfaz |
| :--- | :--- | :--- | :--- |
| **Heading 1 (Hero Title)** | Playfair Display / Fraunces | Bold (700) \| 36px – 48px | Encabezado principal del banner de inicio. Comunica tradición caribeña y calidez. |
| **Heading 2 (Secciones)** | Playfair Display / Serif | SemiBold (600) \| 24px – 30px | Títulos de categorías ("Nuestros Bowls", "Sándwiches Prensados"). |
| **Heading 3 (Platos)** | Inter / Plus Jakarta Sans | Bold (700) \| 18px – 20px | Nombres de platos en tarjetas de catálogo y modales. |
| **Body Text (Ingredientes)** | Inter / Plus Jakarta Sans | Regular (400) \| 14px – 15px | Descripciones sensoriales de guisados e ingredientes. |
| **Precios & Acciones** | Inter / Plus Jakarta Sans | SemiBold (600) \| 16px – 18px | Etiquetas de precios y botones ("Añadir", "Pedir"). |
| **Microcopy & Badges** | Inter / Plus Jakarta Sans | Medium (500) \| 11px – 12px | Badges de categorías, avisos de horarios y etiquetas especiales. |

