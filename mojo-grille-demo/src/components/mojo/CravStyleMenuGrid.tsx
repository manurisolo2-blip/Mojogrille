import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
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
  { id: "favorites", label: "Favorites" },
  { id: "bowls", label: "Criollo Bowls" },
  { id: "sandwiches", label: "Pressed Cubanos" },
  { id: "sides", label: "Sides / Pa' Picar" },
  { id: "drinks", label: "Cafecito & Drinks" },
];

const CRAV_MENU_ITEMS: CravMenuItem[] = [
  {
    id: "chicken-fresco-bowl",
    name: "Chicken Fresco Bowl",
    category: "bowls",
    isFavorite: true,
    price: 14.5,
    description:
      "Tender chicken breast marinated in citrus mojo for 24h, white rice, seasoned black beans, sweet ripe maduros and fresh green mojo",
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
      "Sweet cured ham, shredded slow roasted lechón in its juices, melted Swiss cheese, crisp pickles and yellow mustard on butter crusted pressed Cuban bread",
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
      "Shredded pork shoulder slow braised in Seville sour orange and roasted garlic with cumin, served with moro rice and crispy tostones",
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
      "Tender shredded flank steak slow braised in red pepper, sweet onion and olive sofrito, served over moro rice and sweet maduros",
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
      "Crispy fried cassava batons served with house made warm crushed garlic, lime and cilantro mojo dipping sauce",
    imageUrl: tostonesImg,
    badgeType: "signature",
    badgeText: "Criollo Side",
    sidesAllowed: false,
  },
  {
    id: "tostones-crunch",
    name: "Tostones Crujientes",
    category: "sides",
    isFavorite: false,
    price: 5.95,
    description:
      "Double fried green plantain rounds, smashed flat and salted to order with homemade mojo alioli",
    imageUrl: tostonesImg,
    badgeType: "fresh",
    badgeText: "Freshly Fried",
    sidesAllowed: false,
  },
  {
    id: "maduros-caramelized",
    name: "Maduros Glaseados",
    category: "sides",
    isFavorite: false,
    price: 5.5,
    description:
      "Naturally sweet ripe black plantains, slow caramelized on the flat top with golden crisp edges",
    imageUrl: tostonesImg,
    badgeType: "top_seller",
    badgeText: "Sweet & Savory",
    sidesAllowed: false,
  },
  {
    id: "cafecito-cubano",
    name: "Cafecito Cubano (Espuma Dorada)",
    category: "drinks",
    isFavorite: true,
    price: 2.75,
    description:
      "Dark espresso brewed fresh with whipped cane sugar espumita, served hot in traditional tacita",
    imageUrl: cafecitoImg,
    badgeType: "signature",
    badgeText: "3PM Energy",
    sidesAllowed: false,
  },
  {
    id: "colada-miami",
    name: "Colada Para Compartir",
    category: "drinks",
    isFavorite: false,
    price: 3.5,
    description:
      "Four shots of dark Cuban espresso with rich brown sugar froth, accompanied by demitasse cups to share",
    imageUrl: cafecitoImg,
    badgeType: "top_seller",
    badgeText: "Miami Classic",
    sidesAllowed: false,
  },
  {
    id: "materva-soda",
    name: "Materva Yerba Mate Soda",
    category: "drinks",
    isFavorite: false,
    price: 3.25,
    description:
      "Authentic sparkling herbal yerba mate Cuban soda served chilled with fresh lime wedge",
    imageUrl: cafecitoImg,
    badgeType: "fresh",
    badgeText: "Chilled Soda",
    sidesAllowed: false,
  },
  {
    id: "ironbeer-soda",
    name: "Ironbeer Classic",
    category: "drinks",
    isFavorite: false,
    price: 3.25,
    description:
      "Heritage Cuban carbonated soft drink with notes of fruit and caramel, served ice cold",
    imageUrl: cafecitoImg,
    badgeType: "fresh",
    badgeText: "Chilled Soda",
    sidesAllowed: false,
  },
  {
    id: "croquetas-artesanales",
    name: "Croquetas de Jamón y Lechón",
    category: "sides",
    isFavorite: true,
    price: 7.5,
    description:
      "Hand rolled béchamel croquettes stuffed with cured ham and mojo pork, golden fried to crunchy perfection",
    imageUrl: tostonesImg,
    badgeType: "signature",
    badgeText: "Warm & Creamy",
    sidesAllowed: false,
  },
  {
    id: "pan-con-lechon",
    name: "Pan con Lechón Criollo",
    category: "sandwiches",
    isFavorite: false,
    price: 13.5,
    description:
      "Mojo roasted shredded pork shoulder piled high on warm pressed Cuban bread with plancha sweet onions and garlic glaze",
    imageUrl: cubanImg,
    badgeType: "signature",
    badgeText: "House Specialty",
    sidesAllowed: true,
  },
  {
    id: "media-noche-sandwich",
    name: "Medianoche Sandwich",
    category: "sandwiches",
    isFavorite: false,
    price: 13.75,
    description:
      "Slow roasted pork, sweet ham, melted Swiss cheese, dill pickles and mustard on sweet egg brioche loaf",
    imageUrl: cubanImg,
    badgeType: "top_seller",
    badgeText: "Late Night Classic",
    sidesAllowed: true,
  },
  {
    id: "mojo-shrimp-bowl",
    name: "Garlic Lime Shrimp Bowl",
    category: "bowls",
    isFavorite: false,
    price: 17.5,
    description:
      "Jumbo Atlantic shrimp wok tossed with fresh garlic, Seville lime and sweet bell peppers, served over moro rice",
    imageUrl: chickenImg,
    badgeType: "fresh",
    badgeText: "Wild Caught",
    sidesAllowed: true,
  },
];

