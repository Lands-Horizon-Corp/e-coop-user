import { createFileRoute } from '@tanstack/react-router'

import DashboardPage from '../../modules/dashboard/dashboard'

export const Route = createFileRoute('/(dashboard)/dashboard')({
    component: DashboardPage,
})
