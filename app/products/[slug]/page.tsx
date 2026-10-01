import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PRODUCTS, getProduct, getRelated, categoryLabel } from "@/lib/products";
import ProductDetail from "@/components/product/ProductDetail";
import RelatedCarousel from "@/components/product/RelatedCarousel";
import ProductReviews from "@/components/product/ProductReviews";

// ISR: product pages revalidate every 5 minutes
export const revalidate = 300;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProduct(params.slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | Threads by Zuri`,
      description: product.description,
      images: [{ url: product.images[0], width: 900, height: 1200, alt: product.name }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Threads by Zuri`,
      description: product.description,
      images: [product.images[0]],
    },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const related = getRelated(product);

  // SEO: Product schema (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.id,
    brand: { "@type": "Brand", name: "Threads by Zuri" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "KES",
      price: product.price,
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Threads by Zuri" },
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="mb-8 text-xs text-charcoal/50" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-terracotta">Home</Link>
        <span className="mx-2">/</span>
        <Link href={`/shop?category=${product.category}`} className="hover:text-terracotta">
          {categoryLabel(product.category)}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-charcoal">{product.name}</span>
      </nav>

      <ProductDetail product={product} />
      <ProductReviews product={product} />
      <RelatedCarousel products={related} />
    </div>
  );
}
