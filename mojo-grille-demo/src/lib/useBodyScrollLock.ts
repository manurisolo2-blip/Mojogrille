import { useEffect } from "react";

/**
 * Cuántos overlays hay pidiendo el bloqueo ahora mismo, y qué valor de
 * `overflow` había antes del primero de ellos.
 *
 * Se lleva la cuenta a nivel de módulo porque los overlays se solapan: si el
 * carrito abre la ficha de un plato, el primero en cerrarse no debe devolver
 * el scroll mientras el otro sigue encima. Sólo el último en soltar restaura.
 */
let lockCount = 0;
let previousOverflow = "";

/**
 * Congela el scroll del documento mientras un overlay está abierto.
 *
 * Sin esto la rueda desplaza la página de detrás del modal y al cerrarlo has
 * perdido tu sitio en la carta.
 */
export function useBodyScrollLock(isLocked: boolean): void {
  useEffect(() => {
    if (!isLocked || typeof document === "undefined") return undefined;

    if (lockCount === 0) {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
    lockCount += 1;

    return () => {
      lockCount -= 1;
      if (lockCount === 0) {
        document.body.style.overflow = previousOverflow;
      }
    };
  }, [isLocked]);
}
