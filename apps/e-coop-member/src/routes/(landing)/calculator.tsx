import { createFileRoute } from '@tanstack/react-router'

import LoanCalculator from '@ecoop/modules/home/pages/calculator'

export const Route = createFileRoute('/(landing)/calculator')({
    component: RouteComponent,
})

function RouteComponent() {
    return <LoanCalculator />
}
