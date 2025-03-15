
import { Link } from "react-router-dom";

interface NavigationLinkProps {
  href: string;
  label: string;
}

export const NavigationLink = ({ href, label }: NavigationLinkProps) => {
  return (
    <Link 
      to={href} 
      className="font-['Work_Sans'] text-[#003A40] hover:text-[#005a63] text-base md:text-lg font-medium transition-all duration-300 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-[#003A40]/70 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
    >
      {label}
    </Link>
  );
};
