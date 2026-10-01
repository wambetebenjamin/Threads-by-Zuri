import type { Metadata } from "next";
import Link from "next/link";
import { PRODUCTS, CATEGORIES, categoryLabel, type Category } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Shop the Collection",
  description:
    "Browse African-inspired dresses, tops, trousers, kaftans, accessories and men's wear. Prices in KES, free Nairobi delivery above KES 2,000.",
};

export default function ShopPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const active = searchParams.category as Category | undefined;
  const valid = CATEGORIES.some((c) => c.slug === active);
  const products = valid ? PRODUCTS.filter((p) => p.category === active) : PRODUCTS;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-terracotta">
          {products.length} pieces
        </p>
        <h1 className="mt-2 font-serif text-4xl sm:text-5xl">
          {valid && active ? categoryLabel(active) : "The Full Collection"}
        </h1>
      </Reveal>

      {/* Category filter pills */}
      <div className="no-scrollbar mt-8 flex gap-2 overflow-x-auto pb-2">
        <Link
          href="/shop"
          className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
            !valid
              ? "border-charcoal bg-charcoal text-offwhite"
              : "border-charcoal/15 hover:border-terracotta hover:text-terracotta"
          }`}
        >
          All
        </Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            href={`/shop?category=${c.slug}`}
            className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
              active === c.slug
                ? "border-charcoal bg-charcoal text-offwhite"
                : "border-charcoal/15 hover:border-terracotta hover:text-terracotta"
            }`}
          >
            {c.label}
          </Link>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product, i) => (
          <Reveal key={product.id} index={i % 4} className="h-full">
            <ProductCard product={product} priority={i < 4} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
