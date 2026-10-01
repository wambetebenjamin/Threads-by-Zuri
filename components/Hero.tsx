"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { pexels } from "@/lib/images";

/**
 * Full-screen split hero with a 3D parallax depth scroll effect:
 * the photo sits on a deeper plane (scales + translates slower than the
 * scroll), while the typography lifts away faster — a depth illusion.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.25]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const depthRotate = useTransform(scrollYProgress, [0, 1], [0, 6]);

  return (
    <section ref={ref} className="relative grid min-h-[calc(100svh-6.5rem)] grid-cols-1 overflow-hidden lg:grid-cols-2">
      {/* Left: editorial photo on a deep parallax plane */}
      <div className="grain relative order-2 min-h-[55vh] overflow-hidden lg:order-1 lg:min-h-full" style={{ perspective: 1200 }}>
        <motion.div
          className="absolute inset-0"
          style={{ y: imageY, scale: imageScale, rotateX: depthRotate, transformStyle: "preserve-3d" }}
        >
          <Image
            src={pexels(34584334, 1200, 1600)}
            alt="Editorial portrait of a model in vibrant African fashion with a gele headwrap"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-charcoal/30 via-transparent to-transparent" />
        <motion.p
          className="absolute bottom-6 left-6 z-[4] text-[10px] uppercase tracking-[0.35em] text-offwhite/90"
          style={{ opacity: textOpacity }}
        >
          Nairobi · Est. 2021
        </motion.p>
      </div>

      {/* Right: oversized typographic headline */}
      <motion.div
        className="relative order-1 flex flex-col justify-center px-6 py-16 sm:px-12 lg:order-2 lg:py-0 xl:px-20"
        style={{ y: textY, opacity: textOpacity }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-xs font-semibold uppercase tracking-[0.35em] text-terracotta"
        >
          The Zuri Edit — SS26
        </motion.p>

        <h1 className="mt-5 font-serif leading-[0.95]">
          <motion.span
            className="block text-5xl sm:text-7xl xl:text-8xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            New Collection.
          </motion.span>
          <motion.span
            className="mt-2 block text-5xl italic text-terracotta sm:text-7xl xl:text-8xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            Rooted in Africa.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="mt-6 max-w-md text-charcoal/60"
        >
          Bold silhouettes, hand-picked wax prints and coastal craft — designed
          and tailored in Nairobi, delivered across Kenya.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-9 flex flex-wrap gap-4"
        >
          <Link
            href="/shop"
            className="rounded-full bg-terracotta px-8 py-4 text-sm font-semibold text-offwhite shadow-lg shadow-terracotta/25 transition-all hover:-translate-y-0.5 hover:bg-terracotta-dark"
          >
            Shop Now
          </Link>
          <Link
            href="/lookbook"
            className="rounded-full border border-charcoal/20 px-8 py-4 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:border-charcoal hover:bg-charcoal hover:text-offwhite"
          >
            Lookbook
          </Link>
        </motion.div>

        <span className="pointer-events-none absolute -bottom-7 right-4 hidden select-none font-serif text-[11rem] leading-none text-outline opacity-60 xl:block" aria-hidden>
          Zuri
        </span>
      </motion.div>
    </section>
  );
}
