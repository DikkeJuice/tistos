
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { getSandwiches } from "@/lib/supabase/sandwiches";
import type { Sandwich } from "@/types/sandwich";
import { X } from "lucide-react";

export const ProductShowcase = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [sandwiches, setSandwiches] = useState<Sandwich[]>([]);
  const [selectedSandwich, setSelectedSandwich] = useState<Sandwich | null>(null);

  useEffect(() => {
    const fetchSandwiches = async () => {
      try {
        const data = await getSandwiches();
        setSandwiches(data);
      } catch (error) {
        toast.error("Er ging iets mis bij het ophalen van de tosti's");
        console.error(error);
      }
    };

    fetchSandwiches();
  }, []);

  const handleCardClick = (sandwich: Sandwich) => {
    setSelectedSandwich(sandwich);
  };

  const getAllergensList = (allergens: Sandwich['allergens']) => {
    return Object.entries(allergens)
      .filter(([_, isPresent]) => isPresent)
      .map(([allergen]) => allergen)
      .join(", ");
  };

  return (
    <section className="py-24 bg-secondary/20 relative">
      <div className="container">
        <h2 className="section-title text-center mb-16">
          Ontdek onze <span className="text-primary">signature tosti's</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sandwiches.map((sandwich) => (
            <motion.div
              key={sandwich.id}
              className="relative glass-card rounded-2xl p-6 card-hover cursor-pointer"
              onHoverStart={() => setHoveredId(sandwich.id)}
              onHoverEnd={() => setHoveredId(null)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => handleCardClick(sandwich)}
            >
              <div className="relative -mx-6 -mt-6 mb-4 overflow-visible">
                <img
                  src={sandwich.image_url}
                  alt={sandwich.name}
                  className="w-[calc(100%+3rem)] h-64 object-cover rounded-t-2xl transform transition-transform duration-300 hover:scale-105 shadow-lg"
                />
              </div>
              
              <h3 className="text-xl font-bold mb-2">{sandwich.name}</h3>
              <p className="text-muted-foreground">{sandwich.short_description}</p>
              <p className="text-primary font-bold mt-2">€{sandwich.price.toFixed(2)}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedSandwich && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedSandwich(null)}
          >
            <motion.div
              initial={{ scale: 0.95, rotateY: 90 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0.95, rotateY: -90 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl p-6 max-w-2xl w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={() => setSelectedSandwich(null)}
                  className="absolute -right-3 -top-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <img
                  src={selectedSandwich.image_url}
                  alt={selectedSandwich.name}
                  className="w-full h-80 object-cover rounded-xl shadow-xl mb-6"
                />
                <h3 className="text-2xl font-bold mb-4">{selectedSandwich.name}</h3>
                <p className="text-gray-600 mb-4">{selectedSandwich.long_description || selectedSandwich.short_description}</p>
                <div className="flex justify-between items-center">
                  <p className="text-primary text-xl font-bold">€{selectedSandwich.price.toFixed(2)}</p>
                  {selectedSandwich.allergens && (
                    <p className="text-sm text-muted-foreground">
                      Allergenen: {getAllergensList(selectedSandwich.allergens)}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
