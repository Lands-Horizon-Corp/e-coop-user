'use client'

import type React from 'react'
import { useState } from 'react'

import { FlickeringGrid } from '@ecoop/ui/core'
import { Particles } from '@ecoop/ui/core'
import { Button } from '@ecoop/ui/core'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@ecoop/ui/core'
import { Input } from '@ecoop/ui/core'
import { Label } from '@ecoop/ui/core'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@ecoop/ui/core'
import {
    Calendar,
    DollarSign,
    FileText,
    Percent,
    TrendingUp,
} from 'lucide-react'

import { CoopBackground } from '../components/coop-bg'

const LOAN_TYPES = {
    emergency: {
        name: 'Emergency Loan',
        interestRate: 8.5,
        maxAmount: 50000,
        serviceFeePercentage: 2.0,
    },
    educational: {
        name: 'Educational Loan',
        interestRate: 6.5,
        maxAmount: 100000,
        serviceFeePercentage: 1.5,
    },
}

export default function LoanCalculator() {
    const [loanType, setLoanType] = useState<'emergency' | 'educational'>(
        'emergency'
    )
    const [amount, setAmount] = useState<string>('10000')
    const [months, setMonths] = useState<string>('12')
    const [showSummary, setShowSummary] = useState(false)

    const loanData = LOAN_TYPES[loanType]
    const principal = Number.parseFloat(amount) || 0
    const serviceFee = (principal * loanData.serviceFeePercentage) / 100
    const principalWithFee = principal + serviceFee
    const monthlyRate = loanData.interestRate / 100 / 12
    const numberOfPayments = Number.parseInt(months) || 0

    const monthlyPayment =
        numberOfPayments > 0
            ? (principalWithFee *
                  (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
              (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
            : 0

    const totalPayment = monthlyPayment * numberOfPayments
    const totalInterest = totalPayment - principalWithFee

    const isValidInput =
        principal > 0 && numberOfPayments > 0 && principal <= loanData.maxAmount

    const handleCalculate = () => {
        if (isValidInput) {
            setShowSummary(true)
        }
    }

    const handleReset = () => {
        setLoanType('emergency')
        setAmount('10000')
        setMonths('12')
        setShowSummary(false)
    }

    const generateAmortizationSchedule = () => {
        const schedule = []
        let balance = principalWithFee

        for (let i = 1; i <= numberOfPayments; i++) {
            const interestPayment = balance * monthlyRate
            const principalPayment = monthlyPayment - interestPayment
            balance -= principalPayment

            schedule.push({
                month: i,
                payment: monthlyPayment,
                principal: Math.max(0, principalPayment),
                interest: interestPayment,
                balance: Math.max(0, balance),
            })
        }

        return schedule
    }

    const amortizationSchedule = showSummary
        ? generateAmortizationSchedule()
        : []

    const todayDate = new Date().toLocaleDateString('en-PH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    return (
        <div className="flex items-center justify-center ">
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
            <section className="relative bg-linear-to-br from-primary/5 via-background to-accent/5 md:py-32 overflow-hidden"></section>
            <main className="z-10 mt-24 rounded min-h-screen to-secondary/5 p-4 sm:p-6 lg:p-8">
                <div className="mx-auto max-w-6xl">
                    {/* Header */}
                    <div className="mb-8 text-center">
                        <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            Cooperative Loan Calculator
                        </h1>
                        <p className="mt-2 text-muted-foreground">
                            Quickly calculate your loan payments and understand
                            your financial commitment
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3 bg-background p-6 rounded-lg shadow-lg">
                        {/* Calculator Form */}
                        <Card className="border-border/50 shadow-lg lg:col-span-1">
                            <CardHeader>
                                <CardTitle className="text-foreground">
                                    Calculate Your Loan
                                </CardTitle>
                                <CardDescription>
                                    Fill in your loan details below
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Loan Type Selection */}
                                <div className="space-y-2">
                                    <Label
                                        className="text-foreground font-medium"
                                        htmlFor="loan-type"
                                    >
                                        Loan Type
                                    </Label>
                                    <Select
                                        onValueChange={(value) =>
                                            setLoanType(
                                                value as
                                                    | 'emergency'
                                                    | 'educational'
                                            )
                                        }
                                        value={loanType}
                                    >
                                        <SelectTrigger
                                            className="bg-card border-input"
                                            id="loan-type"
                                        >
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-card border-border">
                                            <SelectItem value="emergency">
                                                Emergency Loan (8.5% APR)
                                            </SelectItem>
                                            <SelectItem value="educational">
                                                Educational Loan (6.5% APR)
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <p className="text-xs text-muted-foreground">
                                        Maximum amount: ₱
                                        {loanData.maxAmount.toLocaleString()}
                                    </p>
                                </div>

                                {/* Loan Amount */}
                                <div className="space-y-2">
                                    <Label
                                        className="text-foreground font-medium"
                                        htmlFor="amount"
                                    >
                                        Loan Amount
                                    </Label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            className="pl-10 bg-card border-input"
                                            id="amount"
                                            max={loanData.maxAmount}
                                            min="1000"
                                            onChange={(e) =>
                                                setAmount(e.target.value)
                                            }
                                            placeholder="Enter loan amount"
                                            type="number"
                                            value={amount}
                                        />
                                    </div>
                                    {principal > loanData.maxAmount && (
                                        <p className="text-xs text-destructive">
                                            Amount exceeds maximum limit
                                        </p>
                                    )}
                                </div>

                                {/* Loan Duration */}
                                <div className="space-y-2">
                                    <Label
                                        className="text-foreground font-medium"
                                        htmlFor="months"
                                    >
                                        Loan Duration (Months)
                                    </Label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            className="pl-10 bg-card border-input"
                                            id="months"
                                            max="360"
                                            min="1"
                                            onChange={(e) =>
                                                setMonths(e.target.value)
                                            }
                                            placeholder="Enter number of months"
                                            type="number"
                                            value={months}
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Recommended: 6 - 60 months
                                    </p>
                                </div>

                                {/* Interest Rate Display */}
                                <div className="rounded-lg bg-secondary/10 p-4">
                                    <div className="flex items-center gap-2">
                                        <Percent className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">
                                            Interest Rate (APR)
                                        </span>
                                        <span className="ml-auto font-semibold text-foreground">
                                            {loanData.interestRate}%
                                        </span>
                                    </div>
                                </div>

                                {/* Calculate Button */}
                                <div className="flex gap-3 pt-4">
                                    <Button
                                        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                                        disabled={!isValidInput}
                                        onClick={handleCalculate}
                                    >
                                        Calculate Loan
                                    </Button>
                                    <Button
                                        className="border-border text-foreground hover:bg-secondary bg-transparent"
                                        onClick={handleReset}
                                        variant="outline"
                                    >
                                        Reset
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Summary Cards */}
                        <div className="lg:col-span-2 space-y-6">
                            {showSummary && (
                                <>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-lg font-semibold text-foreground">
                                                Loan Summary
                                            </h2>
                                            <p className="text-sm text-muted-foreground">
                                                Generated on {todayDate}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <FileText className="h-5 w-5 text-muted-foreground inline" />
                                        </div>
                                    </div>

                                    {/* Summary Card */}
                                    <Card className="border-border/50 shadow-lg">
                                        <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent pb-4">
                                            <CardTitle className="text-foreground">
                                                {loanData.name}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="pt-6">
                                            <div className="grid grid-cols-2 gap-4">
                                                <SummaryBox
                                                    icon={
                                                        <DollarSign className="h-4 w-4" />
                                                    }
                                                    label="Principal Amount"
                                                    value={`₱${principal.toLocaleString('en-US', { maximumFractionDigits: 2 })}`}
                                                />
                                                <SummaryBox
                                                    icon={
                                                        <Percent className="h-4 w-4" />
                                                    }
                                                    label="Service Fee"
                                                    value={`₱${serviceFee.toLocaleString('en-US', { maximumFractionDigits: 2 })}`}
                                                />
                                                <SummaryBox
                                                    highlighted
                                                    icon={
                                                        <TrendingUp className="h-4 w-4" />
                                                    }
                                                    label="Total Loan Amount"
                                                    value={`₱${principalWithFee.toLocaleString('en-US', { maximumFractionDigits: 2 })}`}
                                                />
                                                <SummaryBox
                                                    icon={
                                                        <Percent className="h-4 w-4" />
                                                    }
                                                    label="Interest Rate"
                                                    value={`${loanData.interestRate}% APR`}
                                                />
                                                <SummaryBox
                                                    icon={
                                                        <Calendar className="h-4 w-4" />
                                                    }
                                                    label="Loan Duration"
                                                    value={`${numberOfPayments} months`}
                                                />
                                                <SummaryBox
                                                    highlighted
                                                    icon={
                                                        <DollarSign className="h-4 w-4" />
                                                    }
                                                    label="Monthly Payment"
                                                    value={`₱${monthlyPayment.toLocaleString('en-US', { maximumFractionDigits: 2 })}`}
                                                />
                                            </div>

                                            <div className="border-t border-border mt-6 pt-6">
                                                <div className="grid grid-cols-3 gap-4">
                                                    <div className="rounded-lg bg-primary/10 p-4">
                                                        <p className="text-xs text-muted-foreground mb-1">
                                                            Total Interest
                                                        </p>
                                                        <p className="text-lg font-bold text-primary">
                                                            ₱
                                                            {totalInterest.toLocaleString(
                                                                'en-US',
                                                                {
                                                                    maximumFractionDigits: 2,
                                                                }
                                                            )}
                                                        </p>
                                                    </div>
                                                    <div className="rounded-lg bg-secondary/10 p-4">
                                                        <p className="text-xs text-muted-foreground mb-1">
                                                            Total Service Fee
                                                        </p>
                                                        <p className="text-lg font-bold text-secondary-foreground">
                                                            ₱
                                                            {serviceFee.toLocaleString(
                                                                'en-US',
                                                                {
                                                                    maximumFractionDigits: 2,
                                                                }
                                                            )}
                                                        </p>
                                                    </div>
                                                    <div className="rounded-lg bg-accent/10 p-4">
                                                        <p className="text-xs text-muted-foreground mb-1">
                                                            Total Payment
                                                        </p>
                                                        <p className="text-lg font-bold text-accent">
                                                            ₱
                                                            {totalPayment.toLocaleString(
                                                                'en-US',
                                                                {
                                                                    maximumFractionDigits: 2,
                                                                }
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-border/50 shadow-lg">
                                        <CardHeader>
                                            <CardTitle className="text-foreground text-base">
                                                Payment Schedule
                                            </CardTitle>
                                            <CardDescription>
                                                Monthly breakdown of your loan
                                                payments
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="rounded-lg border border-border overflow-hidden">
                                                <div className="overflow-x-auto">
                                                    <table className="w-full text-sm">
                                                        <thead>
                                                            <tr className="bg-secondary/10 border-b border-border">
                                                                <th className="px-4 py-3 text-left font-semibold text-foreground">
                                                                    Month
                                                                </th>
                                                                <th className="px-4 py-3 text-right font-semibold text-foreground">
                                                                    Payment
                                                                </th>
                                                                <th className="px-4 py-3 text-right font-semibold text-foreground">
                                                                    Principal
                                                                </th>
                                                                <th className="px-4 py-3 text-right font-semibold text-foreground">
                                                                    Interest
                                                                </th>
                                                                <th className="px-4 py-3 text-right font-semibold text-foreground">
                                                                    Balance
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {amortizationSchedule.map(
                                                                (
                                                                    row,
                                                                    index
                                                                ) => (
                                                                    <tr
                                                                        className={`border-b border-border ${
                                                                            index %
                                                                                2 ===
                                                                            0
                                                                                ? 'bg-card'
                                                                                : 'bg-muted/5'
                                                                        } hover:bg-secondary/5 transition-colors`}
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        <td className="px-4 py-2 text-foreground font-medium">
                                                                            {
                                                                                row.month
                                                                            }
                                                                        </td>
                                                                        <td className="px-4 py-2 text-right text-foreground">
                                                                            ₱
                                                                            {row.payment.toLocaleString(
                                                                                'en-US',
                                                                                {
                                                                                    maximumFractionDigits: 2,
                                                                                }
                                                                            )}
                                                                        </td>
                                                                        <td className="px-4 py-2 text-right text-primary font-medium">
                                                                            ₱
                                                                            {row.principal.toLocaleString(
                                                                                'en-US',
                                                                                {
                                                                                    maximumFractionDigits: 2,
                                                                                }
                                                                            )}
                                                                        </td>
                                                                        <td className="px-4 py-2 text-right text-primary/80">
                                                                            ₱
                                                                            {row.interest.toLocaleString(
                                                                                'en-US',
                                                                                {
                                                                                    maximumFractionDigits: 2,
                                                                                }
                                                                            )}
                                                                        </td>
                                                                        <td className="px-4 py-2 text-right text-secondary-foreground font-medium">
                                                                            ₱
                                                                            {row.balance.toLocaleString(
                                                                                'en-US',
                                                                                {
                                                                                    maximumFractionDigits: 2,
                                                                                }
                                                                            )}
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-4">
                                                This calculation is an estimate
                                                based on the provided
                                                information. Actual payments may
                                                vary based on terms and
                                                conditions set by your
                                                cooperative.
                                            </p>
                                        </CardContent>
                                    </Card>
                                </>
                            )}

                            {!showSummary && (
                                <Card className="border-border/50 shadow-lg h-full flex items-center">
                                    <CardContent className="flex flex-col items-center justify-center space-y-4 py-12 text-center w-full">
                                        <FileText className="h-12 w-12 text-muted-foreground" />
                                        <div>
                                            <p className="font-semibold text-foreground">
                                                Ready to Calculate?
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Fill in your loan details and
                                                click "Calculate Loan" to see
                                                your complete payment schedule
                                                and summary.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <section />
        </div>
    )
}

function SummaryBox({
    label,
    value,
    icon,
    highlighted,
}: {
    label: string
    value: string
    icon: React.ReactNode
    highlighted?: boolean
}) {
    return (
        <div
            className={`rounded-lg p-3 flex flex-col space-y-1 ${
                highlighted
                    ? 'bg-primary/10 border border-primary/20'
                    : 'bg-secondary/5 border border-border/50'
            }`}
        >
            <div className="flex items-center gap-2">
                <div className="text-muted-foreground">{icon}</div>
                <p className="text-xs text-muted-foreground">{label}</p>
            </div>
            <p className="text-sm font-semibold text-foreground">{value}</p>
        </div>
    )
}
