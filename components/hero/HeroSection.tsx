'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HeroProductCard } from './HeroProductCard';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] pt-8 pb-16 sm:pt-14 sm:pb-24 lg:pt-18 lg:pb-32">
      {/* Destellos / Gradientes Circulares Difuminados en Bordes (Cítrico y Naranja) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-20 h-96 w-96 rounded-full bg-[#4D7C0F]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 -right-24 h-[450px] w-[450px] rounded-full bg-[#D95327]/12 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-1/3 h-80 w-80 rounded-full bg-[#F59E0B]/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Columna Izquierda: Copy, Tipografía y CTA (7 columnas en desktop) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* Pill superior de procedencia */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#EAE5DC] bg-white px-4 py-1.5 shadow-xs">
              <span className="h-2 w-2 rounded-full bg-[#4D7C0F] animate-pulse" />
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#1C1917]">
                Authentic Cuban Kitchen • Miami, FL
              </span>
            </div>

            {/* Título de gran escala con palabras clave acentuadas */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1C1917] leading-[1.12]">
              El Auténtico Sabor Criollo de Miami,{' '}
              <span className="relative inline-block text-[#D95327]">
                Marinado
                {/* Subrayado orgánico sutil */}
                <svg
                  className="absolute -bottom-1 left-0 w-full text-[#D95327]/30"
                  viewBox="0 0 100 8"
                  preserveAspectRatio="none"
                  height="6"
                >
                  <path d="M0 5 Q 50 0, 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </span>{' '}
              a la{' '}
              <span className="text-[#4D7C0F]">Perfección</span>.
            </h1>

            {/* Subtítulo ágil con ingredientes destacados */}
            <p className="mx-auto lg:mx-0 max-w-2xl font-sans text-base sm:text-lg text-[#78716C] leading-relaxed">
              Bowls artesanales y sándwiches cubanos prensados al momento. Carne marinada 24 horas en cítricos naturales, ajo criollo y orégano fresco, acompañada de tostones dorados crujientes.
            </p>

            {/* Contenedor de Stickers Flotantes con rotación estilo CRAV */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 select-none">
              {/* Badge 1: Rotado -3deg, fondo blanco, borde tenue, icono de estrella */}
              <motion.div
                whileHover={{ scale: 1.06, rotate: 0 }}
                className="-rotate-3 transition-transform duration-300 animate-float rounded-2xl border border-[#EAE5DC] bg-white px-4 py-2.5 shadow-sm shadow-[#1C1917]/5 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[#F59E0B] text-lg">⭐</span>
                  <div className="text-left">
                    <p className="font-sans text-xs font-black text-[#1C1917] leading-tight">
                      4.7 en 3K+ Reviews
                    </p>
                    <p className="font-sans text-[10px] text-[#78716C]">
                      Google & UberEats Miami
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Badge 2: Rotado 3deg, fondo verde fresco (#4D7C0F), texto blanco */}
              <motion.div
                whileHover={{ scale: 1.06, rotate: 0 }}
                className="rotate-3 transition-transform duration-300 animate-float-reverse rounded-2xl bg-[#4D7C0F] px-4 py-2.5 text-white shadow-md shadow-[#4D7C0F]/20 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">🌿</span>
                  <div className="text-left">
                    <p className="font-sans text-xs font-black text-white leading-tight">
                      100% Fresh Daily
                    </p>
                    <p className="font-sans text-[10px] text-white/80">
                      Hecho Al Momento
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Botones de Acción */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              {/* Botón principal: "Explorar Menú" con rebote suave y flecha deslizante */}
              <motion.a
                href="#menu"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-[#D95327] px-8 py-4 font-sans text-base font-bold text-white shadow-lg shadow-[#D95327]/30 transition-all duration-300 hover:bg-[#B83E16] hover:shadow-xl hover:shadow-[#D95327]/40"
              >
                <span>Explorar Menú</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 font-bold">
                  →
                </span>
              </motion.a>

              {/* Botón secundario suave */}
              <motion.a
                href="#catering"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-[#EAE5DC] bg-white px-7 py-4 font-sans text-base font-semibold text-[#1C1917] shadow-xs transition-all duration-200 hover:bg-[#FAF8F5] hover:border-[#D95327]/40 hover:text-[#D95327]"
              >
                <span>Pedir Catering</span>
              </motion.a>
            </div>

            {/* Social Proof Strip inferior */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-3 text-xs text-[#78716C]">
              <div className="flex -space-x-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#D95327] text-[10px] font-bold text-white border-2 border-white">
                  LH
                </span>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#4D7C0F] text-[10px] font-bold text-white border-2 border-white">
                  BR
                </span>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#F59E0B] text-[10px] font-bold text-white border-2 border-white">
                  DO
                </span>
              </div>
              <p className="font-sans font-medium">
                Disponible en <strong className="text-[#1C1917]">Little Havana</strong>, <strong className="text-[#1C1917]">Brickell</strong> y <strong className="text-[#1C1917]">Doral</strong>.
              </p>
            </div>

          </div>

          {/* Columna Derecha: Composición de Producto Central con Tarjeta 3D (5 columnas en desktop) */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <HeroProductCard
              imageSrc="/assets/mojo-bowl-ropa-vieja.jpg"
              title="Signature Mojo Bowl • Ropa Vieja Criolla"
              category="Top Seller #1 en Miami"
              price="$15.50"
              calories="480 kcal"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

export default HeroSection;
