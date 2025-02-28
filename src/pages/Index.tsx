
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { USPSection } from "@/components/USPSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <ProductGrid />
      <USPSection />
      
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-orange-600">
            Klaar om Tisto's te ontdekken?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Vraag nu een gratis proefpakket aan voor jouw bedrijf of sportvereniging 
            en ervaar de kwaliteit en smaak van onze ambachtelijke tosti's.
          </p>
          <Link to="/sample-request">
            <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg rounded-md">
              Vraag een proefpakket aan
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Index;
