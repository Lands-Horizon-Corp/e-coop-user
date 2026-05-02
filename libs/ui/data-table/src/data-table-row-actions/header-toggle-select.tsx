import { Checkbox } from '@ecoop/ui/core'
import type { Table } from '@tanstack/react-table'

interface Props<T> {
    table: Table<T>
}

const HeaderToggleSelect = <T,>({ table }: Props<T>) => {
    return (
        <Checkbox
            aria-label="Select all"
            checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) =>
                table.toggleAllPageRowsSelected(!!value)
            }
        />
    )
}

export default HeaderToggleSelect
