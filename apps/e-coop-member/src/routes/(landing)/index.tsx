import { createFileRoute } from '@tanstack/react-router'

import Home from '@/modules/home/pages/home'

export const Route = createFileRoute('/(landing)/')({
    component: () => <Home />,
})
