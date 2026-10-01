import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { WishlistProvider } from "@/lib/wishlist-context";
import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import CustomCursor from "@/components/CustomCursor";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://threads-by-zuri.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Threads by Zuri — Luxury African Fashion, Nairobi",
    template: "%s | Threads by Zuri",
  },
  description:
    "Premium East African fashion house in Nairobi. African-inspired modern clothing for men and women — dresses, kaftans, men's wear and artisan accessories. Free delivery in Nairobi above KES 2,000. Pay via M-Pesa.",
  keywords: [
    "African fashion",
    "Nairobi boutique",
    "Ankara dresses",
    "Kitenge",
    "Kenyan fashion",
    "M-Pesa shopping",
  ],
  openGraph: {
    type: "website",
    siteName: "Threads by Zuri",
    title: "Threads by Zuri — Luxury African Fashion, Nairobi",
    description:
      "New Collection. Rooted in Africa. Premium African-inspired clothing, delivered across Kenya.",
    locale: "en_KE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Threads by Zuri — Luxury African Fashion, Nairobi",
    description: "New Collection. Rooted in Africa.",
  },
};

export const viewport: Viewport = {
  themeColor: "#C1440E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://images.pexels.com" />
        <link
          rel="icon"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='18' fill='%23C1440E'/%3E%3Ctext x='50' y='68' font-size='52' text-anchor='middle' fill='%23FAF6F1' font-family='Georgia,serif'%3EZ%3C/text%3E%3C/svg%3E"
        />
      </head>
      <body>
        <CartProvider>
          <WishlistProvider>
            <CustomCursor />
            <Navbar />
            <AnnouncementBar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <CartDrawer />
            <WhatsAppFloat />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
