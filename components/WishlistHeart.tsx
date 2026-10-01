"use client";

import { motion } from "framer-motion";
import { useWishlist } from "@/lib/wishlist-context";

export default function WishlistHeart({ productId, className = "" }: { productId: string; className?: string }) {
  const { has, toggle } = useWishlist();
  const active = has(productId);

  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(productId);
      }}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={active}
      className={`flex h-9 w-9 items-center justify-center rounded-full bg-offwhite/90 shadow-md backdrop-blur transition-colors hover:bg-offwhite ${className}`}
    >
      <motion.svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill={active ? "#7B2347" : "none"}
        stroke={active ? "#7B2347" : "#171719"}
        strokeWidth="1.8"
        animate={active ? { scale: [1, 1.35, 1] } : { scale: 1 }}
        transition={{ duration: 0.35 }}
      >
        <path d="M12 21s-7.5-4.7-10-9.3C.3 8 2.4 4.5 6 4.5c2.2 0 3.6 1.2 6 3.8 2.4-2.6 3.8-3.8 6-3.8 3.6 0 5.7 3.5 4 7.2C19.5 16.3 12 21 12 21Z" />
      </motion.svg>
    </motion.button>
  );
}
