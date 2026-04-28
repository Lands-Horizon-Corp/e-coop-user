import { APP_VERSION } from './envs'

export type TSoftwareUpdateEntryStatus = 'general' | 'bug' | 'feature'

export interface SoftwareUpdates {
    name: string
    version: string
    description: string
    date: Date
    updates: SoftwareUpdateEntry[]
}

export interface SoftwareUpdateEntry {
    text: string
    updateStatus: TSoftwareUpdateEntryStatus
    Icon?: 'plant' | 'bug'
}

export const softwareUpdates: SoftwareUpdates = {
    name: 'e-Coop Beta',
    version: `v${APP_VERSION}`,
    description: 'Updated version with performance improvements.',
    date: new Date('2024-09-15'),
    updates: [
        {
            text: 'Improved loading times by optimizing database queries.',
            updateStatus: 'general',
            Icon: 'plant',
        },
        {
            text: 'Resolved a bug in the reporting feature.',
            updateStatus: 'bug',
            Icon: 'bug',
        },
    ],
}
