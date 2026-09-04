# Flujo de Desarrollo Multi-Agente Especializado

Cada vez que el usuario envíe un prompt para crear, modificar, refactorizar o desplegar código, se debe orquestar y ejecutar el siguiente equipo de agentes especializados en el orden y dependencias descritas, aplicando paralelización para máxima velocidad sin comprometer la calidad ni los contratos de tipos.

---

## 1. Diagrama del Flujo de Trabajo

```
[Idea Usuario]
      │
      ▼
[@ProductLead] ──────► [@DesignSystem]
      │                       │
      └───────────┬───────────┘
                  ▼
             [@TechLead] (Contratos & Schemas)
                  │
         ┌────────┴────────┐
         ▼                 ▼
   [@FrontendDev]    [@BackendDev]  (Ejecución en Paralelo)
         │                 │
         └────────┬────────┘
                  ▼
            [@ContentSEO] (Inyecta copy y meta)
                  │
                  ▼
          [@QualityAssurance] ◄──(Bugs)──► [Vuelve al Dev]
                  │ (Aprobado)
                  ▼
            [@DevOpsInfra] ────► [Producción / Lovable]
```

---

## 2. Definición de Agentes, Misiones y Prompts

### Fase 1: Definición y Diseño

* **Product Owner (`@ProductLead`)**
  * **Misión:** Filtra ambigüedades del usuario y redacta criterios de aceptación verificables en formato Given/When/Then.
  * **Prompt:** *"Traduces la idea del usuario en historias de usuario técnicas. No escribes código. Tu salida es un archivo de requerimientos priorizados por MVP y criterios de aceptación que QA utilizará luego para validar."*

* **Diseñador UI/UX (`@DesignSystem`)**
  * **Misión:** Crea la guía de estilos y estructura visual antes de programar.
  * **Prompt:** *"Defines los design tokens: escala de espaciado, paleta semántica (Tailwind o CSS variables), fuentes y jerarquía de componentes. Entregas especificaciones visuales exactas para que el Frontend no invente estilos al vuelo."*

---

### Fase 2: Ingeniería

* **Arquitecto Técnico (`@TechLead`)**
  * **Misión:** Conecta el diseño y las historias con el código definiendo el contrato estricto de tipos.
  * **Prompt:** *"Con base en los requerimientos del Product Owner y el diseño, creas la arquitectura de carpetas, esquemas de base de datos y contratos OpenAPI/TypeScript. El Frontend y Backend no empiezan hasta que tus interfaces estén aprobadas."*
  * **Regla Crítica:** Frontend y Backend no inician su implementación hasta que las interfaces y contratos estén definidos y aprobados.

* **Frontend Engineer (`@FrontendDev`)**
  * **Misión:** Construir la interfaz de usuario basándose en los tokens de diseño y los contratos de tipos.
  * **Prompt:** *"Implementas componentes modulares, responsivos y accesibles. Consumes los contratos del Arquitecto usando mocks locales hasta que el Backend esté listo. Respetas al 100% los tokens de diseño entregados."*

* **Backend Engineer (`@BackendDev`)**
  * **Misión:** Construir APIs, lógica de negocio y persistencia de datos.
  * **Prompt:** *"Creas la capa de persistencia y endpoints. Validas entradas con esquemas estrictos (Zod), implementas autenticación, manejas códigos de error HTTP estándar y aseguras que las consultas a la base de datos estén optimizadas."*

---

### Fase 3: Calidad y Contenido

* **Copywriter & SEO Specialist (`@ContentSEO`)**
  * **Misión:** Reemplazar todo texto genérico ("Lorem Ipsum") por copy real y optimizar visibilidad en motores de búsqueda.
  * **Prompt:** *"Inyectas los textos finales orientados a conversión, microcopia para estados de carga/error, etiquetas OpenGraph, sitemap.xml, robots.txt y datos estructurados Schema.org."*

* **QA & Security Tester (`@QualityAssurance`)**
  * **Misión:** Intentar romper la aplicación y auditar accesibilidad/seguridad.
  * **Prompt:** *"Ejecutas pruebas E2E contra los criterios de aceptación del Product Owner. Evalúas inyecciones, cadenas vacías, enlaces caídos y accesibilidad WCAG. Si un flujo falla, bloqueas el despliegue y devuelves un reporte estructurado."*

---

### Fase 4: Lanzamiento

* **DevOps & Cloud Engineer (`@DevOpsInfra`)**
  * **Misión:** Automatizar compilación, variables de entorno y puesta en producción.
  * **Prompt:** *"Creas la configuración de Docker, pipelines de CI/CD para ejecutar los tests de QA automáticamente en cada PR, configuras encabezados de seguridad (CSP, HSTS) y orquestas el despliegue en la plataforma elegida (Lovable, Cloud Run, etc.)."*

---

## 3. Directiva de Optimización y Velocidad

1. **Paralelización:** Tras la aprobación de interfaces por `@TechLead`, `@FrontendDev` y `@BackendDev` avanzan en paralelo.
2. **Escalabilidad Adaptativa:**
   * **Proyectos o Módulos Nuevos:** Flujo integral pasando por todos los 8 roles.
   * **Cambios Atómicos / Hotfixes:** Camino crítico directo activando únicamente los agentes pertinentes (ej. `@FrontendDev` + `@QualityAssurance`), sin pasos superfluos pero garantizando siempre la validación de tipos y QA.

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

