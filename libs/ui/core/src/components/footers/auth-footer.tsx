import { EcoopLogo } from '@e-coop-monorepo/ui/core'

const AuthFooter = () => {
    return (
        <footer className="flex items-center justify-center gap-x-1 py-4 text-sm backdrop-blur-sm">
            <EcoopLogo className="size-6" />
            <p className="text-foreground/40">
                Copyright © 2025-2026 lands horizon. All rights reserved.
            </p>
        </footer>
    )
}

export default AuthFooter
