"use client";

import { useState } from "react";

const WA_LINK =
  "https://wa.me/254112272061?text=Hello!%20I%20need%20help%20with%20my%20order%20from%20Threads%20by%20Zuri.";

export default function WhatsAppFloat() {
  const [hover, setHover] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      <span
        className={`pointer-events-none select-none rounded-full bg-charcoal px-4 py-2 text-sm text-offwhite shadow-lg transition-all duration-300 ${
          hover ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"
        }`}
        role="tooltip"
      >
        Need help? Chat with us
      </span>
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="flex h-14 w-14 animate-wa-bounce items-center justify-center rounded-full bg-[#25D366] shadow-xl shadow-[#25D366]/30 transition-transform hover:scale-110"
      >
        <svg width="28" height="28" viewBox="0 0 32 32" fill="#fff" aria-hidden>
          <path d="M16.004 3C9.382 3 4 8.377 4 14.995c0 2.113.553 4.176 1.604 5.996L4 29l8.198-1.567a12.02 12.02 0 0 0 3.8.615h.006C22.625 28.048 28 22.67 28 16.052 28 8.377 22.626 3 16.004 3Zm0 22.01h-.005a9.99 9.99 0 0 1-3.432-.609l-.736-.27-4.866.93.983-4.74-.3-.78a9.942 9.942 0 0 1-1.07-4.546c0-5.512 4.49-9.996 10.431-9.996 5.513 0 9.997 4.484 9.997 9.996 0 5.513-4.484 10.015-11.002 10.015Zm5.487-7.497c-.3-.15-1.777-.877-2.052-.977-.275-.1-.476-.15-.676.15-.2.3-.776.976-.951 1.176-.175.2-.35.226-.65.075-.3-.15-1.268-.467-2.415-1.49-.893-.796-1.495-1.78-1.67-2.079-.175-.3-.019-.462.131-.612.136-.135.3-.351.45-.526.15-.175.2-.3.3-.5.1-.2.05-.376-.025-.526-.075-.15-.675-1.627-.925-2.228-.244-.585-.492-.506-.676-.515l-.576-.01c-.2 0-.525.075-.8.375-.276.3-1.051 1.027-1.051 2.504 0 1.477 1.076 2.904 1.226 3.104.15.2 2.117 3.232 5.13 4.533.717.31 1.276.494 1.712.632.72.229 1.374.197 1.892.12.577-.087 1.777-.727 2.027-1.428.25-.701.25-1.302.175-1.428-.075-.125-.275-.2-.576-.35Z" />
        </svg>
      </a>
    </div>
  );
}
