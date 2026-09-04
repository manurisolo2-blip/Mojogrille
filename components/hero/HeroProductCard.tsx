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
  category = 'Top Seller #1 en Miami',
  price = '$15.50',
  calories = '480 kcal',
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
      {/* Resplandor radial de fondo */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#D95327]/20 via-[#F59E0B]/15 to-[#4D7C0F]/15 blur-2xl -z-10 pointer-events-none" />

      {/* Tarjeta con efecto Tilt 3D */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          filter: brightness.get() ? `brightness(${brightness.get()})` : undefined,
        }}
        className="relative w-full rounded-3xl border border-[#EAE5DC] bg-white p-4 shadow-xl transition-shadow duration-300 hover:shadow-2xl"
      >
        {/* Contenedor de la Imagen con zoom interactivo */}
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-[#FAF8F5]">
          <motion.img
            src={imageSrc}
            alt={title}
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="h-full w-full object-cover object-center transition-transform duration-500"
            style={{ transform: 'translateZ(20px)' }}
          />

          {/* Tag de Precio Flotante estilo Badge superpuesto en la esquina */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-3 left-3 z-20 flex items-center gap-2 rounded-xl bg-[#1C1917]/90 px-3.5 py-1.5 backdrop-blur-md border border-white/20 text-white shadow-lg"
            style={{ transform: 'translateZ(45px)' }}
          >
            <span className="font-sans text-base font-black text-[#F59E0B] tracking-tight">
              {price}
            </span>
            <span className="h-3 w-px bg-white/20" />
            <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-[#FAF8F5]">
              Al Momento
            </span>
          </motion.div>

          {/* Tag de Calorías / Frescura en esquina inferior derecha */}
          <div
            className="absolute bottom-3 right-3 z-20 rounded-lg bg-white/90 px-2.5 py-1 text-[11px] font-bold text-[#1C1917] backdrop-blur-xs shadow-xs border border-[#EAE5DC]"
            style={{ transform: 'translateZ(35px)' }}
          >
            {calories}
          </div>
        </div>

        {/* Detalles del Producto */}
        <div className="mt-4 px-1 pb-1" style={{ transform: 'translateZ(25px)' }}>
          <div className="flex items-center justify-between text-xs font-semibold text-[#78716C]">
            <span className="flex items-center gap-1.5 text-[#4D7C0F]">
              <span className="h-2 w-2 rounded-full bg-[#4D7C0F] animate-ping" />
              {category}
            </span>
            <span>Marinado 24h</span>
          </div>

          <h3 className="mt-2 font-serif text-lg sm:text-xl font-bold text-[#1C1917] leading-tight">
            {title}
          </h3>

          <p className="mt-1 font-sans text-xs text-[#78716C] line-clamp-2">
            Hebras de falda tierna marinada en naranja agria, ajo criollo y orégano. Servido con arroz moro y tostones crujientes.
          </p>

          {/* Micro badges de guarniciones */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {['Arroz Moro', 'Tostones', 'Mojo Ajo', 'Cebollitas'].map((side, i) => (
              <span
                key={i}
                className="rounded-md bg-[#FAF8F5] border border-[#EAE5DC] px-2 py-0.5 text-[10px] font-semibold text-[#1C1917]"
              >
                +{side}
              </span>
            ))}
          </div>
        </div>

        {/* Sello Circular Giratorio estilo CRAV sobrepuesto */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-5 -right-4 z-30 hidden sm:flex h-22 w-22 items-center justify-center rounded-full bg-[#D95327] text-white p-2 text-center shadow-lg border-2 border-white select-none"
          style={{ transform: 'translateZ(60px)' }}
        >
          <div className="font-sans text-[8px] font-black uppercase tracking-widest leading-tight">
            ★ AUTÉNTICO ★ SABOR MIAMI
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default HeroProductCard;
