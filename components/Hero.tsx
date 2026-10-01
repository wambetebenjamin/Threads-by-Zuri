"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { pexels } from "@/lib/images";

/** The home hero is an interactive editorial cover: layered depth, hover tilt,
 * and gentle scroll parallax make the collection feel tangible rather than flat. */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-24%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const pointerX = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });
  const pointerY = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - box.left) / box.width * 2 - 1);
    pointerY.set((event.clientY - box.top) / box.height * 2 - 1);
  };
  const resetPointer = () => { pointerX.set(0); pointerY.set(0); };
  const cardRotateY = useTransform(pointerX, [-1, 1], [-8, 8]);
  const cardRotateX = useTransform(pointerY, [-1, 1], [7, -7]);
  const cardX = useTransform(pointerX, [-1, 1], [-10, 10]);
  const cardY = useTransform(pointerY, [-1, 1], [-8, 8]);
  const accessoryX = useTransform(pointerX, [-1, 1], [-18, 18]);
  const accessoryY = useTransform(pointerY, [-1, 1], [12, -12]);

  return (
    <section ref={ref} className="hero-scene relative isolate min-h-[calc(100svh-6.5rem)] overflow-hidden bg-charcoal text-offwhite">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_42%,#64243f_0%,#2b2028_28%,#171719_64%)]" />
      <div className="absolute -right-36 -top-36 -z-10 h-[34rem] w-[34rem] rounded-full border border-offwhite/10" />
      <div className="absolute bottom-[-18rem] left-[-10rem] -z-10 h-[34rem] w-[34rem] rounded-full border border-terracotta/30" />

      <div className="mx-auto grid min-h-[calc(100svh-6.5rem)] max-w-[1440px] grid-cols-1 items-center gap-10 px-6 py-14 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-4 lg:px-16 lg:py-16 xl:px-24">
        <motion.div className="relative z-10 max-w-xl" style={{ y: copyY, opacity: copyOpacity }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} className="mb-7 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.35em] text-terracotta-light">
            <span className="h-px w-10 bg-terracotta-light" /> The Zuri Edit · SS26
          </motion.div>
          <h1 className="font-serif text-[clamp(4rem,8vw,8rem)] leading-[.82] tracking-[-.045em]">
            <span className="block">Wear</span>
            <span className="block pl-[.2em] italic text-terracotta-light">your story.</span>
          </h1>
          <p className="mt-8 max-w-md text-base leading-relaxed text-offwhite/65 sm:text-lg">
            Bold silhouettes, hand-picked wax prints and coastal craft. Designed and tailored in Nairobi.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="/shop" className="rounded-full bg-terracotta px-8 py-4 text-sm font-bold text-offwhite shadow-[0_12px_35px_rgba(193,68,14,.35)] transition duration-300 hover:-translate-y-1 hover:bg-terracotta-light">
              Explore the collection <span aria-hidden className="ml-2">↗</span>
            </Link>
            <Link href="/lookbook" className="group flex items-center gap-3 px-2 py-3 text-sm font-medium text-offwhite/75 transition hover:text-offwhite">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-offwhite/30 transition group-hover:border-terracotta-light group-hover:bg-terracotta">▶</span> View lookbook
            </Link>
          </div>
          <div className="mt-14 flex gap-10 border-t border-offwhite/15 pt-5 text-[10px] uppercase tracking-[.25em] text-offwhite/45">
            <span><strong className="mr-2 text-offwhite">01</strong> Crafted in Nairobi</span>
            <span><strong className="mr-2 text-offwhite">02</strong> Limited drops</span>
          </div>
        </motion.div>

        <div className="relative mx-auto flex h-[min(72vh,680px)] w-full max-w-[620px] items-center justify-center" onPointerMove={onPointerMove} onPointerLeave={resetPointer} style={{ perspective: 1400 }}>
          <motion.div className="absolute left-[4%] top-[13%] z-0 h-28 w-28 rounded-full border border-terracotta/60 bg-terracotta/20 blur-[1px]" style={{ x: cardX, y: cardY }} animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }} />
          <motion.div className="absolute right-[4%] top-[15%] z-20 rounded-full border border-offwhite/25 bg-charcoal/50 px-4 py-2 text-[10px] uppercase tracking-[.25em] backdrop-blur-md" style={{ x: cardX, y: cardY }} animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>New season / 26</motion.div>

          <motion.div className="relative z-10 h-[82%] w-[69%] overflow-hidden rounded-[48%_48%_10%_10%] border border-offwhite/20 bg-charcoal shadow-2xl" style={{ rotateX: cardRotateX, rotateY: cardRotateY, x: cardX, y: cardY, transformStyle: "preserve-3d" }} transition={{ type: "spring", stiffness: 120, damping: 18 }}>
            <motion.div className="absolute -inset-[5%] h-[110%] w-[110%]" style={{ y: imageY }}>
              <Image src={pexels(34584334, 1000, 1400)} alt="Model wearing vibrant African fashion" fill priority sizes="(max-width: 1024px) 75vw, 45vw" className="object-cover" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/65 via-transparent to-terracotta/10" />
            <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between" style={{ transform: "translateZ(30px)" }}>
              <div><p className="text-[9px] uppercase tracking-[.3em] text-offwhite/65">Look 01</p><p className="mt-1 font-serif text-2xl italic">Kitenge / Form</p></div>
              <span className="grid h-11 w-11 place-items-center rounded-full border border-offwhite/40 text-lg">↗</span>
            </div>
          </motion.div>

          <motion.div className="absolute bottom-[9%] left-[0%] z-20 w-40 rounded-2xl border border-offwhite/20 bg-[#f4e9df]/95 p-3 text-charcoal shadow-2xl sm:w-48" style={{ x: accessoryX, y: accessoryY, rotate: -7 }} animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
            <div className="relative h-24 overflow-hidden rounded-xl"><Image src={pexels(4256284, 400, 300)} alt="Artisan accessories detail" fill sizes="192px" className="object-cover" /></div>
            <p className="mt-3 text-[9px] font-bold uppercase tracking-[.22em]">Made to be noticed</p>
          </motion.div>
          <motion.div className="absolute bottom-[17%] right-[0%] z-20 hidden rounded-full bg-terracotta p-5 text-center text-[10px] font-bold uppercase tracking-[.18em] shadow-xl sm:block" style={{ x: cardX, y: cardY }} animate={{ rotate: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>East<br />African<br />spirit</motion.div>
          <div className="absolute bottom-0 right-0 text-[10px] uppercase tracking-[.3em] text-offwhite/40">Scroll to discover ↓</div>
        </div>
      </div>
    </section>
  );
}
