import type { ITimeStamps, TEntityId } from '@e-coop-monorepo/shared/types'

export interface IContactUsRequest {
    id?: TEntityId
    first_name: string
    last_name?: string
    email?: string
    contact_number?: string
    description: string
}

export interface IContactUs extends ITimeStamps {
    id: TEntityId
    first_name: string
    last_name?: string
    email?: string
    contact_number?: string
    description: string
}
