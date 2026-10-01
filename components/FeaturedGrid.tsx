import { PRODUCTS } from "@/lib/products";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

export default function FeaturedGrid() {
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 8);

  return (
    <section className="bg-sand-light/60 py-16 sm:py-24" aria-labelledby="featured-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-terracotta">Curated for you</p>
          <h2 id="featured-heading" className="mt-2 font-serif text-3xl sm:text-4xl">
            The Featured Collection
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {featured.map((product, i) => (
            <Reveal key={product.id} index={i} className="h-full">
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
