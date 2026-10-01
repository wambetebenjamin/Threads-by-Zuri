"use client";

import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import { useWishlist } from "@/lib/wishlist-context";
import ProductCard from "@/components/ProductCard";

export default function WishlistPage() {
  const { ids } = useWishlist();
  const products = PRODUCTS.filter((p) => ids.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-terracotta">Saved for later</p>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl">Your Wishlist</h1>

      {products.length === 0 ? (
        <div className="mt-16 flex flex-col items-center text-center">
          <p className="font-serif text-2xl">Nothing saved yet</p>
          <p className="mt-2 max-w-sm text-charcoal/60">
            Tap the heart on any piece you love and it will wait for you here.
          </p>
          <Link
            href="/shop"
            className="mt-8 rounded-full bg-terracotta px-8 py-4 text-sm font-semibold text-offwhite transition-colors hover:bg-terracotta-dark"
          >
            Browse the Collection
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
