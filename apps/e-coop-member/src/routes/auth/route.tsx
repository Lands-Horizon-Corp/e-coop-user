import { Outlet, createFileRoute } from '@tanstack/react-router'

// import { FlickeringGrid } from '@e-coop-monorepo/ui'
// import LandingFooter from '@e-coop-monorepo/modules/home/pages/footer'

import AuthNav from '@e-coop-monorepo/ui'

const AuthLayout = () => {
    return (
        <>
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
        </>
    )
}

export const Route = createFileRoute('/auth')({
    component: AuthLayout,
})
