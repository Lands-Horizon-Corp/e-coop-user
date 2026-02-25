import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "./assets/logo.png";
import Navbar from "./components/Navbar";
import HomeHero from "./components/sections/HomeHero";
import PreviewSection from "./components/sections/PreviewSection";
import DownloadSection from "./components/sections/DownloadSection";
import ServicesSection from "./components/sections/ServicesSections";
import TestimonialSection from "./components/sections/TestimonialSection";
import FAQSection from "./components/sections/FAQSection";
import ContactSection from "./components/sections/ContactSection";
import MissionVisionSection from "./components/sections/MissionVisionSection";
import Footer from "./components/sections/Footer";
import AuroraBackground from "./components/effects/AuroraBackground";
import ParticlesBackground from "./components/effects/ParticlesBackground";
import ScrollProgress from "./components/effects/ScrollProgress";
import PoliciesPage from "./components/policies/PoliciesPage";

// Landing page component
function LandingPage() {
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    };

    handleHashNavigation();
    window.addEventListener('hashchange', handleHashNavigation);
    
    return () => {
      window.removeEventListener('hashchange', handleHashNavigation);
    };
  }, []);

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
          <ServicesSection />
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

// Policies layout with navbar and footer
// Policies layout with navbar and footer
function PoliciesLayout() {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-[#0a0f1c]">
      <Navbar logo={logo} isPoliciesPage={true} />
      <main>  {/* REMOVED pt-20 HERE */}
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <PoliciesPage />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer logo={logo} />
    </div>
  );
}

// Loading screen component
function LoadingScreen({ onLoad }: { onLoad: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onLoad, 500);
    return () => clearTimeout(timer);
  }, [onLoad]);

  return (
    <div className="fixed inset-0 bg-[#0a0a0a] flex items-center justify-center z-50">
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
        exit={{ opacity: 0, scale: 0.8 }}
        initial={{ opacity: 0, scale: 0.8 }}
      >
        <motion.img 
          alt="eCOOP" 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.5, 1, 0.5]
          }} 
          className="h-16 w-auto mx-auto"
          src={logo}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
}

// Main App component
function App() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingScreen onLoad={() => setIsLoading(false)} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/policies" element={<PoliciesLayout />}>
          <Route index element={<PoliciesPage />} />
          <Route path=":policyId" element={<PoliciesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;