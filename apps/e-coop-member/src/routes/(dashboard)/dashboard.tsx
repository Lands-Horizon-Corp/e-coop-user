import { createFileRoute } from '@tanstack/react-router'

import DashboardPage from '@ecoop/modules/dashboard'

export const Route = createFileRoute('/(dashboard)/dashboard')({
    component: DashboardPage,
})
