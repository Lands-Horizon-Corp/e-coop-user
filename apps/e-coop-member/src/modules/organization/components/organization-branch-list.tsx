import type { IBranch } from '@ecoop/modules/branch'
import AnimateRevealEffect from '@ecoop/modules/home/components/animate-reveal-effect'
import { Building2 } from 'lucide-react'

import { BranchCard } from './branch-card'

interface BranchListProps {
    branches: IBranch[]
}

export const BranchList = ({ branches }: BranchListProps) => {
    if (!branches || branches.length === 0) {
        return null
    }

    // Sort to show main branch first
    const sortedBranches = [...branches].sort((a, b) => {
        if (a.is_main_branch) return -1
        if (b.is_main_branch) return 1
        return 0
    })

    return (
        <section
            className="w-full animate-fade-up"
            style={{ animationDelay: '0.2s' }}
        >
            <div className="container mx-auto">
                {/* Section Header */}
                <AnimateRevealEffect>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                            <Building2 className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-2xl text-foreground">
                                Branches
                            </h2>
                            <p className="text-muted-foreground text-sm mt-1">
                                {branches.length}{' '}
                                {branches.length === 1 ? 'Branch' : 'Branches'}{' '}
                                to serve you
                            </p>
                        </div>
                    </div>
                </AnimateRevealEffect>

                {/* Branch Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {sortedBranches.map((branch, index) => (
                        <AnimateRevealEffect duration={index * 0.5}>
                            <div
                                className="animate-fade-up"
                                key={branch.id}
                                style={{
                                    animationDelay: `${0.1 * (index + 1)}s`,
                                }}
                            >
                                <BranchCard branch={branch} />
                            </div>
                        </AnimateRevealEffect>
                    ))}
                </div>
            </div>
        </section>
    )
}
