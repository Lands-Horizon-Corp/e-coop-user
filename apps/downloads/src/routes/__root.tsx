import { Outlet, createRootRoute } from '@tanstack/react-router'
import logo from '../assets/logo.png'
import Navbar from '../components/Navbar'
import Footer from '../components/sections/Footer'
import AuroraBackground from '../components/effects/AuroraBackground'
import ParticlesBackground from '../components/effects/ParticlesBackground'
import ScrollProgress from '../components/effects/ScrollProgress'

export const Route = createRootRoute({
    component: RootComponent,
})

function RootComponent() {
    return (
        <div className="relative min-h-screen text-white bg-[#0a0a0a] overflow-x-hidden">
            {/* Scroll progress indicator */}
            <ScrollProgress />
            
            {/* Aurora background */}
            <AuroraBackground />
            
            {/* Particle overlay */}
            <ParticlesBackground />

            {/* Main content */}
            <div className="relative z-10">
                {/* Navbar */}
                <Navbar logo={logo} />

                {/* Page content */}
                <main>
                    <Outlet />
                </main>

                {/* Footer */}
                <Footer logo={logo} />
            </div>
        </div>
    )
}
