"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { formatKES, categoryLabel } from "@/lib/products";

interface Result {
  slug: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [open]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results ?? []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 200);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="mx-auto mt-20 w-[min(92vw,640px)] rounded-2xl bg-offwhite p-5 shadow-2xl"
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Search products"
          >
            <div className="flex items-center gap-3 border-b border-charcoal/15 pb-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-charcoal/50">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" strokeLinecap="round" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search dresses, kaftans, men's wear…"
                className="w-full bg-transparent text-lg outline-none placeholder:text-charcoal/40"
              />
              <button onClick={onClose} className="text-xs uppercase tracking-widest text-charcoal/50 hover:text-terracotta">
                Esc
              </button>
            </div>

            <div className="mt-3 max-h-[50vh] overflow-y-auto">
              {loading && <p className="py-6 text-center text-sm text-charcoal/50">Searching…</p>}
              {!loading && query && results.length === 0 && (
                <p className="py-6 text-center text-sm text-charcoal/50">
                  Nothing found for “{query}”. Try “ankara”, “kaftan” or “shirt”.
                </p>
              )}
              {results.map((r) => (
                <Link
                  key={r.slug}
                  href={`/products/${r.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-4 rounded-xl p-2 transition-colors hover:bg-sand-light"
                >
                  <div className="relative h-14 w-11 shrink-0 overflow-hidden rounded-md">
                    <Image src={r.image} alt={r.name} fill sizes="44px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{r.name}</p>
                    <p className="text-xs uppercase tracking-wider text-charcoal/50">{categoryLabel(r.category)}</p>
                  </div>
                  <span className="text-sm font-semibold text-terracotta">{formatKES(r.price)}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
