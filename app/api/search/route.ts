import { NextResponse } from "next/server";
import { PRODUCTS, categoryLabel } from "@/lib/products";

export const dynamic = "force-dynamic";

/** GET /api/search?q=… — live product search */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").trim().toLowerCase();

  if (!q) return NextResponse.json({ results: [] });

  const terms = q.split(/\s+/);
  const results = PRODUCTS.map((p) => {
    const haystack = [p.name, p.description, p.category, categoryLabel(p.category), ...p.details, ...p.colors.map((c) => c.name)]
      .join(" ")
      .toLowerCase();
    const score = terms.reduce((acc, t) => {
      if (p.name.toLowerCase().includes(t)) return acc + 3;
      if (haystack.includes(t)) return acc + 1;
      return acc;
    }, 0);
    return { p, score };
  })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map(({ p }) => ({
      slug: p.slug,
      name: p.name,
      price: p.price,
      image: p.images[0],
      category: p.category,
    }));

  return NextResponse.json({ results });
}
