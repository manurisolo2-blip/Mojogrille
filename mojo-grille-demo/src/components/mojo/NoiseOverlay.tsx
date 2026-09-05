import React from "react";

export function NoiseOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Textura sutil fotomecánica de papel artesanal exclusivamente en el fondo (-z-10) */}
      <div
        className="absolute inset-0 h-full w-full bg-repeat opacity-40"
        style={{
          backgroundImage: "url('/assets/noise.png')",
        }}
      />
    </div>
  );
}

export default NoiseOverlay;
