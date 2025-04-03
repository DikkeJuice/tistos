
import { useState, useEffect } from "react";
import { useSampleBox } from "@/contexts/SampleBoxContext";
import { motion, AnimatePresence } from "framer-motion";
import { Package } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { SampleRequestForm } from "@/components/SampleRequestForm";

export const SampleBoxButton = () => {
  const { 
    sampleBox, 
    removeFromSampleBox, 
    clearSampleBox,
    openSampleRequestForm,
    setOpenSampleRequestForm
  } = useSampleBox();
  
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
  
  return (
    <>
      {/* Floating button */}
      <motion.div 
        className="fixed bottom-6 right-6 z-40"
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
          <div className="bg-primary text-white p-4 rounded-full shadow-lg flex items-center justify-center">
            <Package className="h-6 w-6" />
          </div>
          
          {sampleBox.length > 0 && (
            <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
              {sampleBox.length}
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
              className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl p-4 w-64 sm:w-80"
            >
              <h3 className="font-bold text-lg mb-2">Jouw proefpakket</h3>
              <p className="text-sm text-gray-600 mb-4">
                {sampleBox.length === 0
                  ? "Je proefpakket is nog leeg. Voeg tosti's toe om te proeven!"
                  : `${sampleBox.length}/10 tosti's geselecteerd`}
              </p>
              
              {sampleBox.length > 0 && (
                <div className="max-h-60 overflow-y-auto mb-4">
                  <ul className="space-y-2">
                    {sampleBox.map(sandwich => (
                      <li key={sandwich.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm">{sandwich.name}</span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFromSampleBox(sandwich.id);
                          }}
                          className="text-xs text-red-500 hover:text-red-700"
                        >
                          Verwijderen
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="flex justify-between">
                {sampleBox.length > 0 && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      clearSampleBox();
                    }}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    Leegmaken
                  </button>
                )}
                
                {sampleBox.length > 0 && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenSampleRequestForm(true);
                      setShowDetails(false);
                    }}
                    className="bg-primary text-white px-4 py-1 rounded text-sm"
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
            <div className="bg-white p-2 rounded shadow">
              <p className="text-sm">{animatingSandwich.name} toegevoegd!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Sample Request Form Dialog */}
      <Dialog open={openSampleRequestForm} onOpenChange={setOpenSampleRequestForm}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <SampleRequestForm onSuccess={() => {
            clearSampleBox();
            setOpenSampleRequestForm(false);
          }} />
        </DialogContent>
      </Dialog>
    </>
  );
};
