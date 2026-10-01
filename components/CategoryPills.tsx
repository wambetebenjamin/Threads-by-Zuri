"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CATEGORIES } from "@/lib/products";

export default function CategoryPills() {
  return (
    <section className="py-16 sm:py-20" aria-labelledby="categories-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <h2 id="categories-heading" className="font-serif text-3xl sm:text-4xl">
            Shop by Category
          </h2>
          <Link href="/shop" className="text-sm font-medium text-terracotta hover:underline">
            View all →
          </Link>
        </div>
      </div>

      <div className="no-scrollbar mt-8 flex gap-5 overflow-x-auto px-4 pb-4 sm:px-6 lg:px-8">
        {CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.slug}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="shrink-0"
          >
            <Link
              href={`/shop?category=${cat.slug}`}
              className="group relative block h-56 w-44 overflow-hidden rounded-[5rem] sm:h-64 sm:w-48"
            >
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                sizes="192px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent transition-opacity group-hover:from-terracotta/80" />
              <span className="absolute bottom-6 left-0 right-0 text-center font-serif text-xl text-offwhite">
                {cat.label}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
