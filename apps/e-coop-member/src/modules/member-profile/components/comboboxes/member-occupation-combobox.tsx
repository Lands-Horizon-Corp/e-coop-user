import * as React from 'react'

import { cn } from '@e-coop-monorepo/shared/helpers/tw-utils'
import { ChevronDownIcon } from '@e-coop-monorepo/ui/components/icons'
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
import { Check } from 'lucide-react'

export interface IMemberOccupation {
    id: string
    name: string
    description?: string
}

export const mockMemberOccupations: IMemberOccupation[] = [
    { id: 'student', name: 'Student', description: 'Currently studying' },
    {
        id: 'employed',
        name: 'Employed',
        description: 'Working full-time or part-time',
    },
    {
        id: 'self_employed',
        name: 'Self-employed',
        description: 'Runs own business',
    },
    {
        id: 'unemployed',
        name: 'Unemployed',
        description: 'Not currently employed',
    },
    { id: 'retired', name: 'Retired', description: 'No longer working' },
]

interface Props extends Omit<
    React.ComponentPropsWithoutRef<'button'>,
    'onChange' | 'value'
> {
    value?: IMemberOccupation
    disabled?: boolean
    className?: string
    placeholder?: string
    undefinable?: boolean
    onChange?: (selected: IMemberOccupation | undefined) => void
}

const MemberOccupationCombobox = React.forwardRef<HTMLButtonElement, Props>(
    (
        {
            value,
            className,
            disabled = false,
            undefinable = true,
            placeholder = 'Select Occupation...',
            onChange,
            ...other
        },
        ref
    ) => {
        const [open, setOpen] = React.useState(false)

        return (
            <Popover modal onOpenChange={setOpen} open={open}>
                <PopoverTrigger asChild>
                    <Button
                        {...other}
                        aria-expanded={open}
                        className={cn('w-full justify-between px-3', className)}
                        disabled={disabled}
                        ref={ref}
                        role="combobox"
                        variant="outline"
                    >
                        {value ? (
                            mockMemberOccupations.find((o) => o.id === value.id)
                                ?.name
                        ) : (
                            <span className="text-muted-foreground">
                                {placeholder}
                            </span>
                        )}
                        <ChevronDownIcon className="opacity-50" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width] p-0">
                    <Command>
                        <CommandInput
                            className="h-9"
                            placeholder="Search Occupation..."
                        />
                        <CommandList className="ecoop-scroll">
                            <CommandEmpty>No occupation found.</CommandEmpty>

                            <CommandGroup>
                                {undefinable && (
                                    <CommandItem
                                        className="justify-center text-muted-foreground"
                                        onSelect={() => {
                                            setOpen(false)
                                            onChange?.(undefined)
                                        }}
                                        value="none"
                                    >
                                        Select None
                                    </CommandItem>
                                )}

                                {mockMemberOccupations.map((occupation) => (
                                    <CommandItem
                                        key={occupation.id}
                                        onSelect={() => {
                                            setOpen(false)
                                            onChange?.(occupation)
                                        }}
                                        value={occupation.name}
                                    >
                                        {occupation.name}
                                        <Check
                                            className={cn(
                                                'ml-auto',
                                                value?.id === occupation.id
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
)

MemberOccupationCombobox.displayName = 'MemberOccupationCombobox'
export default MemberOccupationCombobox
