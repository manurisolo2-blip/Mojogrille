"use client";

import React from "react";
import { Star, ExternalLink } from "lucide-react";
import { CardStack, type CardStackItem } from "@/components/ui/card-stack";

export interface GoogleReviewItem extends CardStackItem {
  author: string;
  rating: number;
  dish: string;
  content: string;
  initials: string;
  avatarBg: string;
}

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/Mojo+Grille+Cuban+Kitchen/@25.8231985,-80.2430227,17z/data=!3m1!5s0x88d9b0dba01bba4f:0x7eb1c5ecaaf581ac!4m8!3m7!1s0x88d9b1962e47381b:0x801c01a9757d037c!8m2!3d25.8231937!4d-80.2404478!9m1!1b1!16s%2Fg%2F11tjhpc09g?entry=ttu";

const GOOGLE_REVIEWS: GoogleReviewItem[] = [
  {
    id: "review-1",
    title: "Carlos Morales",
    description:
      "The lechón asado bowl and yuca fries are incredible. Real deal Cuban mojo flavor, juicy and tender. Best quick lunch in Miami!",
    imageSrc: "/assets/mojo-tostones.jpg",
    href: GOOGLE_MAPS_URL,
    author: "Carlos Morales",
    rating: 5,
    dish: "Lechón Asado Bowl & Yuca Fries",
    content:
      "The lechón asado bowl and yuca fries are incredible. Real deal Cuban mojo flavor, juicy and tender. Best quick lunch in Miami!",
    initials: "CM",
    avatarBg: "bg-brand-fire",
  },
  {
    id: "review-2",
    title: "Stephanie Rodriguez",
    description:
      "Best Cuban sandwich in the area! Pressed hot on the plancha, crisp bread with the right balance of mustard and pickles. You can taste the slow-roasted pork marinade.",
    imageSrc: "/assets/mojo-cubano.jpg",
    href: GOOGLE_MAPS_URL,
    author: "Stephanie Rodriguez",
    rating: 5,
    dish: "Classic Cubano Sandwich",
    content:
      "Best Cuban sandwich in the area! Pressed hot on the plancha, crisp bread with the right balance of mustard and pickles. You can taste the slow-roasted pork marinade.",
    initials: "SR",
    avatarBg: "bg-charcoal-ink",
  },
  {
    id: "review-3",
    title: "David Chen",
    description:
      "Ordered catering for 35 people at our office in Doral. Delivery was on point, portions were generous, and the mojo chicken mojo rice disappeared in minutes.",
    imageSrc: "/assets/mojo-catering.jpg",
    href: GOOGLE_MAPS_URL,
    author: "David Chen",
    rating: 5,
    dish: "Corporate Mojo Catering Box",
    content:
      "Ordered catering for 35 people at our office in Doral. Delivery was on point, portions were generous, and the mojo chicken mojo rice disappeared in minutes.",
    initials: "DC",
    avatarBg: "bg-charcoal-ink",
  },
  {
    id: "review-4",
    title: "Elena Vazquez",
    description:
      "The maduros and black beans taste just like abuela used to make them. True authentic criollo comfort food without cutting corners.",
    imageSrc: "/assets/mojo-bowl-ropa-vieja.jpg",
    href: GOOGLE_MAPS_URL,
    author: "Elena Vazquez",
    rating: 5,
    dish: "Sweet Maduros & Black Beans",
    content:
      "The maduros and black beans taste just like abuela used to make them. True authentic criollo comfort food without cutting corners.",
    initials: "EV",
    avatarBg: "bg-leaf-green",
  },
  {
    id: "review-5",
    title: "Marcus Brody",
    description:
      "The Garlic Mojo crunch on the pork is unreal. Great music, quick counter service, and ice-cold Materva. A must-stop spot in Miami.",
    imageSrc: "/assets/mojo-pollo-bowl.jpg",
    href: GOOGLE_MAPS_URL,
    author: "Marcus Brody",
    rating: 5,
    dish: "Garlic Mojo Pork Plate",
    content:
      "The Garlic Mojo crunch on the pork is unreal. Great music, quick counter service, and ice-cold Materva. A must-stop spot in Miami.",
    initials: "MB",
    avatarBg: "bg-brand-fire",
  },
  {
    id: "review-6",
    title: "Maria K.",
    description:
      "Unbelievable quality for the price. Fresh ingredients, no corporate taste. Real live-fire Cuban food that Miami-Dade should be proud of.",
    imageSrc: "/assets/mojo-cafecito.jpg",
    href: GOOGLE_MAPS_URL,
    author: "Maria K.",
    rating: 5,
    dish: "Housemade Flan & Cortadito",
    content:
      "Unbelievable quality for the price. Fresh ingredients, no corporate taste. Real live-fire Cuban food that Miami-Dade should be proud of.",
    initials: "MK",
    avatarBg: "bg-leaf-green",
  },
];

