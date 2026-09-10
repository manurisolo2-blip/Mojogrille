import { useEffect, type RefObject } from "react";

/**
 * Selector de todo lo que puede recibir foco por teclado dentro de un diálogo.
 * `:not([tabindex="-1"])` deja fuera lo que se sacó del recorrido a propósito
 * (el vídeo decorativo del hero, los botones del toast cuando está oculto).
 */
const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function focusableWithin(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => el.offsetParent !== null || el === document.activeElement,
  );
}

/**
 * Retiene el foco dentro de un diálogo mientras está abierto y lo devuelve al
 * control que lo abrió al cerrarse.
 *
 * Sin esto, tabular desde un overlay se escapa al contenido de detrás (que
 * sigue en el recorrido) y al cerrar el foco queda huérfano en el `<body>`,
 * así que quien navega con teclado vuelve a empezar desde arriba cada vez.
 *
 * El listener va en fase de captura para adelantarse a cualquier manejador de
 * Tab de los componentes hijos.
 */
export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  isOpen: boolean,
): void {
  useEffect(() => {
    if (!isOpen || typeof document === "undefined") return undefined;

    const container = containerRef.current;
    if (!container) return undefined;

    // Quién tenía el foco antes de abrir, para devolvérselo al cerrar.
    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    // El primer foco va al primer control del diálogo. Si no hay ninguno, al
    // contenedor, que se hace enfocable de forma programática para eso.
    const initial = focusableWithin(container)[0];
    if (initial) {
      initial.focus();
    } else {
      container.setAttribute("tabindex", "-1");
      container.focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      const focusable = focusableWithin(container);
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      const active = document.activeElement;

      // Si el foco se fue fuera del diálogo (o está en el contenedor), se
      // reengancha en el extremo que corresponda al sentido del tabulador.
      if (!(active instanceof HTMLElement) || !container.contains(active)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
        return;
      }

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
      // `isConnected` evita robar el foco si el disparador se desmontó con el
      // diálogo (por ejemplo el botón de una tarjeta que ya no está en la lista).
      if (previouslyFocused && previouslyFocused.isConnected) {
        previouslyFocused.focus();
      }
    };
  }, [containerRef, isOpen]);
}
