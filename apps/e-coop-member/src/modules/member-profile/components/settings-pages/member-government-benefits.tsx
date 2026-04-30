import type { ReactNode} from 'react';
import { useState } from 'react'

import { toast } from 'sonner'

import { cn } from '@e-coop-monorepo/shared/tw-utils'
import { Button } from '@e-coop-monorepo/ui/core'
import ImageField from '@e-coop-monorepo/ui/core'
import { Input } from '@e-coop-monorepo/ui/core'
import { Label } from '@e-coop-monorepo/ui/core'
import { Textarea } from '@e-coop-monorepo/ui/core'
import {
    AlertCircle,
    Calendar,
    CheckCircle,
    Clock,
    FileText,
    Globe,
    Hash,
    IdCard,
    Pencil,
    Plus,
    X,
} from 'lucide-react'

import type { IMemberProfile } from '../../member-profile.types'
import { CountryCombobox } from '../comboboxes/country-combobox'
import GovernmentIdCombobox from '../comboboxes/government-id-combobox'

type TEntityId = string

export interface IGovernmentId {
    name: string
    has_expiry_date: boolean
    field_name: string
    has_number: boolean
    regex: string
}

export interface IMemberGovernmentBenefit {
    id: TEntityId
    member_profile_id: TEntityId
    front_media_url?: string
    back_media_url?: string
    name: string
    country_code: string
    value?: string
    expiry_date?: string
    description?: string
}

export const mockGovernmentIds: IGovernmentId[] = [
    {
        name: 'Passport',
        has_expiry_date: true,
        field_name: 'passport_number',
        has_number: true,
        regex: '^[A-Z0-9]{6,9}$',
    },
    {
        name: "Driver's License",
        has_expiry_date: true,
        field_name: 'drivers_license_number',
        has_number: true,
        regex: '^[A-Z0-9]{5,10}$',
    },
    {
        name: 'SSS ID',
        has_expiry_date: false,
        field_name: 'sss_number',
        has_number: true,
        regex: '^\\d{10}$',
    },
    {
        name: 'PhilHealth ID',
        has_expiry_date: false,
        field_name: 'philhealth_number',
        has_number: true,
        regex: '^\\d{12}$',
    },
    {
        name: 'TIN',
        has_expiry_date: false,
        field_name: 'tin_number',
        has_number: true,
        regex: '^\\d{9}$',
    },
    {
        name: 'UMID',
        has_expiry_date: false,
        field_name: 'umid_number',
        has_number: true,
        regex: '^\\d{12}$',
    },
    {
        name: "Voter's ID",
        has_expiry_date: false,
        field_name: 'voters_id_number',
        has_number: true,
        regex: '^[A-Z0-9]{10,20}$',
    },
    {
        name: 'PRC ID',
        has_expiry_date: true,
        field_name: 'prc_number',
        has_number: true,
        regex: '^\\d{7}$',
    },
]

const COUNTRY_OPTIONS = [
    { code: 'PH', name: 'Philippines' },
    { code: 'US', name: 'United States' },
    { code: 'SG', name: 'Singapore' },
    { code: 'JP', name: 'Japan' },
    { code: 'KR', name: 'South Korea' },
    { code: 'AU', name: 'Australia' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'CA', name: 'Canada' },
]

interface GovernmentBenefitSectionProps {
    title: string
    description?: string
    icon?: ReactNode
    onAdd: () => void
    addLabel: string
    isFormOpen: boolean
    form: ReactNode
    children: ReactNode
    isEmpty: boolean
    emptyMessage: string
}

function GovernmentBenefitSection({
    title,
    description,
    icon,
    onAdd,
    addLabel,
    isFormOpen,
    form,
    children,
    isEmpty,
    emptyMessage,
}: GovernmentBenefitSectionProps) {
    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {icon && (
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            {icon}
                        </div>
                    )}
                    <div>
                        <h2 className="text-lg font-semibold text-foreground">
                            {title}
                        </h2>
                        {description && (
                            <p className="text-sm text-muted-foreground">
                                {description}
                            </p>
                        )}
                    </div>
                </div>
                {!isFormOpen && (
                    <Button className="gap-2" onClick={onAdd}>
                        <Plus className="w-4 h-4" />
                        {addLabel}
                    </Button>
                )}
            </div>

            {isFormOpen && form}

            {!isEmpty ? (
                <div className="grid gap-4 sm:grid-cols-2">{children}</div>
            ) : !isFormOpen ? (
                <div className="flex flex-col items-center justify-center py-12 border border-dashed border-border rounded-xl bg-card/50">
                    <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mb-4">
                        <IdCard className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground text-sm">
                        {emptyMessage}
                    </p>
                </div>
            ) : null}
        </section>
    )
}

