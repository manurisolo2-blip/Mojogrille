import React from "react";

export interface InkStampProps {
  className?: string;
  size?: number;
}

export function InkStamp({ className = "", size = 130 }: InkStampProps) {
  const center = 65;
  const radius = 45;
  const pathId = "ink-stamp-circle-path";

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full border-2 border-dashed border-brand-fire rotate-[-8deg] opacity-85 mix-blend-multiply select-none pointer-events-none transition-transform duration-300 hover:rotate-0 ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
      aria-hidden="true"
    >
      {/* SVG con texto circular perimetral */}
      <svg
        viewBox="0 0 130 130"
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        <defs>
          <path
            id={pathId}
            d={`M ${center},${center} m -${radius},0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
            fill="none"
          />
        </defs>

        {/* Anillo interior fino concéntrico con ligera irregularidad */}
        <circle
          cx={center}
          cy={center}
          r={radius - 8}
          fill="none"
          stroke="#E52516"
          strokeWidth="1"
          strokeDasharray="4 2"
          className="opacity-70"
        />

        {/* Texto perimetral circular */}
        <text className="fill-brand-fire font-sans text-[8.5px] font-bold uppercase tracking-[0.18em]">
          <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
            AUTHENTIC CRIOLLO RECIPE MIAMI FL
          </textPath>
        </text>
      </svg>

      {/* Núcleo central en tipografía condensada negrita */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center leading-none">
        <span className="font-display font-black text-brand-fire text-base sm:text-lg uppercase tracking-tight leading-[0.9]">
          CERTIFIED
          <br />
          SLOW ROAST
        </span>
        <span className="mt-1 font-sans text-[7.5px] font-bold text-brand-fire/80 tracking-wider uppercase">
          EST. BROWNSVILLE
        </span>
      </div>
    </div>
  );
}

export default InkStamp;
