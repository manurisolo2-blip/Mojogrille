import React from "react";
import { Plus } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { MagneticButton } from "./MagneticButton";
import { TapeLabel } from "./TapeLabel";

export interface CuratedMenuItem {
  id: string;
  name: string;
  price: number;
  protein: string;
  feature: string;
  calories: string;
  cookTime: string;
  description: string;
  imageUrl: string;
}

export const CURATED_ITEMS: CuratedMenuItem[] = [
  {
    id: "mojo-pork-bowl",
    name: "Mojo Pork Bowl",
    price: 13.5,
    protein: "42g Proteína",
    feature: "4h Braised",
    calories: "560 kcal",
    cookTime: "8-10 MIN",
    description:
      "Pernil de cerdo asado lentamente por 4 horas al mojo cítrico criollo, servido sobre arroz moro y cebollas caramelizadas al calor de la plancha.",
    imageUrl: "/assets/mojo-bowl-ropa-vieja.jpg",
  },
  {
    id: "classic-cubano-press",
    name: "Classic Cubano Press",
    price: 12.95,
    protein: "38g Proteína",
    feature: "Plancha Crunch",
    calories: "610 kcal",
    cookTime: "6-8 MIN",
    description:
      "Pan cubano prensado con mantequilla tostada, lechón asado, jamón dulce, queso suizo fundido, pepinillos encurtidos y mostaza criolla.",
    imageUrl: "/assets/mojo-cubano.jpg",
  },
  {
    id: "picadillo-meltadilla",
    name: "Picadillo Meltadilla",
    price: 11.5,
    protein: "34g Proteína",
    feature: "Queso Fundido",
    calories: "520 kcal",
    cookTime: "6-8 MIN",
    description:
      "Picadillo de res sazonado al sofrito cubano con aceitunas y pimientos, prensado en plancha con queso suizo derretido y aliño de ajo.",
    imageUrl: "/assets/mojo-cubano.jpg",
  },
  {
    id: "loaded-pork-tostones",
    name: "Loaded Pork Tostones",
    price: 10.75,
    protein: "28g Proteína",
    feature: "Doble Fritura",
    calories: "480 kcal",
    cookTime: "5-7 MIN",
    description:
      "Tostones crujientes de plátano verde con doble fritura artesanal, coronados con pernil al mojo, cebolla caramelizada y cilantro fresco.",
    imageUrl: "/assets/mojo-tostones.jpg",
  },
  {
    id: "chicken-fresco-bowl",
    name: "Chicken Fresco Bowl",
    price: 13.0,
    protein: "44g Proteína",
    feature: "Pechuga Marinada",
    calories: "510 kcal",
    cookTime: "8-10 MIN",
    description:
      "Pechuga tierna a la plancha marinada 24 horas en naranja agria y ajo, con arroz blanco, frijoles negros sazonados y aguacate hass.",
    imageUrl: "/assets/mojo-pollo-bowl.jpg",
  },
  {
    id: "pepper-steak-platter",
    name: "Pepper Steak Platter",
    price: 14.5,
    protein: "40g Proteína",
    feature: "Salteado Criollo",
    calories: "580 kcal",
    cookTime: "8-10 MIN",
    description:
      "Tiras tiernas de res salteadas al fuego vivo con pimientos y cebolla en reducción de sofrito criollo, acompañadas de yuca con mojo.",
    imageUrl: "/assets/mojo-bowl-ropa-vieja.jpg",
  },
];

