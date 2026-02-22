import { useState } from 'react'

const POLICIES = [
    'Privacy Policy',
    'Terms and Conditions',
    'Cookie Policy',
    'Data Protection Policy',
    'Risk Management Policy',
    'Complaint and Dispute Policy',
    'Terms of Use',
    'Know Your Customer Policy',
    'AML and CTF Policy',
    'Security Policy',
    'Fee and Charges Policy',
    'Code of Conduct',
]

export default function Policies() {
    const [active, setActive] = useState('Privacy Policy')

    return (
        <Section className="relative z-10 py-16">
            <div className="px-6">
                <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* LEFT NAV */}
                    <aside className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
                            <div className="text-xs font-semibold tracking-widest text-white/70 mb-3">
                                POLICIES
                            </div>

                            <div className="space-y-1">
                                {POLICIES.map((p) => {
                                    const isActive = p === active
                                    return (
                                        <button
                                            className={[
                                                'w-full text-left rounded-xl px-4 py-2.5 text-sm transition',
                                                isActive
                                                    ? 'border border-emerald-400/50 bg-emerald-400/10 text-emerald-100'
                                                    : 'text-teal-50/70 hover:bg-white/[0.06] hover:text-teal-50',
                                            ].join(' ')}
                                            key={p}
                                            onClick={() => setActive(p)}
                                        >
                                            {p}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    </aside>

                    {/* CENTER — SCROLLABLE POLICY CONTENT */}
                    <main className="lg:col-span-6">
                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl">
                            {/* scroll container */}
                            <div className="max-h-[70vh] overflow-y-auto thin-scroll p-6 md:p-8">
                                <div>
                                    <h1 className="text-3xl font-extrabold text-white mb-2">
                                        Lands Horizon Privacy Policy
                                    </h1>
                                    <p className="text-xs text-teal-50/60">
                                        Effective Date:{' '}
                                        <strong>January 1, 2026</strong>
                                    </p>
                                </div>

                                {/* intro */}
                                <div className="rounded-2xl border border-white/10 bg-black/10 p-6 text-sm text-teal-50/70 leading-relaxed">
                                    Welcome to e-coop-suite. This Privacy Policy
                                    describes how Lands Horizon Corp collects,
                                    uses, stores and protects your personal
                                    information through the platform. By using
                                    our services, you agree to the practices
                                    described in this policy.
                                </div>

                                {/* helper */}
                                {[
                                    {
                                        t: '1. Personal Data We Collect',
                                        body: (
                                            <>
                                                <p>
                                                    We may collect the following
                                                    types of personal
                                                    information:
                                                </p>
                                                <ul className="mt-3 space-y-2">
                                                    {[
                                                        'Name',
                                                        'Email address',
                                                        'Contact number',
                                                        'Residential or business address',
                                                        'Government-issued ID',
                                                        'Geographic location',
                                                        'Transaction history and records',
                                                        'Device information',
                                                        'Other information necessary for service delivery',
                                                    ].map((x) => (
                                                        <li
                                                            className="flex gap-3"
                                                            key={x}
                                                        >
                                                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-300" />
                                                            {x}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </>
                                        ),
                                    },

                                    {
                                        t: '2. How We Collect Data',
                                        body: (
                                            <>
                                                <p>
                                                    Personal data is collected
                                                    through:
                                                </p>
                                                <ul className="mt-3 space-y-2">
                                                    {[
                                                        'Registration forms and account setup',
                                                        'Website and app usage tracking',
                                                        'Cookies and similar technologies',
                                                        'Third-party integrations (payment providers)',
                                                        'Manual uploads and submissions by users',
                                                    ].map((x) => (
                                                        <li
                                                            className="flex gap-3"
                                                            key={x}
                                                        >
                                                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-300" />
                                                            {x}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </>
                                        ),
                                    },

                                    {
                                        t: '3. Purpose of Data Collection',
                                        body: (
                                            <ul className="space-y-2">
                                                {[
                                                    'Account creation and management',
                                                    'Processing transactions and banking operations',
                                                    'Improving our products and services',
                                                    'Marketing and communication (with consent)',
                                                    'Data analytics and platform optimization',
                                                    'Compliance with legal requirements',
                                                ].map((x) => (
                                                    <li
                                                        className="flex gap-3"
                                                        key={x}
                                                    >
                                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-300" />
                                                        {x}
                                                    </li>
                                                ))}
                                            </ul>
                                        ),
                                    },

                                    {
                                        t: '4. Legal Basis for Processing',
                                        body: (
                                            <ul className="space-y-2">
                                                {[
                                                    'Explicit consent',
                                                    'Contractual necessity',
                                                    'Legal and regulatory obligations',
                                                    'Legitimate interests (fraud prevention, service improvement)',
                                                ].map((x) => (
                                                    <li
                                                        className="flex gap-3"
                                                        key={x}
                                                    >
                                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-300" />
                                                        {x}
                                                    </li>
                                                ))}
                                            </ul>
                                        ),
                                    },

                                    {
                                        t: '5. How We Use Your Data',
                                        body: (
                                            <ul className="space-y-2">
                                                {[
                                                    'Authenticating users',
                                                    'Delivering cooperative services',
                                                    'Service updates and communication',
                                                    'Analytics and risk management',
                                                ].map((x) => (
                                                    <li
                                                        className="flex gap-3"
                                                        key={x}
                                                    >
                                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-300" />
                                                        {x}
                                                    </li>
                                                ))}
                                            </ul>
                                        ),
                                    },

                                    {
                                        t: '6. Sharing and Disclosure of Data',
                                        body: (
                                            <ul className="space-y-2">
                                                {[
                                                    'Partner cooperatives',
                                                    'Payment processors',
                                                    'Regulatory bodies',
                                                    'Approved API developers',
                                                    'Only with consent or legal obligation',
                                                ].map((x) => (
                                                    <li
                                                        className="flex gap-3"
                                                        key={x}
                                                    >
                                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-300" />
                                                        {x}
                                                    </li>
                                                ))}
                                            </ul>
                                        ),
                                    },

                                    {
                                        t: '7. Data Retention',
                                        body: (
                                            <p>
                                                Data is retained during
                                                membership plus up to five (5)
                                                years after closure, subject to
                                                legal and regulatory
                                                requirements.
                                            </p>
                                        ),
                                    },

                                    {
                                        t: '8. Security Measures',
                                        body: (
                                            <ul className="space-y-2">
                                                {[
                                                    'Encryption at rest and in transit',
                                                    'Argon2 password hashing',
                                                    'Role-based access control',
                                                    'Security audits',
                                                    'XSS / SQLi / CSRF protection',
                                                    'Rate limiting and IP blocking',
                                                ].map((x) => (
                                                    <li
                                                        className="flex gap-3"
                                                        key={x}
                                                    >
                                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-300" />
                                                        {x}
                                                    </li>
                                                ))}
                                            </ul>
                                        ),
                                    },

                                    {
                                        t: '9. Your Rights',
                                        body: (
                                            <ul className="space-y-2">
                                                {[
                                                    'Access your data',
                                                    'Correct information',
                                                    'Request deletion',
                                                    'Withdraw consent',
                                                    'Data portability',
                                                    'File complaints',
                                                ].map((x) => (
                                                    <li
                                                        className="flex gap-3"
                                                        key={x}
                                                    >
                                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-300" />
                                                        {x}
                                                    </li>
                                                ))}
                                            </ul>
                                        ),
                                    },

                                    {
                                        t: '10–13. Transfers, Cookies, Children, Updates',
                                        body: (
                                            <p>
                                                No international transfers
                                                currently. Cookies are used for
                                                analytics, security, and UX. No
                                                intentional child data
                                                collection. Policy updates are
                                                communicated through email or
                                                platform notice.
                                            </p>
                                        ),
                                    },

                                    {
                                        t: '14. Contact Us',
                                        body: (
                                            <div className="space-y-1">
                                                <p>Zalven Lemuel Dayao — CEO</p>
                                                <p>
                                                    Email:
                                                    lands.horizon.corp@gmail.com
                                                </p>
                                                <p>Phone: +63 991 617 1081</p>
                                                <p>
                                                    San Jose Del Monte, Bulacan,
                                                    Philippines
                                                </p>
                                            </div>
                                        ),
                                    },
                                ].map((section) => (
                                    <div
                                        className="rounded-2xl border border-white/10 bg-black/10 p-6 text-sm text-teal-50/70 space-y-3"
                                        key={section.t}
                                    >
                                        <h2 className="text-lg font-bold text-white">
                                            {section.t}
                                        </h2>
                                        {section.body}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </main>

                    {/* RIGHT — IN THIS ARTICLE */}
                    <aside className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
                            <div className="text-xs font-semibold tracking-widest text-white/70 mb-3">
                                IN THIS ARTICLE
                            </div>

                            <ol className="space-y-2 text-sm text-teal-50/70 list-decimal pl-5">
                                <li>Personal Data We Collect</li>
                                <li>How We Collect Data</li>
                                <li>Purpose Of Data Collection</li>
                                <li>Legal Basis For Processing</li>
                                <li>How We Use Your Data</li>
                            </ol>
                        </div>
                    </aside>
                </div>
            </div>
        </Section>
    )
}
