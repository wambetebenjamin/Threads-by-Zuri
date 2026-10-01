"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Staggered reveal-on-scroll wrapper. Give children an index for stagger. */
export default function Reveal({
  children,
  index = 0,
  className,
  y = 32,
}: {
  children: ReactNode;
  index?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