export function CuratedMenu() {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (item: CuratedMenuItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.imageUrl,
      imageUrl: item.imageUrl,
      quantity: 1,
    });
  };

  return (
    <section
      id="curated-menu"
      aria-label="Selección de la plancha - Platos estelares de Mojo Grille"
      className="relative bg-cream-bg py-16 sm:py-24 border-b border-charcoal-ink/20 select-none overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 text-center">
        {/* Metadato Técnico de Catálogo */}
        <div className="font-mono text-[11px] uppercase tracking-widest text-charcoal-ink/70 mb-2">
          CATALOG_REV. 2026 // BATCH NO. 14
        </div>

        {/* Badge Superior Tipo Sello Editorial */}
        <div className="inline-flex items-center gap-2 rounded-none border border-charcoal-ink/20 bg-surface-sand px-3.5 py-1 text-[11px] font-sans font-bold uppercase tracking-widest text-charcoal-ink mb-4">
          <span className="h-1.5 w-1.5 rounded-none bg-brand-fire" aria-hidden="true" />
          <span>Platos Insignia · Plancha Caliente</span>
        </div>

        {/* Título Monumental & Subtítulo Editorial */}
        <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tight text-charcoal-ink leading-none">
          SELECCIÓN DE LA PLANCHA
        </h2>
        <p className="mt-2 sm:mt-3 font-accent italic text-brand-fire text-2xl md:text-3xl lowercase tracking-normal">
          hecho al momento, sazonado al mojo
        </p>
      </div>

      {/* Retícula de Periódico Impreso (Shared 1px Grid) */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-charcoal-ink/20 bg-cream-bg">
          {CURATED_ITEMS.map((item, index) => (
            <article
              key={item.id}
              className="group relative flex flex-col justify-between rounded-none bg-surface-sand/40 hover:bg-surface-sand border-r border-b border-charcoal-ink/20 transition-colors duration-200"
            >
              {/* Etiqueta tipo cinta adhesiva de cocina en la primera tarjeta */}
              {index === 0 && (
                <div className="absolute -top-3.5 right-4 z-30 pointer-events-none">
                  <TapeLabel>CHEF'S SIGNATURE // #001</TapeLabel>
                </div>
              )}

              {/* Contenedor de Imagen con Marco de Corte */}
              <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-cream-bg/40 border-b border-charcoal-ink/20">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  loading="lazy"
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out select-none"
                />

                {/* Tag de Especialidad / Feature */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center rounded-none bg-charcoal-ink px-2.5 py-1 text-[10px] font-sans font-bold tracking-widest uppercase text-cream-bg border border-cream-bg/20">
                    {item.feature}
                  </span>
                </div>

                {/* Tag de Calorías */}
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center rounded-none bg-cream-bg px-2.5 py-1 text-[10px] font-mono font-bold tracking-wider uppercase text-charcoal-ink border border-charcoal-ink/20">
                    {item.calories}
                  </span>
                </div>
              </div>

              {/* Cuerpo de la Ficha */}
              <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                <div>
                  {/* Código de Comanda Monospace */}
                  <div className="font-mono text-[11px] uppercase tracking-widest text-charcoal-ink/70 mb-2 border-b border-charcoal-ink/10 pb-1.5">
                    ORD_ID: #{String(index + 1).padStart(3, '0')} // TEMP: 450°F // TIME: {item.cookTime}
                  </div>

                  {/* Fila de Badges Técnicos Rectangulares */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="inline-flex items-center rounded-none bg-cream-bg text-charcoal-ink text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 border border-charcoal-ink/20">
                      ⏱️ {item.cookTime}
                    </span>
                    <span className="inline-flex items-center rounded-none bg-cream-bg text-charcoal-ink text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 border border-charcoal-ink/20">
                      💪 {item.protein.toUpperCase()}
                    </span>
                  </div>

                  {/* Nombre y Precio */}
                  <div className="flex items-baseline justify-between gap-2 mb-2">
                    <h3 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-charcoal-ink leading-tight">
                      {item.name}
                    </h3>
                    <span className="font-sans text-xl font-extrabold tracking-tight text-brand-fire shrink-0">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Descripción Sensorial */}
                  <p className="font-sans text-xs sm:text-sm text-charcoal-ink/75 line-clamp-2 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Interacción de Compra: Botón estilo comanda de plancha */}
                <MagneticButton
                  as="button"
                  type="button"
                  onClick={() => handleAddToCart(item)}
                  className="w-full py-3.5 px-4 font-sans font-bold uppercase tracking-wider text-xs sm:text-sm bg-charcoal-ink text-cream-bg group-hover:bg-brand-fire transition-colors duration-200 rounded-none border border-charcoal-ink flex items-center justify-center gap-2 cursor-pointer"
                  aria-label={`Agregar ${item.name} a la orden por $${item.price.toFixed(2)}`}
                >
                  <Plus className="h-4 w-4 stroke-[2.5]" aria-hidden="true" />
                  <span>AGREGAR A LA ORDEN</span>
                </MagneticButton>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CuratedMenu;
