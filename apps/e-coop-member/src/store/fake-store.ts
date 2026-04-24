import { IMemberProfile } from '@e-coop-monorepo/modules/member-profile'
import { TEntityId } from '@e-coop-monorepo/shared/types'
import { create } from 'zustand'

export interface IForgetPasswordEntry {
    id: TEntityId
    memberProfileId: TEntityId // id of user
    otp: string
}

interface IFakeStore {
    authMember: IMemberProfile | null
    members: IMemberProfile[]
    forgetPasswordRequest: IForgetPasswordEntry | null

    // actions
    setAuthMember: (member: IMemberProfile | null) => void
    addMember: (member: IMemberProfile) => void
    updateMember: (id: string, updated: Partial<IMemberProfile>) => void
    removeMember: (id: string) => void

    setForgetPasswordRequest: (req: IForgetPasswordEntry | null) => void
}

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
                id: 'educ-001',
                member_profile_id: '4958b013-f377-4077-8b14-d9edd16eb5cc',
                school_name: 'University of the Philippines',
                school_year: 2004,
                program_course: 'BS Business Administration',
                educational_attainment: 'college graduate',
                description: 'Graduated with honors.',
            },
        ],

        member_incomes: [
            {
                id: 'income-001',
                member_profile_id: '4958b013-f377-4077-8b14-d9edd16eb5cc',
                name: 'Business Profit',
                amount: 50000,
                release_date: '2025-01-10',
                media_url: 'https://picsum.photos/200?random=111',
                created_at: '2025-12-10T14:58:29.358Z',
                updated_at: '2025-12-10T14:58:29.358Z',
            },
        ],

        member_expenses: [
            {
                id: 'expense-001',
                member_profile_id: '4958b013-f377-4077-8b14-d9edd16eb5cc',
                name: 'Business Supplies',
                amount: 10000,
                description: 'Monthly purchase of materials.',
                created_at: '2025-12-10T14:58:29.358Z',
                updated_at: '2025-12-10T14:58:29.358Z',
            },
        ],

        member_assets: [
            {
                id: 'addr-001',
                member_profile_id: '4958b013-f377-4077-8b14-d9edd16eb5cc',
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
                id: 'addr-001',
                member_profile_id: '4958b013-f377-4077-8b14-d9edd16eb5cc',
                label: 'Home Address',
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
                id: 'relative-001',
                full_name: 'Carla Co',
                member_profile_id: '4958b013-f377-4077-8b14-d9edd16eb5cc',
                relative_member_profile_id: 'rel-001',
                family_relationship: 'Daughter',
                description: 'Immediate family member.',
                created_at: '2025-12-10T14:58:29.358Z',
                updated_at: '2025-12-10T14:58:29.358Z',
            },
        ],

        member_government_benefits: [
            {
                id: 'govbenefit-001',
                member_profile_id: '4958b013-f377-4077-8b14-d9edd16eb5cc',

                front_media_url: 'https://picsum.photos/200?random=401',
                back_media_url: 'https://picsum.photos/200?random=402',

                name: 'PhilHealth ID',
                country_code: 'PH',
                value: '12-345678901-2',
                description: 'Official PhilHealth membership ID.',
                expiry_date: undefined, // (PhilHealth usually has no expiry)

                created_at: '2025-12-10T14:58:29.358Z',
                updated_at: '2025-12-10T14:58:29.358Z',
            },
            {
                id: 'govbenefit-002',
                member_profile_id: '4958b013-f377-4077-8b14-d9edd16eb5cc',

                front_media_url: 'https://picsum.photos/200?random=403',
                back_media_url: 'https://picsum.photos/200?random=404',

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
                id: 'male',
                name: 'Male',
                description: 'Male gender',
            },

            member_government_benefits: [
                {
                    id: 'govbenefit-001',
                    member_profile_id: '4958b013-f377-4077-8b14-d9edd16eb5cc',

                    front_media_url: 'https://picsum.photos/200?random=401',
                    back_media_url: 'https://picsum.photos/200?random=402',

                    name: 'PhilHealth ID',
                    country_code: 'PH',
                    value: '12-345678901-2',
                    description: 'Official PhilHealth membership ID.',
                    expiry_date: undefined, // (PhilHealth usually has no expiry)

                    created_at: '2025-12-10T14:58:29.358Z',
                    updated_at: '2025-12-10T14:58:29.358Z',
                },
                {
                    id: 'govbenefit-002',
                    member_profile_id: '4958b013-f377-4077-8b14-d9edd16eb5cc',

                    front_media_url: 'https://picsum.photos/200?random=403',
                    back_media_url: 'https://picsum.photos/200?random=404',

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
                    id: 'addr-001',
                    member_profile_id: '4958b013-f377-4077-8b14-d9edd16eb5cc',
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
                    id: 'educ-001',
                    member_profile_id: '4958b013-f377-4077-8b14-d9edd16eb5cc',
                    school_name: 'University of the Philippines',
                    school_year: 2004,
                    program_course: 'BS Business Administration',
                    educational_attainment: 'college graduate',
                    description: 'Graduated with honors.',
                },
            ],

            member_incomes: [
                {
                    id: 'income-001',
                    member_profile_id: '4958b013-f377-4077-8b14-d9edd16eb5cc',
                    name: 'Business Profit',
                    amount: 50000,
                    release_date: '2025-01-10',
                    media_url: 'https://picsum.photos/200?random=111',
                    created_at: '2025-12-10T14:58:29.358Z',
                    updated_at: '2025-12-10T14:58:29.358Z',
                },
            ],

            member_expenses: [
                {
                    id: 'expense-001',
                    member_profile_id: '4958b013-f377-4077-8b14-d9edd16eb5cc',
                    name: 'Business Supplies',
                    amount: 10000,
                    description: 'Monthly purchase of materials.',
                    created_at: '2025-12-10T14:58:29.358Z',
                    updated_at: '2025-12-10T14:58:29.358Z',
                },
            ],

            member_addresses: [
                {
                    id: 'addr-001',
                    member_profile_id: '4958b013-f377-4077-8b14-d9edd16eb5cc',
                    label: 'Home Address',
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
                    id: 'relative-001',
                    full_name: 'Carla Co',
                    member_profile_id: '4958b013-f377-4077-8b14-d9edd16eb5cc',
                    relative_member_profile_id: 'rel-001',
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
                    id: crypto.randomUUID(),
                    member_profile_id: 'addr1',
                    label: 'Home',
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
                id: 'female',
                name: 'Female',
                description: 'Female gender',
            },

            member_department: {
                id: 'dept-1',
                name: 'Finance',
                description: 'Handles financial operations',
            },

            member_type: {
                id: 'regular',
                name: 'Regular Member',
                description: 'Full membership',
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
                    id: crypto.randomUUID(),
                    member_profile_id: 'ref1',
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
    TMember extends IMemberProfile = IMemberProfile,
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
