import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Returns Policy",
  description: "Returns and exchanges at Threads by Zuri — 7-day hassle-free returns within Kenya.",
};

export default function ReturnsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-terracotta">Customer care</p>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl">Returns Policy</h1>

      <div className="mt-10 space-y-8 leading-relaxed text-charcoal/75">
        <section>
          <h2 className="font-serif text-2xl text-charcoal">7-day returns, no drama</h2>
          <p className="mt-3">
            If a piece isn&apos;t right, you have 7 days from delivery to return or
            exchange it. Items must be unworn, unwashed and with tags attached.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-2xl text-charcoal">How it works</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5">
            <li>
              Message us on WhatsApp (+254 112 272 061) with your order number
              and the item you&apos;d like to return.
            </li>
            <li>We arrange a rider pickup within Nairobi, or share the drop-off address for upcountry orders.</li>
            <li>Refunds go back to your M-Pesa within 48 hours of the item reaching us. Exchanges ship the same day.</li>
          </ol>
        </section>
        <section>
          <h2 className="font-serif text-2xl text-charcoal">What can&apos;t be returned</h2>
          <p className="mt-3">
            Custom-tailored pieces, accessories marked one-of-a-kind, and items
            bought on final sale. If in doubt, just ask us first.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-2xl text-charcoal">Damaged or wrong item?</h2>
          <p className="mt-3">
            That&apos;s on us. Send a photo on WhatsApp within 48 hours and we&apos;ll
            replace it free of charge, delivery included.
          </p>
        </section>
      </div>
    </div>
  );
}
