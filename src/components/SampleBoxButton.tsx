
import { useState, useEffect } from "react";
import { useSampleBox } from "@/contexts/SampleBoxContext";
import { motion, AnimatePresence } from "framer-motion";
import { Package } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { SampleRequestForm } from "@/components/SampleRequestForm";
import { useIsMobile } from "@/hooks/use-mobile";

export const SampleBoxButton = () => {
  const { 
    sampleBox, 
    removeFromSampleBox, 
    clearSampleBox,
    openSampleRequestForm,
    setOpenSampleRequestForm,
    updateSandwichQuantity
  } = useSampleBox();
  
  const isMobile = useIsMobile();
  const [showDetails, setShowDetails] = useState(false);
  
  // Handle animating in sandwiches that are added to the box
  const [animatingSandwich, setAnimatingSandwich] = useState<{ name: string; id: string } | null>(null);
  
  useEffect(() => {
    if (animatingSandwich) {
      const timer = setTimeout(() => {
        setAnimatingSandwich(null);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [animatingSandwich]);
  
  const buttonPositionClass = isMobile 
    ? "fixed top-[calc(100vh-173px)] right-4 z-40"
    : "fixed bottom-6 right-6 z-40";
  
  // Calculate total items count
  const totalItems = sampleBox.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <>
      {/* Floating button */}
      <motion.div 
        className={buttonPositionClass}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring" }}
      >
        <motion.div
          className="relative cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowDetails(!showDetails)}
        >
          <div className="bg-gradient-to-r from-magenta to-coral text-white p-4 rounded-full shadow-xl flex items-center justify-center">
            <Package className="h-6 w-6" />
          </div>
          
          {totalItems > 0 && (
            <div className="absolute -top-2 -right-2 bg-yellow text-navy text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg">
              {totalItems}
            </div>
          )}
        </motion.div>
        
        {/* Sample box details popup */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="absolute bottom-16 right-0 bg-white rounded-2xl shadow-2xl p-6 w-64 sm:w-80 border border-gray-100"
            >
              <h3 className="font-poppins font-bold text-xl mb-2 text-navy">Jouw proefpakket</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {totalItems === 0
                  ? "Je proefpakket is nog leeg. Voeg tosti's toe om te proeven!"
                  : `${totalItems}/10 tosti's geselecteerd`}
              </p>
              
              {totalItems > 0 && (
                <div className="max-h-60 overflow-y-auto mb-4">
                  <ul className="space-y-2">
                    {sampleBox.map(sandwich => (
                      <li key={sandwich.id} className="flex justify-between items-center p-3 bg-cream rounded-xl">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-navy">{sandwich.name}</span>
                          <span className="text-xs text-muted-foreground ml-2 bg-white px-2 py-1 rounded-full">({sandwich.quantity}x)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              updateSandwichQuantity(sandwich.id, sandwich.quantity - 1);
                            }}
                            className="text-xs bg-gray-200 hover:bg-gray-300 text-navy p-2 rounded-full w-6 h-6 flex items-center justify-center transition-colors"
                          >
                            -
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              updateSandwichQuantity(sandwich.id, sandwich.quantity + 1);
                            }}
                            className="text-xs bg-gray-200 hover:bg-gray-300 text-navy p-2 rounded-full w-6 h-6 flex items-center justify-center transition-colors"
                          >
                            +
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFromSampleBox(sandwich.id);
                            }}
                            className="text-xs text-red-500 hover:text-red-700 ml-1 p-1 hover:bg-red-50 rounded transition-colors"
                          >
                            ✕
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                {sampleBox.length > 0 && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      clearSampleBox();
                    }}
                    className="text-xs text-muted-foreground hover:text-navy transition-colors"
                  >
                    Leegmaken
                  </button>
                )}
                
                {totalItems > 0 && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenSampleRequestForm(true);
                      setShowDetails(false);
                    }}
                    className="bg-gradient-to-r from-turquoise to-cyan text-white px-6 py-2 rounded-lg text-sm font-semibold hover:scale-105 transition-transform shadow-lg"
                  >
                    Aanvragen
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Animating sandwich when added to the box */}
      <AnimatePresence>
        {animatingSandwich && (
          <motion.div
            className="fixed z-50 pointer-events-none"
            initial={{ y: 0, x: 0, opacity: 1 }}
            animate={{ 
              y: window.innerHeight - 120, 
              x: window.innerWidth - 120,
              opacity: 0,
              scale: 0.5 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <div className="bg-gradient-to-r from-yellow to-gold text-navy p-3 rounded-xl shadow-lg">
              <p className="text-sm font-semibold">{animatingSandwich.name} toegevoegd!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Sample Request Form Dialog */}
      <Dialog open={openSampleRequestForm} onOpenChange={setOpenSampleRequestForm}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl">
          <SampleRequestForm onSuccess={() => {
            clearSampleBox();
            setOpenSampleRequestForm(false);
          }} />
        </DialogContent>
      </Dialog>
    </>
  );
};
