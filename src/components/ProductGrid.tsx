
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { getSandwiches } from "@/lib/supabase/sandwiches";
import type { Sandwich } from "@/types/sandwich";
import { X, Plus, Minus } from "lucide-react";
import { Badge } from "./ui/badge";
import { useSampleBox } from "@/contexts/SampleBoxContext";

export const ProductGrid = () => {
  const [sandwiches, setSandwiches] = useState<Sandwich[]>([]);
  const [selectedSandwich, setSelectedSandwich] = useState<Sandwich | null>(null);
  const [showQuantityPicker, setShowQuantityPicker] = useState<string | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  
  const {
    addToSampleBox,
    isSampleBoxFull,
    isInSampleBox,
    getSandwichQuantity,
    getRemainingCapacity
  } = useSampleBox();
  
  const clickPositionRef = useRef({
    x: 0,
    y: 0
  });
  
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
  
  const getAllergensList = (allergens: Sandwich['allergens']) => {
    return Object.entries(allergens)
      .filter(([_, isPresent]) => isPresent)
      .map(([allergen]) => allergen.charAt(0).toUpperCase() + allergen.slice(1))
      .join(", ");
  };
  
  const hasAllergens = (allergens: Sandwich['allergens']) => {
    return Object.values(allergens).some(isPresent => isPresent);
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
    
    // Show quantity picker for this specific sandwich
    setShowQuantityPicker(sandwich.id);
    setSelectedQuantity(1);
  };
  
  const handleAddToSampleBox = (e: React.MouseEvent, sandwich: Sandwich, quantity: number = 1) => {
    e.stopPropagation();
    
    if (isSampleBoxFull) {
      toast.error("Je proefpakket zit vol! Maximaal 10 tosti's.");
      return;
    }
    
    const remaining = getRemainingCapacity();
    
    if (remaining < quantity) {
      toast.error(`Je kunt nog maar ${remaining} tosti's toevoegen aan je proefpakket.`);
      return;
    }
    
    clickPositionRef.current = {
      x: e.clientX,
      y: e.clientY
    };
    
    // Add to sample box
    addToSampleBox(sandwich, quantity);
    toast.success(`${quantity}x ${sandwich.name} toegevoegd aan je proefpakket`);
    
    // Reset UI state after adding
    setShowQuantityPicker(null);
    setSelectedQuantity(1);
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
  
  if (!sandwiches.length) {
    return <div className="flex items-center justify-center min-h-[400px]">
      <div className="neuro-card animate-pulse">
        <p className="text-muted-foreground">Tosti's laden...</p>
      </div>
    </div>;
  }
  
  return <section id="product-grid-section" className="py-24 bg-[#ffe7d1]">
      <div className="container max-w-6xl mx-auto px-4">
        <h2 className="section-title text-center mb-16 font-merriweather text-[#003A40]">Genoeg gelul, proeven dat spul!</h2>
        
        <p className="text-center text-lg text-[#003A40]/80 max-w-2xl mx-auto mb-16 font-['Work_Sans']">
          Stel zelf een proefpakket samen van 10 tosti's en laat je overtuigen door smaak in plaats van onze mooie praatjes :)
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sandwiches.map(sandwich => (
            <motion.div 
              key={sandwich.id} 
              className="group cursor-pointer" 
              whileHover={{ scale: 1.05 }} 
              onClick={() => setSelectedSandwich(sandwich)}
            >
              <div 
                className="neuro-card h-full" 
                style={{
                  backgroundColor: sandwich.associated_color || '#DC5A32',
                  color: 'white'
                }}
              >
                <div className="relative w-[105%] -left-[2.5%] -mt-8 mb-6">
                  <img 
                    src={sandwich.image_url} 
                    alt={sandwich.name} 
                    className="w-full h-48 object-contain rounded-xl transition-transform group-hover:scale-105" 
                    loading="lazy" 
                  />
                  
                  <div className="absolute bottom-2 right-2 flex flex-col gap-2 items-end">
                    {sandwich.tags && sandwich.tags.includes("halal") && (
                      <Badge variant="secondary" className="bg-white/90 hover:bg-white text-primary py-1 px-2 gap-1 font-['Work_Sans']">
                        <img src="https://pxodqmbszdlzzkywkaop.supabase.co/storage/v1/object/public/vectors//halal_crisp_blauw.svg" alt="Halal" className="h-3 w-3" />
                        <span className="text-xs">Halal</span>
                      </Badge>
                    )}
                    
                    {sandwich.tags && sandwich.tags.includes("vegetarisch") && (
                      <Badge variant="secondary" className="bg-white/90 hover:bg-white text-primary py-1 px-2 gap-1 font-['Work_Sans']">
                        <img src="https://pxodqmbszdlzzkywkaop.supabase.co/storage/v1/object/public/vectors//vega_crisp_blauw.svg" alt="Vegetarisch" className="h-3 w-3" />
                        <span className="text-xs">Vega</span>
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold font-merriweather">
                    {sandwich.name}
                  </h3>
                  <p className="text-white/90 text-sm font-['Work_Sans']">
                    {sandwich.short_description}
                  </p>
                  
                  {showQuantityPicker === sandwich.id ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between bg-white/10 rounded-xl p-3">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            decrementQuantity();
                          }}
                          className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="font-semibold text-lg">{selectedQuantity}</span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            incrementQuantity();
                          }}
                          className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          className="flex-1 px-3 py-2 border border-white/30 text-white hover:bg-white/10 rounded-xl font-semibold transition-colors text-sm" 
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowQuantityPicker(null);
                          }}
                        >
                          Annuleren
                        </button>
                        <button 
                          className="flex-1 px-3 py-2 bg-white/20 text-white hover:bg-white/30 rounded-xl font-semibold transition-colors text-sm" 
                          onClick={(e) => handleAddToSampleBox(e, sandwich, selectedQuantity)}
                        >
                          Voeg toe
                        </button>
                      </div>
                    </div>
                  ) : (
                    <motion.button 
                      className="w-full px-6 py-3 bg-white/10 text-white hover:bg-white/20 rounded-xl font-semibold transition-colors font-['Work_Sans']" 
                      onClick={(e) => handleProevenClick(e, sandwich)} 
                      whileTap={{ scale: 0.95 }}
                    >
                      {getSandwichQuantity(sandwich.id) > 0 ? `${getSandwichQuantity(sandwich.id)}x toegevoegd` : "Proeven"}
                    </motion.button>
                  )}
                </div>
              </div>
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
              
              <div className="mb-4 flex gap-2 flex-wrap">
                {selectedSandwich.tags && selectedSandwich.tags.includes("halal") && (
                  <Badge variant="secondary" className="bg-gray-100 text-primary py-1 px-2 gap-1">
                    <img src="https://pxodqmbszdlzzkywkaop.supabase.co/storage/v1/object/public/vectors//halal_crisp_blauw.svg" alt="Halal" className="h-3 w-3" />
                    <span>Halal</span>
                  </Badge>
                )}
                
                {selectedSandwich.tags && selectedSandwich.tags.includes("vegetarisch") && (
                  <Badge variant="secondary" className="bg-gray-100 text-primary py-1 px-2 gap-1">
                    <img src="https://pxodqmbszdlzzkywkaop.supabase.co/storage/v1/object/public/vectors//vega_crisp_blauw.svg" alt="Vegetarisch" className="h-3 w-3" />
                    <span>Vega</span>
                  </Badge>
                )}
              </div>
              
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
                  {showQuantityPicker === selectedSandwich.id ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between bg-gray-100 rounded-xl p-3">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            decrementQuantity();
                          }}
                          className="p-2 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="font-semibold text-lg">{selectedQuantity}</span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            incrementQuantity();
                          }}
                          className="p-2 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-xl font-semibold transition-colors" 
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowQuantityPicker(null);
                          }}
                        >
                          Annuleren
                        </button>
                        <button 
                          className="flex-1 px-6 py-3 bg-primary text-white hover:bg-primary/90 rounded-xl font-semibold transition-colors"
                          onClick={(e) => {
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
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowQuantityPicker(selectedSandwich.id);
                        setSelectedQuantity(1);
                      }}
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
