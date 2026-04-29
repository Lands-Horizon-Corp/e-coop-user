import { Button } from '@e-coop-monorepo/ui/core'
import { ArrowRight, Ban, Lock, Scale, Shield, Users } from 'lucide-react'

interface BenefitItemProps {
    icon: React.ReactNode
    title: string
    description: string
    index: number
}

const BenefitItem = ({ icon, title, description, index }: BenefitItemProps) => (
    <div
        className="flex gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors duration-300 animate-slide-up"
        style={{ animationDelay: `${index * 100}ms` }}
    >
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            {icon}
        </div>
        <div className="flex-1 min-w-0">
            <h3 className="font-heading font-semibold text-foreground mb-1">
                {title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
            </p>
        </div>
    </div>
)

interface KycInfoStepProps {
    onNext?: () => void
}

const KYCStartSection = ({ onNext }: KycInfoStepProps) => {
    const benefits = [
        {
            icon: <Shield className="w-5 h-5" />,
            title: 'Ensure Security',
            description:
                'Protect your account and personal information from fraud or unauthorized access.',
        },
        {
            icon: <Scale className="w-5 h-5" />,
            title: 'Comply with Regulations',
            description:
                'Meet legal and regulatory requirements that govern cooperatives and financial institutions.',
        },
        {
            icon: <Users className="w-5 h-5" />,
            title: 'Build Trust',
            description:
                'Maintain a trustworthy and transparent cooperative community for all members.',
        },
        {
            icon: <Ban className="w-5 h-5" />,
            title: 'Prevent Misuse',
            description:
                'Avoid illegal activities such as money laundering or financing of unlawful operations.',
        },
    ]

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-2xl border-border/50 animate-fade-in">
                <div className="">
                    {/* Header Section */}
                    <div className="text-center mb-8 animate-slide-up">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                            <Lock className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-3">
                            Why KYC is Required
                        </h1>
                        <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
                            At our cooperative, we are committed to providing a
                            safe, secure, and transparent environment for all
                            our members.{' '}
                            <span className="font-semibold text-foreground">
                                KYC (Know Your Customer)
                            </span>{' '}
                            is an important process that helps us verify your
                            identity when you register as a member.
                        </p>
                    </div>

                    {/* Benefits Section */}
                    <div className="mb-8">
                        <p className="text-sm font-medium text-muted-foreground mb-4 text-center sm:text-left">
                            By completing KYC, we can:
                        </p>
                        <div className="space-y-3">
                            {benefits.map((benefit, index) => (
                                <BenefitItem
                                    description={benefit.description}
                                    icon={benefit.icon}
                                    index={index}
                                    key={benefit.title}
                                    title={benefit.title}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Confidentiality Notice */}
                    <div
                        className="bg-accent/50 border border-border rounded-lg p-4 mb-8 animate-slide-up"
                        style={{ animationDelay: '400ms' }}
                    >
                        <div className="flex gap-3">
                            <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Your information will be handled with the{' '}
                                <span className="font-semibold text-foreground">
                                    highest standards of confidentiality
                                </span>{' '}
                                and used only for the purposes of verifying your
                                membership.
                            </p>
                        </div>
                    </div>

                    {/* Footer Message */}
                    <p
                        className="text-center text-sm text-muted-foreground mb-6 animate-slide-up"
                        style={{ animationDelay: '500ms' }}
                    >
                        Completing KYC helps us serve you better while keeping
                        our cooperative safe and compliant.
                    </p>

                    {/* Continue Button */}
                    <div
                        className="animate-slide-up"
                        style={{ animationDelay: '600ms' }}
                    >
                        <Button
                            className="w-full h-12 text-base font-medium shadow-md hover:shadow-glow transition-all duration-300"
                            onClick={onNext}
                            size="lg"
                            type="button"
                        >
                            Continue to KYC
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default KYCStartSection
