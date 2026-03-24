import { createFileRoute } from '@tanstack/react-router'

import Organization from '../../modules/organization/pages/index'

export const Route = createFileRoute('/(home)/')({
    component: Organization,
})
