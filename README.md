# Threads by Zuri 🧵

**Luxury African fashion, designed and tailored in Nairobi.**
A premium e-commerce storefront — think *Zara meets Ankara* — built with
Next.js 14 (App Router) + TypeScript, Tailwind CSS and Framer Motion.

## ✨ Features

- **Editorial design system** — terracotta `#C1440E` / off-white `#FAF6F1` / charcoal `#1C1C1C`, DM Serif Display + DM Sans
- **Full-screen split hero** with 3D parallax depth scroll + film-grain overlay
- **Scrolling announcement bar** (free Nairobi delivery · Friday drops · M-Pesa)
- **Shop by category** horizontal pill scroller (Dresses, Tops, Trousers, Kaftans, Accessories, Men's Wear)
- **Product cards** with 3D tilt (vanilla-tilt), second-image hover swap, wishlist hearts, and an add-to-cart button that **morphs into a checkmark**
- **New arrivals** full-width horizontal strip · brand story · masonry reviews · Instagram grid · "Join the Zuri Circle" newsletter
- **Product pages** (`/products/[slug]`) — gallery with hover zoom, size-guide modal, colour swatches, Add to Cart + **Buy via WhatsApp**, related carousel, reviews, ISR (`revalidate: 300`), Product JSON-LD + per-product Open Graph
- **Slide-out cart drawer** + checkout (name, M-Pesa phone, address, notes)
- **Floating WhatsApp button** (bounces every 8s, hover tooltip) → `+254 112 272 061`
- **Custom dot cursor** on desktop, elegant page transitions, staggered scroll reveals
- All photography is **royalty-free from Pexels**, featuring real African models — no AI imagery

## 🔌 API routes

| Route | Method | Description |
| --- | --- | --- |
| `/api/products` | GET | Product catalogue (`?category=`, `?featured=true`, `?new=true`) |
| `/api/search` | GET | Live product search (`?q=`) |
| `/api/newsletter` | POST | Saves subscriber emails (Vercel KV when configured) |
| `/api/order` | POST | Validates + saves the order, returns a WhatsApp click-to-chat URL with the full order summary addressed to **+254112272061** |

> **WhatsApp note:** serverless functions can't push WhatsApp messages without
> the paid WhatsApp Business API. The store uses the standard Kenyan
> commerce pattern instead: the order is saved, then the customer taps one
> button that delivers the formatted order summary straight to the store's
> WhatsApp line.

## 🗄 Storage

Orders and newsletter emails are written to **Vercel KV** when
`KV_REST_API_URL` / `KV_REST_API_TOKEN` are present, and fall back to an
in-memory store locally — the site works with **zero configuration**.

## 🚀 Deploy to Vercel

1. Import this repo at [vercel.com/new](https://vercel.com/new) — Next.js is auto-detected, no settings needed.
2. *(Optional)* In the Vercel dashboard → **Storage → Create KV** (Upstash) and connect it to the project. The `KV_REST_API_*` env vars are injected automatically and orders/newsletter signups persist.
3. *(Optional)* Set `NEXT_PUBLIC_SITE_URL` to your production domain for canonical OG URLs.

## 🧑‍💻 Local development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```
