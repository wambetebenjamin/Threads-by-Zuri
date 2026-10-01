import Image from "next/image";
import Reveal from "./Reveal";
import { pexels } from "@/lib/images";

const IG_TILES = [
  { id: 39883807, alt: "Two women in colourful African dresses at night" },
  { id: 36029414, alt: "Two elegant models in traditional attire" },
  { id: 37439166, alt: "Vibrant African fabric in sunlight, Uganda" },
  { id: 18391946, alt: "Three women posing in colourful clothes under trees" },
  { id: 39929276, alt: "Vibrant African fashion in an outdoor setting" },
  { id: 10698019, alt: "Smiling woman in traditional clothes on the street" },
];

export default function InstagramStrip() {
  return (
    <section className="bg-sand-light/60 py-16 sm:py-20" aria-labelledby="ig-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <h2 id="ig-heading" className="font-serif text-3xl sm:text-4xl">
            @threadsbyzuri
          </h2>
          <p className="mt-2 text-sm text-charcoal/60">Tag us to be featured — #RootedInAfrica</p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {IG_TILES.map((tile, i) => (
            <Reveal key={tile.id} index={i}>
              <a
                href="https://instagram.com/threadsbyzuri"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-xl"
                aria-label={`Instagram post: ${tile.alt}`}
              >
                <Image
                  src={pexels(tile.id, 500, 500)}
                  alt={tile.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-terracotta/0 opacity-0 transition-all duration-300 group-hover:bg-terracotta/50 group-hover:opacity-100">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FAF6F1" strokeWidth="1.8">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.2" cy="6.8" r="0.9" fill="#FAF6F1" stroke="none" />
                  </svg>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
