'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Plus, Check } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';

export type CategoryId = 'favorites' | 'bowls' | 'sandwiches' | 'sides' | 'drinks';

export interface CategoryOption {
  id: CategoryId;
  label: string;
}

export type BadgeType = 'signature' | 'fresh' | 'top_seller';

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryId;
  isFavorite?: boolean;
  price: number;
  description: string;
  imageUrl: string;
  badgeType: BadgeType;
  badgeText: string;
  prepTime?: string;
}

const CATEGORIES: CategoryOption[] = [
  { id: 'favorites', label: 'Favorites' },
  { id: 'bowls', label: 'Criollo Bowls' },
  { id: 'sandwiches', label: 'Pressed Cubanos' },
  { id: 'sides', label: "Sides / Pa' Picar" },
  { id: 'drinks', label: 'Cafecito & Drinks' },
];

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'chicken-fresco-bowl',
    name: 'Chicken Fresco Bowl',
    category: 'bowls',
    isFavorite: true,
    price: 14.5,
    description:
      'Tender chicken breast marinated in citrus mojo for 24h, white rice, seasoned black beans, sweet ripe maduros and fresh green mojo',
    imageUrl:
      'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=800&q=80',
    badgeType: 'fresh',
    badgeText: 'Fresh / Gluten Friendly',
    prepTime: '5 to 8 min',
  },
  {
    id: 'traditional-pressed-cuban',
    name: 'Traditional Pressed Cuban',
    category: 'sandwiches',
    isFavorite: true,
    price: 13.95,
    description:
      'Sweet cured ham, shredded slow roasted lechón in its juices, melted Swiss cheese, crisp pickles and yellow mustard on butter crusted pressed Cuban bread',
    imageUrl:
      'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    badgeType: 'top_seller',
    badgeText: 'Top Seller',
    prepTime: '6 to 8 min',
  },
  {
    id: 'mojo-pulled-pork-bowl',
    name: 'Mojo Pulled Pork (Lechón Asado)',
    category: 'bowls',
    isFavorite: true,
    price: 15.95,
    description:
      'Shredded pork shoulder slow braised in Seville sour orange and roasted garlic with cumin, served with moro rice and crispy tostones',
    imageUrl:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    badgeType: 'signature',
    badgeText: 'Signature Mojo',
    prepTime: '4 to 6 min',
  },
  {
    id: 'ropa-vieja-bowl',
    name: 'Ropa Vieja Criolla Bowl',
    category: 'bowls',
    isFavorite: false,
    price: 16.5,
    description:
      'Tender shredded flank steak slow braised in red pepper, sweet onion and olive sofrito, served over moro rice and sweet maduros',
    imageUrl:
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    badgeType: 'top_seller',
    badgeText: 'Top Seller',
    prepTime: '4 to 6 min',
  },
  {
    id: 'yuca-frita-mojo',
    name: 'Yuca Frita con Mojo Ajo',
    category: 'sides',
    isFavorite: true,
    price: 6.5,
    description:
      'Crispy fried cassava batons served with house made warm crushed garlic, lime and cilantro mojo dipping sauce',
    imageUrl:
      'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80',
    badgeType: 'signature',
    badgeText: 'Criollo Side',
    prepTime: '3 to 5 min',
  },
  {
    id: 'tostones-crunch',
    name: 'Tostones Crujientes',
    category: 'sides',
    isFavorite: false,
    price: 5.95,
    description:
      'Double fried green plantain rounds, smashed flat and salted to order with homemade mojo alioli',
    imageUrl:
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    badgeType: 'fresh',
    badgeText: 'Freshly Fried',
    prepTime: '4 to 6 min',
  },
  {
    id: 'maduros-caramelized',
    name: 'Maduros Glaseados',
    category: 'sides',
    isFavorite: false,
    price: 5.5,
    description:
      'Naturally sweet ripe black plantains, slow caramelized on the flat top with golden crisp edges',
    imageUrl:
      'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    badgeType: 'top_seller',
    badgeText: 'Sweet & Savory',
    prepTime: '3 to 5 min',
  },
  {
    id: 'cafecito-cubano',
    name: 'Cafecito Cubano (Espuma Dorada)',
    category: 'drinks',
    isFavorite: true,
    price: 2.75,
    description:
      'Dark espresso brewed fresh with whipped cane sugar espumita, served hot in traditional tacita',
    imageUrl:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    badgeType: 'signature',
    badgeText: '3PM Energy',
    prepTime: '2 to 3 min',
  },
  {
    id: 'colada-miami',
    name: 'Colada Para Compartir',
    category: 'drinks',
    isFavorite: false,
    price: 3.5,
    description:
      'Four shots of dark Cuban espresso with rich brown sugar froth, accompanied by demitasse cups to share',
    imageUrl:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    badgeType: 'top_seller',
    badgeText: 'Miami Classic',
    prepTime: '2 to 4 min',
  },
  {
    id: 'guayaba-lemonade',
    name: 'Limonada Helada de Guayaba',
    category: 'drinks',
    isFavorite: false,
    price: 4.5,
    description:
      'Chilled pink guava nectar blended with freshly squeezed key lime juice and raw cane sugar, intensely refreshing',
    imageUrl:
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    badgeType: 'top_seller',
    badgeText: 'Top Seller',
    prepTime: '2 to 3 min',
  },
];

