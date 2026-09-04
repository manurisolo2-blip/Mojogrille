import React, { useEffect } from "react";
import { X, Plus, Minus, Trash2, ShoppingBag, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export function CartDrawer() {
  const {
    items,
    isOpen,
    toast,
    closeCart,
    openCart,
    increment,
    decrement,
    removeItem,
    clearCart,
    dismissToast,
    getSubtotal,
    getItemCount,
  } = useCartStore();

  const subtotal = getSubtotal();
  const itemCount = getItemCount();
  const estimatedTax = subtotal * 0.07; // 7% Florida sales tax
  const total = subtotal + estimatedTax;

  // Cerrar con Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeCart]);

  // Bloquear scroll de la página al abrir
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleCheckout = () => {
    if (items.length === 0) return;

    const linesText = items
      .map((item) => `• ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toFixed(2)})`)
      .join("%0A");

    const message = `¡Hola Mojo Grille! Quiero confirmar mi pedido:%0A%0A${linesText}%0A%0ASubtotal: $${subtotal.toFixed(
      2
    )}%0ATax (7%): $${estimatedTax.toFixed(2)}%0ATotal: $${total.toFixed(
      2
    )}%0A%0A¡Muchas gracias!`;

    const whatsappUrl = `https://wa.me/13055550123?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      {/* 1. Notificación Flotante Momentánea en Esquina Superior */}
      <div
        className={`fixed top-5 right-5 z-60 max-w-sm rounded-2xl bg-charcoal-ink text-cream-bg p-4 shadow-[0_20px_40px_rgba(20,18,16,0.35)] border border-cream-bg/15 backdrop-blur-md flex items-center justify-between gap-3 select-none transition-all duration-300 ease-out transform ${
          toast && toast.visible
            ? "translate-y-0 opacity-100 scale-100 pointer-events-auto"
            : "-translate-y-6 opacity-0 scale-95 pointer-events-none"
        }`}
        role="status"
        aria-live="polite"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-fire text-cream-bg">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div className="text-left">
            <p className="font-sans text-xs font-bold text-cream-bg">
              {toast?.message || "¡Añadido al pedido criollo!"}
            </p>
            <p className="font-sans text-[11px] text-cream-bg/70 line-clamp-1">
              {toast?.itemName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              dismissToast();
              openCart();
            }}
            className="rounded-lg bg-cream-bg/15 px-2.5 py-1 font-sans text-[11px] font-bold text-cream-bg hover:bg-cream-bg/25 transition-colors cursor-pointer"
          >
            Ver
          </button>
          <button
            type="button"
            onClick={dismissToast}
            className="text-cream-bg/60 hover:text-cream-bg p-1"
            aria-label="Cerrar notificación"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* 2. Backdrop Oscuro con Blur */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-50 bg-charcoal-ink/60 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* 3. Panel Lateral Deslizante (Cart Drawer) */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras Mojo Grille"
        className={`fixed inset-y-0 right-0 max-w-md w-full bg-surface-sand z-50 shadow-2xl border-l border-charcoal-ink/10 flex flex-col justify-between select-none transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header del Carrito */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-charcoal-ink/10 bg-surface-sand">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-fire text-cream-bg shadow-sm">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-charcoal-ink leading-none">
                Tu Pedido Criollo
              </h2>
              <span className="font-sans text-xs font-semibold text-charcoal-ink/60">
                {itemCount} {itemCount === 1 ? "producto" : "productos"} añadidos
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={closeCart}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-charcoal-ink/10 bg-cream-bg text-charcoal-ink hover:bg-charcoal-ink hover:text-cream-bg transition-colors cursor-pointer"
            aria-label="Cerrar panel de pedido"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Contenido / Lista de Productos */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16 space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cream-bg border border-charcoal-ink/10 text-charcoal-ink/40">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <div>
                <p className="font-display text-xl font-bold uppercase tracking-tight text-charcoal-ink">
                  Your cart is empty. Start with our signature favorites!
                </p>
                <p className="font-sans text-xs sm:text-sm text-charcoal-ink/70 mt-1 max-w-xs">
                  Explora nuestros Bowls Criollos y Sándwiches Cubanos marinados al mojo al momento.
                </p>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="rounded-full bg-brand-fire px-6 py-2.5 font-sans text-xs font-bold uppercase tracking-wider text-cream-bg hover:bg-brand-fire/90 transition-colors shadow-sm cursor-pointer"
              >
                Explorar Menú
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-cream-bg border border-charcoal-ink/10 shadow-xs transition-all"
              >
                {/* Imagen miniatura */}
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 shrink-0 rounded-xl object-cover border border-charcoal-ink/10"
                  />
                ) : (
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-surface-sand font-display text-xl text-brand-fire border border-charcoal-ink/10">
                    ✦
                  </div>
                )}

                {/* Detalles del Producto */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-display text-lg font-bold uppercase tracking-tight text-charcoal-ink truncate leading-tight">
                    {item.name}
                  </h4>
                  <p className="font-sans text-xs font-bold text-brand-fire">
                    ${(item.price * item.quantity).toFixed(2)}
                    {item.quantity > 1 && (
                      <span className="font-normal text-[11px] text-charcoal-ink/60 ml-1">
                        (${item.price.toFixed(2)} c/u)
                      </span>
                    )}
                  </p>
                  {item.sides && item.sides.length > 0 && (
                    <p className="font-sans text-[10px] text-charcoal-ink/60 truncate mt-0.5">
                      Sides: {item.sides.join(", ")}
                    </p>
                  )}
                </div>

                {/* Selectores de Cantidad (+ / -) y Eliminar */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center rounded-xl bg-surface-sand border border-charcoal-ink/10 p-1">
                    <button
                      type="button"
                      onClick={() => decrement(item.id)}
                      className="flex h-6 w-6 items-center justify-center rounded-lg text-charcoal-ink hover:bg-cream-bg transition-colors cursor-pointer"
                      aria-label={`Reducir cantidad de ${item.name}`}
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-6 text-center font-sans text-xs font-black text-charcoal-ink">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => increment(item.id)}
                      className="flex h-6 w-6 items-center justify-center rounded-lg text-charcoal-ink hover:bg-cream-bg transition-colors cursor-pointer"
                      aria-label={`Aumentar cantidad de ${item.name}`}
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="p-1.5 text-charcoal-ink/40 hover:text-brand-fire transition-colors cursor-pointer"
                    aria-label={`Eliminar ${item.name} del carrito`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Resumen Inferior y Botón CHECKOUT SEGURO */}
        {items.length > 0 && (
          <div className="p-5 sm:p-6 border-t border-charcoal-ink/10 bg-cream-bg space-y-4">
            {/* Desglose de Precios */}
            <div className="space-y-1.5 font-sans text-xs text-charcoal-ink/75">
              <div className="flex justify-between">
                <span>Subtotal acumulado</span>
                <span className="font-bold text-charcoal-ink">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Impuesto estimado (Florida 7%)</span>
                <span className="font-bold text-charcoal-ink">${estimatedTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base font-black text-charcoal-ink pt-2 border-t border-charcoal-ink/10">
                <span>Total</span>
                <span className="text-brand-fire">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Garantía de Seguridad */}
            <div className="flex items-center gap-1.5 text-[11px] text-charcoal-ink/70 justify-center">
              <ShieldCheck className="h-3.5 w-3.5 text-leaf-green" />
              <span>Instant order confirmation directly with our artisan kitchen al momento</span>
            </div>

            {/* Botón Primario: CHECKOUT SEGURO */}
            <button
              type="button"
              onClick={handleCheckout}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-brand-fire py-4 font-sans text-base font-bold uppercase tracking-wider text-cream-bg shadow-lg shadow-brand-fire/30 hover:bg-brand-fire/90 active:scale-98 transition-all cursor-pointer"
            >
              <span>CHECKOUT SEGURO</span>
              <ArrowRight className="h-4 w-4 font-bold" />
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={clearCart}
                className="font-sans text-[11px] text-charcoal-ink/50 hover:text-brand-fire underline transition-colors cursor-pointer"
              >
                Vaciar carrito completo
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

export default CartDrawer;
