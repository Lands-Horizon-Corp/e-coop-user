import { useState } from 'react'

import {
    PAGINATION_INITIAL_INDEX,
    PAGINATION_INITIAL_PAGE_SIZE,
} from '@ecoop/shared/constants'

export type TPagination = { pageSize: number; pageIndex: number }

export const usePagination = ({
    pageIndex = PAGINATION_INITIAL_INDEX,
    pageSize = PAGINATION_INITIAL_PAGE_SIZE,
}: Partial<TPagination | undefined> = {}) => {
    const [pagination, setPagination] = useState<TPagination>({
        pageIndex: pageIndex,
        pageSize: pageSize,
    })

    return { pagination, setPagination }
}
