import type { UseFormReturn } from 'react-hook-form'

import { Button } from '@e-coop-monorepo/ui/core'
import { ArrowRight, CheckCircle2, PartyPopper } from 'lucide-react'

import type { IKYCRegisterRequest } from '../../kyc.types'

interface CompleteSectionProps {
    form: UseFormReturn<IKYCRegisterRequest>
    onComplete: () => void
}

export const CompleteSection = ({ onComplete }: CompleteSectionProps) => {
    return (
        <section className="space-y-8 animate-fade-in text-center py-8">
            <div className="relative">
                <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
                <div className="absolute -top-2 -right-2 left-0 flex justify-center">
                    <PartyPopper
                        className="w-8 h-8 text-primary animate-bounce"
                        style={{ animationDelay: '0.1s' }}
                    />
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                    Registration Complete!
                </h2>
                <p className="text-muted-foreground">
                    Thank you for completing your KYC registration. Your account
                    has been successfully created.
                </p>
            </div>

            <div className="bg-muted/30 rounded-xl p-6 text-left">
                <h3 className="font-medium text-foreground mb-3">
                    What's next?
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                        <span>Your account is now active and ready to use</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                        <span>
                            You can access all features from your dashboard
                        </span>
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                        <span>Update your profile anytime from settings</span>
                    </li>
                </ul>
            </div>

            <Button
                className="w-full"
                onClick={onComplete}
                size="lg"
                type="button"
            >
                Go to Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
        </section>
    )
}

export default CompleteSection
