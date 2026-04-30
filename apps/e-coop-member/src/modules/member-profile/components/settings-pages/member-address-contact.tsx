import type { ReactNode } from 'react'
import { useState } from 'react'

import { toast } from 'sonner'

import type { IMemberProfile } from '@e-coop-monorepo/modules/member-profile'
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
import {
    Building,
    Globe,
    MapPin,
    Navigation,
    Pencil,
    Phone,
    Plus,
    User,
    X,
} from 'lucide-react'

interface IMemberAddress {
    id: string
    member_profile_id: string
    label: string
    address: string
    country_code: string
    city?: string
    postal_code?: string
    province_state?: string
    barangay?: string
    landmark?: string
    longitude?: number
    latitude?: number
}

interface IMemberContactReference {
    id: string
    member_profile_id: string
    name: string
    description?: string
    contact_number: string
}

type AddressFormData = Omit<IMemberAddress, 'id' | 'member_profile_id'>
type ContactFormData = Omit<IMemberContactReference, 'id' | 'member_profile_id'>

const COUNTRIES = [
    { code: 'PH', name: 'Philippines' },
    { code: 'US', name: 'United States' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'CA', name: 'Canada' },
    { code: 'AU', name: 'Australia' },
    { code: 'JP', name: 'Japan' },
    { code: 'SG', name: 'Singapore' },
]

interface SectionProps {
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
    emptyIcon: ReactNode
}

function Section({
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
    emptyIcon,
}: SectionProps) {
    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {icon && (
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-muted/10">
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
                        {emptyIcon}
                    </div>
                    <p className="text-muted-foreground text-sm">
                        {emptyMessage}
                    </p>
                </div>
            ) : null}
        </section>
    )
}

interface AddressFormProps {
    onSubmit: (data: AddressFormData) => void
    onCancel: () => void
}

function AddressForm({ onSubmit, onCancel }: AddressFormProps) {
    const [formData, setFormData] = useState<AddressFormData>({
        label: '',
        country_code: 'PH',
        address: '',
        city: '',
        postal_code: '',
        province_state: '',
        barangay: '',
        landmark: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.label || !formData.address || !formData.country_code) {
            toast.error('Please fill in required fields')
            return
        }
        onSubmit(formData)
    }

    return (
        <form
            className="border border-border rounded-xl p-6 animate-slide-down"
            onSubmit={handleSubmit}
        >
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-foreground">
                        Add Address
                    </h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        Enter the address details
                    </p>
                </div>
                <button
                    className="p-2 rounded-lg hover:bg-accent/10 transition-colors"
                    onClick={onCancel}
                    type="button"
                >
                    <X className="w-5 h-5 text-muted-foreground" />
                </button>
            </div>

            <div className="space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Address Information
                </h4>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="label">Label *</Label>
                        <Input
                            id="label"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    label: e.target.value,
                                })
                            }
                            placeholder="Home, Work, etc."
                            required
                            value={formData.label}
                        />
                    </div>
                    <div>
                        <Label htmlFor="country_code">Country *</Label>
                        <Select
                            onValueChange={(value) =>
                                setFormData({
                                    ...formData,
                                    country_code: value,
                                })
                            }
                            value={formData.country_code}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                                {COUNTRIES.map((country) => (
                                    <SelectItem
                                        key={country.code}
                                        value={country.code}
                                    >
                                        {country.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div>
                    <Label htmlFor="address">Full Address *</Label>
                    <Textarea
                        id="address"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                address: e.target.value,
                            })
                        }
                        placeholder="Street address, building, floor, etc."
                        required
                        value={formData.address}
                    />
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                            id="city"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    city: e.target.value,
                                })
                            }
                            placeholder="City"
                            value={formData.city}
                        />
                    </div>
                    <div>
                        <Label htmlFor="province_state">Province/State</Label>
                        <Input
                            id="province_state"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    province_state: e.target.value,
                                })
                            }
                            placeholder="Province/State"
                            value={formData.province_state}
                        />
                    </div>
                    <div>
                        <Label htmlFor="postal_code">Postal Code</Label>
                        <Input
                            id="postal_code"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    postal_code: e.target.value,
                                })
                            }
                            placeholder="Postal Code"
                            value={formData.postal_code}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="barangay">Barangay</Label>
                        <Input
                            id="barangay"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    barangay: e.target.value,
                                })
                            }
                            placeholder="Barangay"
                            value={formData.barangay}
                        />
                    </div>
                    <div>
                        <Label htmlFor="landmark">Landmark</Label>
                        <Input
                            id="landmark"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    landmark: e.target.value,
                                })
                            }
                            placeholder="Nearby landmark"
                            value={formData.landmark}
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-border">
                <Button onClick={onCancel} type="button" variant="ghost">
                    Cancel
                </Button>
                <Button type="submit">Add Address</Button>
            </div>
        </form>
    )
}

