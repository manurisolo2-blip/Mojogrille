import { useState } from "react";
import { Plus, Check } from "lucide-react";
import { useCart } from "./cart";
import { useCartStore } from "@/store/useCartStore";
import { type MenuItem } from "@/data/menu";

import chickenImg from "@/assets/mojo-pollo-bowl.jpg";
import cubanImg from "@/assets/mojo-cubano.jpg";
import porkImg from "@/assets/mojo-bowl-ropa-vieja.jpg";
import tostonesImg from "@/assets/mojo-tostones.jpg";
import cafecitoImg from "@/assets/mojo-cafecito.jpg";

export type CategoryFilter = "favorites" | "bowls" | "sandwiches" | "sides" | "drinks";

export interface CategoryTabItem {
  id: CategoryFilter;
  label: string;
}

export interface CravMenuItem {
  id: string;
  name: string;
  category: "bowls" | "sandwiches" | "sides" | "drinks";
  isFavorite?: boolean;
  price: number;
  description: string;
  imageUrl: string;
  badgeType: "signature" | "fresh" | "top_seller";
  badgeText: string;
  sidesAllowed?: boolean;
}

const CATEGORIES: CategoryTabItem[] = [
  { id: "favorites", label: "🔥 Favoritos" },
  { id: "bowls", label: "🥗 Bowls" },
  { id: "sandwiches", label: "🥪 Sándwiches Cubanos" },
  { id: "sides", label: "🥟 Sides / Pa' Picar" },
  { id: "drinks", label: "🥤 Bebidas" },
];

const CRAV_MENU_ITEMS: CravMenuItem[] = [
  {
    id: "chicken-fresco-bowl",
    name: "Chicken Fresco Bowl",
    category: "bowls",
    isFavorite: true,
    price: 14.5,
    description:
      "Pechuga tierna marinada en mojo cítrico por 24h, arroz blanco criollo, frijoles negros sazonados, plátanos maduros dulces y mojo verde fresco.",
    imageUrl: chickenImg,
    badgeType: "fresh",
    badgeText: "Fresh / Gluten Friendly",
    sidesAllowed: true,
  },
  {
    id: "traditional-pressed-cuban",
    name: "Traditional Pressed Cuban",
    category: "sandwiches",
    isFavorite: true,
    price: 13.95,
    description:
      "Jamón curado dulce, lechón asado desmenuzado en su jugo, queso suizo fundido, pepinillos encurtidos y mostaza suave en pan cubano prensado con mantequilla dorada.",
    imageUrl: cubanImg,
    badgeType: "top_seller",
    badgeText: "Top Seller",
    sidesAllowed: true,
  },
  {
    id: "mojo-pulled-pork-bowl",
    name: "Mojo Pulled Pork (Lechón Asado)",
    category: "bowls",
    isFavorite: true,
    price: 15.95,
    description:
      "Cerdo deshebrado marinado lentamente en naranja agria y ajo asado con comino. Acompañado de arroz moro con frijoles negros y crujientes tostones.",
    imageUrl: porkImg,
    badgeType: "signature",
    badgeText: "Signature Mojo",
    sidesAllowed: true,
  },
  {
    id: "ropa-vieja-bowl",
    name: "Ropa Vieja Criolla Bowl",
    category: "bowls",
    isFavorite: false,
    price: 16.5,
    description:
      "Hebras de falda de res guisadas lentamente con sofrito de pimientos rojos, cebollas caramelizadas y aceitunas. Servido sobre arroz moro y maduros.",
    imageUrl: porkImg,
    badgeType: "top_seller",
    badgeText: "Top Seller",
    sidesAllowed: true,
  },
  {
    id: "yuca-frita-mojo",
    name: "Yuca Frita con Mojo Ajo",
    category: "sides",
    isFavorite: true,
    price: 6.5,
    description:
      "Bastones de yuca crujientes y dorados por fuera, cremosos por dentro, bañados en abundante mojo de ajo asado con cilantro y limón.",
    imageUrl: tostonesImg,
    badgeType: "fresh",
    badgeText: "Fresh / Gluten Friendly",
    sidesAllowed: false,
  },
  {
    id: "tostones-crunch",
    name: "Tostones Crujientes con Ajo Dip",
    category: "sides",
    isFavorite: false,
    price: 6.0,
    description:
      "Plátanos machos verdes fritos dos veces al estilo tradicional de Miami con sal marina y salsa tártara criolla especial de la casa.",
    imageUrl: tostonesImg,
    badgeType: "fresh",
    badgeText: "Fresh / Gluten Friendly",
    sidesAllowed: false,
  },
  {
    id: "cafecito-cubano-colada",
    name: "Cafecito Cubano Doble & Colada",
    category: "drinks",
    isFavorite: true,
    price: 3.5,
    description:
      "Espresso cubano extra oscuro con su tradicional espumita dulce de caña de azúcar recién batida. Para compartir o disfrutar al momento.",
    imageUrl: cafecitoImg,
    badgeType: "signature",
    badgeText: "Signature Mojo",
    sidesAllowed: false,
  },
  {
    id: "guayaba-lemonade",
    name: "Limonada Helada de Guayaba",
    category: "drinks",
    isFavorite: false,
    price: 4.5,
    description:
      "Néctar de guayaba rosa batido en frío con zumo de limas recién exprimidas y azúcar morena de caña. Muy refrescante.",
    imageUrl: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    badgeType: "top_seller",
    badgeText: "Top Seller",
    sidesAllowed: false,
  },
];

