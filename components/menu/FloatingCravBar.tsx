'use client';

import React, { useState, useEffect } from "react";
import { useCartStore } from "../../store/useCartStore";

export interface FloatingCravBarProps {
  itemCount?: number;
  total?: number;
  onOrderClick?: () => void;
  whatsappNumber?: string;
}

export function FloatingCravBar({
  itemCount: propItemCount,
  total: propTotal,
  onOrderClick,
  whatsappNumber = "+13055550123",
}: FloatingCravBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { getItemCount, getSubtotal, openCart } = useCartStore();

  const storeCount = getItemCount();
  const storeTotal = getSubtotal();

  const effectiveCount = propItemCount !== undefined ? propItemCount : (storeCount > 0 ? storeCount : 1);
  const effectiveTotal = propTotal !== undefined ? propTotal : (storeTotal > 0 ? storeTotal : 15.5);

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
      openCart();
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
      <div className="flex items-center justify-between gap-3 rounded-none bg-charcoal-ink p-3 pl-4 text-cream-bg shadow-none border-2 border-charcoal-ink">
        {/* Lado Izquierdo: Contador y Total */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-none bg-charcoal-ink/90 border border-cream-bg/20">
            <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-none bg-leaf-green px-1 font-sans text-[10px] font-black text-cream-bg border border-charcoal-ink">
              {effectiveCount}
            </span>
          </div>

          <div className="flex flex-col text-left">
            <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-cream-bg/70">
              Estimated Total
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-cream-bg leading-tight">
              ${effectiveTotal.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Lado Derecho: Botón Rojo Mojo Scarlet */}
        <button
          type="button"
          onClick={handleOrder}
          className="group flex items-center justify-center gap-2 rounded-none border-2 border-brand-fire bg-brand-fire px-5 py-3 font-sans text-sm font-bold text-cream-bg shadow-none transition-colors duration-150 hover:bg-cream-bg hover:text-charcoal-ink focus:outline-none"
        >
          <span>Order Now</span>
          <span className="font-bold text-base transition-transform group-hover:translate-x-1">
            ➔
          </span>
        </button>
      </div>
    </div>
  );
}

export default FloatingCravBar;
