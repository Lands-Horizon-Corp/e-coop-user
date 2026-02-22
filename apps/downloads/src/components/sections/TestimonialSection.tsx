import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { AnimatedSection } from "../AnimatedSection";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Maria Santos",
    role: "Chairperson",
    company: "San Jose Cooperative",
    content: "E-Cooperative Suite has completely transformed how we manage our members. The AI-powered insights have helped us make better financial decisions and grow our cooperative by 40% in just one year.",
    rating: 5,
    avatar: "MS"
  },
  {
    id: 2,
    name: "Juan Dela Cruz",
    role: "Treasurer",
    company: "Bulacan Farmers Coop",
    content: "The transaction management system is incredibly intuitive. We've reduced our administrative workload by 60% and our members love the mobile accessibility. Highly recommended!",
    rating: 5,
    avatar: "JD"
  },
  {
    id: 3,
    name: "Ana Reyes",
    role: "Manager",
    company: "Luzon Credit Union",
    content: "Security was our top concern, and E-Cooperative Suite exceeded our expectations. The enterprise-grade protection gives us and our members complete peace of mind.",
    rating: 5,
    avatar: "AR"
  },
  {
    id: 4,
    name: "Roberto Lim",
    role: "Secretary",
    company: "Central Luzon Coop",
    content: "The reporting features are outstanding. We can generate comprehensive reports in seconds that used to take days. This has revolutionized our quarterly meetings.",
    rating: 5,
    avatar: "RL"
  },
  {
    id: 5,
    name: "Carmen Garcia",
    role: "President",
    company: "Horizon Multi-Purpose",
    content: "From member onboarding to transaction processing, everything is seamless. The support team is responsive and the platform keeps getting better with updates.",
    rating: 5,
    avatar: "CG"
  }
];

const stats = [
  { value: "500+", label: "Cooperatives" },
  { value: "50K+", label: "Active Members" },
  { value: "99%", label: "Satisfaction" }
];

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const nextSlide = useCallback(() => {
    setDirection("right");
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection("left");
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const currentTestimonial = testimonials[currentIndex];

  const slideVariants = {
    enter: (direction: "left" | "right") => ({
      x: direction === "right" ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: "left" | "right") => ({
      x: direction === "right" ? -80 : 80,
      opacity: 0,
    }),
  };

  return (
    <section id="testimonials" className="relative z-10 py-24 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.05, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="px-6 md:px-10 relative">
        <div className="mx-auto max-w-5xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <AnimatedSection animation="fadeDown">
              <motion.div 
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-5 py-2 border border-emerald-500/20 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <Star className="h-4 w-4 text-emerald-400" />
                <span className="text-xs font-bold tracking-widest text-emerald-300">
                  TESTIMONIALS
                </span>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection animation="fadeUp" delay={0.1}>
              <h3 className="text-4xl md:text-5xl font-extrabold">
                What Our <span className="text-emerald-400">Clients</span> Say
              </h3>
            </AnimatedSection>

            <AnimatedSection animation="fadeUp" delay={0.2}>
              <p className="mt-4 text-base text-teal-100/50 max-w-2xl mx-auto">
                Discover how cooperatives across the Philippines are transforming their operations with E-Cooperative Suite.
              </p>
            </AnimatedSection>
          </div>

          {/* Carousel */}
          <AnimatedSection animation="scale" delay={0.3}>
            <div 
              className="relative"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              {/* Main Card */}
              <motion.div 
                className="relative bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-12 overflow-hidden"
                whileHover={{ 
                  boxShadow: '0 25px 50px -12px rgba(52, 211, 153, 0.15)',
                  borderColor: 'rgba(52, 211, 153, 0.2)'
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Quote Icon */}
                <motion.div 
                  className="absolute top-6 right-6 md:top-8 md:right-8"
                  animate={{ 
                    rotate: [0, 10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Quote className="h-12 w-12 md:h-16 md:w-16 text-emerald-500/10" />
                </motion.div>

                {/* Content */}
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentTestimonial.id}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    {/* Rating */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <Star 
                            className={`h-5 w-5 ${
                              i < currentTestimonial.rating 
                                ? "text-emerald-400 fill-emerald-400" 
                                : "text-white/20"
                            }`} 
                          />
                        </motion.div>
                      ))}
                    </div>

                    {/* Quote Text */}
                    <blockquote className="text-lg md:text-2xl text-white/90 leading-relaxed mb-8 font-light">
                      "{currentTestimonial.content}"
                    </blockquote>

                    {/* Author Info */}
                    <div className="flex items-center gap-4">
                      <motion.div 
                        className="h-14 w-14 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-black font-bold text-lg"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        {currentTestimonial.avatar}
                      </motion.div>
                      <div>
                        <div className="font-bold text-white text-lg">{currentTestimonial.name}</div>
                        <div className="text-sm text-teal-100/50">
                          {currentTestimonial.role} at {currentTestimonial.company}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-emerald-400 to-teal-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentIndex + 1) / testimonials.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                </div>
              </motion.div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8">
                {/* Dots */}
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex 
                          ? "w-8 bg-emerald-400" 
                          : "w-2 bg-white/30 hover:bg-white/50"
                      }`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Arrows */}
                <div className="flex gap-3">
                  <motion.button
                    onClick={prevSlide}
                    className="h-12 w-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="h-5 w-5 text-white" />
                  </motion.button>
                  <motion.button
                    onClick={nextSlide}
                    className="h-12 w-12 rounded-full bg-emerald-500 hover:bg-emerald-400 flex items-center justify-center transition-all duration-300"
                    whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(52, 211, 153, 0.4)' }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="h-5 w-5 text-black" />
                  </motion.button>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6">
            {stats.map((stat, index) => (
              <AnimatedSection key={index} animation="fadeUp" delay={0.4 + index * 0.1}>
                <motion.div 
                  className="text-center p-3 rounded-2xl bg-black/30 backdrop-blur-sm border border-white/5 hover:border-emerald-500/20 transition-all duration-300"
                  whileHover={{ y: -4, backgroundColor: 'rgba(0,0,0,0.4)' }}
                >
                  <motion.div 
                    className="text-3xl md:text-4xl font-extrabold text-emerald-400"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                    viewport={{ once: true }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-teal-100/50 mt-1">{stat.label}</div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
