import { createFileRoute } from '@tanstack/react-router'

import ContactPage from '@ecoop/modules/home/pages/contact-us'

export const Route = createFileRoute('/(landing)/contact-us')({
    component: ContactPage,
})
