import { ZodError } from 'zod'

import { TErrorMessageExtractor } from './index'
export const zodErrExtractor: TErrorMessageExtractor = [
    ZodError as unknown as new (...args: unknown[]) => Error,
    (e: Error) => (e as ZodError).issues[0]?.message ?? 'Invalid input',
]
