import type { IBranch } from '@ecoop/modules/branch'
import ImageDisplay from '@ecoop/ui/core'
import { Badge } from '@ecoop/ui/core'
import { Building2, ExternalLink, Mail, MapPin, Phone } from 'lucide-react'

interface BranchCardProps {
    branch: IBranch
}

export const BranchCard = ({ branch }: BranchCardProps) => {
    return (
        <div className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-card via-card to-secondary/20 border border-border/50 shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-2">
            {/* Gradient accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-accent to-primary opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Decorative background blur */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-500" />

            <div className="relative p-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            {branch.is_main_branch && (
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-card flex items-center justify-center">
                                    <span className="text-[8px] text-accent-foreground font-bold">
                                        ★
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center space-x-2 ">
                            <ImageDisplay
                                className="rounded-sm"
                                src={branch.media.download_url}
                            />
                            <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                                {branch.name}
                            </h3>
                            {branch.is_main_branch && (
                                <Badge className="mt-1.5 bg-linear-to-r from-accent to-accent/80 text-accent-foreground border-0 text-xs font-medium px-2.5 py-0.5">
                                    Headquarters
                                </Badge>
                            )}
                        </div>
                    </div>

                    <button className="p-2 rounded-lg bg-secondary/50 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-300 opacity-0 group-hover:opacity-100">
                        <ExternalLink className="w-4 h-4" />
                    </button>
                </div>

                {/* Description */}
                {branch.description && (
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-2">
                        {branch.description}
                    </p>
                )}

                {/* Contact Info */}
                <div className="space-y-3 pt-4 border-t border-border/50">
                    {branch.address && (
                        <div className="flex items-start gap-3 group/item">
                            <div className="w-8 h-8 rounded-lg bg-secondary/70 flex items-center justify-center shrink-0 group-hover/item:bg-primary/10 transition-colors duration-300">
                                <MapPin className="w-4 h-4 text-muted-foreground group-hover/item:text-primary transition-colors duration-300" />
                            </div>
                            <span className="text-sm text-foreground/80 leading-relaxed pt-1">
                                {branch.address}
                            </span>
                        </div>
                    )}

                    {branch.email && (
                        <div className="flex items-center gap-3 group/item">
                            <div className="w-8 h-8 rounded-lg bg-secondary/70 flex items-center justify-center shrink-0 group-hover/item:bg-primary/10 transition-colors duration-300">
                                <Mail className="w-4 h-4 text-muted-foreground group-hover/item:text-primary transition-colors duration-300" />
                            </div>
                            <a
                                className="text-sm text-primary hover:text-primary/80 hover:underline underline-offset-2 transition-colors duration-300"
                                href={`mailto:${branch.email}`}
                            >
                                {branch.email}
                            </a>
                        </div>
                    )}

                    {branch.contact_number && (
                        <div className="flex items-center gap-3 group/item">
                            <div className="w-8 h-8 rounded-lg bg-secondary/70 flex items-center justify-center shrink-0 group-hover/item:bg-primary/10 transition-colors duration-300">
                                <Phone className="w-4 h-4 text-muted-foreground group-hover/item:text-primary transition-colors duration-300" />
                            </div>
                            <a
                                className="text-sm text-foreground/80 hover:text-primary transition-colors duration-300"
                                href={`tel:${branch.contact_number}`}
                            >
                                {branch.contact_number}
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
