import Image from "next/image";
import Reveal from "@/components/Reveal";
import { REVIEWS } from "@/components/Reviews";
import type { Product } from "@/lib/products";

export default function ProductReviews({ product }: { product: Product }) {
  // Show reviews tied to this product first, topped up with general ones.
  const matched = REVIEWS.filter((r) => r.product === product.name);
  const general = REVIEWS.filter((r) => r.product !== product.name);
  const reviews = [...matched, ...general].slice(0, 3);

  return (
    <section id="reviews" className="mt-20 scroll-mt-24" aria-labelledby="product-reviews-heading">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="product-reviews-heading" className="font-serif text-3xl">
            Reviews
          </h2>
          <p className="text-sm text-charcoal/60">
            <span className="text-terracotta">★ {product.rating.toFixed(1)}</span> · {product.reviewCount} verified reviews
          </p>
        </div>
      </Reveal>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        {reviews.map((review, i) => (
          <Reveal key={review.name} index={i}>
            <figure className="h-full rounded-2xl border border-charcoal/8 bg-white p-6 shadow-sm">
              <div className="flex gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, s) => (
                  <svg key={s} width="13" height="13" viewBox="0 0 24 24" fill={s < review.rating ? "#C1440E" : "#E5DACB"} aria-hidden>
                    <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9 2.9-6z" />
                  </svg>
                ))}
              </div>
              <blockquote className="mt-3 text-sm leading-relaxed text-charcoal/75">“{review.text}”</blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <Image src={review.avatar} alt={review.name} width={36} height={36} className="h-9 w-9 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold">{review.name}</p>
                  <p className="text-xs text-charcoal/50">{review.location}</p>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