export function CravStyleMenuGrid({
  onSelect,
}: {
  onSelect?: (item: MenuItem) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("favorites");
  const [clickedItemId, setClickedItemId] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<CravMenuItem | null>(null);
  const [mounted, setMounted] = useState(false);
  const [offsetX, setOffsetX] = useState(24);

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const smoothX = useSpring(mouseX, { damping: 28, stiffness: 220, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 28, stiffness: 220, mass: 0.5 });

  const cart = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredItems = CRAV_MENU_ITEMS.filter((item) => {
    if (selectedCategory === "favorites") {
      return item.isFavorite === true;
    }
    return item.category === selectedCategory;
  });

  const handleRowMouseEnter = (item: CravMenuItem, e: React.MouseEvent) => {
    setHoveredItem(item);
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
    if (typeof window !== "undefined") {
      if (e.clientX > window.innerWidth - 380) {
        setOffsetX(-350);
      } else {
        setOffsetX(28);
      }
    }
  };

  const handleRowMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
    if (typeof window !== "undefined") {
      if (e.clientX > window.innerWidth - 380) {
        setOffsetX(-350);
      } else {
        setOffsetX(28);
      }
    }
  };

  const handleRowMouseLeave = () => {
    setHoveredItem(null);
  };

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

  return (
    <section className="relative w-full bg-transparent py-10 sm:py-16 overflow-hidden border-b border-[#1C1917]/15">
      {/* Portal con la fotografía recortada del plato siguiendo al cursor */}
      {mounted && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {hoveredItem && (
            <motion.div
              key={hoveredItem.id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                x: smoothX,
                y: smoothY,
                translateX: offsetX,
                translateY: "-50%",
                pointerEvents: "none",
                zIndex: 9999,
              }}
              className="pointer-events-none hidden lg:block w-72 h-48 xl:w-80 xl:h-52 overflow-hidden rounded-none border border-[#1C1917]/15 bg-surface-sand select-none"
            >
              <img
                src={hoveredItem.imageUrl}
                alt={hoveredItem.name}
                loading="lazy"
                className="h-full w-full object-cover object-center"
              />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      <div className="relative mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-8">
        {/* Encabezado con tipografía monumental y acento editorial */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-brand-fire mb-2">
            100% FRESH CRIOLLO PRESSED HOT
          </div>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-charcoal-ink leading-none">
            SLOW ROASTED, SERVED <span className="text-brand-fire">AL MOMENTO</span>
          </h2>
          <p className="mt-2 font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-brand-fire">
            AUTHENTIC CRIOLLO FLAVORS GENERATIONAL RECIPES
          </p>
          <p className="mt-3 font-sans text-sm sm:text-base text-charcoal-ink/80 leading-relaxed max-w-2xl mx-auto">
            Prepared fresh in Little Havana, Brickell, and Doral with 24 hours of marinade in Seville sour orange, crushed garlic, and fresh oregano.
          </p>
        </div>

        {/* 1. Pestañas de Categorías con Retícula de Ángulo Recto */}
        <div className="sticky top-[56px] sm:top-[64px] z-30 mb-10 py-2 backdrop-blur-md bg-cream-bg/90">
          <div
            role="tablist"
            aria-label="Menu Categories"
            className="no-scrollbar flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto p-1.5 rounded-none bg-surface-sand border border-[#1C1917]/15 max-w-4xl mx-auto"
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
                  className={`relative shrink-0 rounded-none px-5 py-2.5 font-sans text-xs uppercase font-bold tracking-wider transition-colors duration-200 focus:outline-none select-none border ${
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

        {/* 2. Lista Editorial Minimalista: Filas horizontales contorneadas con border-b border-[#1C1917]/15 */}
        <div className="flex flex-col border-t border-[#1C1917]/15">
          {filteredItems.map((item) => {
            const isAdded = clickedItemId === item.id;
            return (
              <article
                key={item.id}
                onMouseEnter={(e) => handleRowMouseEnter(item, e)}
                onMouseMove={handleRowMouseMove}
                onMouseLeave={handleRowMouseLeave}
                onClick={() => {
                  if (onSelect) {
                    onSelect({
                      id: item.id,
                      name: item.name,
                      category: item.category as any,
                      price: item.price,
                      description: item.description,
                      image: item.imageUrl,
                      badge: item.badgeText as any,
                      sidesAllowed: Boolean(item.sidesAllowed),
                    });
                  } else {
                    handleQuickAdd(item);
                  }
                }}
                className="group relative flex flex-col justify-center border-b border-[#1C1917]/15 py-6 sm:py-7 px-2 sm:px-4 transition-colors duration-200 hover:bg-surface-sand/50 cursor-pointer select-none"
              >
                {/* Fila Horizontal: Nombre del plato y Precio monoespaciado */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-6 w-full">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <h3 className="font-display text-3xl font-bold uppercase tracking-tight text-charcoal-ink group-hover:text-brand-fire transition-colors">
                      {item.name}
                    </h3>
                    {item.badgeText && (
                      <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-brand-fire">
                        {item.badgeText}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0">
                    <span className="font-mono text-2xl font-bold text-charcoal-ink tracking-tight">
                      ${item.price.toFixed(2)}
                    </span>

                    {/* Botón táctil para añadir o personalizar */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuickAdd(item);
                      }}
                      aria-label={`Personalizar / Añadir ${item.name} (Add)`}
                      title="Add to order"
                      className={`relative inline-flex items-center gap-1.5 rounded-none px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider border transition-colors cursor-pointer select-none ${
                        isAdded
                          ? "bg-leaf-green text-cream-bg border-leaf-green"
                          : "bg-charcoal-ink text-cream-bg border-charcoal-ink group-hover:bg-brand-fire group-hover:border-brand-fire"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="h-3.5 w-3.5 stroke-[3]" />
                          <span>ADDED</span>
                        </>
                      ) : (
                        <>
                          <Plus className="h-3.5 w-3.5 stroke-[3]" />
                          <span>{item.sidesAllowed ? "CUSTOMIZE" : "ADD"}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Línea fina con la descripción de los ingredientes */}
                <p className="mt-2 font-sans text-xs sm:text-sm text-charcoal-ink/75 leading-relaxed max-w-3xl">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>

        {/* Bloque editorial de consulta personalizada */}
        <div className="mt-14 rounded-none bg-surface-sand p-6 sm:p-8 border border-[#1C1917]/15 text-center">
          <p className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-charcoal-ink font-bold">
            NEED INGREDIENT DETAILS OR A CUSTOM ORDER?
          </p>
          <p className="mt-2 font-sans text-xs sm:text-sm text-charcoal-ink/80 max-w-xl mx-auto">
            Our team in Little Havana and Brickell is ready to answer questions and customize your order al momento.
          </p>
          <div className="mt-5">
            <a
              href="https://wa.me/13055550123"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-none bg-brand-fire px-7 py-3.5 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-cream-bg border border-brand-fire hover:bg-charcoal-ink hover:border-charcoal-ink transition-colors cursor-pointer select-none"
            >
              <span>Inquire via WhatsApp</span>
              <span>➔</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CravStyleMenuGrid;
