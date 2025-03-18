
import { cn } from "@/lib/utils";

// SVG components
const ButterIcon = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M44 14H12C9.79086 14 8 15.7909 8 18V38C8 40.2091 9.79086 42 12 42H44C46.2091 42 48 40.2091 48 38V18C48 15.7909 46.2091 14 44 14Z" fill="#FFF3CF" stroke="#003A40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 28H38" stroke="#003A40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 34H38" stroke="#003A40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 22H38" stroke="#003A40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DeliveryIcon = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M40 38H36V26H46L50 34V38H46" stroke="#003A40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 38H14" stroke="#003A40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M36 16H6V38H10" stroke="#003A40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="16" cy="38" r="4" fill="#F9BD74" stroke="#003A40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="40" cy="38" r="4" fill="#F9BD74" stroke="#003A40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const VarietyIcon = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M28 42C36.8366 42 44 36.4036 44 29.5C44 22.5964 36.8366 17 28 17C19.1634 17 12 22.5964 12 29.5C12 36.4036 19.1634 42 28 42Z" fill="#FFE6E3" stroke="#003A40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 31C22.6569 31 24 29.6569 24 28C24 26.3431 22.6569 25 21 25C19.3431 25 18 26.3431 18 28C18 29.6569 19.3431 31 21 31Z" fill="#FF5C53" stroke="#003A40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M35 31C36.6569 31 38 29.6569 38 28C38 26.3431 36.6569 25 35 25C33.3431 25 32 26.3431 32 28C32 29.6569 33.3431 31 35 31Z" fill="#FF5C53" stroke="#003A40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 35C23.5 39 32.5 39 36 35" stroke="#003A40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Core USP data
const usps = [
  {
    icon: <ButterIcon />,
    title: "Gemaakt met echte roomboter",
    description: "Onze tosti's worden bereid met hoogwaardige roomboter voor die onweerstaanbare, romige smaak"
  },
  {
    icon: <DeliveryIcon />,
    title: "Wekelijks vers bezorgd",
    description: "Geniet elke week van vers bereide tosti's, direct bij je thuis of op kantoor geleverd"
  },
  {
    icon: <VarietyIcon />,
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
                {usp.icon}
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
