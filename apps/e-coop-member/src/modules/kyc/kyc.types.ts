import {
    IBaseEntityMeta,
    IPaginatedResult,
} from '@e-coop-monorepo/shared/types'

import {
    TKYCRegisterSchema,
    TKYCSelfieSchema,
    TKYCVerifyAddressesSchema,
    TKYCVerifyEmailSchema,
    TKYCVerifyGovernmentBenefitsSchema,
    TKYCVerifyPersonalInfoSchema,
    TKYCVerifyPhoneSchema,
    TKYCVerifySecurityDetailsSchema,
} from './kyc.validation'

export type IKyc = IBaseEntityMeta

export type IKycPaginated = IPaginatedResult<IKyc>

export type IKYCSelfieRequest = TKYCSelfieSchema
export type IKYCRegisterRequest = TKYCRegisterSchema
export type IKYCVerifyPersonalInfoRequest = TKYCVerifyPersonalInfoSchema
export type IKYCVerifySecurityDetailsRequest = TKYCVerifySecurityDetailsSchema
export type IKYCVerifyEmailRequest = TKYCVerifyEmailSchema
export type IKYCVerifyPhoneRequest = TKYCVerifyPhoneSchema
export type IKYCVerifyAddressesRequest = TKYCVerifyAddressesSchema
export type IKYCVerifyGovernmentBenefitsRequest =
    TKYCVerifyGovernmentBenefitsSchema
