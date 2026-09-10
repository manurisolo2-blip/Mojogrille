import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { Plus } from "lucide-react";
import { useCart } from "./cart";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { MagneticButton } from "./MagneticButton";
import { RebelChefBadge } from "./RebelChefBadge";

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

const CURATED_ITEMS: CuratedMenuItem[] = [
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
  const { add } = useCart();
  const [activeItem, setActiveItem] = useState<CuratedMenuItem>(CURATED_ITEMS[0]!);
  const [isHovering, setIsHovering] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);
  const xTo = useRef<((value: number) => void) | null>(null);
  const yTo = useRef<((value: number) => void) | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!previewRef.current || typeof window === "undefined") return;

    // La miniatura de 320x220 persiguiendo al cursor es movimiento no
    // solicitado: con prefers-reduced-motion no se engancha el seguimiento.
    if (reducedMotion) {
      xTo.current = null;
      yTo.current = null;
      gsap.set(previewRef.current, { autoAlpha: 0 });
      return;
    }

    // quickTo para seguimiento fluido del cursor a 60fps sin tirones
    xTo.current = gsap.quickTo(previewRef.current, "x", { duration: 0.35, ease: "power3.out" });
    yTo.current = gsap.quickTo(previewRef.current, "y", { duration: 0.35, ease: "power3.out" });
  }, [reducedMotion]);

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
    if (reducedMotion) return;
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
    add({
      itemId: item.id,
      name: item.name,
      price: item.price,
      sides: [],
    });
  };

  return (
    <section
      id="curated-menu"
      aria-label="Hot Plancha Selection - Mojo Grille Signature Dishes"
      className="relative bg-brand-fire py-16 sm:py-24 overflow-hidden"
    >
      {/* Miniatura Fotográfica Flotante al Cursor (Solo Desktop) */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-50 hidden lg:flex flex-col overflow-hidden rounded-none bg-charcoal-ink opacity-0 w-80 h-52 select-none will-change-transform"
        style={{ transform: "translate3d(-9999px, -9999px, 0)" }}
      >
        <div className="relative h-full w-full overflow-hidden bg-charcoal-ink">
          <img
            src={activeItem.imageUrl}
            alt={activeItem.name}
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-ink/90 via-transparent to-charcoal-ink/30" />
          
          {/* Metadato superior de previsualización */}
          <div className="absolute top-2.5 left-3 flex items-center">
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-cream-bg bg-brand-fire px-2 py-0.5">
              MADE AL MOMENTO 100% FRESH
            </span>
          </div>

          {/* Nombre y etiqueta de autor inferior */}
          <div className="absolute bottom-2.5 left-3 right-3 flex flex-col leading-tight">
            <span className="font-display text-lg uppercase tracking-tight text-cream-bg font-black">
              {activeItem.name}
            </span>
            <span className="font-sans font-bold uppercase text-xs tracking-wider text-mojo-citrus">
              {activeItem.authorNote}
            </span>
          </div>
        </div>
      </div>

      {/* Encabezado Editorial Monumental */}
      <div className="mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 text-center">
        {/* Título Monumental & Subtítulo Editorial */}
        <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tight text-cream-bg leading-none">
          HOT PLANCHA SELECTION
        </h2>
        {/*
          Era text-mojo-citrus: 3.10:1 sobre el rojo, por debajo del 4.5:1 que
          pide este tamaño. El ámbar sólo aguanta aquí en display de 24px o más.
        */}
        <p className="mt-2 sm:mt-3 font-sans text-sm font-bold uppercase tracking-[0.18em] text-cream-bg">
          MADE AL MOMENTO SEASONED WITH MOJO
        </p>
      </div>

      {/* Listado Dividido Horizontal (Split Rows) */}
      <div
        className="mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-8"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeaveList}
      >
        <div className="w-full bg-transparent">
          {CURATED_ITEMS.map((item, index) => (
            <div
              key={item.id}
              onMouseEnter={(e) => handleRowMouseEnter(item, e)}
              className="border-b border-cream-bg/20 py-7 md:py-8 px-4 sm:px-6 flex flex-col md:flex-row md:items-center justify-between group transition-colors duration-300 hover:bg-black/15 relative gap-4 md:gap-6"
            >
              {/*
                La fila ya no añade al carrito al hacer clic. Era un <div
                onClick> sin role ni tabIndex: inalcanzable con teclado, y un
                clic en cualquier hueco de la fila metía el plato en el pedido
                sin confirmación. El botón dedicado de la derecha ya hace eso, y
                es un control real.
              */}
              {/* Izquierda: Nombre del plato font-display + Badge Rebelde de Chef (Item 01) + Subtítulo con mayor grosor */}
              <div className="flex flex-col gap-1.5 lg:w-[40%]">
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                  <h3 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-cream-bg group-hover:text-mojo-citrus transition-colors duration-200 leading-none">
                    {item.name}
                  </h3>
                  {index === 0 && (
                    <RebelChefBadge />
                  )}
                </div>
                <span className="font-sans text-sm font-bold uppercase tracking-wider text-cream-bg mt-0.5 leading-snug">
                  {item.authorNote}
                </span>
              </div>

              {/* Miniatura fija visible únicamente en móviles (md:hidden) */}
              <div className="flex md:hidden items-center gap-3 my-1">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-16 h-16 object-cover shrink-0"
                  loading="lazy"
                />
                <p className="font-sans text-base text-cream-bg line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Centro: Descripción sensorial criolla (En escritorio) */}
              <div className="hidden md:flex items-center lg:w-[32%] px-2">
                <p className="font-sans text-base text-cream-bg leading-relaxed text-left line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Derecha: Precio en gran escala y botón de corte limpio con anchos balanceados y alineación uniforme */}
              <div className="flex items-center justify-between md:justify-end gap-3 sm:gap-6 w-full md:w-[30%] shrink-0 mt-1 md:mt-0">
                <span className="text-left md:text-right font-display text-2xl sm:text-4xl font-bold tracking-tight text-cream-bg group-hover:text-mojo-citrus transition-colors duration-200 shrink-0 tabular-nums">
                  ${item.price.toFixed(2)}
                </span>
                <MagneticButton
                  as="button"
                  type="button"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    handleAddToCart(item);
                  }}
                  className="flex-1 sm:flex-none sm:w-48 h-11 px-3 sm:px-4 font-sans font-bold uppercase tracking-wider text-sm bg-cream-bg text-brand-fire hover:bg-charcoal-ink hover:text-cream-bg transition-colors duration-200 rounded-none flex items-center justify-center gap-1.5 cursor-pointer shrink-0 select-none"
                  aria-label={`Add ${item.name} to order for $${item.price.toFixed(2)}`}
                >
                  <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[3]" aria-hidden="true" />
                  <span className="truncate">
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
