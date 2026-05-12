import type { TORBuilderOptions } from '@ecoop/domains/transactions/models'

export const buildOR = ({
    currentOr,
    padding,
    paddingChar = '0',
    prefix = '',
}: TORBuilderOptions) => {
    const constructedPadStart = padding
        ? currentOr.toString().padStart(padding, paddingChar)
        : currentOr

    const finalOr = `${prefix}${constructedPadStart}`

    return finalOr
}
