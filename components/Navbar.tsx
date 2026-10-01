"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { CATEGORIES } from "@/lib/products";
import SearchOverlay from "./SearchOverlay";

export default function Navbar() {
  const { count, openCart } = useCart();
  const { ids } = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-offwhite/90 backdrop-blur-md shadow-[0_1px_0_rgba(28,28,28,0.08)]"
            : "bg-offwhite"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Mobile menu button */}
          <button
            className="lg:hidden -ml-2 p-2"
            aria-label="Open menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-baseline gap-1 select-none" aria-label="Threads by Zuri — home">
            <span className="font-serif text-2xl tracking-tight">Threads</span>
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-terracotta">by</span>
            <span className="font-serif text-2xl italic text-terracotta">Zuri</span>
          </Link>

          {/* Categories */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Categories">
            <Link href="/shop" className="text-sm font-medium hover:text-terracotta transition-colors">
              Shop All
            </Link>
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/shop?category=${c.slug}`}
                className="text-sm text-charcoal/70 hover:text-terracotta transition-colors"
              >
                {c.label}
              </Link>
            ))}
            <Link href="/lookbook" className="text-sm text-charcoal/70 hover:text-terracotta transition-colors">
              Lookbook
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              aria-label="Search"
              className="p-2 hover:text-terracotta transition-colors"
              onClick={() => setSearchOpen(true)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" strokeLinecap="round" />
              </svg>
            </button>
            <Link href="/wishlist" aria-label="Wishlist" className="relative p-2 hover:text-terracotta transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 21s-7.5-4.7-10-9.3C.3 8 2.4 4.5 6 4.5c2.2 0 3.6 1.2 6 3.8 2.4-2.6 3.8-3.8 6-3.8 3.6 0 5.7 3.5 4 7.2C19.5 16.3 12 21 12 21Z" />
              </svg>
              {ids.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-charcoal text-[10px] font-bold text-offwhite">
                  {ids.length}
                </span>
              )}
            </Link>
            <button aria-label="Open cart" className="relative p-2 hover:text-terracotta transition-colors" onClick={openCart}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 7h12l1.2 13H4.8L6 7Z" />
                <path d="M9 10V5.5a3 3 0 0 1 6 0V10" strokeLinecap="round" />
              </svg>
              <span
                className={`absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-terracotta text-[10px] font-bold text-offwhite transition-transform ${
                  count > 0 ? "scale-100" : "scale-0"
                }`}
                aria-label={`${count} items in cart`}
              >
                {count}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="lg:hidden border-t border-charcoal/10 bg-offwhite px-6 py-4" aria-label="Mobile categories">
            <div className="grid grid-cols-2 gap-3">
              <Link href="/shop" className="text-sm font-medium py-1">Shop All</Link>
              {CATEGORIES.map((c) => (
                <Link key={c.slug} href={`/shop?category=${c.slug}`} className="text-sm py-1 text-charcoal/70">
                  {c.label}
                </Link>
              ))}
              <Link href="/lookbook" className="text-sm py-1 text-charcoal/70">Lookbook</Link>
            </div>
          </nav>
        )}
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
