import React from "react";

export interface LatinMarketBagIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  strokeWidth?: number | string;
}

/**
 * Bolsa de Supermercado Latinoamericano (Bolsa Camiseta Tradicional)
 * Iconic Latin American grocery plastic bag with tall loop handles,
 * deep U-neck cutout, and lateral gusset pleats.
 */
export function LatinMarketBagIcon({
  className = "h-5 w-5",
  strokeWidth = 2,
  ...props
}: LatinMarketBagIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Silueta de bolsa camiseta de supermercado */}
      <path d="M5.5 3.5h2.5l1 5c.4 1.5 1.4 2 2.5 2s2.1-.5 2.5-2l1-5H18l1.5 16a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 19.5L5.5 3.5z" />
      {/* Fuelles/pliegues laterales de la bolsa */}
      <line x1="8.5" y1="13.5" x2="8.5" y2="18" strokeWidth={1.5} />
      <line x1="15.5" y1="13.5" x2="15.5" y2="18" strokeWidth={1.5} />
    </svg>
  );
}

export default LatinMarketBagIcon;
