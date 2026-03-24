import { createFileRoute } from '@tanstack/react-router'

import LoanApplicationPage from '@/modules/loan-transaction/components/pages/loan-application-page'

export const Route = createFileRoute('/(private)/(loan)/loan-application')({
    component: LoanApplicationPage,
})
