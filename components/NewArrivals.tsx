"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PRODUCTS, formatKES } from "@/lib/products";
import WishlistHeart from "./WishlistHeart";

export default function NewArrivals() {
  const arrivals = PRODUCTS.filter((p) => p.newArrival);

  return (
    <section className="overflow-hidden py-16 sm:py-24" aria-labelledby="arrivals-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-terracotta">Fresh off the rack</p>
            <h2 id="arrivals-heading" className="mt-2 font-serif text-3xl sm:text-4xl">
              New Arrivals
            </h2>
          </div>
          <p className="hidden text-sm text-charcoal/50 sm:block">New drops every Friday ↔ scroll</p>
        </div>
      </div>

      <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-6 sm:px-6 lg:px-8">
        {arrivals.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="group relative w-64 shrink-0 snap-start sm:w-72"
          >
            <Link href={`/products/${p.slug}`} className="block">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src={p.images[0]}
                  alt={p.name}
                  fill
                  sizes="288px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-offwhite px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-terracotta">
                  New In
                </span>
              </div>
              <div className="mt-3 flex items-start justify-between gap-3">
                <div>
                  <p className="font-serif text-lg leading-tight">{p.name}</p>
                  <p className="mt-1 text-sm font-semibold text-terracotta">{formatKES(p.price)}</p>
                </div>
              </div>
            </Link>
            <WishlistHeart productId={p.id} className="absolute right-3 top-3" />
          </motion.div>
        ))}

        <Link
          href="/shop"
          className="flex w-64 shrink-0 snap-start items-center justify-center rounded-2xl border border-dashed border-charcoal/25 text-center transition-colors hover:border-terracotta hover:text-terracotta sm:w-72"
        >
          <span className="font-serif text-xl">
            View the full
            <br />
            collection →
          </span>
        </Link>
      </div>
    </section>
  );
}
