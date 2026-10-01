"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Smooth 3D tilt on hover via vanilla-tilt (desktop pointer only). */
export default function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    let destroyed = false;
    import("vanilla-tilt").then(({ default: VanillaTilt }) => {
      if (destroyed || !ref.current) return;
      VanillaTilt.init(ref.current, {
        max: 8,
        speed: 900,
        scale: 1.02,
        glare: true,
        "max-glare": 0.12,
        perspective: 900,
        gyroscope: false,
      });
    });
    return () => {
      destroyed = true;
      (el as HTMLDivElement & { vanillaTilt?: { destroy: () => void } }).vanillaTilt?.destroy();
    };
  }, []);

  return (
    <div ref={ref} className={className} style={{ transformStyle: "preserve-3d" }}>
      {children}
    </div>
  );
}
