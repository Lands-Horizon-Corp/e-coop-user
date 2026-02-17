import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import PageSection from "./PageSection";

export default function Footer({ logo }: { logo: string }) {
  return (
    <PageSection id="footer" className="relative z-10">
      <footer className="py-20">
        <div className="px-6 md:px-10">
          <div className="mx-auto max-w-8xl rounded-3xl bg-black/20 backdrop-blur-xl p-10">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
              <div className="space-y-6">
                <img src={logo} alt="eCOOP" className="h-12 w-auto" />
                <div className="flex items-center gap-3 text-xs text-white/60">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  All systems operational
                </div>
                <div className="text-xs text-white/45">
                  Made for Cooperatives. Powered by Trust
                </div>
                <div className="text-[11px] text-white/35">
                  Copyright © 2025 - 2026 Lands Horizon Corp.
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-white/80 tracking-wider mb-5">
                  QUICK LINKS
                </div>
                <ul className="space-y-3 text-xs text-white/50">
                  {[
                    "Get started",
                    "Terms and Conditions",
                    "Privacy Policy",
                    "Terms of use",
                    "Cookie policy",
                    "Data Protection Policy",
                    "Risk Management Policy",
                    "FAQ",
                    "Developers",
                  ].map((t) => (
                    <li key={t}>
                      <a
                        href={t === "Privacy Policy" || t === "Terms and Conditions" ? "#policies" : "#"}
                        className="hover:text-white transition"
                      >
                        {t}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="text-xs font-bold text-white/80 tracking-wider mb-5">
                  POLICIES
                </div>
                <ul className="space-y-3 text-xs text-white/50">
                  {[
                    "AML and CTF Policy",
                    "Know Your Customer (KYC) Policy",
                    "Complaint Handling and Dispute Resolution Policy",
                    "Fair and Charges Policy",
                    "Security Policy",
                  ].map((t) => (
                    <li key={t}>
                      <a href="#policies" className="hover:text-white transition">
                        {t}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="text-xs font-bold text-white/80 tracking-wider mb-5">
                  CONTACTS
                </div>
                <ul className="space-y-4 text-xs text-white/55">
                  <li className="flex items-center gap-3">
                    <Mail className="h-4 w-4" />
                    lands.horizon.corp@gmail.com
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="h-4 w-4" />
                    +63 991 617 1081
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 mt-0.5" />
                    <span>
                      San Jose Del Monte,
                      <br />
                      Bulacan, Region III (Central Luzon), the Philippines
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <div className="text-xs font-bold text-white/80 tracking-wider mb-5">
                  FOLLOW US
                </div>
                <ul className="space-y-3 text-xs text-white/50">
                  {["Facebook", "Twitter", "Youtube"].map((t) => (
                    <li key={t}>
                      <a href="#" className="hover:text-white transition">
                        {t}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </PageSection>
  );
}
