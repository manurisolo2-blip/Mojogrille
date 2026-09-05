import React from 'react';

export interface RebelChefBadgeProps {
  className?: string;
  badgeText?: string;
  tag?: string;
}

export function RebelChefBadge({
  className = '',
  badgeText = "CHEF'S SIGNATURE",
  tag = 'FUEGO BORICUA',
}: RebelChefBadgeProps) {
  return (
    <div
      className={`inline-flex items-center select-none pointer-events-none transition-transform duration-200 group-hover:scale-105 group-hover:rotate-0 ${className}`}
      aria-label={`${badgeText} - ${tag}`}
    >
      <div
        className="relative inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 bg-[#FFE600] text-charcoal-ink border-2 border-charcoal-ink shadow-[2.5px_2.5px_0px_#141210] rotate-[-2deg]"
        style={{
          // Dientes de sierra en extremos simulando cinta adhesiva rasgada a mano en chinchorreo callejero
          clipPath:
            'polygon(0% 8%, 4% 0%, 96% 0%, 100% 8%, 97% 25%, 100% 50%, 96% 75%, 100% 100%, 96% 92%, 4% 100%, 0% 92%, 3% 75%, 0% 50%, 4% 25%)',
        }}
      >
        <span className="font-sans text-[10px] sm:text-[11px] font-black tracking-wider text-charcoal-ink uppercase flex items-center gap-1">
          <span className="text-brand-fire">·</span>
          <span>{badgeText}</span>
          <span className="text-brand-fire">·</span>
        </span>
        <span className="h-3 w-px bg-charcoal-ink/40" />
        <span className="font-sans text-[9px] sm:text-[9.5px] font-black uppercase tracking-wider text-brand-fire">
          {tag}
        </span>
      </div>
    </div>
  );
}

export default RebelChefBadge;
