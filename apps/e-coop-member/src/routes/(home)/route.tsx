import { Outlet } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'

import LandingFooter from '@/modules/home/pages/footer'

import LandingNav from '@/components/nav/navs/landing-nav'

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

export const Route = createFileRoute('/(home)')({
    component: PublicLayout,
})
