import { motion } from "framer-motion";
import { AnimatedSection } from "../AnimatedSection";
import { ImageIcon } from "lucide-react";

export default function PreviewSection() {
  return (
    <section id="preview" className="relative z-10 py-24">
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

          {/* Image Placeholder */}
          <AnimatedSection animation="scale" delay={0.2}>
            <div className="relative">
              {/* Glow effect behind */}
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-emerald-500/20 rounded-[2.5rem] blur-2xl opacity-50" />
              
              {/* Placeholder container */}
              <div className="relative rounded-3xl overflow-hidden bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl">
                {/* Window controls bar */}
                <div className="flex items-center gap-3 bg-black/50 px-5 py-4 border-b border-white/5">
                  <div className="flex gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-500/80" />
                    <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <span className="h-3 w-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-xs text-white/40 font-medium">E-Cooperative Suite Dashboard</span>
                  </div>
                  <div className="w-16" />
                </div>

                {/* Placeholder content - REPLACE THIS DIV WITH YOUR IMAGE */}
                <div className="relative aspect-[16/10] bg-gradient-to-br from-black/60 to-emerald-950/30 flex items-center justify-center">
                  <div className="text-center">
                    <div className="h-20 w-20 rounded-2xl bg-emerald-500/10 border-2 border-dashed border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                      <ImageIcon className="h-10 w-10 text-emerald-400/50" />
                    </div>
                    <p className="text-sm text-teal-100/40 font-medium">Dashboard Preview</p>
                    <p className="text-xs text-teal-100/30 mt-1">Replace with your image</p>
                  </div>
                  
                  {/* Optional: Remove this overlay when you add your image */}
                  <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none" />
                </div>
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