import { ZodError } from 'zod'

import type { TErrorMessageExtractor } from './error-message-extractor.types'

export const zodErrExtractor: TErrorMessageExtractor = [
    ZodError as unknown as new (...args: unknown[]) => Error,
    (e: Error) => (e as ZodError).issues[0]?.message ?? 'Invalid input',
]
