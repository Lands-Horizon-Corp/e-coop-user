import { createFileRoute } from '@tanstack/react-router'

import DashboardPage from '@e-coop-monorepo/modules/dashboard'

export const Route = createFileRoute('/(dashboard)/dashboard')({
    component: DashboardPage,
})
