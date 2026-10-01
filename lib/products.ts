import { pexels } from "./images";

export type Category =
  | "dresses"
  | "tops"
  | "trousers"
  | "kaftans"
  | "accessories"
  | "mens-wear";

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number; // KES
  compareAtPrice?: number;
  category: Category;
  description: string;
  details: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  images: string[];
  badge?: "New" | "Bestseller" | "Limited";
  featured?: boolean;
  newArrival?: boolean;
  rating: number;
  reviewCount: number;
}

export const CATEGORIES: { slug: Category; label: string; image: string }[] = [
  { slug: "dresses", label: "Dresses", image: pexels(18250133, 500, 640) },
  { slug: "tops", label: "Tops", image: pexels(9485740, 500, 640) },
  { slug: "trousers", label: "Trousers", image: pexels(27844486, 500, 640) },
  { slug: "kaftans", label: "Kaftans", image: pexels(32200980, 500, 640) },
  { slug: "accessories", label: "Accessories", image: pexels(4256284, 500, 640) },
  { slug: "mens-wear", label: "Men's Wear", image: pexels(36029405, 500, 640) },
];

export const PRODUCTS: Product[] = [
  {
    id: "p01",
    slug: "zuri-gele-statement-dress",
    name: "Zuri Gele Statement Dress",
    price: 8900,
    compareAtPrice: 10500,
    category: "dresses",
    description:
      "Our signature piece. A sculpted Ankara dress with a matching gele-inspired headwrap, cut from hand-selected wax print sourced in Eastleigh. Made to turn heads from Kilimani to Karen.",
    details: [
      "100% premium African wax print cotton",
      "Matching headwrap included",
      "Tailored in Nairobi, Kenya",
      "Dry clean or gentle hand wash",
    ],
    colors: [
      { name: "Sunset", hex: "#C1440E" },
      { name: "Indigo", hex: "#2B3A67" },
      { name: "Forest", hex: "#2F5233" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [pexels(34584334), pexels(32945568), pexels(37616472)],
    badge: "Bestseller",
    featured: true,
    rating: 4.9,
    reviewCount: 124,
  },
  {
    id: "p02",
    slug: "nia-ankara-midi-dress",
    name: "Nia Ankara Midi Dress",
    price: 6450,
    category: "dresses",
    description:
      "A breezy midi in vivid blue wax print, with a cinched waist and pockets deep enough for your phone and your M-Pesa float. Everyday elegance, Nairobi style.",
    details: [
      "Breathable wax print cotton",
      "Side pockets · concealed zip",
      "Midi length, true to size",
      "Machine wash cold",
    ],
    colors: [
      { name: "Lake Blue", hex: "#1F5F8B" },
      { name: "Terracotta", hex: "#C1440E" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [pexels(18250133), pexels(32289598), pexels(30235258)],
    badge: "New",
    featured: true,
    newArrival: true,
    rating: 4.8,
    reviewCount: 86,
  },
  {
    id: "p03",
    slug: "amani-emerald-kitenge-dress",
    name: "Amani Emerald Kitenge Dress",
    price: 7200,
    category: "dresses",
    description:
      "Deep emerald kitenge with a flattering A-line silhouette. Amani means peace — and that is exactly how this dress feels on. Garden party approved.",
    details: [
      "Soft-touch kitenge fabric",
      "A-line cut with flared hem",
      "Fully lined bodice",
      "Hand wash recommended",
    ],
    colors: [
      { name: "Emerald", hex: "#1E6B4F" },
      { name: "Marigold", hex: "#E8A317" },
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [pexels(34328277), pexels(37616472), pexels(32289598)],
    featured: true,
    rating: 4.7,
    reviewCount: 59,
  },
  {
    id: "p04",
    slug: "pink-blossom-ankara-gown",
    name: "Pink Blossom Ankara Gown",
    price: 9800,
    category: "dresses",
    description:
      "An occasion gown in soft pink Ankara with structured shoulders and a sweeping skirt. For weddings, ruracios and every moment in between.",
    details: [
      "Occasion-weight wax print",
      "Structured shoulder, sweeping skirt",
      "Hidden back zip",
      "Dry clean only",
    ],
    colors: [
      { name: "Blossom", hex: "#D96C8A" },
      { name: "Cream", hex: "#EFE5D6" },
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [pexels(33939066), pexels(30235258), pexels(34417794)],
    badge: "Limited",
    featured: true,
    newArrival: true,
    rating: 5.0,
    reviewCount: 31,
  },
  {
    id: "p05",
    slug: "malaika-flow-kaftan",
    name: "Malaika Flow Kaftan",
    price: 5900,
    category: "kaftans",
    description:
      "Floor-length, featherlight and impossibly graceful. The Malaika kaftan drapes like a dream and moves like the coast breeze in Diani.",
    details: [
      "Lightweight viscose blend",
      "Floor length, relaxed fit",
      "One size fits S–XL",
      "Cold machine wash",
    ],
    colors: [
      { name: "Royal", hex: "#4B3F8C" },
      { name: "Sand", hex: "#D9C3A5" },
    ],
    sizes: ["One Size"],
    images: [pexels(32200980), pexels(34417794), pexels(31864835)],
    featured: true,
    rating: 4.8,
    reviewCount: 47,
  },
  {
    id: "p06",
    slug: "zanzibar-mirror-kaftan",
    name: "Zanzibar Mirror Kaftan",
    price: 6700,
    category: "kaftans",
    description:
      "Inspired by Stone Town doorways — a flowing kaftan with intricate print work and a neckline finished in hand-stitched detail.",
    details: [
      "Premium printed chiffon with lining",
      "Hand-finished neckline",
      "Relaxed, flowing silhouette",
      "Hand wash only",
    ],
    colors: [
      { name: "Spice", hex: "#A34A28" },
      { name: "Ocean", hex: "#20668C" },
    ],
    sizes: ["S/M", "L/XL"],
    images: [pexels(31864835), pexels(39711522), pexels(32200980)],
    newArrival: true,
    rating: 4.6,
    reviewCount: 22,
  },
  {
    id: "p07",
    slug: "kipepeo-maxi-skirt",
    name: "Kipepeo Maxi Skirt",
    price: 4200,
    category: "trousers",
    description:
      "Kipepeo means butterfly — and this high-waisted maxi floats just like one. Bold print, deep pockets, endless twirl factor.",
    details: [
      "High-waisted with elastic back",
      "Deep side pockets",
      "Maxi length wax print",
      "Machine wash cold",
    ],
    colors: [
      { name: "Savanna", hex: "#C98A2C" },
      { name: "Charcoal", hex: "#1C1C1C" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [pexels(5140815), pexels(4937396), pexels(18391946)],
    featured: true,
    rating: 4.7,
    reviewCount: 64,
  },
  {
    id: "p08",
    slug: "uhuru-wide-leg-trousers",
    name: "Uhuru Wide-Leg Trousers",
    price: 4800,
    category: "trousers",
    description:
      "Freedom of movement, literally. Wide-leg trousers in breathable cotton with a tailored waist — dress them up with heels or down with sneakers.",
    details: [
      "Mid-weight breathable cotton",
      "Tailored high waist",
      "Wide-leg, full length",
      "Machine washable",
    ],
    colors: [
      { name: "Clay", hex: "#B0623A" },
      { name: "Ivory", hex: "#FAF6F1" },
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [pexels(27844486), pexels(7257963), pexels(37489490)],
    newArrival: true,
    rating: 4.5,
    reviewCount: 18,
  },
  {
    id: "p09",
    slug: "jua-safari-shirt",
    name: "Jua Safari Shirt",
    price: 3900,
    category: "mens-wear",
    description:
      "A crisp short-sleeve shirt in sunshine-ready fabric with subtle African print trim. From Nairobi boardrooms to Naivasha weekends.",
    details: [
      "Crisp cotton-linen blend",
      "African print inner collar & cuff",
      "Regular fit",
      "Machine wash warm",
    ],
    colors: [
      { name: "Olive", hex: "#5B6B3C" },
      { name: "Sky", hex: "#7FA8C9" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [pexels(29625972), pexels(35730557), pexels(18020223)],
    badge: "Bestseller",
    featured: true,
    rating: 4.8,
    reviewCount: 93,
  },
  {
    id: "p10",
    slug: "baraka-agbada-set",
    name: "Baraka Agbada Set",
    price: 12500,
    category: "mens-wear",
    description:
      "A three-piece agbada set with hand-embroidered detailing. Commanding, ceremonial, unforgettable. Baraka — blessings — guaranteed.",
    details: [
      "Three-piece: agbada, tunic, trousers",
      "Hand-embroidered neckline",
      "Premium brocade fabric",
      "Dry clean only",
    ],
    colors: [
      { name: "Ivory", hex: "#FAF6F1" },
      { name: "Midnight", hex: "#1C1C2E" },
      { name: "Lavender", hex: "#9B8BC4" },
    ],
    sizes: ["M", "L", "XL", "XXL"],
    images: [pexels(36029405), pexels(39731536), pexels(38896070)],
    badge: "Limited",
    featured: true,
    newArrival: true,
    rating: 4.9,
    reviewCount: 41,
  },
  {
    id: "p11",
    slug: "mtaa-street-shirt",
    name: "Mtaa Street Shirt",
    price: 3500,
    category: "mens-wear",
    description:
      "Streetwear with a Nairobi accent. A relaxed graphic shirt in warm beige with bold Afro-modern artwork — made for the mtaa and beyond.",
    details: [
      "Heavyweight combed cotton",
      "Relaxed boxy fit",
      "Original Afro-modern graphic",
      "Machine wash cold, inside out",
    ],
    colors: [
      { name: "Beige", hex: "#D9C3A5" },
      { name: "Charcoal", hex: "#1C1C1C" },
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [pexels(38896079), pexels(7257963), pexels(37938908)],
    newArrival: true,
    rating: 4.6,
    reviewCount: 27,
  },
  {
    id: "p12",
    slug: "tausi-silk-blouse",
    name: "Tausi Silk Blouse",
    price: 5200,
    category: "tops",
    description:
      "Tausi means peacock. A liquid-soft blouse that catches the light with every move — pair with the Uhuru trousers for the full set.",
    details: [
      "Silky satin-touch fabric",
      "Relaxed fit with French cuffs",
      "Mother-of-pearl buttons",
      "Hand wash cold",
    ],
    colors: [
      { name: "Champagne", hex: "#E8D5B5" },
      { name: "Teal", hex: "#2A7F7F" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [pexels(9485740), pexels(10698019), pexels(12672215)],
    featured: true,
    newArrival: true,
    rating: 4.7,
    reviewCount: 38,
  },
  {
    id: "p13",
    slug: "shanga-coastal-accessory-set",
    name: "Shanga Coastal Accessory Set",
    price: 2800,
    category: "accessories",
    description:
      "Hand-strung shell and bead set from coastal artisans — necklace, bracelet and a woven straw hat. Shanga means beads, and these tell a story.",
    details: [
      "Hand-strung by Kenyan coastal artisans",
      "Natural shells, glass beads, raffia",
      "Necklace + bracelet + hat",
      "Each set is one of a kind",
    ],
    colors: [
      { name: "Natural", hex: "#D9C3A5" },
      { name: "Ocean", hex: "#20668C" },
    ],
    sizes: ["One Size"],
    images: [pexels(4256284), pexels(20145326), pexels(39711522)],
    badge: "New",
    newArrival: true,
    rating: 4.9,
    reviewCount: 52,
  },
  {
    id: "p14",
    slug: "taji-headwrap-duo",
    name: "Taji Headwrap Duo",
    price: 1900,
    category: "accessories",
    description:
      "Two generous-cut headwraps in complementary prints. Taji means crown — wear yours daily. Tutorial card included for three signature ties.",
    details: [
      "Two 72-inch wax print wraps",
      "Pre-washed, colourfast",
      "Styling tutorial card included",
      "Machine wash cold",
    ],
    colors: [
      { name: "Fire", hex: "#C1440E" },
      { name: "Royal", hex: "#4B3F8C" },
    ],
    sizes: ["One Size"],
    images: [pexels(20145326), pexels(37038761), pexels(31860868)],
    rating: 4.8,
    reviewCount: 71,
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getRelated(product: Product, limit = 4): Product[] {
  const same = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  );
  const rest = PRODUCTS.filter(
    (p) => p.category !== product.category && p.id !== product.id
  );
  return [...same, ...rest].slice(0, limit);
}

export function formatKES(amount: number): string {
  return `KES ${amount.toLocaleString("en-KE")}`;
}

export const WHATSAPP_NUMBER = "254112272061";

export function categoryLabel(slug: string): string {
  return CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;
}
