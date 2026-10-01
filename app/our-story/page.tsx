import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { pexels } from "@/lib/images";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "How Threads by Zuri grew from one tailoring table on Kimathi Street into East Africa's boldest fashion house.",
};

export default function OurStoryPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <Reveal>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.35em] text-terracotta">Our Story</p>
        <h1 className="mt-3 text-center font-serif text-4xl leading-tight sm:text-6xl">
          Zuri means <span className="italic text-terracotta">beautiful</span>.
        </h1>
      </Reveal>

      <Reveal index={1}>
        <div className="grain relative mt-12 aspect-[16/9] overflow-hidden rounded-3xl">
          <Image
            src={pexels(20854779, 1400, 800)}
            alt="Two stylish women in traditional clothing at a vibrant outdoor market"
            fill
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
          />
        </div>
      </Reveal>

      <Reveal index={2}>
        <div className="prose-lg mx-auto mt-12 max-w-2xl space-y-6 leading-relaxed text-charcoal/75">
          <p>
            In 2021, Zuri Wanjiku was a fabric buyer with a single tailoring
            table on Kimathi Street and a stubborn belief: that the wax prints
            her grandmother wore to church deserved the same runway respect as
            anything out of Paris or Milan.
          </p>
          <p>
            She started with twelve dresses. They sold out in a weekend — not
            because of marketing, but because women stopped each other in the
            street to ask where the clothes were from.
          </p>
          <p>
            Today, Threads by Zuri is a team of twenty-three tailors, cutters
            and pattern-makers in our Nairobi atelier. We still source fabric
            the same way — by hand, from markets in Eastleigh, Kampala, Lagos
            and Accra. We still pay our craftspeople properly. And we still
            believe every garment should make you stand taller.
          </p>
          <p className="font-serif text-2xl text-charcoal">
            Rooted in Africa. Worn by the world. That is the whole story.
          </p>
        </div>
      </Reveal>

      <Reveal index={3}>
        <div className="mt-14 text-center">
          <Link
            href="/shop"
            className="inline-block rounded-full bg-charcoal px-10 py-4 text-sm font-semibold text-offwhite transition-colors hover:bg-terracotta"
          >
            Shop the Collection
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