export function GoogleReviewsSection() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      id="reviews"
      aria-label="What Miami guests say about Mojo Grille"
      className="relative w-full bg-transparent py-16 sm:py-24 overflow-hidden"
    >
      <div className="relative mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado Principal de Reseñas */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-charcoal-ink leading-none">
              WHAT <span className="text-brand-fire">MIAMI</span> SAYS
            </h2>
            <p className="mt-3 font-sans text-base text-charcoal-ink/80 leading-relaxed">
              Testimonials from local diners, neighbors, and corporate teams savoring live-fire mojo cooking every day. Our full public rating lives on Google Maps.
            </p>
          </div>

          {/* Tarjeta Resumen de Calificación Google Incorporada al Fondo */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 shrink-0">
            <div className="flex items-center gap-3.5">
              <span className="font-display text-5xl sm:text-6xl font-black text-charcoal-ink leading-none">
                4.7
              </span>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-mojo-citrus">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <span className="sr-only">Average rating 4.7 out of 5 stars</span>
                <span className="font-sans text-sm font-bold text-charcoal-ink mt-1">
                  +3,000 ratings in Miami
                </span>
                <span className="font-sans text-xs text-charcoal-ink/60 uppercase tracking-wider">
                  Google &amp; Miami Delivery
                </span>
              </div>
            </div>

            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 bg-charcoal-ink hover:bg-brand-fire text-cream-bg text-xs font-bold uppercase tracking-wider px-5 py-2.5 transition-colors group cursor-pointer"
            >
              <span>SEE ON MAPS</span>
              <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* 3D CardStack Integrado */}
        <div className="relative w-full py-4 overflow-hidden">
            <CardStack
              items={GOOGLE_REVIEWS}
              initialIndex={0}
              cardWidth={isMobile ? (typeof window !== "undefined" ? Math.min(320, window.innerWidth - 36) : 320) : 560}
              cardHeight={isMobile ? 310 : 340} /* sólo alto inicial: la tarjeta la marca su texto */
              overlap={isMobile ? 0.62 : 0.44}
              spreadDeg={isMobile ? 14 : 36}
              perspectivePx={1200}
              depthPx={isMobile ? 40 : 110}
              tiltXDeg={isMobile ? 4 : 8}
              activeScale={1.03}
              inactiveScale={0.93}
              autoAdvance={false}
              pauseOnHover={true}
              showDots={true}
              renderCard={(item) => {
                const review = item as GoogleReviewItem;
                return (
                  <div className="relative w-full bg-charcoal-ink flex flex-col gap-5 p-6">
                    {/* Imagen de Fondo del Plato. Conserva su propio
                        overflow-hidden: recorta la foto a la tarjeta, no el
                        texto, que ahora manda sobre el alto. */}
                    <div className="absolute inset-0 overflow-hidden">
                      {review.imageSrc ? (
                        <img
                          src={review.imageSrc}
                          alt=""
                          aria-hidden="true"
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover opacity-35"
                          draggable={false}
                        />
                      ) : null}
                    </div>

                    {/* Capas de Gradiente para Legibilidad Óptima */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-ink via-charcoal-ink/75 to-charcoal-ink/50" />

                    {/* Cabecera de la Tarjeta */}
                    <div className="relative z-10 flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {/*
                          Iniciales, no foto. Antes había retratos de Unsplash
                          de personas reales presentadas como quienes firman
                          estas opiniones.
                        */}
                        <div className="relative h-11 w-11 rounded-full overflow-hidden shrink-0 bg-charcoal-ink flex items-center justify-center">
                          <span
                            aria-hidden="true"
                            className={`h-full w-full ${review.avatarBg} text-cream-bg flex items-center justify-center font-sans font-bold text-sm uppercase`}
                          >
                            {review.initials}
                          </span>
                        </div>
                        <div>
                          <div className="font-sans font-bold text-sm text-cream-bg leading-tight">
                            {review.author}
                          </div>
                          <p className="font-sans text-xs font-medium text-cream-bg/70 mt-0.5">
                            Guest testimonial
                          </p>
                        </div>
                      </div>

                      {/*
                        La puntuación en texto para lectores de pantalla: las
                        estrellas van todas aria-hidden y sin esto la nota de
                        cada testimonio se perdía por completo.
                      */}
                      <div className="flex flex-col items-end">
                        <span className="sr-only">{review.rating} out of 5 stars</span>
                        <div className="flex items-center gap-1 text-mojo-citrus" aria-hidden="true">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Contenido Central: Plato (sin recuadros ni guiones, letra más grande en negrita) y Cita */}
                    <div className="relative z-10">
                      <h4 className="font-sans text-base sm:text-lg font-bold text-mojo-citrus leading-snug tracking-tight mb-2">
                        {review.dish}
                      </h4>
                      <p className="font-sans text-base text-cream-bg font-normal leading-relaxed">
                        &ldquo;{review.content}&rdquo;
                      </p>
                    </div>

                    {/* Pie de la Tarjeta */}
                    <div className="relative z-10 pt-3 border-t border-cream-bg/15 flex items-center justify-between gap-3 text-cream-bg/70 font-sans text-xs uppercase tracking-wider">
                      <span className="text-leaf-green-soft font-semibold">
                        Dine-in / Takeout
                      </span>

                      <a
                        href={review.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-1 text-cream-bg hover:text-mojo-citrus transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>Read reviews on Maps</span>
                        <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                );
              }}
            />
          </div>

        {/* Fila Inferior de Conversión a Google Maps */}
        <div className="mt-12 text-center">
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-3 bg-brand-fire hover:bg-charcoal-ink text-cream-bg text-sm font-bold uppercase tracking-wider px-7 py-3.5 transition-colors group cursor-pointer"
          >
            <span>WRITE A REVIEW OR READ THEM ALL ON GOOGLE MAPS</span>
            <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

      </div>
    </section>
  );
}

export default GoogleReviewsSection;
