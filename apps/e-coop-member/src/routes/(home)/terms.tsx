import { createFileRoute } from '@tanstack/react-router'

import TermsPage from '@/modules/home/pages/terms'

export const Route = createFileRoute('/(home)/terms')({
    component: TermsPage,
})
