import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import type { Product } from "@/lib/products";

export default function RelatedCarousel({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <section className="mt-20" aria-labelledby="related-heading">
      <Reveal>
        <h2 id="related-heading" className="font-serif text-3xl">
          You may also love
        </h2>
      </Reveal>
      <div className="no-scrollbar mt-8 flex snap-x gap-5 overflow-x-auto pb-4">
        {products.map((p, i) => (
          <Reveal key={p.id} index={i} className="w-64 shrink-0 snap-start sm:w-72">
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
