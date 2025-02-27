
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="min-h-screen relative overflow-hidden flex items-center" 
      style={{
        background: "linear-gradient(135deg, #F43900 0%, #D13200 100%)"
      }}
    >
      {/* Abstract background patterns - subtle curves */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-[10%] left-[5%] w-96 h-96 rounded-full border border-white"></div>
        <div className="absolute bottom-[15%] right-[20%] w-64 h-64 rounded-full border border-white"></div>
        <div className="absolute top-[40%] right-[35%] w-40 h-40 rounded-full border border-white"></div>
      </div>
      
      {/* Main content container */}
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        {/* Left side: Logo, Text & CTA */}
        <div className="flex flex-col justify-center items-center lg:items-start">
          {/* Logo - centered on mobile, left-aligned on desktop */}
          <div className="w-80 md:w-96 mb-6">
            <img 
              src="/lovable-uploads/79eb4b29-9072-4121-988c-5da7e15293aa.png" 
              alt="Tisto's Logo" 
              className="w-full h-auto object-contain"
            />
          </div>
          
          {/* Main text content - center aligned on mobile, left on desktop */}
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4 leading-tight text-center lg:text-left">
            Tosti's die samenbrengen, waar je ook speelt
          </h1>
          
          <p className="text-white/90 text-lg mb-6 max-w-lg text-center lg:text-left">
            Bij Tisto's draait alles om smaak en gezelligheid. Of je nu na een wedstrijd bijpraat, 
            een snelle snack zoekt of gewoon zin hebt in een écht goede tosti – wij zorgen voor de perfecte crunch.
          </p>
          
          {/* CTA Buttons - centered on mobile */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <Button 
              size="lg" 
              className="bg-[#F43900] hover:bg-[#F43900]/90 text-white font-semibold shadow-[0_0_15px_rgba(244,57,0,0.3)]"
            >
              Bestel Nu
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-[#F43900] font-semibold transition-colors"
            >
              Ontdek Ons Verhaal
            </Button>
          </div>
        </div>
        
        {/* Right side: Toasted sandwich image */}
        <div className="flex items-center justify-center pt-4 lg:pt-0">
          <div className="relative z-10 w-full max-w-[300px] md:max-w-md mx-auto">
            <img 
              src="/lovable-uploads/4fefac10-95b4-48cb-9830-baa771465b58.png"
              alt="Toasted sandwich with melted cheese" 
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
