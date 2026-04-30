import type { ReactNode} from 'react';
import { useState } from 'react'

import { toast } from 'sonner'

import type {
    IMemberJointAccount,
    IMemberProfile,
    IMemberRelativeAccount,
} from '@e-coop-monorepo/modules/member-profile'
import { UserPlusIcon } from '@e-coop-monorepo/ui/core'
import { Button } from '@e-coop-monorepo/ui/core'
import { Input } from '@e-coop-monorepo/ui/core'
import { Label } from '@e-coop-monorepo/ui/core'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@e-coop-monorepo/ui/core'
import { Textarea } from '@e-coop-monorepo/ui/core'
import { Plus, Users } from 'lucide-react'
import { FileText, Pencil } from 'lucide-react'
import { X } from 'lucide-react'
import { Calendar, Heart, User } from 'lucide-react'
import { ImagePlus, PenTool } from 'lucide-react'

import type { TRelationship } from '../comboboxes/relationship-combobox'
import { FAMILY_RELATIONSHIP } from '../comboboxes/relationship-combobox'

interface AccountSectionProps {
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

export function AccountSection({
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
}: AccountSectionProps) {
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
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {children}
                </div>
            ) : !isFormOpen ? (
                <div className="flex flex-col items-center justify-center py-12 border border-dashed border-border rounded-xl bg-card/50">
                    <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mb-4">
                        <Users className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground text-sm">
                        {emptyMessage}
                    </p>
                </div>
            ) : null}
        </section>
    )
}

const AccountRelationship = ({
    memberProfile,
}: {
    memberProfile: IMemberProfile
}) => {
    const [jointAccounts, setJointAccounts] = useState<IMemberJointAccount[]>(
        memberProfile.member_joint_accounts || []
    )
    const [relativeAccounts, setRelativeAccounts] = useState<
        IMemberRelativeAccount[]
    >(memberProfile.member_relative_accounts || [])
    const [showJointForm, setShowJointForm] = useState(false)
    const [showRelativeForm, setShowRelativeForm] = useState(false)

    const handleJointAccountSubmit = (data: IMemberJointAccount) => {
        const newAccount: IMemberJointAccount = {
            ...data,
            id: crypto.randomUUID(),
            member_profile_url: '',
            picture_media_url: '',
            signature_media_url: '',
            full_name:
                `${data.first_name} ${data.middle_name ? data.middle_name + ' ' : ''}${data.last_name}${data.suffix ? ' ' + data.suffix : ''}`.trim(),
        } as unknown as IMemberJointAccount
        setJointAccounts([newAccount, ...jointAccounts])
        setShowJointForm(false)
        toast.success('Joint Account Created')
    }

    const handleRelativeAccountSubmit = (data: IMemberRelativeAccount) => {
        const newAccount: IMemberRelativeAccount = {
            ...data,
            id: crypto.randomUUID(),
            member_profile_id: 'current-member',
        }
        setRelativeAccounts([newAccount, ...relativeAccounts])
        setShowRelativeForm(false)
        toast.success('Relative Account Created')
    }

    const handleEditJointAccount = (_account: IMemberJointAccount) => {
        toast.success('Edit Mode')
    }

    const handleEditRelativeAccount = (_account: IMemberRelativeAccount) => {
        toast('Edit Mode')
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
                <header>
                    <h1 className="text-2xl font-bold text-foreground">
                        Account Relationships
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Manage joint accounts and family member connections
                    </p>
                </header>

                <AccountSection
                    addLabel="Add Joint Account"
                    description="Family members with shared account access"
                    emptyMessage="No joint accounts yet. Add a family member with shared account access."
                    form={
                        <JointAccountForm
                            onCancel={() => setShowJointForm(false)}
                            onSubmit={handleJointAccountSubmit as any}
                        />
                    }
                    icon={<UserPlusIcon className="w-5 h-5 text-primary" />}
                    isEmpty={jointAccounts.length === 0}
                    isFormOpen={showJointForm}
                    onAdd={() => setShowJointForm(true)}
                    title="Joint Accounts"
                >
                    {jointAccounts.map((account) => (
                        <JointAccountCard
                            account={account}
                            key={account.id}
                            onEdit={handleEditJointAccount}
                        />
                    ))}
                </AccountSection>

                <div className="border-t border-border" />

                <AccountSection
                    addLabel="Add Relative Account"
                    description="Linked member profiles in your family network"
                    emptyMessage="No relative accounts yet. Link existing members as family relatives."
                    form={
                        <RelativeAccountForm
                            onCancel={() => setShowRelativeForm(false)}
                            onSubmit={handleRelativeAccountSubmit as any}
                        />
                    }
                    icon={<Users className="w-5 h-5 text-primary" />}
                    isEmpty={relativeAccounts.length === 0}
                    isFormOpen={showRelativeForm}
                    onAdd={() => setShowRelativeForm(true)}
                    title="Relative Accounts"
                >
                    {relativeAccounts.map((account) => (
                        <RelativeAccountCard
                            account={account}
                            key={account.id}
                            onEdit={handleEditRelativeAccount}
                        />
                    ))}
                </AccountSection>
            </div>
        </div>
    )
}

