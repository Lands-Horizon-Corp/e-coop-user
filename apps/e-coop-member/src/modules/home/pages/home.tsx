import { Link } from '@tanstack/react-router'

import { FlickeringGrid } from '@e-coop-monorepo/ui'
import { Particles } from '@e-coop-monorepo/ui'
import { Badge } from '@e-coop-monorepo/ui'
import { Button } from '@e-coop-monorepo/ui'
import { Card } from '@e-coop-monorepo/ui'
import {
    ArrowRight,
    CheckCircle2,
    Heart,
    Shield,
    Sparkles,
    TrendingUp,
    Users,
} from 'lucide-react'

import AnimateRevealEffect from '../components/animate-reveal-effect'
import { CoopBackground } from '../components/coop-bg'

const HomePage = () => {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <FlickeringGrid
                flickerChance={0.05}
                gridGap={1}
                maxOpacity={0.5}
                squareSize={64}
            />
            <Particles
                className="absolute inset-0"
                color="#ffffff"
                ease={80}
                quantity={50}
            />
            <div className="absolute inset-0 -z-10 -mt-16 h-screen w-full bg-radial-[ellipse_at_100%_0%] from-primary/50 via-background/0 to-background/0 to-100%" />
            <div className="absolute inset-0 -z-10 h-screen w-full bg-radial-[ellipse_at_0%_50%] from-primary/20 via-background/0 to-background/0 to-100%" />
            <CoopBackground opacity={0.6} variant="geometric" />
            <section className="relative bg-linear-to-br from-primary/5 via-background to-accent/5 py-24 md:py-32 overflow-hidden">
                <div className="absolute inset-0  bg-grid-slate-100 mask-[linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                        <AnimateRevealEffect>
                            <Badge
                                className="mb-6 px-4 py-2 gap-2"
                                variant="secondary"
                            >
                                <Sparkles className="w-3.5 h-3.5" />
                                Serving Our Community Since 1985
                            </Badge>
                        </AnimateRevealEffect>
                        <AnimateRevealEffect delay={0.4}>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance mb-6 bg-linear-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                                Banking Built on Trust and Community
                            </h1>
                        </AnimateRevealEffect>
                        <AnimateRevealEffect delay={0.5}>
                            <p className="text-lg md:text-xl text-muted-foreground text-balance mb-8 max-w-2xl leading-relaxed">
                                Experience financial services designed with your
                                best interests at heart. Join thousands of
                                members building a stronger financial future
                                together.
                            </p>
                        </AnimateRevealEffect>
                        <AnimateRevealEffect delay={0.8}>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button className="text-base group" size="lg">
                                    Become a Member
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                                <Button
                                    asChild
                                    className="text-base bg-transparent"
                                    size="lg"
                                    variant="outline"
                                >
                                    <Link to="/about">Learn More</Link>
                                </Button>
                            </div>
                        </AnimateRevealEffect>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 md:py-20 bg-linear-to-b from-muted/30 to-background border-y">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                        {[
                            {
                                number: '15,000+',
                                label: 'Active Members',
                                color: 'text-primary',
                            },
                            {
                                number: '₱250M+',
                                label: 'Assets Under Management',
                                color: 'text-accent',
                            },
                            {
                                number: '38',
                                label: 'Years of Service',
                                color: 'text-primary',
                            },
                            {
                                number: '5',
                                label: 'Branch Locations',
                                color: 'text-accent',
                            },
                        ].map((stat, index) => (
                            <div className="text-center group" key={index}>
                                <div
                                    className={`text-3xl md:text-5xl font-bold mb-2 ${stat.color} group-hover:scale-110 transition-transform`}
                                >
                                    {stat.number}
                                </div>
                                <div className="text-sm md:text-base text-muted-foreground font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 md:py-32">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-16">
                        <Badge className="mb-4" variant="outline">
                            Why Choose Us
                        </Badge>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
                            Your Financial Partner for Life
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-balance leading-relaxed">
                            We're more than a financial institution. We're a
                            community dedicated to your financial well-being.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: Users,
                                title: 'Member Owned',
                                description:
                                    'Every member has an equal voice. Your success is our success.',
                                gradient: 'from-blue-500/10 to-blue-500/5',
                            },
                            {
                                icon: TrendingUp,
                                title: 'Competitive Rates',
                                description:
                                    'Better rates on loans and higher returns on savings accounts.',
                                gradient:
                                    'from-emerald-500/10 to-emerald-500/5',
                            },
                            {
                                icon: Shield,
                                title: 'Secure & Trusted',
                                description:
                                    'Your deposits are protected with comprehensive insurance coverage.',
                                gradient: 'from-violet-500/10 to-violet-500/5',
                            },
                            {
                                icon: Heart,
                                title: 'Community First',
                                description:
                                    'Profits returned to members through dividends and better services.',
                                gradient: 'from-rose-500/10 to-rose-500/5',
                            },
                        ].map((feature, index) => (
                            <Card
                                className="p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group border-2"
                                key={index}
                            >
                                <div
                                    className={`w-14 h-14 rounded-xl bg-linear-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                                >
                                    <feature.icon className="w-7 h-7 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section className="py-20 md:py-32 bg-linear-to-b from-muted/20 to-muted/50">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-16">
                        <Badge className="mb-4" variant="outline">
                            Our Products
                        </Badge>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
                            Financial Solutions Designed for You
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-balance leading-relaxed">
                            From savings to loans, we offer financial products
                            that help you achieve your goals.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                title: 'Savings Accounts',
                                description:
                                    'Build your wealth with competitive interest rates and flexible options.',
                                features: [
                                    'No minimum balance',
                                    'Higher dividend rates',
                                    'Free online banking',
                                ],
                                accent: 'primary',
                            },
                            {
                                title: 'Personal Loans',
                                description:
                                    'Quick approval and competitive rates for all your personal needs.',
                                features: [
                                    'Low interest rates',
                                    'Flexible terms',
                                    'Fast approval',
                                ],
                                accent: 'accent',
                            },
                            {
                                title: 'Housing Loans',
                                description:
                                    'Make your dream home a reality with affordable mortgage solutions.',
                                features: [
                                    'Competitive rates',
                                    'Extended terms',
                                    'Personalized service',
                                ],
                                accent: 'primary',
                            },
                        ].map((product, index) => (
                            <Card
                                className="p-8 bg-background hover:shadow-2xl transition-shadow group relative overflow-hidden"
                                key={index}
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-primary/5 to-transparent rounded-bl-full"></div>
                                <h3 className="text-2xl font-bold mb-4 relative">
                                    {product.title}
                                </h3>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    {product.description}
                                </p>
                                <ul className="space-y-3 mb-8">
                                    {product.features.map((feature, idx) => (
                                        <li
                                            className="flex items-start gap-3 text-sm"
                                            key={idx}
                                        >
                                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button
                                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                                    variant="outline"
                                >
                                    Learn More
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 md:py-32 bg-linear-to-br from-primary via-primary to-accent text-primary-foreground relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/10 mask-[linear-gradient(0deg,transparent,rgba(255,255,255,0.2))]" />
                <div className="container mx-auto px-4 md:px-6 text-center relative">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
                        Ready to Join Our Community?
                    </h2>
                    <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-primary-foreground/90 text-balance leading-relaxed">
                        Become a member today and experience the difference of
                        cooperative banking.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            className="text-base shadow-lg"
                            size="lg"
                            variant="secondary"
                        >
                            Apply for Membership
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                        <Button
                            asChild
                            className="text-base border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
                            size="lg"
                            variant="outline"
                        >
                            <Link to="/contact-us">Contact Us</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HomePage
