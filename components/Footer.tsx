import Link from "next/link";
import { CATEGORIES } from "@/lib/products";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-offwhite">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <p className="flex items-baseline gap-1">
              <span className="font-serif text-2xl">Threads</span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-terracotta">by</span>
              <span className="font-serif text-2xl italic text-terracotta">Zuri</span>
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-offwhite/60">
              Luxury African fashion, designed and tailored in Nairobi. Rooted
              in Africa, worn by the world.
            </p>
            <div className="mt-6 flex gap-4" aria-label="Social media">
              <a href="https://instagram.com/threadsbyzuri" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-offwhite/60 transition-colors hover:text-terracotta">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" /></svg>
              </a>
              <a href="https://tiktok.com/@threadsbyzuri" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-offwhite/60 transition-colors hover:text-terracotta">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 3c.4 2.1 1.8 3.7 3.9 4v3c-1.5 0-2.9-.5-3.9-1.2v6.4c0 3.5-2.6 5.8-5.7 5.8-3 0-5.4-2.3-5.4-5.3 0-3 2.4-5.4 5.5-5.4.3 0 .7 0 1 .1v3.1c-.3-.1-.6-.2-1-.2-1.4 0-2.5 1.1-2.5 2.4 0 1.3 1.1 2.3 2.4 2.3 1.5 0 2.7-1.1 2.7-2.9V3h3Z" /></svg>
              </a>
              <a href="https://x.com/threadsbyzuri" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="text-offwhite/60 transition-colors hover:text-terracotta">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 3h3.1l-6.8 7.8L21.8 21h-6.3l-4.9-6.4L5 21H1.9l7.3-8.3L2.2 3h6.4l4.4 5.9L17.5 3Zm-1.1 16.2h1.7L7.7 4.7H5.9l10.5 14.5Z" /></svg>
              </a>
              <a href="https://facebook.com/threadsbyzuri" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-offwhite/60 transition-colors hover:text-terracotta">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.9.2-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1Z" /></svg>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-offwhite/40">Shop</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/shop" className="text-offwhite/70 hover:text-terracotta transition-colors">All Collections</Link></li>
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link href={`/shop?category=${c.slug}`} className="text-offwhite/70 hover:text-terracotta transition-colors">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-offwhite/40">Customer Care</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/our-story" className="text-offwhite/70 hover:text-terracotta transition-colors">Our Story</Link></li>
              <li><Link href="/lookbook" className="text-offwhite/70 hover:text-terracotta transition-colors">Lookbook</Link></li>
              <li><Link href="/returns" className="text-offwhite/70 hover:text-terracotta transition-colors">Returns Policy</Link></li>
              <li><Link href="/checkout" className="text-offwhite/70 hover:text-terracotta transition-colors">Checkout</Link></li>
              <li>
                <a
                  href="https://wa.me/254112272061?text=Hello!%20I%20need%20help%20with%20my%20order%20from%20Threads%20by%20Zuri."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-offwhite/70 hover:text-terracotta transition-colors"
                >
                  WhatsApp Support
                </a>
              </li>
            </ul>
          </div>

          {/* Payments */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-offwhite/40">We Accept</h3>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="rounded-md bg-offwhite px-3 py-1.5 text-xs font-extrabold tracking-tight">
                <span className="text-[#43B02A]">M-</span>
                <span className="text-[#E2231A]">PESA</span>
              </span>
              <span className="rounded-md bg-offwhite px-3 py-1.5 text-xs font-extrabold italic tracking-tight text-[#1A1F71]">VISA</span>
              <span className="flex items-center rounded-md bg-offwhite px-3 py-1.5" aria-label="Mastercard">
                <span className="h-4 w-4 rounded-full bg-[#EB001B]" />
                <span className="-ml-1.5 h-4 w-4 rounded-full bg-[#F79E1B] opacity-90" />
              </span>
            </div>
            <p className="mt-6 text-sm text-offwhite/60">
              Kimathi Street, Nairobi CBD
              <br />
              Mon–Sat · 9am–7pm EAT
              <br />
              +254 112 272 061
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-offwhite/10 pt-8 text-xs text-offwhite/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Threads by Zuri. All rights reserved. Proudly Kenyan 🇰🇪</p>
          <p>
            Photography via{" "}
            <a href="https://www.pexels.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-terracotta">
              Pexels
            </a>{" "}
            — free to use.
          </p>
        </div>
      </div>
    </footer>
  );
}
