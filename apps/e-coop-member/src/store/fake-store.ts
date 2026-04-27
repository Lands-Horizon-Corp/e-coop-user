import { IMemberProfile } from '@e-coop-monorepo/modules/member-profile'
import { TEntityId } from '@e-coop-monorepo/shared/types'
import { create } from 'zustand'

export interface IForgetPasswordEntry {
    id: TEntityId
    memberProfileId: TEntityId // id of user
    otp: string
}

interface IFakeStore {
    authMember: IFakeMemberProfile | null
    members: IFakeMemberProfile[]
    forgetPasswordRequest: IForgetPasswordEntry | null

    // actions
    setAuthMember: (member: IFakeMemberProfile | null) => void
    addMember: (member: IFakeMemberProfile) => void
    updateMember: (id: string, updated: Partial<IFakeMemberProfile>) => void
    removeMember: (id: string) => void

    setForgetPasswordRequest: (req: IForgetPasswordEntry | null) => void
}

type IFakeMemberProfile = Partial<IMemberProfile> & {
    key: string
}

type TOrganization = IMemberProfile['organization']
type TBranch = IMemberProfile['branch']
type TMedia = NonNullable<IMemberProfile['media']>

const now = new Date().toISOString()
const mockOrganization = { id: 'org-001' } as TOrganization
const mockBranch = { id: 'branch-001' } as TBranch

const baseEntityMeta = {
    organization_id: mockOrganization.id,
    organization: mockOrganization,
    branch_id: mockBranch.id,
    branch: mockBranch,
    created_at: now,
    updated_at: now,
}

const createMedia = (id: string, url: string): TMedia => ({
    id,
    file_name: 'mock-image',
    file_size: 0,
    file_type: 'image/jpeg',
    storage_key: id,
    bucket_name: 'mock',
    download_url: url,
    created_at: now,
    updated_at: now,
})

const createMemberProfileRef = (
    id: string,
    fullName = 'Unknown'
): IMemberProfile => ({ id, full_name: fullName }) as IMemberProfile

