import { useState } from 'react'

import { useModalState } from '@e-coop-monorepo/shared/hooks'
import {
    CookieBiteIcon,
    FilesIcon,
    RefreshCwIcon,
    ShieldIcon,
    Users3Icon,
} from '@e-coop-monorepo/ui/components/icons'
import Modal from '@e-coop-monorepo/ui/components/modals/modal'
import { Card } from '@e-coop-monorepo/ui/components/ui/card'
import { ArrowUpRight, ChevronRight, Shield } from 'lucide-react'
import { IconType } from 'react-icons/lib'

import { IOrganization } from '../../organization.types'

interface OrganizationLegalPoliciesProps {
    organization: IOrganization
}

const OrganizationLegalPolicies = ({
    organization,
}: OrganizationLegalPoliciesProps) => {
    const openLegalPolicies = useModalState(false)
    const [selectedPolicies, setSelectedPolicies] = useState<{
        title: string
        content: string
        icon?: IconType
        iconColor: string
        gradient: string
    }>({
        title: '',
        icon: undefined,
        content: '',
        iconColor: '',
        gradient: '',
    })

    const LegalPolicies = [
        {
            key: 'terms',
            title: 'Terms & Conditions',
            content: organization.terms_and_conditions,
            icon: FilesIcon,
            gradient: 'from-blue-500/10 to-indigo-500/10',
            iconColor: 'text-blue-500',
        },
        {
            key: 'privacy',
            title: 'Privacy Policy',
            content: organization.privacy_policy,
            icon: ShieldIcon,
            gradient: 'from-emerald-500/10 to-teal-500/10',
            iconColor: 'text-emerald-500',
        },
        {
            key: 'cookie',
            title: 'Cookie Policy',
            content: organization.cookie_policy,
            icon: CookieBiteIcon,
            gradient: 'from-amber-500/10 to-orange-500/10',
            iconColor: 'text-amber-500',
        },
        {
            key: 'user',
            title: 'User Agreement',
            content: organization.user_agreement,
            icon: Users3Icon,
            gradient: 'from-purple-500/10 to-pink-500/10',
            iconColor: 'text-purple-500',
        },
        {
            key: 'refund',
            title: 'Refund Policy',
            content: organization.refund_policy,
            icon: RefreshCwIcon,
            gradient: 'from-rose-500/10 to-red-500/10',
            iconColor: 'text-rose-500',
        },
    ]
    const PolicyIcon = selectedPolicies.icon
    return (
        <div>
            <Modal {...openLegalPolicies}>
                {selectedPolicies && PolicyIcon && (
                    <>
                        <div className="flex items-end space-x-2 justify-start">
                            <div
                                className={`p-2.5 rounded-xl bg-linear-to-br ${selectedPolicies.gradient} transition-all duration-300 group-hover:scale-110`}
                            >
                                <PolicyIcon
                                    className={`h-5 w-5 ${selectedPolicies.iconColor}`}
                                />
                            </div>
                            <h3 className="text-sm font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors duration-300">
                                {selectedPolicies.title}
                            </h3>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                {selectedPolicies.content}
                            </p>
                        </div>
                    </>
                )}
            </Modal>
            {(organization.terms_and_conditions ||
                organization.privacy_policy ||
                organization.cookie_policy ||
                organization.user_agreement ||
                organization.refund_policy) && (
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-linear-to-br from-primary/20 to-primary/10">
                            <Shield className="h-5 w-5 text-primary" />
                        </div>
                        <h2 className="text-xl font-semibold text-foreground">
                            Legal & Policies
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {LegalPolicies.filter((policy) => policy.content).map(
                            (policy) => {
                                const IconComponent = policy.icon
                                return (
                                    <Card
                                        className="group relative overflow-hidden p-5 bg-card border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 cursor-pointer"
                                        key={policy.key}
                                    >
                                        {/* Background gradient */}
                                        <div
                                            className={`absolute inset-0 bg-linear-to-br ${policy.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                                        />

                                        {/* Decorative corner */}
                                        <div className="absolute -top-8 -right-8 w-16 h-16 bg-linear-to-br from-primary/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        <div className="relative space-y-3">
                                            <div className="flex items-start justify-between">
                                                <div
                                                    className={`p-2.5 rounded-xl bg-linear-to-br ${policy.gradient} transition-all duration-300 group-hover:scale-110`}
                                                >
                                                    <IconComponent
                                                        className={`h-5 w-5 ${policy.iconColor}`}
                                                    />
                                                </div>
                                                <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                                            </div>

                                            <div>
                                                <h3 className="text-sm font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors duration-300">
                                                    {policy.title}
                                                </h3>
                                                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                                                    {policy.content}
                                                </p>
                                            </div>

                                            <div className="pt-2 border-t border-border/50">
                                                <span
                                                    className="text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1"
                                                    onClick={() => {
                                                        if (policy.content) {
                                                            setSelectedPolicies(
                                                                {
                                                                    title: policy.title,
                                                                    icon: policy.icon,
                                                                    content:
                                                                        policy.content,
                                                                    gradient:
                                                                        policy.gradient,
                                                                    iconColor:
                                                                        policy.iconColor,
                                                                }
                                                            )
                                                            openLegalPolicies.onOpenChange(
                                                                true
                                                            )
                                                        }
                                                    }}
                                                >
                                                    Read full document
                                                    <ArrowUpRight className="h-3 w-3" />
                                                </span>
                                            </div>
                                        </div>
                                    </Card>
                                )
                            }
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default OrganizationLegalPolicies
