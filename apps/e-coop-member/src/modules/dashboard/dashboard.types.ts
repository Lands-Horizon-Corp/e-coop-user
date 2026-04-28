export type Transaction = {
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
