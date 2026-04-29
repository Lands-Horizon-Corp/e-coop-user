import { ReactNode, useState } from 'react'

import { toast } from 'sonner'

import { Button } from '@e-coop-monorepo/ui/core'
import { Input } from '@e-coop-monorepo/ui/core'
import { Label } from '@e-coop-monorepo/ui/core'
import { Textarea } from '@e-coop-monorepo/ui/core'
import {
    Calendar,
    FileText,
    ImagePlus,
    Package,
    Pencil,
    Plus,
    TrendingDown,
    TrendingUp,
    X,
} from 'lucide-react'

import {
    IMemberAsset,
    IMemberExpense,
    IMemberIncome,
    IMemberProfile,
} from '../../member-profile.types'

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
    }).format(amount)
}

interface FinancialSectionProps {
    title: string
    description?: string
    icon?: ReactNode
    iconColorClass?: string
    onAdd: () => void
    addLabel: string
    isFormOpen: boolean
    form: ReactNode
    children: ReactNode
    isEmpty: boolean
    emptyMessage: string
    emptyIcon?: ReactNode
}

function FinancialSection({
    title,
    description,
    icon,
    iconColorClass = 'bg-primary/10 text-primary',
    onAdd,
    addLabel,
    isFormOpen,
    form,
    children,
    isEmpty,
    emptyMessage,
    emptyIcon,
}: FinancialSectionProps) {
    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {icon && (
                        <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconColorClass}`}
                        >
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

interface AssetFormProps {
    onSubmit: (data: Omit<IMemberAsset, 'id' | 'member_profile_id'>) => void
    onCancel: () => void
}

function AssetForm({ onSubmit, onCancel }: AssetFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        cost: '',
        entry_date: '',
        description: '',
        media_url: '',
    })
    const [errors, setErrors] = useState<Record<string, string>>({})

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const newErrors: Record<string, string> = {}
        if (!formData.name.trim()) newErrors.name = 'Asset name is required'
        if (!formData.cost || Number(formData.cost) <= 0)
            newErrors.cost = 'Cost must be greater than 0'
        if (!formData.entry_date)
            newErrors.entry_date = 'Entry date is required'

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        onSubmit({
            name: formData.name.trim(),
            created_at: new Date().toISOString(),
            cost: Number(formData.cost),
            entry_date: formData.entry_date,
            description: formData.description.trim() || undefined,
            media_url: formData.media_url || undefined,
        })
    }

    return (
        <form
            className="bg-card border border-border rounded-xl p-6 animate-slide-down"
            onSubmit={handleSubmit}
        >
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-foreground">
                        Add Asset
                    </h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        Record a new asset with its value and details
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

            <div className="mb-6">
                <div className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center hover:border-asset/50 transition-colors cursor-pointer group">
                    <div className="w-12 h-12 rounded-full bg-asset-muted flex items-center justify-center mb-3 group-hover:bg-asset/20 transition-colors">
                        <ImagePlus className="w-5 h-5 text-muted-foreground group-hover:text-asset" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                        Upload Asset Image (Optional)
                    </span>
                </div>
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                        <Label className="text-foreground" htmlFor="asset-name">
                            Asset Name *
                        </Label>
                        <Input
                            className={`mt-1.5 ${errors.name ? 'border-destructive' : ''}`}
                            id="asset-name"
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                                if (errors.name)
                                    setErrors({ ...errors, name: '' })
                            }}
                            placeholder="e.g., Car, Property, Equipment"
                            value={formData.name}
                        />
                        {errors.name && (
                            <p className="text-sm text-destructive mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Label className="text-foreground" htmlFor="asset-cost">
                            Cost / Value *
                        </Label>
                        <Input
                            className={`mt-1.5 ${errors.cost ? 'border-destructive' : ''}`}
                            id="asset-cost"
                            min="0"
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    cost: e.target.value,
                                })
                                if (errors.cost)
                                    setErrors({ ...errors, cost: '' })
                            }}
                            placeholder="0.00"
                            step="0.01"
                            type="number"
                            value={formData.cost}
                        />
                        {errors.cost && (
                            <p className="text-sm text-destructive mt-1">
                                {errors.cost}
                            </p>
                        )}
                    </div>
                </div>
                <div>
                    <Label
                        className="text-foreground"
                        htmlFor="asset-entry_date"
                    >
                        Entry Date *
                    </Label>
                    <Input
                        className={`mt-1.5 ${errors.entry_date ? 'border-destructive' : ''}`}
                        id="asset-entry_date"
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                entry_date: e.target.value,
                            })
                            if (errors.entry_date)
                                setErrors({ ...errors, entry_date: '' })
                        }}
                        type="date"
                        value={formData.entry_date}
                    />
                    {errors.entry_date && (
                        <p className="text-sm text-destructive mt-1">
                            {errors.entry_date}
                        </p>
                    )}
                </div>
                <div>
                    <Label
                        className="text-foreground"
                        htmlFor="asset-description"
                    >
                        Description
                    </Label>
                    <Textarea
                        className="mt-1.5 resize-none"
                        id="asset-description"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                description: e.target.value,
                            })
                        }
                        placeholder="Additional details about this asset..."
                        rows={3}
                        value={formData.description}
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-border">
                <Button onClick={onCancel} type="button" variant="ghost">
                    Cancel
                </Button>
                <Button
                    className="bg-asset text-asset-foreground hover:bg-asset/90"
                    type="submit"
                >
                    Add Asset
                </Button>
            </div>
        </form>
    )
}

interface AssetCardProps {
    asset: IMemberAsset
    onEdit: (asset: IMemberAsset) => void
}

function AssetCard({ asset, onEdit }: AssetCardProps) {
    return (
        <div className="group relative bg-card border border-border rounded-xl p-5 hover:border-asset/50 transition-all duration-200 animate-fade-in">
            <button
                aria-label="Edit asset"
                className="absolute top-4 right-4 p-2 rounded-lg bg-secondary/50 opacity-0 group-hover:opacity-100 hover:bg-asset hover:text-asset-foreground transition-all duration-200"
                onClick={() => onEdit(asset)}
            >
                <Pencil className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-4">
                {asset.media_url ? (
                    <img
                        alt={asset.name}
                        className="w-14 h-14 rounded-xl object-cover border border-border"
                        src={asset.media_url}
                    />
                ) : (
                    <div className="w-14 h-14 rounded-xl bg-asset-muted flex items-center justify-center border border-asset/20">
                        <Package className="w-6 h-6 text-asset" />
                    </div>
                )}
                <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground truncate pr-10">
                        {asset.name}
                    </h4>
                    <div className="mt-1">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-asset/15 text-asset">
                            {formatCurrency(asset.cost)}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-2 text-sm text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>
                            {new Date(asset.entry_date).toLocaleDateString(
                                'en-US',
                                {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                }
                            )}
                        </span>
                    </div>
                    {asset.description && (
                        <div className="flex items-start gap-1.5 mt-2 text-sm text-muted-foreground">
                            <FileText className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                            <p className="line-clamp-2">{asset.description}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

interface IncomeFormProps {
    onSubmit: (data: Omit<IMemberIncome, 'id' | 'member_profile_id'>) => void
    onCancel: () => void
}

function IncomeForm({ onSubmit, onCancel }: IncomeFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        release_date: '',
        media_url: '',
    })
    const [errors, setErrors] = useState<Record<string, string>>({})

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const newErrors: Record<string, string> = {}
        if (!formData.name.trim()) newErrors.name = 'Income source is required'
        if (!formData.amount || Number(formData.amount) < 1)
            newErrors.amount = 'Amount must be at least 1'

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        onSubmit({
            created_at: new Date().toISOString(),
            name: formData.name.trim(),
            amount: Number(formData.amount),
            release_date: formData.release_date || undefined,
            media_url: formData.media_url || undefined,
        })
    }

    return (
        <form
            className="bg-card border border-border rounded-xl p-6 animate-slide-down"
            onSubmit={handleSubmit}
        >
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-foreground">
                        Add Income
                    </h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        Record a new income source and amount
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

            <div className="mb-6">
                <div className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center hover:border-income/50 transition-colors cursor-pointer group">
                    <div className="w-12 h-12 rounded-full bg-income-muted flex items-center justify-center mb-3 group-hover:bg-income/20 transition-colors">
                        <ImagePlus className="w-5 h-5 text-muted-foreground group-hover:text-income" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                        Upload Document (Optional)
                    </span>
                </div>
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                        <Label
                            className="text-foreground"
                            htmlFor="income-name"
                        >
                            Income Source *
                        </Label>
                        <Input
                            className={`mt-1.5 ${errors.name ? 'border-destructive' : ''}`}
                            id="income-name"
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                                if (errors.name)
                                    setErrors({ ...errors, name: '' })
                            }}
                            placeholder="e.g., Salary, Business, Freelance"
                            value={formData.name}
                        />
                        {errors.name && (
                            <p className="text-sm text-destructive mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Label
                            className="text-foreground"
                            htmlFor="income-amount"
                        >
                            Amount *
                        </Label>
                        <Input
                            className={`mt-1.5 ${errors.amount ? 'border-destructive' : ''}`}
                            id="income-amount"
                            min="1"
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    amount: e.target.value,
                                })
                                if (errors.amount)
                                    setErrors({ ...errors, amount: '' })
                            }}
                            placeholder="0.00"
                            step="0.01"
                            type="number"
                            value={formData.amount}
                        />
                        {errors.amount && (
                            <p className="text-sm text-destructive mt-1">
                                {errors.amount}
                            </p>
                        )}
                    </div>
                </div>
                <div>
                    <Label
                        className="text-foreground"
                        htmlFor="income-release_date"
                    >
                        Release Date
                    </Label>
                    <Input
                        className="mt-1.5"
                        id="income-release_date"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                release_date: e.target.value,
                            })
                        }
                        type="date"
                        value={formData.release_date}
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-border">
                <Button onClick={onCancel} type="button" variant="ghost">
                    Cancel
                </Button>
                <Button
                    className="bg-income text-income-foreground hover:bg-income/90"
                    type="submit"
                >
                    Add Income
                </Button>
            </div>
        </form>
    )
}

interface IncomeCardProps {
    income: IMemberIncome
    onEdit: (income: IMemberIncome) => void
}

function IncomeCard({ income, onEdit }: IncomeCardProps) {
    return (
        <div className="group relative bg-card border border-border rounded-xl p-5 hover:border-income/50 transition-all duration-200 animate-fade-in">
            <button
                aria-label="Edit income"
                className="absolute top-4 right-4 p-2 rounded-lg bg-secondary/50 opacity-0 group-hover:opacity-100 hover:bg-income hover:text-income-foreground transition-all duration-200"
                onClick={() => onEdit(income)}
            >
                <Pencil className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-4">
                {income.media_url ? (
                    <img
                        alt={income.name}
                        className="w-14 h-14 rounded-xl object-cover border border-border"
                        src={income.media_url}
                    />
                ) : (
                    <div className="w-14 h-14 rounded-xl bg-income-muted flex items-center justify-center border border-income/20">
                        <TrendingUp className="w-6 h-6 text-income" />
                    </div>
                )}
                <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground truncate pr-10">
                        {income.name}
                    </h4>
                    <div className="mt-1">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-income/15 text-income">
                            +{formatCurrency(income.amount)}
                        </span>
                    </div>
                    {income.release_date && (
                        <div className="flex items-center gap-1.5 mt-2 text-sm text-muted-foreground">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>
                                {new Date(
                                    income.release_date
                                ).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                })}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

interface ExpenseFormProps {
    onSubmit: (data: Omit<IMemberExpense, 'id' | 'member_profile_id'>) => void
    onCancel: () => void
}

function ExpenseForm({ onSubmit, onCancel }: ExpenseFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        description: '',
    })
    const [errors, setErrors] = useState<Record<string, string>>({})

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const newErrors: Record<string, string> = {}
        if (!formData.name.trim()) newErrors.name = 'Expense name is required'
        if (!formData.amount || Number(formData.amount) <= 0)
            newErrors.amount = 'Amount must be greater than 0'

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        onSubmit({
            created_at: new Date().toISOString(),
            name: formData.name.trim(),
            amount: Number(formData.amount),
            description: formData.description.trim() || undefined,
        })
    }

    return (
        <form
            className="bg-card border border-border rounded-xl p-6 animate-slide-down"
            onSubmit={handleSubmit}
        >
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-foreground">
                        Add Expense
                    </h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        Record a recurring expense or liability
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
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                        <Label
                            className="text-foreground"
                            htmlFor="expense-name"
                        >
                            Expense Name *
                        </Label>
                        <Input
                            className={`mt-1.5 ${errors.name ? 'border-destructive' : ''}`}
                            id="expense-name"
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                                if (errors.name)
                                    setErrors({ ...errors, name: '' })
                            }}
                            placeholder="e.g., Rent, Utilities, Loan"
                            value={formData.name}
                        />
                        {errors.name && (
                            <p className="text-sm text-destructive mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <Label
                            className="text-foreground"
                            htmlFor="expense-amount"
                        >
                            Amount *
                        </Label>
                        <Input
                            className={`mt-1.5 ${errors.amount ? 'border-destructive' : ''}`}
                            id="expense-amount"
                            min="0"
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    amount: e.target.value,
                                })
                                if (errors.amount)
                                    setErrors({ ...errors, amount: '' })
                            }}
                            placeholder="0.00"
                            step="0.01"
                            type="number"
                            value={formData.amount}
                        />
                        {errors.amount && (
                            <p className="text-sm text-destructive mt-1">
                                {errors.amount}
                            </p>
                        )}
                    </div>
                </div>
                <div>
                    <Label
                        className="text-foreground"
                        htmlFor="expense-description"
                    >
                        Description
                    </Label>
                    <Textarea
                        className="mt-1.5 resize-none"
                        id="expense-description"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                description: e.target.value,
                            })
                        }
                        placeholder="Additional notes about this expense..."
                        rows={3}
                        value={formData.description}
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-border">
                <Button onClick={onCancel} type="button" variant="ghost">
                    Cancel
                </Button>
                <Button
                    className="bg-expense text-expense-foreground hover:bg-expense/90"
                    type="submit"
                >
                    Add Expense
                </Button>
            </div>
        </form>
    )
}

interface ExpenseCardProps {
    expense: IMemberExpense
    onEdit: (expense: IMemberExpense) => void
}

function ExpenseCard({ expense, onEdit }: ExpenseCardProps) {
    return (
        <div className="group relative bg-card border border-border rounded-xl p-5 hover:border-expense/50 transition-all duration-200 animate-fade-in">
            <button
                aria-label="Edit expense"
                className="absolute top-4 right-4 p-2 rounded-lg bg-secondary/50 opacity-0 group-hover:opacity-100 hover:bg-expense hover:text-expense-foreground transition-all duration-200"
                onClick={() => onEdit(expense)}
            >
                <Pencil className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-expense-muted flex items-center justify-center border border-expense/20">
                    <TrendingDown className="w-6 h-6 text-expense" />
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground truncate pr-10">
                        {expense.name}
                    </h4>
                    <div className="mt-1">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-expense/15 text-expense">
                            -{formatCurrency(expense.amount)}
                        </span>
                    </div>
                    {expense.description && (
                        <div className="flex items-start gap-1.5 mt-3 text-sm text-muted-foreground">
                            <FileText className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                            <p className="line-clamp-2">
                                {expense.description}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export interface FinancialManagementProps {
    memberProfile: IMemberProfile
}

export function FinancialManagement({
    memberProfile,
}: FinancialManagementProps) {
    const [assets, setAssets] = useState<IMemberAsset[]>(
        memberProfile.member_assets || []
    )
    const [incomes, setIncomes] = useState<IMemberIncome[]>(
        memberProfile.member_incomes || []
    )
    const [expenses, setExpenses] = useState<IMemberExpense[]>(
        memberProfile.member_expenses || []
    )

    const [showAssetForm, setShowAssetForm] = useState(false)
    const [showIncomeForm, setShowIncomeForm] = useState(false)
    const [showExpenseForm, setShowExpenseForm] = useState(false)

    const handleAssetSubmit = (
        data: Omit<IMemberAsset, 'id' | 'member_profile_id'>
    ) => {
        const newAsset: IMemberAsset = {
            ...data,
            id: crypto.randomUUID(),
            member_profile_id: memberProfile.id,
        }
        setAssets([newAsset, ...assets])
        setShowAssetForm(false)
        toast.success('Asset added successfully')
    }

    const handleEditAsset = () => {
        toast.info('Edit functionality - coming soon')
    }

    const handleIncomeSubmit = (
        data: Omit<IMemberIncome, 'id' | 'member_profile_id'>
    ) => {
        const newIncome: IMemberIncome = {
            ...data,
            id: crypto.randomUUID(),
            member_profile_id: memberProfile.id,
        }
        setIncomes([newIncome, ...incomes])
        setShowIncomeForm(false)
        toast.success('Income added successfully')
    }

    const handleEditIncome = () => {
        toast.info('Edit functionality - coming soon')
    }

    const handleExpenseSubmit = (
        data: Omit<IMemberExpense, 'id' | 'member_profile_id'>
    ) => {
        const newExpense: IMemberExpense = {
            ...data,
            id: crypto.randomUUID(),
            member_profile_id: memberProfile.id,
        }
        setExpenses([newExpense, ...expenses])
        setShowExpenseForm(false)
        toast.success('Expense added successfully')
    }

    const handleEditExpense = () => {
        toast.info('Edit functionality - coming soon')
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
                <FinancialSection
                    addLabel="Add Asset"
                    description="Properties, vehicles, and valuable possessions"
                    emptyIcon={
                        <Package className="w-6 h-6 text-muted-foreground" />
                    }
                    emptyMessage="No assets yet. Add your first asset to track your wealth."
                    form={
                        <AssetForm
                            onCancel={() => setShowAssetForm(false)}
                            onSubmit={handleAssetSubmit}
                        />
                    }
                    icon={<Package className="w-5 h-5" />}
                    iconColorClass="bg-asset-muted text-asset"
                    isEmpty={assets.length === 0}
                    isFormOpen={showAssetForm}
                    onAdd={() => setShowAssetForm(true)}
                    title="Assets"
                >
                    {assets.map((asset) => (
                        <AssetCard
                            asset={asset}
                            key={asset.id}
                            onEdit={handleEditAsset}
                        />
                    ))}
                </FinancialSection>

                <div className="border-t border-border" />

                <FinancialSection
                    addLabel="Add Income"
                    description="Regular earnings and revenue streams"
                    emptyIcon={
                        <TrendingUp className="w-6 h-6 text-muted-foreground" />
                    }
                    emptyMessage="No income sources yet. Add your first income source."
                    form={
                        <IncomeForm
                            onCancel={() => setShowIncomeForm(false)}
                            onSubmit={handleIncomeSubmit}
                        />
                    }
                    icon={<TrendingUp className="w-5 h-5" />}
                    iconColorClass="bg-income-muted text-income"
                    isEmpty={incomes.length === 0}
                    isFormOpen={showIncomeForm}
                    onAdd={() => setShowIncomeForm(true)}
                    title="Income"
                >
                    {incomes.map((income) => (
                        <IncomeCard
                            income={income}
                            key={income.id}
                            onEdit={handleEditIncome}
                        />
                    ))}
                </FinancialSection>

                <div className="border-t border-border" />

                <FinancialSection
                    addLabel="Add Expense"
                    description="Recurring costs and liabilities"
                    emptyIcon={
                        <TrendingDown className="w-6 h-6 text-muted-foreground" />
                    }
                    emptyMessage="No expenses recorded. Add your first expense."
                    form={
                        <ExpenseForm
                            onCancel={() => setShowExpenseForm(false)}
                            onSubmit={handleExpenseSubmit}
                        />
                    }
                    icon={<TrendingDown className="w-5 h-5" />}
                    iconColorClass="bg-expense-muted text-expense"
                    isEmpty={expenses.length === 0}
                    isFormOpen={showExpenseForm}
                    onAdd={() => setShowExpenseForm(true)}
                    title="Expenses"
                >
                    {expenses.map((expense) => (
                        <ExpenseCard
                            expense={expense}
                            key={expense.id}
                            onEdit={handleEditExpense}
                        />
                    ))}
                </FinancialSection>
            </div>
        </div>
    )
}

export default FinancialManagement
