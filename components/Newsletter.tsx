"use client";

import { useState } from "react";
import Reveal from "./Reveal";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStatus("success");
      setMessage(data.message);
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <section className="py-20 sm:py-28" aria-labelledby="newsletter-heading">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-terracotta">Members first</p>
          <h2 id="newsletter-heading" className="mt-3 font-serif text-4xl sm:text-5xl">
            Join the <span className="italic text-terracotta">Zuri Circle</span>
          </h2>
          <p className="mt-4 text-charcoal/60">
            Early access to Friday drops, members-only prices and styling notes
            from the atelier. No spam. Just beautiful things.
          </p>

          {status === "success" ? (
            <p className="mt-8 rounded-full bg-[#2F7D4F]/10 px-6 py-4 font-medium text-[#2F7D4F]">✓ {message}</p>
          ) : (
            <form onSubmit={subscribe} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 rounded-full border border-charcoal/15 bg-white px-6 py-4 text-sm outline-none transition-colors focus:border-terracotta"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="rounded-full bg-charcoal px-8 py-4 text-sm font-semibold text-offwhite transition-colors hover:bg-terracotta disabled:opacity-60"
              >
                {status === "loading" ? "Joining…" : "Join the Circle"}
              </button>
            </form>
          )}
          {status === "error" && <p className="mt-3 text-sm text-terracotta">{message}</p>}
        </Reveal>
      </div>
    </section>
  );
}
