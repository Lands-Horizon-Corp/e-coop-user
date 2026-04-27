import { TFilterLogic } from '@e-coop-monorepo/shared/contexts'
import { FunnelIcon } from '@e-coop-monorepo/ui'
import {
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from '@e-coop-monorepo/ui'

export interface IDataTableFilterLogicOptionProps {
    filterLogic: TFilterLogic
    setFilterLogic: (newFilterLogic: TFilterLogic) => void
}

const DataTableFilterLogicOption = ({
    filterLogic,
    setFilterLogic,
}: IDataTableFilterLogicOptionProps) => {
    return (
        <DropdownMenuGroup>
            <DropdownMenuLabel className="flex justify-between items-center">
                Filter Logic
                <FunnelIcon />
            </DropdownMenuLabel>
            <DropdownMenuRadioGroup
                onValueChange={(selected) =>
                    setFilterLogic(selected as TFilterLogic)
                }
                value={filterLogic}
            >
                <DropdownMenuRadioItem
                    onSelect={(e) => e.preventDefault()}
                    value="AND"
                >
                    AND
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                    onSelect={(e) => e.preventDefault()}
                    value="OR"
                >
                    OR
                </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
    )
}

export default DataTableFilterLogicOption
