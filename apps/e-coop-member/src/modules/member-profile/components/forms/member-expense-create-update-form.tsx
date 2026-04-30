import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'

import { CurrencyInput } from '@e-coop-monorepo/modules/currency'
import { useFormHelper } from '@e-coop-monorepo/shared/hooks'
import { cn } from '@e-coop-monorepo/shared/tw-utils'
import type {
    IClassProps,
    IForm,
    TEntityId,
} from '@e-coop-monorepo/shared/types'
import FormFooterResetSubmit from '@e-coop-monorepo/ui/core'
import type { IModalProps } from '@e-coop-monorepo/ui/core'
import Modal from '@e-coop-monorepo/ui/core'
import { Form } from '@e-coop-monorepo/ui/core'
import FormFieldWrapper from '@e-coop-monorepo/ui/core'
import { Input } from '@e-coop-monorepo/ui/core'
import TextEditor from '@e-coop-monorepo/ui/core'

import type { IMemberExpenseRequest } from '../../member-profile.types'
import { MemberExpenseSchema } from '../../member-profile.validation'

export interface IMemberExpenseFormProps
    extends
        IClassProps,
        IForm<
            Partial<IMemberExpenseRequest>,
            IMemberExpenseRequest,
            Error,
            IMemberExpenseRequest
        > {
    memberProfileId: TEntityId
    expenseId?: TEntityId
}

const MemberExpenseCreateUpdateForm = ({
    memberProfileId,
    expenseId,
    className,
    ...formProps
}: IMemberExpenseFormProps) => {
    const form = useForm<IMemberExpenseRequest>({
        resolver: standardSchemaResolver(MemberExpenseSchema),
        reValidateMode: 'onChange',
        mode: 'onSubmit',
        defaultValues: {
            name: '',
            amount: 0,
            description: '',
            member_profile_id: memberProfileId,
            ...formProps.defaultValues,
        },
    })

    // const createMutation = useCreateMemberProfileExpense({
    //     options: {
    //         ...withToastCallbacks({
    //             textSuccess: 'Created',
    //             onSuccess: formProps.onSuccess,
    //             onError: formProps.onError,
    //         }),
    //     },
    // })
    // const updateMutation = useUpdateMemberProfileExpense({
    //     options: {
    //         ...withToastCallbacks({
    //             textSuccess: 'Updated',
    //             onSuccess: formProps.onSuccess,
    //             onError: formProps.onError,
    //         }),
    //     },
    // })

    const { formRef, handleFocusError, isDisabled } =
        useFormHelper<IMemberExpenseRequest>({
            form,
            ...formProps,
        })

    const onSubmit = form.handleSubmit(() => {
        // Mock: just log or toast
        if (expenseId) {
            toast.success('Expense updated successfully!')
        } else {
            toast.success('Expense created successfully!')
        }
    }, handleFocusError)

    // const { error: rawError, isPending, reset } = expenseId ? updateMutation : createMutation

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
                            label="Expense Name *"
                            name="name"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    disabled={isDisabled(field.name)}
                                    id={field.name}
                                    placeholder="Expense Name"
                                />
                            )}
                        />
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
                            control={form.control}
                            label="Description *"
                            name="description"
                            render={({ field }) => (
                                <TextEditor
                                    {...field}
                                    content={field.value}
                                    disabled={isDisabled(field.name)}
                                    placeholder="Expense Description..."
                                    textEditorClassName="bg-background !max-w-none"
                                />
                            )}
                        />
                    </fieldset>
                </fieldset>
                <FormFooterResetSubmit
                    disableSubmit={!form.formState.isDirty}
                    error={error}
                    isLoading={isPending}
                    onReset={() => reset()}
                    readOnly={formProps.readOnly}
                    submitText={expenseId ? 'Update' : 'Create'}
                />
            </form>
        </Form>
    )
}

export const MemberExpenseCreateUpdateFormModal = ({
    title = 'Create Expense',
    description = 'Fill out the form to add or update expense.',
    className,
    formProps,
    ...props
}: IModalProps & {
    formProps: Omit<IMemberExpenseFormProps, 'className'>
}) => {
    return (
        <Modal
            className={cn('!max-w-xl', className)}
            description={description}
            title={title}
            {...props}
        >
            <MemberExpenseCreateUpdateForm
                {...formProps}
                onSuccess={(createdData) => {
                    formProps?.onSuccess?.(createdData)
                    props.onOpenChange?.(false)
                }}
            />
        </Modal>
    )
}

export default MemberExpenseCreateUpdateForm
