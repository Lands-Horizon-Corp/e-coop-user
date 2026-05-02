import { Outlet } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'

import AuthGuard from '@ecoop/modules/auth/components/auth-guard'
import LandingFooter from '@ecoop/modules/home/pages/footer'
import UserNav from '@ecoop/ui/core'

const DashboardLayout = () => {
    return (
        <AuthGuard pageType="AUTHENTICATED">
            <UserNav className="py-4 sticky top-0" />
            <main>
                <Outlet />
                <LandingFooter />
            </main>
        </AuthGuard>
    )
}

export const Route = createFileRoute('/(dashboard)')({
    component: DashboardLayout,
})
