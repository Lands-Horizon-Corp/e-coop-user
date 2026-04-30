import type { IAccount } from '@e-coop-monorepo/modules/account'
import type { IBranch } from '@e-coop-monorepo/modules/branch'
import type { IMemberPassbookSettings } from '@e-coop-monorepo/modules/branch-settings'
import type { IMedia } from '@e-coop-monorepo/modules/media'
import type {
    IMemberAddress,
    IMemberAddressRequest,
} from '@e-coop-monorepo/modules/member-address'
import type {
    IMemberAsset,
    IMemberAssetRequest,
} from '@e-coop-monorepo/modules/member-asset'
import type { IMemberCenter } from '@e-coop-monorepo/modules/member-center'
import type { IMemberClassification } from '@e-coop-monorepo/modules/member-classification'
import type {
    IMemberCloseRemark,
    IMemberCloseRemarkRequest,
} from '@e-coop-monorepo/modules/member-close-remark'
import type {
    IMemberContactReference,
    IMemberContactReferenceRequest,
} from '@e-coop-monorepo/modules/member-contact-reference'
import type { IMemberDepartment } from '@e-coop-monorepo/modules/member-department'
import type { IMemberDescriptionRequest } from '@e-coop-monorepo/modules/member-description-schema'
import type { IMemberEducationalAttainment } from '@e-coop-monorepo/modules/member-educational-attainment'
import type {
    IMemberExpense,
    IMemberExpenseRequest,
} from '@e-coop-monorepo/modules/member-expense'
import type { IMemberGender } from '@e-coop-monorepo/modules/member-gender'
import type {
    IMemberGovernmentBenefit,
    IMemberGovernmentBenefitRequest,
} from '@e-coop-monorepo/modules/member-government-benefit'
import type { IMemberGroup } from '@e-coop-monorepo/modules/member-group'
import type { IMemberIncome } from '@e-coop-monorepo/modules/member-income'
import type {
    IMemberJointAccount,
    IMemberJointAccountRequest,
} from '@e-coop-monorepo/modules/member-joint-account'
import type { IMemberOccupation } from '@e-coop-monorepo/modules/member-occupation'
// import { IMemberRecruitedMembers } from '@e-coop-monorepo/modules/member-recruits'
import type {
    IMemberRelativeAccount,
    IMemberRelativeAccountRequest,
} from '@e-coop-monorepo/modules/member-relative-account'
import type { IMemberType } from '@e-coop-monorepo/modules/member-type'
import type { IOrganization } from '@e-coop-monorepo/modules/organization'
import type { IQrScanResult } from '@e-coop-monorepo/modules/qr-crypto'
import type { IUserBase } from '@e-coop-monorepo/modules/user'
import type { TSex } from '@e-coop-monorepo/shared/constants'
import type {
    IAuditable,
    IPaginatedResult,
    ITimeStamps,
    TCivilStatus,
    TEntityId,
    TGeneralStatus,
} from '@e-coop-monorepo/shared/types'

import type {
    TMemberProfileMembershipInfoSchema,
    TMemberProfilePersonalInfoSchema,
    TQuickCreateMemberProfileSchema,
} from './member-profile.validation'

// Mini Create Only use for quick creation of member profile
// Ideal because of ease of creation
// Should Only use by employee
export type IMemberProfileQuickCreateRequest = TQuickCreateMemberProfileSchema

export interface IMemberProfileRequest {
    id?: TEntityId
    oldReferenceId?: string
    passbookNumber?: string

    firstName: string
    middleName?: string
    lastName: string
    suffix?: string

    notes: string
    description: string
    contactNumber: string
    civilStatus: TCivilStatus
    occupationId?: TEntityId
    businessAddress?: string
    businessContact?: string

    birth_place?: string // ISO ALPHA-3

    status: TGeneralStatus
    isClosed: boolean

    isMutualFundMember: boolean
    isMicroFinanceMember: boolean

    mediaId?: TEntityId
    media?: IMedia //This is just for form media display, not actually needed in backend

    memberId?: TEntityId
    branchId?: TEntityId
    memberTypeId?: TEntityId
    memberGenderId?: TEntityId
    memberCenterId?: TEntityId
    memberClassificationId?: TEntityId
    memberEducationalAttainmentId?: TEntityId

    memberIncome?: IMemberIncomeRequest[]
    memberAssets?: IMemberAssetRequest[]
    member_address: IMemberAddressRequest[]
    memberExpenses?: IMemberExpenseRequest[]
    memberDescriptions?: IMemberDescriptionRequest[]
    memberCloseRemarks?: IMemberCloseRemarkRequest[]
    memberJointAccounts?: IMemberJointAccountRequest[]
    memberRelativeAccounts?: IMemberRelativeAccountRequest[]
    memberGovernmentBenefits?: IMemberGovernmentBenefitRequest[]
    memberContactNumberReferences: IMemberContactReferenceRequest[]
}

