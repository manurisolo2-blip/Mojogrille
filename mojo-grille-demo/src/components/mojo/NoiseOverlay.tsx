import React from "react";

export function NoiseOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[90] select-none"
      aria-hidden="true"
    >
      {/* 1. Grano vectorial de alta resolución con feTurbulence nativo en el DOM */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.15] mix-blend-multiply"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="craft-noise-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#craft-noise-filter)" />
      </svg>

      {/* 2. Textura fotomecánica de imprenta artesanal (/assets/noise.png) */}
      <div
        className="absolute inset-0 h-full w-full opacity-[0.12] mix-blend-multiply bg-repeat"
        style={{
          backgroundImage: "url('/assets/noise.png')",
        }}
      />
    </div>
  );
}

export default NoiseOverlay;
