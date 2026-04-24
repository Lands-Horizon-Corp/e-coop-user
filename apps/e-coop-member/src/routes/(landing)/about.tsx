import { createFileRoute } from '@tanstack/react-router'

import AboutPage from '@e-coop-monorepo/modules/home/pages/about'

export const Route = createFileRoute('/(landing)/about')({
    component: AboutPage,
})
