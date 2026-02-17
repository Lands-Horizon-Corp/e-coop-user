import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import Navbar from "../components/Navbar";
import HomeHero from "../components/HomeHero";
import PreviewSection from "../components/PreviewSection";
import DownloadSection from "../components/DownloadSection";
import FAQSection from "../components/FAQSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import Animations from "../components/Animations";
import Policies from "../components/Policies";
import ParticlesBackground from "../components/ParticlesBackground";

export default function App() {
  const [hash, setHash] = useState<string>(() =>
    typeof window !== "undefined" ? window.location.hash : ""
  );

  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <div className="relative min-h-screen text-white bg-black">
      {/* Global particle background */}
      <ParticlesBackground />

      {/* Gradient background for main content */}
      <div className="min-h-screen bg-[radial-gradient(circle_at_50%_-80%,#1DA3A3_0%,#124D4D_50%,#0F172A_55%,#0F172A_85%)] relative overflow-hidden">
        {/* NAVBAR */}
        <div className="relative z-10">
          <Navbar logo={logo} />
        </div>

        {/* Dark vignette overlay */}
        <div
          className="
            pointer-events-none absolute inset-0
            bg-[radial-gradient(circle_at_50%_30%,
              rgba(255,255,255,0.08)_0%,
              rgba(0,0,0,0.35)_55%,
              rgba(0,0,0,0.85)_100%
            )]
          "
        />

        {/* PAGE SWITCH */}
        <div className="relative z-10">
          {hash === "#policies" ? (
            <Policies />
          ) : (
            <>
              <HomeHero />
              <PreviewSection />
              <DownloadSection />
              <FAQSection />
              <ContactSection />
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/6 bg-[#080808] relative z-10">
        <Footer logo={logo} />
      </div>

      {/* Global animations */}
      <Animations />
    </div>
  );
}
