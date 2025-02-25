
import { useState } from "react";
import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    name: "Pulled Pork Tosti",
    description: "Malse pulled pork met gesmolten kaas",
    image: "/lovable-uploads/79d889cb-83a2-4a42-9c5a-d6f011e80a0a.png"
  },
  {
    id: 2,
    name: "Spinazie Feta Tosti",
    description: "Verse spinazie met romige feta",
    image: "/lovable-uploads/142dda9b-9cd0-47bf-9281-e0c878dad5b5.png"
  },
  {
    id: 3,
    name: "Kimchi Tosti",
    description: "Pittige kimchi met gesmolten kaas",
    image: "/lovable-uploads/3462b368-8047-497f-8358-53d2de513619.png"
  }
];

export const ProductShowcase = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="py-24 bg-secondary/20">
      <div className="container">
        <h2 className="section-title text-center mb-16">
          Ontdek onze <span className="text-primary">signature tosti's</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="relative glass-card rounded-2xl p-6 card-hover"
              onHoverStart={() => setHoveredId(product.id)}
              onHoverEnd={() => setHoveredId(null)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="aspect-square overflow-hidden rounded-xl mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
                />
              </div>
              
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
