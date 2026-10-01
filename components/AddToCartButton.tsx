"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/products";

/**
 * Micro-interaction: the button morphs into a circular checkmark on click,
 * then returns to its label after the item lands in the cart.
 */
export default function AddToCartButton({
  product,
  size,
  color,
  quantity = 1,
  openDrawer = true,
  className = "",
  label = "Add to Cart",
}: {
  product: Product;
  size?: string;
  color?: string;
  quantity?: number;
  openDrawer?: boolean;
  className?: string;
  label?: string;
}) {
  const { addItem, openCart } = useCart();
  const [state, setState] = useState<"idle" | "done">("idle");

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (state === "done") return;
    addItem(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.images[0],
        size: size ?? product.sizes[0],
        color: color ?? product.colors[0].name,
      },
      quantity
    );
    setState("done");
    setTimeout(() => {
      if (openDrawer) openCart();
    }, 650);
    setTimeout(() => setState("idle"), 1800);
  };

  const done = state === "done";

  return (
    <motion.button
      onClick={handleClick}
      aria-label={done ? "Added to cart" : `Add ${product.name} to cart`}
      className={`relative flex items-center justify-center overflow-hidden text-sm font-semibold text-offwhite transition-colors ${
        done ? "bg-[#2F7D4F]" : "bg-charcoal hover:bg-terracotta"
      } ${className}`}
      animate={{ borderRadius: done ? 999 : 999 }}
      layout
    >
      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <motion.span
            key="check"
            initial={{ scale: 0, rotate: -90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 26 }}
            className="flex items-center gap-2 px-4 py-2.5"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
              <motion.path
                d="M4.5 12.5l5 5L19.5 7"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.35, delay: 0.1 }}
              />
            </svg>
            Added
          </motion.span>
        ) : (
          <motion.span
            key="label"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="px-4 py-2.5"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
