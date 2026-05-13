import type { IUserProfileInactivitySettings } from '@ecoop/domains/iam/models'
import { create } from 'zustand'

type userActivityState = 'active' | 'inactive'

interface IInactivityStore {
    inactivityConfig: IUserProfileInactivitySettings
    setInactivityConfig: (config: IUserProfileInactivitySettings) => void

    userActivityState: userActivityState
    setUserActivityState: (state: userActivityState) => void

    handleRestartActivityTracking: () => void
    setHandleRestartActivityTracking: (
        handleRestartActivityFn: () => void
    ) => void
}

export const useInactivityStore = create<IInactivityStore>((set) => ({
    inactivityConfig: {
        timeUnit: 'minutes',
        enabled: false,
        duration: 1,
    },
    setInactivityConfig: (config) => set({ inactivityConfig: config }),

    userActivityState: 'active',
    setUserActivityState: (state) => set({ userActivityState: state }),

    handleRestartActivityTracking: () => {},
    setHandleRestartActivityTracking: (restartFn) =>
        set({ handleRestartActivityTracking: restartFn }),
}))
