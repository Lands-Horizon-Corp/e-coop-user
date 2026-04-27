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

interface Props extends Omit<
    React.ComponentPropsWithoutRef<'button'>,
    'onChange'
> {
    value?: string // using IMemberType.id
    disabled?: boolean
    className?: string
    placeholder?: string
    undefinable?: boolean
    onChange?: (selected: IMemberType | undefined) => void
}

export interface IMemberType {
    id: string
    name: string
    description?: string
}

// Mock array of 5 member types
export const mockMemberTypes: IMemberType[] = [
    { id: '1', name: 'Regular', description: 'Standard membership' },
    { id: '2', name: 'Premium', description: 'Premium benefits' },
    { id: '3', name: 'VIP', description: 'VIP access and perks' },
    { id: '4', name: 'Student', description: 'Student discount available' },
    { id: '5', name: 'Senior', description: 'Senior citizen benefits' },
]

const MemberTypeCombobox = React.forwardRef<HTMLButtonElement, Props>(
    (
        {
            value,
            className,
            disabled = false,
            undefinable = true,
            placeholder = 'Select Member Type...',
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
                            mockMemberTypes.find(
                                (option) => option.id === value
                            )?.name
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
                            placeholder="Search Member Type..."
                        />
                        <CommandList className="ecoop-scroll">
                            <CommandEmpty>No Member Type found.</CommandEmpty>
                            <CommandGroup>
                                {undefinable && (
                                    <CommandItem
                                        className="justify-center text-muted-foreground"
                                        onSelect={() => {
                                            setOpen(false)
                                            onChange?.(undefined)
                                        }}
                                        value={undefined}
                                    >
                                        Select None
                                    </CommandItem>
                                )}
                                {mockMemberTypes.map((option) => (
                                    <CommandItem
                                        key={option.id}
                                        onSelect={() => {
                                            setOpen(false)
                                            onChange?.(option)
                                        }}
                                        value={option.name}
                                    >
                                        {option.name}
                                        <Check
                                            className={cn(
                                                'ml-auto',
                                                value === option.id
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

MemberTypeCombobox.displayName = 'MemberTypeCombobox'

export default MemberTypeCombobox
