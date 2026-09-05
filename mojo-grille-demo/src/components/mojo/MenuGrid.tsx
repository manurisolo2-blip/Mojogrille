import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Plus } from "lucide-react";
import { currency, type MenuItem } from "@/data/menu";

export function MenuGrid({
  items,
  onSelect,
}: {
  items: MenuItem[];
  onSelect: (item: MenuItem) => void;
}) {
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

  const handleMouseEnter = (item: MenuItem, e: React.MouseEvent) => {
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

  const handleMouseMove = (e: React.MouseEvent) => {
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

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <div className="flex flex-col border-t border-[#1C1917]/15 w-full">
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
                src={hoveredItem.image}
                alt={hoveredItem.name}
                loading="lazy"
                className="h-full w-full object-cover object-center"
              />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {items.map((item) => (
        <article
          key={item.id}
          onMouseEnter={(e) => handleMouseEnter(item, e)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => onSelect(item)}
          className="group relative flex flex-col justify-center border-b border-[#1C1917]/15 py-6 sm:py-7 px-2 sm:px-4 transition-colors duration-200 hover:bg-surface-sand/50 cursor-pointer select-none"
        >
          {/* Fila Horizontal: Nombre del plato en caja alta y Precio en tipografía monoespaciada */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-6 w-full">
            <div className="flex items-baseline gap-3 flex-wrap">
              <button
                type="button"
                onClick={() => onSelect(item)}
                aria-label={`View details for ${item.name}`}
                className="text-left focus:outline-none"
              >
                <h3 className="font-display text-3xl font-bold uppercase tracking-tight text-charcoal-ink group-hover:text-brand-fire transition-colors">
                  {item.name}
                </h3>
              </button>
              {item.badge && (
                <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-brand-fire">
                  {item.badge}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0">
              <span className="font-mono text-2xl font-bold text-charcoal-ink tracking-tight">
                {currency(item.price)}
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(item);
                }}
                aria-label={`Personalizar / Añadir ${item.name} (Add)`}
                className="relative inline-flex items-center gap-1.5 rounded-none px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider border border-charcoal-ink bg-charcoal-ink text-cream-bg group-hover:bg-brand-fire group-hover:border-brand-fire transition-colors cursor-pointer select-none"
              >
                <Plus className="h-3.5 w-3.5 stroke-[3]" />
                <span>{item.sidesAllowed ? "Customize" : "Add"}</span>
              </button>
            </div>
          </div>

          {/* Descripción de los ingredientes en una línea fina debajo */}
          <p className="mt-2 font-sans text-xs sm:text-sm text-charcoal-ink/75 leading-relaxed max-w-3xl">
            {item.description}
          </p>
        </article>
      ))}
    </div>
  );
}

export default MenuGrid;
