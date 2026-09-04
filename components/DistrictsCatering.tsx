'use client';

import React, { useState } from 'react';
import { Package, Phone, Check, X, ArrowRight, ShieldCheck, Sparkles, Users } from 'lucide-react';

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
    id: 'wynwood-arts',
    district: 'Wynwood',
    editionName: 'Wynwood Arts Edition',
    tagline: 'Empaque gráfico de alto contraste para catering creativo',
    serialNumber: 'PACK-WY-01',
    capacity: '15 - 35 Comensales',
    thermalRetention: '90 MIN CALOR ACTIVO',
    badge: 'Limited Graphic Run',
    accentColor: '#FFA826', // citrus
    description:
      'Caja modular serigrafiada a dos tintas con cartón Kraft multicapa térmico. Diseñada para agencias, galerías de arte y sesiones fotográficas en Wynwood.',
    specs: [
      'Mini Cubanos prensados crujientes',
      'Croquetas criollas de jamón y pernil',
      'Pocillos herméticos de mojo de ajo verde',
      'Servilletas de algodón Kraft y tenedores eco',
    ],
  },
  {
    id: 'brickell-express',
    district: 'Brickell',
    editionName: 'Brickell Express',
    tagline: 'Box lunch hermético individual para ejecutivos',
    serialNumber: 'PACK-BK-02',
    capacity: 'Individual / Oficinas (10+)',
    thermalRetention: '120 MIN SELLADO VACÍO',
    badge: 'Single Serve Hermético',
    accentColor: '#2F6A4F', // leaf-green
    description:
      'Compartimentos estancos sellados al vacío que preservan el calor de la plancha sin condensación. Formato ultra-portátil para juntas directivas y corporativos.',
    specs: [
      'Bowl Criollo a elección (Lechón, Pollo o Ropa Vieja)',
      'Mini cubano prensado dorado al momento',
      'Chips de plátano verde con alioli cítrico',
      'Postre artesanal de guayaba & queso',
    ],
  },
  {
    id: 'design-district',
    district: 'Design District',
    editionName: 'Design District Curated',
    tagline: 'Caja premium con compartimentos separados para salsas de mojo',
    serialNumber: 'PACK-DD-03',
    capacity: '20 - 40 Invitados',
    thermalRetention: '100 MIN GOURMET LOCK',
    badge: 'Multi-Slot Gourmet',
    accentColor: '#E52516', // brand-fire
    description:
      'Packaging minimalista en negro carbón mate con troquelado de precisión. 6 compartimentos individuales para maridajes de mojos y emulsiones cítricas de autor.',
    specs: [
      'Bocados de pernil braseado 4 horas',
      'Estación de 4 salsas de mojo exclusivas',
      'Yuca frita crocante y maduros caramelizados',
      'Vasos térmicos biodegradables para maridaje',
    ],
  },
  {
    id: 'coral-gables',
    district: 'Coral Gables',
    editionName: 'Coral Gables Family Feast',
    tagline: 'Pack de tostones y fuentes de pernil para reuniones',
    serialNumber: 'PACK-CG-04',
    capacity: '25 - 60 Personas',
    thermalRetention: '180 MIN TERMO-REFUERZO',
    badge: 'Mega Feast Familiar',
    accentColor: '#FFA826', // citrus
    description:
      'Fuentes de aluminio anodizado reforzado con tapas térmicas rígidas diseñadas para celebraciones familiares, quinces y aniversarios bajo el estilo criollo.',
    specs: [
      'Fuentes XL de pernil asado al mojo criollo',
      'Packs masivos de tostones doble fritura',
      'Bandejas de arroz moro con frijoles negros',
      'Termos de café cubano recién colado al calor',
    ],
  },
];

