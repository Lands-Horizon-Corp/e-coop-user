import { AxiosError } from 'axios'

import { IErrorResponse } from '@e-coop-monorepo/shared/types'

import { TErrorMessageExtractor } from './error-message-extractor.types'
import { axiosErrorMessageExtractor } from '../axios-helpers/axios-error-extractor'

// AxiosError's constructor signature is not compatible with the generic
// `new (...args: unknown[]) => Error` type, so cast it to satisfy TS.
export const axiosErrExtractor: TErrorMessageExtractor = [
    AxiosError as unknown as new (...args: unknown[]) => Error,
    (err: Error) =>
        axiosErrorMessageExtractor(err as AxiosError<IErrorResponse>),
]
