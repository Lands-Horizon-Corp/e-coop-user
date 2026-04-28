import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'

import { CurrencyInput } from '@e-coop-monorepo/modules/currency'
import { toInputDateString } from '@e-coop-monorepo/shared/helpers'
import { useFormHelper } from '@e-coop-monorepo/shared/hooks'
import { cn } from '@e-coop-monorepo/shared/tw-utils'
import { IClassProps, IForm, TEntityId } from '@e-coop-monorepo/shared/types'
import FormFooterResetSubmit from '@e-coop-monorepo/ui'
import Modal, { IModalProps } from '@e-coop-monorepo/ui'
import { Form } from '@e-coop-monorepo/ui'
import FormFieldWrapper from '@e-coop-monorepo/ui'
import ImageField from '@e-coop-monorepo/ui'
import { Input } from '@e-coop-monorepo/ui'
import InputDate from '@e-coop-monorepo/ui'

import { IMemberIncomeRequest } from '../../member-profile.types'
import { MemberIncomeSchema } from '../../member-profile.validation'

export interface IMemberIncomeFormProps
    extends
        IClassProps,
        IForm<
            Partial<IMemberIncomeRequest>,
            IMemberIncomeRequest,
            string,
            IMemberIncomeRequest
        > {
    memberProfileId: TEntityId
    incomeId?: TEntityId
}

const MemberIncomeCreateUpdateForm = ({
    incomeId,
    className,
    ...formProps
}: IMemberIncomeFormProps) => {
    const form = useForm<IMemberIncomeRequest>({
        resolver: standardSchemaResolver(MemberIncomeSchema),
        reValidateMode: 'onChange',
        mode: 'onSubmit',
        defaultValues: {
            source: '',
            amount: 0,
            name: '',
            ...formProps.defaultValues,
            release_date: toInputDateString(
                formProps.defaultValues?.release_date ?? new Date()
            ),
        },
    })

    // const createMutation = useCreateMemberProfileIncome(...)
    // const updateMutation = useUpdateMemberProfileIncome(...)

    const { formRef, handleFocusError, isDisabled } =
        useFormHelper<IMemberIncomeRequest>({
            form,
            ...formProps,
        })

    const onSubmit = form.handleSubmit((formData) => {
        // Mock only – no API calls
        if (incomeId) {
            toast.success('Updated')
        } else {
            toast.success('Created')
        }

        formProps?.onSuccess?.(formData)
    }, handleFocusError)

    // MOCK MODE:
    const error = undefined
    const isPending = false
    const reset = () => form.reset()

    return (
        <Form {...form}>
            <form
                className={cn('flex w-full flex-col gap-y-4', className)}
                onSubmit={onSubmit}
                ref={formRef}
            >
                <fieldset
                    className="grid gap-x-6 gap-y-4 sm:gap-y-3"
                    disabled={isPending || formProps.readOnly}
                >
                    <fieldset className="space-y-3">
                        <FormFieldWrapper
                            control={form.control}
                            label="Name *"
                            name="name"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    disabled={isDisabled(field.name)}
                                    id={field.name}
                                    placeholder="Name"
                                />
                            )}
                        />
                        <FormFieldWrapper
                            control={form.control}
                            label="Income Source *"
                            name="source"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    disabled={isDisabled(field.name)}
                                    id={field.name}
                                    placeholder="Income Source"
                                />
                            )}
                        />
                        <div className="grid grid-cols-2 gap-x-2">
                            <FormFieldWrapper
                                control={form.control}
                                label="Amount *"
                                name="amount"
                                render={({ field: { onChange, ...field } }) => (
                                    <CurrencyInput
                                        {...field}
                                        disabled={isDisabled(field.name)}
                                        onValueChange={(newValue = '') => {
                                            onChange(newValue)
                                        }}
                                        placeholder="Amount"
                                    />
                                )}
                            />
                            <FormFieldWrapper
                                className="relative"
                                control={form.control}
                                description="mm/dd/yyyy"
                                descriptionClassName="absolute top-0 right-0"
                                label="Date Received *"
                                name="release_date"
                                render={({ field }) => (
                                    <InputDate
                                        {...field}
                                        className="block"
                                        disabled={isDisabled(field.name)}
                                        placeholder="Release Date"
                                        value={field.value ?? ''}
                                    />
                                )}
                            />
                        </div>
                        <FormFieldWrapper
                            control={form.control}
                            label="Photo"
                            name="media_id"
                            render={({ field }) => {
                                return (
                                    <ImageField
                                        {...field}
                                        placeholder="Upload Income Photo"
                                        value={form.watch('media')}
                                    />
                                )
                            }}
                        />
                    </fieldset>
                </fieldset>
                <FormFooterResetSubmit
                    disableSubmit={!form.formState.isDirty}
                    error={error}
                    isLoading={isPending}
                    onReset={() => {
                        form.reset()
                        reset()
                    }}
                    readOnly={formProps.readOnly}
                    submitText={incomeId ? 'Update' : 'Create'}
                />
            </form>
        </Form>
    )
}

export const MemberIncomeCreateUpdateFormModal = ({
    title = 'Create Income',
    description = 'Fill out the form to add or update income.',
    className,
    formProps,
    ...props
}: IModalProps & {
    formProps: Omit<IMemberIncomeFormProps, 'className'>
}) => {
    return (
        <Modal
            className={cn('', className)}
            description={description}
            title={title}
            {...props}
        >
            <MemberIncomeCreateUpdateForm
                {...formProps}
                onSuccess={(createdData) => {
                    formProps?.onSuccess?.(createdData)
                    props.onOpenChange?.(false)
                }}
            />
        </Modal>
    )
}

export default MemberIncomeCreateUpdateForm
