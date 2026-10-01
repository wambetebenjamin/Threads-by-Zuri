"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart, cartItemKey } from "@/lib/cart-context";
import { formatKES } from "@/lib/products";

interface OrderResult {
  orderId: string;
  whatsappUrl: string;
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", address: "", notes: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState<OrderResult | null>(null);

  const deliveryFree = subtotal >= 2000;
  const deliveryFee = deliveryFree ? 0 : 300;
  const total = subtotal + deliveryFee;

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer: form, items, subtotal, deliveryFee, total }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not place order");
      setResult({ orderId: data.orderId, whatsappUrl: data.whatsappUrl });
      clearCart();
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Could not place order");
    }
  };

  /* ---- Success screen ---- */
  if (result) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#2F7D4F]"
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
            <path d="M4.5 12.5l5 5L19.5 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
        <h1 className="mt-6 font-serif text-4xl">Asante sana! 🎉</h1>
        <p className="mt-3 text-charcoal/60">
          Your order <span className="font-semibold text-charcoal">{result.orderId}</span> has been received.
          We&apos;ll confirm it and send an M-Pesa payment request to your phone shortly.
        </p>
        <div className="mt-8 rounded-2xl bg-sand-light p-5 text-sm leading-relaxed text-charcoal/70">
          <p className="font-semibold text-charcoal">One more step 👇</p>
          <p className="mt-1">
            Tap below to send your order summary to our WhatsApp — it&apos;s the
            fastest way to lock in your order and arrange delivery.
          </p>
        </div>
        <a
          href={result.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-4 text-sm font-bold text-white shadow-lg shadow-[#25D366]/30 transition-transform hover:scale-[1.02]"
        >
          <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor" aria-hidden>
            <path d="M16.004 3C9.382 3 4 8.377 4 14.995c0 2.113.553 4.176 1.604 5.996L4 29l8.198-1.567a12.02 12.02 0 0 0 3.8.615h.006C22.625 28.048 28 22.67 28 16.052 28 8.377 22.626 3 16.004 3Z" />
          </svg>
          Send Order to WhatsApp
        </a>
        <Link href="/shop" className="mt-4 inline-block text-sm text-charcoal/60 underline-offset-2 hover:text-terracotta hover:underline">
          Continue shopping
        </Link>
      </div>
    );
  }

  /* ---- Empty cart ---- */
  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-serif text-4xl">Your cart is empty</h1>
        <p className="mt-3 text-charcoal/60">Add something beautiful first.</p>
        <Link
          href="/shop"
          className="mt-8 inline-block rounded-full bg-terracotta px-8 py-4 text-sm font-semibold text-offwhite transition-colors hover:bg-terracotta-dark"
        >
          Shop the Collection
        </Link>
      </div>
    );
  }

  /* ---- Checkout form ---- */
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl sm:text-5xl">Checkout</h1>
      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-5">
        <form onSubmit={placeOrder} className="space-y-5 lg:col-span-3">
          <div>
            <label htmlFor="name" className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/50">
              Full name *
            </label>
            <input
              id="name"
              required
              value={form.name}
              onChange={set("name")}
              placeholder="e.g. Wanjiru Kamau"
              className="mt-2 w-full rounded-2xl border border-charcoal/15 bg-white px-5 py-4 text-sm outline-none transition-colors focus:border-terracotta"
            />
          </div>
          <div>
            <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/50">
              Phone — M-Pesa number *
            </label>
            <input
              id="phone"
              required
              type="tel"
              pattern="^(\+?254|0)?7\d{8}$|^(\+?254|0)?1\d{8}$"
              value={form.phone}
              onChange={set("phone")}
              placeholder="07XX XXX XXX"
              className="mt-2 w-full rounded-2xl border border-charcoal/15 bg-white px-5 py-4 text-sm outline-none transition-colors focus:border-terracotta"
            />
            <p className="mt-1.5 text-xs text-charcoal/50">We&apos;ll send the M-Pesa payment request to this number.</p>
          </div>
          <div>
            <label htmlFor="address" className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/50">
              Delivery address *
            </label>
            <textarea
              id="address"
              required
              rows={3}
              value={form.address}
              onChange={set("address")}
              placeholder="Estate / building, street, town — e.g. Rose Court, Argwings Kodhek Rd, Kilimani"
              className="mt-2 w-full resize-none rounded-2xl border border-charcoal/15 bg-white px-5 py-4 text-sm outline-none transition-colors focus:border-terracotta"
            />
          </div>
          <div>
            <label htmlFor="notes" className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/50">
              Order notes <span className="normal-case text-charcoal/40">(optional)</span>
            </label>
            <textarea
              id="notes"
              rows={2}
              value={form.notes}
              onChange={set("notes")}
              placeholder="Gift wrap? Preferred delivery time? Tailoring adjustments?"
              className="mt-2 w-full resize-none rounded-2xl border border-charcoal/15 bg-white px-5 py-4 text-sm outline-none transition-colors focus:border-terracotta"
            />
          </div>

          {status === "error" && (
            <p className="rounded-2xl bg-terracotta/10 px-5 py-3 text-sm text-terracotta">{error}</p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-full bg-terracotta py-4 text-sm font-bold text-offwhite shadow-lg shadow-terracotta/25 transition-all hover:bg-terracotta-dark disabled:opacity-60"
          >
            {status === "loading" ? "Placing order…" : `Place Order · ${formatKES(total)}`}
          </button>
          <p className="text-center text-xs text-charcoal/50">
            By placing an order you agree to our{" "}
            <Link href="/returns" className="underline hover:text-terracotta">returns policy</Link>.
            Payment is completed via M-Pesa after confirmation.
          </p>
        </form>

        {/* Summary */}
        <aside className="h-fit rounded-3xl bg-sand-light/70 p-6 lg:col-span-2">
          <h2 className="font-serif text-2xl">Order Summary</h2>
          <ul className="mt-5 space-y-4">
            {items.map((item) => (
              <li key={cartItemKey(item)} className="flex gap-3">
                <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-lg">
                  <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-charcoal/50">
                    {item.size} · {item.color} · ×{item.quantity}
                  </p>
                </div>
                <span className="text-sm font-medium">{formatKES(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-2 border-t border-charcoal/10 pt-4 text-sm">
            <div className="flex justify-between text-charcoal/60">
              <span>Subtotal</span>
              <span>{formatKES(subtotal)}</span>
            </div>
            <div className="flex justify-between text-charcoal/60">
              <span>Delivery (Nairobi)</span>
              <span>{deliveryFree ? "FREE" : formatKES(deliveryFee)}</span>
            </div>
            <div className="flex justify-between pt-2 font-serif text-xl text-charcoal">
              <span>Total</span>
              <span>{formatKES(total)}</span>
            </div>
          </div>
          <div className="mt-5 rounded-2xl bg-white/70 px-4 py-3 text-xs leading-relaxed text-charcoal/60">
            <span className="font-bold text-[#43B02A]">M-</span>
            <span className="font-bold text-[#E2231A]">PESA</span> — after you place the order, we confirm stock on
            WhatsApp and send an STK push to your phone. Visa & Mastercard also accepted on delivery.
          </div>
        </aside>
      </div>
    </div>
  );
}
