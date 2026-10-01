/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    // The Arena sandbox has no egress to the Pexels CDN, so let the browser
    // load images directly during local dev. On Vercel, full next/image
    // optimization is enabled automatically.
    unoptimized: !process.env.VERCEL,
    formats: ["image/avif", "image/webp"],
  },
};
export default nextConfig;
