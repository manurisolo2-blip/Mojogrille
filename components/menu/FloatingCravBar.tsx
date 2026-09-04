'use client';

import React, { useState, useEffect } from "react";

export interface FloatingCravBarProps {
  itemCount?: number;
  total?: number;
  onOrderClick?: () => void;
  whatsappNumber?: string;
}

export function FloatingCravBar({
  itemCount = 1,
  total = 15.5,
  onOrderClick,
  whatsappNumber = "+13055550123",
}: FloatingCravBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setIsVisible(scrollY > 240);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOrder = () => {
    if (onOrderClick) {
      onOrderClick();
    } else {
      window.open(
        `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=Hola%20Mojo%20Grille,%20quiero%20hacer%20un%20pedido%20al%20momento!`,
        "_blank"
      );
    }
  };

  return (
    <div
      className={`fixed bottom-4 left-4 right-4 z-50 md:hidden transition-all duration-500 ease-out transform ${
        isVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-24 opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-center justify-between gap-3 rounded-2xl bg-[#1C1917] p-3 pl-4 text-white shadow-[0_16px_36px_rgba(0,0,0,0.45)] border border-[#292524] backdrop-blur-lg">
        {/* Lado Izquierdo: Contador y Total */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-stone-800 border border-stone-700">
            <span className="text-base">🛍️</span>
            <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#4D7C0F] px-1 font-sans text-[11px] font-black text-white shadow-xs">
              {itemCount}
            </span>
          </div>

          <div className="flex flex-col text-left">
            <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-[#FAF8F5]/70">
              Total Estimado
            </span>
            <span className="font-sans text-base font-black tracking-tight text-white">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Lado Derecho: Botón Terracota */}
        <button
          type="button"
          onClick={handleOrder}
          className="group flex items-center justify-center gap-2 rounded-xl bg-[#D95327] px-5 py-3 font-sans text-sm font-bold text-white shadow-md shadow-[#D95327]/30 transition-transform duration-150 hover:bg-[#B83E16] active:scale-95 focus:outline-none"
        >
          <span>Hacer Pedido</span>
          <span className="font-bold text-base transition-transform group-hover:translate-x-1">
            ➔
          </span>
        </button>
      </div>
    </div>
  );
}

export default FloatingCravBar;
