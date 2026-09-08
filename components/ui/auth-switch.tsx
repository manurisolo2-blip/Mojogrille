import { cn } from "@/lib/utils";
import { useState } from "react";

export interface AuthSwitchProps {
  className?: string;
  title?: string;
  initialCount?: number;
}

export const Component = ({
  className,
  title = "Component Example",
  initialCount = 0,
}: AuthSwitchProps = {}) => {
  const [count, setCount] = useState(initialCount);

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4 p-4 rounded-lg bg-surface-sand/80 border border-charcoal-ink/15 text-charcoal-ink shadow-sm transition-all",
        className
      )}
    >
      <h1 className="text-2xl font-bold mb-2 font-display uppercase tracking-tight text-charcoal-ink">
        {title}
      </h1>
      <div className="flex flex-col items-center gap-1">
        <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-charcoal-ink/60">
          Recompensas & Visitas
        </span>
        <h2 className="text-xl font-semibold font-sans font-bold text-brand-fire">
          {count}
        </h2>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setCount((prev) => prev - 1)}
          className="h-8 w-8 flex items-center justify-center font-bold text-sm bg-cream-bg border border-charcoal-ink/20 text-charcoal-ink hover:bg-brand-fire hover:text-cream-bg hover:border-brand-fire transition-colors cursor-pointer select-none active:scale-95"
          aria-label="Disminuir contador"
        >
          -
        </button>
        <button
          type="button"
          onClick={() => setCount((prev) => prev + 1)}
          className="h-8 w-8 flex items-center justify-center font-bold text-sm bg-cream-bg border-charcoal-ink/20 text-charcoal-ink hover:bg-brand-fire hover:text-cream-bg hover:border-brand-fire transition-colors cursor-pointer select-none active:scale-95"
          aria-label="Aumentar contador"
        >
          +
        </button>
      </div>
    </div>
  );
};

export const AuthSwitch = Component;
export default Component;
