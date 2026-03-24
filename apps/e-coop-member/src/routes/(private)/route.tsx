import { Outlet } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'

import AuthGuard from '@/modules/auth/components/auth-guard'
import LandingFooter from '@/modules/home/pages/footer'

import UserNav from '@/components/nav/navs/user-nav'

const OrganizationLayout = () => {
    return (
        <AuthGuard pageType="AUTHENTICATED">
            <UserNav className="py-4 sticky top-0" />
            <main className="m-auto w-[80%]">
                <Outlet />
                <LandingFooter />
            </main>
        </AuthGuard>
    )
}

export const Route = createFileRoute('/(private)')({
    component: OrganizationLayout,
})
