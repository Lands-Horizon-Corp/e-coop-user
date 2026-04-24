import {
    ArrowRight,
    Calendar,
    CheckCircle2,
    CreditCard,
    Facebook,
    Globe,
    Instagram,
    Lock,
    Mail,
    MapPin,
    Phone,
    Sparkles,
    Unlock,
    Youtube,
} from 'lucide-react'

import { Badge } from '@e-coop-monorepo/ui/components/ui/badge'
import { Button } from '@e-coop-monorepo/ui/components/ui/button'
import { Card, CardContent } from '@e-coop-monorepo/ui/components/ui/card'
import { Separator } from '@e-coop-monorepo/ui/components/ui/separator'

import { IOrganization } from '../organization.types'

interface OrganizationProfileProps {
    organization: IOrganization
}

const XIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
)

export const OrganizationProfile = ({
    organization,
}: OrganizationProfileProps) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
    }

    const socialLinks = [
        {
            icon: Facebook,
            href: organization.facebook_link,
            label: 'Facebook',
            color: 'hover:bg-blue-500',
        },
        {
            icon: XIcon,
            href: organization.x_link,
            label: 'X',
            color: 'hover:bg-foreground',
        },
        {
            icon: Instagram,
            href: organization.instagram_link,
            label: 'Instagram',
            color: 'hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500',
        },
        {
            icon: Youtube,
            href: organization.youtube_link,
            label: 'YouTube',
            color: 'hover:bg-red-500',
        },
        {
            icon: Globe,
            href: organization.personal_website_link,
            label: 'Website',
            color: 'hover:bg-accent',
        },
    ].filter((link) => link.href)

    const planFeatures = [
        'Unlimited team members',
        'Priority support',
        'Advanced analytics',
        'Custom integrations',
    ]

    return (
        <section className="w-full flex justify-center items-centers py-16 md:py-24 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/3 blur-3xl" />

            <div className="container px-4 md:px-6 relative">
                {/* Section header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary mb-4 animate-fade-up">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm font-medium">About Us</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground animate-fade-up delay-100">
                        Get to Know{' '}
                        <span className="text-gradient">
                            {organization.name}
                        </span>
                    </h2>
                    <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg animate-fade-up delay-200">
                        Discover our story, mission, and the values that drive
                        everything we do
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-5">
                    {/* Main Info Card */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Description Card */}
                        <Card className="border-border bg-card shadow-card overflow-hidden animate-slide-in-left delay-300">
                            <CardContent className="p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
                                        <Sparkles className="w-5 h-5 text-primary-foreground" />
                                    </div>
                                    <h3 className="font-display font-semibold text-xl text-foreground">
                                        Our Story
                                    </h3>
                                </div>
                                <p className="text-muted-foreground leading-relaxed text-lg">
                                    {organization.description}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Contact Info Card */}
                        <Card className="border-border bg-card shadow-card overflow-hidden animate-slide-in-left delay-400">
                            <CardContent className="p-8">
                                <h3 className="font-display font-semibold text-xl text-foreground mb-6">
                                    Contact Information
                                </h3>
                                <div className="grid gap-6 sm:grid-cols-2">
                                    {organization.address && (
                                        <div className="group flex items-start gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                                <MapPin className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                                                    Address
                                                </p>
                                                <p className="text-foreground font-medium">
                                                    {organization.address}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                    {organization.email && (
                                        <a
                                            className="group flex items-start gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                                            href={`mailto:${organization.email}`}
                                        >
                                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                                <Mail className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                                                    Email
                                                </p>
                                                <p className="text-foreground font-medium group-hover:text-primary transition-colors">
                                                    {organization.email}
                                                </p>
                                            </div>
                                        </a>
                                    )}
                                    {organization.contact_number && (
                                        <a
                                            className="group flex items-start gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                                            href={`tel:${organization.contact_number}`}
                                        >
                                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                                <Phone className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                                                    Phone
                                                </p>
                                                <p className="text-foreground font-medium group-hover:text-primary transition-colors">
                                                    {
                                                        organization.contact_number
                                                    }
                                                </p>
                                            </div>
                                        </a>
                                    )}
                                    <div className="group flex items-start gap-4 p-4 rounded-xl bg-muted/50">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                            {organization.is_private ? (
                                                <Lock className="w-5 h-5 text-primary" />
                                            ) : (
                                                <Unlock className="w-5 h-5 text-primary" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                                                Visibility
                                            </p>
                                            <p className="text-foreground font-medium">
                                                {organization.is_private
                                                    ? 'Private Organization'
                                                    : 'Public Organization'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Social Links */}
                        {socialLinks.length > 0 && (
                            <Card className="border-border bg-card shadow-card overflow-hidden animate-slide-in-left delay-500">
                                <CardContent className="p-8">
                                    <h3 className="font-display font-semibold text-xl text-foreground mb-6">
                                        Connect With Us
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {socialLinks.map((social, index) => (
                                            <a
                                                className={`
                          group flex items-center gap-3 px-5 py-3 rounded-xl border border-border bg-card
                          hover:border-transparent hover:text-primary-foreground transition-all duration-300
                          shadow-sm hover:shadow-card-hover hover-lift
                          ${social.color}
                        `}
                                                href={social.href}
                                                key={index}
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                <social.icon />
                                                <span className="font-medium">
                                                    {social.label}
                                                </span>
                                            </a>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar Cards */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Subscription Card */}
                        <Card className="border-border bg-card shadow-card overflow-hidden animate-slide-in-right delay-300 group">
                            {/* Gradient top bar */}
                            <div className="h-2 gradient-hero" />

                            <CardContent className="p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center shadow-glow">
                                        <CreditCard className="w-5 h-5 text-primary-foreground" />
                                    </div>
                                    <h3 className="font-display font-semibold text-xl text-foreground">
                                        Subscription
                                    </h3>
                                </div>

                                {/* Plan highlight */}
                                <div className="relative p-6 rounded-2xl gradient-hero mb-6 shadow-glow overflow-hidden">
                                    <div className="absolute inset-0 animate-shimmer" />
                                    <div className="relative">
                                        <Badge className="bg-primary-foreground/20 text-primary-foreground mb-3">
                                            Current Plan
                                        </Badge>
                                        <p className="text-3xl font-display font-bold text-primary-foreground">
                                            {
                                                organization.subscription_plan
                                                    .name
                                            }
                                        </p>
                                        <p className="text-primary-foreground/80 mt-1">
                                            {/* <span className="text-2xl font-bold">{organization.currency.symbol}{organization.subscription_plan.price}</span> */}
                                            <span className="text-sm">
                                                /month
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                {/* Features */}
                                <ul className="space-y-3 mb-6">
                                    {planFeatures.map((feature, index) => (
                                        <li
                                            className="flex items-center gap-3 text-muted-foreground"
                                            key={index}
                                        >
                                            <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Separator className="my-6" />

                                {/* Dates */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            Started
                                        </span>
                                        <span className="font-medium text-foreground">
                                            {formatDate(
                                                organization.subscription_start_date
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            Renews
                                        </span>
                                        <span className="font-medium text-foreground">
                                            {formatDate(
                                                organization.subscription_end_date
                                            )}
                                        </span>
                                    </div>
                                </div>

                                <Button className="w-full mt-6 gradient-hero text-primary-foreground hover:opacity-90 transition-opacity group">
                                    Manage Subscription
                                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Currency Card */}
                        <Card className="border-border bg-card shadow-card overflow-hidden animate-slide-in-right delay-400">
                            <CardContent className="p-8">
                                <h3 className="font-display font-semibold text-lg text-foreground mb-6">
                                    Default Currency
                                </h3>
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center text-accent-foreground text-2xl font-display font-bold shadow-accent-glow">
                                        {/* {organization.currency.symbol} */}
                                    </div>
                                    <div>
                                        <p className="font-display font-semibold text-lg text-foreground">
                                            {organization.currency?.name}
                                        </p>
                                        {/* <p className="text-muted-foreground">{organization.currency.code}</p> */}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}
