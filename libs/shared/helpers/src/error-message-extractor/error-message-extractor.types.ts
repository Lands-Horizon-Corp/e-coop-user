export type TErrorMessageExtractor = [
    new (...args: unknown[]) => Error, // Error, AxiosError, or any other error
    (error: Error) => string,
]

export type TErrorMessageExtractors = Array<TErrorMessageExtractor>

export type TExtractErrorMessageParams = {
    error: unknown
    errorMessageExtractors?: TErrorMessageExtractors
    showUnknownErrorMessage?: boolean
}
