import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import PageSection from "./PageSection";

export default function ContactSection() {
  return (
    <PageSection id="contact" className="relative z-10 py-28">
      <div className="px-6 md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h3 className="text-5xl font-extrabold">
              Get in <span className="italic text-emerald-300">Touch</span>
            </h3>
            <p className="mt-4 text-sm text-teal-100/60">
              Have questions about our cooperative platform? We’re here to help you succeed.
            </p>
          </div>

          <div className="mt-16 grid lg:grid-cols-2 gap-16 items-start">

            {/* left info */}
            <div>
              <h4 className="text-sm font-bold text-white/90 mb-6">
                Contact Information
              </h4>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-emerald-300" />
                  </div>
                  <div>
                    <div className="text-xs text-white/70">Email</div>
                    <div className="text-sm text-teal-100/70">
                      lands.horizon.corp@gmail.com
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-emerald-300" />
                  </div>
                  <div>
                    <div className="text-xs text-white/70">Phone</div>
                    <div className="text-sm text-teal-100/70">+63 991 617 1081</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-emerald-300" />
                  </div>
                  <div>
                    <div className="text-xs text-white/70">Address</div>
                    <div className="text-sm text-teal-100/70">
                      San Jose Del Monte, Bulacan
                      <br />
                      Region III (Central Luzon), Philippines
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 rounded-2xl bg-emerald-500/5 p-6">
                <h5 className="text-sm font-bold">Ready to Transform Your Cooperative?</h5>
                <p className="mt-2 text-xs text-teal-100/60">
                  Join our platform and empower your community with cutting-edge digital tools.
                </p>
                <button className="mt-5 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-black shadow-lg shadow-emerald-500/25 hover:bg-emerald-400 transition">
                  Join us Now
                </button>
              </div>
            </div>

            {/* right form */}
            <div className="rounded-2xl bg-black/40 backdrop-blur-xl border border-white/20 shadow-2xl p-8 hover:border-white/40 transition-all duration-300">
              <h4 className="text-base font-bold">Send us a Message</h4>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-white/60">First Name</label>
                  <input
                    className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition-all duration-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"

                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/60">Last Name</label>
                  <input
                    className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition-all duration-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"

                    placeholder="Your last name"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs text-white/60">Email</label>
                  <input
                    className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition-all duration-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"

                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs text-white/60">Contact Number</label>
                  <div className="mt-2 flex gap-3">
                {/* Country Code Dropdown */}
                <select
                  className="w-32 rounded-xl bg-black/40 border border-white/10 px-3 py-3 text-sm text-white outline-none transition-all duration-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
                  defaultValue="+63"
                >
                  <option value="+63">🇵🇭 +63</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+61">🇦🇺 +61</option>
                  <option value="+65">🇸🇬 +65</option>
                  <option value="+81">🇯🇵 +81</option>
                  <option value="+82">🇰🇷 +82</option>
                  <option value="+971">🇦🇪 +971</option>
                </select>

                {/* Phone Number Input */}
                <input
                  type="tel"
                  className="flex-1 rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition-all duration-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
                  placeholder="Enter phone number"
                />
              </div>

                </div>

                <div className="md:col-span-2">
                  <label className="text-xs text-white/60">Message</label>
                  <textarea
                    className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition-all duration-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"

                    placeholder="Tell us more about your cooperative and how we can help..."
                  />
                </div>

                <div className="md:col-span-2">
                  <button className="w-full rounded-xl bg-emerald-500 py-3 text-sm font-bold text-black shadow-lg shadow-emerald-500/25 hover:bg-emerald-400 transition">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageSection>
  );
}
