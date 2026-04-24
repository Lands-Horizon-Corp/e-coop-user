import { Outlet } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'

import LandingFooter from '@e-coop-monorepo/modules/home/pages/footer'
import LandingNav from '@e-coop-monorepo/ui/components/nav/navs/landing-nav'

const PublicLayout = () => {
    return (
        <>
            <LandingNav />
            <main>
                <Outlet />
                <LandingFooter />
            </main>
        </>
    )
}

export const Route = createFileRoute('/(landing)')({
    component: PublicLayout,
})
