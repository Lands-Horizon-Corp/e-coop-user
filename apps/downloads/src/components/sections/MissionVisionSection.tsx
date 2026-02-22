import { motion } from "framer-motion";
import { Target, Eye, ArrowRight } from "lucide-react";
import { AnimatedSection } from "../AnimatedSection";

export default function MissionVisionSection() {
  return (
    <section className="relative z-10 py-24 overflow-hidden" id="mission-vision">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.03, 0.05, 0.03]
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/3 rounded-full blur-3xl"
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="px-6 md:px-10 relative">
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <AnimatedSection animation="fadeDown">
              <motion.div 
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-5 py-2 border border-emerald-500/20 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <Target className="h-4 w-4 text-emerald-400" />
                <span className="text-xs font-bold tracking-widest text-emerald-300">
                  OUR PURPOSE
                </span>
              </motion.div>
            </AnimatedSection>
            <AnimatedSection animation="fadeUp" delay={0.1}>
              <h3 className="text-4xl md:text-5xl font-extrabold">
                Mission & <span className="text-emerald-400">Vision</span>
              </h3>
            </AnimatedSection>
          </div>

          {/* Mission & Vision Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Mission Card */}
            <AnimatedSection animation="fadeUp" delay={0.2}>
              <motion.div 
                className="relative group h-full"
                whileHover={{ y: -6 }}
              >
                {/* Glow effect */}
                <motion.div 
                  animate={{ opacity: [0.3, 0.5, 0.3] }}
                  className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity"
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                
                <div className="relative h-full p-8 md:p-10 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 overflow-hidden group-hover:border-emerald-500/30 transition-all duration-500">
                  {/* Inner glow */}
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.3, 0.2]
                    }}
                    className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/20 rounded-full blur-2xl"
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  />
                  
                  <div className="relative z-10">
                    <motion.div 
                      className="h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <Target className="h-7 w-7 text-black" />
                    </motion.div>
                    <h4 className="text-2xl md:text-3xl font-bold text-white mb-4">Our Mission</h4>
                    <p className="text-base text-teal-100/60 leading-relaxed">
                      To empower businesses through reliable, scalable, and intelligent IT 
                      solutions that harness the power of cutting-edge technology—enabling 
                      digital transformation across industries
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>

            {/* Vision Card */}
            <AnimatedSection animation="fadeUp" delay={0.3}>
              <motion.div 
                className="relative group h-full"
                whileHover={{ y: -6 }}
              >
                {/* Glow effect */}
                <motion.div 
                  animate={{ opacity: [0.3, 0.5, 0.3] }}
                  className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity"
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />
                
                <div className="relative h-full p-8 md:p-10 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 overflow-hidden group-hover:border-teal-500/30 transition-all duration-500">
                  {/* Inner glow */}
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.3, 0.2]
                    }}
                    className="absolute -bottom-20 -left-20 w-40 h-40 bg-teal-500/20 rounded-full blur-2xl"
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                  />
                  
                  <div className="relative z-10">
                    <motion.div 
                      className="h-14 w-14 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center mb-6 shadow-lg shadow-teal-500/20"
                      whileHover={{ rotate: -10, scale: 1.1 }}
                    >
                      <Eye className="h-7 w-7 text-black" />
                    </motion.div>
                    <h4 className="text-2xl md:text-3xl font-bold text-white mb-4">Our Vision</h4>
                    <p className="text-base text-teal-100/60 leading-relaxed">
                      To be a global leader in next-generation IT services, 
                      known for our innovation, integrity, and commitment 
                      to our clients' success in the age of cloud and AI.
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>

          {/* Bottom CTA */}
          <AnimatedSection animation="fadeUp" delay={0.4}>
            <div className="text-center">
              <motion.div 
                className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20"
                transition={{ duration: 0.3 }}
                whileHover={{ 
                  boxShadow: '0 0 30px rgba(52, 211, 153, 0.15)',
                  borderColor: 'rgba(52, 211, 153, 0.4)'
                }}
              >
                <div className="text-center sm:text-left">
                  <p className="text-white font-semibold">Ready to be part of our journey?</p>
                  <p className="text-sm text-teal-100/50">Join hundreds of cooperatives already transforming their communities.</p>
                </div>
                <motion.a
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-black shadow-lg shadow-emerald-500/25"
                  href="#contact"
                  whileHover={{ 
                    scale: 1.02, 
                    backgroundColor: '#34d399',
                    boxShadow: '0 0 25px rgba(52, 211, 153, 0.4)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started Today
                  <ArrowRight className="h-4 w-4" />
                </motion.a>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}