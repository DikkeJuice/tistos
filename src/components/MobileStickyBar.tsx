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
  return <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50">
      <div className="container mx-auto flex flex-col items-center">
        <Button onClick={scrollToProductGrid} className="bg-[rgb(255,92,83)] hover:bg-[rgb(230,70,61)] text-white w-full py-5 rounded-md shadow-sm transition-colors duration-300 font-['Work_Sans'] font-medium">Stel je gratis proefpakket samen</Button>
        <p className="mt-2 text-sm text-gray-600 font-['Work_Sans']">Selecteer 10 tosti's naar keuze</p>
      </div>
    </div>;
};