import { ITimeStamps, TEntityId } from '@e-coop-monorepo/shared/types'

export interface ICategory extends ITimeStamps {
    id: TEntityId
    name: string
    description?: string
}
