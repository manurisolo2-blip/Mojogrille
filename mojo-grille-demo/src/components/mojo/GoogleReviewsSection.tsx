"use client";

import React from "react";
import { Star, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

export interface GoogleReviewItem {
  id: string;
  title: string;
  description?: string;
  imageSrc?: string;
  href?: string;
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
  const [activeIndex, setActiveIndex] = React.useState(0);
  const active = GOOGLE_REVIEWS[activeIndex] ?? GOOGLE_REVIEWS[0]!;

  const goPrev = () =>
    setActiveIndex((i) => (i === 0 ? GOOGLE_REVIEWS.length - 1 : i - 1));
  const goNext = () =>
    setActiveIndex((i) => (i === GOOGLE_REVIEWS.length - 1 ? 0 : i + 1));

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
  };

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

        {/*
          Bloque 60/40. Antes era un mazo de tarjetas 3D: seis rectángulos del
          mismo tamaño barajados, que tras quitarles borde y sombra perdieron
          la separación que hacía legible la pila. Ahora una foto vertical
          grande a la izquierda y el testimonio a la derecha, con proporción y
          alturas distintas de las otras dos secciones de foto.
        */}
        <div
          role="group"
          aria-roledescription="carousel"
          aria-label="Guest testimonials"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
        >
          {/* Retrato del plato: vertical, al contrario que el resto del sitio */}
          <div className="lg:col-span-7">
            <div className="relative w-full overflow-hidden aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5]">
              {active.imageSrc ? (
                <img
                  key={active.id}
                  src={active.imageSrc}
                  alt={active.dish}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-center"
                />
              ) : null}
            </div>
          </div>

          {/* Testimonio */}
          <div className="lg:col-span-5 flex flex-col">
            <div aria-live="polite">
              <span className="sr-only">
                Testimonial {activeIndex + 1} of {GOOGLE_REVIEWS.length}
              </span>

              <div className="flex items-center gap-1 text-mojo-citrus" aria-hidden="true">
                {[...Array(active.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <span className="sr-only">{active.rating} out of 5 stars</span>

              <blockquote className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-charcoal-ink leading-[0.95]">
                &ldquo;{active.content}&rdquo;
              </blockquote>

              <p className="mt-6 font-sans text-base font-bold text-charcoal-ink">
                {active.author}
              </p>
              <p className="font-sans text-sm text-charcoal-ink/70">
                {active.dish} &middot; Dine-in / Takeout
              </p>
            </div>

            {/* Paginación */}
            <div className="mt-10 flex items-center gap-5">
              <span
                aria-hidden="true"
                className="font-display text-4xl text-charcoal-ink tabular-nums leading-none"
              >
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span aria-hidden="true" className="h-px w-10 bg-charcoal-ink/30" />
              <span
                aria-hidden="true"
                className="font-sans text-sm text-charcoal-ink/60 tabular-nums"
              >
                {String(GOOGLE_REVIEWS.length).padStart(2, "0")}
              </span>

              <div className="ml-auto flex items-center gap-2">
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Previous testimonial"
                  className="grid h-11 w-11 place-items-center text-charcoal-ink hover:text-brand-fire transition-colors cursor-pointer"
                >
                  <ChevronLeft className="h-6 w-6" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next testimonial"
                  className="grid h-11 w-11 place-items-center text-charcoal-ink hover:text-brand-fire transition-colors cursor-pointer"
                >
                  <ChevronRight className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
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
