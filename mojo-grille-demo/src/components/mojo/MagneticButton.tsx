import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

/** Atributos extra pasados al <a> o <button> subyacente. */
type PassthroughProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export interface MagneticButtonProps
  extends Omit<
    PassthroughProps,
    "onClick" | "onMouseLeave" | "type" | "className" | "id" | "children"
  > {
  children: React.ReactNode;
  as?: "a" | "button";
  href?: string;
  className?: string;
  proximityThreshold?: number;
  magneticStrength?: number;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLElement>) => void;
  "aria-label"?: string;
  id?: string;
  disabled?: boolean;
}

export function MagneticButton({
  children,
  as,
  href,
  className = "",
  proximityThreshold = 20,
  magneticStrength = 0.12,
  type = "button",
  onClick,
  onMouseLeave,
  "aria-label": ariaLabel,
  id,
  disabled,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const button = buttonRef.current;
    if (!button || typeof window === "undefined") return;
    // El botón que persigue al cursor es movimiento no solicitado: se omite.
    if (reducedMotion) {
      gsap.set(button, { x: 0, y: 0 });
      return;
    }

    let isMagnetic = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      // Distancia euclidiana mínima del cursor a la caja delimitadora del botón
      const dx = Math.max(rect.left - e.clientX, 0, e.clientX - rect.right);
      const dy = Math.max(rect.top - e.clientY, 0, e.clientY - rect.bottom);
      const distanceToEdge = Math.hypot(dx, dy);

      // Si el cursor entra a menos del umbral de proximidad (o está sobre el botón)
      if (distanceToEdge < proximityThreshold) {
        isMagnetic = true;
        const buttonCenterX = rect.left + rect.width / 2;
        const buttonCenterY = rect.top + rect.height / 2;
        const deltaX = e.clientX - buttonCenterX;
        const deltaY = e.clientY - buttonCenterY;

        // Limitar la traslación máxima a ±8px para evitar desplazamientos bruscos
        const clampedX = Math.max(-8, Math.min(8, deltaX * magneticStrength));
        const clampedY = Math.max(-8, Math.min(8, deltaY * magneticStrength));

        gsap.to(button, {
          x: clampedX,
          y: clampedY,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else if (isMagnetic) {
        // Al alejarse a más del umbral, regresa suavemente a reposo
        isMagnetic = false;
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const handleMouseLeave = () => {
      isMagnetic = false;
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
      gsap.killTweensOf(button);
    };
  }, [proximityThreshold, magneticStrength, reducedMotion]);

  const handleComponentMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
    onMouseLeave?.(e);
  };

  const isButtonElement = as === "button" || (!href && as !== "a");

  if (isButtonElement) {
    return (
      <button
        ref={buttonRef}
        type={type}
        onClick={onClick}
        onMouseLeave={handleComponentMouseLeave}
        className={className}
        aria-label={ariaLabel}
        id={id}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <a
      ref={buttonRef}
      href={href}
      onClick={onClick}
      onMouseLeave={handleComponentMouseLeave}
      className={className}
      aria-label={ariaLabel}
      id={id}
      {...props}
    >
      {children}
    </a>
  );
}

export default MagneticButton;
