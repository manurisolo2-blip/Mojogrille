'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export interface MagneticButtonProps {
  children: React.ReactNode;
  as?: 'a' | 'button';
  href?: string;
  className?: string;
  proximityThreshold?: number;
  magneticStrength?: number;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<any>) => void;
  onMouseLeave?: (e: React.MouseEvent<any>) => void;
  'aria-label'?: string;
  id?: string;
  disabled?: boolean;
  [key: string]: any;
}

export function MagneticButton({
  children,
  as,
  href,
  className = '',
  proximityThreshold = 40,
  magneticStrength = 0.3,
  type = 'button',
  onClick,
  onMouseLeave,
  'aria-label': ariaLabel,
  id,
  disabled,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<any>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button || typeof window === 'undefined') return;

    let isMagnetic = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      // Distancia euclidiana mínima del cursor a la caja delimitadora del botón
      const dx = Math.max(rect.left - e.clientX, 0, e.clientX - rect.right);
      const dy = Math.max(rect.top - e.clientY, 0, e.clientY - rect.bottom);
      const distanceToEdge = Math.hypot(dx, dy);

      // Si el cursor entra a menos de 40px del botón (o está sobre el botón)
      if (distanceToEdge < proximityThreshold) {
        isMagnetic = true;
        const buttonCenterX = rect.left + rect.width / 2;
        const buttonCenterY = rect.top + rect.height / 2;
        const deltaX = e.clientX - buttonCenterX;
        const deltaY = e.clientY - buttonCenterY;

        gsap.to(button, {
          x: deltaX * magneticStrength,
          y: deltaY * magneticStrength,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      } else if (isMagnetic) {
        // Al alejarse a más del umbral, regresa elásticamente a reposo
        isMagnetic = false;
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: 'elastic.out(1, 0.3)',
          overwrite: 'auto',
        });
      }
    };

    const handleMouseLeave = () => {
      isMagnetic = false;
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.3)',
        overwrite: 'auto',
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(button);
    };
  }, [proximityThreshold, magneticStrength]);

  const handleComponentMouseLeave = (e: React.MouseEvent<any>) => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.3)',
        overwrite: 'auto',
      });
    }
    onMouseLeave?.(e);
  };

  const isButtonElement = as === 'button' || (!href && as !== 'a');

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
