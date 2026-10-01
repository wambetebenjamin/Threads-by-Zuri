import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { pexels } from "@/lib/images";

export default function BrandStory() {
  return (
    <section className="bg-charcoal py-16 text-offwhite sm:py-24" aria-labelledby="story-heading">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <Reveal>
          <div className="grain relative aspect-[4/5] overflow-hidden rounded-3xl">
            <Image
              src={pexels(16779591, 1000, 1250)}
              alt="Designer in a vibrant jacket beside a rack of African print garments"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute bottom-5 left-5 z-[4] rounded-full bg-offwhite/90 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-charcoal">
              Our Nairobi atelier
            </div>
          </div>
        </Reveal>

        <Reveal index={1}>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-terracotta">Since 2021</p>
          <h2 id="story-heading" className="mt-3 font-serif text-3xl leading-tight sm:text-5xl">
            Threads with a soul,
            <br />
            <span className="italic text-terracotta">stitched in Nairobi.</span>
          </h2>
          <p className="mt-6 leading-relaxed text-offwhite/70">
            Threads by Zuri began at a single tailoring table on Kimathi
            Street with one conviction: African fashion belongs on the world
            stage. Not as a costume, but as couture. Every piece starts with
            fabric sourced from East and West African markets, is cut by
            Nairobi tailors paid fairly for their craft, and finished with the
            kind of detail you only get when clothes are made by people who
            love them.
          </p>
          <p className="mt-4 leading-relaxed text-offwhite/70">
            Zuri means <em>beautiful</em> in Swahili. We make clothes for the
            bold. Rooted in Africa and worn everywhere.
          </p>
          <Link
            href="/our-story"
            className="group mt-8 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-terracotta"
          >
            Our Story
            <span className="h-px w-10 bg-terracotta transition-all group-hover:w-16" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
