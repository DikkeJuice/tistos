import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
export const Hero = () => {
  return <section className="min-h-screen relative overflow-hidden flex items-center" style={{
    background: "linear-gradient(135deg, #FF2424 0%, #C00000 100%)"
  }}>
      {/* Abstract background patterns - subtle curves */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-[10%] left-[5%] w-96 h-96 rounded-full border border-white"></div>
        <div className="absolute bottom-[15%] right-[20%] w-64 h-64 rounded-full border border-white"></div>
        <div className="absolute top-[40%] right-[35%] w-40 h-40 rounded-full border border-white"></div>
      </div>
      
      {/* Main content container - reduced gap from 12 to 8 */}
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        {/* Left side: Logo, Text & CTA */}
        <div className="flex flex-col justify-center items-center lg:items-start">
          {/* Logo - centered on mobile, left-aligned on desktop */}
          <div className="w-80 md:w-96 mb-6">
            <img src="/lovable-uploads/79eb4b29-9072-4121-988c-5da7e15293aa.png" alt="Tisto's Logo" className="w-full h-auto object-contain" />
          </div>
          
          {/* Main text content - center aligned on mobile, left on desktop */}
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4 leading-tight text-center lg:text-left">
            Tosti's die samenbrengen, waar je ook speelt
          </h1>
          
          <p className="text-white/90 text-lg mb-6 max-w-lg text-center lg:text-left">
            Bij Tisto's draait alles om smaak en gezelligheid. Of je nu na een wedstrijd bijpraat, 
            een snelle snack zoekt of gewoon zin hebt in een écht goede tosti – wij zorgen voor de perfecte crunch.
          </p>
          
          {/* CTA Buttons - centered on mobile */}
          <div className="flex flex-wrap gap-4 mb-6 justify-center lg:justify-start">
            <Button size="lg" className="bg-[#0074FA] hover:bg-[#0074FA]/90 text-white font-semibold shadow-[0_0_15px_rgba(0,116,250,0.3)]">
              Bestel Nu
            </Button>
            
            <Button size="lg" variant="outline" className="border-white hover:bg-white transition-colors font-semibold text-[#0075fc]">
              Ontdek Ons Verhaal
            </Button>
          </div>
          
          {/* Additional info - centered on mobile */}
          <div className="space-y-2 text-white/90 text-center lg:text-left">
            <p className="flex items-center gap-2 justify-center lg:justify-start">
              <span className="text-lg">✔️</span>
              <span>Duizenden tevreden sportclubs</span>
            </p>
            <p className="flex items-center gap-2 justify-center lg:justify-start">
              <span className="text-lg">🥇</span>
              <span>Dé tosti-favoriet bij sportverenigingen</span>
            </p>
            <p className="flex items-center gap-2 justify-center lg:justify-start">
              <span className="text-lg">💯</span>
              <span>100% ambachtelijke smaak</span>
            </p>
          </div>
        </div>
        
        {/* Right side: Footballer image with floating labels */}
        <div className="flex justify-center items-end pt-4 lg:pt-0 relative">
          {/* Main image - adjusted to ensure it's fully visible */}
          <div className="relative z-10 w-full max-w-md mx-auto">
            <img src="/lovable-uploads/aa6ae7a7-bcd9-4005-92c9-64f0d9f6fb74.png" alt="Footballer enjoying sandwich" className="w-full h-auto object-contain" />
          </div>
          
          {/* Floating labels - repositioned for better balance */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.2,
          duration: 0.5
        }} className="absolute top-24 lg:top-20 right-10 lg:right-20 bg-white rounded-full px-4 py-2 shadow-[0_0_15px_rgba(0,116,250,0.3)] border border-[#0074FA]/20">
            <span className="text-[#0074FA] font-semibold">Ambachtelijke Tosti's</span>
          </motion.div>
          
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.4,
          duration: 0.5
        }} className="absolute top-[35%] right-4 lg:right-12 bg-white rounded-full px-4 py-2 shadow-[0_0_15px_rgba(0,116,250,0.3)] border border-[#0074FA]/20">
            <span className="text-[#0074FA] font-semibold">Perfecte Crunch</span>
          </motion.div>
          
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.6,
          duration: 0.5
        }} className="absolute bottom-[35%] right-8 lg:right-16 bg-white rounded-full px-4 py-2 shadow-[0_0_15px_rgba(0,116,250,0.3)] border border-[#0074FA]/20">
            <span className="text-[#0074FA] font-semibold">Favoriet bij Sportclubs</span>
          </motion.div>
        </div>
      </div>
    </section>;
};