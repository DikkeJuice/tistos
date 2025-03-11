
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-center md:justify-start">
          <Link to="/" className="inline-block">
            <img 
              src="/lovable-uploads/4fefac10-95b4-48cb-9830-baa771465b58.png" 
              alt="Tistos Logo" 
              className="h-12 object-contain" 
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
