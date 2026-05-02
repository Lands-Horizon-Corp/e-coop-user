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

export interface IMemberGender {
    id: string
    name: string
    description?: string
}
interface Props extends Omit<
    React.ComponentPropsWithoutRef<'button'>,
    'onChange' | 'value'
> {
    value?: IMemberGender // using IMemberGender.id
    disabled?: boolean
    className?: string
    placeholder?: string
    undefinable?: boolean
    onChange?: (selected: IMemberGender | undefined) => void
}

// Mock array of member genders
export const mockMemberGenders: IMemberGender[] = [
    { id: 'male', name: 'Male', description: 'Male gender' },
    { id: 'female', name: 'Female', description: 'Female gender' },
    { id: 'non_binary', name: 'Non-binary', description: 'Non-binary gender' },
    {
        id: 'prefer_not_say',
        name: 'Prefer not to say',
        description: 'Prefer not to disclose gender',
    },
]

const MemberGenderCombobox = React.forwardRef<HTMLButtonElement, Props>(
    (
        {
            value,
            className,
            disabled = false,
            undefinable = true,
            placeholder = 'Select Gender...',
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
                            mockMemberGenders.find(
                                (option) => option.id === value.id
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
                            placeholder="Search Gender..."
                        />
                        <CommandList className="ecoop-scroll">
                            <CommandEmpty>No gender found.</CommandEmpty>
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
                                {mockMemberGenders.map((option) => (
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
                                                value?.id === option.id
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

MemberGenderCombobox.displayName = 'MemberGenderCombobox'

export default MemberGenderCombobox
