
import { useEffect, useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { toast } from "sonner";
import { getSandwiches } from "@/lib/supabase/sandwiches";
import type { Sandwich } from "@/types/sandwich";
import { X, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";

export const ProductShowcase = () => {
  const [sandwiches, setSandwiches] = useState<Sandwich[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSandwich, setSelectedSandwich] = useState<Sandwich | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

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

  const handleDragEnd = (event: any, info: PanInfo) => {
    if (info.offset.x > 100) {
      handlePrevious();
    } else if (info.offset.x < -100) {
      handleNext();
    }
  };

  const handleImageClick = (sandwich: Sandwich) => {
    if (isZoomed) {
      setIsZoomed(false);
    } else {
      setSelectedSandwich(sandwich);
    }
  };

  const getAllergensList = (allergens: Sandwich['allergens']) => {
    return Object.entries(allergens).filter(([_, isPresent]) => isPresent).map(([allergen]) => allergen).join(", ");
  };

  const getAdjacentSandwich = (offset: number) => {
    const index = (currentIndex + offset + sandwiches.length) % sandwiches.length;
    return sandwiches[index];
  };

  if (sandwiches.length === 0) {
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
            <Button variant="ghost" size="icon" onClick={handlePrevious} className="neuro-button absolute left-4 z-10 rounded-full hidden md:flex">
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <div className="flex items-center justify-center w-full">
              {/* Previous Card */}
              <motion.div className="hidden md:block absolute left-[15%] z-0" style={{ filter: 'blur(2px)' }} animate={{ scale: 0.8, opacity: 0.6 }}>
                <div className="neuro-card product-card max-w-sm">
                  <div className="relative w-[105%] -left-[2.5%] -mt-8 mb-6">
                    <img src={getAdjacentSandwich(-1)?.image_url} alt="Previous sandwich" className="w-full h-48 object-contain rounded-xl" loading="lazy" />
                  </div>
                </div>
              </motion.div>

              {/* Current Card */}
              <motion.div 
                key={currentIndex}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-xl mx-auto z-10"
              >
                <div className="neuro-card product-card group overflow-visible">
                  <div className="relative w-[105%] -left-[2.5%] -mt-8 mb-6">
                    <motion.img 
                      src={sandwiches[currentIndex].image_url} 
                      alt={sandwiches[currentIndex].name} 
                      className="w-full h-64 object-contain rounded-xl cursor-pointer product-image" 
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleImageClick(sandwiches[currentIndex])}
                      loading="lazy" 
                    />
                  </div>

                  <div className="space-y-4">
                    <motion.h3 
                      className="text-2xl font-bold font-poppins"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {sandwiches[currentIndex].name}
                    </motion.h3>

                    <motion.p 
                      className="text-muted-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {sandwiches[currentIndex].short_description}
                    </motion.p>

                    <div className="flex justify-end">
                      {Object.values(sandwiches[currentIndex].allergens).some(value => value) && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <AlertCircle className="w-4 h-4" />
                          <span>Bevat allergenen</span>
                        </div>
                      )}
                    </div>

                    <motion.button 
                      className="w-full neuro-button text-primary hover:text-primary/80"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      onClick={() => toast.success(`${sandwiches[currentIndex].name} toegevoegd aan winkelwagen`)}
                    >
                      Proeven
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Next Card */}
              <motion.div className="hidden md:block absolute right-[15%] z-0" style={{ filter: 'blur(2px)' }} animate={{ scale: 0.8, opacity: 0.6 }}>
                <div className="neuro-card product-card max-w-sm">
                  <div className="relative w-[105%] -left-[2.5%] -mt-8 mb-6">
                    <img src={getAdjacentSandwich(1)?.image_url} alt="Next sandwich" className="w-full h-48 object-contain rounded-xl" loading="lazy" />
                  </div>
                </div>
              </motion.div>
            </div>

            <Button variant="ghost" size="icon" onClick={handleNext} className="neuro-button absolute right-4 z-10 rounded-full hidden md:flex">
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedSandwich(null)}
          >
            <motion.div
              initial={{ scale: 0.95, rotateX: 90 }}
              animate={{ scale: 1, rotateX: 0 }}
              exit={{ scale: 0.95, rotateX: -90 }}
              transition={{ duration: 0.4 }}
              className="neuro-card max-w-2xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative">
                <button 
                  onClick={() => setSelectedSandwich(null)}
                  className="absolute -right-3 -top-3 p-2 neuro-button rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <img 
                  src={selectedSandwich.image_url}
                  alt={selectedSandwich.name}
                  className="w-full h-80 object-contain rounded-xl mb-6"
                />
                <h3 className="text-2xl font-bold mb-4 font-poppins">{selectedSandwich.name}</h3>
                <p className="text-gray-600 mb-4">{selectedSandwich.long_description || selectedSandwich.short_description}</p>
                <div className="flex justify-end">
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
    </section>;
};