interface AddressCardProps {
    address: IMemberAddress
    onEdit: (address: IMemberAddress) => void
}

function AddressCard({ address, onEdit }: AddressCardProps) {
    const country = COUNTRIES.find((c) => c.code === address.country_code)

    return (
        <div className="border border-border rounded-xl p-5 bg-popover hover:border-primary/30 transition-colors group">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-muted/10">
                        <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">
                        {address.label}
                    </span>
                </div>
                <button
                    className="p-1.5 rounded-lg hover:bg-accent/10 transition-colors opacity-0 group-hover:opacity-100"
                    onClick={() => onEdit(address)}
                >
                    <Pencil className="w-4 h-4 text-muted-foreground" />
                </button>
            </div>

            <p className="text-sm text-foreground mb-3 line-clamp-2">
                {address.address}
            </p>

            <div className="space-y-2 text-sm">
                {(address.city || address.province_state) && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Building className="w-3.5 h-3.5" />
                        <span>
                            {[address.city, address.province_state]
                                .filter(Boolean)
                                .join(', ')}
                        </span>
                    </div>
                )}
                {country && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Globe className="w-3.5 h-3.5" />
                        <span>{country.name}</span>
                    </div>
                )}
                {address.landmark && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Navigation className="w-3.5 h-3.5" />
                        <span>{address.landmark}</span>
                    </div>
                )}
            </div>
        </div>
    )
}

interface ContactFormProps {
    onSubmit: (data: ContactFormData) => void
    onCancel: () => void
}

function ContactForm({ onSubmit, onCancel }: ContactFormProps) {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        contact_number: '',
        description: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.name || !formData.contact_number) {
            toast.error('Please fill in required fields')
            return
        }
        onSubmit(formData)
    }

    return (
        <form
            className="border border-border rounded-xl p-6 animate-slide-down"
            onSubmit={handleSubmit}
        >
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-foreground">
                        Add Contact Reference
                    </h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        Add an emergency contact or reference person
                    </p>
                </div>
                <button
                    className="p-2 rounded-lg hover:bg-accent/10 transition-colors"
                    onClick={onCancel}
                    type="button"
                >
                    <X className="w-5 h-5 text-muted-foreground" />
                </button>
            </div>

            <div className="space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Contact Information
                </h4>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="name">Name *</Label>
                        <Input
                            id="name"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                            placeholder="Contact name"
                            required
                            value={formData.name}
                        />
                    </div>
                    <div>
                        <Label htmlFor="contact_number">Contact Number *</Label>
                        <Input
                            id="contact_number"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    contact_number: e.target.value,
                                })
                            }
                            placeholder="+63 900 000 0000"
                            required
                            value={formData.contact_number}
                        />
                    </div>
                </div>

                <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                description: e.target.value,
                            })
                        }
                        placeholder="Relationship, additional notes..."
                        value={formData.description}
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-border">
                <Button onClick={onCancel} type="button" variant="ghost">
                    Cancel
                </Button>
                <Button type="submit">Add Contact</Button>
            </div>
        </form>
    )
}

interface ContactCardProps {
    contact: IMemberContactReference
    onEdit: (contact: IMemberContactReference) => void
}

