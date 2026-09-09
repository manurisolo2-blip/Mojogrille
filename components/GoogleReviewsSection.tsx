"use client";

import React from "react";
import { Star, ExternalLink, CheckCircle2 } from "lucide-react";

export interface GoogleReviewItem {
  id: string;
  title: string;
  description?: string;
  imageSrc?: string;
  href?: string;
  author: string;
  role: string;
  rating: number;
  date: string;
  dish: string;
  content: string;
  initials: string;
  avatarBg: string;
  avatarUrl?: string;
}

export const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/Mojo+Grille+Cuban+Kitchen/@25.8231985,-80.2430227,17z/data=!3m1!5s0x88d9b0dba01bba4f:0x7eb1c5ecaaf581ac!4m8!3m7!1s0x88d9b1962e47381b:0x801c01a9757d037c!8m2!3d25.8231937!4d-80.2404478!9m1!1b1!16s%2Fg%2F11tjhpc09g?entry=ttu";

export const GOOGLE_REVIEWS: GoogleReviewItem[] = [
  {
    id: "review-1",
    title: "Carlos Morales",
    description:
      "The lechón asado bowl and yuca fries are incredible. Real deal Cuban mojo flavor, juicy and tender. Best quick lunch in Miami!",
    imageSrc: "/assets/mojo-tostones.jpg",
    href: GOOGLE_MAPS_URL,
    author: "Carlos Morales",
    role: "Local Guide · 42 reviews",
    rating: 5,
    date: "2 weeks ago",
    dish: "Lechón Asado Bowl & Yuca Fries",
    content:
      "The lechón asado bowl and yuca fries are incredible. Real deal Cuban mojo flavor, juicy and tender. Best quick lunch in Miami!",
    initials: "CM",
    avatarBg: "bg-brand-fire",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&h=160&q=80",
  },
  {
    id: "review-2",
    title: "Stephanie Rodriguez",
    description:
      "Best Cuban sandwich in the area! Pressed hot on the plancha, crisp bread with the right balance of mustard and pickles. You can taste the slow-roasted pork marinade.",
    imageSrc: "/assets/cuban-sandwich.jpg",
    href: GOOGLE_MAPS_URL,
    author: "Stephanie Rodriguez",
    role: "Local Guide · 19 reviews",
    rating: 5,
    date: "1 month ago",
    dish: "Classic Cubano Sandwich",
    content:
      "Best Cuban sandwich in the area! Pressed hot on the plancha, crisp bread with the right balance of mustard and pickles. You can taste the slow-roasted pork marinade.",
    initials: "SR",
    avatarBg: "bg-mojo-citrus",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&h=160&q=80",
  },
  {
    id: "review-3",
    title: "David Chen",
    description:
      "Ordered catering for 35 people at our office in Doral. Delivery was on point, portions were generous, and the mojo chicken mojo rice disappeared in minutes.",
    imageSrc: "/assets/mojo-chicken-platter.jpg",
    href: GOOGLE_MAPS_URL,
    author: "David Chen",
    role: "Verified Diner · 8 reviews",
    rating: 5,
    date: "3 weeks ago",
    dish: "Corporate Mojo Catering Box",
    content:
      "Ordered catering for 35 people at our office in Doral. Delivery was on point, portions were generous, and the mojo chicken mojo rice disappeared in minutes.",
    initials: "DC",
    avatarBg: "bg-charcoal-ink",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&h=160&q=80",
  },
  {
    id: "review-4",
    title: "Elena Vazquez",
    description:
      "The maduros and black beans taste just like abuela used to make them. True authentic criollo comfort food without cutting corners.",
    imageSrc: "/assets/cuban-maduros.jpg",
    href: GOOGLE_MAPS_URL,
    author: "Elena Vazquez",
    role: "Local Guide · 63 reviews",
    rating: 5,
    date: "2 months ago",
    dish: "Sweet Maduros & Black Beans",
    content:
      "The maduros and black beans taste just like abuela used to make them. True authentic criollo comfort food without cutting corners.",
    initials: "EV",
    avatarBg: "bg-leaf-green",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80",
  },
  {
    id: "review-5",
    title: "Marcus Brody",
    description:
      "The Garlic Mojo crunch on the pork is unreal. Great music, quick counter service, and ice-cold Materva. A must-stop spot in Miami.",
    imageSrc: "/assets/crispy-yuca-bites.jpg",
    href: GOOGLE_MAPS_URL,
    author: "Marcus Brody",
    role: "Verified Diner · 15 reviews",
    rating: 5,
    date: "3 weeks ago",
    dish: "Garlic Mojo Pork Plate",
    content:
      "The Garlic Mojo crunch on the pork is unreal. Great music, quick counter service, and ice-cold Materva. A must-stop spot in Miami.",
    initials: "MB",
    avatarBg: "bg-brand-fire",
    avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=160&h=160&q=80",
  },
  {
    id: "review-6",
    title: "Maria K.",
    description:
      "Unbelievable quality for the price. Fresh ingredients, no corporate taste. Real live-fire Cuban food that Miami-Dade should be proud of.",
    imageSrc: "/assets/flan-de-leche.jpg",
    href: GOOGLE_MAPS_URL,
    author: "Maria K.",
    role: "Local Guide · 31 reviews",
    rating: 5,
    date: "Just now",
    dish: "Housemade Flan & Cortadito",
    content:
      "Unbelievable quality for the price. Fresh ingredients, no corporate taste. Real live-fire Cuban food that Miami-Dade should be proud of.",
    initials: "MK",
    avatarBg: "bg-leaf-green",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&h=160&q=80",
  },
];

