import { Button } from "@/components/ui/button";
export const Hero = () => {
  return <section className="min-h-screen relative overflow-hidden bg-[#f2805b]">
      {/* Bottom image - positioned to cover entire section */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img src="/lovable-uploads/db33a145-159d-4728-a644-cc0bb87b846d.png" alt="Person serving sandwich" className="w-full h-full object-contain object-bottom" />
      </div>
      
      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center p-6 h-full">
        {/* Logo - updated to be larger and centered */}
        <div className="w-60 sm:w-72 mb-8">
          <img src="/lovable-uploads/79eb4b29-9072-4121-988c-5da7e15293aa.png" alt="Tisto's Logo" className="w-full h-auto object-contain" />
        </div>
        
        {/* Text content */}
        <div className="max-w-md text-center">
          <p className="text-white text-lg mb-4">Unieke tosti's 
in een handomdraai</p>
          
          {/* CTA Button - using a contrasting color */}
          <Button size="lg" className="bg-white text-[#f2805b] hover:bg-white/90 mt-4 font-semibold">
            Order Now
          </Button>
        </div>
      </div>
    </section>;
};