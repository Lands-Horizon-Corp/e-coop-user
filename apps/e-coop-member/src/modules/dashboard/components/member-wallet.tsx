import { formatDate } from '@/helpers'
import { CoopBackground } from '@/modules/home/components/coop-bg'
import { useGetMemberWallet } from '@/modules/member-account-ledger/member-account-ledger.service'
import { QrCode, Wallet } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'

import { useModalState } from '@/hooks/use-modal-state'

import { TEntityId } from '@/types'

import { currencyFormat } from '../../currency/currency.utils'
import GeneralLedgerModal from './ledger-modal'

interface WalletBalanceProps {
    memberId: TEntityId
}

const WalletBalance = ({ memberId }: WalletBalanceProps) => {
    const ledgerModalState = useModalState(false)

    const { data: memberAccountingLedger } = useGetMemberWallet({
        memberProfileId: memberId,
    })
    return (
        <div>
            {memberAccountingLedger?.id && (
                <GeneralLedgerModal
                    memberAccountLedgerId={memberAccountingLedger.id}
                    {...ledgerModalState}
                />
            )}

            <div className="container mx-auto py-8">
                <CoopBackground opacity={0.3} variant="minimal" />
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-4 space-y-8">
                        {/* Wallet Card */}
                        <Card
                            className="bg-muted backdrop-blur-xl dark:border-background/50 shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 relative overflow-hidden group"
                            onClick={() => {
                                ledgerModalState.onOpenChange(true)
                            }}
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-primary/10 to-transparent rounded-bl-full"></div>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-xl bg-linear-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Wallet className="w-7 h-7 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-3xl font-bold text-primary">
                                            {currencyFormat(
                                                memberAccountingLedger?.balance
                                            )}
                                        </CardTitle>
                                        <p className="text-sm text-muted-foreground">
                                            Main Wallet Balance
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Last transaction:{' '}
                                            {memberAccountingLedger?.last_pay &&
                                                formatDate(
                                                    memberAccountingLedger.last_pay
                                                )}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        className="gap-2 bg-transparent"
                                        size="sm"
                                        variant="outline"
                                    >
                                        <QrCode className="h-4 w-4" />
                                        Send
                                    </Button>
                                    <Button className="gap-2 z-10" size="sm">
                                        <QrCode className="h-4 w-4" />
                                        Receive
                                    </Button>
                                </div>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WalletBalance
