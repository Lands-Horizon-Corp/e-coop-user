import { Link } from '@tanstack/react-router'

import { ArrowUpRight, Facebook, Linkedin, Mail, Twitter } from 'lucide-react'

const LandingFooter = () => {
    return (
        <footer className="bg-linear to-b from-muted/30 to-muted/50 border-t">
            <div className="container mx-auto px-4 md:px-6 py-16 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* About */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                                <span className="text-primary-foreground font-bold text-lg">
                                    CO
                                </span>
                            </div>
                            <span className="font-bold text-lg">
                                Community Cooperative
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                            Member-owned financial services dedicated to
                            improving the economic well-being of our community.
                        </p>
                        <div className="flex gap-2">
                            {[Facebook, Twitter, Linkedin, Mail].map(
                                (Icon, idx) => (
                                    <a
                                        className="w-10 h-10 rounded-lg bg-background hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center border hover:border-primary group"
                                        href="#"
                                        key={idx}
                                    >
                                        <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    </a>
                                )
                            )}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-base mb-6">
                            Quick Links
                        </h3>
                        <ul className="space-y-3 text-sm">
                            {[
                                { href: '/', label: 'Home' },
                                { href: '/about', label: 'About Us' },
                                { href: '/contact-us', label: 'Contact' },
                                { href: '/terms', label: 'Terms' },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link
                                        className="text-muted-foreground hover:text-foreground transition-colors group inline-flex items-center gap-1"
                                        to={link.href as string}
                                    >
                                        {link.label}
                                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="font-bold text-base mb-6">Services</h3>
                        <ul className="space-y-3 text-sm">
                            {[
                                'Savings Accounts',
                                'Personal Loans',
                                'Housing Loans',
                                'Business Loans',
                            ].map((service) => (
                                <li key={service}>
                                    <Link
                                        className="text-muted-foreground hover:text-foreground transition-colors group inline-flex items-center gap-1"
                                        to={service
                                            .replace(/\s+/g, '-')
                                            .toLowerCase()}
                                    >
                                        {service}
                                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-bold text-base mb-6">Contact Us</h3>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li className="leading-relaxed">
                                <div className="font-medium text-foreground mb-1">
                                    Main Office
                                </div>
                                123 Main Street
                                <br />
                                City, State 12345
                            </li>
                            <li>
                                <div className="font-medium text-foreground mb-1">
                                    Get in Touch
                                </div>
                                Phone: +1 (555) 123-4567
                                <br />
                                Email: info@cooperative.com
                            </li>
                            <li>
                                <div className="font-medium text-foreground mb-1">
                                    Business Hours
                                </div>
                                Mon-Fri: 8AM-6PM
                                <br />
                                Sat: 9AM-2PM
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p className="font-medium">
                        © 2025 Community Cooperative. All rights reserved.
                    </p>
                    <div className="flex gap-8">
                        {[
                            { href: '/terms', label: 'Terms & Conditions' },
                            { href: '#', label: 'Privacy Policy' },
                            { href: '#priv', label: 'Cookie Policy' },
                        ].map((link) => (
                            <Link
                                className="hover:text-foreground transition-colors font-medium"
                                key={link.href}
                                to={link.href}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default LandingFooter
