
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export const MobileStickyBar = () => {
  const isMobile = useIsMobile();

  // Function to scroll to product grid section
  const scrollToProductGrid = () => {
    const productGridSection = document.querySelector('#product-grid-section');
    if (productGridSection) {
      productGridSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  
  if (!isMobile) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] z-50 border-t border-gray-100">
      <div className="container mx-auto flex flex-col items-center">
        <Button 
          onClick={scrollToProductGrid} 
          variant="vibrant"
          className="w-full py-6 rounded-xl shadow-lg font-poppins font-bold text-lg"
        >
          Stel je gratis proefpakket samen
        </Button>
        <p className="mt-3 text-sm text-navy/70 font-inter font-medium">
          Selecteer 10 tosti's naar keuze
        </p>
      </div>
    </div>
  );
};
