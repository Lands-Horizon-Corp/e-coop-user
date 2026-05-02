import { createFileRoute } from '@tanstack/react-router'

import Home from '@ecoop/modules/home'

export const Route = createFileRoute('/(landing)/')({
    component: () => <Home />,
})
