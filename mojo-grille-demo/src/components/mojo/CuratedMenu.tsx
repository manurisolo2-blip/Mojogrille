import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { Plus } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { MagneticButton } from "./MagneticButton";
import { TapeLabel } from "./TapeLabel";

export interface CuratedMenuItem {
  id: string;
  name: string;
  price: number;
  protein?: string;
  feature: string;
  calories?: string;
  cookTime?: string;
  description: string;
  imageUrl: string;
  authorNote?: string;
  techSpecs?: string;
}

export const CURATED_ITEMS: CuratedMenuItem[] = [
  {
    id: "mojo-pork-bowl",
    name: "Mojo Pork Bowl",
    price: 13.5,
    feature: "4h Braised",
    description:
      "Slow-roasted pork shoulder braised for 4 hours in Seville citrus mojo, served over moro rice and plancha-caramelized sweet onions.",
    imageUrl: "/assets/mojo-bowl-ropa-vieja.jpg",
    authorNote: "slow-roasted pernil & caramelized onions",
  },
  {
    id: "classic-cubano-press",
    name: "Classic Cubano Press",
    price: 12.95,
    feature: "Plancha Crunch",
    description:
      "Pressed Cuban bread with toasted butter, slow-roasted lechón, sweet smoked ham, melted Swiss, crisp pickles & yellow mustard.",
    imageUrl: "/assets/mojo-cubano.jpg",
    authorNote: "crispy golden crust & sweet ham fold",
  },
  {
    id: "picadillo-meltadilla",
    name: "Picadillo Meltadilla",
    price: 11.5,
    feature: "Queso Fundido",
    description:
      "Ground beef seasoned with Cuban sofrito, Spanish olives & sweet peppers, plancha-pressed with melted Swiss cheese and garlic mojo.",
    imageUrl: "/assets/mojo-cubano.jpg",
    authorNote: "seasoned ground beef & melted swiss",
  },
  {
    id: "loaded-pork-tostones",
    name: "Loaded Pork Tostones",
    price: 10.75,
    feature: "Doble Fritura",
    description:
      "Handcrafted double-fried crispy green plantain tostones, topped with mojo roasted pernil, caramelized onions & fresh cilantro.",
    imageUrl: "/assets/mojo-tostones.jpg",
    authorNote: "double-fried plantain & crushed garlic",
  },
  {
    id: "chicken-fresco-bowl",
    name: "Chicken Fresco Bowl",
    price: 13.0,
    feature: "Pechuga Marinada",
    description:
      "Tender plancha-grilled chicken breast marinated 24 hours in sour orange & garlic, served with white rice, black beans & Hass avocado.",
    imageUrl: "/assets/mojo-pollo-bowl.jpg",
    authorNote: "24h citrus mojo & grilled hass avocado",
  },
  {
    id: "pepper-steak-platter",
    name: "Pepper Steak Platter",
    price: 14.5,
    feature: "Salteado Criollo",
    description:
      "Tender beef strips wok-seared over live flame with peppers and onions in rich criollo sofrito reduction, served with yuca con mojo.",
    imageUrl: "/assets/mojo-bowl-ropa-vieja.jpg",
    authorNote: "flame-seared wok beef & tender yuca",
  },
];

