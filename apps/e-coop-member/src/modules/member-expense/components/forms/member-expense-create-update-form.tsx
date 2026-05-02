import { useForm } from 'react-hook-form'
import type z from 'zod'

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'

import { CurrencyInput } from '@ecoop/modules/currency'
import { withToastCallbacks } from '@ecoop/shared/helpers'
import { serverRequestErrExtractor } from '@ecoop/shared/helpers'
import { useFormHelper } from '@ecoop/shared/hooks'
import { cn } from '@ecoop/shared/tw-utils'
import type { IClassProps, IForm, TEntityId } from '@ecoop/shared/types'
import FormFooterResetSubmit from '@ecoop/ui/core'
import type { IModalProps } from '@ecoop/ui/core'
import Modal from '@ecoop/ui/core'
import TextEditor from '@ecoop/ui/core'
import { Form } from '@ecoop/ui/core'
import FormFieldWrapper from '@ecoop/ui/core'
import { Input } from '@ecoop/ui/core'

import {
    useCreateMemberProfileExpense,
    useUpdateMemberProfileExpense,
} from '../../member-expense.service'
import type { IMemberExpense } from '../../member-expense.types'
import { MemberExpenseSchema } from '../../member-expense.validation'

type TMemberExpenseFormValues = z.infer<typeof MemberExpenseSchema>

export interface IMemberExpenseFormProps
    extends
        IClassProps,
        IForm<
            Partial<TMemberExpenseFormValues>,
            IMemberExpense,
            Error,
            TMemberExpenseFormValues
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
    const form = useForm<TMemberExpenseFormValues>({
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

    const createMutation = useCreateMemberProfileExpense({
        options: {
            ...withToastCallbacks({
                textSuccess: 'Created',
                onSuccess: formProps.onSuccess,
                onError: formProps.onError,
            }),
        },
    })
    const updateMutation = useUpdateMemberProfileExpense({
        options: {
            ...withToastCallbacks({
                textSuccess: 'Updated',
                onSuccess: formProps.onSuccess,
                onError: formProps.onError,
            }),
        },
    })

    const { formRef, handleFocusError, isDisabled } =
        useFormHelper<TMemberExpenseFormValues>({
            form,
            ...formProps,
        })

    const onSubmit = form.handleSubmit((formData) => {
        if (expenseId) {
            updateMutation.mutate({
                memberProfileId,
                expenseId,
                data: formData,
            })
        } else {
            createMutation.mutate({
                memberProfileId,
                data: formData,
            })
        }
    }, handleFocusError)

    const {
        error: rawError,
        isPending,
        reset,
    } = expenseId ? updateMutation : createMutation

    const error = serverRequestErrExtractor({ error: rawError })

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
                                    placeholder="Asset Description..."
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
                    onReset={() => {
                        form.reset()
                        reset()
                    }}
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
