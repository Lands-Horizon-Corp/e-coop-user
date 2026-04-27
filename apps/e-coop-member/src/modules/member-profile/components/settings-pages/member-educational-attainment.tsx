import { ReactNode, useState } from 'react'

import { toast } from 'sonner'

import { Button } from '@e-coop-monorepo/ui/components/ui/button'
import { Input } from '@e-coop-monorepo/ui/components/ui/input'
import { Label } from '@e-coop-monorepo/ui/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@e-coop-monorepo/ui/components/ui/select'
import { Textarea } from '@e-coop-monorepo/ui/components/ui/textarea'
import {
    Award,
    BookOpen,
    Calendar,
    FileText,
    GraduationCap,
    Pencil,
    Plus,
    School,
    X,
} from 'lucide-react'

import { IMemberProfile } from '../../member-profile.types'

type TEntityId = string

export const EDUCATIONAL_ATTAINMENT = [
    'elementary (incomplete)',
    'elementary graduate',
    'high school (incomplete)',
    'high school graduate',
    'senior high school (incomplete)',
    'senior high school graduate',
    'vocational / technical',
    'college (incomplete)',
    'college graduate',
    "master's (incomplete)",
    "master's graduate",
    'doctorate (incomplete)',
    'doctorate graduate',
    'others',
] as const

export type TEducationalAttainment = (typeof EDUCATIONAL_ATTAINMENT)[number]

export interface IMemberEducationalAttainment {
    id?: TEntityId
    member_profile_id: TEntityId
    school_name?: string
    school_year?: number
    program_course?: string
    educational_attainment: TEducationalAttainment
    description?: string
}

interface EducationSectionProps {
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

function EducationSection({
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
}: EducationSectionProps) {
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
                        <GraduationCap className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground text-sm">
                        {emptyMessage}
                    </p>
                </div>
            ) : null}
        </section>
    )
}

interface EducationCardProps {
    education: IMemberEducationalAttainment
    onEdit: (education: IMemberEducationalAttainment) => void
}

function getAttainmentLevel(
    attainment: TEducationalAttainment
): 'basic' | 'intermediate' | 'advanced' {
    if (
        attainment.includes('elementary') ||
        attainment.includes('high school')
    ) {
        return 'basic'
    }
    if (
        attainment.includes('senior high') ||
        attainment.includes('vocational') ||
        attainment.includes('college')
    ) {
        return 'intermediate'
    }
    return 'advanced'
}

function getAttainmentColor(level: 'basic' | 'intermediate' | 'advanced') {
    switch (level) {
        case 'basic':
            return 'bg-secondary text-secondary-foreground'
        case 'intermediate':
            return 'bg-primary/15 text-primary'
        case 'advanced':
            return 'bg-accent text-accent-foreground'
    }
}

function formatAttainmentLabel(attainment: TEducationalAttainment): string {
    return attainment
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}

function EducationCard({ education, onEdit }: EducationCardProps) {
    const level = getAttainmentLevel(education.educational_attainment)
    const colorClass = getAttainmentColor(level)

    return (
        <div className="group relative bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-all duration-200">
            <button
                aria-label="Edit education"
                className="absolute top-4 right-4 p-2 rounded-lg bg-secondary/50 opacity-0 group-hover:opacity-100 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                onClick={() => onEdit(education)}
            >
                <Pencil className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-4">
                <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-primary" />
                    </div>
                    {level === 'advanced' && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <Award className="w-3 h-3 text-primary-foreground" />
                        </div>
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground truncate pr-10">
                        {education.school_name || 'School Name Not Provided'}
                    </h4>

                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}
                        >
                            {formatAttainmentLabel(
                                education.educational_attainment
                            )}
                        </span>
                    </div>

                    <div className="flex flex-col gap-1.5 mt-3 text-sm text-muted-foreground">
                        {education.program_course && (
                            <div className="flex items-center gap-1.5">
                                <BookOpen className="w-3.5 h-3.5 shrink-0" />
                                <span className="truncate">
                                    {education.program_course}
                                </span>
                            </div>
                        )}
                        {education.school_year && (
                            <div className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 shrink-0" />
                                <span>{education.school_year}</span>
                            </div>
                        )}
                    </div>

                    {education.description && (
                        <div className="flex items-start gap-1.5 mt-3 text-sm text-muted-foreground">
                            <FileText className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                            <p className="line-clamp-2">
                                {education.description}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

// ============= Form Component =============
interface EducationFormProps {
    onSubmit: (data: EducationFormData) => void
    onCancel: () => void
    initialData?: IMemberEducationalAttainment
}

export interface EducationFormData {
    school_name: string
    school_year: string
    program_course: string
    educational_attainment: TEducationalAttainment
    description: string
}

function EducationForm({
    onSubmit,
    onCancel,
    initialData,
}: EducationFormProps) {
    const [formData, setFormData] = useState<EducationFormData>({
        school_name: initialData?.school_name || '',
        school_year: initialData?.school_year?.toString() || '',
        program_course: initialData?.program_course || '',
        educational_attainment:
            initialData?.educational_attainment || 'college graduate',
        description: initialData?.description || '',
    })

    const [errors, setErrors] = useState<
        Partial<Record<keyof EducationFormData, string>>
    >({})

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof EducationFormData, string>> = {}

        if (formData.school_year) {
            const year = parseInt(formData.school_year)
            const currentYear = new Date().getFullYear()
            if (isNaN(year) || year < 1900 || year > currentYear + 1) {
                newErrors.school_year =
                    'Enter a valid school year (1900 - ' +
                    (currentYear + 1) +
                    ')'
            }
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
                            ? 'Edit Educational Attainment'
                            : 'Add Educational Attainment'}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        Enter the educational background information
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
                    Education Details
                </h4>

                <div>
                    <Label
                        className="text-foreground"
                        htmlFor="educational_attainment"
                    >
                        Educational Attainment *
                    </Label>
                    <Select
                        onValueChange={(value: TEducationalAttainment) =>
                            setFormData({
                                ...formData,
                                educational_attainment: value,
                            })
                        }
                        value={formData.educational_attainment}
                    >
                        <SelectTrigger className="mt-1.5 bg-input border-border">
                            <SelectValue placeholder="Select Educational Attainment" />
                        </SelectTrigger>
                        <SelectContent>
                            {EDUCATIONAL_ATTAINMENT.map((option) => (
                                <SelectItem key={option} value={option}>
                                    {formatAttainmentLabel(option)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label
                            className="text-foreground"
                            htmlFor="school_name"
                        >
                            School Name
                        </Label>
                        <div className="relative">
                            <School className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                className="mt-1.5 bg-input border-border pl-10"
                                id="school_name"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        school_name: e.target.value,
                                    })
                                }
                                placeholder="e.g., University of Philippines"
                                value={formData.school_name}
                            />
                        </div>
                    </div>

                    <div>
                        <Label
                            className="text-foreground"
                            htmlFor="school_year"
                        >
                            Year Graduated / Last Attended
                        </Label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                className="mt-1.5 bg-input border-border pl-10"
                                id="school_year"
                                max={new Date().getFullYear() + 1}
                                min="1900"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        school_year: e.target.value,
                                    })
                                }
                                placeholder="e.g., 2020"
                                type="number"
                                value={formData.school_year}
                            />
                        </div>
                        {errors.school_year && (
                            <p className="text-sm text-destructive mt-1">
                                {errors.school_year}
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <Label className="text-foreground" htmlFor="program_course">
                        Program / Course
                    </Label>
                    <div className="relative">
                        <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            className="mt-1.5 bg-input border-border pl-10"
                            id="program_course"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    program_course: e.target.value,
                                })
                            }
                            placeholder="e.g., Bachelor of Science in Computer Science"
                            value={formData.program_course}
                        />
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
                        placeholder="Any additional information about your education..."
                        rows={3}
                        value={formData.description}
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-border">
                <Button onClick={onCancel} type="button" variant="ghost">
                    Cancel
                </Button>
                <Button type="submit">
                    {initialData ? 'Update' : 'Add Education'}
                </Button>
            </div>
        </form>
    )
}

