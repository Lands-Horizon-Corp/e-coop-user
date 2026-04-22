import { createFileRoute } from '@tanstack/react-router'

import MemberProfileSettingsPage from '@/modules/member-profile/pages/member-profile-setting.page'

export const Route = createFileRoute('/(dashboard)/profile')({
    component: MemberProfileSettingsPage,
})
