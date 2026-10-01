"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart, cartItemKey } from "@/lib/cart-context";
import { formatKES } from "@/lib/products";

export default function CartDrawer() {
  const { items, isOpen, closeCart, subtotal, updateQuantity, removeItem } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-charcoal/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className="fixed right-0 top-0 z-50 flex h-full w-[min(92vw,420px)] flex-col bg-offwhite shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-charcoal/10 px-6 py-5">
              <h2 className="font-serif text-2xl">Your Cart</h2>
              <button onClick={closeCart} aria-label="Close cart" className="p-1 hover:text-terracotta">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="font-serif text-xl">Your cart is empty</p>
                  <p className="mt-2 text-sm text-charcoal/50">Beautiful things are waiting.</p>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="mt-6 rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-offwhite transition-colors hover:bg-terracotta-dark"
                  >
                    Shop the Collection
                  </Link>
                </div>
              ) : (
                <ul className="space-y-5">
                  {items.map((item) => {
                    const key = cartItemKey(item);
                    return (
                      <li key={key} className="flex gap-4">
                        <Link href={`/products/${item.slug}`} onClick={closeCart} className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg">
                          <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                        </Link>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <p className="truncate text-sm font-semibold">{item.name}</p>
                            <button onClick={() => removeItem(key)} aria-label={`Remove ${item.name}`} className="text-charcoal/40 hover:text-terracotta">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /></svg>
                            </button>
                          </div>
                          <p className="mt-0.5 text-xs text-charcoal/50">
                            {item.size} · {item.color}
                          </p>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center rounded-full border border-charcoal/15">
                              <button className="px-2.5 py-1 text-sm" aria-label="Decrease quantity" onClick={() => updateQuantity(key, item.quantity - 1)}>−</button>
                              <span className="w-6 text-center text-sm">{item.quantity}</span>
                              <button className="px-2.5 py-1 text-sm" aria-label="Increase quantity" onClick={() => updateQuantity(key, item.quantity + 1)}>+</button>
                            </div>
                            <span className="text-sm font-semibold text-terracotta">{formatKES(item.price * item.quantity)}</span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-charcoal/10 px-6 py-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-charcoal/60">Subtotal</span>
                  <span className="font-serif text-xl">{formatKES(subtotal)}</span>
                </div>
                <p className="mt-1 text-xs text-charcoal/50">
                  {subtotal >= 2000 ? "✓ Free delivery in Nairobi" : "Free Nairobi delivery above KES 2,000"}
                </p>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="mt-4 block rounded-full bg-terracotta py-3.5 text-center text-sm font-semibold text-offwhite transition-colors hover:bg-terracotta-dark"
                >
                  Checkout · Pay via M-Pesa
                </Link>
                <button onClick={closeCart} className="mt-2 w-full py-2 text-center text-xs uppercase tracking-widest text-charcoal/50 hover:text-charcoal">
                  Continue shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
