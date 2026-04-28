import { Resolver, UseFormReturn, useForm } from 'react-hook-form'

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'

import { cn } from '@e-coop-monorepo/shared/helpers/tw-utils'
import { useFormHelper } from '@e-coop-monorepo/shared/hooks'
import { IClassProps, IForm } from '@e-coop-monorepo/shared/types'
import { ChevronLeftIcon } from '@e-coop-monorepo/ui'
import { Button } from '@e-coop-monorepo/ui'
import { Form } from '@e-coop-monorepo/ui'

import {
    IKYCRegisterRequest,
    IKYCSelfieRequest,
    IKYCVerifyAddressesRequest,
    IKYCVerifyEmailRequest,
    IKYCVerifyGovernmentBenefitsRequest,
    IKYCVerifyPersonalInfoRequest,
    IKYCVerifyPhoneRequest,
    IKYCVerifySecurityDetailsRequest,
} from '../../kyc.types'
import {
    KYCDiscriminatedRegisterSchema,
    TKYCAgreeTermsSchema,
    TKYCBranchSchema,
    TKYCRegisterSchema,
} from '../../kyc.validation'
import AgreeTermRegisterSection from './agree-term-register-section'
import BranchSection from './branch-section'
import CompleteSection from './complete-section'
import PersonalDetailSection from './personal-details-section'
import SecurityDetailSection from './security-details-section'
import KYCStartSection from './start-section'
import VerifyAddressesSection from './verify-address-section'
import VerifyEmailSection from './verify-email-section'
import VerifyFaceRecognitionSection from './verify-face-recognize-section'
import VerifyGovernmentBenefitsSection from './verify-government-benefit-section'
import VerifyPhoneSection from './verify-phone-section'

export interface IKYCRegisterFormProps
    extends
        IClassProps,
        IForm<Partial<IKYCRegisterRequest>, void, Error, IKYCRegisterRequest> {
    onCompleteKYCRegister?: () => void
}

const KYCRegisterForm = ({
    className,
    defaultValues,
    onCompleteKYCRegister,
    ...formProps
}: IKYCRegisterFormProps) => {
    const form = useForm<IKYCRegisterRequest>({
        resolver: standardSchemaResolver(
            KYCDiscriminatedRegisterSchema
        ) as unknown as Resolver<IKYCRegisterRequest>,
        reValidateMode: 'onChange',
        mode: 'onSubmit',
        defaultValues: {
            step: 0,
            first_name: '',
            last_name: '',
            username: '',
            middle_name: '',
            suffix: '',
            ...defaultValues,
        },
    })

    const { formRef, handleFocusError } = useFormHelper<IKYCRegisterRequest>({
        form,
        ...formProps,
    })

    const onSubmit = form.handleSubmit(() => {
        // if (billsAndCoinId) {
        //     updateMutation.mutate({ id: billsAndCoinId, payload: formData })
        // } else {
        //     createMutation.mutate(formData)
        // }
    }, handleFocusError)

    // const {
    //     error: rawError,
    //     isPending,
    //     reset,
    // } = billsAndCoinId ? updateMutation : createMutation

    // const error = serverRequestErrExtractor({ error: rawError })

    const step = form.watch('step')

    const handleNext = () => {
        form.setValue('step', step + 1)
    }

    const handleBack = () => {
        form.setValue('step', Math.max(step - 1, 0)) // never go below 1
    }

    const Sections = [
        <KYCStartSection onNext={handleNext} />,
        <BranchSection
            form={form as unknown as UseFormReturn<TKYCBranchSchema>}
            onNext={handleNext}
        />,
        <PersonalDetailSection
            form={
                form as unknown as UseFormReturn<IKYCVerifyPersonalInfoRequest>
            }
            onNext={handleNext}
        />,
        <SecurityDetailSection
            form={
                form as unknown as UseFormReturn<IKYCVerifySecurityDetailsRequest>
            }
            onBack={handleBack}
            onNext={handleNext}
        />,
        <VerifyEmailSection
            form={form as unknown as UseFormReturn<IKYCVerifyEmailRequest>}
            onBack={handleBack}
            onNext={handleNext}
        />,
        <VerifyPhoneSection
            form={form as unknown as UseFormReturn<IKYCVerifyPhoneRequest>}
            onBack={handleBack}
            onNext={handleNext}
        />,
        <VerifyAddressesSection
            form={form as unknown as UseFormReturn<IKYCVerifyAddressesRequest>}
            onBack={handleBack}
            onNext={handleNext}
        />,
        <VerifyGovernmentBenefitsSection
            form={
                form as unknown as UseFormReturn<IKYCVerifyGovernmentBenefitsRequest>
            }
            onBack={handleBack}
            onNext={handleNext}
        />,
        <VerifyFaceRecognitionSection
            form={form as unknown as UseFormReturn<IKYCSelfieRequest>}
            onBack={handleBack}
            onNext={handleNext}
        />,
        <AgreeTermRegisterSection
            form={form as unknown as UseFormReturn<TKYCAgreeTermsSchema>}
            onBack={handleBack}
            onNext={handleNext}
        />,
        <CompleteSection
            form={form as unknown as UseFormReturn<TKYCRegisterSchema>}
            onComplete={() => {
                onCompleteKYCRegister?.()
            }}
        />,
    ]

    return (
        <Form {...form}>
            <form
                className={cn('flex w-full flex-col gap-y-4', className)}
                onSubmit={onSubmit}
                ref={formRef}
            >
                <fieldset
                    className="grid gap-x-6 gap-y-4 sm:gap-y-3"
                    disabled={/*isPending || */ formProps.readOnly}
                >
                    <div className="flex justify-between items-center">
                        {step !== Sections.length ? (
                            <Button
                                onClick={handleBack}
                                size="sm"
                                type="button"
                                variant="secondary"
                            >
                                <ChevronLeftIcon /> Back
                            </Button>
                        ) : (
                            <p></p>
                        )}

                        <div className=" py-2 px-4 text-sm bg-muted rounded-full">
                            Step{' '}
                            <span className="text-primary font-bold">
                                {step + 1}
                            </span>{' '}
                            of {Sections.length}
                        </div>
                    </div>
                    {Sections[step]}
                </fieldset>

                <div
                    className="flex items-center justify-center gap-2 mt-6 animate-fade-in"
                    style={{ animationDelay: '700ms' }}
                >
                    {Sections.map((_, i) => {
                        return (
                            <div
                                className={cn(
                                    'w-5 h-1.5 rounded-full bg-muted',
                                    step === i && 'bg-primary'
                                )}
                                key={i}
                            />
                        )
                    })}
                </div>
                {/* <FormFooterResetSubmit
                    disableSubmit={!form.formState.isDirty}
                    error={error}
                    isLoading={isPending}
                    onReset={() => {
                        form.reset()
                        reset()
                    }}
                    readOnly={formProps.readOnly}
                    submitText='Create'
                /> */}
            </form>
        </Form>
    )
}

export default KYCRegisterForm