export function CravStyleMenuGrid() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('favorites');
  const [addedItems, setAddedItems] = useState<Record<string, number>>({});
  const [hoveredItem, setHoveredItem] = useState<MenuItem | null>(null);
  const [mounted, setMounted] = useState(false);
  const [offsetX, setOffsetX] = useState(24);

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const smoothX = useSpring(mouseX, { damping: 28, stiffness: 220, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 28, stiffness: 220, mass: 0.5 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredItems = MENU_ITEMS.filter((item) => {
    if (selectedCategory === 'favorites') {
      return item.isFavorite === true;
    }
    return item.category === selectedCategory;
  });

  const handleMouseEnter = (item: MenuItem, e: React.MouseEvent) => {
    setHoveredItem(item);
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
    if (typeof window !== 'undefined') {
      if (e.clientX > window.innerWidth - 380) {
        setOffsetX(-350);
      } else {
        setOffsetX(28);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
    if (typeof window !== 'undefined') {
      if (e.clientX > window.innerWidth - 380) {
        setOffsetX(-350);
      } else {
        setOffsetX(28);
      }
    }
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleAddItem = (item: MenuItem) => {
    setAddedItems((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1,
    }));
    useCartStore.getState().addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.imageUrl,
    });
  };

  return (
    <div className="w-full bg-transparent py-10 sm:py-16 border-b border-[#1C1917]/15">
      {/* Portal con la fotografía recortada del plato siguiendo suavemente al cursor */}
      {mounted && typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {hoveredItem && (
            <motion.div
              key={hoveredItem.id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                x: smoothX,
                y: smoothY,
                translateX: offsetX,
                translateY: '-50%',
                pointerEvents: 'none',
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

      <div className="mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-8">
        {/* Encabezado de Sección */}
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
            Choose your favorite signature dish prepared with our 24 hour citrus mojo marinade and handcrafted Caribbean sides.
          </p>
        </div>

        {/* 1. Pestañas de Categorías con Retícula de Ángulo Recto */}
        <div className="sticky top-[56px] sm:top-[64px] z-30 mb-10 py-2 backdrop-blur-md bg-cream-bg/90">
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-1.5 p-1.5 rounded-none bg-surface-sand border border-[#1C1917]/15 max-w-4xl mx-auto">
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`relative z-10 shrink-0 rounded-none px-5 py-2.5 font-sans text-xs uppercase font-bold tracking-wider transition-colors duration-200 focus:outline-hidden border ${
                    isSelected
                      ? 'bg-charcoal-ink text-cream-bg border-charcoal-ink'
                      : 'bg-transparent text-charcoal-ink hover:text-brand-fire hover:bg-cream-bg/80 border-transparent'
                  }`}
                  role="tab"
                  aria-selected={isSelected}
                >
                  <span>{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Lista Editorial Minimalista: Filas horizontales contorneadas con border-b border-[#1C1917]/15 */}
        <div className="flex flex-col border-t border-[#1C1917]/15">
          {filteredItems.map((item) => {
            const count = addedItems[item.id] || 0;
            return (
              <article
                key={item.id}
                onMouseEnter={(e) => handleMouseEnter(item, e)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleAddItem(item)}
                className="group relative flex flex-col justify-center border-b border-[#1C1917]/15 py-6 sm:py-7 px-2 sm:px-4 transition-colors duration-200 hover:bg-surface-sand/50 cursor-pointer select-none"
              >
                {/* Fila Horizontal: Nombre en caja alta y Precio en tipografía monoespaciada */}
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

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddItem(item);
                      }}
                      className={`relative inline-flex items-center gap-1.5 rounded-none px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider border transition-colors cursor-pointer select-none ${
                        count > 0
                          ? 'bg-leaf-green text-cream-bg border-leaf-green'
                          : 'bg-charcoal-ink text-cream-bg border-charcoal-ink group-hover:bg-brand-fire group-hover:border-brand-fire'
                      }`}
                      aria-label={`Add ${item.name} to order`}
                      title="Add to order"
                    >
                      {count > 0 ? (
                        <>
                          <Check className="h-3.5 w-3.5 stroke-[3]" />
                          <span className="font-sans text-xs font-black">+{count} ADDED</span>
                        </>
                      ) : (
                        <>
                          <Plus className="h-3.5 w-3.5 stroke-[3]" />
                          <span>+ ADD TO ORDER</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Descripción de los ingredientes en una línea fina debajo */}
                <p className="mt-2 font-sans text-xs sm:text-sm text-charcoal-ink/75 leading-relaxed max-w-3xl">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>

        {/* Mensaje editorial de pie de catálogo */}
        <div className="mt-14 rounded-none bg-surface-sand p-6 sm:p-8 border border-[#1C1917]/15 text-center">
          <p className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-charcoal-ink font-bold">
            NEED INGREDIENT DETAILS OR A CUSTOM ORDER?
          </p>
          <p className="mt-2 font-sans text-xs sm:text-sm text-charcoal-ink/80 max-w-xl mx-auto">
            Have dietary questions or a special request? Reach out to our kitchen team via WhatsApp al momento.
          </p>
          <div className="mt-5">
            <a
              href="#catering"
              className="inline-flex items-center gap-2 rounded-none bg-brand-fire px-7 py-3.5 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-cream-bg border border-brand-fire hover:bg-charcoal-ink hover:border-charcoal-ink transition-colors cursor-pointer select-none"
            >
              <span>Inquire via WhatsApp</span>
              <span>➔</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CravStyleMenuGrid;