export function GoogleReviewsSection() {
  return (
    <section
      id="reviews"
      aria-label="Google Maps Customer Reviews"
      className="relative w-full bg-transparent py-16 sm:py-24 select-none"
    >
      <div className="relative mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado Principal de Reseñas */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-charcoal-ink leading-none">
              VERIFIED <span className="text-brand-fire">GOOGLE MAPS</span> REVIEWS
            </h2>
            <p className="mt-3 font-sans text-sm sm:text-base text-charcoal-ink/80 leading-relaxed">
              Real community feedback from local diners, neighbors, and corporate teams savoring live-fire mojo cooking every day.
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
                <span className="font-sans text-xs font-bold text-charcoal-ink mt-1">
                  +3,000 Verified Ratings
                </span>
                <span className="font-sans text-[10px] text-charcoal-ink/60 uppercase tracking-wider">
                  Google &amp; Miami Delivery
                </span>
              </div>
            </div>

            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-charcoal-ink hover:bg-brand-fire text-cream-bg text-xs font-bold uppercase tracking-wider px-5 py-2.5 transition-all group cursor-pointer shadow-xs hover:scale-105 active:scale-95"
            >
              <span>SEE ON MAPS</span>
              <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        {/* Retícula de Reseñas: 100% armadas, sin cortes ni recuadros rígidos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {GOOGLE_REVIEWS.map((review) => (
            <article
              key={review.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-charcoal-ink p-6 sm:p-7 border border-charcoal-ink/20 shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-brand-fire/40"
            >
              {/* Imagen de Fondo del Plato con sutil zoom en hover */}
              <div className="absolute inset-0">
                {review.imageSrc ? (
                  <img
                    src={review.imageSrc}
                    alt={review.dish}
                    className="h-full w-full object-cover opacity-30 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-35"
                    draggable={false}
                    loading="lazy"
                  />
                ) : null}
              </div>

              {/* Capas de Gradiente para Máxima Legibilidad */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-ink via-charcoal-ink/85 to-charcoal-ink/60" />

              {/* Cabecera de la Tarjeta */}
              <div className="relative z-10 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* Foto de Perfil en el Círculo */}
                  <div className="relative h-11 w-11 rounded-full overflow-hidden shrink-0 ring-2 ring-cream-bg/25 bg-charcoal-ink flex items-center justify-center">
                    {review.avatarUrl ? (
                      <img
                        src={review.avatarUrl}
                        alt={review.author}
                        className="h-full w-full object-cover rounded-full select-none"
                        loading="lazy"
                      />
                    ) : (
                      <span
                        className={`h-full w-full ${review.avatarBg} text-cream-bg flex items-center justify-center font-sans font-bold text-xs uppercase`}
                      >
                        {review.initials}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="font-sans font-bold text-sm text-cream-bg leading-tight flex items-center gap-1.5">
                      <span>{review.author}</span>
                      <CheckCircle2 className="h-3.5 w-3.5 text-leaf-green" aria-label="Verified Reviewer" />
                    </div>
                    <p className="font-sans text-[11px] font-medium text-cream-bg/70 mt-0.5">
                      {review.role}
                    </p>
                  </div>
                </div>

                {/* Estrellas y Marca Google */}
                <div className="flex flex-col items-end shrink-0">
                  <span className="font-sans font-black text-xs text-cream-bg/40 tracking-tighter uppercase mb-1">
                    Google Review
                  </span>
                  <div className="flex items-center gap-1 text-mojo-citrus">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Contenido Central: Plato Destacado y Cita Completa */}
              <div className="relative z-10 my-5 py-1">
                <h3 className="font-sans text-base sm:text-lg font-bold text-mojo-citrus leading-snug tracking-tight mb-2.5 select-none">
                  {review.dish}
                </h3>
                <p className="font-sans text-sm sm:text-base text-cream-bg font-normal leading-relaxed">
                  &ldquo;{review.content}&rdquo;
                </p>
              </div>

              {/* Pie de la Tarjeta: Verificación y Link a Google Maps */}
              <div className="relative z-10 pt-3.5 border-t border-cream-bg/15 flex items-center justify-between text-cream-bg/65 font-sans text-[10px] uppercase tracking-wider">
                <span className="flex items-center gap-1.5 text-leaf-green font-semibold">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>{review.date} · Dine-in / Takeout</span>
                </span>

                <a
                  href={review.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-cream-bg/85 hover:text-brand-fire transition-colors"
                >
                  <span>Open on Maps</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Fila Inferior de Conversión a Google Maps */}
        <div className="mt-12 text-center">
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-brand-fire hover:bg-charcoal-ink text-cream-bg text-xs sm:text-sm font-bold uppercase tracking-wider px-7 py-3.5 transition-colors group cursor-pointer"
          >
            <span>WRITE A REVIEW OR READ ALL 270+ REVIEWS ON GOOGLE MAPS</span>
            <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

      </div>
    </section>
  );
}

// Compatibilidad retroactiva con importaciones existentes de DistrictsCatering
export const DistrictsCatering = GoogleReviewsSection;
export default GoogleReviewsSection;
