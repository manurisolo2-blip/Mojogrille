"use client";

import * as React from "react";
import { HoverHighlightText } from "@/components/ui/hover-highlight-text";

export function HoverHighlightTextDemo() {
  const wrapRef = React.useRef<HTMLDivElement>(null);

  // Auto-demonstrate the cursor-tracked spotlight so the reveal is
  // visible at rest (and in the thumbnail). A real cursor still drives
  // the effect interactively.
  React.useEffect(() => {
    const el = wrapRef.current?.firstElementChild as HTMLElement | null;
    if (!el) return;

    const fire = (type: string, cx: number, cy: number) => {
      el.dispatchEvent(
        new PointerEvent(type, {
          clientX: cx,
          clientY: cy,
          bubbles: true,
          cancelable: true,
          pointerType: "mouse",
        }),
      );
    };

    const seed = el.getBoundingClientRect();
    fire(
      "pointerdown",
      seed.left + seed.width * 0.5,
      seed.top + seed.height * 0.5,
    );

    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const r = el.getBoundingClientRect();
      const p = (Math.sin((t - start) / 1500) + 1) / 2; // 0..1 ease loop
      fire(
        "pointermove",
        r.left + r.width * (0.18 + 0.64 * p),
        r.top + r.height * 0.5,
      );
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="flex min-h-[420px] w-full items-center justify-center rounded-xl bg-zinc-950 px-6 py-16 text-white">
      <div ref={wrapRef} className="inline-block">
        <HoverHighlightText text="Move your cursor" as="h1" enableGlow />
      </div>
    </div>
  );
}

export default HoverHighlightTextDemo;
