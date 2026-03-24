import { createFileRoute } from '@tanstack/react-router'

import AboutPage from '@/modules/home/pages/about'

export const Route = createFileRoute('/(home)/about')({
    component: AboutPage,
})
