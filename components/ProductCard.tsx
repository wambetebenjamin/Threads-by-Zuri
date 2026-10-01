"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import TiltCard from "./TiltCard";
import WishlistHeart from "./WishlistHeart";
import AddToCartButton from "./AddToCartButton";
import { formatKES, categoryLabel, type Product } from "@/lib/products";

export default function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const secondImage = product.images[1] ?? product.images[0];

  return (
    <TiltCard className="group h-full">
      <div
        className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow duration-300 group-hover:shadow-xl"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Link href={`/products/${product.slug}`} className="relative block aspect-[3/4] overflow-hidden" aria-label={product.name}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover transition-all duration-700 ease-out ${hovered ? "scale-105 opacity-0" : "opacity-100"}`}
          />
          <Image
            src={secondImage}
            alt={`${product.name} — alternate view`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover transition-all duration-700 ease-out ${hovered ? "scale-105 opacity-100" : "opacity-0"}`}
          />
          {product.badge && (
            <span
              className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-offwhite ${
                product.badge === "Limited" ? "bg-charcoal" : "bg-terracotta"
              }`}
            >
              {product.badge}
            </span>
          )}
        </Link>

        <WishlistHeart productId={product.id} className="absolute right-3 top-3" />

        <div className="flex flex-1 flex-col p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal/40">
            {categoryLabel(product.category)}
          </p>
          <Link href={`/products/${product.slug}`} className="mt-1 font-serif text-lg leading-snug hover:text-terracotta transition-colors">
            {product.name}
          </Link>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-semibold text-terracotta">{formatKES(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-xs text-charcoal/40 line-through">{formatKES(product.compareAtPrice)}</span>
            )}
          </div>
          <div className="mt-3">
            <AddToCartButton product={product} className="w-full rounded-full" />
          </div>
        </div>
      </div>
    </TiltCard>
  );
}
