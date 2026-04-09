import { IBaseEntityMeta, IPaginatedResult } from '@/types'

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
import { spoofErrorMessages } from './spoof-detection.constants'

export interface IKyc extends IBaseEntityMeta {
    //add here
}

export interface IKycPaginated extends IPaginatedResult<IKyc> {}

export type IKYCSelfieRequest = TKYCSelfieSchema
export type IKYCRegisterRequest = TKYCRegisterSchema
export type IKYCVerifyPersonalInfoRequest = TKYCVerifyPersonalInfoSchema
export type IKYCVerifySecurityDetailsRequest = TKYCVerifySecurityDetailsSchema
export type IKYCVerifyEmailRequest = TKYCVerifyEmailSchema
export type IKYCVerifyPhoneRequest = TKYCVerifyPhoneSchema
export type IKYCVerifyAddressesRequest = TKYCVerifyAddressesSchema
export type IKYCVerifyGovernmentBenefitsRequest =
    TKYCVerifyGovernmentBenefitsSchema

export type TSpoofErrorMessagesKeys = keyof typeof spoofErrorMessages

export type TSpoofingResponse = {
    detail: string
    description?: string
    error?: string
    code?: TSpoofErrorMessagesKeys
}
