import type React from 'react'
import { useState } from 'react'

import { Button } from '@e-coop-monorepo/ui/core'
import { Card } from '@e-coop-monorepo/ui/core'
import { Input } from '@e-coop-monorepo/ui/core'
import { Textarea } from '@e-coop-monorepo/ui/core'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'

import { CoopBackground } from '../components/coop-bg'

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Form submission logic here
        console.log('[v0] Form submitted:', formData)
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <div className="absolute inset-0 -z-10 -mt-16 h-screen w-full bg-radial-[ellipse_at_100%_0%] from-primary/50 via-background/0 to-background/0 to-100%" />
            <div className="absolute inset-0 -z-10 h-screen w-full bg-radial-[ellipse_at_0%_50%] from-primary/20 via-background/0 to-background/0 to-100%" />
            <CoopBackground opacity={0.25} variant="hexagons" />

            <section className="bg-linear-to-b from-background to-muted py-20 md:py-28">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
                            Get in Touch
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground text-balance leading-relaxed">
                            Have questions? We're here to help. Reach out to us
                            and we'll respond as soon as possible.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-16 md:py-20">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {[
                            {
                                icon: Phone,
                                title: 'Call Us',
                                content: '+1 (555) 123-4567',
                                subContent: 'Mon-Fri, 8AM-6PM',
                            },
                            {
                                icon: Mail,
                                title: 'Email Us',
                                content: 'info@cooperative.com',
                                subContent: '24/7 support',
                            },
                            {
                                icon: MapPin,
                                title: 'Main Office',
                                content: '123 Main Street',
                                subContent: 'City, State 12345',
                            },
                            {
                                icon: Clock,
                                title: 'Business Hours',
                                content: 'Mon-Fri: 8AM-6PM',
                                subContent: 'Sat: 9AM-2PM',
                            },
                        ].map((item, index) => (
                            <Card
                                className="p-6 text-center hover:shadow-lg transition-shadow"
                                key={index}
                            >
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                    <item.icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="font-semibold mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-1">
                                    {item.content}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {item.subContent}
                                </p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form & Map */}
            <section className="py-16 md:py-20 bg-muted/30">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Contact Form */}
                        <div>
                            <h2 className="text-3xl font-bold mb-4">
                                Send Us a Message
                            </h2>
                            <p className="text-muted-foreground mb-8 leading-relaxed">
                                Fill out the form below and we'll get back to
                                you within 24 hours.
                            </p>

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label
                                            className="text-sm font-medium"
                                            htmlFor="name"
                                        >
                                            Full Name{' '}
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </label>
                                        <Input
                                            id="name"
                                            name="name"
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            required
                                            value={formData.name}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label
                                            className="text-sm font-medium"
                                            htmlFor="email"
                                        >
                                            Email Address{' '}
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </label>
                                        <Input
                                            id="email"
                                            name="email"
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            required
                                            type="email"
                                            value={formData.email}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label
                                        className="text-sm font-medium"
                                        htmlFor="phone"
                                    >
                                        Phone Number
                                    </label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        onChange={handleChange}
                                        placeholder="+1 (555) 000-0000"
                                        type="tel"
                                        value={formData.phone}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label
                                        className="text-sm font-medium"
                                        htmlFor="subject"
                                    >
                                        Subject{' '}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </label>
                                    <Input
                                        id="subject"
                                        name="subject"
                                        onChange={handleChange}
                                        placeholder="How can we help?"
                                        required
                                        value={formData.subject}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label
                                        className="text-sm font-medium"
                                        htmlFor="message"
                                    >
                                        Message{' '}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        onChange={handleChange}
                                        placeholder="Tell us more about your inquiry..."
                                        required
                                        rows={6}
                                        value={formData.message}
                                    />
                                </div>

                                <Button
                                    className="w-full md:w-auto"
                                    size="lg"
                                    type="submit"
                                >
                                    Send Message
                                </Button>
                            </form>
                        </div>

                        {/* Branch Locations */}
                        <div>
                            <h2 className="text-3xl font-bold mb-4">
                                Our Branches
                            </h2>
                            <p className="text-muted-foreground mb-8 leading-relaxed">
                                Visit us at any of our convenient locations.
                            </p>

                            <div className="space-y-6">
                                {[
                                    {
                                        name: 'Main Branch',
                                        address:
                                            '123 Main Street, City, State 12345',
                                        phone: '+1 (555) 123-4567',
                                        hours: 'Mon-Fri: 8AM-6PM, Sat: 9AM-2PM',
                                    },
                                    {
                                        name: 'Downtown Branch',
                                        address:
                                            '456 Downtown Ave, City, State 12345',
                                        phone: '+1 (555) 123-4568',
                                        hours: 'Mon-Fri: 9AM-5PM, Sat: 10AM-1PM',
                                    },
                                    {
                                        name: 'Westside Branch',
                                        address:
                                            '789 West Boulevard, City, State 12345',
                                        phone: '+1 (555) 123-4569',
                                        hours: 'Mon-Fri: 8AM-6PM',
                                    },
                                ].map((branch, index) => (
                                    <Card
                                        className="p-6 bg-background"
                                        key={index}
                                    >
                                        <h3 className="font-semibold text-lg mb-3">
                                            {branch.name}
                                        </h3>
                                        <div className="space-y-2 text-sm text-muted-foreground">
                                            <div className="flex items-start gap-2">
                                                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                                                <span>{branch.address}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone className="w-4 h-4 shrink-0" />
                                                <span>{branch.phone}</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <Clock className="w-4 h-4 mt-0.5 shrink-0" />
                                                <span>{branch.hours}</span>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>

                            {/* Map Placeholder */}
                            <div className="mt-8 aspect-video rounded-lg bg-muted/50 flex items-center justify-center border">
                                <div className="text-center p-6">
                                    <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                                    <p className="text-sm text-muted-foreground">
                                        Interactive map would appear here
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 md:py-20">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-muted-foreground mb-12 text-balance">
                            Find quick answers to common questions
                        </p>

                        <div className="space-y-4 text-left">
                            {[
                                {
                                    q: 'What documents do I need to open an account?',
                                    a: "You'll need a valid government-issued ID, proof of address, and your Social Security number or Tax ID.",
                                },
                                {
                                    q: 'How long does loan approval take?',
                                    a: 'Most loan applications are reviewed within 24-48 hours. Complex cases may take up to 5 business days.',
                                },
                                {
                                    q: 'Are my deposits insured?',
                                    a: 'Yes, all deposits are insured up to ₱250,000 by the National Credit Union Administration (NCUA).',
                                },
                            ].map((faq, index) => (
                                <Card className="p-6 text-left" key={index}>
                                    <h3 className="font-semibold mb-2">
                                        {faq.q}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {faq.a}
                                    </p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ContactPage
