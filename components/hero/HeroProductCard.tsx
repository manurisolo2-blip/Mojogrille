'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface HeroProductCardProps {
  imageSrc?: string;
  title?: string;
  category?: string;
  price?: string;
  calories?: string;
}

export function HeroProductCard({
  imageSrc = '/assets/mojo-bowl-ropa-vieja.jpg',
  title = 'Signature Mojo Bowl • Ropa Vieja Criolla',
  category = '#1 Miami Top Seller',
  price = '$15.50',
}: HeroProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Valores de movimiento del ratón para el efecto Tilt 3D
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Físicas de resorte suaves para naturalidad interactiva estilo CRAV
  const springX = useSpring(mouseX, { stiffness: 220, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 220, damping: 25 });

  const rotateX = useTransform(springY, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-10deg', '10deg']);
  const brightness = useTransform(springY, [-0.5, 0.5], [1.05, 0.95]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    mouseX.set(clientX / width - 0.5);
    mouseY.set(clientY / height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex w-full max-w-[440px] items-center justify-center p-2 sm:p-4 select-none"
      style={{ perspective: 1100 }}
    >

      {/* Tarjeta con efecto Tilt 3D */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          filter: brightness.get() ? `brightness(${brightness.get()})` : undefined,
        }}
        className="relative w-full rounded-none border-2 border-charcoal-ink bg-surface-sand p-4 shadow-none transition-colors duration-300"
      >
        {/* Contenedor de la Imagen con zoom interactivo */}
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-none bg-cream-bg border border-charcoal-ink/20">
          <motion.img
            src={imageSrc}
            alt={title}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="h-full w-full object-cover object-center transition-transform duration-500"
            style={{ transform: 'translateZ(20px)' }}
          />

          {/* Tag de Precio Flotante estilo Badge superpuesto en la esquina */}
          <div
            className="absolute top-3 left-3 z-20 flex items-center gap-2 rounded-none bg-charcoal-ink px-3.5 py-1.5 border border-cream-bg/20 text-cream-bg"
            style={{ transform: 'translateZ(45px)' }}
          >
            <span className="font-sans text-base font-black text-mojo-citrus tracking-tight">
              {price}
            </span>
            <span className="h-3 w-px bg-cream-bg/20" />
            <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-cream-bg">
              Al Momento
            </span>
          </div>
        </div>

        {/* Detalles del Producto */}
        <div className="mt-4 px-1 pb-1" style={{ transform: 'translateZ(25px)' }}>
          <div className="flex items-center justify-between text-xs font-semibold text-charcoal-ink/70">
            <span className="flex items-center gap-1.5 text-leaf-green font-bold">
              <span className="h-2 w-2 rounded-none bg-leaf-green animate-pulse" />
              {category}
            </span>
            <span className="font-sans text-[10px] font-bold uppercase tracking-wider">24h Marinade</span>
          </div>

          <h3 className="mt-2 font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-charcoal-ink leading-tight">
            {title}
          </h3>

          <p className="mt-1 font-sans text-xs text-charcoal-ink/80 line-clamp-2">
            Tender flank steak braised in Seville sour orange, garlic mojo, and herbs. Served over moro rice and crispy tostones.
          </p>

          {/* Micro badges de guarniciones */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {['Moro Rice', 'Tostones', 'Garlic Mojo', 'Pickled Onions'].map((side, i) => (
              <span
                key={i}
                className="rounded-none bg-cream-bg border border-charcoal-ink/20 px-2 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wider text-charcoal-ink"
              >
                +{side}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default HeroProductCard;
