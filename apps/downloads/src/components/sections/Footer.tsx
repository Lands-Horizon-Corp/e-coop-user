import { motion } from "framer-motion";
import { Mail, MapPin, Phone, ExternalLink } from "lucide-react";
import { AnimatedSection } from "../AnimatedSection";

interface FooterProps {
  logo: string;
}

const quickLinks = [
  { label: "Get started", href: "#download" },
  { label: "Terms and Conditions", href: "#policies" },
  { label: "Privacy Policy", href: "#policies" },
  { label: "Terms of use", href: "#policies" },
  { label: "Cookie policy", href: "#policies" },
  { label: "Data Protection Policy", href: "#policies" },
  { label: "Risk Management Policy", href: "#policies" },
  { label: "FAQ", href: "#faq" },
  { label: "Developers", href: "#" },
];

const policies = [
  { label: "AML and CTF Policy", href: "#policies" },
  { label: "Know Your Customer (KYC) Policy", href: "#policies" },
  { label: "Complaint Handling and Dispute Resolution Policy", href: "#policies" },
  { label: "Fair and Charges Policy", href: "#policies" },
  { label: "Security Policy", href: "#policies" },
];

const socialLinks = [
  { label: "Facebook", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "Youtube", href: "#" },
];

export default function Footer({ logo }: FooterProps) {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-[#080808]">
      <div className="px-6 md:px-10 py-16">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection animation="fadeUp">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
              {/* Brand Column */}
              <div className="lg:col-span-1 space-y-6">
                <motion.img 
                  alt="eCOOP" 
                  className="h-12 w-auto" 
                  src={logo}
                  whileHover={{ scale: 1.05 }}
                />
                
                <div className="flex items-center gap-3 text-xs text-white/60">
                  <motion.span 
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.7, 1]
                    }}
                    className="h-2 w-2 rounded-full bg-emerald-500"
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  All systems operational
                </div>
                
                <div className="text-xs text-white/40">
                  Made for Cooperatives. Powered by Trust
                </div>
                
                <div className="text-[11px] text-white/30">
                  Copyright © 2025 - 2026 Lands Horizon Corp.
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-xs font-bold text-white/80 tracking-wider mb-5">
                  QUICK LINKS
                </h4>
                <ul className="space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.label}>
                      <motion.a
                        className="group inline-flex items-center gap-1 text-xs text-white/50 hover:text-emerald-400 transition-colors"
                        href={link.href}
                        whileHover={{ x: 4 }}
                      >
                        {link.label}
                        {link.href === "#policies" && (
                          <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Policies */}
              <div>
                <h4 className="text-xs font-bold text-white/80 tracking-wider mb-5">
                  POLICIES
                </h4>
                <ul className="space-y-3">
                  {policies.map((link) => (
                    <li key={link.label}>
                      <motion.a
                        className="group inline-flex items-center gap-1 text-xs text-white/50 hover:text-emerald-400 transition-colors"
                        href={link.href}
                        whileHover={{ x: 4 }}
                      >
                        {link.label}
                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-xs font-bold text-white/80 tracking-wider mb-5">
                  CONTACTS
                </h4>
                <ul className="space-y-4">
                  <li>
                    <motion.a
                      className="group flex items-center gap-3 text-xs text-white/50 hover:text-emerald-400 transition-colors"
                      href="mailto:lands.horizon.corp@gmail.com"
                      whileHover={{ x: 4 }}
                    >
                      <Mail className="h-4 w-4" />
                      lands.horizon.corp@gmail.com
                    </motion.a>
                  </li>
                  <li>
                    <motion.a
                      className="group flex items-center gap-3 text-xs text-white/50 hover:text-emerald-400 transition-colors"
                      href="tel:+639916171081"
                      whileHover={{ x: 4 }}
                    >
                      <Phone className="h-4 w-4" />
                      +63 991 617 1081
                    </motion.a>
                  </li>
                  <li>
                    <div className="flex items-start gap-3 text-xs text-white/50">
                      <MapPin className="h-4 w-4 mt-0.5" />
                      <span>
                        San Jose Del Monte,
                        <br />
                        Bulacan, Region III (Central Luzon), Philippines
                      </span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Social */}
              <div>
                <h4 className="text-xs font-bold text-white/80 tracking-wider mb-5">
                  FOLLOW US
                </h4>
                <ul className="space-y-3">
                  {socialLinks.map((link) => (
                    <li key={link.label}>
                      <motion.a
                        className="group inline-flex items-center gap-1 text-xs text-white/50 hover:text-emerald-400 transition-colors"
                        href={link.href}
                        whileHover={{ x: 4 }}
                      >
                        {link.label}
                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimatedSection>

          {/* Bottom bar */}
          <AnimatedSection animation="fadeUp" delay={0.2}>
            <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-[11px] text-white/30">
                All rights reserved. E-Cooperative Suite is a product of Lands Horizon Corp.
              </p>
              <div className="flex items-center gap-6">
                <motion.a 
                  className="text-[11px] text-white/30 hover:text-white/50 transition-colors" 
                  href="#"
                  whileHover={{ y: -2 }}
                >
                  Sitemap
                </motion.a>
                <motion.a 
                  className="text-[11px] text-white/30 hover:text-white/50 transition-colors" 
                  href="#"
                  whileHover={{ y: -2 }}
                >
                  Accessibility
                </motion.a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </footer>
  );
}
