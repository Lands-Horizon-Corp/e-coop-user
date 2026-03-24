'use client'

import { cn } from '@/helpers/tw-utils'
import { currencyFormat } from '@/modules/currency'
import {
    type IGeneralLedger,
    useGetGeneralLedgerByMemberAccountingLedgerId,
} from '@/modules/general-ledger'
import { format } from 'date-fns'
import { Receipt } from 'lucide-react'

import type { TEntityId } from '@/types'

export interface IGeneralLedgerCardListProps {
    memberAccountingLedgerId?: TEntityId
    onSelect?: (ledger: IGeneralLedger) => void
    className?: string
}

export const GeneralLedgerCardList = ({
    memberAccountingLedgerId,
    onSelect,
    className,
}: IGeneralLedgerCardListProps) => {
    const { data, isLoading } = useGetGeneralLedgerByMemberAccountingLedgerId({
        memberAccountingLedgerId: memberAccountingLedgerId,
    })

    if (isLoading) {
        return (
            <div className="divide-y divide-border">
                {Array.from({ length: 5 }).map((_, i) => (
                    <SkeletonRow key={i} />
                ))}
            </div>
        )
    }

    if (!data?.length) {
        return (
            <div className="flex flex-col items-center py-12 text-muted-foreground">
                <Receipt className="h-6 w-6 mb-2" />
                <p className="text-sm">No entries found</p>
            </div>
        )
    }

    return (
        <div className={cn('divide-y divide-border', className)}>
            {data.map((ledger) => {
                const isDebit = ledger.debit > 0
                const amount = isDebit ? ledger.debit : ledger.credit

                return (
                    <div
                        className="flex items-center justify-between gap-4 py-3 px-1 cursor-pointer hover:bg-muted/50 transition-colors"
                        key={ledger.id}
                        onClick={() => onSelect?.(ledger)}
                    >
                        <div className="flex items-center gap-3 min-w-0">
                            <div
                                className={cn(
                                    'w-1.5 h-1.5 rounded-full shrink-0',
                                    isDebit ? 'bg-red-500' : 'bg-emerald-500'
                                )}
                            />
                            <div className="min-w-0">
                                <p className="text-sm font-medium text-foreground truncate">
                                    {ledger.source.toUpperCase() ?? 'Account'}
                                </p>
                                <p className="text-xs text-muted-foreground flex items-center gap-1.5 flex-wrap">
                                    <span>
                                        {ledger.entry_date
                                            ? format(
                                                  new Date(ledger.entry_date),
                                                  'MMM d, yyyy'
                                              )
                                            : '—'}
                                    </span>
                                    {ledger.reference_number && (
                                        <>
                                            <span className="text-border">
                                                ·
                                            </span>
                                            <span className="font-mono">
                                                #{ledger.reference_number}
                                            </span>
                                        </>
                                    )}
                                    {ledger.source && (
                                        <>
                                            <span className="text-border">
                                                ·
                                            </span>
                                            <span className="capitalize">
                                                {ledger.account?.name.replace(
                                                    /-/g,
                                                    ' '
                                                )}
                                            </span>
                                        </>
                                    )}
                                </p>
                            </div>
                        </div>

                        <div className="text-right shrink-0">
                            <p
                                className={cn(
                                    'text-sm font-medium tabular-nums',
                                    isDebit
                                        ? 'text-red-600'
                                        : 'text-emerald-600'
                                )}
                            >
                                {isDebit ? '−' : '+'}
                                {currencyFormat(amount)}
                            </p>
                            <p className="text-xs text-muted-foreground tabular-nums">
                                Bal: {currencyFormat(ledger.balance)}
                            </p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default GeneralLedgerCardList

const SkeletonRow = () => (
    <div className="flex items-center justify-between gap-4 py-3 px-1 animate-pulse">
        <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted" />
            <div className="space-y-1.5">
                <div className="h-3.5 w-28 bg-muted rounded" />
                <div className="h-3 w-20 bg-muted rounded" />
            </div>
        </div>
        <div className="h-3.5 w-16 bg-muted rounded" />
    </div>
)
