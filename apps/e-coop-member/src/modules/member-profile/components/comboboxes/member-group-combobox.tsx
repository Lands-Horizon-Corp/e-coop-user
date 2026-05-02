import * as React from 'react'

import { cn } from '@ecoop/shared/tw-utils'
import { ChevronDownIcon } from '@ecoop/ui/core'
import { Button } from '@ecoop/ui/core'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@ecoop/ui/core'
import { Popover, PopoverContent, PopoverTrigger } from '@ecoop/ui/core'
import { Check } from 'lucide-react'

export interface IMemberGroup {
    id: string
    name: string
    description?: string
}

export const mockMemberGroups: IMemberGroup[] = [
    { id: 'group_a', name: 'Group A', description: 'Primary member group' },
    { id: 'group_b', name: 'Group B', description: 'Secondary member group' },
    { id: 'group_c', name: 'Group C', description: 'Special category members' },
    { id: 'group_d', name: 'Group D', description: 'Barangay assigned group' },
]

interface Props extends Omit<
    React.ComponentPropsWithoutRef<'button'>,
    'onChange' | 'value'
> {
    value?: IMemberGroup
    disabled?: boolean
    className?: string
    placeholder?: string
    undefinable?: boolean
    onChange?: (selected: IMemberGroup | undefined) => void
}

const MemberGroupCombobox = React.forwardRef<HTMLButtonElement, Props>(
    (
        {
            value,
            className,
            disabled = false,
            undefinable = true,
            placeholder = 'Select Group...',
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
                            mockMemberGroups.find((g) => g.id === value.id)
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
                            placeholder="Search Group..."
                        />
                        <CommandList className="ecoop-scroll">
                            <CommandEmpty>No group found.</CommandEmpty>

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

                                {mockMemberGroups.map((group) => (
                                    <CommandItem
                                        key={group.id}
                                        onSelect={() => {
                                            setOpen(false)
                                            onChange?.(group)
                                        }}
                                        value={group.name}
                                    >
                                        {group.name}
                                        <Check
                                            className={cn(
                                                'ml-auto',
                                                value?.id === group.id
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

MemberGroupCombobox.displayName = 'MemberGroupCombobox'
export default MemberGroupCombobox
