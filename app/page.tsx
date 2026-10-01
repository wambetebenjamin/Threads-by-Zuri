import Hero from "@/components/Hero";
import CategoryPills from "@/components/CategoryPills";
import FeaturedGrid from "@/components/FeaturedGrid";
import NewArrivals from "@/components/NewArrivals";
import BrandStory from "@/components/BrandStory";
import Reviews from "@/components/Reviews";
import InstagramStrip from "@/components/InstagramStrip";
import Newsletter from "@/components/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryPills />
      <FeaturedGrid />
      <NewArrivals />
      <BrandStory />
      <Reviews />
      <InstagramStrip />
      <Newsletter />
    </>
  );
}
