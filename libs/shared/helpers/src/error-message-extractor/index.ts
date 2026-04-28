import { axiosErrExtractor } from './axios-err-extractor'
import { searchParamErrExtractor } from './path-params-err-extractor'
import { zodErrExtractor } from './zod-err-extractor'
import {
    TErrorMessageExtractor,
    TErrorMessageExtractors,
    TExtractErrorMessageParams,
} from './error-message-extractor.types'

export const extractErrorMessage = ({
    error,
    errorMessageExtractors,
    showUnknownErrorMessage = false,
}: TExtractErrorMessageParams) => {
    if (errorMessageExtractors) {
        for (const [ErrorType, extractor] of errorMessageExtractors) {
            if (error instanceof ErrorType) {
                return extractor(error)
            }
        }
    }

    return showUnknownErrorMessage
        ? ((error as Error)?.message ?? 'An unknown error occured')
        : 'An unknown error occured'
}

/**
 * This handles all possible errors you may have and returns the error message depending on what
 * error instanced match the error message extractor
 * @returns {string}
 */
export const allErrorMessageExtractor = ({
    errorMessageExtractors = [
        zodErrExtractor,
        axiosErrExtractor,
        searchParamErrExtractor,
        // add your own error extractor here
    ],
    ...other
}: TExtractErrorMessageParams): unknown => {
    // Error, AxiosError, or any other error
    return extractErrorMessage({ ...other, errorMessageExtractors })
}

export const serverRequestErrExtractor = ({ error }: { error: unknown }) => {
    if (!error) return

    return extractErrorMessage({
        error,
        errorMessageExtractors: [axiosErrExtractor],
    })
}
