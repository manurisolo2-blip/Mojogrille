import React from "react";
import { Plus } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

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
      className="relative bg-cream-bg py-16 sm:py-24 border-b border-charcoal-ink/10 select-none overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 text-center">
        {/* Badge Superior */}
        <div className="inline-flex items-center gap-2 rounded-full border border-charcoal-ink/15 bg-surface-sand px-3.5 py-1 text-[11px] font-sans font-bold uppercase tracking-widest text-charcoal-ink mb-4 shadow-xs">
          <span className="h-2 w-2 rounded-full bg-brand-fire animate-pulse" aria-hidden="true" />
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

      {/* Grid de las 6 Tarjetas Estelares */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {CURATED_ITEMS.map((item) => (
            <article
              key={item.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-surface-sand border border-charcoal-ink/10 shadow-xs hover:shadow-xl transition-all duration-300"
            >
              {/* Contenedor de Imagen con Efecto Hover de Escala Suave */}
              <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-cream-bg/40 border-b border-charcoal-ink/5">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  loading="lazy"
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out select-none"
                />

                {/* Tag de Especialidad / Feature */}
                <div className="absolute top-3.5 left-3.5">
                  <span className="inline-flex items-center rounded-md bg-charcoal-ink/90 backdrop-blur-xs px-2.5 py-1 text-[10px] font-sans font-bold tracking-widest uppercase text-cream-bg shadow-sm">
                    {item.feature}
                  </span>
                </div>

                {/* Tag de Calorías */}
                <div className="absolute top-3.5 right-3.5">
                  <span className="inline-flex items-center rounded-md bg-cream-bg/90 backdrop-blur-xs px-2.5 py-1 text-[10px] font-mono font-bold tracking-wider uppercase text-charcoal-ink shadow-sm">
                    {item.calories}
                  </span>
                </div>
              </div>

              {/* Cuerpo de la Tarjeta */}
              <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                <div>
                  {/* Fila de Badges Técnicos */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="inline-flex items-center rounded-full bg-cream-bg text-charcoal-ink text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 border border-charcoal-ink/5">
                      ⏱️ {item.cookTime}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-cream-bg text-charcoal-ink text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 border border-charcoal-ink/5">
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

                {/* Interacción de Compra: Botón Inferior Ancho */}
                <button
                  type="button"
                  onClick={() => handleAddToCart(item)}
                  className="w-full py-3.5 px-4 font-sans font-bold uppercase tracking-wider text-xs sm:text-sm bg-charcoal-ink text-cream-bg group-hover:bg-brand-fire transition-colors duration-300 rounded-xl flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] cursor-pointer"
                  aria-label={`Agregar ${item.name} a la orden por $${item.price.toFixed(2)}`}
                >
                  <Plus className="h-4 w-4 stroke-[2.5]" aria-hidden="true" />
                  <span>AGREGAR A LA ORDEN</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CuratedMenu;
