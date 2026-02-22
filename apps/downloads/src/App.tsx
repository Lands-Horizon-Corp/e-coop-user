import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import logo from "./assets/logo.png";
import Navbar from "./components/Navbar";
import HomeHero from "./components/sections/HomeHero";
import PreviewSection from "./components/sections/PreviewSection";
import DownloadSection from "./components/sections/DownloadSection";
import TestimonialSection from "./components/sections/TestimonialSection";
import FAQSection from "./components/sections/FAQSection";
import ContactSection from "./components/sections/ContactSection";
import MissionVisionSection from "./components/sections/MissionVisionSection";
import Footer from "./components/sections/Footer";
import AuroraBackground from "./components/effects/AuroraBackground";
import ParticlesBackground from "./components/effects/ParticlesBackground";
import ScrollProgress from "./components/effects/ScrollProgress";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => setIsLoading(false), 500);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Loading screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#0a0a0a] flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="text-center"
        >
          <motion.img 
            src={logo} 
            alt="eCOOP" 
            className="h-16 w-auto mx-auto"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white bg-[#0a0a0a] overflow-x-hidden">
      {/* Scroll progress indicator */}
      <ScrollProgress />
      
      {/* Aurora background */}
      <AuroraBackground />
      
      {/* Particle overlay */}
      <ParticlesBackground />

      {/* Main content */}
      <div className="relative z-10">
        {/* Navbar */}
        <Navbar logo={logo} />

        {/* Page content */}
        <main>
          <HomeHero />
          <PreviewSection />
          <DownloadSection />
          <TestimonialSection />
          <FAQSection />
          <ContactSection />
          <MissionVisionSection />
        </main>

        {/* Footer */}
        <Footer logo={logo} />
      </div>
    </div>
  );
}

export default App;
