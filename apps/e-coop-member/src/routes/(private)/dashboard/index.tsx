import { createFileRoute } from '@tanstack/react-router'

import DashboardPage from '@/modules/dashboard/organization'

export const Route = createFileRoute('/(private)/dashboard/')({
    component: DashboardPage,
})
