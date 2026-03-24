import { createFileRoute } from '@tanstack/react-router'

import LoanApplicationCompletePage from '@/modules/loan-transaction/components/pages/loan-application-complete-page'

export const Route = createFileRoute(
    '/(private)/(loan)/loan-application-complete'
)({
    component: LoanApplicationCompletePage,
})
