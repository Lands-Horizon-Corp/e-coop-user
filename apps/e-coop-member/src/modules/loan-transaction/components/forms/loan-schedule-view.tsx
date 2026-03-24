import { toReadableDate } from '@/helpers/date-utils'
import { currencyFormat } from '@/modules/currency'
import { Calendar, Wallet } from 'lucide-react'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'

interface AccountBreakdown {
    name: string
    amount: number
}

interface PaymentScheduleItem {
    paymentDate: string
    accounts: AccountBreakdown[]
}

interface LoanPaymentScheduleProps {
    schedule: PaymentScheduleItem[]
}

const LoanPaymentSchedule = ({ schedule }: LoanPaymentScheduleProps) => {
    const getRowTotal = (accounts: AccountBreakdown[]) => {
        return accounts.reduce((sum, acc) => sum + acc.amount, 0)
    }

    const grandTotal = schedule.reduce(
        (sum, item) => sum + getRowTotal(item.accounts),
        0
    )

    return (
        <div className="rounded-xl border-2 border-primary/20 overflow-hidden shadow-lg">
            {/* Gradient Summary Header */}
            <div className="bg-gradient-to-br from-primary via-primary to-primary/80 p-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/20 backdrop-blur-sm">
                            <Calendar className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-primary-foreground/70 uppercase tracking-wider">
                                Payments
                            </p>
                            <p className="text-2xl font-bold text-primary-foreground">
                                {schedule.length}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <p className="text-xs font-medium text-primary-foreground/70 uppercase tracking-wider">
                                Total Amount
                            </p>
                            <p className="text-2xl font-bold text-primary-foreground">
                                {currencyFormat(grandTotal)}
                            </p>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/20 backdrop-blur-sm">
                            <Wallet className="h-5 w-5 text-primary-foreground" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Accordion for breakdown */}
            <Accordion className="bg-card" collapsible type="single">
                <AccordionItem className="border-none" value="schedule">
                    <AccordionTrigger className="px-5 py-4 text-sm font-medium text-foreground hover:no-underline hover:bg-muted/50 transition-colors">
                        <span className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                            View payment schedule
                        </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-0">
                        <div className="flex flex-col gap-2 px-4 pb-4">
                            {schedule.map((item, index) => {
                                const rowTotal = getRowTotal(item.accounts)
                                return (
                                    <div
                                        className="group relative rounded-lg border border-border bg-gradient-to-r from-muted/50 to-transparent p-3 transition-all hover:border-primary/30 hover:shadow-sm"
                                        key={index}
                                    >
                                        {/* Payment number indicator */}
                                        <div className="absolute -left-px top-1/2 -translate-y-1/2 h-8 w-1 rounded-r-full bg-primary/40 group-hover:bg-primary transition-colors" />

                                        {/* Compact primary row */}
                                        <div className="flex items-center justify-between pl-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-medium text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                                                    #{index + 1}
                                                </span>
                                                <span className="text-sm text-foreground font-medium">
                                                    {toReadableDate(
                                                        item.paymentDate
                                                    )}
                                                </span>
                                            </div>
                                            <span className="font-bold text-foreground">
                                                {currencyFormat(rowTotal)}
                                            </span>
                                        </div>

                                        {/* Compact extras */}
                                        <div className="mt-2 pl-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                                            {item.accounts.map(
                                                (account, accIndex) => (
                                                    <span
                                                        className="flex items-center gap-1"
                                                        key={accIndex}
                                                    >
                                                        <span className="h-1 w-1 rounded-full bg-primary/50" />
                                                        {account.name}:
                                                        <span className="text-foreground/80">
                                                            {currencyFormat(
                                                                account.amount
                                                            )}
                                                        </span>
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default LoanPaymentSchedule
