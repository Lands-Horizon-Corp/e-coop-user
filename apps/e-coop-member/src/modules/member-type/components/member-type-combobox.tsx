import * as React from 'react'

import { cn } from '@e-coop-monorepo/shared/tw-utils'
import type { TEntityId } from '@e-coop-monorepo/shared/types'
import { ChevronDownIcon, PlusIcon } from '@e-coop-monorepo/ui/core'
import LoadingSpinner from '@e-coop-monorepo/ui/core'
import { Button } from '@e-coop-monorepo/ui/core'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@e-coop-monorepo/ui/core'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@e-coop-monorepo/ui/core'
import { Check } from 'lucide-react'

import { useGetAllMemberTypes } from '../member-type.service'
import type { IMemberType } from '../member-type.types'
import type {
    TMemberTypeForm} from './forms/member-type-create-update-form';
import {
    MemberTypeCreateUpdateFormModal
} from './forms/member-type-create-update-form'

export type IMemberTypeComboboxCreateProps = Pick<
    TMemberTypeForm,
    'name' | 'prefix' | 'description'
>

interface Props extends Omit<
    React.ComponentPropsWithoutRef<'button'>,
    'onChange'
> {
    value?: TEntityId
    disabled?: boolean
    className?: string
    placeholder?: string
    undefinable?: boolean
    memberTypeComboboxCreateProps?: IMemberTypeComboboxCreateProps
    onChange?: (selected: IMemberType | undefined) => void
}

const MemberTypeCombobox = React.forwardRef<HTMLButtonElement, Props>(
    (
        {
            value,
            className,
            disabled = false,
            undefinable = true,
            memberTypeComboboxCreateProps,
            placeholder = 'Select Member Type...',
            onChange,
            ...other
        },
        ref
    ) => {
        const [open, setOpen] = React.useState(false)
        const [createModal, setCreateModal] = React.useState(false)

        const { data, isLoading } = useGetAllMemberTypes()

        return (
            <>
                <MemberTypeCreateUpdateFormModal
                    formProps={{
                        ...memberTypeComboboxCreateProps,
                        onSuccess: (newType) => {
                            onChange?.(newType)
                            setCreateModal(false)
                        },
                    }}
                    onOpenChange={setCreateModal}
                    open={createModal}
                />
                <Popover modal onOpenChange={setOpen} open={open}>
                    <PopoverTrigger asChild>
                        <Button
                            {...other}
                            aria-expanded={open}
                            className={cn(
                                'w-full justify-between px-3',
                                className
                            )}
                            disabled={disabled || isLoading}
                            ref={ref}
                            role="combobox"
                            variant="outline"
                        >
                            {value ? (
                                data?.find((option) => option.id === value)
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
                                placeholder="Search ember Type..."
                            />
                            {isLoading ? (
                                <CommandEmpty>
                                    <LoadingSpinner className="mr-2 inline-block" />{' '}
                                    Loading...
                                </CommandEmpty>
                            ) : (
                                <CommandList className="ecoop-scroll">
                                    <CommandEmpty>
                                        No Member Type found.
                                    </CommandEmpty>
                                    {memberTypeComboboxCreateProps && (
                                        <>
                                            <CommandGroup>
                                                <CommandItem
                                                    onClick={() => {}}
                                                    onSelect={() => {
                                                        setCreateModal(true)
                                                    }}
                                                >
                                                    <PlusIcon /> Create new type
                                                </CommandItem>
                                            </CommandGroup>
                                            <CommandSeparator />
                                        </>
                                    )}
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
                                        {data?.map((option) => (
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
                            )}
                        </Command>
                    </PopoverContent>
                </Popover>
            </>
        )
    }
)

MemberTypeCombobox.displayName = 'MemberTypeCombobox'

export default MemberTypeCombobox
