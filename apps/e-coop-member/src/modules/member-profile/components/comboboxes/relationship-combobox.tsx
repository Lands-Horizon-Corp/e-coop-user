import * as React from 'react'

import { cn } from '@e-coop-monorepo/shared/helpers/tw-utils'
import {
    CheckIcon,
    ChevronDownIcon,
} from '@e-coop-monorepo/ui/components/icons'
import { Button } from '@e-coop-monorepo/ui/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@e-coop-monorepo/ui/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@e-coop-monorepo/ui/components/ui/popover'

// Assuming this is where your type and const are

export const FAMILY_RELATIONSHIP = [
    'Father',
    'Mother',
    'Son',
    'Daughter',
    'Brother',
    'Sister',
    'Husband',
    'Wife',
    'Partner',
    'Grandfather',
    'Grandmother',
    'Grandson',
    'Granddaughter',
    'Stepfather',
    'Stepmother',
    'Stepson',
    'Stepdaughter',
    'Half-Brother',
    'Half-Sister',
    'Foster Father',
    'Foster Mother',
    'Foster Son',
    'Foster Daughter',
    'Guardian',
    'Uncle',
    'Aunt',
    'Nephew',
    'Niece',
    'Cousin',
    'Father-in-Law',
    'Mother-in-Law',
    'Son-in-Law',
    'Daughter-in-Law',
    'Brother-in-Law',
    'Sister-in-Law',
    'Godfather',
    'Godmother',
    'Godson',
    'Goddaughter',
    'Adopted Son',
    'Adopted Daughter',
    'Ward',
    'Other',
] as const

export type TRelationship = (typeof FAMILY_RELATIONSHIP)[number] // move to member profile relative

interface Props {
    id?: string
    name?: string
    value?: TRelationship
    disabled?: boolean
    className?: string
    placeholder?: string
    relationships?: TRelationship[]
    onChange?: (selected: TRelationship) => void
}

const RelationshipCombobox = ({
    value,
    className,
    disabled = false,
    placeholder = 'Select Relationship...',
    relationships = [...FAMILY_RELATIONSHIP],
    onChange,
    ...other
}: Props) => {
    const [open, setOpen] = React.useState(false)

    return (
        <Popover modal onOpenChange={setOpen} open={open}>
            <PopoverTrigger asChild>
                <Button
                    {...other}
                    aria-expanded={open}
                    className={cn('w-full justify-between px-3', className)}
                    disabled={disabled}
                    role="combobox"
                    type="button"
                    variant="outline"
                >
                    <span className="capitalize">
                        {value || (
                            <span className="text-muted-foreground">
                                {placeholder}
                            </span>
                        )}
                    </span>
                    <ChevronDownIcon className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width] p-0">
                <Command>
                    <CommandInput
                        className="h-9"
                        placeholder="Search Relationship..."
                    />
                    <CommandList className="ecoop-scroll">
                        <CommandEmpty>No relationship found.</CommandEmpty>
                        <CommandGroup>
                            {relationships.map((relationship) => (
                                <CommandItem
                                    key={relationship}
                                    onSelect={() => {
                                        setOpen(false)
                                        onChange?.(relationship)
                                    }}
                                    value={relationship}
                                >
                                    <span className="capitalize">
                                        {relationship}
                                    </span>
                                    <CheckIcon
                                        className={cn(
                                            'ml-auto',
                                            value === relationship
                                                ? 'opacity-100'
                                                : 'opacity-0'
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default RelationshipCombobox
