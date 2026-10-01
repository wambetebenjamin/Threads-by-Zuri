"use client";

import { useEffect, useRef } from "react";

/**
 * Custom dot cursor — desktop (fine pointer) only. A small terracotta dot
 * tracks the pointer 1:1 while a soft ring eases behind it; both scale up
 * over interactive elements.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.classList.add("custom-cursor-enabled");
    dot.style.display = "block";
    ring.style.display = "block";

    let x = -100, y = -100, rx = -100, ry = -100;
    let raf = 0;
    let hovering = false;

    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = e.target as HTMLElement | null;
      hovering = Boolean(target?.closest("a, button, input, textarea, select, label, [data-cursor='hover']"));
    };

    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${hovering ? 2.2 : 1})`;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(${hovering ? 1.6 : 1})`;
      ring.style.opacity = hovering ? "0.9" : "0.45";
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      document.body.classList.remove("custom-cursor-enabled");
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-2 w-2 rounded-full bg-terracotta transition-[width,height] duration-150"
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[99] hidden h-8 w-8 rounded-full border border-terracotta/70"
      />
    </>
  );
}
