import {
    IBaseEntityMeta,
    IPaginatedResult,
    ITimeStamps,
    TCivilStatus,
    TEntityId,
    TGeneralStatus,
} from '@/types'

import { IMedia } from '../media'
import { TMemberAddressSchema } from '../member-address/member-address.validation'
import { TMemberGovernmentBenefitSchema } from '../member-government-benefit'
import { IMemberCenter } from './components/comboboxes/member-center-combobox'
import { IMemberClassification } from './components/comboboxes/member-classification-combobox'
import { IMemberGender } from './components/comboboxes/member-gender-combobox'
import { IMemberGroup } from './components/comboboxes/member-group-combobox'
import { IMemberOccupation } from './components/comboboxes/member-occupation-combobox'
import { IMemberType } from './components/comboboxes/member-type-combobox'
import { FAMILY_RELATIONSHIP } from './components/comboboxes/relationship-combobox'
import { EDUCATIONAL_ATTAINMENT } from './member-constant'
import {
    TMemberContactReferenceSchema,
    TMemberEducationalAttainmentSchema,
    TMemberExpenseSchema,
    TMemberIncomeSchema,
    TMemberProfileIdentitySchema,
    TQuickCreateMemberProfileSchema,
} from './member-profile.validation'

export interface IMemberDepartment {
    id: string
    name: string
    description?: string
}

export interface IMemberAsset extends IBaseEntityMeta {
    id: TEntityId
    member_profile_id: TEntityId

    media_url?: string

    name: string
    entry_date: string
    description?: string
    cost: number
}

export type TRelationship = (typeof FAMILY_RELATIONSHIP)[number] // move to member profile relative

export type TEducationalAttainment = (typeof EDUCATIONAL_ATTAINMENT)[number]

export interface IMemberEducationalAttainment {
    id?: TEntityId

    member_profile_id: TEntityId

    school_name?: string
    school_year?: number
    program_course?: string
    educational_attainment: TEducationalAttainment
    description?: string
}

export type IMemberGovernmentBenefitRequest = TMemberGovernmentBenefitSchema

export type IMemberExpenseRequest = TMemberExpenseSchema

// LATEST FROM ERD
export interface IMemberExpense extends IBaseEntityMeta {
    id: TEntityId
    member_profile_id: TEntityId

    name: string
    amount: number
    description?: string
}

export interface IMemberGovernmentBenefit extends ITimeStamps {
    id: TEntityId
    member_profile_id: TEntityId

    front_media_url: string

    back_media_url: string

    name: string
    country_code: string
    value?: string
    expiry_date?: string
    description: string
}

export interface IGovernmentId {
    name: string
    has_expiry_date: boolean

    field_name: string
    has_number: boolean

    regex: string
}

export interface IMemberIncome extends IBaseEntityMeta {
    id: TEntityId
    media_url?: string
    member_profile_id: TEntityId

    name: string
    amount: number
    release_date?: string
}

export type IMemberIncomeRequest = TMemberIncomeSchema

export interface IMemberAddress extends IBaseEntityMeta {
    id: TEntityId
    member_profile_id: TEntityId

    label: string
    address: string
    country_code: string

    city?: string
    postal_code?: string
    province_state?: string
    barangay?: string
    landmark?: string

    longitude?: number
    latitude?: number

    is_primary?: boolean
}

// LATEST FROM ERD
export type IMemberAddressRequest = TMemberAddressSchema

export interface IMemberContactReference extends IBaseEntityMeta {
    id: TEntityId

    member_profile_id: TEntityId

    name: string
    description?: string
    contact_number: string
}

export type IMemberContactReferenceRequest = TMemberContactReferenceSchema

export interface IMemberJointAccount extends IBaseEntityMeta {
    id: TEntityId

    member_profile_id: TEntityId

    picture_media_url: string

    signature_media_url: string

    description?: string

    first_name: string
    middle_name?: string
    last_name: string
    full_name: string
    suffix?: string

    birthday: string
    family_relationship: TRelationship
}

export interface IMemberRelativeAccount extends IBaseEntityMeta {
    id: TEntityId

    full_name: string
    member_profile_id: TEntityId

    relative_member_profile_id: TEntityId

    family_relationship: TRelationship
    description: string
}

export interface IMemberProfile extends IBaseEntityMeta {
    // FOR AUTH
    key: string
    password: string

    // MEMBER PROFILE
    id: TEntityId

    signature_media_id?: TEntityId
    signature_media?: IMedia

    media_id?: TEntityId
    media?: IMedia

    member_type?: IMemberType
    member_group?: IMemberGroup
    member_gender: IMemberGender
    member_center?: IMemberCenter
    member_department?: IMemberDepartment

    member_occupation?: IMemberOccupation
    member_classification?: IMemberClassification

    is_closed: boolean
    is_mutual_fund_member: boolean
    is_micro_finance_member: boolean

    first_name: string
    middle_name?: string
    last_name: string
    full_name: string
    suffix?: string
    birthdate?: string
    birth_place?: string
    status: TGeneralStatus

    description?: string
    notes?: string
    contact_number: string
    old_reference_id?: string // OLD PB NUMBER

    passbook?: string
    occupation?: string

    business_address?: string
    business_contact_number?: string
    civil_status: TCivilStatus

    // qr_code: IQrScanResult<string, 'member-qr'>

    member_educational_attainments?: IMemberEducationalAttainment[]

    member_assets?: IMemberAsset[]
    member_incomes?: IMemberIncome[]
    member_addresses?: IMemberAddress[]
    member_expenses?: IMemberExpense[]
    member_joint_accounts?: IMemberJointAccount[]
    member_relative_accounts?: IMemberRelativeAccount[]
    member_government_benefits?: IMemberGovernmentBenefit[]
    member_contact_references?: IMemberContactReference[]
    longitude?: number
    latitude?: number
    profile_picture_url: string
}

// export type IMemberProfileRequest = z.infer<typeof MemberProfileSchema>

export type IQuickCreateMemberProfile = TQuickCreateMemberProfileSchema

export type IMemberpRofileIdentityRequest = TMemberProfileIdentitySchema

export type IMemberProfileEducationalAttainmentRequest =
    TMemberEducationalAttainmentSchema

export interface IMemberProfilePaginated extends IPaginatedResult<IMemberProfile> {}

///

// THIS IS ONLY USE FOR MEMBER PROFILE UPDATE
// 📌 Identity & Personal Info
export interface IMemberProfilePersonalInfoRequest {
    first_name: string
    middle_name?: string
    last_name: string
    full_name?: string
    suffix?: string
    member_gender_id?: TEntityId
    birthdate?: string
    contact_number?: string
    business_contact_number?: string

    birth_place?: string // ISO ALPHA-3

    civil_status: TCivilStatus

    occupation_id?: TEntityId

    business_address?: string
    business_contact?: string

    notes?: string
    description?: string
}