function ContactCard({ contact, onEdit }: ContactCardProps) {
    return (
        <div className="border border-border rounded-xl p-5 hover:border-primary/30 transition-colors group">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-muted/10">
                        <User className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">
                        {contact.name}
                    </span>
                </div>
                <button
                    className="p-1.5 rounded-lg hover:bg-accent/10 transition-colors opacity-0 group-hover:opacity-100"
                    onClick={() => onEdit(contact)}
                >
                    <Pencil className="w-4 h-4 text-muted-foreground" />
                </button>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Phone className="w-3.5 h-3.5" />
                <span>{contact.contact_number}</span>
            </div>

            {contact.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                    {contact.description}
                </p>
            )}
        </div>
    )
}

const MemberAddressContact = ({
    memberProfile,
}: {
    memberProfile: IMemberProfile
}) => {
    const [addresses, setAddresses] = useState<IMemberAddress[]>(
        memberProfile.member_addresses || []
    )
    const [contacts, setContacts] = useState<IMemberContactReference[]>(
        memberProfile.member_contact_references || []
    )

    const [showAddressForm, setShowAddressForm] = useState(false)
    const [showContactForm, setShowContactForm] = useState(false)

    const handleAddressSubmit = (data: AddressFormData) => {
        const newAddress: IMemberAddress = {
            ...data,
            id: crypto.randomUUID(),
            member_profile_id: 'current-member',
        }
        setAddresses([newAddress, ...addresses])
        setShowAddressForm(false)
        toast.success('Address added successfully')
    }

    const handleContactSubmit = (data: ContactFormData) => {
        const newContact: IMemberContactReference = {
            ...data,
            id: crypto.randomUUID(),
            member_profile_id: 'current-member',
        }
        setContacts([newContact, ...contacts])
        setShowContactForm(false)
        toast.success('Contact reference added successfully')
    }

    const handleEditAddress = (_address: IMemberAddress) => {
        toast.info('Edit mode')
    }

    const handleEditContact = (_contact: IMemberContactReference) => {
        toast.info('Edit mode')
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
                <header>
                    <h1 className="text-2xl font-bold text-foreground">
                        Address & Contact
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Manage member addresses and contact references
                    </p>
                </header>

                <Section
                    addLabel="Add Address"
                    description="Registered addresses for this member"
                    emptyIcon={
                        <MapPin className="w-6 h-6 text-muted-foreground" />
                    }
                    emptyMessage="No addresses yet. Add a home or work address."
                    form={
                        <AddressForm
                            onCancel={() => setShowAddressForm(false)}
                            onSubmit={handleAddressSubmit}
                        />
                    }
                    icon={<MapPin className="w-5 h-5 text-primary" />}
                    isEmpty={addresses.length === 0}
                    isFormOpen={showAddressForm}
                    onAdd={() => setShowAddressForm(true)}
                    title="Addresses"
                >
                    {addresses.map((address) => (
                        <AddressCard
                            address={address}
                            key={address.id}
                            onEdit={handleEditAddress}
                        />
                    ))}
                </Section>

                <div className="border-t border-border" />

                <Section
                    addLabel="Add Contact Reference"
                    description="Emergency contacts and reference persons"
                    emptyIcon={
                        <Phone className="w-6 h-6 text-muted-foreground" />
                    }
                    emptyMessage="No contact references yet. Add an emergency contact."
                    form={
                        <ContactForm
                            onCancel={() => setShowContactForm(false)}
                            onSubmit={handleContactSubmit}
                        />
                    }
                    icon={<Phone className="w-5 h-5 text-primary" />}
                    isEmpty={contacts.length === 0}
                    isFormOpen={showContactForm}
                    onAdd={() => setShowContactForm(true)}
                    title="Contact References"
                >
                    {contacts.map((contact) => (
                        <ContactCard
                            contact={contact}
                            key={contact.id}
                            onEdit={handleEditContact}
                        />
                    ))}
                </Section>
            </div>
        </div>
    )
}

export default MemberAddressContact
