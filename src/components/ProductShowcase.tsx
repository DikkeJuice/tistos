
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { getSandwiches } from "@/lib/supabase/sandwiches";
import type { Sandwich } from "@/types/sandwich";
import { X, ChevronLeft, ChevronRight, Plus, Minus } from "lucide-react";
import { Button } from "./ui/button";
import { useSampleBox } from "@/contexts/SampleBoxContext";

export const ProductShowcase = () => {
  const [sandwiches, setSandwiches] = useState<Sandwich[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSandwich, setSelectedSandwich] = useState<Sandwich | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showQuantityPicker, setShowQuantityPicker] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  
  const { 
    addToSampleBox, 
    isSampleBoxFull, 
    isInSampleBox, 
    getSandwichQuantity,
    getRemainingCapacity
  } = useSampleBox();

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
    // Reset UI state when changing sandwiches
    setShowQuantityPicker(false);
    setSelectedQuantity(1);
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex => prevIndex === sandwiches.length - 1 ? 0 : prevIndex + 1);
    // Reset UI state when changing sandwiches
    setShowQuantityPicker(false);
    setSelectedQuantity(1);
  };

  const handleImageClick = (sandwich: Sandwich) => {
    if (isZoomed) {
      setIsZoomed(false);
    } else {
      setSelectedSandwich(sandwich);
    }
  };
  
  const handleAddToSampleBox = (e: React.MouseEvent, sandwich: Sandwich, quantity: number = 1) => {
    e.stopPropagation();
    
    if (isSampleBoxFull) {
      toast.error("Je proefpakket zit vol! Maximaal 10 tosti's.");
      return;
    }
    
    const currentQuantity = getSandwichQuantity(sandwich.id);
    const remaining = getRemainingCapacity();
    
    if (remaining < quantity) {
      toast.error(`Je kunt nog maar ${remaining} tosti's toevoegen aan je proefpakket.`);
      return;
    }
    
    // Add to sample box
    addToSampleBox(sandwich, quantity);
    toast.success(`${quantity}x ${sandwich.name} toegevoegd aan je proefpakket`);
    
    // Reset UI state after adding
    setShowQuantityPicker(false);
    setSelectedQuantity(1);
  };

  const handleProevenClick = (e: React.MouseEvent, sandwich: Sandwich) => {
    e.stopPropagation();
    
    if (isSampleBoxFull) {
      toast.error("Je proefpakket zit vol! Maximaal 10 tosti's.");
      return;
    }
    
    if (isInSampleBox(sandwich.id)) {
      toast.info(`${sandwich.name} zit al in je proefpakket`);
      return;
    }
    
    // Show quantity picker
    setShowQuantityPicker(true);
  };

  const incrementQuantity = () => {
    const remaining = getRemainingCapacity();
    if (selectedQuantity < remaining) {
      setSelectedQuantity(prev => prev + 1);
    } else {
      toast.info(`Je kunt nog maar ${remaining} tosti's toevoegen aan je proefpakket.`);
    }
  };

  const decrementQuantity = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity(prev => prev - 1);
    }
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

                  {showQuantityPicker ? (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="flex flex-col gap-3"
                    >
                      <div className="flex items-center justify-between bg-white/10 rounded-xl p-3">
                        <button 
                          onClick={decrementQuantity}
                          className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="font-semibold text-lg">{selectedQuantity}</span>
                        <button 
                          onClick={incrementQuantity}
                          className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          className="flex-1 px-4 py-3 border border-white/30 text-white hover:bg-white/10 rounded-xl font-semibold transition-colors" 
                          onClick={() => setShowQuantityPicker(false)}
                        >
                          Annuleren
                        </button>
                        <button 
                          className="flex-1 px-4 py-3 bg-white/20 text-white hover:bg-white/30 rounded-xl font-semibold transition-colors" 
                          onClick={(e) => handleAddToSampleBox(e, currentSandwich, selectedQuantity)}
                        >
                          Voeg toe
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.button 
                      className="w-full px-6 py-3 bg-white/10 text-white hover:bg-white/20 rounded-xl font-semibold transition-colors" 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      transition={{ delay: 0.5 }} 
                      onClick={(e) => handleProevenClick(e, currentSandwich)}
                      whileTap={{ scale: 0.95 }}
                    >
                      {getSandwichQuantity(currentSandwich.id) > 0 ? `${getSandwichQuantity(currentSandwich.id)}x toegevoegd` : "Proeven"}
                    </motion.button>
                  )}
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
              
              {getSandwichQuantity(selectedSandwich.id) > 0 ? (
                <div className="mt-6 flex items-center justify-between bg-gray-50 rounded-xl p-4">
                  <span className="font-medium">Aantal in proefpakket: {getSandwichQuantity(selectedSandwich.id)}</span>
                  <button 
                    className="text-red-500 hover:text-red-700 font-medium"
                    onClick={() => {
                      setSelectedSandwich(null);
                    }}
                  >
                    Sluiten
                  </button>
                </div>
              ) : (
                <div className="mt-6">
                  {showQuantityPicker ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between bg-gray-100 rounded-xl p-3">
                        <button 
                          onClick={decrementQuantity}
                          className="p-2 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="font-semibold text-lg">{selectedQuantity}</span>
                        <button 
                          onClick={incrementQuantity}
                          className="p-2 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-xl font-semibold transition-colors" 
                          onClick={() => setShowQuantityPicker(false)}
                        >
                          Annuleren
                        </button>
                        <button 
                          className="flex-1 px-6 py-3 bg-primary text-white hover:bg-primary/90 rounded-xl font-semibold transition-colors"
                          onClick={e => {
                            handleAddToSampleBox(e, selectedSandwich, selectedQuantity);
                            setSelectedSandwich(null);
                          }}
                          disabled={isSampleBoxFull}
                        >
                          Voeg toe
                        </button>
                      </div>
                    </div>
                  ) : (
                    <motion.button 
                      className="w-full px-6 py-3 bg-primary text-white hover:bg-primary/90 rounded-xl font-semibold transition-colors" 
                      onClick={() => setShowQuantityPicker(true)}
                      whileTap={{ scale: 0.95 }}
                      disabled={isSampleBoxFull}
                    >
                      {isSampleBoxFull ? "Proefpakket is vol" : "Proeven"}
                    </motion.button>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>;
};
