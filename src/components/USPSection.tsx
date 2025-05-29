
import { cn } from "@/lib/utils";

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
    <section className="py-24 bg-gradient-to-br from-cream via-white to-cream relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-magenta/10 rounded-full animate-blob" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-turquoise/10 rounded-full animate-float" />
      <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-yellow/10 rounded-full animate-pulse" />
      
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="font-poppins text-4xl md:text-6xl font-black text-center mb-4 text-navy">
          Wat ons <span className="text-gradient">fanTOSTIsch</span> maakt
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-magenta to-coral mx-auto mb-16 rounded-full" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {usps.map((usp, index) => (
            <div
              key={index}
              className={cn(
                "flex flex-col items-center text-center p-8 rounded-2xl",
                "bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105",
                "border border-gray-100 relative overflow-hidden"
              )}
            >
              {/* Decorative corner element */}
              <div className={cn(
                "absolute top-0 right-0 w-16 h-16 rounded-bl-full",
                index === 0 && "bg-magenta/10",
                index === 1 && "bg-turquoise/10", 
                index === 2 && "bg-yellow/10"
              )} />
              
              {/* Icon */}
              <div className="mb-6 flex items-center justify-center relative">
                <div className={cn(
                  "absolute inset-0 rounded-full opacity-20 animate-pulse",
                  index === 0 && "bg-magenta",
                  index === 1 && "bg-turquoise",
                  index === 2 && "bg-yellow"
                )} />
                <img 
                  src={usp.imageUrl} 
                  alt={usp.title} 
                  className="w-32 h-32 object-contain relative z-10"
                />
              </div>
              
              {/* Title */}
              <h3 className="font-poppins text-xl font-bold mb-4 text-navy">
                {usp.title}
              </h3>
              
              {/* Description */}
              <p className="font-inter text-navy/80 leading-relaxed">
                {usp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
