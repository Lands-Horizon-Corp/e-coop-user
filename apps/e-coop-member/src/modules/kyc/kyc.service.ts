import { resizeImage } from '@ecoop/modules/media'
import type { TMemberAddressSchema } from '@ecoop/domains/member-crm'
import type { IMemberGovernmentBenefitRequest } from '@ecoop/domains/member-crm'
import { imageCompressed } from '@ecoop/shared/helpers'
import { createDataLayerFactory } from '@ecoop/shared/repositories'
import { createMutationFactory } from '@ecoop/shared/repositories'
import type { TEntityId } from '@ecoop/shared/types'

import type { IKyc } from './kyc.types'
// import { Logger } from '@ecoop/shared/helpers'

import type {
    TKYCRegisterSchema,
    TKYCVerifyEmailSchema,
    TKYCVerifyPersonalInfoSchema,
    TKYCVerifyPhoneSchema,
    TKYCVerifySecurityDetailsSchema,
} from './kyc.validation'

const {
    // apiCrudHooks,
    apiCrudService,
    baseQueryKey: kycBaseKey,
} = createDataLayerFactory<IKyc, { id?: TEntityId }>({
    url: '/api/v1/kyc',
    baseKey: 'kyc',
})

// ⚙️🛠️ API SERVICE HERE
export const {
    API, // rarely used, for raw calls
    route: kycAPIRoute, // matches url above

    create: createKyc,
    updateById: updateKycById,

    deleteById: deleteKycById,
    deleteMany: deleteManyKyc,

    getById: getKycById,
    getAll: getAllKyc,
    getPaginated: getPaginatedKyc,
} = apiCrudService

// custom service functions can go here

// 🪝 HOOK STARTS HERE
export { kycBaseKey } // Exported in case it's needed outside

export const useKYCVerifyPersonalDetails = createMutationFactory<
    void,
    Error,
    TKYCVerifyPersonalInfoSchema
>({
    mutationFn: async (payload) => {
        const response = await API.post<TKYCVerifyPersonalInfoSchema, void>(
            `${kycAPIRoute}/personal-details`,
            payload
        )
        return response.data
    },
})

export const useKYCSecurityDetails = createMutationFactory<
    void,
    Error,
    TKYCVerifySecurityDetailsSchema
>({
    mutationFn: async (payload) => {
        const response = await API.post<TKYCVerifySecurityDetailsSchema, void>(
            `${kycAPIRoute}/security-details`,
            payload
        )
        return response.data
    },
})

export const useKYCVerifyEmail = createMutationFactory<
    void,
    Error,
    TKYCVerifyEmailSchema
>({
    mutationFn: async (payload) => {
        const response = await API.post<TKYCVerifyEmailSchema, void>(
            `${kycAPIRoute}/verify-email`,
            payload
        )
        return response.data
    },
})

export const useKYCResendEmailOTP = createMutationFactory<
    void,
    Error,
    { email: string; full_name: string; password: string }
>({
    mutationFn: async (payload) => {
        const response = await API.post<
            { email: string; full_name: string; password: string },
            void
        >(`${kycAPIRoute}/resend-email-verification`, payload)
        return response.data
    },
})

export const useKYCVerifyPhone = createMutationFactory<
    void,
    Error,
    TKYCVerifyPhoneSchema
>({
    mutationFn: async (payload) => {
        const response = await API.post<TKYCVerifyPhoneSchema, void>(
            `${kycAPIRoute}/verify-contact-number`,
            payload
        )
        return response.data
    },
})

export const useKYCResendPhoneOTP = createMutationFactory<
    void,
    Error,
    { contact_number: string; full_name: string; password: string }
>({
    mutationFn: async (payload) => {
        const response = await API.post<
            { contact_number: string; full_name: string; password: string },
            void
        >(`${kycAPIRoute}/resend-contact-number-verification`, payload)
        return response.data
    },
})

export const useKYCVerifyAddresses = createMutationFactory<
    void,
    Error,
    TMemberAddressSchema[]
>({
    mutationFn: async (payload) => {
        const response = await API.post<TMemberAddressSchema[], void>(
            `${kycAPIRoute}/verify-addresses`,
            payload
        )
        return response.data
    },
})

export const useKYCVerifyGovernmentBenefits = createMutationFactory<
    void,
    Error,
    IMemberGovernmentBenefitRequest[]
>({
    mutationFn: async (payload) => {
        const response = await API.post<
            IMemberGovernmentBenefitRequest[],
            void
        >(`${kycAPIRoute}/verify-government-benefits`, payload)
        return response.data
    },
})

export const useKYCVerifySelfie = createMutationFactory<
    void,
    Error,
    { file: File }
>({
    mutationFn: async ({ file }) => {
        // const response = await API.post<IKYCSelfieRequest, void>(
        //     `${kycAPIRoute}/selfie`,
        //     payload
        // )

        // export const uploadMedia = async (
        // file: File,
        // onProgress?: (progressEvent: AxiosProgressEvent) => void
        // ): Promise<IMedia> => {

        const formData = new FormData()

        const resizedFile = await resizeImage(file, { height: 500, width: 500 })
        const convertedFile = new File([resizedFile], file.name, {
            type: 'image/webp',
        })

        formData.append('file', await imageCompressed(convertedFile))
        const response = await API.uploadFile<void>(
            `${kycAPIRoute}/selfie`,
            formData,
            {},
            {
                // onUploadProgress: onProgress,
            }
        )

        // return response.data
        // }
        return response.data
    },
})

export const useKYCRegister = createMutationFactory<
    void,
    Error,
    TKYCRegisterSchema
>({
    mutationFn: async (payload) => {
        const response = await API.post<TKYCRegisterSchema, void>(
            `${kycAPIRoute}/register`,
            payload
        )
        return response.data
    },
})

// export const useKYCRegisterMember = createMutationFactory<
//     void,
//     string,
//     I
// >({
//     mutationFn: async ({ memberProfileId, contactReferenceId }) => {
//         const response = await API.post<>()
//     },
//     invalidationFn: (args) => {
//         args.queryClient.invalidateQueries({
//             queryKey: ['member-profile', args.variables.memberProfileId],
//         })
//     },
// })

// export const {
// useCreate: useCreateKyc,
//     useUpdateById: useUpdateKycById,

// useGetAll: useGetAllKyc,
// useGetById: useGetKycById,
// useGetPaginated: useGetPaginatedKyc,

// useDeleteById: useDeleteKycById,
// useDeleteMany: useDeleteManyKyc,
// } = apiCrudHooks

// export const logger = Logger.getInstance('kyc')
// custom hooks can go here