export function DistrictsCatering() {
  const [selectedPkg, setSelectedPkg] = useState<DistrictPackage | null>(null);
  const [guestCount, setGuestCount] = useState('25');
  const [customerName, setCustomerName] = useState('');
  const [eventDate, setEventDate] = useState('');
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

    const message = `¡Hola Mojo Grille Catering! Me interesa cotizar el paquete de empaque temático *${selectedPkg.editionName}* para un evento en Miami.%0A%0A` +
      `• *Comensales estimados:* ${guestCount}%0A` +
      (customerName ? `• *Contacto:* ${customerName}%0A` : '') +
      (eventDate ? `• *Fecha deseada:* ${eventDate}%0A` : '') +
      `• *Capacidad estándar:* ${selectedPkg.capacity}%0A%0A` +
      `¿Podrían confirmarme disponibilidad y presupuesto personalizado? ¡Muchas gracias!`;

    const waUrl = `https://wa.me/13055550123?text=${message}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setIsSubmitted(true);
  };

  return (
    <section
      id="districts-catering"
      aria-label="Packaging Térmico de Autor y Catering para Distritos de Miami"
      className="relative bg-charcoal-ink text-cream-bg py-24 select-none overflow-hidden border-t border-charcoal-ink/30"
    >
      <div className="relative mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-8">
        {/* Encabezado Editorial */}
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
          <span className="block text-brand-fire font-bold uppercase tracking-widest text-xs sm:text-sm mb-3">
            LLEVAMOS EL SABOR A TODA LA CIUDAD
          </span>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-cream-bg leading-[0.9]">
            PACKAGING TÉRMICO DE AUTOR · DE BROWNSVILLE PARA MIAMI
          </h2>
          <p className="mt-4 font-accent italic text-cream-bg/85 text-2xl sm:text-3xl lowercase">
            calor de plancha preservado en cajas térmicas de diseño artesanal
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
                      <span>Capacidad: {pkg.capacity}</span>
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
                  aria-label={`Cotizar catering para ${pkg.editionName}`}
                >
                  <span>COTIZAR CATERING</span>
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
            <span>Garantía de calor al momento: entrega puntual en Little Havana, Brickell, Wynwood y Doral.</span>
          </div>
          <a
            href="tel:+13055550123"
            className="inline-flex items-center gap-2 font-bold text-cream-bg hover:text-brand-fire transition-colors underline underline-offset-4"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>Línea Directa de Catering: (305) 555-0123</span>
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
              aria-label="Cerrar modal de cotización"
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
                  ¡Solicitud Enviada!
                </h4>
                <p className="font-sans text-sm text-charcoal-ink/80 max-w-xs mx-auto">
                  Se ha abierto WhatsApp con los datos de tu evento. Nuestro equipo de catering responderá en menos de 15 minutos.
                </p>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="mt-4 px-6 py-2.5 rounded-none bg-charcoal-ink text-cream-bg font-sans text-xs font-bold uppercase tracking-wider hover:bg-brand-fire transition-colors"
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <form onSubmit={handleWhatsAppQuote} className="space-y-4">
                <div>
                  <label htmlFor="customer-name" className="block font-sans text-xs font-bold uppercase tracking-wider text-charcoal-ink mb-1">
                    Tu Nombre o Empresa
                  </label>
                  <input
                    id="customer-name"
                    type="text"
                    required
                    placeholder="Ej. Estudio Creativo Wynwood / Carlos Mendoza"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full rounded-none border border-charcoal-ink/30 bg-cream-bg px-4 py-2.5 font-sans text-sm text-charcoal-ink placeholder:text-charcoal-ink/40 focus:border-brand-fire focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="guest-count" className="block font-sans text-xs font-bold uppercase tracking-wider text-charcoal-ink mb-1">
                      Comensales Aprox.
                    </label>
                    <select
                      id="guest-count"
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="w-full rounded-none border border-charcoal-ink/30 bg-cream-bg px-3 py-2.5 font-sans text-sm text-charcoal-ink focus:border-brand-fire focus:outline-hidden"
                    >
                      <option value="15-20">15 a 20 personas</option>
                      <option value="25-35">25 a 35 personas</option>
                      <option value="40-60">40 a 60 personas</option>
                      <option value="75-100+">75 a 100+ personas</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="event-date" className="block font-sans text-xs font-bold uppercase tracking-wider text-charcoal-ink mb-1">
                      Fecha del Evento
                    </label>
                    <input
                      id="event-date"
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full rounded-none border border-charcoal-ink/30 bg-cream-bg px-3 py-2.5 font-sans text-sm text-charcoal-ink focus:border-brand-fire focus:outline-hidden"
                    >
                    </input>
                  </div>
                </div>

                <div className="rounded-none border border-charcoal-ink/20 bg-charcoal-ink/5 p-3 text-[11px] font-sans text-charcoal-ink/70">
                  ⚡ <strong>Confirmación Rápida:</strong> Se enviará un mensaje estructurado directo al WhatsApp de nuestro equipo de catering para cotizar al momento.
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-none font-sans font-bold uppercase tracking-wider text-xs bg-brand-fire text-cream-bg hover:bg-charcoal-ink transition-colors border-2 border-brand-fire hover:border-charcoal-ink flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>COTIZAR POR WHATSAPP</span>
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
