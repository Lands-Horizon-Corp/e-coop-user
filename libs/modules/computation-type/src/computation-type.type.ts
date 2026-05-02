import type {
    IPaginatedResult,
    ITimeStamps,
    TEntityId,
} from '@ecoop/shared/types'

export interface IAccountsComputationTypeRequest {
    id: TEntityId
    companyId: TEntityId
    name: string
    description: string
}

export interface IAccountsComputationType extends ITimeStamps {
    id: TEntityId
    companyId: TEntityId
    name: string
    description: string
    createdBy: TEntityId
    updatedBy: TEntityId
}

export type IAccountsComputationTypePaginated =
    IPaginatedResult<IAccountsComputationType>
