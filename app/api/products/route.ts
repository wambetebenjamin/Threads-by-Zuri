import { NextResponse } from "next/server";
import { PRODUCTS, CATEGORIES } from "@/lib/products";

export const revalidate = 300;

/**
 * GET /api/products
 * Optional query params:
 *   - category: filter by category slug
 *   - featured / new: "true" to filter
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");
  const newArrival = searchParams.get("new");

  let products = PRODUCTS;
  if (category) products = products.filter((p) => p.category === category);
  if (featured === "true") products = products.filter((p) => p.featured);
  if (newArrival === "true") products = products.filter((p) => p.newArrival);

  return NextResponse.json({
    count: products.length,
    categories: CATEGORIES.map(({ slug, label }) => ({ slug, label })),
    products,
  });
}
