import { useState } from 'react'

import { useRouter } from '@tanstack/react-router'
import { toast } from 'sonner'

import {
    ArrowLeft,
    Check,
    CheckCircle2,
    Clock,
    Copy,
    FileCheck,
    Mail,
    Receipt,
    Sparkles,
    Wallet,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const MOCK_TRANSACTION = {
    id: 'LN-2024-00847',
    dateApplied: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }),
    amount: 25000,
    loanAccountName: 'Regular Loan',
}

const WHATS_NEXT_STEPS = [
    {
        icon: Clock,
        title: 'Application Pending',
        description:
            'Your loan application will be reviewed by our team within 1-2 business days.',
    },
    {
        icon: FileCheck,
        title: 'Document Processing',
        description:
            'An employee will process and print your loan documents for verification.',
    },
    {
        icon: CheckCircle2,
        title: 'Approval Confirmation',
        description:
            'Once verified, your loan will be officially approved by our administrators.',
    },
    {
        icon: Wallet,
        title: 'Funds Released',
        description:
            'Your approved loan amount will be released to your designated account.',
    },
]

function WhatsNextCard() {
    return (
        <Card className="border-dashed border-2 border-muted-foreground/20 bg-muted/30">
            <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground">
                        What Happens Next?
                    </h3>
                </div>

                <div className="space-y-4">
                    {WHATS_NEXT_STEPS.map((step, index) => {
                        const Icon = step.icon
                        return (
                            <div className="flex gap-3" key={index}>
                                <div className="flex flex-col items-center">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                                        <Icon className="h-4 w-4" />
                                    </div>
                                    {index < WHATS_NEXT_STEPS.length - 1 && (
                                        <div className="w-0.5 h-full bg-border mt-1" />
                                    )}
                                </div>
                                <div className="flex-1 pb-4">
                                    <p className="font-medium text-foreground text-sm">
                                        {step.title}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="flex items-center gap-2 mt-2 pt-3 border-t border-border">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">
                        You'll receive email notifications for each step of the
                        process.
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}

function TransactionCard() {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        await navigator.clipboard.writeText(MOCK_TRANSACTION.id)
        setCopied(true)
        toast.success('Transaction ID copied!')
        setTimeout(() => setCopied(false), 2000)
    }

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            maximumFractionDigits: 0,
        }).format(value)
    }

    return (
        <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Receipt className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground">
                        Loan Application
                    </h3>
                </div>

                <div className="space-y-4">
                    {/* Transaction ID */}
                    <div className="flex items-center justify-between gap-2 p-3 rounded-lg bg-background/50 border border-border">
                        <div className="min-w-0">
                            <p className="text-xs text-muted-foreground">
                                Transaction ID
                            </p>
                            <p className="font-mono text-sm font-medium text-foreground truncate">
                                {MOCK_TRANSACTION.id}
                            </p>
                        </div>
                        <Button
                            className="shrink-0 h-8 w-8 p-0"
                            onClick={handleCopy}
                            size="sm"
                            variant="ghost"
                        >
                            {copied ? (
                                <Check className="h-4 w-4 text-primary" />
                            ) : (
                                <Copy className="h-4 w-4 text-muted-foreground" />
                            )}
                        </Button>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <p className="text-xs text-muted-foreground">
                                Date Applied
                            </p>
                            <p className="text-sm font-medium text-foreground">
                                {MOCK_TRANSACTION.dateApplied}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">
                                Applied Amount
                            </p>
                            <p className="text-sm font-medium text-foreground">
                                {formatCurrency(MOCK_TRANSACTION.amount)}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">
                                Loan Account
                            </p>
                            <p className="text-sm font-medium text-foreground">
                                {MOCK_TRANSACTION.loanAccountName}
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default function LoanApplicationCompletePage() {
    const router = useRouter()

    return (
        <div className="min-h-screen bg-background py-8 sm:py-12">
            <div className="w-full max-w-2xl mx-auto px-4 sm:px-0">
                {/* Header */}
                <div className="text-center mb-6 sm:mb-8">
                    <div className="inline-flex items-center justify-center p-3 bg-primary rounded-2xl mb-4">
                        <CheckCircle2 className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                        Application Submitted!
                    </h1>
                    <p className="text-muted-foreground mt-2 text-sm sm:text-base">
                        Your loan application has been successfully submitted
                    </p>
                </div>

                <div className="space-y-6">
                    {/* Transaction Card */}
                    <TransactionCard />

                    {/* What's Next Card */}
                    <WhatsNextCard />

                    {/* Back to Dashboard Button */}
                    <Button
                        className="w-full h-14 text-base font-semibold"
                        onClick={() =>
                            router.navigate({
                                to: '/dashboard',
                            })
                        }
                        size="lg"
                    >
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Back to Dashboard
                    </Button>
                </div>
            </div>
        </div>
    )
}
