'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  { id: 'favorites', label: '🔥 Favorites' },
  { id: 'bowls', label: '🥗 Criollo Bowls' },
  { id: 'sandwiches', label: '🥪 Pressed Cubanos' },
  { id: 'sides', label: "🥟 Sides / Pa' Picar" },
  { id: 'drinks', label: '🥤 Cafecito & Drinks' },
];

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'chicken-fresco-bowl',
    name: 'Chicken Fresco Bowl',
    category: 'bowls',
    isFavorite: true,
    price: 14.5,
    description:
      'Tender chicken breast marinated in citrus mojo for 24h, white rice, seasoned black beans, sweet ripe maduros & fresh green mojo.',
    imageUrl:
      'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=800&q=80',
    badgeType: 'fresh',
    badgeText: 'Fresh / Gluten Friendly',
    prepTime: '5-8 min',
  },
  {
    id: 'traditional-pressed-cuban',
    name: 'Traditional Pressed Cuban',
    category: 'sandwiches',
    isFavorite: true,
    price: 13.95,
    description:
      'Sweet cured ham, shredded slow-roasted lechón in its juices, melted Swiss cheese, crisp pickles & yellow mustard on butter-crusted pressed Cuban bread.',
    imageUrl:
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    badgeType: 'top_seller',
    badgeText: 'Top Seller',
    prepTime: '6-9 min',
  },
  {
    id: 'mojo-pulled-pork-bowl',
    name: 'Mojo Pulled Pork (Lechón Asado)',
    category: 'bowls',
    isFavorite: true,
    price: 15.95,
    description:
      'Shredded pork shoulder slow-braised in Seville sour orange and roasted garlic with cumin. Served with moro rice and crispy tostones.',
    imageUrl:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    badgeType: 'signature',
    badgeText: 'Signature Mojo',
    prepTime: '6-10 min',
  },
  {
    id: 'ropa-vieja-bowl',
    name: 'Ropa Vieja Criolla Bowl',
    category: 'bowls',
    isFavorite: false,
    price: 16.5,
    description:
      'Tender shredded flank steak slow-braised in red pepper, sweet onion & olive sofrito. Served over moro rice and sweet maduros.',
    imageUrl:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    badgeType: 'top_seller',
    badgeText: 'Top Seller',
    prepTime: '7-10 min',
  },
  {
    id: 'yuca-frita-mojo',
    name: 'Yuca Frita con Mojo Ajo',
    category: 'sides',
    isFavorite: true,
    price: 6.5,
    description:
      'Golden crispy yuca batons, fluffy on the inside, drenched in roasted garlic mojo with fresh cilantro and key lime.',
    imageUrl:
      'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80',
    badgeType: 'fresh',
    badgeText: 'Fresh / Gluten Friendly',
    prepTime: '4-6 min',
  },
  {
    id: 'tostones-crunch',
    name: 'Tostones Crujientes con Ajo Dip',
    category: 'sides',
    isFavorite: false,
    price: 6.0,
    description:
      'Twice-fried green plantains prepared traditional Miami style with sea salt flakes and house garlic dip.',
    imageUrl:
      'https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&w=800&q=80',
    badgeType: 'fresh',
    badgeText: 'Fresh / Gluten Friendly',
    prepTime: '4-6 min',
  },
  {
    id: 'cafecito-cubano-colada',
    name: 'Cafecito Cubano Doble & Colada',
    category: 'drinks',
    isFavorite: true,
    price: 3.5,
    description:
      'Dark roast Cuban espresso whipped with sweet demerara sugar to create thick golden espumita. Brewed to share al momento.',
    imageUrl:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    badgeType: 'signature',
    badgeText: 'Signature Mojo',
    prepTime: '2-4 min',
  },
  {
    id: 'guayaba-lemonade',
    name: 'Limonada Helada de Guayaba',
    category: 'drinks',
    isFavorite: false,
    price: 4.5,
    description:
      'Chilled pink guava nectar blended with freshly squeezed key lime juice and raw cane sugar. Intensely refreshing.',
    imageUrl:
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    badgeType: 'top_seller',
    badgeText: 'Top Seller',
    prepTime: '2-3 min',
  },
];

