import { useContext } from 'react'

import { IFilterState } from './filter-context'
import FilterContext from './filter-context'

export const useFilter = <T = unknown, TField = string, TValue = T>() => {
    const context = useContext(FilterContext) as IFilterState<T, TField, TValue>

    if (!context) {
        throw new Error('useFilter must be used within a FilterProvider')
    }

    return context
}