export function CuratedMenu() {
  const addItem = useCartStore((state) => state.addItem);
  const [activeItem, setActiveItem] = useState<CuratedMenuItem>(CURATED_ITEMS[0]!);
  const [isHovering, setIsHovering] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);
  const xTo = useRef<((value: number) => void) | null>(null);
  const yTo = useRef<((value: number) => void) | null>(null);

  useEffect(() => {
    if (!previewRef.current || typeof window === "undefined") return;

    // quickTo para seguimiento fluido del cursor a 60fps sin tirones
    xTo.current = gsap.quickTo(previewRef.current, "x", { duration: 0.35, ease: "power3.out" });
    yTo.current = gsap.quickTo(previewRef.current, "y", { duration: 0.35, ease: "power3.out" });
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (xTo.current && yTo.current) {
      const previewWidth = 320;
      const previewHeight = 220;
      let targetX = e.clientX + 28;
      // Invertir posición si el cursor está cerca del borde derecho del viewport
      if (typeof window !== "undefined" && targetX + previewWidth > window.innerWidth - 24) {
        targetX = e.clientX - previewWidth - 28;
      }
      const targetY = e.clientY - previewHeight / 2;

      xTo.current(targetX);
      yTo.current(targetY);
    }
  };

  const handleRowMouseEnter = (item: CuratedMenuItem, e: React.MouseEvent) => {
    setActiveItem(item);
    if (previewRef.current) {
      if (!isHovering) {
        const previewWidth = 320;
        const previewHeight = 220;
        let startX = e.clientX + 28;
        if (typeof window !== "undefined" && startX + previewWidth > window.innerWidth - 24) {
          startX = e.clientX - previewWidth - 28;
        }
        const startY = e.clientY - previewHeight / 2;
        gsap.set(previewRef.current, { x: startX, y: startY });
      }
      setIsHovering(true);
      gsap.to(previewRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  const handleMouseLeaveList = () => {
    setIsHovering(false);
    if (previewRef.current) {
      gsap.to(previewRef.current, {
        opacity: 0,
        scale: 0.88,
        duration: 0.25,
        ease: "power2.in",
        overwrite: "auto",
      });
    }
  };

  const handleAddToCart = (item: CuratedMenuItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.imageUrl,
      imageUrl: item.imageUrl,
      quantity: 1,
    });
  };

  return (
    <section
      id="curated-menu"
      aria-label="Hot Plancha Selection - Mojo Grille Signature Dishes"
      className="relative bg-transparent py-16 sm:py-24 border-b border-charcoal-ink/20 select-none overflow-hidden"
    >
      {/* Miniatura Fotográfica Flotante al Cursor (Solo Desktop) */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-50 hidden lg:flex flex-col overflow-hidden rounded-none border-2 border-charcoal-ink bg-surface-sand shadow-none opacity-0 w-80 h-52 select-none will-change-transform"
        style={{ transform: "translate3d(-9999px, -9999px, 0)" }}
      >
        <div className="relative h-full w-full overflow-hidden bg-surface-sand">
          <img
            src={activeItem.imageUrl}
            alt={activeItem.name}
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-ink/90 via-transparent to-charcoal-ink/20" />
          
          {/* Metadato superior de previsualización */}
          <div className="absolute top-2.5 left-3 flex items-center">
            <span className="font-mono text-[9px] uppercase tracking-widest text-cream-bg bg-charcoal-ink px-2 py-0.5 border border-cream-bg/20 font-bold">
              MADE AL MOMENTO // FRESH
            </span>
          </div>

          {/* Nombre y etiqueta de autor inferior */}
          <div className="absolute bottom-2.5 left-3 right-3 flex flex-col leading-tight">
            <span className="font-display text-lg uppercase tracking-tight text-cream-bg font-black">
              {activeItem.name}
            </span>
            <span className="font-accent font-serif italic text-xs text-brand-fire lowercase">
              {activeItem.authorNote}
            </span>
          </div>
        </div>
      </div>

      {/* Encabezado Editorial Monumental */}
      <div className="mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 text-center">
        {/* Metadato Técnico de Catálogo */}
        <div className="font-mono text-[11px] uppercase tracking-widest text-charcoal-ink/70 mb-2">
          CATALOG_REV. 2026 // BATCH NO. 14
        </div>

        {/* Badge Superior Tipo Sello Editorial */}
        <div className="inline-flex items-center gap-2 rounded-none border border-charcoal-ink/20 bg-surface-sand px-3.5 py-1 text-[11px] font-sans font-bold uppercase tracking-widest text-charcoal-ink mb-4">
          <span className="h-1.5 w-1.5 rounded-none bg-brand-fire" aria-hidden="true" />
          <span>Signature Dishes · Hot Plancha</span>
        </div>

        {/* Título Monumental & Subtítulo Editorial */}
        <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tight text-charcoal-ink leading-none">
          HOT PLANCHA SELECTION
        </h2>
        <p className="mt-2 sm:mt-3 font-accent italic text-brand-fire text-2xl md:text-3xl lowercase tracking-normal">
          made al momento, seasoned with mojo
        </p>
      </div>

      {/* Listado Dividido Horizontal (Split Rows) */}
      <div
        className="mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-8"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeaveList}
      >
        <div className="border-t border-charcoal-ink/20 w-full bg-transparent">
          {CURATED_ITEMS.map((item, index) => (
            <div
              key={item.id}
              onMouseEnter={(e) => handleRowMouseEnter(item, e)}
              onClick={() => handleAddToCart(item)}
              className="border-b border-charcoal-ink/20 py-7 md:py-8 px-4 sm:px-6 flex flex-col md:flex-row md:items-center justify-between group transition-colors duration-300 hover:bg-surface-sand/60 relative cursor-pointer gap-4 md:gap-6"
            >
              {/* Izquierda: Código mono + Nombre del plato font-display + Etiqueta de autor en cursiva */}
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-5 lg:w-[42%]">
                <div className="flex items-center gap-2.5 shrink-0">
                  <span className="font-mono text-xs sm:text-sm text-charcoal-ink/60 uppercase tracking-widest font-bold">
                    [ITEM {String(index + 1).padStart(2, "0")}]
                  </span>
                  {index === 0 && (
                    <TapeLabel className="scale-90 origin-left">
                      CHEF&apos;S SIGNATURE // #001
                    </TapeLabel>
                  )}
                </div>

                <div className="flex flex-col">
                  <h3 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-charcoal-ink group-hover:text-brand-fire transition-colors duration-200 leading-none">
                    {item.name}
                  </h3>
                  <span className="font-accent font-serif italic text-sm sm:text-base lowercase text-charcoal-ink/60 mt-1.5 group-hover:text-charcoal-ink/90 transition-colors">
                    {item.authorNote}
                  </span>
                </div>
              </div>

              {/* Miniatura fija visible únicamente en móviles (md:hidden) */}
              <div className="flex md:hidden items-center gap-3 my-1">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-16 h-16 object-cover border border-charcoal-ink/20 shrink-0"
                  loading="lazy"
                />
                <p className="font-sans text-xs text-charcoal-ink/75 line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Centro: Descripción sensorial criolla (En escritorio) */}
              <div className="hidden md:flex items-center lg:w-[32%] px-2">
                <p className="font-sans text-xs sm:text-[13px] text-charcoal-ink/75 leading-relaxed text-left line-clamp-2 group-hover:text-charcoal-ink transition-colors">
                  {item.description}
                </p>
              </div>

              {/* Derecha: Precio en gran escala y botón de corte limpio + ADD */}
              <div className="flex items-center justify-between md:justify-end gap-5 sm:gap-6 lg:w-[28%]">
                <span className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-charcoal-ink group-hover:text-brand-fire transition-colors duration-200 shrink-0">
                  ${item.price.toFixed(2)}
                </span>
                <MagneticButton
                  as="button"
                  type="button"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    handleAddToCart(item);
                  }}
                  className="px-4 py-2 sm:px-5 sm:py-2.5 font-sans font-bold uppercase tracking-wider text-xs sm:text-sm bg-charcoal-ink text-cream-bg group-hover:bg-brand-fire transition-colors duration-200 rounded-none border border-charcoal-ink flex items-center gap-1.5 cursor-pointer shrink-0"
                  aria-label={`Add ${item.name} to order for $${item.price.toFixed(2)}`}
                >
                  <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[3]" aria-hidden="true" />
                  <span>
                    {item.id.includes("bowl")
                      ? "GRAB THIS BOWL"
                      : item.id.includes("tostones")
                        ? "ORDER HOT"
                        : "FROM THE PLANCHA"}
                  </span>
                </MagneticButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CuratedMenu;
