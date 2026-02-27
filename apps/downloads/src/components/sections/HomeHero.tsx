import { BarChart3, Bot, Database, Download, Shield, Users } from 'lucide-react'

export default function HomeHero() {
    return (
        <section className="relative min-h-screen overflow-hidden" id="home">
            {/* Floating icons with CSS animation */}
            <div className="pointer-events-none absolute inset-0 opacity-25">
                <div
                    className="absolute left-[18%] top-[26%]"
                    style={{
                        animation: 'float 6s ease-in-out infinite',
                    }}
                >
                    <Bot className="h-10 w-10 text-emerald-300" />
                </div>

                <div
                    className="absolute right-[18%] top-[22%]"
                    style={{
                        animation: 'float 7s ease-in-out infinite',
                        animationDelay: '1s',
                    }}
                >
                    <Database className="h-10 w-10 text-emerald-300" />
                </div>

                <div
                    className="absolute right-[16%] top-[35%]"
                    style={{
                        animation: 'float 8s ease-in-out infinite',
                        animationDelay: '2s',
                    }}
                >
                    <BarChart3 className="h-10 w-10 text-emerald-300" />
                </div>

                <div
                    className="absolute right-[22%] bottom-[18%]"
                    style={{
                        animation: 'float 5.5s ease-in-out infinite',
                        animationDelay: '1.5s',
                    }}
                >
                    <Users className="h-10 w-10 text-emerald-300" />
                </div>

                <div
                    className="absolute left-[12%] bottom-[25%]"
                    style={{
                        animation: 'float 6.5s ease-in-out infinite',
                        animationDelay: '0.5s',
                    }}
                >
                    <Shield className="h-10 w-10 text-emerald-300" />
                </div>
            </div>

            {/* Stat cards with CSS animation */}
            <div className="pointer-events-none absolute inset-0">
                <div
                    className="absolute left-8 top-20 hidden lg:block"
                    style={{
                        animation: 'float 5s ease-in-out infinite',
                    }}
                >
                    <div className="w-52 rounded-2xl bg-black/30 backdrop-blur-xl shadow-2xl border border-white/10">
                        <div className="p-5">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <div className="text-3xl font-extrabold text-white">
                                        25
                                    </div>
                                    <div className="mt-3 text-xs font-semibold text-emerald-200">
                                        New Members
                                    </div>
                                    <div className="text-xs text-teal-200/60">
                                        This Week
                                    </div>
                                </div>
                                <div className="h-11 w-11 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                                    <Users className="h-5 w-5 text-emerald-300" />
                                </div>
                            </div>
                            <div className="mt-4 text-xs font-semibold text-emerald-300">
                                ↑ 12%{' '}
                                <span className="text-teal-200/50 font-medium">
                                    vs last week
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="absolute right-8 bottom-32 hidden lg:block"
                    style={{
                        animation: 'float 6s ease-in-out infinite',
                        animationDelay: '1s',
                    }}
                >
                    <div className="w-56 rounded-2xl bg-black/30 backdrop-blur-xl shadow-2xl border border-white/10">
                        <div className="p-5">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <div className="text-3xl font-extrabold text-white">
                                        ₱150K
                                    </div>
                                    <div className="mt-3 text-xs font-semibold text-emerald-200">
                                        Growth
                                    </div>
                                    <div className="text-xs text-teal-200/60">
                                        This Month
                                    </div>
                                </div>
                                <div className="h-11 w-11 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                                    <BarChart3 className="h-5 w-5 text-emerald-300" />
                                </div>
                            </div>

                            <div className="mt-4 flex items-end gap-1 h-8">
                                {[35, 55, 45, 70, 100].map((h, idx) => (
                                    <div
                                        className="flex-1 rounded-t bg-emerald-400/50"
                                        key={idx}
                                        style={{ height: `${h}%` }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="relative z-10 -mt-20">
                <div className="px-6 md:px-10 pt-32 pb-20">
                    <div className="mx-auto max-w-6xl text-center">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/15 px-5 py-2 backdrop-blur border border-emerald-500/20">
                            <Shield className="h-4 w-4 text-emerald-300" />
                            <span className="text-xs font-bold tracking-widest text-emerald-200">
                                LANDS HORIZON CORP.
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="mt-10 text-5xl md:text-7xl font-extrabold leading-[1.05]">
                            <span className="bg-gradient-to-r from-teal-300 via-emerald-300 to-green-300 bg-clip-text text-transparent">
                                E-COOP SUITE
                            </span>
                            <span className="mt-10 text-3xl md:text-6xl">
                                <br />
                                SMART CLOUD SOLUTIONS
                                <br />
                                IN ONE PLATFORM
                                <br />
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="mt-8 text-base md:text-lg text-teal-100/75 max-w-3xl mx-auto leading-relaxed">
                            a next-generation. integrated cloud-based
                            cooperative management platform. eCOOP SUITE
                            transforms the cooperative experience for members,
                            clients, staff, and officers by providing a
                            friendly, intuitive, and accessible platform.
                        </p>

                        {/* Button */}
                        <div className="mt-10 flex justify-center">
                            <a
                                className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-gray-900 font-bold shadow-xl shadow-emerald-500/20 hover:scale-105 hover:shadow-[0_0_40px_rgba(52,211,153,0.4)] hover:bg-gray-100 active:scale-95 transition-all duration-200"
                                href="#download"
                            >
                                <Download className="h-5 w-5" />
                                Download for Windows
                            </a>
                        </div>

                        {/* Feature cards */}
                        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                            <div className="group p-6 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/5 hover:border-emerald-500/30 hover:bg-black/30 hover:-translate-y-2 transition-all duration-300">
                                <div className="group-hover:rotate-[10deg] group-hover:scale-110 transition-transform duration-300">
                                    <Bot className="mx-auto h-9 w-9 text-emerald-300/90" />
                                </div>
                                <div className="mt-4 text-sm font-semibold">
                                    AI Enabled Cooperative Banking
                                </div>
                                <div className="mt-2 text-xs text-teal-100/60">
                                    Powered by LLM and Machine Learning
                                </div>
                            </div>

                            <div className="group p-6 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/5 hover:border-emerald-500/30 hover:bg-black/30 hover:-translate-y-2 transition-all duration-300">
                                <div className="group-hover:rotate-[-10deg] group-hover:scale-110 transition-transform duration-300">
                                    <Shield className="mx-auto h-9 w-9 text-emerald-300/90" />
                                </div>
                                <div className="mt-4 text-sm font-semibold">
                                    Advanced Security Implementation
                                </div>
                                <div className="mt-2 text-xs text-teal-100/60">
                                    Enterprise-grade protection
                                </div>
                            </div>

                            <div className="group p-6 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/5 hover:border-emerald-500/30 hover:bg-black/30 hover:-translate-y-2 transition-all duration-300">
                                <div className="group-hover:rotate-[10deg] group-hover:scale-110 transition-transform duration-300">
                                    <Database className="mx-auto h-9 w-9 text-emerald-300/90" />
                                </div>
                                <div className="mt-4 text-sm font-semibold">
                                    1B+ Transactions Supported
                                </div>
                                <div className="mt-2 text-xs text-teal-100/60">
                                    Can handle billions of transactions with
                                    latest state of the art technologies
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
