const ITEMS = [
  "Free delivery in Nairobi above KES 2,000",
  "New arrivals every Friday",
  "Pay via M-Pesa",
];

export default function AnnouncementBar() {
  const row = [...ITEMS, ...ITEMS, ...ITEMS];
  return (
    <div className="relative z-30 overflow-hidden bg-charcoal py-2 text-offwhite" aria-label="Store announcements">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {[0, 1].map((half) => (
          <div key={half} className="flex" aria-hidden={half === 1}>
            {row.map((item, i) => (
              <span key={`${half}-${i}`} className="mx-6 flex items-center gap-6 text-xs font-medium uppercase tracking-[0.2em]">
                {item}
                <span className="text-terracotta">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
