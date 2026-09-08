import React from "react";
import { Star, MapPin, ExternalLink, CheckCircle2, MessageSquare } from "lucide-react";

export interface GoogleReview {
  id: string;
  author: string;
  role: string;
  rating: number;
  date: string;
  dish: string;
  content: string;
  initials: string;
  avatarBg: string;
}

export const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/Mojo+Grille+Cuban+Kitchen/@25.8231985,-80.2430227,17z/data=!3m1!5s0x88d9b0dba01bba4f:0x7eb1c5ecaaf581ac!4m8!3m7!1s0x88d9b1962e47381b:0x801c01a9757d037c!8m2!3d25.8231937!4d-80.2404478!9m1!1b1!16s%2Fg%2F11tjhpc09g?entry=ttu";

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: "review-1",
    author: "Carlos Morales",
    role: "Local Guide · 42 reviews",
    rating: 5,
    date: "2 weeks ago",
    dish: "Lechón Asado Bowl & Yuca Fries",
    content:
      "The lechón asado bowl and yuca fries are incredible. Real deal Cuban mojo flavor, juicy and tender. Best quick lunch in Miami!",
    initials: "CM",
    avatarBg: "bg-brand-fire",
  },
  {
    id: "review-2",
    author: "Stephanie Rodriguez",
    role: "Local Guide · 18 reviews",
    rating: 5,
    date: "1 month ago",
    dish: "The Traditional Pressed Cubano",
    content:
      "Best Cuban sandwich in the area! Pressed hot on the plancha, crisp bread with the right balance of mustard and pickles. You can taste the slow-roasted pork marinade.",
    initials: "SR",
    avatarBg: "bg-leaf-green",
  },
  {
    id: "review-3",
    author: "David Lopez",
    role: "Verified Diner · 8 reviews",
    rating: 5,
    date: "3 weeks ago",
    dish: "Chicken Fresco Bowl",
    content:
      "Generous portions, fast service, and authentic taste. The Chicken Fresco bowl with black beans and maduros tastes just like abuela's cooking.",
    initials: "DL",
    avatarBg: "bg-charcoal-ink",
  },
  {
    id: "review-4",
    author: "Vanessa Perez",
    role: "Local Guide · 64 reviews",
    rating: 5,
    date: "1 month ago",
    dish: "Office Catering Trays",
    content:
      "The mojo sauce is liquid gold. We ordered catering for our office in Brickell and the party trays arrived hot, perfectly packaged, and everyone went crazy for the pulled pork.",
    initials: "VP",
    avatarBg: "bg-mojo-citrus",
  },
  {
    id: "review-5",
    author: "Jorge Gonzalez",
    role: "Verified Diner · 15 reviews",
    rating: 5,
    date: "3 weeks ago",
    dish: "Pan con Bistec & Colada",
    content:
      "Clean spot, super friendly staff, and the cafecito gives you that authentic 3:05 PM Miami kick. 10/10 recommended!",
    initials: "JG",
    avatarBg: "bg-brand-fire",
  },
  {
    id: "review-6",
    author: "Michelle Krause",
    role: "Local Guide · 29 reviews",
    rating: 5,
    date: "Just now",
    dish: "Slow-Braised Ropa Vieja Bowl",
    content:
      "Unbelievable quality for the price. Fresh ingredients, no corporate taste. Real live-fire Cuban food that Miami-Dade should be proud of.",
    initials: "MK",
    avatarBg: "bg-leaf-green",
  },
];

