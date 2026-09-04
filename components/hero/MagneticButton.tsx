'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export interface MagneticButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  magneticRadius?: number;
  magneticStrength?: number;
  className?: string;
}

export function MagneticButton({
  children,
  magneticRadius = 120,
  magneticStrength = 0.35,
  className = '',
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button || typeof window === 'undefined') return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const buttonCenterX = rect.left + rect.width / 2;
      const buttonCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - buttonCenterX;
      const deltaY = e.clientY - buttonCenterY;
      const distance = Math.hypot(deltaX, deltaY);

      if (distance < magneticRadius) {
        gsap.to(button, {
          x: deltaX * magneticStrength,
          y: deltaY * magneticStrength,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      } else {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)',
          overwrite: 'auto',
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
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
  }, [magneticRadius, magneticStrength]);

  return (
    <a ref={buttonRef} className={className} {...props}>
      {children}
    </a>
  );
}

export default MagneticButton;
