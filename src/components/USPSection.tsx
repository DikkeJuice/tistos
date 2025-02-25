
import { Check } from "lucide-react";

const usps = [
  {
    title: "Unieke smaken",
    description: "Van pulled pork tot spinazie-feta, wij maken tosti's die verrassen"
  },
  {
    title: "Halal opties",
    description: "Zodat iedereen kan genieten van onze heerlijke tosti's"
  },
  {
    title: "Verse ingrediënten",
    description: "We gebruiken alleen de beste Nederlandse ingrediënten"
  },
  {
    title: "Perfect voor events",
    description: "Maak je sportevenement of bedrijfsdag extra speciaal"
  }
];

export const USPSection = () => {
  return (
    <section className="py-24 bg-accent/20">
      <div className="container">
        <h2 className="section-title text-center mb-16">
          Waarom kiezen voor <span className="text-primary">Tisto's</span>?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {usps.map((usp, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 p-6 glass-card rounded-xl"
            >
              <div className="bg-primary rounded-full p-2">
                <Check className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{usp.title}</h3>
                <p className="text-muted-foreground">{usp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