export function CravStyleMenuGrid({
  onSelect,
}: {
  onSelect?: (item: MenuItem) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("favorites");
  const [clickedItemId, setClickedItemId] = useState<string | null>(null);
  const cart = useCart();

  const filteredItems = CRAV_MENU_ITEMS.filter((item) => {
    if (selectedCategory === "favorites") {
      return item.isFavorite === true;
    }
    return item.category === selectedCategory;
  });

  const handleQuickAdd = (item: CravMenuItem) => {
    setClickedItemId(item.id);
    setTimeout(() => setClickedItemId(null), 1200);

    if (item.sidesAllowed && onSelect) {
      onSelect({
        id: item.id,
        name: item.name,
        category: item.category as any,
        price: item.price,
        description: item.description,
        image: item.imageUrl,
        badge: item.badgeText as any,
        sidesAllowed: true,
      });
    } else {
      cart.add({
        itemId: item.id,
        name: item.name,
        price: item.price,
        sides: [],
      });
      useCartStore.getState().addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.imageUrl,
      });
    }
  };

  const renderBadge = (type: CravMenuItem["badgeType"], text: string) => {
    switch (type) {
      case "signature":
        return (
          <span className="inline-flex items-center gap-1 rounded-none border border-charcoal-ink bg-brand-fire px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-cream-bg">
            <span>★</span> {text}
          </span>
        );
      case "fresh":
        return (
          <span className="inline-flex items-center gap-1 rounded-none border border-charcoal-ink bg-leaf-green px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-cream-bg">
            <span>🌿</span> {text}
          </span>
        );
      case "top_seller":
        return (
          <span className="inline-flex items-center gap-1 rounded-none border border-charcoal-ink bg-mojo-citrus px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-charcoal-ink">
            <span>⭐</span> {text}
          </span>
        );
    }
  };

  return (
    <section className="relative w-full bg-cream-bg py-10 sm:py-16 overflow-hidden border-b border-charcoal-ink/20">
      <div className="relative mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado con tipografía monumental y acento editorial */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="font-mono text-[11px] uppercase tracking-widest text-charcoal-ink/70 mb-2">
            CATALOG // SECTION B
          </div>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-charcoal-ink leading-none">
            Hecho a Fuego Lento, Servido <span className="text-brand-fire">Al Momento</span>.
          </h2>
          <p className="mt-2 font-accent italic text-2xl sm:text-3xl text-brand-fire lowercase tracking-normal">
            sabores criollos cocinados con paciencia y sazón de casa.
          </p>
          <p className="mt-3 font-sans text-sm sm:text-base text-charcoal-ink/80 leading-relaxed max-w-2xl mx-auto">
            Preparado al instante en Little Havana, Brickell y Doral con 24 horas de maceración en naranja agria, ajo criollo y orégano fresco.
          </p>
        </div>

        {/* 1. Pestañas de Categorías con Retícula de Ángulo Recto */}
        <div className="sticky top-[56px] sm:top-[64px] z-30 mb-10 py-2 backdrop-blur-md bg-cream-bg/90">
          <div
            role="tablist"
            aria-label="Categorías del Menú"
            className="no-scrollbar flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto p-1.5 rounded-none bg-surface-sand border border-charcoal-ink/20 max-w-4xl mx-auto"
          >
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  role="tab"
                  aria-selected={isSelected}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`relative shrink-0 rounded-none px-5 py-2.5 font-mono text-xs uppercase font-bold tracking-wider transition-colors duration-200 focus:outline-none select-none border ${
                    isSelected
                      ? "bg-charcoal-ink text-cream-bg border-charcoal-ink"
                      : "bg-transparent text-charcoal-ink hover:text-brand-fire hover:bg-cream-bg/80 border-transparent"
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Retícula Editorial Continua de 1px (Newspaper Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-charcoal-ink/20">
          {filteredItems.map((item) => {
            const isAdded = clickedItemId === item.id;
            return (
              <article
                key={item.id}
                className="group relative flex flex-col justify-between rounded-none border-r border-b border-charcoal-ink/20 bg-surface-sand p-5 sm:p-6 transition-colors duration-200 hover:bg-cream-bg"
              >
                <div>
                  {/* Contenedor de Fotografía con Marco Nítido */}
                  <div
                    onClick={() => onSelect && onSelect({
                      id: item.id,
                      name: item.name,
                      category: item.category as any,
                      price: item.price,
                      description: item.description,
                      image: item.imageUrl,
                      badge: item.badgeText as any,
                      sidesAllowed: Boolean(item.sidesAllowed),
                    })}
                    className="relative aspect-4/3 w-full overflow-hidden rounded-none border border-charcoal-ink/20 bg-cream-bg cursor-pointer"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      loading="lazy"
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Tag de color semántico */}
                    <div className="absolute top-3 left-3 z-10">
                      {renderBadge(item.badgeType, item.badgeText)}
                    </div>
                  </div>

                  {/* Información del Plato */}
                  <div className="mt-4">
                    <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-charcoal-ink group-hover:text-brand-fire transition-colors">
                      {item.name}
                    </h3>
                    <p className="mt-2 font-sans text-xs sm:text-sm text-charcoal-ink/75 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Fila Inferior de Precio y Botón Táctil */}
                <div className="mt-6 flex items-center justify-between border-t border-charcoal-ink/15 pt-4">
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-charcoal-ink/60 block">
                      PRECIO
                    </span>
                    <span className="font-display text-3xl font-black text-charcoal-ink">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Botón Ortogonal Nítido con Feedback */}
                  <button
                    type="button"
                    onClick={() => handleQuickAdd(item)}
                    aria-label={`Añadir ${item.name} al pedido`}
                    title="Añadir al pedido"
                    className={`relative inline-flex items-center gap-1.5 rounded-none px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider border transition-colors cursor-pointer select-none ${
                      isAdded
                        ? "bg-leaf-green text-cream-bg border-leaf-green"
                        : "bg-charcoal-ink text-cream-bg border-charcoal-ink hover:bg-brand-fire hover:border-brand-fire"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="h-4 w-4 stroke-[3]" />
                        <span>AÑADIDO</span>
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 stroke-[3]" />
                        <span>+ AGREGAR</span>
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bloque editorial de consulta personalizada */}
        <div className="mt-14 rounded-none bg-surface-sand p-6 sm:p-8 border-2 border-charcoal-ink text-center">
          <p className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-charcoal-ink font-bold">
            ¿CONSULTA DE INGREDIENTES O PEDIDO PERSONALIZADO?
          </p>
          <p className="mt-2 font-sans text-xs sm:text-sm text-charcoal-ink/80 max-w-xl mx-auto">
            Nuestro equipo en Little Havana y Brickell atiende tus dudas al momento a través de cocina directa.
          </p>
          <div className="mt-5">
            <a
              href="https://wa.me/13055550123"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-none bg-brand-fire px-7 py-3.5 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-cream-bg border-2 border-brand-fire hover:bg-charcoal-ink hover:border-charcoal-ink transition-colors cursor-pointer select-none"
            >
              <span>Preguntar por WhatsApp</span>
              <span>➔</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

export default CravStyleMenuGrid;
