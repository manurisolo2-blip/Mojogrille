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
  { id: 'favorites', label: '🔥 Favoritos' },
  { id: 'bowls', label: '🥗 Bowls' },
  { id: 'sandwiches', label: '🥪 Sándwiches Cubanos' },
  { id: 'sides', label: "🥟 Sides / Pa' Picar" },
  { id: 'drinks', label: '🥤 Bebidas' },
];

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'chicken-fresco-bowl',
    name: 'Chicken Fresco Bowl',
    category: 'bowls',
    isFavorite: true,
    price: 14.5,
    description:
      'Pechuga tierna marinada en mojo cítrico por 24h, arroz blanco criollo, frijoles negros sazonados, plátanos maduros dulces y mojo verde fresco.',
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
      'Jamón curado dulce, lechón asado desmenuzado en su jugo, queso suizo derretido, pepinillos encurtidos y mostaza suave en pan cubano prensado con mantequilla dorada.',
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
      'Cerdo deshebrado marinado lentamente en naranja agria y ajo asado con comino. Acompañado de arroz moro con frijoles negros y crujientes tostones.',
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
      'Hebras de falda de res guisadas lentamente con sofrito de pimientos rojos, cebollas caramelizadas y aceitunas. Servido sobre arroz moro y maduros.',
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
      'Bastones de yuca crujientes y dorados por fuera, cremosos por dentro, bañados en abundante mojo de ajo asado con cilantro y limón.',
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
      'Plátanos machos verdes fritos dos veces al estilo tradicional de Miami con sal marina y salsa tártara criolla especial de la casa.',
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
      'Espresso cubano extra oscuro con su tradicional espumita dulce de caña de azúcar recién batida. Para compartir o disfrutar al momento.',
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
      'Néctar de guayaba rosa batido en frío con zumo de limas recién exprimidas y azúcar morena de caña. Muy refrescante.',
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

  // Renderizado del badge con estilos semánticos oficiales
  const renderBadge = (type: BadgeType, text: string) => {
    switch (type) {
      case 'signature':
        return (
          <span className="inline-flex items-center gap-1 rounded-none border border-charcoal-ink bg-brand-fire px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-cream-bg">
            <span>★</span> {text}
          </span>
        );
      case 'fresh':
        return (
          <span className="inline-flex items-center gap-1 rounded-none border border-charcoal-ink bg-leaf-green px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-cream-bg">
            <span>🌿</span> {text}
          </span>
        );
      case 'top_seller':
        return (
          <span className="inline-flex items-center gap-1 rounded-none border border-charcoal-ink bg-mojo-citrus px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-charcoal-ink">
            <span>⭐</span> {text}
          </span>
        );
    }
  };

  return (
    <div className="w-full bg-cream-bg py-10 sm:py-16 border-b border-charcoal-ink/20">
      <div className="mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado de Sección */}
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
            Elige tu plato favorito preparado con nuestra marinada tradicional de 24 horas y guarniciones caribeñas recién hechas.
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
                  className={`relative z-10 shrink-0 rounded-none px-5 py-2.5 font-mono text-xs uppercase font-bold tracking-wider transition-colors duration-200 focus:outline-hidden border ${
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
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-charcoal-ink/60 block">
                      PRECIO
                    </span>
                    <span className="font-display text-3xl font-black text-charcoal-ink">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Botón Ortogonal Nítido */}
                  <button
                    onClick={() => handleAddItem(item)}
                    className={`relative inline-flex items-center gap-1.5 rounded-none px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider border transition-colors cursor-pointer select-none ${
                      count > 0
                        ? 'bg-leaf-green text-cream-bg border-leaf-green'
                        : 'bg-charcoal-ink text-cream-bg border-charcoal-ink hover:bg-brand-fire hover:border-brand-fire'
                    }`}
                    aria-label={`Añadir ${item.name} al pedido`}
                    title="Añadir al pedido"
                  >
                    {count > 0 ? (
                      <span className="font-mono text-xs font-black">+{count} AÑADIDO</span>
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

        {/* Mensaje editorial de pie de catálogo */}
        <div className="mt-14 rounded-none bg-surface-sand p-6 sm:p-8 border-2 border-charcoal-ink text-center">
          <p className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-charcoal-ink font-bold">
            ¿CONSULTA DE INGREDIENTES O PEDIDO PERSONALIZADO?
          </p>
          <p className="mt-2 font-sans text-xs sm:text-sm text-charcoal-ink/80 max-w-xl mx-auto">
            ¿Tienes alguna restricción alimentaria o pedido especial? Consúltanos por WhatsApp al momento.
          </p>
          <div className="mt-5">
            <a
              href="#catering"
              className="inline-flex items-center gap-2 rounded-none bg-brand-fire px-7 py-3.5 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-cream-bg border-2 border-brand-fire hover:bg-charcoal-ink hover:border-charcoal-ink transition-colors cursor-pointer select-none"
            >
              <span>Consultar al Momento</span>
              <span>➔</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CravStyleMenuGrid;
