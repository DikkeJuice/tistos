
import { cn } from "@/lib/utils";
import { GraduationCap, Leaf, Smile } from "lucide-react";

// Core USP data
const usps = [
  {
    imageUrl: "https://pxodqmbszdlzzkywkaop.supabase.co/storage/v1/object/public/vectors//boterblok.svg",
    title: "Gemaakt met echte roomboter",
    description: "Onze tosti's worden bereid met hoogwaardige roomboter voor die onweerstaanbare, romige smaak"
  },
  {
    imageUrl: "https://pxodqmbszdlzzkywkaop.supabase.co/storage/v1/object/public/vectors//bestelwagen.svg",
    title: "Wekelijks vers bezorgd",
    description: "Geniet elke week van vers bereide tosti's, direct bij je thuis of op kantoor geleverd"
  },
  {
    imageUrl: "https://pxodqmbszdlzzkywkaop.supabase.co/storage/v1/object/public/vectors//kwijlmond.svg",
    title: "Meer dan 10 spannende varianten",
    description: "Van klassiek tot avontuurlijk - ontdek ons groeiende assortiment aan unieke tosti-combinaties"
  }
];

export const USPSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="font-merriweather text-3xl md:text-4xl font-bold text-center mb-16 text-[#003A40]">
          Waarom kiezen voor <span className="text-[rgb(255,92,83)]">Tisto's</span>?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {usps.map((usp, index) => (
            <div
              key={index}
              className={cn(
                "flex flex-col items-center text-center px-6 py-8",
                "transition-all duration-300"
              )}
            >
              {/* Icon */}
              <div className="mb-6 flex items-center justify-center">
                <img 
                  src={usp.imageUrl} 
                  alt={usp.title} 
                  className="w-14 h-14 object-contain"
                />
              </div>
              
              {/* Title */}
              <h3 className="font-merriweather text-xl font-bold mb-4 text-[#003A40]">
                {usp.title}
              </h3>
              
              {/* Description */}
              <p className="font-['Work_Sans'] text-[#003A40]/80 leading-relaxed">
                {usp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
