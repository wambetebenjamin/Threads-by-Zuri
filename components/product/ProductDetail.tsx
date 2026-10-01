"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { formatKES, WHATSAPP_NUMBER, type Product } from "@/lib/products";
import AddToCartButton from "@/components/AddToCartButton";
import WishlistHeart from "@/components/WishlistHeart";
import SizeGuideModal from "./SizeGuideModal";

export default function ProductDetail({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0].name);
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const waText = encodeURIComponent(
    `Hello Threads by Zuri! I'd like to buy:\n\n*${product.name}*\nSize: ${size}\nColour: ${color}\nQty: ${quantity}\nPrice: ${formatKES(product.price * quantity)}\n\nIs it available?`
  );

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
      {/* Gallery */}
      <div>
        <div
          className="zoom-container relative aspect-[3/4] overflow-hidden rounded-3xl bg-sand-light"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setZoomPos({
              x: ((e.clientX - rect.left) / rect.width) * 100,
              y: ((e.clientY - rect.top) / rect.height) * 100,
            });
          }}
        >
          <Image
            key={activeImage}
            src={product.images[activeImage]}
            alt={`${product.name} — view ${activeImage + 1}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            style={{ transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` }}
          />
        </div>
        <div className="mt-4 flex gap-3">
          {product.images.map((img, i) => (
            <button
              key={img}
              onClick={() => setActiveImage(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative aspect-[3/4] w-20 overflow-hidden rounded-xl transition-all ${
                activeImage === i ? "ring-2 ring-terracotta ring-offset-2 ring-offset-offwhite" : "opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={img} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {product.badge && (
          <span className="inline-block rounded-full bg-terracotta px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-offwhite">
            {product.badge}
          </span>
        )}
        <div className="mt-3 flex items-start justify-between gap-4">
          <h1 className="font-serif text-3xl leading-tight sm:text-5xl">{product.name}</h1>
          <WishlistHeart productId={product.id} className="mt-1 shrink-0" />
        </div>

        <div className="mt-3 flex items-center gap-3 text-sm">
          <span className="flex items-center gap-1 text-terracotta">
            ★ {product.rating.toFixed(1)}
          </span>
          <span className="text-charcoal/40">·</span>
          <a href="#reviews" className="text-charcoal/60 underline-offset-2 hover:underline">
            {product.reviewCount} reviews
          </a>
        </div>

        <div className="mt-5 flex items-baseline gap-3">
          <span className="font-serif text-3xl text-terracotta">{formatKES(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-lg text-charcoal/40 line-through">{formatKES(product.compareAtPrice)}</span>
          )}
        </div>

        <p className="mt-6 leading-relaxed text-charcoal/70">{product.description}</p>

        {/* Colour swatches */}
        <div className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/50">
            Colour — <span className="text-charcoal">{color}</span>
          </p>
          <div className="mt-3 flex gap-3">
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setColor(c.name)}
                aria-label={`Colour: ${c.name}`}
                aria-pressed={color === c.name}
                className={`h-9 w-9 rounded-full border-2 transition-all ${
                  color === c.name ? "scale-110 border-terracotta" : "border-charcoal/10 hover:scale-105"
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="mt-7">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/50">Size</p>
            <button
              onClick={() => setSizeGuideOpen(true)}
              className="text-xs font-medium text-terracotta underline-offset-2 hover:underline"
            >
              Size guide
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                aria-pressed={size === s}
                className={`min-w-[3rem] rounded-full border px-4 py-2.5 text-sm font-medium transition-colors ${
                  size === s
                    ? "border-charcoal bg-charcoal text-offwhite"
                    : "border-charcoal/15 hover:border-terracotta hover:text-terracotta"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity + CTAs */}
        <div className="mt-8 flex items-center gap-4">
          <div className="flex items-center rounded-full border border-charcoal/15">
            <button className="px-4 py-3" aria-label="Decrease quantity" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <button className="px-4 py-3" aria-label="Increase quantity" onClick={() => setQuantity((q) => q + 1)}>+</button>
          </div>
          <AddToCartButton
            product={product}
            size={size}
            color={color}
            quantity={quantity}
            className="flex-1 rounded-full py-1 text-base"
          />
        </div>

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#25D366] py-3.5 text-sm font-semibold text-[#128C4A] transition-colors hover:bg-[#25D366] hover:text-white"
        >
          <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor" aria-hidden>
            <path d="M16.004 3C9.382 3 4 8.377 4 14.995c0 2.113.553 4.176 1.604 5.996L4 29l8.198-1.567a12.02 12.02 0 0 0 3.8.615h.006C22.625 28.048 28 22.67 28 16.052 28 8.377 22.626 3 16.004 3Z" />
          </svg>
          Buy via WhatsApp
        </a>

        {/* Details */}
        <ul className="mt-8 space-y-2 border-t border-charcoal/10 pt-6 text-sm text-charcoal/70">
          {product.details.map((d) => (
            <li key={d} className="flex items-start gap-2">
              <span className="mt-0.5 text-terracotta">✦</span> {d}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-charcoal/50">
          <span>🚚 Free Nairobi delivery above KES 2,000</span>
          <span>📱 Pay via M-Pesa</span>
          <span>↩ 7-day returns</span>
        </div>
      </motion.div>

      <SizeGuideModal open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </div>
  );
}
