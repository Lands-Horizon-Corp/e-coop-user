import { useMemo } from 'react'

import { UseFormReturn } from 'react-hook-form'
import { toast } from 'sonner'

import { ORGANIZATION_ID } from '@/constants'
import { cn } from '@/helpers'
import { serverRequestErrExtractor } from '@/helpers/error-message-extractor'
import { useGetOrganizationById } from '@/modules/organization'
import { FileText } from 'lucide-react'

import {
    CookieBiteIcon,
    RefreshIcon,
    ShieldIcon,
    Users3FillIcon,
} from '@e-coop-monorepo/ui/components/icons'
import TextRenderer from '@e-coop-monorepo/ui/components/text-renderer'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@e-coop-monorepo/ui/components/ui/accordion'
import { Button } from '@e-coop-monorepo/ui/components/ui/button'
import { Checkbox } from '@e-coop-monorepo/ui/components/ui/checkbox'
import FormFieldWrapper from '@e-coop-monorepo/ui/components/ui/form-field-wrapper'
import { Label } from '@e-coop-monorepo/ui/components/ui/label'
import { ScrollArea } from '@e-coop-monorepo/ui/components/ui/scroll-area'

import { useKYCRegister } from '../..'
import { KYCRegisterSchema, TKYCAgreeTermsSchema } from '../../kyc.validation'

interface AgreeTermRegisterSectionProps {
    form: UseFormReturn<TKYCAgreeTermsSchema>
    onNext: () => void
    onBack: () => void
}

export const AgreeTermRegisterSection = ({
    form,
    onNext,
}: AgreeTermRegisterSectionProps) => {
    const registerMutation = useKYCRegister()

    const { data: organization } = useGetOrganizationById({
        id: ORGANIZATION_ID,
    })

    const policyData = useMemo(() => {
        return [
            {
                id: 'terms_and_conditions',
                title: 'Terms & Conditions',
                subtitle: 'General terms of service',
                icon: FileText,
                content: organization?.terms_and_conditions,
            },
            {
                id: 'privacy_policy',
                title: 'Privacy Policy',
                subtitle: 'How we handle your data',
                icon: ShieldIcon,
                content: organization?.privacy_policy,
            },
            {
                id: 'cookie_policy',
                title: 'Cookie Policy',
                subtitle: 'Browser cookies and tracking',
                icon: CookieBiteIcon,
                content: organization?.cookie_policy,
            },
            {
                id: 'refund_policy',
                title: 'Refund Policy',
                subtitle: 'Membership and service refunds',
                icon: RefreshIcon,
                content: organization?.refund_policy,
            },
            {
                id: 'user_agreement',
                title: 'User Agreement',
                subtitle: 'Platform usage guidelines',
                icon: Users3FillIcon,
                content: organization?.user_agreement,
            },
        ]
    }, [organization])

    const onSubmit = async () => {
        const validate1 = await form.trigger()
        const result = await KYCRegisterSchema.safeParseAsync(form.getValues())

        if (validate1 && result.success) {
            toast.promise(registerMutation.mutateAsync(result.data), {
                loading: 'Registering...',
                success: (data) => {
                    onNext()
                    form.setValue('register_data', data)
                    return 'Congratulations, you are now registered!'
                },
                error: (error) => serverRequestErrExtractor({ error }),
            })
            return
        }

        if (!result.success) {
            toast.error(result.error.issues[0].message)
        }
    }

    return (
        <section className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
                <div className="relative w-20 h-20 mx-auto mb-5">
                    <div className="relative w-full h-full bg-primary/10 border-primary border rounded-2xl flex items-center justify-center shadow-lg">
                        <FileText className="w-9 h-9 text-primary" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                    Almost There!
                </h2>
                <p className="text-sm text-muted-foreground mt-2">
                    Review and accept our terms to complete registration
                </p>
            </div>

            <FormFieldWrapper
                control={form.control}
                name="agree_terms"
                render={({ field }) => {
                    const accepted = Boolean(field.value)

                    return (
                        <div
                            className={cn(
                                'rounded-2xl border-2 overflow-hidden transition-all',
                                accepted
                                    ? 'border-primary/50 bg-primary/5'
                                    : 'border-border bg-card'
                            )}
                        >
                            {/* Policy Accordions */}
                            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden mb-6 animate-slide-up">
                                <Accordion
                                    className="divide-y divide-border"
                                    type="multiple"
                                >
                                    {policyData.map((policy) => {
                                        const Icon = policy.icon
                                        return (
                                            <AccordionItem
                                                className="border-none"
                                                key={policy.id}
                                                value={policy.id}
                                            >
                                                <AccordionTrigger className="px-4 sm:px-6 py-4 hover:no-underline hover:bg-muted/50 transition-colors">
                                                    <div className="flex items-center gap-3 sm:gap-4 text-left">
                                                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                                            <Icon className="w-5 h-5 text-primary" />
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-foreground text-sm sm:text-base">
                                                                {policy.title}
                                                            </p>
                                                            <p className="text-xs sm:text-sm text-muted-foreground">
                                                                {
                                                                    policy.subtitle
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="px-4 sm:px-6 pb-4">
                                                    <ScrollArea className="h-[200px] sm:h-[250px] rounded-lg border border-border bg-muted/30 p-4">
                                                        <TextRenderer
                                                            className="prose prose-sm dark:prose-invert max-w-none
                          [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-4 [&_h3]:mb-2 [&_h3]:first:mt-0
                          [&_p]:text-muted-foreground [&_p]:text-sm [&_p]:leading-relaxed [&_p]:mb-3
                          [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:mb-3 [&_ul]:space-y-1
                          [&_li]:text-muted-foreground [&_li]:text-sm
                          [&_strong]:text-foreground [&_strong]:font-medium"
                                                            content={
                                                                policy.content ||
                                                                ''
                                                            }
                                                        />
                                                    </ScrollArea>
                                                </AccordionContent>
                                            </AccordionItem>
                                        )
                                    })}
                                </Accordion>
                            </div>

                            <div className="flex items-center gap-3 p-4 cursor-pointer border-t">
                                <Checkbox
                                    checked={accepted}
                                    id="agree_terms"
                                    onCheckedChange={(val) =>
                                        field.onChange(Boolean(val))
                                    }
                                />
                                <Label
                                    className="text-sm font-medium"
                                    htmlFor="agree_terms"
                                >
                                    I agree to the Terms & Privacy Policy
                                </Label>
                            </div>
                        </div>
                    )
                }}
            />

            <div className="flex gap-3 pt-4">
                <Button
                    className="flex-1"
                    disabled={registerMutation.isPending}
                    onClick={onSubmit}
                    // type="button"
                >
                    Register
                </Button>
            </div>
        </section>
    )
}

export default AgreeTermRegisterSection
