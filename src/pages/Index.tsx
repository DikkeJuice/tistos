
import { Hero } from "@/components/Hero";
import { ProductShowcase } from "@/components/ProductShowcase";
import { ProductGrid } from "@/components/ProductGrid";
import { USPSection } from "@/components/USPSection";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <ProductShowcase />
      <ProductGrid />
      <USPSection />
    </main>
  );
};

export default Index;
