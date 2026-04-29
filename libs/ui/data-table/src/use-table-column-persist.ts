import { useLocalStorage } from '@e-coop-monorepo/shared/hooks'

export const useTableColumnPersist = ({ key }: { key: string }) => {
    const [columnOrder, setColumnOrder] = useLocalStorage<string[]>(
        `data-table-column-order-${key}`,
        []
    )
    const [columnVisibility, setColumnVisibility] = useLocalStorage<{
        [key: string]: boolean
    }>('data-table-column-visibility', {})

    return {
        columnOrder,
        setColumnOrder,
        columnVisibility,
        setColumnVisibility,
    }
}
