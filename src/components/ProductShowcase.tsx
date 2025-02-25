
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { getSandwiches } from "@/lib/supabase/sandwiches";
import type { Sandwich } from "@/types/sandwich";

export const ProductShowcase = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [sandwiches, setSandwiches] = useState<Sandwich[]>([]);

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

  return (
    <section className="py-24 bg-secondary/20">
      <div className="container">
        <h2 className="section-title text-center mb-16">
          Ontdek onze <span className="text-primary">signature tosti's</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sandwiches.map((sandwich) => (
            <motion.div
              key={sandwich.id}
              className="relative glass-card rounded-2xl p-6 card-hover"
              onHoverStart={() => setHoveredId(sandwich.id)}
              onHoverEnd={() => setHoveredId(null)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="aspect-square overflow-hidden rounded-xl mb-4">
                <img
                  src={sandwich.image_url}
                  alt={sandwich.name}
                  className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
                />
              </div>
              
              <h3 className="text-xl font-bold mb-2">{sandwich.name}</h3>
              <p className="text-muted-foreground">{sandwich.short_description}</p>
              <p className="text-primary font-bold mt-2">€{sandwich.price.toFixed(2)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
