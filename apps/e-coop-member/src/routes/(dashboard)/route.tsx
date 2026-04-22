import { Outlet } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'

import AuthGuard from '@/modules/auth/components/auth-guard'
import LandingFooter from '@/modules/home/pages/footer'

import UserNav from '@e-coop-monorepo/ui/components/nav/navs/user-nav'

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
