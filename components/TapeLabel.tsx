import React from 'react';

export interface TapeLabelProps {
  children: React.ReactNode;
  className?: string;
  rotate?: string;
}

export function TapeLabel({
  children,
  className = '',
  rotate = 'rotate-[-2deg]',
}: TapeLabelProps) {
  return (
    <div
      className={`inline-flex items-center justify-center bg-[#E3D824] font-sans text-[10px] text-charcoal-ink uppercase font-bold tracking-wider px-3 py-1 ${rotate} drop-shadow-[1px_2px_0px_rgba(20,18,16,0.15)] select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}

export default TapeLabel;