export interface IMemberProfile extends ITimeStamps, IAuditable {
    id: TEntityId

    branch_id: TEntityId
    branch: IBranch

    organization_id: TEntityId
    organization: IOrganization

    user_id?: TEntityId
    user?: IUserBase

    media_id?: TEntityId
    media?: IMedia

    signature_id?: TEntityId
    signature?: IMedia

    member_type_id?: TEntityId
    member_type?: IMemberType

    member_group_id: TEntityId
    member_group: IMemberGroup

    member_gender_id: TEntityId
    member_gender: IMemberGender

    member_center_id: TEntityId
    member_center: IMemberCenter

    signature_media_id: TEntityId
    signature_media: IMedia

    member_occupation_id: TEntityId
    member_occupation: IMemberOccupation

    member_classification_id: TEntityId
    member_classification: IMemberClassification

    member_verified_by_employee_user_id: TEntityId
    member_verified_by_employee_user: IUserBase

    member_department_id?: TEntityId
    member_department?: IMemberDepartment

    recruited_by_member_profile_id: TEntityId
    recruited_by_member_profile: IMemberProfile

    account_wallet_id: TEntityId
    account_wallet: IAccount

    is_closed: boolean
    is_mutual_fund_member: boolean
    is_micro_finance_member: boolean

    first_name: string
    middle_name?: string
    last_name: string
    full_name: string
    suffix?: string
    birthdate?: string
    status: TGeneralStatus

    description: string
    notes: string
    contact_number: string
    old_reference_id: string // OLD PB NUMBER

    passbook: string
    occupation: string

    business_address: string
    business_contact_number: string
    civil_status: TCivilStatus

    qr_code: IQrScanResult<string, 'member-qr'>

    sex: TSex
    // occupationId?: TEntityId

    // memberEducationalAttainmentId?: TEntityId
    member_educational_attainments?: IMemberEducationalAttainment[]

    recruited_members?: IMemberProfile[]

    member_assets?: IMemberAsset[]
    member_incomes?: IMemberIncome[]
    // memberWallets?: IMemberWallet[] // ano to desu
    member_addresses?: IMemberAddress[]
    member_expenses?: IMemberExpense[]
    // memberDescriptions?: IMemberDescription[]
    member_close_remarks?: IMemberCloseRemark[]
    member_joint_accounts?: IMemberJointAccount[]
    member_relative_accounts?: IMemberRelativeAccount[]
    member_government_benefits?: IMemberGovernmentBenefit[]
    // memberMutualFundsHistory?: IMemberMutualFundsHistory[]
    member_contact_references?: IMemberContactReference[]

    longitude?: number
    latitude?: number
}

export type IMemberProfilePaginated = IPaginatedResult<IMemberProfile>

export type IMemberProfilePicker = Pick<
    IMemberProfile,
    'id' | 'old_reference_id' | 'passbook' | 'notes' | 'description'
>

export interface IMemberIncomeRequest {
    id?: TEntityId

    member_profile_id: TEntityId
    media_id?: TEntityId
    branch_id?: TEntityId

    name: string
    amount: number
    release_date: string
}

// THIS IS ONLY USE FOR MEMBER PROFILE UPDATE
// 📌 Identity & Personal Info
// export interface IMemberProfilePersonalInfoRequest {
//     first_name: string
//     middle_name?: string
//     last_name: string
//     full_name?: string
//     suffix?: string
//     member_gender_id?: TEntityId
//     birthdate?: string
//     contact_number?: string
//     business_contact_number?: string

//     birth_place?: string // ISO ALPHA-3

//     civil_status: TCivilStatus

//     occupation_id?: TEntityId

//     business_address?: string
//     business_contact?: string

//     member_address?: IMemberAddressRequest[]

//     notes?: string
//     description?: string
// }

export type IMemberProfilePersonalInfoRequest = TMemberProfilePersonalInfoSchema

// 🏛️ Membership Info
export type IMemberProfileMembershipInfoRequest =
    TMemberProfileMembershipInfoSchema

export interface IMemberProfileAccountRequest {
    user_id?: TEntityId
}

export interface IMemberProfileMediasRequest {
    media_id?: TEntityId
    signature_media_id?: TEntityId
}

export type IMemberTypeMock = {
    id: string
    prefix: string
    name: string
    description: string
}
export interface IMemberTypeCountResponse {
    member_type_id: TEntityId
    member_type: IMemberTypeMock
    count: number
}
export interface IMemberProfileDashboardSummaryResponse {
    total_members: number
    total_male_members: number
    total_female_members: number
    member_type_counts: IMemberTypeCountResponse[]
}

export type TMemberPassbookGenerateSettings = Omit<
    IMemberPassbookSettings,
    'check_voucher_general_or_unique'
> &
    Omit<IMemberPassbookSettings, 'member_profile_passbook_or_unique'>

export interface IMemberProfileQuickSearchResponse {
    id: string
    full_name: string
    media?: IMedia
}
