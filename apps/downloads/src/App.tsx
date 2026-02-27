import { useEffect, useState } from 'react'

import { motion } from 'framer-motion'

import logo from './assets/logo.png'
import Navbar from './components/Navbar'
import AuroraBackground from './components/effects/AuroraBackground'
import ParticlesBackground from './components/effects/ParticlesBackground'
import ScrollProgress from './components/effects/ScrollProgress'
import ContactSection from './components/sections/ContactSection'
import DownloadSection from './components/sections/DownloadSection'
import FAQSection from './components/sections/FAQSection'
import Footer from './components/sections/Footer'
import HomeHero from './components/sections/HomeHero'
import MissionVisionSection from './components/sections/MissionVisionSection'
import PreviewSection from './components/sections/PreviewSection'
import ServicesSection from './components/sections/ServicesSections'
import TestimonialSection from './components/sections/TestimonialSection'

function App() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Simulate initial load
        const timer = setTimeout(() => setIsLoading(false), 500)

        return () => {
            clearTimeout(timer)
        }
    }, [])

    // Loading screen
    if (isLoading) {
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
                            opacity: [0.5, 1, 0.5],
                        }}
                        className="h-16 w-auto mx-auto"
                        src={logo}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </motion.div>
            </div>
        )
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
    )
}

export default App
