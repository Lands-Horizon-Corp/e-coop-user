import { AxiosError } from 'axios'

import { axiosErrorMessageExtractor } from '@e-coop-monorepo/shared/helpers'
import { IErrorResponse } from '@e-coop-monorepo/shared/types'

import { TErrorMessageExtractor } from '.'

// AxiosError's constructor signature is not compatible with the generic
// `new (...args: unknown[]) => Error` type, so cast it to satisfy TS.
export const axiosErrExtractor: TErrorMessageExtractor = [
    AxiosError as unknown as new (...args: unknown[]) => Error,
    (err: Error) =>
        axiosErrorMessageExtractor(err as AxiosError<IErrorResponse>),
]
