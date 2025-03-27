
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { getSandwiches } from "@/lib/supabase/sandwiches";
import type { Sandwich } from "@/types/sandwich";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useSampleBox } from "@/contexts/SampleBoxContext";

export const ProductShowcase = () => {
  const [sandwiches, setSandwiches] = useState<Sandwich[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSandwich, setSelectedSandwich] = useState<Sandwich | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const { addToSampleBox, isSampleBoxFull, isInSampleBox } = useSampleBox();

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

  const handlePrevious = () => {
    setCurrentIndex(prevIndex => prevIndex === 0 ? sandwiches.length - 1 : prevIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex => prevIndex === sandwiches.length - 1 ? 0 : prevIndex + 1);
  };

  const handleImageClick = (sandwich: Sandwich) => {
    if (isZoomed) {
      setIsZoomed(false);
    } else {
      setSelectedSandwich(sandwich);
    }
  };
  
  const handleAddToSampleBox = (e: React.MouseEvent, sandwich: Sandwich) => {
    e.stopPropagation();
    
    if (isSampleBoxFull) {
      toast.error("Je proefpakket zit vol! Maximaal 10 tosti's.");
      return;
    }
    
    if (isInSampleBox(sandwich.id)) {
      toast.info(`${sandwich.name} zit al in je proefpakket`);
      return;
    }
    
    // Add to sample box
    addToSampleBox(sandwich);
    toast.success(`${sandwich.name} toegevoegd aan je proefpakket`);
  };

  const getAllergensList = (allergens: Sandwich['allergens']) => {
    return Object.entries(allergens)
      .filter(([_, isPresent]) => isPresent)
      .map(([allergen]) => allergen.charAt(0).toUpperCase() + allergen.slice(1))
      .join(", ");
  };

  const hasAllergens = (allergens: Sandwich['allergens']) => {
    return Object.values(allergens).some(isPresent => isPresent);
  };

  const currentSandwich = sandwiches[currentIndex];

  if (!currentSandwich) {
    return <div className="flex items-center justify-center min-h-[400px]">
        <div className="neuro-card animate-pulse">
          <p className="text-muted-foreground">Tosti's laden...</p>
        </div>
      </div>;
  }

  return <section className="py-24 bg-neuro-base relative overflow-hidden">
      <div className="container max-w-6xl mx-auto px-4">
        <h2 className="section-title text-center mb-16 font-poppins">
          Ontdek onze <span className="text-primary">signature tosti's</span>
        </h2>
        
        <div className="relative">
          <div className="flex items-center justify-center gap-8">
            <Button variant="ghost" size="icon" onClick={handlePrevious} className="neuro-button absolute left-4 z-10 rounded-full">
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <motion.div key={currentSandwich.id} initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.5 }} className="w-full max-w-xl mx-auto">
              <div 
                className="neuro-card product-card group overflow-visible"
                style={{ 
                  backgroundColor: currentSandwich.associated_color || '#DC5A32',
                  color: 'white'
                }}
              >
                <div className="relative w-[105%] -left-[2.5%] -mt-8 mb-6">
                  <motion.img src={currentSandwich.image_url} alt={currentSandwich.name} className="w-full h-64 object-contain rounded-xl cursor-pointer product-image" whileHover={{ scale: 1.05 }} onClick={() => handleImageClick(currentSandwich)} loading="lazy" />
                </div>

                <div className="space-y-4">
                  <motion.h3 className="text-2xl font-bold font-poppins" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    {currentSandwich.name}
                  </motion.h3>

                  <motion.p className="text-white/90" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    {currentSandwich.short_description}
                  </motion.p>

                  <motion.button 
                    className="w-full px-6 py-3 bg-white/10 text-white hover:bg-white/20 rounded-xl font-semibold transition-colors" 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 0.5 }} 
                    onClick={(e) => handleAddToSampleBox(e, currentSandwich)}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isInSampleBox(currentSandwich.id) ? "Toegevoegd" : "Proeven"}
                  </motion.button>
                </div>
              </div>
            </motion.div>

            <Button variant="ghost" size="icon" onClick={handleNext} className="neuro-button absolute right-4 z-10 rounded-full">
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedSandwich && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedSandwich(null)}
          >
            <motion.div
              initial={{ scale: 0.95, rotateX: 90 }}
              animate={{ scale: 1, rotateX: 0 }}
              exit={{ scale: 0.95, rotateX: -90 }}
              transition={{ duration: 0.4 }}
              className="neuro-card max-w-2xl w-full relative m-4"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedSandwich(null)}
                className="absolute right-4 top-4 p-2 bg-white/90 hover:bg-white rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <img
                src={selectedSandwich.image_url}
                alt={selectedSandwich.name}
                className="w-full h-80 object-contain rounded-xl mb-6"
              />
              <h3 className="text-2xl font-bold mb-4 font-poppins pr-12">
                {selectedSandwich.name}
              </h3>
              <p className="text-gray-600 mb-4">
                {selectedSandwich.long_description || selectedSandwich.short_description}
              </p>
              {hasAllergens(selectedSandwich.allergens) && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-600">
                    <span className="font-medium">Allergeneninformatie: </span>
                    {getAllergensList(selectedSandwich.allergens)}
                  </p>
                </div>
              )}
              
              <div className="mt-6">
                <motion.button 
                  className="w-full px-6 py-3 bg-primary text-white hover:bg-primary/90 rounded-xl font-semibold transition-colors" 
                  onClick={e => {
                    handleAddToSampleBox(e, selectedSandwich);
                    setSelectedSandwich(null);
                  }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isInSampleBox(selectedSandwich.id) || isSampleBoxFull}
                >
                  {isInSampleBox(selectedSandwich.id) 
                    ? "Toegevoegd aan proefpakket" 
                    : isSampleBoxFull 
                      ? "Proefpakket is vol" 
                      : "Toevoegen aan proefpakket"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>;
};
