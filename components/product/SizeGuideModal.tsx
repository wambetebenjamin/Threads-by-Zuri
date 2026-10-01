"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

const ROWS = [
  { size: "XS", bust: "78–82", waist: "60–64", hips: "84–88", uk: "6" },
  { size: "S", bust: "83–87", waist: "65–69", hips: "89–93", uk: "8" },
  { size: "M", bust: "88–93", waist: "70–75", hips: "94–99", uk: "10–12" },
  { size: "L", bust: "94–100", waist: "76–82", hips: "100–106", uk: "14" },
  { size: "XL", bust: "101–108", waist: "83–90", hips: "107–114", uk: "16" },
  { size: "XXL", bust: "109–116", waist: "91–98", hips: "115–122", uk: "18" },
];

export default function SizeGuideModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/50 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-lg rounded-3xl bg-offwhite p-7 shadow-2xl"
            initial={{ scale: 0.92, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 20, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Size guide"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl">Size Guide</h2>
              <button onClick={onClose} aria-label="Close size guide" className="p-1 hover:text-terracotta">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <p className="mt-2 text-sm text-charcoal/60">All measurements in centimetres. Between sizes? We recommend sizing up.</p>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-charcoal/15 text-xs uppercase tracking-widest text-charcoal/50">
                    <th className="py-2.5 pr-4">Size</th>
                    <th className="py-2.5 pr-4">Bust</th>
                    <th className="py-2.5 pr-4">Waist</th>
                    <th className="py-2.5 pr-4">Hips</th>
                    <th className="py-2.5">UK</th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((r) => (
                    <tr key={r.size} className="border-b border-charcoal/5">
                      <td className="py-2.5 pr-4 font-semibold">{r.size}</td>
                      <td className="py-2.5 pr-4">{r.bust}</td>
                      <td className="py-2.5 pr-4">{r.waist}</td>
                      <td className="py-2.5 pr-4">{r.hips}</td>
                      <td className="py-2.5">{r.uk}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-5 rounded-2xl bg-sand-light px-4 py-3 text-xs leading-relaxed text-charcoal/70">
              💬 Not sure? Send us your measurements on WhatsApp (+254 112 272 061)
              and we&apos;ll recommend a size — or tailor the piece to fit you exactly.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