interface GovernmentBenefitCardProps {
    benefit: IMemberGovernmentBenefit
    onEdit: (benefit: IMemberGovernmentBenefit) => void
}

function getExpiryStatus(
    expiryDate?: string
): 'valid' | 'expiring' | 'expired' | 'none' {
    if (!expiryDate) return 'none'

    const today = new Date()
    const expiry = new Date(expiryDate)
    const diffDays = Math.ceil(
        (expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    )

    if (diffDays < 0) return 'expired'
    if (diffDays <= 90) return 'expiring'
    return 'valid'
}

function getExpiryStatusConfig(
    status: 'valid' | 'expiring' | 'expired' | 'none'
) {
    switch (status) {
        case 'valid':
            return {
                color: 'bg-green-500/15 text-green-600 dark:text-green-400',
                icon: CheckCircle,
                label: 'Valid',
            }
        case 'expiring':
            return {
                color: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
                icon: Clock,
                label: 'Expiring Soon',
            }
        case 'expired':
            return {
                color: 'bg-destructive/15 text-destructive',
                icon: AlertCircle,
                label: 'Expired',
            }
        default:
            return null
    }
}

function getGovernmentIdConfig(name: string) {
    const config = mockGovernmentIds.find((id) => id.name === name)
    return config
}

function formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}

function getCountryName(code: string): string {
    const country = COUNTRY_OPTIONS.find((c) => c.code === code)
    return country?.name || code
}

// function GovernmentBenefitCard({
//     benefit,
//     onEdit,
// }: GovernmentBenefitCardProps) {
//     const expiryStatus = getExpiryStatus(benefit.expiry_date)
//     const statusConfig = getExpiryStatusConfig(expiryStatus)
//     const govConfig = getGovernmentIdConfig(benefit.name)

//     return (
//         <div className="group relative bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-all duration-200">
//             <button
//                 aria-label="Edit government ID"
//                 className="absolute top-4 right-4 p-2 rounded-lg bg-secondary/50 opacity-0 group-hover:opacity-100 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
//                 onClick={() => onEdit(benefit)}
//             >
//                 <Pencil className="w-4 h-4" />
//             </button>

//             <div className="flex items-start gap-4">
//                 <div className="relative">
//                     <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
//                         <IdCard className="w-5 h-5 text-primary" />
//                     </div>
//                     {govConfig?.has_expiry_date && statusConfig && (
//                         <div
//                             className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center ${
//                                 expiryStatus === 'valid'
//                                     ? 'bg-green-500'
//                                     : expiryStatus === 'expiring'
//                                       ? 'bg-amber-500'
//                                       : 'bg-destructive'
//                             }`}
//                         >
//                             <statusConfig.icon className="w-3 h-3 text-white" />
//                         </div>
//                     )}
//                 </div>

//                 <div className="flex-1 min-w-0">
//                     <h4 className="font-semibold text-foreground truncate pr-10">
//                         {benefit.name}
//                     </h4>

//                     <div className="flex items-center gap-2 mt-1.5 flex-wrap">
//                         <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/15 text-primary">
//                             <Globe className="w-3 h-3" />
//                             {getCountryName(benefit.country_code)}
//                         </span>
//                         {statusConfig && (
//                             <span
//                                 className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.color}`}
//                             >
//                                 <statusConfig.icon className="w-3 h-3" />
//                                 {statusConfig.label}
//                             </span>
//                         )}
//                     </div>

//                     <div className="flex flex-col gap-1.5 mt-3 text-sm text-muted-foreground">
//                         {benefit.value && (
//                             <div className="flex items-center gap-1.5">
//                                 <Hash className="w-3.5 h-3.5 shrink-0" />
//                                 <span className="font-mono tracking-wide">
//                                     {benefit.value}
//                                 </span>
//                             </div>
//                         )}
//                         {benefit.expiry_date && (
//                             <div className="flex items-center gap-1.5">
//                                 <Calendar className="w-3.5 h-3.5 shrink-0" />
//                                 <span>
//                                     Expires: {formatDate(benefit.expiry_date)}
//                                 </span>
//                             </div>
//                         )}
//                     </div>

