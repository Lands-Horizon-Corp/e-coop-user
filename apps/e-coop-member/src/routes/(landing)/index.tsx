import { createFileRoute } from '@tanstack/react-router'

import Home from '@e-coop-monorepo/modules/home'

export const Route = createFileRoute('/(landing)/')({
    component: () => <Home />,
})
