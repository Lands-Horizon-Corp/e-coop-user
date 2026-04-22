import {
    Award,
    Building,
    Heart,
    Shield,
    Target,
    TrendingUp,
    Users,
} from 'lucide-react'

import { Particles } from '@e-coop-monorepo/ui/components/ui/background-particles'
import { Badge } from '@e-coop-monorepo/ui/components/ui/badge'
import { Card } from '@e-coop-monorepo/ui/components/ui/card'

import AnimateRevealEffect from '../components/animate-reveal-effect'
import { CoopBackground } from '../components/coop-bg'

const AboutPage = () => {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <Particles
                className="absolute inset-0"
                color="#ffffff"
                ease={80}
                quantity={100}
            />
            <div className="to-background/0 via-background/0 from-primary/50 opacity-60 top-0 absolute overflow-y-hidden -mt-36 z-10 h-screen w-full bg-radial-[ellipse_105%_100%_at_50%_10%] to-100% dark:block hidden" />

            <section className="relative bg-linear-to-br from-primary/5 via-background to-accent/5 py-20 md:py-32 overflow-hidden">
                <CoopBackground opacity={0.25} variant="geometric" />
                <div className="absolute inset-0 bg-grid-slate-100 mask-[linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <AnimateRevealEffect>
                            <Badge
                                className="mb-6 px-4 py-2"
                                variant="secondary"
                            >
                                Our Story
                            </Badge>
                        </AnimateRevealEffect>
                        <AnimateRevealEffect delay={0.5}>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance bg-linear-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                                Building Community Through Cooperation
                            </h1>
                        </AnimateRevealEffect>
                        <AnimateRevealEffect delay={0.7}>
                            <p className="text-lg md:text-xl text-muted-foreground text-balance leading-relaxed">
                                For nearly four decades, we've been dedicated to
                                improving the financial well-being of our
                                members and strengthening our community through
                                cooperative principles and exceptional service.
                            </p>
                        </AnimateRevealEffect>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 md:py-32 relative">
                <CoopBackground opacity={0.2} variant="circles" />
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <AnimateRevealEffect delay={1}>
                            <Card className="p-8 md:p-10 bg-linear-to-br from-primary/5 to-primary/10 border-2 border-primary/20 hover:shadow-xl transition-shadow">
                                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                                    <Target className="w-7 h-7 text-primary" />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                                    Our Mission
                                </h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    To provide accessible, affordable, and
                                    member-focused financial services that
                                    promote economic opportunity and financial
                                    security for all members of our community.
                                    We are committed to delivering exceptional
                                    service while maintaining the highest
                                    standards of integrity and transparency.
                                </p>
                            </Card>
                        </AnimateRevealEffect>
                        <AnimateRevealEffect delay={1.2}>
                            <Card className="p-8 md:p-10 bg-linear-to-br from-accent/5 to-accent/10 border-2 border-accent/20 hover:shadow-xl transition-shadow">
                                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                                    <Building className="w-7 h-7 text-accent" />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                                    Our Vision
                                </h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    To be the premier financial cooperative in
                                    our region, recognized for excellence in
                                    member service, innovative products, and
                                    unwavering commitment to community
                                    development. We envision a future where
                                    every member achieves their financial goals
                                    through our support and guidance.
                                </p>
                            </Card>
                        </AnimateRevealEffect>
                    </div>
                </div>
            </section>

            {/* History Timeline */}
            <section className="py-20 md:py-32 bg-linear-to-b from-muted/20 to-muted/50 relative">
                <CoopBackground opacity={0.3} variant="minimal" />
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-16">
                        <AnimateRevealEffect>
                            <Badge className="mb-4" variant="outline">
                                Our Journey
                            </Badge>
                        </AnimateRevealEffect>
                        <AnimateRevealEffect delay={0.5}>
                            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
                                From Humble Beginnings to Thriving Institution
                            </h2>
                        </AnimateRevealEffect>
                        <AnimateRevealEffect delay={0.7}>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-balance leading-relaxed">
                                A timeline of growth, innovation, and community
                                impact
                            </p>
                        </AnimateRevealEffect>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-8">
                            {[
                                {
                                    year: '1985',
                                    title: 'Foundation',
                                    description:
                                        'Established by 50 founding members with a vision to provide accessible financial services to the underserved community.',
                                },
                                {
                                    year: '1995',
                                    title: 'First Expansion',
                                    description:
                                        'Opened our second branch location and reached 2,000 members, marking a decade of steady growth and trust.',
                                },
                                {
                                    year: '2005',
                                    title: 'Digital Transformation',
                                    description:
                                        'Launched online banking services and mobile app, making banking more convenient for our members.',
                                },
                                {
                                    year: '2015',
                                    title: 'Major Milestone',
                                    description:
                                        'Celebrated 30 years of service with over 10,000 members and ₱150M in assets under management.',
                                },
                                {
                                    year: '2023',
                                    title: 'Present Day',
                                    description:
                                        'Now serving 15,000+ members across 5 branches with ₱250M+ in assets, while maintaining our community-first values.',
                                },
                            ].map((milestone, index) => (
                                <AnimateRevealEffect delay={0.9}>
                                    <div
                                        className="flex gap-6 group"
                                        key={index}
                                    >
                                        <div className="flex flex-col items-center">
                                            <div className="w-14 h-14 rounded-full bg-linear-to-br from-primary to-accent text-primary-foreground flex items-center justify-center font-bold shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                                                {milestone.year.slice(-2)}
                                            </div>
                                            {index < 4 && (
                                                <div className="w-0.5 h-full bg-linear-to-b from-primary to-accent/50 mt-2"></div>
                                            )}
                                        </div>
                                        <Card className="p-6 flex-1 mb-8 group-hover:shadow-xl group-hover:-translate-y-1 transition-all bg-background">
                                            <div className="text-sm text-primary font-bold mb-2">
                                                {milestone.year}
                                            </div>
                                            <h3 className="text-xl font-bold mb-3">
                                                {milestone.title}
                                            </h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {milestone.description}
                                            </p>
                                        </Card>
                                    </div>
                                </AnimateRevealEffect>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20 md:py-32 relative">
                <CoopBackground opacity={0.15} variant="hexagons" />
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-16">
                        <Badge className="mb-4" variant="outline">
                            Core Values
                        </Badge>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
                            The Principles That Guide Us
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-balance leading-relaxed">
                            These values are the foundation of everything we do
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {[
                            {
                                icon: Users,
                                title: 'Member-Centric',
                                description:
                                    'Our members are at the heart of every decision. Your financial success is our primary goal.',
                                gradient: 'from-blue-500/10 to-blue-500/5',
                            },
                            {
                                icon: Shield,
                                title: 'Integrity',
                                description:
                                    'We operate with the highest ethical standards, ensuring transparency and accountability in all our dealings.',
                                gradient: 'from-violet-500/10 to-violet-500/5',
                            },
                            {
                                icon: Award,
                                title: 'Excellence',
                                description:
                                    'We strive for excellence in service delivery, continuously improving to meet and exceed expectations.',
                                gradient: 'from-amber-500/10 to-amber-500/5',
                            },
                            {
                                icon: Heart,
                                title: 'Community',
                                description:
                                    "We invest in our community's growth and development, supporting local initiatives and causes.",
                                gradient: 'from-rose-500/10 to-rose-500/5',
                            },
                            {
                                icon: TrendingUp,
                                title: 'Innovation',
                                description:
                                    'We embrace technology and innovation to provide modern, convenient financial solutions.',
                                gradient:
                                    'from-emerald-500/10 to-emerald-500/5',
                            },
                            {
                                icon: Building,
                                title: 'Sustainability',
                                description:
                                    "We're committed to long-term sustainability, ensuring our cooperative serves generations to come.",
                                gradient: 'from-cyan-500/10 to-cyan-500/5',
                            },
                        ].map((value, index) => (
                            <Card
                                className="p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all group"
                                key={index}
                            >
                                <div
                                    className={`w-16 h-16 rounded-2xl bg-linear-to-br ${value.gradient} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                                >
                                    <value.icon className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {value.description}
                                </p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Leadership Section */}
            <section className="py-20 md:py-32 bg-linear-to-b from-muted/20 to-muted/50 relative">
                <CoopBackground opacity={0.25} variant="network" />
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-16">
                        <Badge className="mb-4" variant="outline">
                            Leadership
                        </Badge>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
                            Meet Our Leadership Team
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-balance leading-relaxed">
                            Experienced professionals dedicated to your
                            financial success
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                name: 'Maria Santos',
                                position: 'Chief Executive Officer',
                                bio: '25+ years of experience in cooperative banking and community development.',
                            },
                            {
                                name: 'James Rodriguez',
                                position: 'Chief Financial Officer',
                                bio: 'Expert in financial management with a proven track record in sustainable growth.',
                            },
                            {
                                name: 'Sarah Johnson',
                                position: 'Chief Operations Officer',
                                bio: 'Specializes in operational excellence and member experience optimization.',
                            },
                        ].map((leader, index) => (
                            <Card
                                className="p-6 text-center bg-background hover:shadow-xl transition-shadow group"
                                key={index}
                            >
                                <div className="w-24 h-24 rounded-full bg-linear-to-br from-primary via-accent to-primary mx-auto mb-4 group-hover:scale-105 transition-transform"></div>
                                <h3 className="text-xl font-bold mb-1">
                                    {leader.name}
                                </h3>
                                <div className="text-sm text-primary font-medium mb-3">
                                    {leader.position}
                                </div>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {leader.bio}
                                </p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AboutPage
