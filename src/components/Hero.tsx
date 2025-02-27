
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="min-h-screen relative bg-[#f2805b] flex flex-col overflow-hidden">
      {/* Content Container */}
      <div className="container mx-auto px-6 pt-10 pb-32 md:pb-60 flex flex-col h-full z-10 relative">
        {/* Logo */}
        <div className="w-60 sm:w-72 mb-12 md:mb-20">
          <img 
            src="/lovable-uploads/79eb4b29-9072-4121-988c-5da7e15293aa.png" 
            alt="Tisto's Logo" 
            className="w-full h-auto object-contain"
          />
        </div>
        
        {/* Main Content */}
        <div className="max-w-xl">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">
            Unieke tosti's in een handomdraai
          </h1>
          <p className="text-white/90 text-lg mb-8 max-w-md">
            Ontdek de lekkerste combinaties voor jouw perfecte tosti moment
          </p>
          
          {/* CTA Button */}
          <Button 
            size="lg" 
            className="bg-white text-[#f2805b] hover:bg-white/90 font-semibold"
          >
            Ontdek onze tosti's
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Bottom Image - positioned to cover the bottom of the section */}
      <div className="absolute bottom-0 left-0 right-0 z-0 h-[70%] md:h-[65%]">
        <img 
          src="/lovable-uploads/db33a145-159d-4728-a644-cc0bb87b846d.png" 
          alt="Person serving sandwich" 
          className="w-full h-full object-contain object-bottom" 
        />
      </div>
    </section>
  );
};
