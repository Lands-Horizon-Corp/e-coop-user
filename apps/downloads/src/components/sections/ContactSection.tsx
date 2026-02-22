import { useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle, Mail, MapPin, Phone, Send } from 'lucide-react'

import { AnimatedSection } from '../AnimatedSection'

const contactInfo = [
    {
        icon: Mail,
        label: 'Email',
        value: 'lands.horizon.corp@gmail.com',
        href: 'mailto:lands.horizon.corp@gmail.com',
    },
    {
        icon: Phone,
        label: 'Phone',
        value: '+63 991 617 1081',
        href: 'tel:+639916171081',
    },
    {
        icon: MapPin,
        label: 'Address',
        value: 'San Jose Del Monte, Bulacan\nRegion III (Central Luzon), Philippines',
        href: '#',
    },
]

export default function ContactSection() {
    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [focusedField, setFocusedField] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1500))

        setIsSubmitting(false)
        setIsSubmitted(true)

        // Reset after showing success
        setTimeout(() => {
            setIsSubmitted(false)
            setFormState({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                message: '',
            })
        }, 3000)
    }

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setFormState((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <section className="relative z-10 py-24" id="contact">
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-emerald-500/5 rounded-full blur-3xl" />
            </div>

            <div className="px-6 md:px-10">
                <div className="mx-auto max-w-6xl">
                    {/* Section header */}
                    <AnimatedSection
                        animation="fadeUp"
                        className="text-center mb-16"
                    >
                        <motion.div
                            className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-5 py-2 border border-emerald-500/20 mb-6"
                            whileHover={{ scale: 1.05 }}
                        >
                            <span className="text-xs font-bold tracking-widest text-emerald-300">
                                CONTACT
                            </span>
                        </motion.div>
                        <h3 className="text-4xl md:text-5xl font-extrabold">
                            Get in{' '}
                            <span className="text-emerald-400">Touch</span>
                        </h3>
                        <p className="mt-4 text-base text-teal-100/50 max-w-lg mx-auto">
                            Have questions about our cooperative platform? We're
                            here to help you succeed.
                        </p>
                    </AnimatedSection>

                    <div className="grid lg:grid-cols-5 gap-12">
                        {/* Left - Contact Info */}
                        <div className="lg:col-span-2">
                            <AnimatedSection animation="fadeUp" delay={0.1}>
                                <h4 className="text-lg font-bold text-white mb-6">
                                    Contact Information
                                </h4>
                            </AnimatedSection>

                            <div className="space-y-5">
                                {contactInfo.map((item, index) => (
                                    <AnimatedSection
                                        animation="fadeUp"
                                        delay={0.2 + index * 0.1}
                                        key={item.label}
                                    >
                                        <motion.a
                                            className="group flex items-start gap-4 p-4 rounded-xl bg-black/20 border border-white/5 hover:border-emerald-500/30 hover:bg-black/30 transition-all duration-300"
                                            href={item.href}
                                            whileHover={{ x: 4 }}
                                        >
                                            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                                                <item.icon className="h-5 w-5 text-emerald-400" />
                                            </div>
                                            <div>
                                                <div className="text-xs text-white/50 mb-1">
                                                    {item.label}
                                                </div>
                                                <div className="text-sm text-teal-100/70 whitespace-pre-line">
                                                    {item.value}
                                                </div>
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
                                        boxShadow:
                                            '0 0 30px rgba(52, 211, 153, 0.1)',
                                        borderColor: 'rgba(52, 211, 153, 0.4)',
                                    }}
                                >
                                    <h5 className="text-base font-bold text-white">
                                        Ready to Transform Your Cooperative?
                                    </h5>
                                    <p className="mt-2 text-sm text-teal-100/50">
                                        Join our platform and empower your
                                        community with cutting-edge digital
                                        tools.
                                    </p>
                                    <motion.a
                                        className="inline-flex items-center gap-2 mt-5 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-black shadow-lg shadow-emerald-500/25"
                                        href="#download"
                                        whileHover={{
                                            scale: 1.02,
                                            backgroundColor: '#34d399',
                                            boxShadow:
                                                '0 0 25px rgba(52, 211, 153, 0.4)',
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Join us Now
                                    </motion.a>
                                </motion.div>
                            </AnimatedSection>
                        </div>

                        {/* Right - Form */}
                        <AnimatedSection
                            animation="fadeUp"
                            className="lg:col-span-3"
                            delay={0.3}
                        >
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
                                                animate={{
                                                    scale: 1,
                                                    opacity: 1,
                                                }}
                                                className="text-center"
                                                exit={{
                                                    scale: 0.5,
                                                    opacity: 0,
                                                }}
                                                initial={{
                                                    scale: 0.5,
                                                    opacity: 0,
                                                }}
                                            >
                                                <motion.div
                                                    animate={{ scale: 1 }}
                                                    initial={{ scale: 0 }}
                                                    transition={{
                                                        type: 'spring',
                                                        delay: 0.2,
                                                    }}
                                                >
                                                    <CheckCircle className="h-16 w-16 text-emerald-400 mx-auto mb-4" />
                                                </motion.div>
                                                <h4 className="text-xl font-bold text-white">
                                                    Message Sent!
                                                </h4>
                                                <p className="text-sm text-teal-100/50 mt-2">
                                                    We'll get back to you soon.
                                                </p>
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <h4 className="text-lg font-bold text-white mb-6">
                                    Send us a Message
                                </h4>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {/* First Name */}
                                    <div className="relative">
                                        <label
                                            className={cn(
                                                'absolute left-4 transition-all duration-200 pointer-events-none',
                                                focusedField === 'firstName' ||
                                                    formState.firstName
                                                    ? 'top-1 text-xs text-emerald-400'
                                                    : 'top-3.5 text-sm text-white/40'
                                            )}
                                        >
                                            First Name
                                        </label>
                                        <input
                                            className="w-full rounded-xl bg-black/40 border border-white/10 px-4 pt-6 pb-2 text-sm text-white outline-none transition-all duration-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                            name="firstName"
                                            onBlur={() => setFocusedField(null)}
                                            onChange={handleChange}
                                            onFocus={() =>
                                                setFocusedField('firstName')
                                            }
                                            required
                                            value={formState.firstName}
                                        />
                                    </div>

                                    {/* Last Name */}
                                    <div className="relative">
                                        <label
                                            className={cn(
                                                'absolute left-4 transition-all duration-200 pointer-events-none',
                                                focusedField === 'lastName' ||
                                                    formState.lastName
                                                    ? 'top-1 text-xs text-emerald-400'
                                                    : 'top-3.5 text-sm text-white/40'
                                            )}
                                        >
                                            Last Name
                                        </label>
                                        <input
                                            className="w-full rounded-xl bg-black/40 border border-white/10 px-4 pt-6 pb-2 text-sm text-white outline-none transition-all duration-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                            name="lastName"
                                            onBlur={() => setFocusedField(null)}
                                            onChange={handleChange}
                                            onFocus={() =>
                                                setFocusedField('lastName')
                                            }
                                            required
                                            value={formState.lastName}
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="md:col-span-2 relative">
                                        <label
                                            className={cn(
                                                'absolute left-4 transition-all duration-200 pointer-events-none',
                                                focusedField === 'email' ||
                                                    formState.email
                                                    ? 'top-1 text-xs text-emerald-400'
                                                    : 'top-3.5 text-sm text-white/40'
                                            )}
                                        >
                                            Email
                                        </label>
                                        <input
                                            className="w-full rounded-xl bg-black/40 border border-white/10 px-4 pt-6 pb-2 text-sm text-white outline-none transition-all duration-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                            name="email"
                                            onBlur={() => setFocusedField(null)}
                                            onChange={handleChange}
                                            onFocus={() =>
                                                setFocusedField('email')
                                            }
                                            required
                                            type="email"
                                            value={formState.email}
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div className="md:col-span-2">
                                        <div className="flex gap-3">
                                            <select
                                                className="w-28 rounded-xl bg-black/40 border border-white/10 px-3 py-3 text-sm text-white outline-none transition-all duration-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                                defaultValue="+63"
                                            >
                                                <option value="+63">
                                                    🇵🇭 +63
                                                </option>
                                                <option value="+1">
                                                    🇺🇸 +1
                                                </option>
                                                <option value="+44">
                                                    🇬🇧 +44
                                                </option>
                                                <option value="+61">
                                                    🇦🇺 +61
                                                </option>
                                                <option value="+65">
                                                    🇸🇬 +65
                                                </option>
                                                <option value="+81">
                                                    🇯🇵 +81
                                                </option>
                                            </select>
                                            <div className="relative flex-1">
                                                <label
                                                    className={cn(
                                                        'absolute left-4 transition-all duration-200 pointer-events-none',
                                                        focusedField ===
                                                            'phone' ||
                                                            formState.phone
                                                            ? 'top-1 text-xs text-emerald-400'
                                                            : 'top-3.5 text-sm text-white/40'
                                                    )}
                                                >
                                                    Phone Number
                                                </label>
                                                <input
                                                    className="w-full rounded-xl bg-black/40 border border-white/10 px-4 pt-6 pb-2 text-sm text-white outline-none transition-all duration-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                                    name="phone"
                                                    onBlur={() =>
                                                        setFocusedField(null)
                                                    }
                                                    onChange={handleChange}
                                                    onFocus={() =>
                                                        setFocusedField('phone')
                                                    }
                                                    type="tel"
                                                    value={formState.phone}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div className="md:col-span-2 relative">
                                        <label
                                            className={cn(
                                                'absolute left-4 transition-all duration-200 pointer-events-none',
                                                focusedField === 'message' ||
                                                    formState.message
                                                    ? 'top-1 text-xs text-emerald-400'
                                                    : 'top-3.5 text-sm text-white/40'
                                            )}
                                        >
                                            Message
                                        </label>
                                        <textarea
                                            className="w-full rounded-xl bg-black/40 border border-white/10 px-4 pt-6 pb-2 text-sm text-white outline-none transition-all duration-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 resize-none"
                                            name="message"
                                            onBlur={() => setFocusedField(null)}
                                            onChange={handleChange}
                                            onFocus={() =>
                                                setFocusedField('message')
                                            }
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
                                                boxShadow:
                                                    '0 0 25px rgba(52, 211, 153, 0.4)',
                                            }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {isSubmitting ? (
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    className="h-5 w-5 border-2 border-black/30 border-t-black rounded-full"
                                                    transition={{
                                                        duration: 1,
                                                        repeat: Infinity,
                                                        ease: 'linear',
                                                    }}
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
    )
}

function cn(...classes: (string | false | undefined | null)[]) {
    return classes.filter(Boolean).join(' ')
}
