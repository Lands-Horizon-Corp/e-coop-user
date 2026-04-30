import { cn } from '@e-coop-monorepo/shared/tw-utils'
import type { IClassProps } from '@e-coop-monorepo/shared/types'
import { MixerHorizontalIcon } from '@e-coop-monorepo/ui/core'
import { Button } from '@e-coop-monorepo/ui/core'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@e-coop-monorepo/ui/core'
import type { Table } from '@tanstack/react-table'

import type {
    IDataTableFilterLogicOptionProps,
} from './filter-logic-option';
import DataTableFilterLogicOption from './filter-logic-option'
import type {
    IDataTableScrollableOptionProps,
} from './scroll-option';
import DataTableScrollOption from './scroll-option'

interface Props<T> extends IClassProps {
    table: Table<T>
    scrollOption?: IDataTableScrollableOptionProps
    filterLogicOption?: IDataTableFilterLogicOptionProps
}

const DataTableOptionsMenu = <T,>({
    className,
    scrollOption,
    filterLogicOption,
}: Props<T>) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button
                    className={cn('rounded-md', className)}
                    size="icon"
                    variant="secondary"
                >
                    <MixerHorizontalIcon className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="ecoop-scroll max-h-[70vh] min-w-[180px] overflow-y-scroll [&::-webkit-scrollbar]:w-[3px]"
            >
                {scrollOption && (
                    <>
                        <DataTableScrollOption {...scrollOption} />
                    </>
                )}
                {filterLogicOption && (
                    <>
                        <DropdownMenuSeparator />
                        <DataTableFilterLogicOption {...filterLogicOption} />
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DataTableOptionsMenu