interface RelativeAccountFormProps {
    onSubmit: (data: RelativeAccountFormData) => void
    onCancel: () => void
}

export interface RelativeAccountFormData {
    relative_member_profile_id: string
    family_relationship: TRelationship
    description: string
}

const MOCK_MEMBER_PROFILES = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Robert Johnson' },
    { id: '4', name: 'Maria Garcia' },
]

export function RelativeAccountForm({
    onSubmit,
    onCancel,
}: RelativeAccountFormProps) {
    const [formData, setFormData] = useState<RelativeAccountFormData>({
        relative_member_profile_id: '',
        family_relationship: 'Brother',
        description: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
    }

    return (
        <form
            className="bg-card border border-border rounded-xl p-6 animate-slide-down"
            onSubmit={handleSubmit}
        >
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-foreground">
                        Add Relative Account
                    </h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        Link an existing member as a relative
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
                <div>
                    <Label className="text-foreground" htmlFor="member_profile">
                        Relative Member Profile *
                    </Label>
                    <Select
                        onValueChange={(value) =>
                            setFormData({
                                ...formData,
                                relative_member_profile_id: value,
                            })
                        }
                        value={formData.relative_member_profile_id}
                    >
                        <SelectTrigger className="mt-1.5 bg-input border-border">
                            <SelectValue placeholder="Select a member profile" />
                        </SelectTrigger>
                        <SelectContent>
                            {MOCK_MEMBER_PROFILES.map((profile) => (
                                <SelectItem key={profile.id} value={profile.id}>
                                    {profile.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label className="text-foreground" htmlFor="relationship">
                        Relationship *
                    </Label>
                    <Select
                        onValueChange={(value: TRelationship) =>
                            setFormData({
                                ...formData,
                                family_relationship: value,
                            })
                        }
                        value={formData.family_relationship}
                    >
                        <SelectTrigger className="mt-1.5 bg-input border-border">
                            <SelectValue placeholder="Select Relationship" />
                        </SelectTrigger>
                        <SelectContent>
                            {FAMILY_RELATIONSHIP.map((option) => (
                                <SelectItem key={option} value={option}>
                                    {option}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label className="text-foreground" htmlFor="description">
                        Description
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
                        placeholder="Additional notes about this relationship..."
                        rows={3}
                        value={formData.description}
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-border">
                <Button onClick={onCancel} type="button" variant="ghost">
                    Cancel
                </Button>
                <Button type="submit">Create Account</Button>
            </div>
        </form>
    )
}

interface RelativeAccountCardProps {
    account: IMemberRelativeAccount
    onEdit: (account: IMemberRelativeAccount) => void
}

export function RelativeAccountCard({
    account,
    onEdit,
}: RelativeAccountCardProps) {
    const relationshipLabel =
        FAMILY_RELATIONSHIP.find((r) => r === account.family_relationship) ||
        account.family_relationship

    return (
        <div className="group relative bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-all duration-200 animate-fade-in">
            <button
                aria-label="Edit relative account"
                className="absolute top-4 right-4 p-2 rounded-lg bg-secondary/50 opacity-0 group-hover:opacity-100 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                onClick={() => onEdit(account)}
            >
                <Pencil className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                </div>

                <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground truncate pr-10">
                        {account.full_name ||
                            `Member #${account.relative_member_profile_id.slice(0, 8)}`}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent dark:bg-accent/15 dark:text-accent text-accent-foreground">
                            {relationshipLabel}
                        </span>
                    </div>
                    {account.description && (
                        <div className="flex items-start gap-1.5 mt-3 text-sm text-muted-foreground">
                            <FileText className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                            <p className="line-clamp-2">
                                {account.description}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

interface JointAccountFormProps {
    onSubmit: (data: JointAccountFormData) => void
    onCancel: () => void
}

export interface JointAccountFormData {
    first_name: string
    middle_name: string
    last_name: string
    suffix: string
    birthday: string
    family_relationship: TRelationship
    description: string
}

export function JointAccountForm({
    onSubmit,
    onCancel,
}: JointAccountFormProps) {
    const [formData, setFormData] = useState<JointAccountFormData>({
        first_name: '',
        middle_name: '',
        last_name: '',
        suffix: '',
        birthday: '',
        family_relationship: 'Brother',
        description: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
    }

    return (
        <form
            className="bg-card border border-border rounded-xl p-6 animate-slide-down"
            onSubmit={handleSubmit}
        >
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-foreground">
                        Add Joint Account
                    </h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        Enter the joint account holder's information
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

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center hover:border-primary/50 transition-colors cursor-pointer group">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
                        <ImagePlus className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                        Upload Photo
                    </span>
                </div>
                <div className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center hover:border-primary/50 transition-colors cursor-pointer group">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
                        <PenTool className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                        Signature
                    </span>
                </div>
            </div>

            <div className="space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Personal Information
                </h4>

                <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-1">
                        <Label className="text-foreground" htmlFor="first_name">
                            First Name *
                        </Label>
                        <Input
                            className="mt-1.5 bg-input border-border"
                            id="first_name"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    first_name: e.target.value,
                                })
                            }
                            placeholder="First Name"
                            required
                            value={formData.first_name}
                        />
                    </div>
                    <div className="col-span-1">
                        <Label
                            className="text-foreground"
                            htmlFor="middle_name"
                        >
                            Middle Name
                        </Label>
                        <Input
                            className="mt-1.5 bg-input border-border"
                            id="middle_name"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    middle_name: e.target.value,
                                })
                            }
                            placeholder="Middle Name"
                            value={formData.middle_name}
                        />
                    </div>
                    <div className="col-span-1">
                        <Label className="text-foreground" htmlFor="last_name">
                            Last Name *
                        </Label>
                        <Input
                            className="mt-1.5 bg-input border-border"
                            id="last_name"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    last_name: e.target.value,
                                })
                            }
                            placeholder="Last Name"
                            required
                            value={formData.last_name}
                        />
                    </div>
                    <div className="col-span-1">
                        <Label className="text-foreground" htmlFor="suffix">
                            Suffix
                        </Label>
                        <Input
                            className="mt-1.5 bg-input border-border"
                            id="suffix"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    suffix: e.target.value,
                                })
                            }
                            placeholder="Jr., Sr."
                            value={formData.suffix}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label className="text-foreground" htmlFor="birthday">
                            Birthday *
                        </Label>
                        <Input
                            className="mt-1.5 bg-input border-border"
                            id="birthday"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    birthday: e.target.value,
                                })
                            }
                            required
                            type="date"
                            value={formData.birthday}
                        />
                    </div>
                    <div>
                        <Label
                            className="text-foreground"
                            htmlFor="relationship"
                        >
                            Relationship *
                        </Label>
                        <Select
                            onValueChange={(value: TRelationship) =>
                                setFormData({
                                    ...formData,
                                    family_relationship: value,
                                })
                            }
                            value={formData.family_relationship}
                        >
                            <SelectTrigger className="mt-1.5 bg-input border-border">
                                <SelectValue placeholder="Select Relationship" />
                            </SelectTrigger>
                            <SelectContent>
                                {FAMILY_RELATIONSHIP.map((option) => (
                                    <SelectItem key={option} value={option}>
                                        {option}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div>
                    <Label className="text-foreground" htmlFor="description">
                        Description
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
                        placeholder="Additional notes..."
                        rows={3}
                        value={formData.description}
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-border">
                <Button onClick={onCancel} type="button" variant="ghost">
                    Cancel
                </Button>
                <Button type="submit">Create Account</Button>
            </div>
        </form>
    )
}

interface JointAccountCardProps {
    account: IMemberJointAccount
    onEdit: (account: IMemberJointAccount) => void
}

export function JointAccountCard({ account, onEdit }: JointAccountCardProps) {
    const relationshipLabel =
        FAMILY_RELATIONSHIP.find((r) => r === account.family_relationship) ||
        account.family_relationship

    return (
        <div className="group relative bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-all duration-200 animate-fade-in">
            <button
                aria-label="Edit joint account"
                className="absolute top-4 right-4 p-2 rounded-lg bg-secondary/50 opacity-0 group-hover:opacity-100 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                onClick={() => onEdit(account)}
            >
                <Pencil className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-4">
                <div className="relative">
                    {account.picture_media_url ? (
                        <img
                            alt={account.full_name}
                            className="w-14 h-14 rounded-full object-cover border-2 border-border"
                            src={account.picture_media_url}
                        />
                    ) : (
                        <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center border-2 border-border">
                            <User className="w-6 h-6 text-muted-foreground" />
                        </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <Heart className="w-3 h-3 text-primary-foreground" />
                    </div>
                </div>

                <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground truncate pr-10">
                        {account.full_name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/15 text-primary">
                            {relationshipLabel}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-2 text-sm text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>
                            {new Date(account.birthday).toLocaleDateString()}
                        </span>
                    </div>
                    {account.description && (
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                            {account.description}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AccountRelationship
