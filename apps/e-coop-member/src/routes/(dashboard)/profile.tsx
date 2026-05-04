import { createFileRoute } from '@tanstack/react-router'

import MemberProfileSettingsPage from '@ecoop/domains/member-crm'

export const Route = createFileRoute('/(dashboard)/profile')({
    component: MemberProfileSettingsPage,
})
