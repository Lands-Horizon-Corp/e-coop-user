import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle } from "lucide-react";
import { AnimatedSection } from "../AnimatedSection";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import './ContactSection.css';

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "lands.horizon.corp@gmail.com",
    href: "mailto:lands.horizon.corp@gmail.com"
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+63 991 617 1081",
    href: "tel:+639916171081"
  },
  {
    icon: MapPin,
    label: "Address",
    value: "San Jose Del Monte, Bulacan\nRegion III (Central Luzon), Philippines",
    href: "#"
  }
];

export default function ContactSection() {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: ""
  });
  const [phone, setPhone] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  // Validation state
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [touched, setTouched] = useState<{[key: string]: boolean}>({});

  // STRICT Email validation
  const validateEmail = (email: string): boolean => {
    if (!email) return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle email input with validation
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormState(prev => ({
      ...prev,
      email: value
    }));

    if (touched.email) {
      if (value && !validateEmail(value)) {
        setErrors(prev => ({ ...prev, email: 'Please enter a valid email (e.g., name@example.com)' }));
      } else {
        setErrors(prev => ({ ...prev, email: '' }));
      }
    }
  };

  // Handle blur - mark as touched and validate
  const handleBlur = (field: string) => {
    setFocusedField(null);
    setTouched(prev => ({ ...prev, [field]: true }));

    if (field === 'email') {
      if (formState.email && !validateEmail(formState.email)) {
        setErrors(prev => ({ ...prev, email: 'Please enter a valid email (e.g., name@example.com)' }));
      } else {
        setErrors(prev => ({ ...prev, email: '' }));
      }
    }

    if (field === 'phone') {
      if (!phone) {
        setErrors(prev => ({ ...prev, phone: 'Please enter a valid phone number' }));
      } else {
        setErrors(prev => ({ ...prev, phone: '' }));
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all as touched
    setTouched({ email: true, phone: true, firstName: true, lastName: true, message: true });
    
    // Validate all
    const newErrors: {[key: string]: string} = {};
    
    if (!formState.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formState.email)) {
      newErrors.email = 'Please enter a valid email (e.g., name@example.com)';
    }
    
    if (!phone) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ firstName: "", lastName: "", email: "", message: "" });
      setPhone(undefined);
      setTouched({});
      setErrors({});
    }, 3000);
  };

  return (
    <section className="relative z-10 py-24" id="contact">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="px-6 md:px-10">
        <div className="mx-auto max-w-6xl">
          {/* Section header */}
          <AnimatedSection animation="fadeUp" className="text-center mb-16">
            <motion.div 
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-5 py-2 border border-emerald-500/20 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-xs font-bold tracking-widest text-emerald-300">CONTACT</span>
            </motion.div>
            <h3 className="text-4xl md:text-5xl font-extrabold">
              Get in <span className="text-emerald-400">Touch</span>
            </h3>
            <p className="mt-4 text-base text-teal-100/50 max-w-lg mx-auto">
              Have questions about our cooperative platform? We're here to help you succeed.
            </p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Left - Contact Info */}
            <div className="lg:col-span-2">
              <AnimatedSection animation="fadeUp" delay={0.1}>
                <h4 className="text-lg font-bold text-white mb-6">Contact Information</h4>
              </AnimatedSection>

              <div className="space-y-5">
                {contactInfo.map((item, index) => (
                  <AnimatedSection animation="fadeUp" delay={0.2 + index * 0.1} key={item.label}>
                    <motion.a
                      className="group flex items-start gap-4 p-4 rounded-xl bg-black/20 border border-white/5 hover:border-emerald-500/30 hover:bg-black/30 transition-all duration-300"
                      href={item.href}
                      whileHover={{ x: 4 }}
                    >
                      <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                        <item.icon className="h-5 w-5 text-emerald-400" />
                      </div>
                      <div>
                        <div className="text-xs text-white/50 mb-1">{item.label}</div>
                        <div className="text-sm text-teal-100/70 whitespace-pre-line">{item.value}</div>
                      </div>
                    </motion.a>
                  </AnimatedSection>
                ))}
              </div>

              {/* CTA Card */}
              <AnimatedSection animation="fadeUp" delay={0.5}>
                <motion.div 
                  className="mt-8 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/5 p-6 border border-emerald-500/20"
                  whileHover={{ 
                    boxShadow: '0 0 30px rgba(52, 211, 153, 0.1)',
                    borderColor: 'rgba(52, 211, 153, 0.4)'
                  }}
                >
                  <h5 className="text-base font-bold text-white">Ready to Transform Your Cooperative?</h5>
                  <p className="mt-2 text-sm text-teal-100/50">
                    Join our platform and empower your community with cutting-edge digital tools.
                  </p>
                  <motion.a
                    className="inline-flex items-center gap-2 mt-5 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-black shadow-lg shadow-emerald-500/25"
                    href="#download"
                    whileHover={{ 
                      scale: 1.02, 
                      backgroundColor: '#34d399',
                      boxShadow: '0 0 25px rgba(52, 211, 153, 0.4)'
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Join us Now
                  </motion.a>
                </motion.div>
              </AnimatedSection>
            </div>

            {/* Right - Form */}
            <AnimatedSection animation="fadeUp" className="lg:col-span-3" delay={0.3}>
              <motion.form 
                className="relative rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl p-8 overflow-hidden"
                onSubmit={handleSubmit}
              >
                {/* Success overlay */}
                <AnimatePresence>
                  {isSubmitted && (
                    <motion.div
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-10"
                      exit={{ opacity: 0 }}
                      initial={{ opacity: 0 }}
                    >
                      <motion.div
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center"
                        exit={{ scale: 0.5, opacity: 0 }}
                        initial={{ scale: 0.5, opacity: 0 }}
                      >
                        <motion.div
                          animate={{ scale: 1 }}
                          initial={{ scale: 0 }}
                          transition={{ type: "spring", delay: 0.2 }}
                        >
                          <CheckCircle className="h-16 w-16 text-emerald-400 mx-auto mb-4" />
                        </motion.div>
                        <h4 className="text-xl font-bold text-white">Message Sent!</h4>
                        <p className="text-sm text-teal-100/50 mt-2">We'll get back to you soon.</p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <h4 className="text-lg font-bold text-white mb-6">Send us a Message</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* First Name */}
                  <div className="relative">
                    <label className={cn(
                      "absolute left-4 transition-all duration-200 pointer-events-none",
                      focusedField === 'firstName' || formState.firstName
                        ? "top-1 text-xs text-emerald-400"
                        : "top-3.5 text-sm text-white/40"
                    )}>
                      First Name
                    </label>
                    <input
                      className="w-full rounded-xl bg-black/40 border border-white/10 px-4 pt-6 pb-2 text-sm text-white outline-none transition-all duration-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                      name="firstName"
                      onBlur={() => handleBlur('firstName')}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('firstName')}
                      required
                      value={formState.firstName}
                    />
                  </div>

                  {/* Last Name */}
                  <div className="relative">
                    <label className={cn(
                      "absolute left-4 transition-all duration-200 pointer-events-none",
                      focusedField === 'lastName' || formState.lastName
                        ? "top-1 text-xs text-emerald-400"
                        : "top-3.5 text-sm text-white/40"
                    )}>
                      Last Name
                    </label>
                    <input
                      className="w-full rounded-xl bg-black/40 border border-white/10 px-4 pt-6 pb-2 text-sm text-white outline-none transition-all duration-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                      name="lastName"
                      onBlur={() => handleBlur('lastName')}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('lastName')}
                      required
                      value={formState.lastName}
                    />
                  </div>

                  {/* Email with STRICT validation */}
                  <div className="md:col-span-2 relative">
                    <label className={cn(
                      "absolute left-4 transition-all duration-200 pointer-events-none",
                      focusedField === 'email' || formState.email
                        ? "top-1 text-xs text-emerald-400"
                        : "top-3.5 text-sm text-white/40"
                    )}>
                      Email
                    </label>
                    <input
                      className={cn(
                        "w-full rounded-xl bg-black/40 border px-4 pt-6 pb-2 text-sm text-white outline-none transition-all duration-200 focus:ring-2",
                        errors.email 
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                          : touched.email && !errors.email && formState.email
                            ? "border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500/20"
                            : "border-white/10 focus:border-emerald-500 focus:ring-emerald-500/20"
                      )}
                      name="email"
                      onBlur={() => handleBlur('email')}
                      onChange={handleEmailChange}
                      onFocus={() => setFocusedField('email')}
                      required
                      type="email"
                      value={formState.email}
                    />
                    {errors.email && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-1 mt-1.5"
                      >
                        <AlertCircle className="h-3.5 w-3.5 text-red-400" />
                        <p className="text-xs text-red-400">{errors.email}</p>
                      </motion.div>
                    )}
                  </div>

                  {/* Phone Input with react-phone-number-input */}
                  <div className="md:col-span-2">
                    <label className="block text-xs text-emerald-400 mb-2">
                      Phone Number
                    </label>
                    <PhoneInput
                      international
                      defaultCountry="PH"
                      value={phone}
                      onChange={setPhone}
                      onBlur={() => handleBlur('phone')}
                      className={cn(
                        "phone-input-custom",
                        errors.phone 
                          ? "phone-input-error" 
                          : touched.phone && phone
                            ? "phone-input-success"
                            : ""
                      )}
                    />
                    {errors.phone && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-1 mt-1.5"
                      >
                        <AlertCircle className="h-3.5 w-3.5 text-red-400" />
                        <p className="text-xs text-red-400">{errors.phone}</p>
                      </motion.div>
                    )}
                  </div>

                  {/* Message */}
                  <div className="md:col-span-2 relative">
                    <label className={cn(
                      "absolute left-4 transition-all duration-200 pointer-events-none",
                      focusedField === 'message' || formState.message
                        ? "top-1 text-xs text-emerald-400"
                        : "top-3.5 text-sm text-white/40"
                    )}>
                      Message
                    </label>
                    <textarea
                      className="w-full rounded-xl bg-black/40 border border-white/10 px-4 pt-6 pb-2 text-sm text-white outline-none transition-all duration-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 resize-none"
                      name="message"
                      onBlur={() => handleBlur('message')}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      required
                      rows={4}
                      value={formState.message}
                    />
                  </div>

                  {/* Submit */}
                  <div className="md:col-span-2">
                    <motion.button
                      className="w-full rounded-xl bg-emerald-500 py-4 text-sm font-bold text-black shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 disabled:opacity-70"
                      disabled={isSubmitting}
                      type="submit"
                      whileHover={{ 
                        scale: 1.02, 
                        backgroundColor: '#34d399',
                        boxShadow: '0 0 25px rgba(52, 211, 153, 0.4)'
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          className="h-5 w-5 border-2 border-black/30 border-t-black rounded-full"
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.form>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}

function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}