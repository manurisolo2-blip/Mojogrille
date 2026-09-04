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
          <span className="inline-flex items-center gap-1 rounded-full bg-brand-fire px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-widest text-cream-bg shadow-sm">
            <span>★</span> {text}
          </span>
        );
      case 'fresh':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-leaf-green px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-widest text-cream-bg shadow-sm">
            <span>🌿</span> {text}
          </span>
        );
      case 'top_seller':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-mojo-citrus px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-widest text-charcoal-ink shadow-sm">
            <span>⭐</span> {text}
          </span>
        );
    }
  };

  return (
    <div className="w-full bg-cream-bg py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado de Sección */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-charcoal-ink">
            Hecho a Fuego Lento, Servido <span className="text-brand-fire">Al Momento</span>.
          </h2>
          <p className="mt-2 font-accent italic text-2xl sm:text-3xl text-brand-fire lowercase tracking-normal">
            sabores criollos cocinados con paciencia y sazón de casa.
          </p>
          <p className="mt-2 font-sans text-sm sm:text-base text-charcoal-ink/75 leading-relaxed">
            Elige tu plato favorito preparado con nuestra marinada tradicional de 24 horas y guarniciones caribeñas recién hechas.
          </p>
        </div>

        {/* 1. Pestañas de Categorías con deslizador animado estilo CRAV */}
        <div className="relative mb-10 sm:mb-12">
          <div className="flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar gap-2 p-1.5 rounded-full bg-surface-sand border border-charcoal-ink/10 w-full max-w-4xl mx-auto shadow-xs">
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`relative z-10 flex-shrink-0 rounded-full px-4 sm:px-6 py-2.5 font-sans text-xs sm:text-sm font-bold tracking-wide transition-colors duration-200 focus:outline-hidden ${
                    isSelected
                      ? 'text-cream-bg'
                      : 'text-charcoal-ink hover:text-brand-fire'
                  }`}
                  role="tab"
                  aria-selected={isSelected}
                >
                  {/* Deslizador animado suave con layoutId de Framer Motion */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeCategoryTab"
                      className="absolute inset-0 -z-10 rounded-full bg-brand-fire shadow-md shadow-brand-fire/30"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span>{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Grid Interactivo de Tarjetas de Producto */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const count = addedItems[item.id] || 0;
              return (
                <motion.article
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  className="group relative flex flex-col justify-between rounded-3xl border border-charcoal-ink/10 bg-surface-sand p-4 sm:p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-brand-fire/40"
                >
                  <div>
                    {/* Contenedor de Fotografía con Zoom Suave en Hover */}
                    <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-cream-bg">
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

                      {/* Tiempo de preparación estimado en esquina superior derecha */}
                      {item.prepTime && (
                        <div className="absolute top-3 right-3 z-10 rounded-lg bg-charcoal-ink/80 px-2 py-1 text-[10px] font-bold text-cream-bg backdrop-blur-xs">
                          ⏱ {item.prepTime}
                        </div>
                      )}
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
                  <div className="mt-6 flex items-center justify-between border-t border-charcoal-ink/10 pt-4">
                    <div>
                      <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-charcoal-ink/60 block">
                        Precio
                      </span>
                      <span className="font-sans text-2xl font-black text-charcoal-ink">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    {/* Botón Circular Grande con Feedback Táctil */}
                    <motion.button
                      whileTap={{ scale: 0.88 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleAddItem(item)}
                      className={`relative flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-200 focus:outline-hidden ${
                        count > 0
                          ? 'bg-leaf-green text-cream-bg border-leaf-green shadow-md shadow-leaf-green/30'
                          : 'bg-brand-fire text-cream-bg border-brand-fire hover:bg-brand-fire/90 shadow-md shadow-brand-fire/25'
                      }`}
                      aria-label={`Añadir ${item.name} al pedido`}
                      title="Añadir al pedido"
                    >
                      {count > 0 ? (
                        <span className="font-sans text-xs font-black">+{count}</span>
                      ) : (
                        <Plus className="h-5 w-5 stroke-[2.5]" />
                      )}
                    </motion.button>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Mensaje de pie de catálogo */}
        <div className="mt-12 text-center">
          <p className="font-sans text-xs sm:text-sm text-[#78716C]">
            ¿Tienes alguna restricción alimentaria o pedido especial?{' '}
            <a
              href="#catering"
              className="font-semibold text-[#D95327] hover:underline"
            >
              Consúltanos por WhatsApp al momento.
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}

export default CravStyleMenuGrid;
