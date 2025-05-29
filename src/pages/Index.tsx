
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { USPSection } from "@/components/USPSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <USPSection />
      <ProductGrid />
      
      <section className="py-24 bg-gradient-to-br from-yellow/20 via-cream to-coral/20 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-magenta/10 rounded-full animate-blob" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-turquoise/10 rounded-full animate-float" />
        <div className="decorative-dots absolute inset-0" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12">
            {/* On desktop: Left side image */}
            <div className="hidden md:flex md:order-1 md:w-1/3 justify-center md:justify-start">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-magenta/20 to-coral/20 rounded-full animate-pulse" />
                <img 
                  src="/lovable-uploads/bfc5609b-b140-44df-9041-4adb9b909b79.png" 
                  alt="Tisto's Proefpakket" 
                  className="w-full max-w-[320px] h-auto object-contain relative z-10 hover:scale-105 transition-transform duration-300" 
                />
              </div>
            </div>
            
            {/* Text content */}
            <div className="md:order-2 md:w-2/3 text-center md:text-left">
              <h2 className="font-poppins text-4xl md:text-6xl font-black mb-6 text-navy">
                Klaar om <span className="text-gradient">Tisto's</span> te ontdekken?
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-turquoise to-cyan mx-auto md:mx-0 mb-8 rounded-full" />
              <p className="font-inter text-lg mb-8 max-w-2xl mx-auto md:mx-0 text-navy/80 leading-relaxed">
                Vraag nu een gratis proefpakket aan voor jouw bedrijf of vereniging.
              </p>
              
              {/* On mobile: Show image between paragraph and button */}
              <div className="md:hidden flex justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-magenta/20 to-coral/20 rounded-full animate-pulse" />
                  <img 
                    src="/lovable-uploads/bfc5609b-b140-44df-9041-4adb9b909b79.png" 
                    alt="Tisto's Proefpakket" 
                    className="w-full max-w-[250px] h-auto object-contain relative z-10 hover:scale-105 transition-transform duration-300" 
                  />
                </div>
              </div>
              
              {/* Button */}
              <Link to="/sample-request">
                <Button 
                  variant="vibrant" 
                  size="lg"
                  className="font-poppins font-bold text-xl px-12 py-6 shadow-xl"
                >
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
