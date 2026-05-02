import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'

import { useTheme } from '@ecoop/shared/providers/core-providers'
import { cn } from '@ecoop/shared/tw-utils'
import type { IClassProps } from '@ecoop/shared/types'
import type { IModalProps } from '@ecoop/ui/core'
import Modal from '@ecoop/ui/core'
import { Badge } from '@ecoop/ui/core'
import { Button } from '@ecoop/ui/core'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@ecoop/ui/core'
import {
    ArrowDownRight,
    ArrowUpRight,
    LineChart,
    PiggyBank,
    Receipt,
    Send,
    Wallet,
} from 'lucide-react'
import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

import type { Account } from '../dashboard.types'

const balanceHistoryData = [
    { day: 'Day 1', balance: 20 },
    { day: 'Day 5', balance: 35 },
    { day: 'Day 10', balance: 45 },
    { day: 'Day 15', balance: 30 },
    { day: 'Day 20', balance: 55 },
    { day: 'Day 25', balance: 50 },
    { day: 'Day 30', balance: 60 },
]
export interface AccountModalProps extends IClassProps {
    account?: Account
}

const AccountModalContent = ({ account }: AccountModalProps) => {
    const theme = useTheme()
    console.log(theme.theme)
    const strokeColor = theme.theme === 'light' ? '#6b7280' : '#6b7280'

    return (
        <div className="max-w-4xl max-h-screen ">
            <div>
                <div className="text-2xl font-bold flex items-center gap-3">
                    {account?.type === 'wallet' ? (
                        <Wallet className="h-6 w-6 text-primary" />
                    ) : (
                        <PiggyBank className="h-6 w-6 text-accent" />
                    )}
                    {account?.name}
                </div>
                <div className="text-sm text-muted-foreground">
                    View transactions, manage your account, and track balance
                    history
                </div>
            </div>
            <div className="space-y-6 mt-4">
                {/* Balance Header */}
                <Card className="bg-transparent shadow-none from-primary/5 to-accent/5 border-0">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">
                                    Total Balance
                                </p>
                                <p className="text-4xl font-bold text-primary">
                                    ₱{account?.balance?.toLocaleString()}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                {/* DEBIT BUTTON */}
                                <Button
                                    className="gap-2 bg-transparent border-0 flex-col h-auto py-0 px-4"
                                    size="lg"
                                    variant="outline"
                                >
                                    <div className="flex items-center gap-2">
                                        <ArrowUpRight className="h-4 w-4" />
                                        <span className="text-lg font-bold">
                                            {account?.debit}
                                        </span>
                                    </div>
                                    <span className="text-xs opacity-70">
                                        Debit
                                    </span>
                                </Button>

                                <Button
                                    className="gap-2 flex-col h-auto py-3 px-4"
                                    size="lg"
                                >
                                    <div className="flex items-center gap-2">
                                        <ArrowDownRight className="h-4 w-4" />
                                        <span className="text-lg font-bold">
                                            {account?.credit}
                                        </span>
                                    </div>
                                    <span className="text-xs opacity-70">
                                        Credit
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tabs for Transactions and Graph */}
                <Tabs className="w-full" defaultValue="transactions">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="transactions">
                            Transactions
                        </TabsTrigger>
                        <TabsTrigger value="graph">Balance Graph</TabsTrigger>
                    </TabsList>

                    {/* Transactions Tab */}
                    <TabsContent
                        className="space-y-3 mt-4"
                        value="transactions"
                    >
                        {account?.transactions.map((transaction) => (
                            <Card
                                className="hover:shadow-md transition-shadow"
                                key={transaction.id}
                            >
                                <CardContent className="p-2.5">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                                    transaction.type ===
                                                    'WITHDRAW'
                                                        ? 'bg-red-300 text-red-600'
                                                        : transaction.type ===
                                                            'DEPOSIT'
                                                          ? 'bg-green-300 text-green-600'
                                                          : 'bg-blue-300 text-blue-600'
                                                }`}
                                            >
                                                {transaction.type ===
                                                'WITHDRAW' ? (
                                                    <ArrowUpRight className="h-5 w-5" />
                                                ) : transaction.type ===
                                                  'DEPOSIT' ? (
                                                    <ArrowDownRight className="h-5 w-5" />
                                                ) : (
                                                    <Send className="h-5 w-5" />
                                                )}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="font-semibold text-sm">
                                                        {transaction.type}
                                                    </p>
                                                    {transaction.recipient && (
                                                        <Badge
                                                            className="text-xs"
                                                            variant="outline"
                                                        >
                                                            {
                                                                transaction.recipient
                                                            }
                                                        </Badge>
                                                    )}
                                                </div>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    Reference number:{' '}
                                                    {
                                                        transaction.referenceNumber
                                                    }
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {transaction.message}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p
                                                className={`font-bold text-lg ${
                                                    transaction.type ===
                                                    'WITHDRAW'
                                                        ? 'text-red-600'
                                                        : 'text-green-600'
                                                }`}
                                            >
                                                {transaction.type === 'WITHDRAW'
                                                    ? '-'
                                                    : '+'}
                                                ${transaction.amount}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {transaction.date}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        {account?.transactions.length === 0 && (
                            <div className="text-center py-12 text-muted-foreground">
                                <Receipt className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <p>No transactions yet</p>
                            </div>
                        )}
                    </TabsContent>

                    {/* Graph Tab */}
                    <TabsContent className="mt-4 " value="graph">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <LineChart className="h-5 w-5 text-primary" />
                                    Per-Day Balance
                                </CardTitle>
                                <CardDescription>
                                    Last 30 days balance tracking
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer
                                        height="100%"
                                        width="100%"
                                    >
                                        <AreaChart data={balanceHistoryData}>
                                            <defs>
                                                <linearGradient
                                                    id="balanceGradient"
                                                    x1="0"
                                                    x2="0"
                                                    y1="0"
                                                    y2="1"
                                                >
                                                    <stop
                                                        offset="5%"
                                                        stopColor="hsl(var(--primary))"
                                                        stopOpacity={0.3}
                                                    />
                                                    <stop
                                                        offset="95%"
                                                        stopColor="hsl(var(--primary))"
                                                        stopOpacity={0}
                                                    />
                                                </linearGradient>
                                            </defs>
                                            <XAxis
                                                dataKey="day"
                                                fontSize={12}
                                                stroke={strokeColor}
                                                tickLine={false}
                                            />
                                            <YAxis
                                                className="v1"
                                                color="white"
                                                fontSize={12}
                                                stroke={strokeColor}
                                                tickFormatter={(value) =>
                                                    `₱${value}`
                                                }
                                                tickLine={false}
                                            />
                                            <Tooltip
                                                content={({
                                                    active,
                                                    payload,
                                                }) => {
                                                    if (
                                                        active &&
                                                        payload &&
                                                        payload.length
                                                    ) {
                                                        return (
                                                            <div className="bg-background border rounded-lg shadow-lg p-3">
                                                                <p className="text-sm font-medium">
                                                                    {
                                                                        payload[0]
                                                                            .payload
                                                                            .day
                                                                    }
                                                                </p>
                                                                <p className="text-lg font-bold text-primary">
                                                                    ₱
                                                                    {
                                                                        payload[0]
                                                                            .value
                                                                    }
                                                                </p>
                                                            </div>
                                                        )
                                                    }
                                                    return null
                                                }}
                                            />
                                            <Area
                                                dataKey="balance"
                                                fill="url(#balanceGradient)"
                                                stroke="hsl(var(--primary))"
                                                strokeWidth={3}
                                                type="monotone"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>

                                {/* Statistics */}
                                <div className="grid grid-cols-3 gap-4 mt-6">
                                    <Card className="bg-muted/50">
                                        <CardContent className="pt-4">
                                            <p className="text-xs text-muted-foreground mb-1">
                                                Average Balance
                                            </p>
                                            <p className="text-xl font-bold text-primary">
                                                ₱
                                                {Math.round(
                                                    balanceHistoryData.reduce(
                                                        (sum, d) =>
                                                            sum + d.balance,
                                                        0
                                                    ) /
                                                        balanceHistoryData.length
                                                )}
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-muted/50">
                                        <CardContent className="pt-4">
                                            <p className="text-xs text-muted-foreground mb-1">
                                                Highest Balance
                                            </p>
                                            <p className="text-xl font-bold text-green-600">
                                                ₱
                                                {Math.max(
                                                    ...balanceHistoryData.map(
                                                        (d) => d.balance
                                                    )
                                                )}
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-muted/50">
                                        <CardContent className="pt-4">
                                            <p className="text-xs text-muted-foreground mb-1">
                                                Lowest Balance
                                            </p>
                                            <p className="text-xl font-bold text-red-600">
                                                ₱
                                                {Math.min(
                                                    ...balanceHistoryData.map(
                                                        (d) => d.balance
                                                    )
                                                )}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export const AccountModal = ({
    className,
    formProps,
    ...props
}: IModalProps & {
    formProps?: Omit<AccountModalProps, 'className'>
}) => {
    return (
        <Modal className={cn('', className)} {...props}>
            <AccountModalContent {...formProps} />
        </Modal>
    )
}

export default AccountModal
