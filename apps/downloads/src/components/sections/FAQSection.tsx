import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import { AnimatedSection } from "../AnimatedSection";
import { cn } from "../../lib/utils";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

function FAQItem({ question, answer, isOpen, onClick, index }: FAQItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <motion.button
        className={cn(
          "w-full text-left rounded-2xl backdrop-blur-xl px-6 py-5 transition-all duration-300",
          isOpen 
            ? "bg-emerald-500/10 border border-emerald-500/30" 
            : "bg-black/30 border border-white/5 hover:bg-black/40 hover:border-white/10"
        )}
        onClick={onClick}
        type="button"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center justify-between gap-4">
          <span className={cn(
            "text-base font-medium transition-colors",
            isOpen ? "text-emerald-300" : "text-white/90"
          )}>
            {question}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            className={cn(
              "h-8 w-8 rounded-full flex items-center justify-center transition-colors",
              isOpen ? "bg-emerald-500/20" : "bg-white/5"
            )}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <ChevronDown className={cn(
              "h-4 w-4 transition-colors",
              isOpen ? "text-emerald-400" : "text-white/50"
            )} />
          </motion.div>
        </div>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              animate={{ height: "auto", opacity: 1 }}
              className="overflow-hidden"
              exit={{ height: 0, opacity: 0 }}
              initial={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <p className="pt-4 text-sm leading-relaxed text-teal-100/60">
                {answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
}

const faqs = [
  {
    question: "What is E-Cooperative Suite?",
    answer: "A digital platform designed to streamline cooperative operations—member management, transactions, reporting, and notifications—across desktop and mobile experiences. Built with modern technology and AI capabilities to empower cooperatives of all sizes."
  },
  {
    question: "Is my data secure?",
    answer: "We apply layered security controls and best practices to protect sensitive cooperative data and ensure secure access. This includes encryption at rest and in transit, Argon2 password hashing, role-based access control, regular security audits, and protection against XSS, SQL injection, and CSRF attacks."
  },
  {
    question: "Who can use E-Coop Suite?",
    answer: "E-Cooperative Suite is designed for all types of cooperatives—credit unions, multi-purpose cooperatives, farmers' cooperatives, and more. Both administrators and members can access the platform through desktop and mobile-friendly interfaces depending on your cooperative's deployment setup."
  },
  {
    question: "How do I request support?",
    answer: "Use the Contact section below to message us. Include your cooperative name and what you need help with. Our support team typically responds within 24 hours during business days. For urgent matters, you can also reach us directly via phone."
  },
  {
    question: "What are the system requirements?",
    answer: "For desktop: Windows 10/11, macOS 12+, or Ubuntu 20.04+. For mobile access: Any modern web browser. We recommend at least 4GB RAM and a stable internet connection for optimal performance."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative z-10 py-24" id="faq">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <div className="px-6 md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left side - Header */}
            <div className="lg:sticky lg:top-32">
              <AnimatedSection animation="fadeUp">
                <motion.div 
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-5 py-2 border border-emerald-500/20 mb-6"
                  whileHover={{ scale: 1.05 }}
                >
                  <HelpCircle className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs font-bold tracking-widest text-emerald-300">
                    FAQ
                  </span>
                </motion.div>
              </AnimatedSection>

              <AnimatedSection animation="fadeUp" delay={0.1}>
                <h3 className="text-4xl md:text-5xl font-extrabold leading-tight">
                  Frequently Asked
                  <br />
                  <span className="text-emerald-400">Questions</span>
                </h3>
              </AnimatedSection>

              <AnimatedSection animation="fadeUp" delay={0.2}>
                <p className="mt-6 text-base text-teal-100/50 max-w-md">
                  Browse our most common questions or contact us directly for personalized assistance.
                </p>
              </AnimatedSection>

              <AnimatedSection animation="fadeUp" delay={0.3}>
                <motion.a
                  className="group mt-8 inline-flex items-center gap-3 rounded-xl bg-emerald-500/10 px-6 py-4 border border-emerald-500/20 text-emerald-300 font-semibold hover:bg-emerald-500/20 transition-all"
                  href="#contact"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle className="h-5 w-5" />
                  Contact us for more help
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    className="inline-block"
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.a>
              </AnimatedSection>
            </div>

            {/* Right side - FAQ Items */}
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <FAQItem
                  answer={faq.answer}
                  index={index}
                  isOpen={openIndex === index}
                  key={index}
                  onClick={() => handleClick(index)}
                  question={faq.question}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
