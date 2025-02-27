
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChefHat, Truck, Utensils } from "lucide-react";

export const Hero = () => {
  // Function to scroll to product grid section
  const scrollToProductGrid = () => {
    const productGridSection = document.querySelector('#product-grid-section');
    if (productGridSection) {
      productGridSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return <section className="min-h-screen relative overflow-hidden flex items-center" style={{
    background: "linear-gradient(135deg, #F43900 0%, #D13200 100%)"
  }}>
      {/* Mobile background - tosti image with overlay */}
      <div className="absolute inset-0 lg:hidden overflow-hidden">
        <img 
          src="/lovable-uploads/4fefac10-95b4-48cb-9830-baa771465b58.png" 
          alt="Toasted sandwich background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F43900]/60 to-[#D13200]/70"></div>
      </div>

      {/* Abstract background patterns - subtle curves (visible on desktop only) */}
      <div className="absolute inset-0 overflow-hidden opacity-10 hidden lg:block">
        <div className="absolute top-[10%] left-[5%] w-96 h-96 rounded-full border border-white"></div>
        <div className="absolute bottom-[15%] right-[20%] w-64 h-64 rounded-full border border-white"></div>
        <div className="absolute top-[40%] right-[35%] w-40 h-40 rounded-full border border-white"></div>
      </div>
      
      {/* Main content container */}
      <div className="container px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10 mx-[20px] my-[20px] py-[20px]">
        {/* Left side: Logo, Text & CTA */}
        <div className="flex flex-col justify-center items-center">
          {/* Logo - centered on mobile, left-aligned on desktop */}
          <div className="w-80 md:w-96 mb-6">
            <img src="/lovable-uploads/79eb4b29-9072-4121-988c-5da7e15293aa.png" alt="Tisto's Logo" className="w-full h-auto object-contain" />
          </div>
          
          {/* Main text content - center aligned on mobile, left on desktop */}
          <h1 className="text-white text-4xl font-bold mb-4 leading-tight text-center lg:text-center md:text-6xl">Nooit meer saaie tosti's</h1>
          
          {/* USPs replacing the paragraph */}
          <div className="flex flex-col gap-3 mb-6 max-w-lg">
            <div className="flex items-center gap-3 text-white/90 text-lg">
              <div className="bg-[#ffc826]/20 p-2 rounded-full">
                <Utensils size={20} className="text-[#ffc826]" />
              </div>
              <span>10 spannende smaken</span>
            </div>
            
            <div className="flex items-center gap-3 text-white/90 text-lg">
              <div className="bg-[#ffc826]/20 p-2 rounded-full">
                <Truck size={20} className="text-[#ffc826]" />
              </div>
              <span>Wekelijks vers geleverd</span>
            </div>
            
            <div className="flex items-center gap-3 text-white/90 text-lg">
              <div className="bg-[#ffc826]/20 p-2 rounded-full">
                <ChefHat size={20} className="text-[#ffc826]" />
              </div>
              <span>Eenvoudig te bereiden</span>
            </div>
          </div>
          
          {/* CTA Buttons - centered on mobile */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <Button 
              size="lg" 
              className="font-semibold shadow-[0_0_15px_rgba(244,57,0,0.3)] bg-[#ffc826] text-[#f43900] hover:bg-[#f4b400] hover:scale-105 hover:shadow-[0_0_20px_rgba(244,57,0,0.5)] transition-all duration-300"
              onClick={scrollToProductGrid}
            >
              Ontdek onze tosti's
            </Button>
            
            <Button size="lg" variant="ghost" className="font-semibold transition-colors text-[#ffc826] bg-[#ff5d25]">
              Ontdek Ons Verhaal
            </Button>
          </div>
        </div>
        
        {/* Right side: Toasted sandwich image (only visible on desktop) */}
        <div className="hidden lg:flex items-center justify-center pt-4 lg:pt-0">
          <div className="relative z-10 w-full max-w-[300px] md:max-w-md mx-auto">
            <img src="/lovable-uploads/4fefac10-95b4-48cb-9830-baa771465b58.png" alt="Toasted sandwich with melted cheese" className="w-full h-auto object-contain" />
          </div>
        </div>
      </div>
    </section>;
};
