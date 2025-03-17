
import { Button } from "@/components/ui/button";
import { Header } from "./Header";
import { ArrowDown } from "lucide-react";
import { MobileStickyBar } from "./MobileStickyBar";
import { useIsMobile } from "@/hooks/use-mobile";

export const Hero = () => {
  const isMobile = useIsMobile();

  // Function to scroll to product grid section
  const scrollToProductGrid = () => {
    const productGridSection = document.querySelector('#product-grid-section');
    if (productGridSection) {
      productGridSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section 
        className="relative overflow-hidden flex flex-col" 
        style={{
          background: "#f9bd74",
          // On mobile, use viewport height minus header (approx 64px) and sticky bar (84px)
          // This ensures the hero section fits perfectly in the viewport
          minHeight: isMobile ? "calc(100vh - 148px)" : "100vh"
        }}
      >
        {/* Header */}
        <Header />
        
        {/* Main hero content */}
        <div className="flex flex-1 items-center">
          <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10 py-24 md:py-16">
            {/* Title on mobile - shown above image */}
            {isMobile && (
              <div className="mb-4 text-center">
                <h1 className="font-['Merriweather'] font-bold text-4xl text-[#003A40] leading-tight">
                  Nooit meer saaie tosti's
                </h1>
              </div>
            )}
            
            {/* Right side: Product image */}
            <div className="flex items-center justify-center order-1 lg:order-2 relative">
              <div className="relative w-full max-w-md mx-auto">
                {/* Main product image */}
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="/lovable-uploads/4fefac10-95b4-48cb-9830-baa771465b58.png" 
                    alt="Tosti met gesmolten kaas" 
                    className="w-full h-auto object-cover"
                  />
                </div>
                
                {/* Price badge */}
                <div className="absolute top-4 right-4 bg-white rounded-full px-4 py-2 shadow-md">
                  <div className="flex flex-col items-center">
                    <span className="line-through text-gray-400 text-sm">€15,95</span>
                    <span className="text-[rgb(255,92,83)] font-bold text-xl">€12,95</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Left side: Text & CTA */}
            <div className="flex flex-col justify-center order-2 lg:order-1 text-center lg:text-left">
              {/* Main headline - hidden on mobile since we show it above */}
              {!isMobile && (
                <h1 className="font-['Merriweather'] font-bold text-4xl md:text-5xl lg:text-6xl text-[#003A40] leading-tight mb-6">
                  Nooit meer saaie tosti's
                </h1>
              )}
              
              {/* Description paragraph - hidden on mobile */}
              <p className="hidden md:block font-['Work_Sans'] text-lg md:text-xl text-[#003A40]/90 mb-8 max-w-xl mx-auto lg:mx-0">
                Ontdek onze unieke collectie van verse tosti-ingrediënten direct bij jou thuis bezorgd. 
                Elke week nieuwe smaken voor een smaakvolle lunch of snelle maaltijd.
              </p>
              
              {/* CTA Button - hidden on mobile */}
              <div className="hidden md:flex justify-center lg:justify-start mb-12 md:mb-8">
                <Button 
                  onClick={scrollToProductGrid}
                  className="bg-[rgb(255,92,83)] hover:bg-[rgb(230,70,61)] text-white text-lg px-8 py-6 rounded-md shadow-md transition-all duration-300 hover:scale-105 font-['Work_Sans'] font-medium"
                >
                  Kies de box die bij je past
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Down arrow - smaller, with subtler animation and positioned at the bottom */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-4">
          <button onClick={scrollToProductGrid} className="text-[#003A40] hover:text-[#005a63] transition-colors">
            <ArrowDown size={24} className="animate-pulse" />
          </button>
        </div>
      </section>

      {/* Mobile sticky bar */}
      <MobileStickyBar />
    </>
  );
};
