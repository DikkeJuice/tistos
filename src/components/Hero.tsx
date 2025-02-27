
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Solid background color */}
      <div className="absolute inset-0 bg-[#f2805b] -z-10" />
      
      <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col">
        {/* Logo in top left corner */}
        <div className="w-32 sm:w-40 mb-6">
          <img 
            src="/lovable-uploads/57192971-da23-4294-acbf-0fb2612abdbb.png" 
            alt="Tisto's Logo" 
            className="w-full h-auto object-contain" 
          />
        </div>
        
        {/* Text content */}
        <div className="max-w-xs sm:max-w-sm mt-4 z-10">
          <p className="text-white font-medium mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
          </p>
          
          {/* CTA Button */}
          <Button 
            size="lg" 
            className="bg-white text-[#f2805b] hover:bg-white/90 hover:text-[#f2805b]/90 font-semibold mt-4"
          >
            Order Now
          </Button>
        </div>
        
        {/* Image in bottom right corner */}
        <div className="absolute bottom-0 right-0 w-3/4 max-w-xs sm:max-w-sm z-0">
          <img 
            src="/lovable-uploads/57192971-da23-4294-acbf-0fb2612abdbb.png" 
            alt="Woman serving sandwich" 
            className="w-full h-auto object-contain" 
          />
        </div>
      </div>
    </section>
  );
};
