import { motion } from "framer-motion";
import { AnimatedSection } from "../AnimatedSection";
import dashboardImage from "../../assets/dashboard2.png";
import mobileDashboardImage from "../../assets/mobile-dashboard.png";
import robotImage from "../../assets/robot2.png";

export default function PreviewSection() {
  return (
    <section className="relative z-10 py-24" id="preview">
      <div className="px-6 md:px-10">
        <div className="mx-auto max-w-6xl">
          {/* Section header */}
          <AnimatedSection animation="fadeUp" className="text-center mb-12">
            <motion.div 
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-5 py-2 border border-emerald-500/20 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-xs font-bold tracking-widest text-emerald-300">
                PLATFORM PREVIEW
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-extrabold">
              Experience the <span className="text-emerald-400">Future</span>
            </h2>
            <p className="mt-4 text-base text-teal-100/50 max-w-xl mx-auto">
              A powerful, intuitive dashboard designed for modern cooperative management
            </p>
          </AnimatedSection>

          {/* Dashboard Preview Container - Desktop + Mobile */}
          <AnimatedSection animation="scale" delay={0.2}>
            <div className="relative group">
              {/* Glow effect behind */}
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-emerald-500/20 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
              
              {/* Main container with overflow visible for phone and robot */}
              <div className="relative overflow-visible">
                {/* Desktop Browser Window - BLACK STROKE */}
                <motion.div 
                  className="relative rounded-3xl overflow-hidden bg-black/40 backdrop-blur-xl border-[7px] border-black shadow-2xl"
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  whileHover={{ scale: 1.02, rotate: 2 }}
                >
                  {/* Desktop Dashboard Image - NO TITLE BAR */}
                  <div className="relative overflow-hidden bg-slate-900">
                    <img 
                      alt="E-Cooperative Dashboard Desktop" 
                      className="w-full h-auto" 
                      loading="lazy"
                      src={dashboardImage}
                    />
                  </div>
                </motion.div>

                {/* Mobile Phone - ALIGNED TO RIGHT EDGE OF DESKTOP */}
                <motion.div 
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  className="absolute right-15 bottom-12 top-1/2 -translate-y-1/2 translate-x-1/2 w-56 md:w-80 z-20"
                  initial={{ opacity: 0, x: 100, rotate: 15 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  whileHover={{ scale: 1.05, rotate: -5 }}
                >
                  {/* Phone frame - BLACK STROKE */}
                  <div className="relative rounded-[3rem] bg-black p-2 shadow-2xl border-[1px] border-black">
                    {/* Notch */}
                    <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-black rounded-full z-10" />
                    
                    {/* Screen */}
                    <div className="relative rounded-[2.5rem] overflow-hidden bg-slate-900 aspect-[9/16]">
                      <img 
                        alt="E-Cooperative Mobile App" 
                        className="w-full h-full object-cover" 
                        loading="lazy"
                        src={mobileDashboardImage}
                      />
                    </div>
                  </div>
                  
                  {/* Phone reflection/shadow */}
                  <div className="absolute -bottom-4 left-4 right-4 h-8 bg-emerald-500/20 blur-2xl rounded-full" />
                </motion.div>

                {/* ROBOT MASCOT - BIGGER & FLOATING */}
                <motion.div
                  animate={{ 
                    opacity: 1, 
                    x: 0, 
                    y: [0, -15, 0],
                  }}
                  className="absolute -left-24 md:-left-40 lg:-left-48 top-1/2 -translate-y-1/2 z-30 w-48 md:w-72 lg:w-96"
                  initial={{ opacity: 0, x: -100, y: 20 }}
                  transition={{ 
                    opacity: { delay: 0.6, duration: 0.5 },
                    x: { delay: 0.6, duration: 0.5, type: "spring" },
                    y: { 
                      delay: 1.2, 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }
                  }}
                  whileHover={{ scale: 1.08, rotate: -5 }}
                >
                  <img 
                    alt="E-Coop Assistant" 
                    className="w-full h-auto drop-shadow-[0_20px_50px_rgba(52,211,153,0.4)]" 
                    loading="lazy"
                    src={robotImage}
                  />
                  
                  {/* Floating glow effect behind robot */}
                  <motion.div 
                    animate={{ 
                      scale: [0.75, 0.9, 0.75],
                      opacity: [0.4, 0.6, 0.4]
                    }}
                    className="absolute inset-0 -z-10 bg-emerald-500/40 blur-3xl rounded-full scale-75"
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  />
                </motion.div>
              </div>
            </div>
          </AnimatedSection>

          {/* Features description */}
          <AnimatedSection animation="fadeUp" delay={0.4}>
            <div className="mt-12 text-center">
              <p className="text-sm text-teal-100/50 max-w-lg mx-auto">
                Seamless access for administrators and members. Desktop power meets mobile
                convenience—manage your cooperative from anywhere.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}