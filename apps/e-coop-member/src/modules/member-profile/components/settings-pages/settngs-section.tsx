import { ReactNode } from 'react'

import { PlusIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'

interface AccountSectionProps {
    title: string
    description?: string
    icon?: ReactNode
    onAdd: () => void
    addLabel: string
    form: ReactNode
    children: ReactNode
    isEmpty: boolean
    emptyMessage: string
}

export function SettingsSection({
    title,
    description,
    icon,
    onAdd,
    addLabel,
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
                {onAdd && (
                    <Button className="gap-2" onClick={onAdd}>
                        <PlusIcon className="w-4 h-4" />
                        {addLabel}
                    </Button>
                )}
            </div>

            {form}

            {!isEmpty ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {children}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 border border-dashed border-border rounded-xl bg-card/50">
                    <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mb-4">
                        {icon}
                    </div>
                    <p className="text-muted-foreground text-sm">
                        {emptyMessage}
                    </p>
                </div>
            )}
        </section>
    )
}
