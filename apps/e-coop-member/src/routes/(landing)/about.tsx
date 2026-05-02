import { createFileRoute } from '@tanstack/react-router'

import AboutPage from '@ecoop/modules/home/pages/about'

export const Route = createFileRoute('/(landing)/about')({
    component: AboutPage,
})
