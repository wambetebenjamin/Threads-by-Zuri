import Image from "next/image";
import Reveal from "./Reveal";
import { pexels } from "@/lib/images";

export interface Review {
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
  product?: string;
}

export const REVIEWS: Review[] = [
  {
    name: "Wanjiru K.",
    location: "Kilimani, Nairobi",
    rating: 5,
    text: "The Zuri Gele Statement Dress stopped an entire wedding reception. The tailoring is immaculate — the waist, the fall of the skirt, everything. Delivered to Kilimani in under 24 hours.",
    avatar: pexels(37038761, 120, 120),
    product: "Zuri Gele Statement Dress",
  },
  {
    name: "Brian O.",
    location: "Westlands, Nairobi",
    rating: 5,
    text: "Bought the Baraka Agbada Set for my ruracio. Grown men were asking where I got it. Paid with M-Pesa, got updates on WhatsApp. Flawless service.",
    avatar: pexels(18256393, 120, 120),
    product: "Baraka Agbada Set",
  },
  {
    name: "Amina H.",
    location: "Mombasa",
    rating: 5,
    text: "The Malaika Kaftan is the softest thing I own. True coastal energy. Shipping to Mombasa took three days as promised.",
    avatar: pexels(31860868, 120, 120),
    product: "Malaika Flow Kaftan",
  },
  {
    name: "Njeri M.",
    location: "Karen, Nairobi",
    rating: 4,
    text: "Kipepeo Maxi Skirt is gorgeous and the pockets are generous. Took one star off because my first choice colour was sold out — restock faster, please!",
    avatar: pexels(12672215, 120, 120),
    product: "Kipepeo Maxi Skirt",
  },
  {
    name: "Achieng A.",
    location: "Kisumu",
    rating: 5,
    text: "I've ordered three times now. The quality is consistent, the prints are authentic, and the team genuinely cares. This is the Kenyan brand we've been waiting for.",
    avatar: pexels(7016799, 120, 120),
  },
  {
    name: "Fatuma S.",
    location: "Nairobi CBD",
    rating: 5,
    text: "Taji Headwrap Duo — the fabric quality is better than wraps I've bought at three times the price. The styling card is such a thoughtful touch.",
    avatar: pexels(33569519, 120, 120),
    product: "Taji Headwrap Duo",
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < rating ? "#C1440E" : "#E5DACB"} aria-hidden>
          <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9 2.9-6z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section className="py-16 sm:py-24" aria-labelledby="reviews-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-terracotta">4.9 / 5 from 600+ orders</p>
          <h2 id="reviews-heading" className="mt-2 font-serif text-3xl sm:text-4xl">
            Loved from Nairobi to Kisumu
          </h2>
        </Reveal>

        <div className="masonry mt-10">
          {REVIEWS.map((review, i) => (
            <Reveal key={review.name} index={i} className="mb-5">
              <figure className="rounded-2xl border border-charcoal/8 bg-white p-6 shadow-sm">
                <Stars rating={review.rating} />
                <blockquote className="mt-4 text-sm leading-relaxed text-charcoal/80">“{review.text}”</blockquote>
                {review.product && (
                  <p className="mt-3 text-[11px] font-semibold uppercase tracking-widest text-terracotta">
                    Purchased: {review.product}
                  </p>
                )}
                <figcaption className="mt-5 flex items-center gap-3">
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold">{review.name}</p>
                    <p className="text-xs text-charcoal/50">{review.location} · Verified buyer</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