//                     {benefit.description && (
//                         <div className="flex items-start gap-1.5 mt-3 text-sm text-muted-foreground">
//                             <FileText className="w-3.5 h-3.5 mt-0.5 shrink-0" />
//                             <p className="line-clamp-2">
//                                 {benefit.description}
//                             </p>
//                         </div>
//                     )}

//                     {(benefit.front_media_url || benefit.back_media_url) && (
//                         <div className="flex items-center gap-2 mt-3">
//                             {benefit.front_media_url && (
//                                 <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
//                                     Front ✓
//                                 </span>
//                             )}
//                             {benefit.back_media_url && (
//                                 <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
//                                     Back ✓
//                                 </span>
//                             )}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     )
// }

export function GovernmentBenefitCard({
    benefit,
    onEdit,
}: GovernmentBenefitCardProps) {
    const expiryStatus = getExpiryStatus(benefit.expiry_date)
    const statusConfig = getExpiryStatusConfig(expiryStatus)
    const govConfig = getGovernmentIdConfig(benefit.name)

    return (
        <div className="group relative bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-all duration-200">
            <button
                aria-label="Edit government ID"
                className="absolute top-4 right-4 p-2 rounded-lg bg-secondary/50 opacity-0 group-hover:opacity-100 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                onClick={() => onEdit(benefit)}
            >
                <Pencil className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-4">
                <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                        <IdCard className="w-5 h-5 text-primary" />
                    </div>

                    {govConfig?.has_expiry_date && statusConfig && (
                        <div
                            className={cn(
                                'absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center',
                                expiryStatus === 'valid'
                                    ? 'bg-green-500'
                                    : expiryStatus === 'expiring'
                                      ? 'bg-amber-500'
                                      : 'bg-destructive'
                            )}
                        >
                            <statusConfig.icon className="w-3 h-3 text-white" />
                        </div>
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground truncate pr-10">
                        {benefit.name}
                    </h4>

                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/15 text-primary">
                            <Globe className="w-3 h-3" />
                            {getCountryName(benefit.country_code)}
                        </span>

                        {statusConfig && (
                            <span
                                className={cn(
                                    'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium',
                                    statusConfig.color
                                )}
                            >
                                <statusConfig.icon className="w-3 h-3" />
                                {statusConfig.label}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-1.5 mt-3 text-sm text-muted-foreground">
                        {benefit.value && (
                            <div className="flex items-center gap-1.5">
                                <Hash className="w-3.5 h-3.5 shrink-0" />
                                <span className="font-mono tracking-wide">
                                    {benefit.value}
                                </span>
                            </div>
                        )}

                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 shrink-0" />
                            <span>
                                Expires:{' '}
                                {benefit.expiry_date
                                    ? formatDate(benefit.expiry_date)
                                    : 'No Expiry'}
                            </span>
                        </div>
                    </div>

                    {benefit.description && (
                        <div className="flex items-start gap-1.5 mt-3 text-sm text-muted-foreground">
                            <FileText className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                            <p className="line-clamp-2">
                                {benefit.description}
                            </p>
                        </div>
                    )}

                    {(benefit.front_media_url || benefit.back_media_url) && (
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            {benefit.front_media_url && (
                                <div className="h-48 rounded-lg overflow-hidden border">
                                    <img
                                        alt="Front ID"
                                        className="w-full h-full object-cover"
                                        src={benefit.front_media_url}
                                    />
                                </div>
                            )}

                            {benefit.back_media_url && (
                                <div className="h-48 rounded-lg overflow-hidden border">
                                    <img
                                        alt="Back ID"
                                        className="w-full h-full object-cover"
                                        src={benefit.back_media_url}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

interface GovernmentBenefitFormProps {
    onSubmit: (data: GovernmentBenefitFormData) => void
    onCancel: () => void
    initialData?: IMemberGovernmentBenefit
}

export interface GovernmentBenefitFormData {
    name: string
    country_code: string
    value: string
    expiry_date: string
    description: string
    front_media_url: string
    back_media_url: string
}

function GovernmentBenefitForm({
    onSubmit,
    onCancel,
    initialData,
}: GovernmentBenefitFormProps) {
    const [formData, setFormData] = useState<GovernmentBenefitFormData>({
        name: initialData?.name || '',
        country_code: initialData?.country_code || 'PH',
        value: initialData?.value || '',
        expiry_date: initialData?.expiry_date || '',
        description: initialData?.description || '',
        front_media_url: initialData?.front_media_url || '',
        back_media_url: initialData?.back_media_url || '',
    })

    const [errors, setErrors] = useState<
        Partial<Record<keyof GovernmentBenefitFormData, string>>
    >({})

    const selectedGovId = mockGovernmentIds.find(
        (id) => id.name === formData.name
    )

    const validateForm = (): boolean => {
        const newErrors: Partial<
            Record<keyof GovernmentBenefitFormData, string>
        > = {}

        if (!formData.name) {
            newErrors.name = 'Government ID type is required'
        }

        if (!formData.country_code) {
            newErrors.country_code = 'Country is required'
        }

        if (!formData.value) {
            newErrors.value = 'ID number is required'
        } else if (selectedGovId?.regex) {
            const regex = new RegExp(selectedGovId.regex)
            if (!regex.test(formData.value)) {
                newErrors.value = `Invalid ${selectedGovId.name} format`
            }
        }

        if (selectedGovId?.has_expiry_date && !formData.expiry_date) {
            newErrors.expiry_date = 'Expiry date is required for this ID type'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (validateForm()) {
            onSubmit(formData)
        }
    }

    return (
        <form
            className="bg-card border border-border rounded-xl p-6"
            onSubmit={handleSubmit}
        >
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-foreground">
                        {initialData
                            ? 'Edit Government ID'
                            : 'Add Government ID'}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        Enter the government-issued identification details
                    </p>
                </div>
                <button
                    className="p-2 rounded-lg hover:bg-secondary transition-colors"
                    onClick={onCancel}
                    type="button"
                >
                    <X className="w-5 h-5 text-muted-foreground" />
                </button>
            </div>

            <div className="space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    ID Information
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label className="text-foreground" htmlFor="name">
                            ID Type *
                        </Label>
                        <GovernmentIdCombobox
                            isoAlpha3={formData.country_code}
                            onChange={(value) =>
                                setFormData({
                                    ...formData,
                                    name: value?.name || '',
                                })
                            }
                            value={formData.name}
                        />
                        {errors.name && (
                            <p className="text-sm text-destructive mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label
                            className="text-foreground"
                            htmlFor="country_code"
                        >
                            Issuing Country *
                        </Label>
                        <CountryCombobox
                            defaultValue={formData.country_code}
                            onChange={(country) =>
                                setFormData({
                                    ...formData,
                                    country_code: country.alpha3,
                                })
                            }
                            undefinable={false}
                        />
                        {errors.country_code && (
                            <p className="text-sm text-destructive mt-1">
                                {errors.country_code}
                            </p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label className="text-foreground" htmlFor="value">
                            ID Number *
                        </Label>
                        <div className="relative">
                            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                className="mt-1.5 bg-input border-border pl-10 font-mono"
                                id="value"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        value: e.target.value.toUpperCase(),
                                    })
                                }
                                placeholder={
                                    selectedGovId
                                        ? `Enter ${selectedGovId.name} number`
                                        : 'Select ID type first'
                                }
                                value={formData.value}
                            />
                        </div>
                        {errors.value && (
                            <p className="text-sm text-destructive mt-1">
                                {errors.value}
                            </p>
                        )}
                        {selectedGovId && (
                            <p className="text-xs text-muted-foreground mt-1">
                                Format:{' '}
                                {selectedGovId.regex.replace(/[\\^$]/g, '')}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label
                            className="text-foreground"
                            htmlFor="expiry_date"
                        >
                            Expiry Date {selectedGovId?.has_expiry_date && '*'}
                        </Label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                className="mt-1.5 bg-input border-border pl-10"
                                disabled={
                                    selectedGovId &&
                                    !selectedGovId.has_expiry_date
                                }
                                id="expiry_date"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        expiry_date: e.target.value,
                                    })
                                }
                                type="date"
                                value={formData.expiry_date}
                            />
                        </div>
                        {errors.expiry_date && (
                            <p className="text-sm text-destructive mt-1">
                                {errors.expiry_date}
                            </p>
                        )}
                        {selectedGovId && !selectedGovId.has_expiry_date && (
                            <p className="text-xs text-muted-foreground mt-1">
                                This ID type does not expire
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <Label className="text-foreground" htmlFor="description">
                        Additional Notes
                    </Label>
                    <Textarea
                        className="mt-1.5 bg-input border-border resize-none"
                        id="description"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                description: e.target.value,
                            })
                        }
                        placeholder="Any additional information about this ID..."
                        rows={3}
                        value={formData.description}
                    />
                </div>

                <div className="space-y-3 pt-2">
                    <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                        Document Images (Optional)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label
                                className="text-foreground"
                                htmlFor="front_media_url"
                            >
                                Front Image
                            </Label>
                            <ImageField
                                onChange={(url) =>
                                    setFormData({
                                        ...formData,
                                        front_media_url: url!,
                                    })
                                }
                                placeholder="Upload Front Image"
                                value={formData.front_media_url}
                            />
                        </div>
                        <div>
                            <Label
                                className="text-foreground"
                                htmlFor="back_media_url"
                            >
                                Back Image
                            </Label>
                            <ImageField
                                onChange={(url) =>
                                    setFormData({
                                        ...formData,
                                        back_media_url: url!,
                                    })
                                }
                                placeholder="Upload Back Image"
                                value={formData.back_media_url}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-border">
                <Button onClick={onCancel} type="button" variant="ghost">
                    Cancel
                </Button>
                <Button type="submit">
                    {initialData ? 'Update' : 'Add Government ID'}
                </Button>
            </div>
        </form>
    )
}

interface MemberGovernmentBenefitSectionProps {
    memberProfile: IMemberProfile
}

const MemberGovernmentBenefitSection = ({
    memberProfile,
}: MemberGovernmentBenefitSectionProps) => {
    const [benefits, setBenefits] = useState<IMemberGovernmentBenefit[]>(
        memberProfile.member_government_benefits || []
    )
    const [showForm, setShowForm] = useState(false)
    const [editingBenefit, setEditingBenefit] =
        useState<IMemberGovernmentBenefit | null>(null)

    const handleSubmit = (data: GovernmentBenefitFormData) => {
        if (editingBenefit) {
            setBenefits(
                benefits.map((b) =>
                    b.id === editingBenefit.id
                        ? {
                              ...b,
                              name: data.name,
                              country_code: data.country_code,
                              value: data.value || undefined,
                              expiry_date: data.expiry_date || undefined,
                              description: data.description || undefined,
                              front_media_url:
                                  data.front_media_url || undefined,
                              back_media_url: data.back_media_url || undefined,
                          }
                        : b
                )
            )
            toast.success('Government ID Updated')
        } else {
            const newBenefit: IMemberGovernmentBenefit = {
                id: crypto.randomUUID(),
                member_profile_id: memberProfile.id,
                name: data.name,
                country_code: data.country_code,
                value: data.value || undefined,
                expiry_date: data.expiry_date || undefined,
                description: data.description || undefined,
                front_media_url: data.front_media_url || undefined,
                back_media_url: data.back_media_url || undefined,
            }
            setBenefits([newBenefit, ...benefits])
            toast.success('Government ID Added')
        }
        setShowForm(false)
        setEditingBenefit(null)
    }

    const handleEdit = (benefit: IMemberGovernmentBenefit) => {
        setEditingBenefit(benefit)
        setShowForm(true)
    }

    const handleCancel = () => {
        setShowForm(false)
        setEditingBenefit(null)
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
                <GovernmentBenefitSection
                    addLabel="Add Government ID"
                    description="Government-issued identification documents"
                    emptyMessage="No government IDs yet. Add your identification documents."
                    form={
                        <GovernmentBenefitForm
                            initialData={editingBenefit || undefined}
                            onCancel={handleCancel}
                            onSubmit={handleSubmit}
                        />
                    }
                    icon={<IdCard className="w-5 h-5 text-primary" />}
                    isEmpty={benefits.length === 0}
                    isFormOpen={showForm}
                    onAdd={() => setShowForm(true)}
                    title="Government IDs"
                >
                    {benefits.map((benefit) => (
                        <GovernmentBenefitCard
                            benefit={benefit}
                            key={benefit.id}
                            onEdit={handleEdit}
                        />
                    ))}
                </GovernmentBenefitSection>
            </div>
        </div>
    )
}

export default MemberGovernmentBenefitSection