// ============= Main Component =============
interface MemberEducationalAttainmentSectionProps {
    memberProfile: IMemberProfile
}

const MemberEducationalAttainmentSection = ({
    memberProfile,
}: MemberEducationalAttainmentSectionProps) => {
    const [educations, setEducations] = useState<
        IMemberEducationalAttainment[]
    >(
        memberProfile.member_educational_attainments || []
        // initialData.length > 0
        //     ? initialData
        //     : [
        //           {
        //               id: '1',
        //               member_profile_id: memberProfileId,
        //               school_name: 'University of the Philippines',
        //               school_year: 2020,
        //               program_course: 'Bachelor of Science in Computer Science',
        //               educational_attainment: 'college graduate',
        //               description: 'Graduated with honors',
        //           },
        //           {
        //               id: '2',
        //               member_profile_id: memberProfileId,
        //               school_name: 'Ateneo de Manila University',
        //               school_year: 2022,
        //               program_course: 'Master of Business Administration',
        //               educational_attainment: "master's graduate",
        //           },
        //       ]
    )
    const [showForm, setShowForm] = useState(false)
    const [editingEducation, setEditingEducation] =
        useState<IMemberEducationalAttainment | null>(null)

    const handleSubmit = (data: EducationFormData) => {
        if (editingEducation) {
            // Update existing
            setEducations(
                educations.map((edu) =>
                    edu.id === editingEducation.id
                        ? {
                              ...edu,
                              ...data,
                              school_year: data.school_year
                                  ? parseInt(data.school_year)
                                  : undefined,
                          }
                        : edu
                )
            )
            toast.success('Educational Attainment Updated')
        } else {
            const newEducation: IMemberEducationalAttainment = {
                id: crypto.randomUUID(),
                member_profile_id: memberProfile.id,
                school_name: data.school_name || undefined,
                school_year: data.school_year
                    ? parseInt(data.school_year)
                    : undefined,
                program_course: data.program_course || undefined,
                educational_attainment: data.educational_attainment,
                description: data.description || undefined,
            }
            setEducations([newEducation, ...educations])
            toast.success('Educational Attainment Added')
        }
        setShowForm(false)
        setEditingEducation(null)
    }

    const handleEdit = (education: IMemberEducationalAttainment) => {
        setEditingEducation(education)
        setShowForm(true)
    }

    const handleCancel = () => {
        setShowForm(false)
        setEditingEducation(null)
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
                <EducationSection
                    addLabel="Add Education"
                    description="Academic history and qualifications"
                    emptyMessage="No educational records yet. Add your educational background."
                    form={
                        <EducationForm
                            initialData={editingEducation || undefined}
                            onCancel={handleCancel}
                            onSubmit={handleSubmit}
                        />
                    }
                    icon={<GraduationCap className="w-5 h-5 text-primary" />}
                    isEmpty={educations.length === 0}
                    isFormOpen={showForm}
                    onAdd={() => setShowForm(true)}
                    title="Educational Attainments"
                >
                    {educations.map((education) => (
                        <EducationCard
                            education={education}
                            key={education.id}
                            onEdit={handleEdit}
                        />
                    ))}
                </EducationSection>
            </div>
        </div>
    )
}

export default MemberEducationalAttainmentSection
