import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { pexels } from "@/lib/images";

export const metadata: Metadata = {
  title: "Lookbook — SS26",
  description:
    "The Threads by Zuri SS26 lookbook: editorial African fashion photographed across East and West Africa.",
};

const LOOKS = [
  { id: 34584334, caption: "Look 01 — The Crown", tall: true },
  { id: 36029414, caption: "Look 02 — Twin Flames", tall: false },
  { id: 36029405, caption: "Look 03 — Baraka", tall: true },
  { id: 39883807, caption: "Look 04 — Night Bloom", tall: false },
  { id: 31864835, caption: "Look 05 — Mirror Mirror", tall: true },
  { id: 16779591, caption: "Look 06 — The Atelier", tall: false },
  { id: 37439187, caption: "Look 07 — Under the Fig Tree", tall: true },
  { id: 39731536, caption: "Look 08 — Lavender Hour", tall: false },
  { id: 5140815, caption: "Look 09 — Kipepeo", tall: true },
  { id: 39929276, caption: "Look 10 — Sisterhood", tall: false },
  { id: 38896079, caption: "Look 11 — Mtaa", tall: true },
  { id: 20854779, caption: "Look 12 — Market Day", tall: false },
];

export default function LookbookPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Reveal className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-terracotta">SS26 Editorial</p>
        <h1 className="mt-2 font-serif text-4xl sm:text-6xl">
          The Lookbook
        </h1>
        <p className="mt-4 text-charcoal/60">
          Twelve looks, photographed across East and West Africa. Every piece
          is available in limited runs — when a look sells out, it is gone.
        </p>
      </Reveal>

      <div className="masonry mt-12">
        {LOOKS.map((look, i) => (
          <Reveal key={look.id} index={i % 3} className="mb-5">
            <figure className="group relative overflow-hidden rounded-2xl">
              <Image
                src={pexels(look.id, 800, look.tall ? 1100 : 800)}
                alt={look.caption}
                width={800}
                height={look.tall ? 1100 : 800}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/80 to-transparent p-5 font-serif text-lg text-offwhite">
                {look.caption}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link
          href="/shop"
          className="inline-block rounded-full bg-terracotta px-10 py-4 text-sm font-semibold text-offwhite shadow-lg shadow-terracotta/25 transition-all hover:-translate-y-0.5 hover:bg-terracotta-dark"
        >
          Shop the Looks
        </Link>
      </div>
    </div>
  );
}
