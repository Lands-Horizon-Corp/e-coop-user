import { useState } from 'react'

import type { TFilterModes, TSearchFilter } from '@/contexts/filter-context'
import { useFilter } from '@/contexts/filter-context'
import type { KeysOfOrString } from '@e-coop-monorepo/shared/types'
import { ChevronLeftIcon, MagnifyingGlassIcon } from '@e-coop-monorepo/ui/core'
import ActionTooltip from '@e-coop-monorepo/ui/core'
import { Button } from '@e-coop-monorepo/ui/core'
import { DebouncedInput } from '@e-coop-monorepo/ui/core'

export interface IGlobalSearchTargets<T> {
    field: (string & {}) | keyof T
    displayText: string
}

export interface IGlobalSearchProps<T> {
    placeHolder?: string
    defaultVisible?: boolean
    defaultMode: TFilterModes
    targets: IGlobalSearchTargets<T>[]
}

const accessorKey = 'globalSearch'

const DataTableGlobalSearch = <T,>({
    targets,
    defaultMode,
    ...otherProps
}: IGlobalSearchProps<T>) => {
    const [visible, setVisible] = useState(otherProps.defaultVisible ?? true)
    const { filters, setFilter, bulkSetFilter, setFilterLogic } = useFilter<
        unknown,
        KeysOfOrString<T>
    >()

    const filterVal: TSearchFilter = filters[accessorKey as string] ?? {
        value: '',
        to: undefined,
        from: undefined,
        dataType: 'text',
        mode: defaultMode,
        displayText: 'Global Search',
    }

    if (targets.length === 0) return

    return (
        <div className="flex items-center gap-x-1.5 p-1">
            {visible && targets.length > 0 && (
                <ActionTooltip
                    side="bottom"
                    tooltipContent="Global search will only apply on fields that are text searchable"
                >
                    <span className="relative">
                        <DebouncedInput
                            className="min-w-[300px] rounded-lg bg-popover text-xs animate-in fade-in-75 focus-visible:ring-muted"
                            onChange={(val) => {
                                setFilter(accessorKey, {
                                    ...filterVal,
                                    value: val,
                                })
                                bulkSetFilter(targets, {
                                    ...filterVal,
                                    value: val,
                                })
                                setFilterLogic('OR')
                            }}
                            placeholder={
                                otherProps.placeHolder ??
                                'Global Search (Text Only)'
                            }
                            value={filterVal.value}
                        />
                        <Button
                            className="p-1 absolute right-2 top-1/2 size-fit -translate-y-1/2 rounded-full"
                            onClick={() => setVisible(false)}
                            size="icon"
                            variant="ghost"
                        >
                            <ChevronLeftIcon className="size-4" />
                        </Button>
                    </span>
                </ActionTooltip>
            )}
            {!visible && (
                <Button
                    onClick={() => setVisible((prev) => !prev)}
                    size="sm"
                    variant="secondary"
                >
                    <MagnifyingGlassIcon />
                </Button>
            )}
        </div>
    )
}

export default DataTableGlobalSearch
