import React, { useState } from "react";
import { Package, Phone, Check, X, ArrowRight, ShieldCheck, Sparkles, Users } from "lucide-react";

export interface DistrictPackage {
  id: string;
  district: string;
  editionName: string;
  tagline: string;
  serialNumber: string;
  capacity: string;
  thermalRetention: string;
  badge: string;
  accentColor: string;
  description: string;
  specs: string[];
}

export const DISTRICT_PACKAGES: DistrictPackage[] = [
  {
    id: "wynwood-arts",
    district: "Wynwood",
    editionName: "Wynwood Arts Edition",
    tagline: "High-contrast graphic packaging for creative event catering",
    serialNumber: "PACK-WY-01",
    capacity: "15 - 35 Guests",
    thermalRetention: "90 MIN ACTIVE HEAT",
    badge: "Limited Graphic Run",
    accentColor: "#FFA826", // citrus
    description:
      "Custom two-tone screenprinted Kraft box with multi-layer thermal insulation. Built for creative agencies, art gallery shows, and photo shoots in Wynwood.",
    specs: [
      "Crisp mini pressed Cubanos",
      "Criollo ham & pernil croquetas",
      "Airtight cups of green garlic mojo",
      "Kraft cotton napkins and eco cutlery",
    ],
  },
  {
    id: "brickell-express",
    district: "Brickell",
    editionName: "Brickell Express",
    tagline: "Individual airtight executive box lunches",
    serialNumber: "PACK-BK-02",
    capacity: "Individual / Corporate (10+)",
    thermalRetention: "120 MIN VACUUM SEAL",
    badge: "Single Serve Airtight",
    accentColor: "#2F6A4F", // leaf-green
    description:
      "Airtight sealed compartments preserving plancha sizzle without steam condensation. Ultra-portable executive lunch format for corporate boardrooms.",
    specs: [
      "Criollo Bowl of choice (Lechón, Pollo, or Ropa Vieja)",
      "Plancha-pressed mini golden cubano",
      "Green plantain chips with citrus mojo aioli",
      "Artisanal guava & cream cheese dessert",
    ],
  },
  {
    id: "design-district",
    district: "Design District",
    editionName: "Design District Curated",
    tagline: "Premium presentation box with dedicated mojo flight compartments",
    serialNumber: "PACK-DD-03",
    capacity: "20 - 40 Guests",
    thermalRetention: "100 MIN GOURMET LOCK",
    badge: "Multi-Slot Gourmet",
    accentColor: "#E52516", // brand-fire
    description:
      "Matte charcoal black box with precision die-cut slots. 6 compartments featuring signature mojo pairings and artisanal citrus emulsions.",
    specs: [
      "Bite-size 4-hour braised mojo pernil",
      "Tasting flight of 4 signature mojo sauces",
      "Crispy yuca fries & caramelized maduros",
      "Biodegradable tasting cups for mojo pairings",
    ],
  },
  {
    id: "coral-gables",
    district: "Coral Gables",
    editionName: "Coral Gables Family Feast",
    tagline: "Tostones platters and heaping pernil trays for big gatherings",
    serialNumber: "PACK-CG-04",
    capacity: "25 - 60 Guests",
    thermalRetention: "180 MIN REINFORCED THERMAL",
    badge: "Family Mega Feast",
    accentColor: "#FFA826", // citrus
    description:
      "Heavy-gauge anodized aluminum party trays with rigid thermal covers designed for family celebrations, quinces, and milestones criollo style.",
    specs: [
      "XL trays of slow-roasted mojo criollo pernil",
      "Massive platters of twice-fried tostones",
      "Deep trays of moro rice and black beans",
      "Thermos jugs of piping hot brewed Cuban coffee",
    ],
  },
];

