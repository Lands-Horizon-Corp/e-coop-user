import { UseFormReturn } from 'react-hook-form'

import { IBranch, useGetAllBranch } from '@e-coop-monorepo/modules/branch'
import { cn } from '@e-coop-monorepo/shared/helpers'
import { TEntityId } from '@e-coop-monorepo/shared/types'
import {
    BuildingBranchIcon,
    EmailIcon,
    PhoneIcon,
} from '@e-coop-monorepo/ui/components/icons'
import ImageDisplay from '@e-coop-monorepo/ui/components/image-display'
import { redirectToGoogleMapsDirection } from '@e-coop-monorepo/ui/components/map/map.utils'
import { Button } from '@e-coop-monorepo/ui/components/ui/button'
import FormFieldWrapper from '@e-coop-monorepo/ui/components/ui/form-field-wrapper'

import { TKYCBranchSchema } from '../../kyc.validation'

interface PersonalInfoStepProps {
    form: UseFormReturn<TKYCBranchSchema>
    onNext: () => void
}

export const BranchSection = ({ form, onNext }: PersonalInfoStepProps) => {
    return (
        <section className="space-y-6 animate-fade-in min-w-0">
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BuildingBranchIcon className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">
                    Choose your branch
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                    Select you prefered branch to join to
                </p>
            </div>

            <div className="space-y-4 min-w-0">
                <FormFieldWrapper
                    control={form.control}
                    name="branch_id"
                    render={({ field }) => (
                        <div className="min-w-0" {...field}>
                            <BranchPickerSection
                                onSelectBranch={(selectedBranch) => {
                                    field.onChange(selectedBranch.id)
                                    form.setValue('branch', selectedBranch)
                                    onNext()
                                }}
                                selectedBranchId={form.watch('branch_id')}
                            />
                        </div>
                    )}
                />
            </div>
        </section>
    )
}

const BranchPickerSection = ({
    selectedBranchId,
    onSelectBranch,
}: {
    selectedBranchId?: TEntityId
    onSelectBranch: (branch: IBranch) => void
}) => {
    const {
        data: branches,
        isPending,
        refetch,
        error,
    } = useGetAllBranch({ mode: 'kyc' })

    return (
        <div className="space-y-2 min-w-0 relative">
            {isPending && (
                <>
                    {Array.from({ length: 3 }).map((_, idx) => (
                        <div
                            className="flex items-center gap-x-2 p-4 rounded-lg border animate-pulse"
                            key={idx}
                        >
                            <div className="h-14 w-14 rounded-md bg-muted" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 w-1/2 bg-muted rounded" />
                                <div className="h-3 w-3/4 bg-muted rounded" />
                            </div>
                            <div className="h-9 w-20 bg-muted rounded-md" />
                        </div>
                    ))}
                </>
            )}

            {!isPending && error && (
                <div className="p-4 rounded-lg border border-destructive/40 bg-destructive/5 text-sm space-y-2">
                    <p className="font-medium text-destructive">
                        Failed to load branches
                    </p>
                    <p className="text-muted-foreground">
                        Please check your connection and try again.
                    </p>
                    <Button
                        onClick={() => refetch()}
                        size="sm"
                        type="button"
                        variant="outline"
                    >
                        Retry
                    </Button>
                </div>
            )}

            {!isPending &&
                !error &&
                branches?.map((branch) => (
                    <div
                        className={cn(
                            'flex items-start sm:items-center gap-x-2 p-4 rounded-lg border transition-colors',
                            selectedBranchId === branch.id && 'border-primary'
                        )}
                        key={branch.id}
                    >
                        <ImageDisplay
                            className="size-8 sm:size-16"
                            src={branch.media?.download_url}
                        />

                        <div
                            className="flex-1 cursor-pointer min-w-0"
                            onClick={() =>
                                redirectToGoogleMapsDirection(
                                    branch.latitude,
                                    branch.longitude
                                )
                            }
                        >
                            <p className="text-lg font-medium truncate">
                                {branch.name}
                            </p>
                            <p className="text-muted-foreground text-sm">
                                {branch.address}
                            </p>
                            <div
                                className="flex gap-x-4"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <p className="text-muted-foreground text-xs">
                                    <PhoneIcon className="inline size-2" />{' '}
                                    {branch.contact_number}
                                </p>
                                <p className="text-muted-foreground text-xs">
                                    <EmailIcon className="inline size-3" />{' '}
                                    {branch.email}
                                </p>
                            </div>
                        </div>

                        <Button
                            onClick={(e) => {
                                e.stopPropagation()
                                onSelectBranch(branch)
                            }}
                            size="sm"
                            type="button"
                            variant={
                                selectedBranchId === branch.id
                                    ? 'default'
                                    : 'outline'
                            }
                        >
                            {selectedBranchId === branch.id ? 'Next' : 'Join'}
                        </Button>
                    </div>
                ))}
        </div>
    )
}

export default BranchSection
