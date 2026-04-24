import { createFileRoute } from '@tanstack/react-router'

import TermsPage from '@e-coop-monorepo/modules/home/pages/terms'

export const Route = createFileRoute('/(landing)/terms')({
    component: TermsPage,
})
