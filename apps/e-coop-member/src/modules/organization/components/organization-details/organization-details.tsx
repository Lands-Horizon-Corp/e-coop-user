import {
    Calendar,
    CreditCard,
    Globe,
    Mail,
    MapPin,
    Sparkles,
} from 'lucide-react'

import {
    BuildingBranchIcon,
    EmailIcon,
    FacebookIcon,
    GlobeIcon,
    InstagramIcon,
    PhoneIcon,
    YoutubeIcon,
} from '@/components/icons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import TruncatedText from '@/components/ui/truncated-text'

import { formatNumber } from '../../../../helpers/number-utils'
import { IOrganization } from '../../organization.types'
import OrganizationLegalPolicies from './organization-legal-policies'

interface OrganizationDetailsProps {
    organization: IOrganization
}

const XIcon = ({ className }: { className?: string }) => (
    <svg
        className={className || 'h-4 w-4'}
        fill="currentColor"
        viewBox="0 0 24 24"
    >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
)

export const OrganizationDetails = ({
    organization,
}: OrganizationDetailsProps) => {
    const socialLinks = [
        {
            icon: FacebookIcon,
            url: organization.facebook_link,
            label: 'Facebook',
            color: 'hover:bg-blue-500',
        },
        {
            icon: XIcon,
            url: organization.x_link,
            label: 'X',
            color: 'hover:bg-neutral-900',
        },
        {
            icon: YoutubeIcon,
            url: organization.youtube_link,
            label: 'YouTube',
            color: 'hover:bg-red-500',
        },
        {
            icon: InstagramIcon,
            url: organization.instagram_link,
            label: 'Instagram',
            color: 'hover:bg-pink-500',
        },
        {
            icon: GlobeIcon,
            url: organization.personal_website_link,
            label: 'Website',
            color: 'hover:bg-primary',
        },
    ].filter((link) => link.url)

    const contactInfo = [
        { icon: MapPin, value: organization.address, label: 'Address' },
        {
            icon: EmailIcon,
            value: organization.email,
            label: 'Email',
            isLink: true,
            href: `mailto:${organization.email}`,
        },
        {
            icon: PhoneIcon,
            value: organization.contact_number,
            label: 'Phone',
            isLink: true,
            href: `tel:${organization.contact_number}`,
        },
    ].filter((item) => item.value)

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
    }

    return (
        <div className="space-y-8 py-32">
            {/* Hero Header */}
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-linear-to-br from-primary/20 to-primary/10">
                    <BuildingBranchIcon className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-2xl text-foreground">
                    Organization Profile
                </h2>
            </div>
            <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary/5 via-primary/10 to-accent/5 p-8 md:p-10">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />

                <div className="relative flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="space-y-4 max-w-2xl">
                        <div className="flex items-center gap-3 flex-wrap">
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                                {organization.name}
                            </h1>
                            {organization.is_private && (
                                <Badge
                                    className="bg-background/80 backdrop-blur-sm border border-border"
                                    variant="secondary"
                                >
                                    Private
                                </Badge>
                            )}
                        </div>

                        <TruncatedText
                            className="text-muted-foreground  overflow-y-auto max-h-52 ecoop-scroll "
                            maxLength={300}
                            text={organization.description}
                        />

                        {organization.organization_categories &&
                            organization.organization_categories.length > 0 && (
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {organization.organization_categories.map(
                                        (cat) => (
                                            <Badge
                                                className="bg-background/50 backdrop-blur-sm border-primary/20 text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                                                key={cat.id}
                                                variant="outline"
                                            >
                                                {cat.name}
                                            </Badge>
                                        )
                                    )}
                                </div>
                            )}
                    </div>

                    {/* Social Links - Floating Style */}
                    {socialLinks.length > 0 && (
                        <div className="flex items-center gap-2">
                            {socialLinks.map((social, index) => {
                                const IconComponent = social.icon
                                return (
                                    <Button
                                        asChild
                                        className={`h-11 w-11 rounded-full bg-background/80 backdrop-blur-sm border-border/50 hover:text-white hover:border-transparent transition-all duration-300 ${social.color}`}
                                        key={index}
                                        size="icon"
                                        variant="outline"
                                    >
                                        <a
                                            aria-label={social.label}
                                            href={social.url}
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            <IconComponent className="h-5 w-5" />
                                        </a>
                                    </Button>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Stats/Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Contact Card */}
                {contactInfo.length > 0 && (
                    <Card className="group relative overflow-hidden p-6 bg-card border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative space-y-5">
                            <div className="flex items-center gap-2">
                                <div className="p-2 rounded-lg bg-primary/10">
                                    <Mail className="h-4 w-4 text-primary" />
                                </div>
                                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                                    Contact
                                </h3>
                            </div>

                            <div className="space-y-4">
                                {contactInfo.map((item, index) => (
                                    <div
                                        className="flex items-start gap-3 group/item"
                                        key={index}
                                    >
                                        <div className="p-2.5 rounded-xl bg-muted/50 text-muted-foreground group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-colors duration-300">
                                            <item.icon className="h-4 w-4" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs text-muted-foreground mb-0.5">
                                                {item.label}
                                            </p>
                                            {item.isLink ? (
                                                <a
                                                    className="text-sm font-medium text-foreground hover:text-primary transition-colors truncate block"
                                                    href={item.href}
                                                >
                                                    {item.value}
                                                </a>
                                            ) : (
                                                <p className="text-sm font-medium text-foreground truncate">
                                                    {item.value}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                )}

                {/* Subscription Card */}
                <Card className="group bg-card relative overflow-hidden p-6  from-primary/5 to-primary/10 border-primary/20 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500">
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors duration-500" />

                    <div className="relative space-y-5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="p-2 rounded-lg bg-primary/20">
                                    <Sparkles className="h-4 w-4 text-primary" />
                                </div>
                                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                                    Subscription
                                </h3>
                            </div>
                            <Badge className="bg-primary text-primary-foreground border-0 shadow-lg shadow-primary/25">
                                {organization.subscription_plan?.name || 'Free'}
                            </Badge>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                                    <CreditCard className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Monthly Cost
                                    </p>
                                    <p className="text-lg font-bold text-foreground">
                                        {/* {organization.currency?.symbol} */}
                                        {formatNumber(
                                            organization.subscription_plan
                                                .monthly_price
                                        )}
                                        <span className="text-sm font-normal text-muted-foreground">
                                            /mo
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                                    <Calendar className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Valid Until
                                    </p>
                                    <p className="text-sm font-medium text-foreground">
                                        {formatDate(
                                            organization.subscription_end_date
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Quick Info Card */}
                <Card className="group relative overflow-hidden p-6 bg-card border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-linear-to-tr from-accent/10 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative space-y-5">
                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-accent/10">
                                <Globe className="h-4 w-4 text-accent-foreground" />
                            </div>
                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                                Details
                            </h3>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between py-2 border-b border-border/50">
                                <span className="text-sm text-muted-foreground">
                                    Currency
                                </span>
                                <span className="text-sm font-medium text-foreground">
                                    {organization.currency?.name} (
                                    {organization.currency?.symbol})
                                </span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <span className="text-sm text-muted-foreground">
                                    Member Since
                                </span>
                                <span className="text-sm font-medium text-foreground">
                                    {formatDate(organization.created_at)}
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
            <OrganizationLegalPolicies organization={organization} />
        </div>
    )
}