export function DistrictsCatering() {
  const [selectedPkg, setSelectedPkg] = useState<DistrictPackage | null>(null);
  const [guestCount, setGuestCount] = useState("25");
  const [customerName, setCustomerName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOpenModal = (pkg: DistrictPackage) => {
    setSelectedPkg(pkg);
    setIsSubmitted(false);
  };

  const handleCloseModal = () => {
    setSelectedPkg(null);
    setIsSubmitted(false);
  };

  const handleWhatsAppQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPkg) return;

    const message = `Hello Mojo Grille Catering! I'd like to request a quote for the *${selectedPkg.editionName}* package for an event in Miami.%0A%0A` +
      `• *Estimated Guests:* ${guestCount}%0A` +
      (customerName ? `• *Contact:* ${customerName}%0A` : "") +
      (eventDate ? `• *Event Date:* ${eventDate}%0A` : "") +
      `• *Standard Capacity:* ${selectedPkg.capacity}%0A%0A` +
      `Could you confirm availability and customized pricing? Thank you!`;

    const waUrl = `https://wa.me/13055550123?text=${message}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
    setIsSubmitted(true);
  };

  return (
    <section
      id="districts-catering"
      aria-label="Artisanal Thermal Packaging and Catering for Miami Districts"
      className="relative bg-charcoal-ink text-cream-bg py-24 select-none overflow-hidden border-t border-charcoal-ink/30"
    >
      <div className="relative mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-8">
        {/* Encabezado Editorial */}
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
          <span className="block text-brand-fire font-bold uppercase tracking-widest text-xs sm:text-sm mb-3">
            BRINGING THE FLAVOR TO THE ENTIRE CITY
          </span>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-cream-bg leading-[0.9]">
            ARTISANAL THERMAL PACKAGING · FROM BROWNSVILLE TO ALL MIAMI
          </h2>
          <p className="mt-4 font-accent italic text-cream-bg/85 text-2xl sm:text-3xl lowercase">
            plancha heat preserved in handcrafted thermal presentation boxes
          </p>
        </div>

        {/* Retícula de Packaging Impreso (Shared 1px Grid) */}
        <div className="border-t border-l border-cream-bg/20 bg-charcoal-ink">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {DISTRICT_PACKAGES.map((pkg) => (
              <article
                key={pkg.id}
                className="group relative flex flex-col justify-between rounded-none bg-charcoal-ink border-r border-b border-cream-bg/20 p-6 sm:p-7 hover:bg-[#1C1A17] transition-colors duration-200"
              >
                {/* Parte Superior: Serial & Badges */}
                <div>
                  <div className="flex items-center justify-between border-b border-cream-bg/10 pb-3.5 mb-5">
                    <span className="font-mono text-[11px] uppercase tracking-widest text-cream-bg/50">
                      {pkg.serialNumber}
                    </span>
                    <span
                      className="inline-flex items-center gap-1 rounded-none px-2 py-0.5 text-[9px] font-sans font-bold uppercase tracking-wider text-cream-bg border border-cream-bg/20"
                      style={{ backgroundColor: `${pkg.accentColor}20` }}
                    >
                      <Sparkles className="h-2.5 w-2.5" style={{ color: pkg.accentColor }} />
                      <span style={{ color: pkg.accentColor }}>{pkg.badge}</span>
                    </span>
                  </div>

                  {/* Mockup Gráfico Estilizado del Packaging */}
                  <div className="relative my-4 h-32 rounded-none bg-[#11100E] border border-cream-bg/20 flex flex-col items-center justify-center p-4 overflow-hidden group-hover:border-cream-bg/40 transition-colors">
                    {/* Código de barras decorativo */}
                    <div className="absolute top-3 left-3 opacity-30 font-mono text-[8px] tracking-tighter select-none">
                      ||| | |||| | || ||| ||
                    </div>
                    {/* Indicador de retención de calor */}
                    <div className="absolute top-3 right-3 flex items-center gap-1 text-[9px] font-mono font-bold text-cream-bg/60">
                      <ShieldCheck className="h-3 w-3 text-leaf-green" />
                      <span>{pkg.thermalRetention}</span>
                    </div>

                    <Package className="h-12 w-12 text-cream-bg/80 group-hover:text-brand-fire group-hover:scale-105 transition-all duration-300 stroke-[1.3]" />
                    
                    <span className="mt-2 font-mono text-[10px] tracking-widest uppercase text-cream-bg/60">
                      {pkg.district.toUpperCase()} · THERMAL BOX
                    </span>
                  </div>

                  {/* Título & Tagline */}
                  <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-cream-bg group-hover:text-brand-fire transition-colors leading-tight mb-2">
                    {pkg.editionName}
                  </h3>
                  <p className="font-sans text-xs text-cream-bg/70 leading-relaxed mb-4">
                    {pkg.tagline}
                  </p>

                  {/* Especificaciones Técnicas */}
                  <div className="space-y-1.5 border-t border-cream-bg/10 pt-3.5 mb-6">
                    <div className="flex items-center gap-1.5 text-[11px] font-sans font-semibold text-cream-bg/90 mb-2">
                      <Users className="h-3.5 w-3.5 text-brand-fire shrink-0" />
                      <span>Capacity: {pkg.capacity}</span>
                    </div>
                    {pkg.specs.map((spec, i) => (
                      <div key={i} className="flex items-start gap-2 text-[11px] font-sans text-cream-bg/65">
                        <Check className="h-3 w-3 text-brand-fire shrink-0 mt-0.5" />
                        <span className="leading-tight">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Botón de Acción Inferior: Cotizar Catering */}
                <button
                  type="button"
                  onClick={() => handleOpenModal(pkg)}
                  className="w-full py-3.5 px-4 rounded-none font-sans font-bold uppercase tracking-wider text-xs bg-cream-bg text-charcoal-ink hover:bg-brand-fire hover:text-cream-bg border border-cream-bg hover:border-brand-fire transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
                  aria-label={`Quote catering for ${pkg.editionName}`}
                >
                  <span>QUOTE CATERING</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </article>
            ))}
          </div>
        </div>

        {/* Garantía y Teléfono Directo */}
        <div className="mt-16 text-center border-t border-cream-bg/10 pt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-cream-bg/75">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-leaf-green" />
            <span>Guaranteed hot on arrival: prompt delivery to Little Havana, Brickell, Wynwood, and Doral.</span>
          </div>
          <a
            href="tel:+13055550123"
            className="inline-flex items-center gap-2 font-bold text-cream-bg hover:text-brand-fire transition-colors underline underline-offset-4"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>Direct Catering Line: (305) 555-0123</span>
          </a>
        </div>
      </div>

      {/* Modal de Cotización de Catering de Autor (Estilo Comanda Física) */}
      {selectedPkg && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="catering-modal-title"
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-charcoal-ink/80 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-lg rounded-none bg-surface-sand text-charcoal-ink p-6 sm:p-8 border-2 border-charcoal-ink">
            {/* Botón Cerrar */}
            <button
              type="button"
              onClick={handleCloseModal}
              className="absolute top-5 right-5 p-1.5 rounded-none text-charcoal-ink/70 hover:text-charcoal-ink hover:bg-charcoal-ink/10 transition-colors"
              aria-label="Close catering quote modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Encabezado del Modal */}
            <div className="mb-6">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-brand-fire">
                {selectedPkg.serialNumber} · {selectedPkg.district}
              </span>
              <h3 id="catering-modal-title" className="font-display text-3xl font-black uppercase tracking-tight text-charcoal-ink mt-1">
                {selectedPkg.editionName}
              </h3>
              <p className="font-sans text-xs text-charcoal-ink/75 mt-1">
                {selectedPkg.description}
              </p>
            </div>

            {isSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-none bg-leaf-green/20 text-leaf-green border border-leaf-green/30">
                  <Check className="h-6 w-6" />
                </div>
                <h4 className="font-display text-2xl font-bold uppercase tracking-tight text-charcoal-ink">
                  Request Sent!
                </h4>
                <p className="font-sans text-sm text-charcoal-ink/80 max-w-xs mx-auto">
                  WhatsApp has been opened with your event details. Our catering team will respond within 15 minutes.
                </p>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="mt-4 px-6 py-2.5 rounded-none bg-charcoal-ink text-cream-bg font-sans text-xs font-bold uppercase tracking-wider hover:bg-brand-fire transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleWhatsAppQuote} className="space-y-4">
                <div>
                  <label htmlFor="customer-name" className="block font-sans text-xs font-bold uppercase tracking-wider text-charcoal-ink mb-1">
                    Your Name or Company
                  </label>
                  <input
                    id="customer-name"
                    type="text"
                    required
                    placeholder="e.g. Wynwood Creative Studio / Carlos Mendoza"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full rounded-none border border-charcoal-ink/30 bg-cream-bg px-4 py-2.5 font-sans text-sm text-charcoal-ink placeholder:text-charcoal-ink/40 focus:border-brand-fire focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="guest-count" className="block font-sans text-xs font-bold uppercase tracking-wider text-charcoal-ink mb-1">
                      Approx. Guest Count
                    </label>
                    <select
                      id="guest-count"
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="w-full rounded-none border border-charcoal-ink/30 bg-cream-bg px-3 py-2.5 font-sans text-sm text-charcoal-ink focus:border-brand-fire focus:outline-hidden"
                    >
                      <option value="15-20">15 to 20 guests</option>
                      <option value="25-35">25 to 35 guests</option>
                      <option value="40-60">40 to 60 guests</option>
                      <option value="75-100+">75 to 100+ guests</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="event-date" className="block font-sans text-xs font-bold uppercase tracking-wider text-charcoal-ink mb-1">
                      Event Date
                    </label>
                    <input
                      id="event-date"
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full rounded-none border border-charcoal-ink/30 bg-cream-bg px-3 py-2.5 font-sans text-sm text-charcoal-ink focus:border-brand-fire focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="rounded-none border border-charcoal-ink/20 bg-charcoal-ink/5 p-3 text-[11px] font-sans text-charcoal-ink/70">
                  ⚡ <strong>Instant Confirmation:</strong> Sends a structured message directly to our catering WhatsApp team for an instant quote.
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-none font-sans font-bold uppercase tracking-wider text-xs bg-brand-fire text-cream-bg hover:bg-charcoal-ink transition-colors border-2 border-brand-fire hover:border-charcoal-ink flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>QUOTE VIA WHATSAPP</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default DistrictsCatering;
