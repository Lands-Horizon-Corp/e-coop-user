import { Outlet, createFileRoute } from '@tanstack/react-router'

// import { FlickeringGrid } from '@ecoop/ui/core'
// import LandingFooter from '@ecoop/modules/home/pages/footer'

import AuthNav from '@ecoop/ui/core'

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