export function CravStyleMenuGrid() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('favorites');
  const [addedItems, setAddedItems] = useState<Record<string, number>>({});

  // Filtrado de elementos
  const filteredItems = MENU_ITEMS.filter((item) => {
    if (selectedCategory === 'favorites') {
      return item.isFavorite === true;
    }
    return item.category === selectedCategory;
  });

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

  // Renderizado del badge con estilo minimalista pill Crav
  const renderBadge = (type: BadgeType, text: string) => {
    switch (type) {
      case 'signature':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-fire/10 border border-brand-fire/30 text-brand-fire text-xs font-bold uppercase tracking-wider rounded-full">
            <span>★</span> {text}
          </span>
        );
      case 'fresh':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-leaf-green/10 border border-leaf-green/30 text-leaf-green text-xs font-bold uppercase tracking-wider rounded-full">
            <span>🌿</span> {text}
          </span>
        );
      case 'top_seller':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-charcoal-ink/5 border border-charcoal-ink/10 text-charcoal-ink text-xs font-bold uppercase tracking-wider rounded-full">
            <span>⭐</span> {text}
          </span>
        );
    }
  };

  return (
    <div className="w-full bg-transparent py-10 sm:py-16 border-b border-charcoal-ink/20">
      <div className="mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado de Sección */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-brand-fire mb-2">
            100% FRESH CRIOLLO · PRESSED HOT
          </div>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-charcoal-ink leading-none">
            SLOW ROASTED, SERVED <span className="text-brand-fire">AL MOMENTO</span>.
          </h2>
          <p className="mt-2 font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-brand-fire">
            AUTHENTIC CRIOLLO FLAVORS · GENERATIONAL RECIPES
          </p>
          <p className="mt-3 font-sans text-sm sm:text-base text-charcoal-ink/80 leading-relaxed max-w-2xl mx-auto">
            Choose your favorite signature dish prepared with our 24-hour citrus mojo marinade and handcrafted Caribbean sides.
          </p>
        </div>

        {/* 1. Pestañas de Categorías con Retícula de Ángulo Recto */}
        <div className="sticky top-[56px] sm:top-[64px] z-30 mb-10 py-2 backdrop-blur-md bg-cream-bg/90">
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-1.5 p-1.5 rounded-none bg-surface-sand border border-charcoal-ink/20 max-w-4xl mx-auto">
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

        {/* 2. Grid Continuo de 1px (Newspaper Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-charcoal-ink/20">
          {filteredItems.map((item) => {
            const count = addedItems[item.id] || 0;
            return (
              <article
                key={item.id}
                className="group relative flex flex-col justify-between rounded-none border-r border-b border-charcoal-ink/20 bg-surface-sand p-5 sm:p-6 transition-colors duration-200 hover:bg-cream-bg"
              >
                <div>
                  {/* Contenedor de Fotografía con Marco Nítido */}
                  <div className="relative aspect-4/3 w-full overflow-hidden rounded-none border border-charcoal-ink/20 bg-cream-bg">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      loading="lazy"
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Tag semántico de color en la esquina superior izquierda */}
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

                {/* Fila Inferior: Precio y Botón Táctil de Adición Rápida */}
                <div className="mt-6 flex items-center justify-between border-t border-charcoal-ink/15 pt-4">
                  <div>
                    <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-charcoal-ink/60 block">
                      PRICE
                    </span>
                    <span className="font-display text-3xl font-black text-charcoal-ink">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Botón Ortogonal Nítido */}
                  <button
                    onClick={() => handleAddItem(item)}
                    className={`relative inline-flex items-center gap-1.5 rounded-none px-4 py-2.5 font-sans text-xs font-bold uppercase tracking-wider border transition-colors cursor-pointer select-none ${
                      count > 0
                        ? 'bg-leaf-green text-cream-bg border-leaf-green'
                        : 'bg-charcoal-ink text-cream-bg border-charcoal-ink hover:bg-brand-fire hover:border-brand-fire'
                    }`}
                    aria-label={`Add ${item.name} to order`}
                    title="Add to order"
                  >
                    {count > 0 ? (
                      <span className="font-sans text-xs font-black">+{count} ADDED</span>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 stroke-[3]" />
                        <span>+ ADD TO ORDER</span>
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Mensaje editorial de pie de catálogo */}
        <div className="mt-14 rounded-none bg-surface-sand p-6 sm:p-8 border-2 border-charcoal-ink text-center">
          <p className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-charcoal-ink font-bold">
            NEED INGREDIENT DETAILS OR A CUSTOM ORDER?
          </p>
          <p className="mt-2 font-sans text-xs sm:text-sm text-charcoal-ink/80 max-w-xl mx-auto">
            Have dietary questions or a special request? Reach out to our kitchen team via WhatsApp al momento.
          </p>
          <div className="mt-5">
            <a
              href="#catering"
              className="inline-flex items-center gap-2 rounded-none bg-brand-fire px-7 py-3.5 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-cream-bg border-2 border-brand-fire hover:bg-charcoal-ink hover:border-charcoal-ink transition-colors cursor-pointer select-none"
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
