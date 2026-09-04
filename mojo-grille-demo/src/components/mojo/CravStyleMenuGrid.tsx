import { useState } from "react";
import { Plus, Check, Sparkles } from "lucide-react";
import { useCart } from "./cart";
import { type MenuItem } from "@/data/menu";

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
    imageUrl:
      "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=800&q=80",
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
    imageUrl:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
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
    imageUrl:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
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
    imageUrl:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
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
    imageUrl:
      "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80",
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
    imageUrl:
      "https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&w=800&q=80",
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
    imageUrl:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
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
    imageUrl:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
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
    // Feedback visual animado
    setClickedItemId(item.id);
    setTimeout(() => setClickedItemId(null), 1200);

    if (item.sidesAllowed && onSelect) {
      // Si tiene guarniciones personalizables, abrir modal de selección
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
      // Añadir directamente al carrito
      cart.add({
        itemId: item.id,
        name: item.name,
        price: item.price,
        sides: [],
      });
    }
  };

  const renderBadge = (type: CravMenuItem["badgeType"], text: string) => {
    switch (type) {
      case "signature":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#D95327] px-3 py-1 font-sans text-[11px] font-bold tracking-wide text-white shadow-md">
            <span>★</span> {text}
          </span>
        );
      case "fresh":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#4D7C0F] px-3 py-1 font-sans text-[11px] font-bold tracking-wide text-white shadow-md">
            <span>🌿</span> {text}
          </span>
        );
      case "top_seller":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#F59E0B] px-3 py-1 font-sans text-[11px] font-bold tracking-wide text-[#1C1917] shadow-md">
            <span>⭐</span> {text}
          </span>
        );
    }
  };

  return (
    <section className="w-full bg-[#FAF8F5] py-8 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* Encabezado de Catálogo */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#D95327]/30 bg-[#FBECE7] px-3.5 py-1 text-xs font-bold text-[#D95327] uppercase tracking-wider mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            Catálogo Criollo Artesanal
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C1917]">
            Hecho a Fuego Lento, Servido Al Momento.
          </h2>
          <p className="mt-2.5 font-sans text-sm sm:text-base text-[#78716C]">
            Preparado al instante en Little Havana, Brickell y Doral con 24 horas de maceración en naranja agria y ajo criollo.
          </p>
        </div>

        {/* 1. Pestañas de Categorías con Deslizador Dinámico estilo CRAV */}
        <div className="sticky top-[56px] sm:top-[64px] z-30 mb-10 py-2 backdrop-blur-md bg-[#FAF8F5]/85">
          <div
            role="tablist"
            aria-label="Categorías del Menú"
            className="no-scrollbar flex items-center justify-start sm:justify-center gap-2 overflow-x-auto p-1.5 rounded-full bg-white/90 border border-[#EAE5DC] shadow-xs max-w-3xl mx-auto"
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
                  className={`relative shrink-0 rounded-full px-5 py-2.5 font-sans text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 focus:outline-none select-none ${
                    isSelected
                      ? "bg-[#D95327] text-white shadow-md shadow-[#D95327]/30 scale-[1.03]"
                      : "bg-white text-[#1C1917] hover:text-[#D95327] hover:bg-[#FAF8F5] border border-[#EAE5DC]"
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Tarjetas de Producto Interactivas estilo CRAV */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => {
            const isAdded = clickedItemId === item.id;
            return (
              <article
                key={item.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#EAE5DC] bg-white p-4 sm:p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#D95327]/30"
              >
                <div>
                  {/* Imagen con Zoom Suave en Hover */}
                  <div
                    onClick={() => onSelect && onSelect({
                      id: item.id,
                      name: item.name,
                      category: item.category as any,
                      price: item.price,
                      description: item.description,
                      image: item.imageUrl,
                      badge: item.badgeText as any,
                      sidesAllowed: item.sidesAllowed,
                    })}
                    className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-[#FAF8F5] cursor-pointer"
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

                  {/* Información */}
                  <div className="mt-4">
                    <h3 className="font-serif text-xl font-bold tracking-tight text-[#1C1917] group-hover:text-[#D95327] transition-colors">
                      {item.name}
                    </h3>
                    <p className="mt-2 font-sans text-xs sm:text-sm text-[#78716C] line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Precio y Botón Táctil de Adición Rápida */}
                <div className="mt-6 flex items-center justify-between border-t border-[#EAE5DC]/80 pt-4">
                  <div>
                    <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-[#78716C] block">
                      Precio
                    </span>
                    <span className="font-sans text-xl font-black text-[#1C1917]">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Botón Circular Grande con Animación de Feedback */}
                  <button
                    type="button"
                    onClick={() => handleQuickAdd(item)}
                    aria-label={`Añadir ${item.name} al pedido`}
                    title="Añadir al pedido"
                    className={`relative flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 focus:outline-none active:scale-90 ${
                      isAdded
                        ? "bg-[#4D7C0F] text-white border-[#4D7C0F] scale-110 shadow-lg"
                        : "bg-[#FAF8F5] text-[#1C1917] border-[#EAE5DC] hover:bg-[#D95327] hover:text-white hover:border-[#D95327] hover:shadow-md"
                    }`}
                  >
                    {isAdded ? (
                      <Check className="h-5 w-5 stroke-[3] animate-bounce" />
                    ) : (
                      <Plus className="h-5 w-5 stroke-[3]" />
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="mt-12 text-center">
          <p className="font-sans text-xs sm:text-sm text-[#78716C]">
            ¿Tienes alguna consulta de ingredientes o alérgenos?{" "}
            <a
              href="https://wa.me/13055550123"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#D95327] hover:underline"
            >
              Chatea con nuestro equipo por WhatsApp.
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}

export default CravStyleMenuGrid;
