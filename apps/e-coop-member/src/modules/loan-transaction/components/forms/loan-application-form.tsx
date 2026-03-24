import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'

import { CurrencyInput } from '@/modules/currency'
import {
    Banknote,
    Building2,
    Calendar,
    Check,
    CheckCircle2,
    Clock,
    CreditCard,
    FileCheck,
    Mail,
    MapPin,
    Percent,
    Send,
    Sparkles,
    Wallet,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import FormFieldWrapper from '@/components/ui/form-field-wrapper'
import { Input } from '@/components/ui/input'

import { cn } from '@/lib/utils'

import {
    COLLECTOR_TYPES,
    CollectorType,
    LOAN_ACCOUNTS,
    LOAN_CONFIG,
} from '../../loan-transaction.constants'
import LoanPaymentSchedule from './loan-schedule-view'

interface LoanAccountCardProps {
    name: string
    description: string
    interestRate: number
    isSelected: boolean
    onClick: () => void
}

function LoanAccountCard({
    name,
    description,
    interestRate,
    isSelected,
    onClick,
}: LoanAccountCardProps) {
    return (
        <button
            className={cn(
                'w-full text-left p-4 rounded-lg border-2 transition-all duration-200',
                'hover:shadow-md hover:border-primary/50',
                isSelected
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-border bg-card hover:bg-secondary/50'
            )}
            onClick={onClick}
            type="button"
        >
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                    <div
                        className={cn(
                            'p-2 rounded-lg transition-colors',
                            isSelected ? 'bg-primary' : 'bg-secondary'
                        )}
                    >
                        <CreditCard
                            className={cn(
                                'h-5 w-5',
                                isSelected
                                    ? 'text-primary-foreground'
                                    : 'text-muted-foreground'
                            )}
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground">
                            {name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {description}
                        </p>
                        <div className="flex items-center gap-1.5 mt-2">
                            <Percent className="h-3.5 w-3.5 text-primary" />
                            <span className="text-xs font-medium text-primary">
                                {interestRate}% monthly interest
                            </span>
                        </div>
                    </div>
                </div>
                {isSelected && (
                    <div className="bg-primary p-1 rounded-full">
                        <Check className="h-4 w-4 text-primary-foreground" />
                    </div>
                )}
            </div>
        </button>
    )
}

interface TermBadgeProps {
    months: number
    isSelected: boolean
    onClick: () => void
}

function TermBadge({ months, isSelected, onClick }: TermBadgeProps) {
    return (
        <button
            className={cn(
                'px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200',
                'border hover:shadow-sm',
                isSelected
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-secondary text-secondary-foreground border-border hover:border-primary/50 hover:bg-primary/5'
            )}
            onClick={onClick}
            type="button"
        >
            {months} {months === 1 ? 'month' : 'months'}
        </button>
    )
}

interface CollectorToggleProps {
    value: CollectorType
    onChange: (value: CollectorType) => void
}

const collectorIcons = {
    field: MapPin,
    office: Building2,
}

function CollectorToggle({ value, onChange }: CollectorToggleProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {COLLECTOR_TYPES.map((type) => {
                const Icon = collectorIcons[type.id]
                const isSelected = value === type.id

                return (
                    <button
                        className={cn(
                            'p-4 rounded-lg border-2 transition-all duration-200 text-left',
                            'hover:shadow-md',
                            isSelected
                                ? 'border-primary bg-primary/5'
                                : 'border-border bg-card hover:border-primary/50'
                        )}
                        key={type.id}
                        onClick={() => onChange(type.id)}
                        type="button"
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className={cn(
                                    'p-2 rounded-lg transition-colors',
                                    isSelected ? 'bg-primary' : 'bg-secondary'
                                )}
                            >
                                <Icon
                                    className={cn(
                                        'h-5 w-5',
                                        isSelected
                                            ? 'text-primary-foreground'
                                            : 'text-muted-foreground'
                                    )}
                                />
                            </div>
                            <div>
                                <p className="font-medium text-foreground">
                                    {type.label}
                                </p>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    {type.description}
                                </p>
                            </div>
                        </div>
                    </button>
                )
            })}
        </div>
    )
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

const loanFormSchema = z.object({
    loanAccountId: z.string().min(1, 'Please select a loan account'),
    amount: z.coerce
        .number<number>({
            error: 'Please enter a valid number',
        })
        .min(
            LOAN_CONFIG.MIN_AMOUNT,
            `Minimum amount is ₱${LOAN_CONFIG.MIN_AMOUNT.toLocaleString()}`
        )
        .max(
            LOAN_CONFIG.MAX_AMOUNT,
            `Maximum amount is ₱${LOAN_CONFIG.MAX_AMOUNT.toLocaleString()}`
        ),
    term: z.coerce
        .number<number>({
            error: 'Please select a valid term',
        })
        .min(1, 'Term must be at least 1 month')
        .max(60, 'Term cannot exceed 60 months'),
    collectorType: z.enum(
        ['field', 'office'] as const,
        'Please select a collection method'
    ),
})

type LoanFormData = z.infer<typeof loanFormSchema>

interface LoanApplicationFormProps {
    onSuccess?: (data: LoanFormData) => void
}

export function LoanApplicationForm({ onSuccess }: LoanApplicationFormProps) {
    const form = useForm<LoanFormData>({
        resolver: zodResolver(loanFormSchema),
        defaultValues: {
            loanAccountId: '',
            amount: undefined,
            term: LOAN_CONFIG.DEFAULT_TERM,
            collectorType: 'office',
        },
    })

    const selectedAccountId = form.watch('loanAccountId')
    const selectedAccount = LOAN_ACCOUNTS.find(
        (acc) => acc.id === selectedAccountId
    )
    const currentTerm = form.watch('term')

    const onSubmit = (data: LoanFormData) => {
        toast.success('Application Submitted!', {
            description: `Your loan application for ₱${data.amount.toLocaleString()} has been submitted successfully.`,
        })
        onSuccess?.(data)
    }

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            maximumFractionDigits: 0,
        }).format(value)
    }

    return (
        <div className="w-full max-w-2xl mx-auto px-4 sm:px-0">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
                <div className="inline-flex items-center justify-center p-3 bg-primary rounded-2xl mb-4">
                    <Banknote className="h-8 w-8 text-primary-foreground" />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                    Loan Application
                </h1>
                <p className="text-muted-foreground mt-2 text-sm sm:text-base">
                    Apply for a loan in just a few simple steps
                </p>
            </div>

            <Form {...form}>
                <form
                    className="space-y-6 sm:space-y-8"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    {/* Step 1: Loan Account Selection */}
                    <FormField
                        control={form.control}
                        name="loanAccountId"
                        render={({ field }) => (
                            <FormItem className="space-y-3 sm:space-y-4">
                                <FormLabel className="text-sm sm:text-base font-semibold flex items-center gap-2">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-xs text-primary-foreground font-bold">
                                        1
                                    </span>
                                    Select Loan Type
                                </FormLabel>
                                <FormControl>
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        {LOAN_ACCOUNTS.map((account) => (
                                            <LoanAccountCard
                                                description={
                                                    account.description
                                                }
                                                interestRate={
                                                    account.interestRate
                                                }
                                                isSelected={
                                                    field.value === account.id
                                                }
                                                key={account.id}
                                                name={account.name}
                                                onClick={() =>
                                                    field.onChange(account.id)
                                                }
                                            />
                                        ))}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Selected Account Summary */}
                    {selectedAccount && (
                        <Card className="border-primary/20 bg-primary/5">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Sparkles className="h-4 w-4 text-primary" />
                                    <span className="text-sm font-medium text-primary">
                                        Selected Account
                                    </span>
                                </div>
                                <h3 className="font-semibold text-foreground">
                                    {selectedAccount.name}
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {selectedAccount.description}
                                </p>
                            </CardContent>
                        </Card>
                    )}

                    {/* Step 2: Loan Amount */}
                    <FormFieldWrapper
                        control={form.control}
                        name="amount"
                        render={({ field: { onChange, ...field } }) => (
                            <FormItem className="space-y-3">
                                <FormLabel className="text-sm sm:text-base font-semibold flex items-center gap-2">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-xs text-primary-foreground font-bold">
                                        2
                                    </span>
                                    Loan Amount
                                </FormLabel>

                                <FormControl>
                                    <div className="relative">
                                        <CurrencyInput
                                            {...field}
                                            onValueChange={(newValue = '') => {
                                                onChange(newValue)
                                            }}
                                            placeholder="0.00"
                                        />
                                    </div>
                                </FormControl>
                                <div className="flex flex-wrap items-center gap-2">
                                    <button
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                                        onClick={() =>
                                            form.setValue(
                                                'amount',
                                                LOAN_CONFIG.SUGGESTED_AMOUNT
                                            )
                                        }
                                        type="button"
                                    >
                                        <Sparkles className="h-3 w-3" />
                                        Suggested:{' '}
                                        {formatCurrency(
                                            LOAN_CONFIG.SUGGESTED_AMOUNT
                                        )}
                                    </button>
                                    <span className="text-xs text-muted-foreground">
                                        Min:{' '}
                                        {formatCurrency(LOAN_CONFIG.MIN_AMOUNT)}{' '}
                                        • Max:{' '}
                                        {formatCurrency(LOAN_CONFIG.MAX_AMOUNT)}
                                    </span>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Step 3: Loan Term */}
                    <FormField
                        control={form.control}
                        name="term"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel className="text-sm sm:text-base font-semibold flex items-center gap-2">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-xs text-primary-foreground font-bold">
                                        3
                                    </span>
                                    Loan Term
                                </FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            className="pl-10 h-12"
                                            placeholder="Enter months"
                                            type="number"
                                            {...field}
                                            onChange={(e) =>
                                                field.onChange(
                                                    e.target.value
                                                        ? Number(e.target.value)
                                                        : undefined
                                                )
                                            }
                                            value={field.value ?? ''}
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                                            months
                                        </span>
                                    </div>
                                </FormControl>
                                <div className="flex flex-wrap gap-2">
                                    {LOAN_CONFIG.TERM_OPTIONS.map((months) => (
                                        <TermBadge
                                            isSelected={currentTerm === months}
                                            key={months}
                                            months={months}
                                            onClick={() =>
                                                form.setValue('term', months)
                                            }
                                        />
                                    ))}
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Step 4: Collector Type */}
                    <FormField
                        control={form.control}
                        name="collectorType"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel className="text-sm sm:text-base font-semibold flex items-center gap-2">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-xs text-primary-foreground font-bold">
                                        4
                                    </span>
                                    Collection Method
                                </FormLabel>
                                <FormControl>
                                    <CollectorToggle
                                        onChange={field.onChange}
                                        value={field.value}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <LoanPaymentSchedule
                        schedule={[
                            {
                                paymentDate: '2024-02-01',
                                accounts: [
                                    { name: 'Loan Account', amount: 833.33 },
                                    { name: 'Interest Account', amount: 150.0 },
                                ],
                            },
                            {
                                paymentDate: '2024-03-01',
                                accounts: [
                                    { name: 'Loan Account', amount: 833.33 },
                                    {
                                        name: 'Interest Account',
                                        amount: 143.75,
                                    },
                                ],
                            },
                            {
                                paymentDate: '2024-04-01',
                                accounts: [
                                    { name: 'Loan Account', amount: 833.33 },
                                    { name: 'Interest Account', amount: 137.5 },
                                ],
                            },
                            {
                                paymentDate: '2024-05-01',
                                accounts: [
                                    { name: 'Loan Account', amount: 833.33 },
                                    {
                                        name: 'Interest Account',
                                        amount: 131.25,
                                    },
                                ],
                            },
                            {
                                paymentDate: '2024-06-01',
                                accounts: [
                                    { name: 'Loan Account', amount: 833.33 },
                                    { name: 'Interest Account', amount: 125.0 },
                                ],
                            },
                            {
                                paymentDate: '2024-07-01',
                                accounts: [
                                    { name: 'Loan Account', amount: 833.33 },
                                    {
                                        name: 'Interest Account',
                                        amount: 118.75,
                                    },
                                ],
                            },
                            {
                                paymentDate: '2024-08-01',
                                accounts: [
                                    { name: 'Loan Account', amount: 833.33 },
                                    { name: 'Interest Account', amount: 112.5 },
                                ],
                            },
                            {
                                paymentDate: '2024-09-01',
                                accounts: [
                                    { name: 'Loan Account', amount: 833.33 },
                                    {
                                        name: 'Interest Account',
                                        amount: 106.25,
                                    },
                                ],
                            },
                            {
                                paymentDate: '2024-10-01',
                                accounts: [
                                    { name: 'Loan Account', amount: 833.33 },
                                    { name: 'Interest Account', amount: 100.0 },
                                ],
                            },
                            {
                                paymentDate: '2024-11-01',
                                accounts: [
                                    { name: 'Loan Account', amount: 833.33 },
                                    { name: 'Interest Account', amount: 93.75 },
                                ],
                            },
                            {
                                paymentDate: '2024-12-01',
                                accounts: [
                                    { name: 'Loan Account', amount: 833.33 },
                                    { name: 'Interest Account', amount: 87.5 },
                                ],
                            },
                            {
                                paymentDate: '2025-01-01',
                                accounts: [
                                    { name: 'Loan Account', amount: 833.37 },
                                    { name: 'Interest Account', amount: 81.25 },
                                ],
                            },
                        ]}
                    />

                    {/* What's Next Section */}
                    <WhatsNextCard />

                    {/* Submit Button */}
                    <Button
                        className="w-full h-12 sm:h-14 text-base font-semibold"
                        size="lg"
                        type="submit"
                    >
                        <Send className="mr-2 h-5 w-5" />
                        Submit Application
                    </Button>
                </form>
            </Form>
        </div>
    )
}
