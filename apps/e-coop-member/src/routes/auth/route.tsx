import { Outlet, createFileRoute } from '@tanstack/react-router'

import GuestGuard from '@/modules/auth/components/guest-guard'

// import { FlickeringGrid } from '@/components/backgrounds/flickering-grid'
// import LandingFooter from '@/modules/home/pages/footer'

import AuthNav from '@/components/nav/navs/auth-nav'

const AuthLayout = () => {
    return (
        <GuestGuard allowAuthenticatedUser={false}>
            <AuthNav />
            <main>
                {/* <FlickeringGrid
                    flickerChance={0.05}
                    gridGap={1}
                    maxOpacity={0.5}
                    squareSize={64}
                /> */}
                <Outlet />
                {/* <LandingFooter /> */}
            </main>
        </GuestGuard>
    )
}

export const Route = createFileRoute('/auth')({
    component: AuthLayout,
})
