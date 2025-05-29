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
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="bg-white rounded-2xl p-8 shadow-lg animate-pulse">
          <p className="text-navy/60 font-inter">Tosti's laden...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-br from-turquoise/20 via-cream to-magenta/20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-yellow/10 rounded-full animate-float" />
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-coral/10 rounded-full animate-blob" />
      <div className="decorative-dots absolute inset-0" />
      
      <div className="container max-w-6xl mx-auto px-6 relative z-10">
        <h2 className="font-poppins text-4xl md:text-6xl font-black mb-16 text-center text-navy">
          Ontdek onze <span className="text-gradient">signature tosti's</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-magenta to-coral mx-auto mb-16 rounded-full" />
        
        <div className="relative">
          <div className="flex items-center justify-center gap-8">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handlePrevious} 
              className="absolute left-4 z-10 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg hover:bg-white hover:shadow-xl hover:scale-110 transition-all duration-300"
            >
              <ChevronLeft className="h-6 w-6 text-navy" />
            </Button>

            <motion.div 
              key={currentSandwich.id} 
              initial={{ opacity: 0, x: 100 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -100 }} 
              transition={{ duration: 0.5 }} 
              className="w-full max-w-xl mx-auto"
            >
              <div 
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-visible group"
                style={{ 
                  background: `linear-gradient(135deg, ${currentSandwich.associated_color || '#DC5A32'} 0%, ${currentSandwich.associated_color || '#DC5A32'}dd 100%)`,
                  color: 'white'
                }}
              >
                <div className="relative w-[105%] -left-[2.5%] -mt-12 mb-8">
                  <motion.img 
                    src={currentSandwich.image_url} 
                    alt={currentSandwich.name} 
                    className="w-full h-64 object-contain rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-300 drop-shadow-2xl" 
                    onClick={() => handleImageClick(currentSandwich)} 
                    loading="lazy" 
                  />
                </div>

                <div className="space-y-6">
                  <motion.h3 
                    className="text-3xl font-black font-poppins" 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 0.2 }}
                  >
                    {currentSandwich.name}
                  </motion.h3>

                  <motion.p 
                    className="text-white/90 font-inter text-lg leading-relaxed" 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 0.3 }}
                  >
                    {currentSandwich.short_description}
                  </motion.p>

                  {showQuantityPicker ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }} 
                      animate={{ opacity: 1, scale: 1 }} 
                      className="flex flex-col gap-4"
                    >
                      <div className="flex items-center justify-between bg-white/20 backdrop-blur-sm rounded-xl p-4">
                        <button 
                          onClick={decrementQuantity}
                          className="p-3 bg-white/30 rounded-full text-white hover:bg-white/40 transition-all duration-300 hover:scale-110"
                        >
                          <Minus className="h-5 w-5" />
                        </button>
                        <span className="font-bold text-2xl font-poppins">{selectedQuantity}</span>
                        <button 
                          onClick={incrementQuantity}
                          className="p-3 bg-white/30 rounded-full text-white hover:bg-white/40 transition-all duration-300 hover:scale-110"
                        >
                          <Plus className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="flex gap-3">
                        <button 
                          className="flex-1 px-6 py-4 border-2 border-white/40 text-white hover:bg-white/20 rounded-xl font-bold font-poppins transition-all duration-300 hover:scale-105" 
                          onClick={() => setShowQuantityPicker(false)}
                        >
                          Annuleren
                        </button>
                        <button 
                          className="flex-1 px-6 py-4 bg-white/30 text-white hover:bg-white/40 rounded-xl font-bold font-poppins transition-all duration-300 hover:scale-105 shadow-lg" 
                          onClick={(e) => handleAddToSampleBox(e, currentSandwich, selectedQuantity)}
                        >
                          Voeg toe
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.button 
                      className="w-full px-8 py-4 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 rounded-xl font-bold font-poppins text-lg transition-all duration-300 hover:scale-105 shadow-lg border border-white/30" 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      transition={{ delay: 0.5 }} 
                      onClick={(e) => handleProevenClick(e, currentSandwich)}
                    >
                      {getSandwichQuantity(currentSandwich.id) > 0 ? `${getSandwichQuantity(currentSandwich.id)}x toegevoegd` : "Proeven"}
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>

            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleNext} 
              className="absolute right-4 z-10 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg hover:bg-white hover:shadow-xl hover:scale-110 transition-all duration-300"
            >
              <ChevronRight className="h-6 w-6 text-navy" />
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6 overflow-y-auto"
            onClick={() => setSelectedSandwich(null)}
          >
            <motion.div
              initial={{ scale: 0.95, rotateX: 90 }}
              animate={{ scale: 1, rotateX: 0 }}
              exit={{ scale: 0.95, rotateX: -90 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full relative m-4 p-8"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedSandwich(null)}
                className="absolute right-6 top-6 p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-all duration-300 hover:scale-110"
              >
                <X className="w-5 h-5 text-navy" />
              </button>

              <img
                src={selectedSandwich.image_url}
                alt={selectedSandwich.name}
                className="w-full h-80 object-contain rounded-2xl mb-8 drop-shadow-lg"
              />
              <h3 className="text-3xl font-black mb-6 font-poppins pr-16 text-navy">
                {selectedSandwich.name}
              </h3>
              <p className="text-navy/80 mb-6 font-inter text-lg leading-relaxed">
                {selectedSandwich.long_description || selectedSandwich.short_description}
              </p>
              {hasAllergens(selectedSandwich.allergens) && (
                <div className="mt-6 p-6 bg-yellow/10 rounded-2xl border border-yellow/20">
                  <p className="text-navy">
                    <span className="font-bold font-poppins">Allergeneninformatie: </span>
                    <span className="font-inter">{getAllergensList(selectedSandwich.allergens)}</span>
                  </p>
                </div>
              )}
              
              {getSandwichQuantity(selectedSandwich.id) > 0 ? (
                <div className="mt-8 flex items-center justify-between bg-magenta/10 rounded-2xl p-6 border border-magenta/20">
                  <span className="font-bold font-poppins text-navy">Aantal in proefpakket: {getSandwichQuantity(selectedSandwich.id)}</span>
                  <button 
                    className="text-coral hover:text-coral/80 font-bold font-poppins transition-colors duration-300"
                    onClick={() => {
                      setSelectedSandwich(null);
                    }}
                  >
                    Sluiten
                  </button>
                </div>
              ) : (
                <div className="mt-8">
                  {showQuantityPicker ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between bg-gray-100 rounded-2xl p-4">
                        <button 
                          onClick={decrementQuantity}
                          className="p-3 bg-white rounded-full text-navy hover:bg-gray-50 transition-all duration-300 hover:scale-110 shadow-md"
                        >
                          <Minus className="h-5 w-5" />
                        </button>
                        <span className="font-bold text-2xl font-poppins text-navy">{selectedQuantity}</span>
                        <button 
                          onClick={incrementQuantity}
                          className="p-3 bg-white rounded-full text-navy hover:bg-gray-50 transition-all duration-300 hover:scale-110 shadow-md"
                        >
                          <Plus className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="flex gap-3">
                        <button 
                          className="flex-1 px-6 py-4 border-2 border-gray-300 text-navy hover:bg-gray-100 rounded-xl font-bold font-poppins transition-all duration-300 hover:scale-105" 
                          onClick={() => setShowQuantityPicker(false)}
                        >
                          Annuleren
                        </button>
                        <Button
                          variant="vibrant"
                          className="flex-1 px-6 py-4 rounded-xl font-bold font-poppins text-lg"
                          onClick={e => {
                            handleAddToSampleBox(e, selectedSandwich, selectedQuantity);
                            setSelectedSandwich(null);
                          }}
                          disabled={isSampleBoxFull}
                        >
                          Voeg toe
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      variant="vibrant"
                      className="w-full px-8 py-4 rounded-xl font-bold font-poppins text-lg"
                      onClick={() => setShowQuantityPicker(true)}
                      disabled={isSampleBoxFull}
                    >
                      {isSampleBoxFull ? "Proefpakket is vol" : "Proeven"}
                    </Button>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
