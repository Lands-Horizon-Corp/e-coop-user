import { CheckCircle2 } from 'lucide-react'

import { Particles } from '@e-coop-monorepo/ui/components/ui/background-particles'
import { Badge } from '@e-coop-monorepo/ui/components/ui/badge'
import { Card } from '@e-coop-monorepo/ui/components/ui/card'

import { CoopBackground } from '../components/coop-bg'

const TermsPage = () => {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <CoopBackground opacity={0.25} variant="waves" />
            <Particles
                className="absolute inset-0"
                color="#ffffff"
                ease={80}
                quantity={300}
            />
            <section className="relative bg-linear-to-br from-primary/5 via-background to-accent/5 py-20 md:py-28 overflow-hidden">
                <CoopBackground opacity={0.25} variant="geometric" />
                <div className="absolute inset-0 bg-grid-slate-100 mask-[linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <Badge className="mb-6 px-4 py-2" variant="secondary">
                            Legal
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance bg-linear-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Terms and Conditions
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Last updated: January 2024
                        </p>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-16 md:py-20">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-4xl mx-auto prose prose-slate">
                        <div className="space-y-12">
                            {/* Introduction */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4">
                                    1. Introduction
                                </h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    Welcome to our Cooperative. These Terms and
                                    Conditions govern your use of our services
                                    and your membership with us. By becoming a
                                    member or using our services, you agree to
                                    comply with and be bound by these terms.
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    Please read these terms carefully before
                                    using our services. If you do not agree with
                                    any part of these terms, you may not access
                                    our services or become a member.
                                </p>
                            </div>

                            {/* Membership */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4">
                                    2. Membership Eligibility
                                </h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    To become a member of our cooperative, you
                                    must:
                                </p>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li className="flex gap-2">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                                        <span>
                                            Be at least 18 years of age or have
                                            a legal guardian co-sign
                                        </span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                                        <span>
                                            Reside within our designated service
                                            area or meet alternative eligibility
                                            requirements
                                        </span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                                        <span>
                                            Purchase at least one share in the
                                            cooperative
                                        </span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                                        <span>
                                            Provide valid identification and
                                            complete all required documentation
                                        </span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                                        <span>
                                            Agree to abide by the cooperative's
                                            bylaws and policies
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            {/* Account Services */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4">
                                    3. Account Services
                                </h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    As a member, you have access to various
                                    financial services including savings
                                    accounts, checking accounts, loan products,
                                    and other financial services we offer.
                                </p>
                                <h3 className="text-xl font-semibold mb-3 mt-6">
                                    3.1 Account Ownership
                                </h3>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    All accounts are owned by the member and are
                                    subject to our account agreements, fee
                                    schedules, and applicable laws and
                                    regulations.
                                </p>
                                <h3 className="text-xl font-semibold mb-3 mt-6">
                                    3.2 Account Maintenance
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    You are responsible for maintaining accurate
                                    account information and promptly notifying
                                    us of any changes to your contact
                                    information, employment status, or other
                                    relevant details.
                                </p>
                            </div>

                            {/* Online Banking */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4">
                                    4. Online Banking and Digital Services
                                </h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    Our online banking platform provides 24/7
                                    access to your accounts. By using these
                                    services, you agree to:
                                </p>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li className="flex gap-2">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                                        <span>
                                            Maintain the confidentiality of your
                                            login credentials
                                        </span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                                        <span>
                                            Notify us immediately of any
                                            unauthorized access or security
                                            breaches
                                        </span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                                        <span>
                                            Use secure internet connections when
                                            accessing your accounts
                                        </span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                                        <span>
                                            Keep your software and devices up to
                                            date with security patches
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            {/* Loans and Credit */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4">
                                    5. Loans and Credit Products
                                </h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    All loan applications are subject to credit
                                    approval. Loan terms, interest rates, and
                                    repayment schedules will be outlined in your
                                    loan agreement.
                                </p>
                                <h3 className="text-xl font-semibold mb-3 mt-6">
                                    5.1 Loan Obligations
                                </h3>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    By accepting a loan, you agree to repay the
                                    principal amount plus interest according to
                                    the agreed-upon schedule. Failure to meet
                                    payment obligations may result in late fees,
                                    negative credit reporting, and potential
                                    collection actions.
                                </p>
                                <h3 className="text-xl font-semibold mb-3 mt-6">
                                    5.2 Collateral
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Some loans may require collateral. You agree
                                    that we may take possession of the
                                    collateral if you default on your loan
                                    obligations.
                                </p>
                            </div>

                            {/* Fees and Charges */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4">
                                    6. Fees and Charges
                                </h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    We maintain a fee schedule for various
                                    services. This schedule is available on our
                                    website and at all branch locations. Common
                                    fees include:
                                </p>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li className="flex gap-2">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                                        <span>
                                            Account maintenance fees (if
                                            applicable)
                                        </span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                                        <span>
                                            Overdraft and insufficient funds
                                            fees
                                        </span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                                        <span>Wire transfer fees</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                                        <span>
                                            ATM usage fees at non-cooperative
                                            ATMs
                                        </span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                                        <span>Loan origination fees</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Privacy and Security */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4">
                                    7. Privacy and Data Security
                                </h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    We are committed to protecting your personal
                                    information. Our privacy policy details how
                                    we collect, use, and protect your data. We
                                    will never sell your personal information to
                                    third parties.
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    We implement industry-standard security
                                    measures to protect your account information
                                    and transactions. However, you also have a
                                    responsibility to protect your account by
                                    maintaining secure passwords and promptly
                                    reporting any suspicious activity.
                                </p>
                            </div>

                            {/* Dispute Resolution */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4">
                                    8. Dispute Resolution
                                </h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    If you have a dispute regarding your account
                                    or services, please contact us immediately.
                                    We will work diligently to resolve any
                                    issues promptly and fairly.
                                </p>
                                <h3 className="text-xl font-semibold mb-3 mt-6">
                                    8.1 Arbitration
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    For disputes that cannot be resolved through
                                    direct negotiation, both parties agree to
                                    binding arbitration in accordance with the
                                    rules of the American Arbitration
                                    Association. This does not affect your right
                                    to file a complaint with regulatory
                                    authorities.
                                </p>
                            </div>

                            {/* Limitation of Liability */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4">
                                    9. Limitation of Liability
                                </h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    We strive to provide reliable and
                                    uninterrupted services. However, we are not
                                    liable for:
                                </p>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li className="flex gap-2">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                                        <span>
                                            Service interruptions due to system
                                            maintenance or technical issues
                                        </span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                                        <span>
                                            Losses resulting from unauthorized
                                            access to your account due to your
                                            negligence
                                        </span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                                        <span>
                                            Actions taken in compliance with
                                            legal requirements or court orders
                                        </span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                                        <span>
                                            Force majeure events beyond our
                                            reasonable control
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            {/* Termination */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4">
                                    10. Account Termination
                                </h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    Either party may terminate the membership
                                    relationship at any time. You may close your
                                    account by providing written notice. We
                                    reserve the right to close accounts for
                                    violations of these terms or applicable
                                    laws.
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    Upon termination, all outstanding
                                    obligations must be satisfied, and any
                                    remaining funds will be returned to you
                                    after deducting applicable fees and charges.
                                </p>
                            </div>

                            {/* Changes to Terms */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4">
                                    11. Changes to Terms
                                </h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    We reserve the right to modify these terms
                                    at any time. We will notify members of
                                    significant changes via email, postal mail,
                                    or notices on our website. Continued use of
                                    our services after such notification
                                    constitutes acceptance of the modified
                                    terms.
                                </p>
                            </div>

                            {/* Governing Law */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4">
                                    12. Governing Law
                                </h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    These terms are governed by the laws of the
                                    state in which our main office is located,
                                    without regard to its conflict of law
                                    provisions. Any legal action must be brought
                                    in the appropriate courts of that
                                    jurisdiction.
                                </p>
                            </div>

                            {/* Contact Card */}
                            <Card className="p-8 bg-linear-to-br from-primary/5 to-accent/5 border-2">
                                <h2 className="text-2xl font-bold mb-6">
                                    13. Contact Information
                                </h2>
                                <p className="text-muted-foreground leading-relaxed mb-6">
                                    If you have questions about these terms,
                                    please contact us:
                                </p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <div>
                                            <div className="font-semibold mb-1">
                                                Email
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                legal@cooperative.com
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <div>
                                            <div className="font-semibold mb-1">
                                                Phone
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                +1 (555) 123-4567
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <div>
                                            <div className="font-semibold mb-1">
                                                Mail
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                123 Main Street, City, State
                                                12345
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <div>
                                            <div className="font-semibold mb-1">
                                                Hours
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                Monday-Friday, 8AM-6PM
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* Acknowledgment */}
                            <Card className="p-6 bg-muted/50 border-2 border-dashed">
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    By using our services, you acknowledge that
                                    you have read, understood, and agree to be
                                    bound by these Terms and Conditions. If you
                                    do not agree to these terms, please do not
                                    use our services.
                                </p>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default TermsPage
