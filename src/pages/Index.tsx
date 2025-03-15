
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
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            {/* On desktop: Left side image */}
            <div className="hidden md:flex md:order-1 md:w-1/3 justify-center md:justify-start">
              <img src="/lovable-uploads/bfc5609b-b140-44df-9041-4adb9b909b79.png" alt="Tisto's Proefpakket" className="w-full max-w-[280px] h-auto object-contain" />
            </div>
            
            {/* Text content */}
            <div className="md:order-2 md:w-2/3 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-orange-600">
                Klaar om Tisto's te ontdekken?
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto md:mx-0">Vraag nu een gratis proefpakket aan voor jouw bedrijf of vereniging.</p>
              
              {/* On mobile: Show image between paragraph and button */}
              <div className="md:hidden flex justify-center mb-8">
                <img src="/lovable-uploads/bfc5609b-b140-44df-9041-4adb9b909b79.png" alt="Tisto's Proefpakket" className="w-full max-w-[220px] h-auto object-contain" />
              </div>
              
              {/* Button */}
              <Link to="/sample-request">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg rounded-md">
                  Vraag een proefpakket aan
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
