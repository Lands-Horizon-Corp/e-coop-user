export const LOAN_CONFIG = {
    MIN_AMOUNT: 5000,
    MAX_AMOUNT: 500000,
    SUGGESTED_AMOUNT: 50000,
    TERM_OPTIONS: [3, 6, 12, 18, 24, 36] as const,
    DEFAULT_TERM: 12,
} as const

export const LOAN_ACCOUNTS = [
    {
        id: 'regular-loan',
        name: 'Regular Loan',
        description:
            'Standard loan with flexible terms and competitive rates for everyday needs.',
        interestRate: 1.5,
    },
    {
        id: 'emergency-loan',
        name: 'Emergency Loan',
        description:
            'Quick access funds for urgent financial needs with expedited processing.',
        interestRate: 2.0,
    },
    {
        id: 'educational-loan',
        name: 'Educational Loan',
        description:
            'Support your learning journey with special rates for educational expenses.',
        interestRate: 1.0,
    },
    {
        id: 'housing-loan',
        name: 'Housing Loan',
        description:
            'Finance your dream home with extended terms and lower interest rates.',
        interestRate: 0.75,
    },
] as const

export const COLLECTOR_TYPES = [
    {
        id: 'field',
        label: 'Field Collection',
        description: 'Collector visits your location',
    },
    {
        id: 'office',
        label: 'Office Payment',
        description: 'Pay at our office branch',
    },
] as const

export type LoanAccountId = (typeof LOAN_ACCOUNTS)[number]['id']
export type CollectorType = (typeof COLLECTOR_TYPES)[number]['id']
