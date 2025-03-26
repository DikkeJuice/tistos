import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { getSandwiches } from "@/lib/supabase/sandwiches";
import type { Sandwich } from "@/types/sandwich";
import { X } from "lucide-react";

export const ProductGrid = () => {
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

  const getAllergensList = (allergens: Sandwich['allergens']) => {
    return Object.entries(allergens).filter(([_, isPresent]) => isPresent).map(([allergen]) => allergen.charAt(0).toUpperCase() + allergen.slice(1)).join(", ");
  };

  const hasAllergens = (allergens: Sandwich['allergens']) => {
    return Object.values(allergens).some(isPresent => isPresent);
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
        <h2 className="section-title text-center mb-16 font-poppins">
          Ontdek al onze <span className="text-primary">tosti's</span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sandwiches.map(sandwich => <motion.div key={sandwich.id} className="group cursor-pointer" whileHover={{
          scale: 1.05
        }} onClick={() => setSelectedSandwich(sandwich)}>
              <div className="neuro-card h-full" style={{
            backgroundColor: sandwich.associated_color || '#DC5A32',
            color: 'white'
          }}>
                <div className="relative w-[105%] -left-[2.5%] -mt-8 mb-6">
                  <img src={sandwich.image_url} alt={sandwich.name} className="w-full h-48 object-contain rounded-xl transition-transform group-hover:scale-105" loading="lazy" />
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold font-merriweather">
                    {sandwich.name}
                  </h3>
                  <p className="text-white/90 text-sm">
                    {sandwich.short_description}
                  </p>
                  <button className="w-full px-6 py-3 bg-white/10 text-white hover:bg-white/20 rounded-xl font-semibold transition-colors" onClick={e => {
                e.stopPropagation();
                toast.success(`${sandwich.name} toegevoegd aan winkelwagen`);
              }}>
                    Proeven
                  </button>
                </div>
              </div>
            </motion.div>)}
        </div>
      </div>

      <AnimatePresence>
        {selectedSandwich && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={() => setSelectedSandwich(null)}>
            <motion.div initial={{
          scale: 0.95,
          rotateX: 90
        }} animate={{
          scale: 1,
          rotateX: 0
        }} exit={{
          scale: 0.95,
          rotateX: -90
        }} transition={{
          duration: 0.4
        }} className="neuro-card max-w-2xl w-full relative m-4" onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelectedSandwich(null)} className="absolute right-4 top-4 p-2 bg-white/90 hover:bg-white rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>

              <img src={selectedSandwich.image_url} alt={selectedSandwich.name} className="w-full h-80 object-contain rounded-xl mb-6" />
              <h3 className="text-2xl font-bold mb-4 font-poppins pr-12">
                {selectedSandwich.name}
              </h3>
              <p className="text-gray-600 mb-4">
                {selectedSandwich.long_description || selectedSandwich.short_description}
              </p>
              {hasAllergens(selectedSandwich.allergens) && <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-600">
                    <span className="font-medium">Allergeneninformatie: </span>
                    {getAllergensList(selectedSandwich.allergens)}
                  </p>
                </div>}
            </motion.div>
          </motion.div>}
      </AnimatePresence>
    </section>;
};
