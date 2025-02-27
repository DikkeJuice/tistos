
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { USPSection } from "@/components/USPSection";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <ProductGrid />
      <USPSection />
    </main>
  );
};

export default Index;
