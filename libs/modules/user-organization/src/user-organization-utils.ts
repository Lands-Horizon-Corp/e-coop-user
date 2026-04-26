import { useAuthStore } from '@e-coop-monorepo/modules/authentication'

export const getTimeMachineValue = () => {
    return (
        useAuthStore.getState().currentAuth.user_organization
            ?.time_machine_time || new Date()
    )
}
