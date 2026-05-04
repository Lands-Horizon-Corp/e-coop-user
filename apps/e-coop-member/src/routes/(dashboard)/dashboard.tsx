import { createFileRoute } from '@tanstack/react-router'

import DashboardPage from '@ecoop/domains/analytics'

export const Route = createFileRoute('/(dashboard)/dashboard')({
    component: DashboardPage,
})
