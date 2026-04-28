'use client'

import { useState } from 'react'

import { useModalState } from '@e-coop-monorepo/shared/hooks'
import { Badge } from '@e-coop-monorepo/ui'
import { Button } from '@e-coop-monorepo/ui'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@e-coop-monorepo/ui'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from '@e-coop-monorepo/ui'
import {
    Activity,
    AlertCircle,
    ArrowDownRight,
    ArrowRightLeft,
    ArrowUpRight,
    BarChart3,
    Briefcase,
    Calendar,
    Car,
    Check,
    CreditCard,
    DollarSign,
    FileText,
    Gift,
    GraduationCap,
    Hamburger,
    Home,
    HouseHeart,
    LucidePieChart,
    MapPin,
    PhilippinePesoIcon,
    PiggyBank,
    Plus,
    QrCode,
    Receipt,
    ShoppingBag,
    TrendingUp,
    Truck,
    Users,
    Wallet,
    Warehouse,
} from 'lucide-react'
import {
    Area,
    AreaChart,
    Cell,
    Pie,
    PieChart as RePieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

import { CoopBackground } from '../home/components/coop-bg'
import Organization from '../organization/pages'
import AccountModal from './components/accounts-modal'
import QrCodeModal from './components/modal-qr'

// Sample data for charts
const performanceData = [
    { month: 'Jan', value: 12000 },
    { month: 'Feb', value: 15000 },
    { month: 'Mar', value: 13500 },
    { month: 'Apr', value: 18000 },
    { month: 'May', value: 21000 },
    { month: 'Jun', value: 19500 },
    { month: 'Jul', value: 24000 },
    { month: 'Aug', value: 28000 },
    { month: 'Sep', value: 26500 },
    { month: 'Oct', value: 31000 },
    { month: 'Nov', value: 34000 },
    { month: 'Dec', value: 38500 },
]

const assetData = [
    { name: 'Savings', value: 45, color: '#3b82f6' },
    { name: 'Investments', value: 30, color: '#14b8a6' },
    { name: 'Loans', value: 15, color: '#8b5cf6' },
    { name: 'Emergency Fund', value: 10, color: '#f59e0b' },
]

const recentTransactions = [
    {
        id: 1,
        type: 'Deposit',
        amount: 2500,
        date: '2024-01-15',
        status: 'Completed',
    },
    {
        id: 2,
        type: 'Withdrawal',
        amount: -850,
        date: '2024-01-14',
        status: 'Completed',
    },
    {
        id: 3,
        type: 'Loan Payment',
        amount: -1200,
        date: '2024-01-12',
        status: 'Completed',
    },
    {
        id: 4,
        type: 'Dividend',
        amount: 350,
        date: '2024-01-10',
        status: 'Completed',
    },
    {
        id: 5,
        type: 'Transfer',
        amount: 500,
        date: '2024-01-08',
        status: 'Processing',
    },
]

const savingsAccounts = [
    {
        id: 1,
        name: 'Birthday Savings',
        balance: 2500,
        icon: Gift,
        lastDeposit: '01/10/24',
        debit: 12351,
        credit: 1312,
        // Added sample QR data
        qrCodeData: 'https://pay.example.com/birthday-savings-123',
    },
    {
        id: 2,
        name: 'Emergency Fund',
        balance: 5000,
        icon: AlertCircle,
        lastDeposit: '01/11/24',
        debit: 4578,
        credit: 2100,
        qrCodeData: 'https://pay.example.com/emergency-fund-456',
    },
    {
        id: 3,
        name: 'Vacation Savings',
        balance: 1200,
        icon: Calendar,
        lastDeposit: '01/12/24',
        debit: 9812,
        credit: 550,
        qrCodeData: 'https://pay.example.com/vacation-savings-789',
    },
    {
        id: 4,
        name: 'Education Fund',
        balance: 8000,
        icon: GraduationCap,
        lastDeposit: '01/13/24',
        debit: 15400,
        credit: 3200,
        qrCodeData: 'https://pay.example.com/education-fund-012',
    },
]

const loanProducts = [
    {
        id: 1,
        name: 'Personal Loan',
        rate: '8.5%',
        term: '1-5 years',
        icon: Briefcase,
    },
    {
        id: 2,
        name: 'Housing Loan',
        rate: '6.5%',
        term: '5-20 years',
        icon: Home,
    },
    {
        id: 3,
        name: 'Emergency Loan',
        rate: '9.0%',
        term: '3-12 months',
        icon: AlertCircle,
    },
    {
        id: 4,
        name: 'Business Loan',
        rate: '10.0%',
        term: '2-7 years',
        icon: TrendingUp,
    },
]

const activeLoans = [
    {
        id: 1,
        type: 'Personal Loan',
        loanNumber: 'PL-2023-00145',
        balance: 5000,
        limit: 10000,
        originalAmount: 10000,
        interestRate: 8.5,
        term: '36 months',
        monthlyPayment: 315.5,
        nextPayment: 315.5,
        dueDate: 'Feb 15, 2024',
        progress: 50,
        disbursementDate: 'Aug 15, 2023',
        maturityDate: 'Aug 15, 2026',
        paymentFrequency: 'Monthly',
        collateral: 'None - Clean Loan',
        purpose: 'Home Improvement',
        loanOfficer: 'Maria Santos',
        paymentHistory: [
            {
                id: 1,
                amount: 315.5,
                date: 'Jan 15, 2024',
                status: 'Paid',
                referenceNumber: 'LN123456789',
                principalPaid: 265.5,
                interestPaid: 50.0,
                paymentMethod: 'Online Banking',
            },
            {
                id: 2,
                amount: 315.5,
                date: 'Dec 15, 2023',
                status: 'Paid',
                referenceNumber: 'LN123456788',
                principalPaid: 263.6,
                interestPaid: 51.9,
                paymentMethod: 'Bank Transfer',
            },
            {
                id: 3,
                amount: 315.5,
                date: 'Nov 15, 2023',
                status: 'Paid',
                referenceNumber: 'LN123456787',
                principalPaid: 261.7,
                interestPaid: 53.8,
                paymentMethod: 'Online Banking',
            },
            {
                id: 4,
                amount: 315.5,
                date: 'Oct 15, 2023',
                status: 'Paid',
                referenceNumber: 'LN123456786',
                principalPaid: 259.8,
                interestPaid: 55.7,
                paymentMethod: 'Over-the-Counter',
            },
            {
                id: 5,
                amount: 315.5,
                date: 'Sep 15, 2023',
                status: 'Paid',
                referenceNumber: 'LN123456785',
                principalPaid: 257.9,
                interestPaid: 57.6,
                paymentMethod: 'Online Banking',
            },
        ],
    },
    {
        id: 2,
        type: 'Housing Loan',
        loanNumber: 'HL-2022-00089',
        balance: 85000,
        limit: 100000,
        originalAmount: 100000,
        interestRate: 6.5,
        term: '240 months',
        monthlyPayment: 745.25,
        nextPayment: 745.25,
        dueDate: 'Feb 20, 2024',
        progress: 15,
        disbursementDate: 'Jun 20, 2022',
        maturityDate: 'Jun 20, 2042',
        paymentFrequency: 'Monthly',
        collateral: 'Real Estate - House & Lot',
        purpose: 'House Purchase',
        loanOfficer: 'Juan Dela Cruz',
        paymentHistory: [
            {
                id: 1,
                amount: 745.25,
                date: 'Jan 20, 2024',
                status: 'Paid',
                referenceNumber: 'LN223456790',
                principalPaid: 283.58,
                interestPaid: 461.67,
                paymentMethod: 'Auto-debit',
            },
            {
                id: 2,
                amount: 745.25,
                date: 'Dec 20, 2023',
                status: 'Paid',
                referenceNumber: 'LN223456789',
                principalPaid: 282.04,
                interestPaid: 463.21,
                paymentMethod: 'Auto-debit',
            },
        ],
    },
]

const upcomingEvents = [
    {
        id: 1,
        title: 'Annual General Meeting',
        date: 'Feb 15, 2024',
        time: '9:00 AM - 12:00 PM',
        location: 'Main Branch Hall',
        attendees: 245,
        maxAttendees: 300,
        description:
            'Join us for the yearly AGM to discuss cooperative achievements and future plans.',
        status: 'open',
        icon: Users,
    },
    {
        id: 2,
        title: 'Financial Literacy Workshop',
        date: 'Feb 22, 2024',
        time: '2:00 PM - 4:30 PM',
        location: 'Training Center',
        attendees: 67,
        maxAttendees: 80,
        description:
            'Learn essential financial planning and investment strategies.',
        status: 'open',
        icon: GraduationCap,
    },
    {
        id: 3,
        title: 'Member Appreciation Day',
        date: 'Mar 5, 2024',
        time: '10:00 AM - 5:00 PM',
        location: 'City Park',
        attendees: 189,
        maxAttendees: 250,
        description:
            'Celebrate our community with games, food, and special prizes.',
        status: 'open',
        icon: Gift,
    },
    {
        id: 4,
        title: 'Loan Application Clinic',
        date: 'Mar 12, 2024',
        time: '1:00 PM - 3:00 PM',
        location: 'Consultation Room',
        attendees: 32,
        maxAttendees: 40,
        description: 'Get personalized assistance with your loan applications.',
        status: 'open',
        icon: DollarSign,
    },
]

const koopServices = [
    { name: 'Payroll', icon: PhilippinePesoIcon },
    { name: 'KoopMobility', icon: Car },
    { name: 'KoopEats', icon: Hamburger },
    { name: 'KoopWarehouse', icon: Warehouse },
    { name: 'KoopExpress', icon: Truck },
    { name: 'KoopWallet', icon: Wallet },
    { name: 'KoopFleet', icon: Truck },
    { name: 'KoopMall', icon: ShoppingBag },
    { name: 'KoopJeep', icon: Car },
    { name: 'KoopStock', icon: TrendingUp },
]
type Transaction = {
    id: string
    type: 'WITHDRAW' | 'DEPOSIT' | 'TRANSFER'
    amount: number
    date: string
    referenceNumber: string
    message?: string
    recipient?: string
}

export type Account = {
    name: string
    balance: number
    transactions: Transaction[]
    type: 'wallet' | 'savings'
    debit: number
    credit: number
}

export default function DashboardPage() {
    const [selectedAccount, setSelectedAccount] = useState<Account | undefined>(
        undefined
    )

    const [selectedLoan, setSelectedLoan] = useState<
        (typeof activeLoans)[0] | null
    >(null)

    const [isLoanPaymentModalOpen, setIsLoanPaymentModalOpen] = useState(false)
    const [isPaymentFormModalOpen, setIsPaymentFormModalOpen] = useState(false)
    const [paymentAmount, setPaymentAmount] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('online-banking')

    const AccountModalState = useModalState()
    const loanDetailsState = useModalState()

    const [qrModalOpen, setQrModalOpen] = useState(false)
    const [qrData, setQrData] = useState('')
    const [qrAccountName, setQrAccountName] = useState('')

    const handleQrClick = ({
        event,
        data,
        name,
    }: {
        event: React.MouseEvent<HTMLButtonElement>
        data: string
        name: string
    }) => {
        event.stopPropagation()
        setQrData(data)
        setQrAccountName(name)
        setQrModalOpen(true)
    }

    return (
        <div className="flex flex-col min-h-screen">
            {/* <CoopBackground opacity={0.4} variant="geometric" />
            <CoopBackground
                className="mt-50"
                opacity={0.3}
                variant="hexagons"
            /> */}
            <Organization />
            {/*            
            <AccountModal
                formProps={{
                    account: selectedAccount,
                }}
                {...AccountModalState}
            />
            <QrCodeModal
                accountName={qrAccountName}
                onOpenChange={setQrModalOpen}
                open={qrModalOpen}
                qrData={qrData}
            /> */}
            <section className="relative hidden bg-linear-to-br from-primary/5 via-background to-accent/5 py-12 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-3xl">
                        <Badge className="mb-4 px-4 py-2" variant="secondary">
                            Member Dashboard
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Welcome Back, Member
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Manage your accounts, loans, and explore cooperative
                            services
                        </p>
                    </div>
                </div>
            </section>

            <div className="container hidden  mx-auto px-4 md:px-6 py-8 ">
                <CoopBackground opacity={0.3} variant="minimal" />
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Main Content Area */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Wallet Card */}
                        <Card className="dark:bg-background backdrop-blur-xl dark:border-background/50 shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-primary/10 to-transparent rounded-bl-full"></div>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-xl bg-linear-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Wallet className="w-7 h-7 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-3xl font-bold text-primary">
                                            ₱3,450
                                        </CardTitle>
                                        <p className="text-sm text-muted-foreground">
                                            Main Wallet Balance
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Last transaction: 01/15/24
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        className="gap-2 bg-transparent"
                                        onClick={(e) => {
                                            handleQrClick({
                                                event: e,
                                                data: 'https://pay.example.com/education-fund-012',
                                                name: 'Wallet',
                                            })
                                        }}
                                        size="sm"
                                        variant="outline"
                                    >
                                        <QrCode className="h-4 w-4" />
                                        Send
                                    </Button>
                                    <Button
                                        className="gap-2 z-10"
                                        onClick={(e) => {
                                            handleQrClick({
                                                event: e,
                                                data: 'https://pay.example.com/education-fund-012',
                                                name: 'Receiving',
                                            })
                                        }}
                                        size="sm"
                                    >
                                        <QrCode className="h-4 w-4" />
                                        Receive
                                    </Button>
                                </div>
                            </CardHeader>
                        </Card>

                        {/* Savings Accounts */}
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold">
                                        Savings Accounts
                                    </h2>
                                    <p className="text-sm text-muted-foreground">
                                        Manage your multiple savings goals
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {savingsAccounts.map((account) => {
                                    const Icon = account.icon
                                    return (
                                        <Card
                                            className="dark:bg-background backdrop-blur-xl dark:border-background shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 relative overflow-hidden group"
                                            key={account.id}
                                            onClick={() => {
                                                setSelectedAccount({
                                                    name: account.name,
                                                    balance: account.balance,
                                                    transactions: [
                                                        {
                                                            id: '1',
                                                            type: 'WITHDRAW',
                                                            amount: 100,
                                                            date: account.lastDeposit,
                                                            referenceNumber:
                                                                '12101323',
                                                            message: 'KELAN',
                                                        },
                                                        {
                                                            id: '2',
                                                            type: 'DEPOSIT',
                                                            amount: 200,
                                                            date: account.lastDeposit,
                                                            referenceNumber:
                                                                '15101323',
                                                            message: 'KELAN',
                                                        },
                                                        {
                                                            id: '3',
                                                            type: 'TRANSFER',
                                                            amount: 50,
                                                            date: account.lastDeposit,
                                                            referenceNumber:
                                                                '12101323',
                                                            message:
                                                                'adding boyfriend gambling',
                                                        },
                                                    ],
                                                    type: 'savings',
                                                    debit: account.debit,
                                                    credit: account.debit,
                                                })
                                                AccountModalState.onOpenChange(
                                                    true
                                                )
                                            }}
                                        >
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-br from-accent/10 to-transparent rounded-bl-full"></div>
                                            <CardHeader className="flex flex-row items-center justify-between pb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 rounded-lg bg-linear-to-br from-accent/10 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                        <Icon className="h-6 w-6 text-accent" />
                                                    </div>
                                                    <div>
                                                        <CardTitle className="text-lg">
                                                            {account.name}
                                                        </CardTitle>
                                                        <p className="text-xs text-muted-foreground">
                                                            Last deposit:{' '}
                                                            {
                                                                account.lastDeposit
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                                <Button
                                                    className="z-10"
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        handleQrClick({
                                                            event: e,
                                                            data: account.qrCodeData,
                                                            name: account.name,
                                                        })
                                                    }}
                                                    size="sm"
                                                    variant="ghost"
                                                >
                                                    <QrCode className="size-5 text-muted-foreground" />
                                                </Button>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-2xl font-bold text-primary">
                                                    ₱
                                                    {account.balance.toLocaleString()}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Loans Section */}
                        <div className="">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold">Loans</h2>
                                <p className="text-sm text-muted-foreground">
                                    Track your active loans and explore new
                                    options
                                </p>
                            </div>

                            {/* Active Loans */}
                            {activeLoans.map((loan) => (
                                <Card
                                    className="mb-4 border hover:shadow-lg dark:border-background/50 rounded-xl transition-all duration-300 relative overflow-hidden"
                                    key={loan.id}
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-primary/5 to-transparent rounded-bl-full z-0" />

                                    <CardContent className="p-4 sm:p-5">
                                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-y-4 lg:gap-x-6">
                                            <div className="flex items-center gap-4 grow w-full">
                                                <div className="relative w-16 h-16 flex-shrink-0">
                                                    <svg className="w-16 h-16 transform -rotate-90">
                                                        <circle
                                                            className="text-muted/20"
                                                            cx="32"
                                                            cy="32"
                                                            fill="none"
                                                            r="28" // Reduced radius
                                                            stroke="currentColor"
                                                            strokeWidth="5" // Slightly thinner stroke
                                                        />
                                                        <circle
                                                            className="text-primary transition-all duration-500"
                                                            cx="32"
                                                            cy="32"
                                                            fill="none"
                                                            r="28"
                                                            stroke="currentColor"
                                                            strokeDasharray={`${(28 * Math.PI * 2 * loan.progress) / 100} ${28 * Math.PI * 2}`}
                                                            strokeWidth="5"
                                                        />
                                                    </svg>
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <span className="text-primary font-bold text-xs">
                                                            {loan.progress}%
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* 2. Loan Details (Condensed) */}
                                                <div className="flex-1">
                                                    <div className="flex items-center mb-1">
                                                        <Badge className="px-2 py-0.5 text-xs font-medium">
                                                            {loan.type}
                                                        </Badge>
                                                    </div>

                                                    <h3 className="text-xl font-bold leading-snug text-foreground">
                                                        ₱
                                                        {loan.balance.toLocaleString()}
                                                        <span className="text-xs font-normal text-muted-foreground ml-1">
                                                            Outstanding
                                                        </span>
                                                    </h3>

                                                    <div className="grid grid-cols-3 gap-x-3 text-xs mt-1">
                                                        <div className="flex flex-col">
                                                            <p className="font-medium text-muted-foreground/80 leading-none">
                                                                Due Date
                                                            </p>
                                                            <p
                                                                className={`font-semibold text-foreground`}
                                                            >
                                                                {loan.dueDate}
                                                            </p>
                                                        </div>

                                                        {/* Loan Limit */}
                                                        <div className="flex flex-col">
                                                            <p className="font-medium text-muted-foreground/80 leading-none">
                                                                Limit
                                                            </p>
                                                            <p className="font-semibold text-foreground">
                                                                ₱
                                                                {loan.limit.toLocaleString()}
                                                            </p>
                                                        </div>

                                                        {/* Next Payment */}
                                                        <div className="flex flex-col">
                                                            <p className="font-medium text-muted-foreground/80 leading-none">
                                                                Next Payment
                                                            </p>
                                                            <p className="font-bold text-green-600">
                                                                ₱
                                                                {loan.nextPayment.toLocaleString()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* RIGHT SECTION: Action Buttons (Stacked vertically only on very small screens) */}
                                            <div className="flex gap-2 w-full sm:w-auto shrink-0 mt-3 sm:mt-0 border-t border-border/50 sm:border-t-0 pt-3 sm:pt-0">
                                                <Button
                                                    className="flex-1 sm:w-auto h-9 px-3 text-sm" // Smaller button size
                                                    onClick={() => {
                                                        console.log('hello')
                                                        setSelectedLoan(loan)
                                                        setIsLoanPaymentModalOpen(
                                                            true
                                                        )
                                                    }}
                                                >
                                                    Pay Now
                                                </Button>
                                                <Button
                                                    className="z-10 flex-1 sm:w-auto h-9 px-3 text-sm" // Smaller button size
                                                    onClick={() => {
                                                        console.log('hello')
                                                        setSelectedLoan(loan)
                                                        loanDetailsState.onOpenChange(
                                                            true
                                                        )
                                                    }}
                                                    variant={'outline'}
                                                >
                                                    Details
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}

                            {/* Loan Products */}
                            <div className="grid hidden grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {loanProducts.map((product) => {
                                    const Icon = product.icon
                                    return (
                                        <Card
                                            className="hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group border-2"
                                            key={product.id}
                                        >
                                            <CardContent className="p-6 text-center">
                                                <div className="w-14 h-14 rounded-xl bg-linear-to-br from-accent/10 to-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                                    <Icon className="h-7 w-7 text-primary" />
                                                </div>
                                                <h3 className="font-bold mb-2">
                                                    {product.name}
                                                </h3>
                                                <div className="space-y-1 mb-4">
                                                    <p className="text-xs text-muted-foreground">
                                                        Rate: {product.rate}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        Term: {product.term}
                                                    </p>
                                                </div>
                                                <Button
                                                    className="w-full"
                                                    size="sm"
                                                >
                                                    Apply Now
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    )
                                })}
                            </div>
                        </div>

                        <div>
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold">
                                    Upcoming Events
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Join our community activities and workshops
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {upcomingEvents.map((event) => {
                                    const Icon = event.icon
                                    const attendancePercentage =
                                        (event.attendees / event.maxAttendees) *
                                        100

                                    return (
                                        <Card
                                            className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group dark:border-background overflow-hidden"
                                            key={event.id}
                                        >
                                            <div className="h-2 bg-linear-to-r from-primary to-accent" />
                                            <CardContent className="p-6">
                                                <div className="flex items-start gap-4">
                                                    <div className="shrink-0">
                                                        <div className="w-16 h-16 rounded-xl bg-linear-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                            <Icon className="h-8 w-8 text-accent" />
                                                        </div>
                                                    </div>

                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                                                            {event.title}
                                                        </h3>
                                                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                                            {event.description}
                                                        </p>

                                                        <div className="space-y-2">
                                                            <div className="flex items-center gap-2 text-sm">
                                                                <Calendar className="h-4 w-4 text-primary" />
                                                                <span className="font-medium">
                                                                    {event.date}
                                                                </span>
                                                                <span className="text-muted-foreground">
                                                                    at{' '}
                                                                    {event.time}
                                                                </span>
                                                            </div>

                                                            <div className="flex items-center gap-2 text-sm">
                                                                <MapPin className="h-4 w-4 text-accent" />
                                                                <span className="text-muted-foreground">
                                                                    {
                                                                        event.location
                                                                    }
                                                                </span>
                                                            </div>

                                                            <div className="flex items-center gap-2 text-sm">
                                                                <Users className="h-4 w-4 text-muted-foreground" />
                                                                <span className="text-muted-foreground">
                                                                    {
                                                                        event.attendees
                                                                    }{' '}
                                                                    /{' '}
                                                                    {
                                                                        event.maxAttendees
                                                                    }{' '}
                                                                    registered
                                                                </span>
                                                            </div>

                                                            <div className="pt-2">
                                                                <div className="flex justify-between items-center mb-1">
                                                                    <span className="text-xs text-muted-foreground">
                                                                        Capacity
                                                                    </span>
                                                                    <span className="text-xs font-medium">
                                                                        {Math.round(
                                                                            attendancePercentage
                                                                        )}
                                                                        %
                                                                    </span>
                                                                </div>
                                                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                                                    <div
                                                                        className="h-full bg-linear-to-r from-primary to-accent transition-all duration-500"
                                                                        style={{
                                                                            width: `${attendancePercentage}%`,
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="mt-4 flex gap-2">
                                                            <Button
                                                                className="flex-1"
                                                                size="sm"
                                                            >
                                                                Register Now
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                            >
                                                                Details
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div>
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold">
                                    Quick Actions
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Common transactions at your fingertips
                                </p>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { icon: ArrowRightLeft, label: 'Transfer' },
                                    {
                                        icon: PhilippinePesoIcon,
                                        label: 'Deposit',
                                    },
                                    { icon: CreditCard, label: 'Bill Payment' },
                                    { icon: PiggyBank, label: 'Save More' },
                                ].map((action, idx) => {
                                    const Icon = action.icon
                                    return (
                                        <Button
                                            className="bg-linear-to-l from-primary/10 to-background border-background shadow-2xl dark:border-background h-24 hover:scale-105 hover:border-primary!  transition-all duration-300 group "
                                            key={idx}
                                            variant="outline"
                                        >
                                            <div className="flex flex-col items-center gap-2">
                                                <Icon
                                                    className=" size-7 text-primary group-hover:scale-110 transition-transform"
                                                    size="50"
                                                />
                                                <span className="text-sm">
                                                    {action.label}
                                                </span>
                                            </div>
                                        </Button>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    <div className="sticky top-6">
                        <div className="mb-6">
                            <h2 className="text-xl font-bold mb-2">
                                Koop Services
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Explore our ecosystem
                            </p>
                        </div>
                        <div className="space-y-2 grid-cols-4 grid gap-2 ">
                            {koopServices.map((service) => {
                                const Icon = service.icon
                                return (
                                    <button
                                        className="w-full text-left px-4 py-3 h-full rounded-lg border-2 hover:border-primary hover:bg-primary/5 transition-all duration-300 group flex flex-col items-center gap-3"
                                        key={service.name}
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-linear-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Icon
                                                className=" text-primary"
                                                size="30"
                                            />
                                        </div>
                                        <span className="text-sm font-medium">
                                            {service.name}
                                        </span>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>
                {/* KPI Cards Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-8">
                    {/* Total Portfolio Card */}
                    <Card className="dark:bg-background backdrop-blur-xl dark:border-background shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 relative overflow-hidden group">
                        {/* Background Glow/Hover Effect using Primary color */}
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total Portfolio
                            </CardTitle>
                            <Wallet className="h-5 w-5 text-primary" />
                        </CardHeader>
                        <CardContent className="relative">
                            <div className="text-3xl font-bold text-foreground mb-1">
                                ₱38,500
                            </div>
                            <div className="flex items-center gap-2">
                                {/* Success/Good Change Color */}
                                <div className="flex items-center text-green-500 dark:text-green-400 text-sm font-medium">
                                    <TrendingUp className="h-4 w-4 mr-1" />
                                    <span>12.5%</span>
                                </div>
                                <span className="text-muted-foreground text-xs">
                                    vs last month
                                </span>
                            </div>
                            {/* Progress Bar using Primary color */}
                            <div className="mt-3 h-1 w-full bg-muted rounded-full overflow-hidden">
                                <div className="h-full w-3/4 bg-primary rounded-full" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Monthly Growth Card */}
                    <Card className="dark:bg-background backdrop-blur-xl dark:border-background shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 relative overflow-hidden group">
                        {/* Background Glow/Hover Effect using Accent color (often used for secondary focus) */}
                        <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Monthly Growth
                            </CardTitle>
                            <Activity className="h-5 w-5 text-accent-foreground" />
                        </CardHeader>
                        <CardContent className="relative">
                            <div className="text-3xl font-bold text-foreground mb-1">
                                +₱4,500
                            </div>
                            <div className="flex items-center gap-2">
                                {/* Success/Good Change Color */}
                                <div className="flex items-center text-green-500 dark:text-green-400 text-sm font-medium">
                                    <ArrowUpRight className="h-4 w-4 mr-1" />
                                    <span>8.2%</span>
                                </div>
                                <span className="text-muted-foreground text-xs">
                                    growth rate
                                </span>
                            </div>
                            {/* Progress Bar using Accent color */}
                            <div className="mt-3 h-1 w-full bg-muted rounded-full overflow-hidden">
                                <div className="h-full w-4/5 bg-accent rounded-full" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Active Investments Card */}
                    <Card className="dark:bg-background backdrop-blur-xl dark:border-background shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 relative overflow-hidden group">
                        {/* Using destructive/warning color for a distinct hover/glow */}
                        <div className="absolute inset-0 bg-destructive/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Active Investments
                            </CardTitle>
                            <LucidePieChart className="h-5 w-5 text-destructive" />
                        </CardHeader>
                        <CardContent className="relative">
                            <div className="text-3xl font-bold text-foreground mb-1">
                                ₱11,550
                            </div>
                            <div className="flex items-center gap-2">
                                {/* Destructive/Warning Color */}
                                <div className="flex items-center text-destructive text-sm font-medium">
                                    <BarChart3 className="h-4 w-4 mr-1" />
                                    <span>30%</span>
                                </div>
                                <span className="text-muted-foreground text-xs">
                                    of portfolio
                                </span>
                            </div>
                            {/* Progress Bar using Destructive color */}
                            <div className="mt-3 h-1 w-full bg-muted rounded-full overflow-hidden">
                                <div className="h-full w-1/3 bg-destructive rounded-full" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Members Count Card (Using Warning/Custom Color for Differentiation) */}
                    <Card className="dark:bg-background backdrop-blur-xl dark:border-background shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 relative overflow-hidden group">
                        {/* Using the default input color as a soft hover accent for variety */}
                        <div className="absolute inset-0 bg-input/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Member Benefits
                            </CardTitle>
                            <Users className="h-5 w-5 text-primary/80" />
                        </CardHeader>
                        <CardContent className="relative">
                            <div className="text-3xl font-bold text-foreground mb-1">
                                Premium
                            </div>
                            <div className="flex items-center gap-2">
                                {/* Primary/Base Color */}
                                <div className="flex items-center text-primary text-sm font-medium">
                                    <PhilippinePesoIcon className="h-4 w-4 mr-1" />
                                    <span>₱350</span>
                                </div>
                                <span className="text-muted-foreground text-xs">
                                    monthly dividend
                                </span>
                            </div>
                            {/* Progress Bar using Primary/Base color */}
                            <div className="mt-3 h-1 w-full bg-muted rounded-full overflow-hidden">
                                <div className="h-full w-full bg-primary/80 rounded-full" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Performance Chart - Takes 2 columns */}
                    <Card className="lg:col-span-2 dark:bg-backgroundbackdrop-blur-xl border-background shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-br to-transparent" />
                        <CardHeader className="relative">
                            <CardTitle className="text-xl">
                                Performance Tracking
                            </CardTitle>
                            <CardDescription>
                                Your portfolio value over the last 12 months
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="relative">
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer height="100%" width="100%">
                                    <AreaChart data={performanceData}>
                                        <defs>
                                            <linearGradient
                                                id="colorValue"
                                                x1="0"
                                                x2="0"
                                                y1="0"
                                                y2="1"
                                            >
                                                <stop
                                                    offset="5%"
                                                    stopColor="#3b82f6"
                                                    stopOpacity={0.3}
                                                />
                                                <stop
                                                    offset="95%"
                                                    stopColor="#3b82f6"
                                                    stopOpacity={0}
                                                />
                                            </linearGradient>
                                        </defs>
                                        <XAxis
                                            dataKey="month"
                                            stroke="#64748b"
                                            style={{ fontSize: '12px' }}
                                        />
                                        <YAxis
                                            stroke="#64748b"
                                            style={{ fontSize: '12px' }}
                                            tickFormatter={(value) =>
                                                `${value / 1000}k`
                                            }
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor:
                                                    'rgba(15, 23, 42, 0.9)',
                                                border: '1px solid rgba(59, 130, 246, 0.3)',
                                                borderRadius: '12px',
                                                backdropFilter: 'blur(12px)',
                                            }}
                                            itemStyle={{ color: '#3b82f6' }}
                                            labelStyle={{ color: '#94a3b8' }}
                                        />
                                        <Area
                                            dataKey="value"
                                            fill="url(#colorValue)"
                                            filter="drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))"
                                            stroke="#3b82f6"
                                            strokeWidth={3}
                                            type="monotone"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Asset Allocation Donut Chart */}
                    <Card className="dark:bg-background backdrop-blur-xl border-background shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 to-transparent" />
                        <CardHeader className="relative">
                            <CardTitle className="text-xl ">
                                Asset Allocation
                            </CardTitle>
                            <CardDescription className="text-muted-foreground">
                                Portfolio distribution
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="relative">
                            <div className="h-[200px] w-full flex items-center justify-center">
                                <ResponsiveContainer height="100%" width="100%">
                                    <RePieChart>
                                        <Pie
                                            cx="50%"
                                            cy="50%"
                                            data={assetData}
                                            dataKey="value"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                        >
                                            {assetData.map((entry, index) => (
                                                <Cell
                                                    fill={entry.color}
                                                    key={`cell-₱{index}`}
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor:
                                                    'rgba(15, 23, 42, 0.9)',
                                                border: '1px solid rgba(59, 130, 246, 0.3)',
                                                borderRadius: '12px',
                                            }}
                                        />
                                    </RePieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="mt-4 space-y-2">
                                {assetData.map((asset) => (
                                    <div
                                        className="flex items-center justify-between"
                                        key={asset.name}
                                    >
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-3 h-3 rounded-full"
                                                style={{
                                                    backgroundColor:
                                                        asset.color,
                                                }}
                                            />
                                            <span className="text-sm ">
                                                {asset.name}
                                            </span>
                                        </div>
                                        <span className="text-sm font-medium ">
                                            {asset.value}%
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Transactions Table */}
                <Card className="dark:bg-background backdrop-blur-xl border-background shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 to-transparent" />
                    <CardHeader className="relative">
                        <CardTitle className="text-xl text-white">
                            Recent Transactions
                        </CardTitle>
                        <CardDescription className="400">
                            Your latest financial activity
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="relative">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-800">
                                        <th className="text-left py-3 px-4 text-sm font-medium 400">
                                            Type
                                        </th>
                                        <th className="text-left py-3 px-4 text-sm font-medium 400">
                                            Amount
                                        </th>
                                        <th className="text-left py-3 px-4 text-sm font-medium 400">
                                            Date
                                        </th>
                                        <th className="text-left py-3 px-4 text-sm font-medium 400">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentTransactions.map((transaction) => (
                                        <tr
                                            className="border-b border-background hover:bg-slate-800/30 transition-colors"
                                            key={transaction.id}
                                        >
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`w-8 h-8 rounded-lg flex items-center justify-center ₱{
                                                            transaction.amount >
                                                            0
                                                                ? 'bg-emerald-500/10 text-emerald-400'
                                                                : 'bg-red-500/10 text-red-400'
                                                        }`}
                                                    >
                                                        {transaction.amount >
                                                        0 ? (
                                                            <ArrowUpRight className="h-4 w-4" />
                                                        ) : (
                                                            <ArrowDownRight className="h-4 w-4" />
                                                        )}
                                                    </div>
                                                    <span className="text-sm ">
                                                        {transaction.type}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span
                                                    className={`text-sm font-medium ${
                                                        transaction.amount > 0
                                                            ? 'text-emerald-400'
                                                            : 'text-red-400'
                                                    }`}
                                                >
                                                    {transaction.amount > 0
                                                        ? '+'
                                                        : ''}
                                                    ₱
                                                    {Math.abs(
                                                        transaction.amount
                                                    ).toLocaleString()}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className="text-sm 400">
                                                    {transaction.date}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                        transaction.status ===
                                                        'Completed'
                                                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                                    }`}
                                                >
                                                    {transaction.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Dialog
                onOpenChange={loanDetailsState.onOpenChange}
                open={loanDetailsState.open}
            >
                <DialogContent className="w-fit! min-w-fit ecoop-scroll max-h-[85vh] overflow-y-auto">
                    {selectedLoan && (
                        <div className="space-y-4">
                            <div>
                                <DialogTitle className="text-xl font-bold flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-primary" />
                                    Loan Details
                                </DialogTitle>
                                <DialogDescription className="text-sm">
                                    Complete information about your{' '}
                                    {selectedLoan.type}
                                </DialogDescription>
                            </div>

                            {/* Status Banner */}
                            <Card className="bg-linear-to-br from-green-500/10 to-green-600/10 border-green-200">
                                <CardContent className="pt-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                            <Check className="h-5 w-5 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm text-green-900">
                                                Loan Status: Active & Current
                                            </p>
                                            <p className="text-xs text-green-700">
                                                Your account is in good standing
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Loan Information Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-base">
                                            Loan Information
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="flex justify-between py-1.5 border-b">
                                            <span className="text-xs text-muted-foreground">
                                                Loan Number
                                            </span>
                                            <span className="font-semibold text-sm">
                                                {selectedLoan.loanNumber}
                                            </span>
                                        </div>
                                        <div className="flex justify-between py-1.5 border-b">
                                            <span className="text-xs text-muted-foreground">
                                                Loan Type
                                            </span>
                                            <span className="font-semibold text-sm">
                                                {selectedLoan.type}
                                            </span>
                                        </div>
                                        <div className="flex justify-between py-1.5 border-b">
                                            <span className="text-xs text-muted-foreground">
                                                Original Amount
                                            </span>
                                            <span className="font-semibold text-sm">
                                                $
                                                {selectedLoan.originalAmount.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between py-1.5 border-b">
                                            <span className="text-xs text-muted-foreground">
                                                Outstanding Balance
                                            </span>
                                            <span className="font-semibold text-sm text-primary">
                                                $
                                                {selectedLoan.balance.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between py-1.5 border-b">
                                            <span className="text-xs text-muted-foreground">
                                                Interest Rate
                                            </span>
                                            <span className="font-semibold text-sm">
                                                {selectedLoan.interestRate}% per
                                                annum
                                            </span>
                                        </div>
                                        <div className="flex justify-between py-1.5">
                                            <span className="text-xs text-muted-foreground">
                                                Loan Term
                                            </span>
                                            <span className="font-semibold text-sm">
                                                {selectedLoan.term}
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-base">
                                            Payment Details
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="flex justify-between py-1.5 border-b">
                                            <span className="text-xs text-muted-foreground">
                                                Monthly Payment
                                            </span>
                                            <span className="font-semibold text-sm">
                                                $
                                                {selectedLoan.monthlyPayment.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between py-1.5 border-b">
                                            <span className="text-xs text-muted-foreground">
                                                Next Payment Due
                                            </span>
                                            <span className="font-semibold text-sm">
                                                $
                                                {selectedLoan.nextPayment.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between py-1.5 border-b">
                                            <span className="text-xs text-muted-foreground">
                                                Due Date
                                            </span>
                                            <span className="font-semibold text-sm">
                                                {selectedLoan.dueDate}
                                            </span>
                                        </div>
                                        <div className="flex justify-between py-1.5 border-b">
                                            <span className="text-xs text-muted-foreground">
                                                Payment Frequency
                                            </span>
                                            <span className="font-semibold text-sm">
                                                {selectedLoan.paymentFrequency}
                                            </span>
                                        </div>
                                        <div className="flex justify-between py-1.5 border-b">
                                            <span className="text-xs text-muted-foreground">
                                                Total Paid
                                            </span>
                                            <span className="font-semibold text-sm text-green-600">
                                                $
                                                {(
                                                    selectedLoan.originalAmount -
                                                    selectedLoan.balance
                                                ).toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between py-1.5">
                                            <span className="text-xs text-muted-foreground">
                                                Completion
                                            </span>
                                            <span className="font-semibold text-sm">
                                                {selectedLoan.progress}%
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-base">
                                            Timeline
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="flex justify-between py-1.5 border-b">
                                            <span className="text-xs text-muted-foreground">
                                                Disbursement Date
                                            </span>
                                            <span className="font-semibold text-sm">
                                                {selectedLoan.disbursementDate}
                                            </span>
                                        </div>
                                        <div className="flex justify-between py-1.5 border-b">
                                            <span className="text-xs text-muted-foreground">
                                                Maturity Date
                                            </span>
                                            <span className="font-semibold text-sm">
                                                {selectedLoan.maturityDate}
                                            </span>
                                        </div>
                                        <div className="flex justify-between py-1.5">
                                            <span className="text-xs text-muted-foreground">
                                                Payments Made
                                            </span>
                                            <span className="font-semibold text-sm">
                                                {
                                                    selectedLoan.paymentHistory
                                                        .length
                                                }{' '}
                                                payments
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-base">
                                            Additional Information
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="flex justify-between py-1.5 border-b">
                                            <span className="text-xs text-muted-foreground">
                                                Purpose
                                            </span>
                                            <span className="font-semibold text-sm">
                                                {selectedLoan.purpose}
                                            </span>
                                        </div>
                                        <div className="flex justify-between py-1.5 border-b">
                                            <span className="text-xs text-muted-foreground">
                                                Collateral
                                            </span>
                                            <span className="font-semibold text-sm">
                                                {selectedLoan.collateral}
                                            </span>
                                        </div>
                                        <div className="flex justify-between py-1.5">
                                            <span className="text-xs text-muted-foreground">
                                                Loan Officer
                                            </span>
                                            <span className="font-semibold text-sm">
                                                {selectedLoan.loanOfficer}
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Progress Bar */}
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base">
                                        Repayment Progress
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-muted-foreground">
                                                $
                                                {(
                                                    selectedLoan.originalAmount -
                                                    selectedLoan.balance
                                                ).toLocaleString()}{' '}
                                                paid
                                            </span>
                                            <span className="text-muted-foreground">
                                                $
                                                {selectedLoan.balance.toLocaleString()}{' '}
                                                remaining
                                            </span>
                                        </div>
                                        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                                            <div
                                                className="bg-linear-to-r from-primary to-accent h-full transition-all duration-300 rounded-full"
                                                style={{
                                                    width: `${selectedLoan.progress}%`,
                                                }}
                                            ></div>
                                        </div>
                                        <div className="text-center">
                                            <span className="text-xl font-bold text-primary">
                                                {selectedLoan.progress}%
                                            </span>
                                            <span className="text-xs text-muted-foreground ml-2">
                                                Complete
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                                <Button
                                    className="flex-1 text-sm"
                                    onClick={() => {
                                        loanDetailsState.onOpenChange(false)
                                        setPaymentAmount(
                                            selectedLoan.nextPayment.toString()
                                        )
                                        setIsPaymentFormModalOpen(true)
                                    }}
                                >
                                    Make a Payment
                                </Button>
                                <Button
                                    className="flex-1 bg-transparent text-sm"
                                    onClick={() => {
                                        loanDetailsState.onOpenChange(false)
                                        setIsLoanPaymentModalOpen(true)
                                    }}
                                    variant="outline"
                                >
                                    View Payment History
                                </Button>
                                <Button
                                    className="text-sm bg-transparent"
                                    variant="outline"
                                >
                                    Download Statement
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            <Dialog
                onOpenChange={setIsLoanPaymentModalOpen}
                open={isLoanPaymentModalOpen}
            >
                <DialogContent className="max-w-4xl max-h-[90vh] ecoop-scroll overflow-y-auto">
                    {selectedLoan && (
                        <div className="space-y-6">
                            {/* Header */}
                            <div>
                                <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                                    <Receipt className="h-6 w-6 text-primary" />
                                    Payment History - {selectedLoan.type}
                                </DialogTitle>
                                <DialogDescription>
                                    View your payment history and make new
                                    payments
                                </DialogDescription>
                            </div>

                            {/* Loan Summary Card */}
                            <Card className=" bg-background from-primary/5 to-accent/5 border-primary/50 border-[.5px]">
                                <CardContent className="p-2.5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1">
                                                Outstanding Balance
                                            </p>
                                            <p className="text-4xl font-bold text-primary">
                                                ₱
                                                {selectedLoan.balance.toLocaleString()}
                                            </p>
                                            <p className="text-sm text-muted-foreground mt-2">
                                                Next Payment: ₱
                                                {selectedLoan.nextPayment.toLocaleString()}{' '}
                                                • Due: {selectedLoan.dueDate}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                className="gap-2"
                                                onClick={() => {
                                                    setPaymentAmount(
                                                        selectedLoan.nextPayment.toString()
                                                    )
                                                    setIsPaymentFormModalOpen(
                                                        true
                                                    )
                                                }}
                                                size="lg"
                                            >
                                                <CreditCard className="h-4 w-4" />
                                                Make Payment
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Payment History */}
                            <div className="space-y-3">
                                <h3 className="font-semibold text-lg">
                                    Payment History
                                </h3>
                                {selectedLoan.paymentHistory.map((payment) => (
                                    <Card
                                        className="hover:shadow-md transition-shadow"
                                        key={payment.id}
                                    >
                                        <CardContent className="p-2.5">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                                            payment.status ===
                                                            'Paid'
                                                                ? 'bg-green-100 text-green-600'
                                                                : 'bg-yellow-100 text-yellow-600'
                                                        }`}
                                                    >
                                                        <Check className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <p className="font-semibold">
                                                                Payment
                                                            </p>
                                                            <Badge
                                                                variant={
                                                                    payment.status ===
                                                                    'Paid'
                                                                        ? 'default'
                                                                        : 'outline'
                                                                }
                                                            >
                                                                {payment.status}
                                                            </Badge>
                                                        </div>
                                                        <p className="text-xs text-muted-foreground mt-1">
                                                            Reference:{' '}
                                                            {
                                                                payment.referenceNumber
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-lg text-green-600">
                                                        ${payment.amount}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {payment.date}
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}

                                {selectedLoan.paymentHistory.length === 0 && (
                                    <div className="text-center py-12 text-muted-foreground">
                                        <Receipt className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                        <p>No payment history yet</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            <Dialog
                onOpenChange={setIsPaymentFormModalOpen}
                open={isPaymentFormModalOpen}
            >
                <DialogContent className="max-w-2xl">
                    {selectedLoan && (
                        <div className="space-y-6">
                            <div>
                                <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                                    <CreditCard className="h-6 w-6 text-primary" />
                                    Make a Payment
                                </DialogTitle>
                                <DialogDescription>
                                    Complete your loan payment securely
                                </DialogDescription>
                            </div>

                            {/* Loan Info Summary */}
                            <Card className="bg-linear-to-br from-primary/5 to-accent/5">
                                <CardContent className="pt-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-muted-foreground">
                                                Loan Type
                                            </p>
                                            <p className="font-semibold">
                                                {selectedLoan.type}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">
                                                Loan Number
                                            </p>
                                            <p className="font-semibold">
                                                {selectedLoan.loanNumber}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">
                                                Outstanding Balance
                                            </p>
                                            <p className="font-semibold text-primary">
                                                ₱
                                                {selectedLoan.balance.toLocaleString()}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">
                                                Due Date
                                            </p>
                                            <p className="font-semibold">
                                                {selectedLoan.dueDate}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Payment Form */}
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        Payment Amount
                                    </label>
                                    <div className="relative">
                                        <PhilippinePesoIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <input
                                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            onChange={(e) =>
                                                setPaymentAmount(e.target.value)
                                            }
                                            placeholder="Enter amount"
                                            type="number"
                                            value={paymentAmount}
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={() =>
                                                setPaymentAmount(
                                                    selectedLoan.nextPayment.toString()
                                                )
                                            }
                                            size="sm"
                                            variant="outline"
                                        >
                                            Minimum (${selectedLoan.nextPayment}
                                            )
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                setPaymentAmount(
                                                    (
                                                        selectedLoan.nextPayment *
                                                        2
                                                    ).toString()
                                                )
                                            }
                                            size="sm"
                                            variant="outline"
                                        >
                                            2x Payment
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                setPaymentAmount(
                                                    selectedLoan.balance.toString()
                                                )
                                            }
                                            size="sm"
                                            variant="outline"
                                        >
                                            Full Balance
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        Payment Method
                                    </label>
                                    <select
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        onChange={(e) =>
                                            setPaymentMethod(e.target.value)
                                        }
                                        value={paymentMethod}
                                    >
                                        <option value="online-banking">
                                            Online Banking
                                        </option>
                                        <option value="bank-transfer">
                                            Bank Transfer
                                        </option>
                                        <option value="wallet">
                                            Koop Wallet
                                        </option>
                                        <option value="debit-card">
                                            Debit Card
                                        </option>
                                        <option value="credit-card">
                                            Credit Card
                                        </option>
                                    </select>
                                </div>

                                {/* Payment Breakdown */}
                                <Card>
                                    <CardContent className="pt-4">
                                        <h4 className="font-semibold mb-3">
                                            Payment Breakdown
                                        </h4>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">
                                                    Principal Amount
                                                </span>
                                                <span className="font-medium">
                                                    ₱
                                                    {(
                                                        (Number.parseFloat(
                                                            paymentAmount
                                                        ) || 0) * 0.84
                                                    ).toFixed(2)}
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">
                                                    Interest Amount
                                                </span>
                                                <span className="font-medium">
                                                    ₱
                                                    {(
                                                        (Number.parseFloat(
                                                            paymentAmount
                                                        ) || 0) * 0.16
                                                    ).toFixed(2)}
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">
                                                    Processing Fee
                                                </span>
                                                <span className="font-medium">
                                                    ₱0.00
                                                </span>
                                            </div>
                                            <div className="border-t pt-2 mt-2">
                                                <div className="flex justify-between font-bold">
                                                    <span>Total Amount</span>
                                                    <span className="text-primary text-lg">
                                                        ₱
                                                        {(
                                                            Number.parseFloat(
                                                                paymentAmount
                                                            ) || 0
                                                        ).toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Terms and Conditions */}
                                <div className="flex items-start gap-2">
                                    <input
                                        className="mt-1"
                                        id="terms"
                                        type="checkbox"
                                    />
                                    <label
                                        className="text-xs text-muted-foreground"
                                        htmlFor="terms"
                                    >
                                        I agree to the terms and conditions and
                                        authorize the payment to be processed
                                        from my selected payment method
                                    </label>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    <Button
                                        className="flex-1"
                                        disabled={
                                            !paymentAmount ||
                                            Number.parseFloat(paymentAmount) <=
                                                0
                                        }
                                        size="lg"
                                    >
                                        Confirm Payment
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            setIsPaymentFormModalOpen(false)
                                        }
                                        size="lg"
                                        variant="outline"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
