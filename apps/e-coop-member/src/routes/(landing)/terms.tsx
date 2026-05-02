import { createFileRoute } from '@tanstack/react-router'

import TermsPage from '@ecoop/modules/home/pages/terms'

export const Route = createFileRoute('/(landing)/terms')({
    component: TermsPage,
})
