
import { Link } from "react-router-dom";
import { NavigationLink } from "./NavigationLink";

export const Header = () => {
  return (
    <header className="w-full py-4 px-6 md:px-8 absolute top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo - left aligned */}
        <Link to="/" className="relative z-10">
          <img 
            src="/lovable-uploads/22be7021-d285-4434-b86f-58683f43fb1f.png" 
            alt="Tisto's Logo" 
            className="h-12 md:h-16 w-auto object-contain" 
          />
        </Link>
        
        {/* Navigation link - right aligned */}
        <NavigationLink href="#product-grid-section" label="In de boxen" />
      </div>
    </header>
  );
};
