import type { CIVIL_STATUS, GENERAL_STATUS } from '@ecoop/shared/constants'

export type TEntityId = string

export type TGeneralStatus = (typeof GENERAL_STATUS)[number]

export type TPageType = 'PUBLIC' | 'AUTHENTICATED'

export interface IUserRef {
    id: TEntityId
    full_name?: string
    user_name?: string
    email?: string
    contact_number?: string
}

export interface IOrganizationRef {
    id: TEntityId
    name?: string
    organization_key?: string
}

export interface IBranchRef {
    id: TEntityId
    name?: string
    code?: string
}

export interface ILongLat {
    longitude?: number
    latitude?: number
}

/* Extend interface if gusto magka ts type neto */
export interface IAuditable<TUser = IUserRef> {
    created_by_id?: TEntityId
    created_by?: TUser

    updated_by_id?: TEntityId
    updated_by?: TUser

    deleted_by_id?: TEntityId
    deleted_by?: TUser
}

/* Only use this for entity that has branch_id */
export interface IIDentity {
    branch_id: TEntityId
    // branch: IBranch
}

export interface IOrgIdentity<TOrg = IOrganizationRef> {
    organization_id: TEntityId
    organization: TOrg
}

/* Identity of the entity */
export interface IOrgBranchIdentity<
    TOrg = IOrganizationRef,
    TBranch = IBranchRef,
> {
    organization_id: TEntityId
    organization: TOrg

    branch_id: TEntityId
    branch: TBranch
}

/* Use this only if entity has timestamps, auditable, and has org and branch */
export interface IBaseEntityMeta<
    TUser = IUserRef,
    TOrg = IOrganizationRef,
    TBranch = IBranchRef,
>
    extends ITimeStamps, IAuditable<TUser>, IOrgBranchIdentity<TOrg, TBranch> {
    id: TEntityId
}

export interface ITimeStamps {
    deleted_at?: string | undefined
    created_at: string
    updated_at?: string
}

export type TCivilStatus = (typeof CIVIL_STATUS)[number] // move to member profile

export interface UdpateGeneralLedgerOrder {
    general_ledger_definition_id: TEntityId
    index: number
    general_ledger_definition_entries?: UpdateAccountOrder[]
    accounts: UpdateAccountOrder[]
}
export interface UpdateAccountOrder {
    account_id: TEntityId
    index: number
}
export interface UpdateIndexRequest {
    id: TEntityId
    index: number
}

export interface IPaginatedResult<T> {
    data: T[]
    pageIndex: number
    totalPage: number
    pageSize: number
    totalSize: number
}