export const useFakeStore = create<IFakeStore>((set) => ({
    authMember: {
        key: 'zaldyco@gmail.com',
        password: 'Helloworld123',
        first_name: 'Zaldy',
        last_name: 'Co',
        suffix: 'Sr.',
        birth_place: 'PHL',
        contact_number: '+639999222222',
        birthdate: '2024-06-12T00:00:00.000Z',
        profile_picture_url:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnL4VfLzoaz2l7pnGodjh_yKlDhiDk5cNz3g&s',

        member_gender: {
            ...baseEntityMeta,
            id: 'male',
            name: 'Male',
            description: 'Male gender',
        },

        is_closed: false,
        civil_status: 'married',
        status: 'verified',
        is_mutual_fund_member: false,
        is_micro_finance_member: false,

        full_name: 'Zaldy  Co Sr.',
        id: '4958b013-f377-4077-8b14-d9edd16eb5cc',

        created_at: '2025-12-10T14:58:29.358Z',
        updated_at: '2025-12-10T14:58:29.358Z',

        member_educational_attainments: [
            {
                ...baseEntityMeta,
                id: 'educ-001',
                member_profile_id: '4958b013-f377-4077-8b14-d9edd16eb5cc',
                member_profile: createMemberProfileRef(
                    '4958b013-f377-4077-8b14-d9edd16eb5cc',
                    'Zaldy Co Sr.'
                ),
                school_name: 'University of the Philippines',
                school_year: 2004,
                program_course: 'BS Business Administration',
                educational_attainment: 'college graduate',
                description: 'Graduated with honors.',
            },
        ],

        member_incomes: [
            {
                ...baseEntityMeta,
                id: 'income-001',
                member_profile_id: '4958b013-f377-4077-8b14-d9edd16eb5cc',
                name: 'Business Profit',
                amount: 50000,
                release_date: '2025-01-10',
                media_id: 'media-income-001',
                media: createMedia(
                    'media-income-001',
                    'https://picsum.photos/200?random=111'
                ),
                created_at: '2025-12-10T14:58:29.358Z',
                updated_at: '2025-12-10T14:58:29.358Z',
            },
        ],

        member_expenses: [
            {
                ...baseEntityMeta,
                id: 'expense-001',
                member_profile_id: '4958b013-f377-4077-8b14-d9edd16eb5cc',
                member_profile: createMemberProfileRef(
                    '4958b013-f377-4077-8b14-d9edd16eb5cc',
                    'Zaldy Co Sr.'
                ),
                name: 'Business Supplies',
                amount: 10000,
                description: 'Monthly purchase of materials.',
                created_at: '2025-12-10T14:58:29.358Z',
                updated_at: '2025-12-10T14:58:29.358Z',
            },
        ],

        member_assets: [
            {
                ...baseEntityMeta,
                id: 'addr-001',
                member_profile_id: '4958b013-f377-4077-8b14-d9edd16eb5cc',
                member_profile: createMemberProfileRef(
                    '4958b013-f377-4077-8b14-d9edd16eb5cc',
                    'Zaldy Co Sr.'
                ),
                name: 'Airbnb Apartment',
                description: '123 Mabuhay St., Brgy. Pag-asa',

                cost: 14000,

                entry_date: '2025-12-10T14:58:29.358Z',
                created_at: '2025-12-10T14:58:29.358Z',
                updated_at: '2025-12-10T14:58:29.358Z',
            },
        ],

        member_addresses: [
            {
                ...baseEntityMeta,
                id: 'addr-001',
                label: 'House',
                address: '123 Mabuhay St., Brgy. Pag-asa',
                country_code: 'PH',

                city: 'Quezon City',
                postal_code: '1105',
                province_state: 'Metro Manila',
                barangay: 'Pag-asa',
                landmark: 'Near SM North EDSA',

                longitude: 121.0301,
                latitude: 14.6561,

                created_at: '2025-12-10T14:58:29.358Z',
                updated_at: '2025-12-10T14:58:29.358Z',
            },
        ],

        member_relative_accounts: [
            {
                ...baseEntityMeta,
                id: 'relative-001',
                member_profile_id: '4958b013-f377-4077-8b14-d9edd16eb5cc',
                member_profile: createMemberProfileRef(
                    '4958b013-f377-4077-8b14-d9edd16eb5cc',
                    'Zaldy Co Sr.'
                ),
                relative_member_profile_id: 'rel-001',
                relative_member_profile: createMemberProfileRef(
                    'rel-001',
                    'Carla Co'
                ),
                family_relationship: 'Daughter',
                description: 'Immediate family member.',
                created_at: '2025-12-10T14:58:29.358Z',
                updated_at: '2025-12-10T14:58:29.358Z',
            },
        ],

        member_government_benefits: [
            {
                ...baseEntityMeta,
                id: 'govbenefit-001',
                member_profile_id: '4958b013-f377-4077-8b14-d9edd16eb5cc',
                member_profile: createMemberProfileRef(
                    '4958b013-f377-4077-8b14-d9edd16eb5cc',
                    'Zaldy Co Sr.'
                ),

                front_media_id: 'media-gov-front-001',
                front_media: createMedia(
                    'media-gov-front-001',
                    'https://picsum.photos/200?random=401'
                ),
                back_media_id: 'media-gov-back-001',
                back_media: createMedia(
                    'media-gov-back-001',
                    'https://picsum.photos/200?random=402'
                ),

                name: 'PhilHealth ID',
                country_code: 'PH',
                value: '12-345678901-2',
                description: 'Official PhilHealth membership ID.',
                expiry_date: undefined, // (PhilHealth usually has no expiry)

                created_at: '2025-12-10T14:58:29.358Z',
                updated_at: '2025-12-10T14:58:29.358Z',
            },
            {
                ...baseEntityMeta,
                id: 'govbenefit-002',
                member_profile_id: '4958b013-f377-4077-8b14-d9edd16eb5cc',
                member_profile: createMemberProfileRef(
                    '4958b013-f377-4077-8b14-d9edd16eb5cc',
                    'Zaldy Co Sr.'
                ),

                front_media_id: 'media-gov-front-002',
                front_media: createMedia(
                    'media-gov-front-002',
                    'https://picsum.photos/200?random=403'
                ),
                back_media_id: 'media-gov-back-002',
                back_media: createMedia(
                    'media-gov-back-002',
                    'https://picsum.photos/200?random=404'
                ),

                name: 'National ID',
                country_code: 'PH',
                value: 'PHL-9988776655',
                expiry_date: '2030-01-01',
                description:
                    'Republic of the Philippines National Identification Card.',

                created_at: '2025-12-11T10:00:00.000Z',
                updated_at: '2025-12-11T10:00:00.000Z',
            },
        ],
    },
    members: [
        {
            key: 'zaldyco@gmail.com',
            password: 'Helloworld123',
            first_name: 'Zaldy',
            last_name: 'Co',
            suffix: 'Sr.',
            birth_place: 'PHL',
            contact_number: '+639999222222',
            birthdate: '2024-06-12T00:00:00.000Z',
            profile_picture_url:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnL4VfLzoaz2l7pnGodjh_yKlDhiDk5cNz3g&s',

            member_gender: {
                ...baseEntityMeta,
                id: 'male',
                name: 'Male',
                description: 'Male gender',
            },

            member_government_benefits: [
                {
                    ...baseEntityMeta,
                    id: 'govbenefit-001',
                    member_profile_id: '4958b013-f377-4077-8b14-d9edd16eb5cc',
                    member_profile: createMemberProfileRef(
                        '4958b013-f377-4077-8b14-d9edd16eb5cc',
                        'Zaldy Co Sr.'
                    ),

                    front_media_id: 'media-gov-front-001',
                    front_media: createMedia(
                        'media-gov-front-001',
                        'https://picsum.photos/200?random=401'
                    ),
                    back_media_id: 'media-gov-back-001',
                    back_media: createMedia(
                        'media-gov-back-001',
                        'https://picsum.photos/200?random=402'
                    ),

                    name: 'PhilHealth ID',
                    country_code: 'PH',
                    value: '12-345678901-2',
                    description: 'Official PhilHealth membership ID.',
                    expiry_date: undefined, // (PhilHealth usually has no expiry)

                    created_at: '2025-12-10T14:58:29.358Z',
                    updated_at: '2025-12-10T14:58:29.358Z',
                },
                {
                    ...baseEntityMeta,
                    id: 'govbenefit-002',
                    member_profile_id: '4958b013-f377-4077-8b14-d9edd16eb5cc',
                    member_profile: createMemberProfileRef(
                        '4958b013-f377-4077-8b14-d9edd16eb5cc',
                        'Zaldy Co Sr.'
                    ),

                    front_media_id: 'media-gov-front-002',
                    front_media: createMedia(
                        'media-gov-front-002',
                        'https://picsum.photos/200?random=403'
                    ),
                    back_media_id: 'media-gov-back-002',
                    back_media: createMedia(
                        'media-gov-back-002',
                        'https://picsum.photos/200?random=404'
                    ),

                    name: 'National ID',
                    country_code: 'PH',
                    value: 'PHL-9988776655',
                    expiry_date: '2030-01-01',
                    description:
                        'Republic of the Philippines National Identification Card.',

                    created_at: '2025-12-11T10:00:00.000Z',
                    updated_at: '2025-12-11T10:00:00.000Z',
                },
            ],

            member_assets: [
                {
                    ...baseEntityMeta,
                    id: 'addr-001',
                    member_profile_id: '4958b013-f377-4077-8b14-d9edd16eb5cc',
                    member_profile: createMemberProfileRef(
                        '4958b013-f377-4077-8b14-d9edd16eb5cc',
                        'Zaldy Co Sr.'
                    ),
                    name: 'Airbnb Apartment',
                    description: '123 Mabuhay St., Brgy. Pag-asa',

                    cost: 14000,

                    entry_date: '2025-12-10T14:58:29.358Z',
                    created_at: '2025-12-10T14:58:29.358Z',
                    updated_at: '2025-12-10T14:58:29.358Z',
                },
            ],

            is_closed: false,
            civil_status: 'married',
            status: 'verified',
            is_mutual_fund_member: false,
            is_micro_finance_member: false,

            full_name: 'Zaldy  Co Sr.',
            id: '4958b013-f377-4077-8b14-d9edd16eb5cc',

            created_at: '2025-12-10T14:58:29.358Z',
            updated_at: '2025-12-10T14:58:29.358Z',

            member_educational_attainments: [
                {
                    ...baseEntityMeta,
                    id: 'educ-001',
                    member_profile_id: '4958b013-f377-4077-8b14-d9edd16eb5cc',
                    member_profile: createMemberProfileRef(
                        '4958b013-f377-4077-8b14-d9edd16eb5cc',
                        'Zaldy Co Sr.'
                    ),
                    school_name: 'University of the Philippines',
                    school_year: 2004,
                    program_course: 'BS Business Administration',
                    educational_attainment: 'college graduate',
                    description: 'Graduated with honors.',
                },
            ],

            member_incomes: [
                {
                    ...baseEntityMeta,
                    id: 'income-001',
                    member_profile_id: '4958b013-f377-4077-8b14-d9edd16eb5cc',
                    name: 'Business Profit',
                    amount: 50000,
                    release_date: '2025-01-10',
                    media_id: 'media-income-001',
                    media: createMedia(
                        'media-income-001',
                        'https://picsum.photos/200?random=111'
                    ),
                    created_at: '2025-12-10T14:58:29.358Z',
                    updated_at: '2025-12-10T14:58:29.358Z',
                },
            ],

            member_expenses: [
                {
                    ...baseEntityMeta,
                    id: 'expense-001',
                    member_profile_id: '4958b013-f377-4077-8b14-d9edd16eb5cc',
                    member_profile: createMemberProfileRef(
                        '4958b013-f377-4077-8b14-d9edd16eb5cc',
                        'Zaldy Co Sr.'
                    ),
                    name: 'Business Supplies',
                    amount: 10000,
                    description: 'Monthly purchase of materials.',
                    created_at: '2025-12-10T14:58:29.358Z',
                    updated_at: '2025-12-10T14:58:29.358Z',
                },
            ],

            member_addresses: [
                {
                    ...baseEntityMeta,
                    id: 'addr-001',
                    label: 'House',
                    address: '123 Mabuhay St., Brgy. Pag-asa',
                    country_code: 'PH',

                    city: 'Quezon City',
                    postal_code: '1105',
                    province_state: 'Metro Manila',
                    barangay: 'Pag-asa',
                    landmark: 'Near SM North EDSA',

                    longitude: 121.0301,
                    latitude: 14.6561,

                    created_at: '2025-12-10T14:58:29.358Z',
                    updated_at: '2025-12-10T14:58:29.358Z',
                },
            ],

            member_relative_accounts: [
                {
                    ...baseEntityMeta,
                    id: 'relative-001',
                    member_profile_id: '4958b013-f377-4077-8b14-d9edd16eb5cc',
                    member_profile: createMemberProfileRef(
                        '4958b013-f377-4077-8b14-d9edd16eb5cc',
                        'Zaldy Co Sr.'
                    ),
                    relative_member_profile_id: 'rel-001',
                    relative_member_profile: createMemberProfileRef(
                        'rel-001',
                        'Carla Co'
                    ),
                    family_relationship: 'Daughter',
                    description: 'Immediate family member.',
                    created_at: '2025-12-10T14:58:29.358Z',
                    updated_at: '2025-12-10T14:58:29.358Z',
                },
            ],
        },

        {
            key: 'maria.santos@example.com',
            password: 'Password123!',
            first_name: 'Maria',
            middle_name: 'L.',
            last_name: 'Santos',
            full_name: 'Maria L. Santos',
            contact_number: '+639123456789',
            birthdate: '1990-04-05T00:00:00.000Z',
            birth_place: 'MNL',
            status: 'verified',
            civil_status: 'single',

            member_gender: {
                ...baseEntityMeta,
                id: 'female',
                name: 'Female',
                description: 'Female gender',
            },

            is_closed: false,
            is_mutual_fund_member: true,
            is_micro_finance_member: false,

            profile_picture_url: 'https://picsum.photos/200?random=2',
            signature_url: 'https://picsum.photos/200?random=22',

            id: crypto.randomUUID(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),

            member_incomes: [
                {
                    ...baseEntityMeta,
                    id: crypto.randomUUID(),
                    member_profile_id: 'inc1',
                    name: 'Salary',
                    amount: 25000,
                    release_date: '2025-01-10',
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                },
            ],

            member_addresses: [
                {
                    ...baseEntityMeta,
                    id: crypto.randomUUID(),
                    label: 'House',
                    address: '123 Main St',
                    country_code: 'PH',
                    city: 'Quezon City',
                    postal_code: '1100',
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                },
            ],
        },

        {
            key: 'john.doe@example.com',
            password: 'SecretPass456',
            first_name: 'John',
            last_name: 'Doe',
            full_name: 'John Doe',
            contact_number: '+639998887776',
            birthdate: '1985-12-25T00:00:00.000Z',
            birth_place: 'CEB',
            civil_status: 'married',
            status: 'pending',

            member_gender: {
                ...baseEntityMeta,
                id: 'male',
                name: 'Male',
                description: 'Male gender',
            },

            is_closed: false,
            is_mutual_fund_member: false,
            is_micro_finance_member: true,

            profile_picture_url: 'https://picsum.photos/200?random=3',

            id: crypto.randomUUID(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),

            member_incomes: [],
            member_addresses: [],
            member_expenses: [],
            member_government_benefits: [],
            member_contact_references: [],
        },

        // 4. Member with SOME arrays + department + type
        {
            key: 'ana.cruz@example.com',
            password: 'MyPass789#',
            first_name: 'Ana',
            middle_name: 'D.',
            last_name: 'Cruz',
            full_name: 'Ana D. Cruz',
            contact_number: '+639177776666',
            birthdate: '1998-08-20T00:00:00.000Z',
            birth_place: 'BGC',
            civil_status: 'single',
            status: 'verified',

            member_gender: {
                ...baseEntityMeta,
                id: 'female',
                name: 'Female',
                description: 'Female gender',
            },

            member_department: {
                ...baseEntityMeta,
                id: 'dept-1',
                name: 'Finance',
                description: 'Handles financial operations',
            },

            member_type: {
                id: 'regular',
                name: 'Regular Member',
                prefix: 'REG',
                description: 'Full membership',
                created_at: now,
                updated_at: now,
            },

            is_closed: false,
            is_mutual_fund_member: true,
            is_micro_finance_member: true,

            profile_picture_url: 'https://picsum.photos/200?random=4',

            id: crypto.randomUUID(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),

            member_contact_references: [
                {
                    ...baseEntityMeta,
                    id: crypto.randomUUID(),
                    member_profile_id: 'ref1',
                    member_profile: createMemberProfileRef('ref1'),
                    name: 'Mother',
                    contact_number: '+639555555555',
                    description: 'Emergency contact',
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                },
            ],
        },

        {
            key: 'peter.lim@example.com',
            password: 'StrongPass!123',
            first_name: 'Peter',
            last_name: 'Lim',
            full_name: 'Peter Lim',
            contact_number: '+639665432111',
            birthdate: '1993-02-10T00:00:00.000Z',
            birth_place: 'DAV',
            civil_status: 'single',
            status: 'verified',

            member_gender: {
                ...baseEntityMeta,
                id: 'male',
                name: 'Male',
                description: 'Male gender',
            },

            is_closed: false,
            is_mutual_fund_member: false,
            is_micro_finance_member: false,

            profile_picture_url: 'https://picsum.photos/200?random=5',

            id: crypto.randomUUID(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),

            member_incomes: [],
            member_addresses: [],
            member_joint_accounts: [],
        },
    ],
    forgetPasswordRequest: null,

    // setters
    setAuthMember: (member) =>
        set({
            authMember: member,
        }),

    addMember: (member) =>
        set((state) => ({
            members: [...state.members, member],
        })),

    updateMember: (id, updated) =>
        set((state) => ({
            members: state.members.map((m) =>
                m.id === id ? { ...m, ...updated } : m
            ),
        })),

    removeMember: (id) =>
        set((state) => ({
            members: state.members.filter((m) => m.id !== id),
        })),

    setForgetPasswordRequest: (req) =>
        set({
            forgetPasswordRequest: req,
        }),
}))

// USE only kapag sure ka na user ay existing
export const useAuthMember = <
    TMember extends IFakeMemberProfile = IFakeMemberProfile,
>() => {
    const { authMember, ...rest } = useFakeStore((s) => s)

    if (!authMember) {
        throw new Error(
            'User is not authenticated but tried to access protected data'
        )
    }

    return {
        ...rest,
        authMember: authMember as TMember,
    }
}
