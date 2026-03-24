import { createFileRoute } from '@tanstack/react-router'

import LoanCalculator from '@/modules/home/pages/calculator'

export const Route = createFileRoute('/(home)/calculator')({
    component: RouteComponent,
})

function RouteComponent() {
    return <LoanCalculator />
}
