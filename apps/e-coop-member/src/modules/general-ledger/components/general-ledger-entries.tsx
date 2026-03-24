import { toReadableDateTime } from '@/helpers/date-utils'
import { IAccount } from '@/modules/account'
import { currencyFormat } from '@/modules/currency'

import { IModalProps } from '@/components/modals/modal'
import { Badge } from '@/components/ui/badge'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

import { TEntityId } from '@/types'

import { useGetAllGeneralLedger } from '../general-ledger.service'

type Props = {
    memberAccountingLedgerId: TEntityId
    focusedAccount: IAccount
}

const GeneralLedgerEntries = ({ memberAccountingLedgerId }: Props) => {
    const { data = [], isPending } = useGetAllGeneralLedger({
        mode: 'member-accounting-ledger',
        memberAccountingLedgerId,
    })

    return (
        <ScrollArea className="w-full max-w-full">
            <div className="min-w-[700px]">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Reference</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Source</TableHead>
                            <TableHead className="text-right">Credit</TableHead>
                            <TableHead className="text-right">Debit</TableHead>
                            <TableHead className="text-right">
                                Balance
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isPending ? (
                            Array.from({ length: 3 }).map((_, i) => (
                                <TableRow key={i}>
                                    {Array.from({ length: 7 }).map((_, j) => (
                                        <TableCell key={j}>
                                            <Skeleton className="h-4 w-full" />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : !data?.length ? (
                            <TableRow>
                                <TableCell
                                    className="text-center text-muted-foreground"
                                    colSpan={7}
                                >
                                    No ledger entries found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((entry) => (
                                <TableRow key={entry.id}>
                                    <TableCell className="whitespace-nowrap text-sm">
                                        {toReadableDateTime(entry.entry_date)}
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap text-sm">
                                        {entry.reference_number}
                                    </TableCell>
                                    <TableCell className="text-sm">
                                        {entry.description}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            className="whitespace-nowrap text-xs"
                                            variant="outline"
                                        >
                                            {entry.source}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right text-sm text-green-600">
                                        {entry.credit > 0
                                            ? currencyFormat(entry.credit, {
                                                  showSymbol:
                                                      !!entry.account?.currency,
                                                  currency:
                                                      entry.account?.currency,
                                              })
                                            : '—'}
                                    </TableCell>
                                    <TableCell className="text-right text-sm text-destructive">
                                        {entry.debit > 0
                                            ? currencyFormat(entry.debit, {
                                                  showSymbol:
                                                      !!entry.account?.currency,
                                                  currency:
                                                      entry.account?.currency,
                                              })
                                            : '—'}
                                    </TableCell>
                                    <TableCell className="text-right text-sm font-medium">
                                        {currencyFormat(entry.balance, {
                                            showSymbol:
                                                !!entry.account?.currency,
                                            currency: entry.account?.currency,
                                        })}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    )
}

export const GeneralLedgerEntriesModal = ({
    generalLedgerEntriesProps,
    ...props
}: IModalProps & {
    generalLedgerEntriesProps: Props
}) => {
    return (
        <Dialog {...props}>
            <DialogContent className="!max-w-4xl">
                <DialogHeader>
                    <DialogTitle>
                        {generalLedgerEntriesProps?.focusedAccount.name}
                    </DialogTitle>
                    <DialogDescription>
                        Currently showing Account{' '}
                        {
                            generalLedgerEntriesProps?.focusedAccount
                                .account_category?.name
                        }{' '}
                        — General Ledger
                    </DialogDescription>
                </DialogHeader>
                <GeneralLedgerEntries {...generalLedgerEntriesProps} />
            </DialogContent>
        </Dialog>
    )
}

export default GeneralLedgerEntries