export function GoogleReviewsSection() {
  return (
    <section
      id="reviews"
      aria-label="Google Maps Customer Reviews"
      className="relative w-full bg-transparent py-16 sm:py-24 border-b border-charcoal-ink/20 select-none overflow-hidden"
    >
      <div className="relative mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado Principal de Reseñas */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-none bg-surface-sand px-3 py-1 font-sans text-[11px] font-bold text-brand-fire uppercase tracking-[0.2em] mb-3 border border-charcoal-ink/10">
              <MapPin className="h-3.5 w-3.5 text-brand-fire" aria-hidden="true" />
              <span>5351 NW 27th Ave · Miami FL 33142</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-charcoal-ink leading-none">
              VERIFIED <span className="text-brand-fire">GOOGLE MAPS</span> REVIEWS
            </h2>
            <p className="mt-3 font-sans text-sm sm:text-base text-charcoal-ink/80 leading-relaxed">
              Real community feedback from local diners, neighbors, and corporate teams savoring live-fire mojo cooking every day.
            </p>
          </div>

          {/* Tarjeta Resumen de Calificación Google */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-surface-sand p-5 border border-charcoal-ink/15 shrink-0">
            <div className="flex items-center gap-3">
              <span className="font-display text-5xl sm:text-6xl font-black text-charcoal-ink leading-none">
                4.7
              </span>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-mojo-citrus">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <span className="font-sans text-xs font-bold text-charcoal-ink/80 mt-1">
                  +3,000 Verified Ratings
                </span>
                <span className="font-sans text-[10px] text-charcoal-ink/60 uppercase tracking-wider">
                  Google &amp; Miami Delivery
                </span>
              </div>
            </div>

            <div className="h-px w-full sm:h-12 sm:w-px bg-charcoal-ink/15 my-1 sm:my-0" />

            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-charcoal-ink hover:bg-brand-fire text-cream-bg text-xs font-bold uppercase tracking-wider px-4 py-2.5 transition-colors group cursor-pointer"
            >
              <span>SEE ON MAPS</span>
              <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        {/* Retícula de Reseñas de Google */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GOOGLE_REVIEWS.map((review) => (
            <article
              key={review.id}
              className="relative flex flex-col justify-between bg-surface-sand p-6 border border-charcoal-ink/15 transition-all duration-300 hover:border-charcoal-ink/30 hover:bg-cream-bg"
            >
              <div>
                {/* Cabecera del Reviewer */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-full ${review.avatarBg} text-cream-bg flex items-center justify-center font-sans font-bold text-xs uppercase shrink-0`}
                    >
                      {review.initials}
                    </div>
                    <div>
                      <h3 className="font-sans font-bold text-sm text-charcoal-ink leading-tight flex items-center gap-1.5">
                        <span>{review.author}</span>
                        <CheckCircle2 className="h-3.5 w-3.5 text-leaf-green" aria-label="Verified Reviewer" />
                      </h3>
                      <p className="font-sans text-[11px] font-medium text-charcoal-ink/65 mt-0.5">
                        {review.role}
                      </p>
                    </div>
                  </div>

                  {/* Logo Google G sutil */}
                  <span className="font-sans font-black text-xs text-charcoal-ink/30 tracking-tighter" aria-hidden="true">
                    Google
                  </span>
                </div>

                {/* Estrellas y Fecha */}
                <div className="flex items-center justify-between mt-4 pb-3 border-b border-charcoal-ink/10">
                  <div className="flex items-center gap-1 text-mojo-citrus">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                  <span className="font-sans text-[11px] text-charcoal-ink/50 font-medium">
                    {review.date}
                  </span>
                </div>

                {/* Plato Destacado */}
                <div className="mt-3">
                  <span className="inline-block bg-charcoal-ink/5 border border-charcoal-ink/10 text-brand-fire font-sans text-[10px] font-bold uppercase tracking-wider px-2 py-0.5">
                    {review.dish}
                  </span>
                </div>

                {/* Cita Textual de la Reseña */}
                <p className="mt-3 font-sans text-xs sm:text-sm text-charcoal-ink/85 leading-relaxed">
                  &ldquo;{review.content}&rdquo;
                </p>
              </div>

              {/* Pie de la Tarjeta */}
              <div className="mt-5 pt-3 border-t border-charcoal-ink/10 flex items-center justify-between text-charcoal-ink/50 font-sans text-[10px] uppercase tracking-wider">
                <span className="flex items-center gap-1 text-leaf-green font-semibold">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>Dine-in / Takeout</span>
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" />
                  <span>Verified Review</span>
                </span>
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
