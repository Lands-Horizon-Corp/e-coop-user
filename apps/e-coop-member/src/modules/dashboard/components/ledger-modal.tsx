'use client'

import { cn } from '@/helpers/tw-utils'
import { currencyFormat } from '@/modules/currency'
import { useGetMemberAccountingLedgerTotal } from '@/modules/general-ledger'

import Modal, { type IModalProps } from '@/components/modals/modal'

import type { TEntityId } from '@/types'

import GeneralLedgerCardList from './general-ledger-list'

interface IClassProps {
    className?: string
}

export interface IGeneralLedgerModalProps
    extends IClassProps, Omit<IModalProps, 'children'> {
    memberAccountLedgerId?: TEntityId
}

const GeneralLedgerModalContent = ({
    memberAccountLedgerId,
}: IGeneralLedgerModalProps) => {
    const { data: totals } = useGetMemberAccountingLedgerTotal({
        memberAccountingLedgerId: memberAccountLedgerId,
    })

    return (
        <div className="space-y-4">
            {/* Summary Stats */}
            <div className="flex items-end justify-between gap-4 pb-4 border-b border-border">
                <div>
                    <p className="text-xs text-muted-foreground mb-0.5">
                        Balance
                    </p>
                    <p className="text-2xl font-semibold tracking-tight">
                        {currencyFormat(totals?.balance ?? 0)}
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <p className="text-xs text-muted-foreground mb-0.5">
                            Debit
                        </p>
                        <p className="text-sm font-medium text-red-600 tabular-nums">
                            {currencyFormat(totals?.total_debit ?? 0)}
                        </p>
                    </div>
                    <div className="w-px h-8 bg-border" />
                    <div className="text-right">
                        <p className="text-xs text-muted-foreground mb-0.5">
                            Credit
                        </p>
                        <p className="text-sm font-medium text-emerald-600 tabular-nums">
                            {currencyFormat(totals?.total_credit ?? 0)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Ledger List */}
            <div className="max-h-[50vh] overflow-y-auto -mx-1 px-1">
                <GeneralLedgerCardList
                    memberAccountingLedgerId={memberAccountLedgerId}
                />
            </div>
        </div>
    )
}

export const GeneralLedgerModal = ({
    memberAccountLedgerId,
    className,
    ...props
}: IGeneralLedgerModalProps) => {
    return (
        <Modal
            className={cn('sm:max-w-md', className)}
            description="Entry details and transactions"
            title="General Ledger"
            {...props}
        >
            <GeneralLedgerModalContent
                memberAccountLedgerId={memberAccountLedgerId}
            />
        </Modal>
    )
}

export default GeneralLedgerModal
