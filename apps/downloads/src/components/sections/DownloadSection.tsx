import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ArrowRight, ChevronDown, Users, TrendingUp, FileText, DollarSign, Activity } from "lucide-react";
import { AnimatedSection } from "../AnimatedSection";
import { cn } from "../../lib/utils";

type OS = "windows" | "macos" | "linux";
type PackageType = "exe" | "msi" | "dmg" | "pkg" | "deb" | "rpm" | "appimage";

interface OSMeta {
  label: string;
  version: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  packages: { type: PackageType; label: string; size: string; downloadUrl?: string }[];
}

const OS_META: Record<OS, OSMeta> = {
  windows: {
    label: "Windows",
    version: "Windows 10/11",
    Icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
      </svg>
    ),
    packages: [
      { 
        type: "exe", 
        label: "Installer (.exe)", 
        size: "245 MB",
        downloadUrl: "https://e-coop-storage-r3wisiu87k.t3.storageapi.dev/ECoopSystem.exe?x-id=GetObject&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=tid_kErVDLy_wogbyLda_iwzTDEiemeQMmtTehgwJ_pes_pAGntFlS%2F20260222%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260222T142900Z&X-Amz-Expires=360000&X-Amz-SignedHeaders=host&X-Amz-Signature=cb3fd7b80bb54d886cde2d8550c2e89a6c550e4d125f550800498f8c4cee17dc"
      },
      { type: "msi", label: "MSI Package", size: "243 MB" },
    ],
  },
  macos: {
    label: "macOS",
    version: "macOS 12+",
    Icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    ),
    packages: [
      { type: "dmg", label: "Disk Image (.dmg)", size: "280 MB" },
      { type: "pkg", label: "Installer (.pkg)", size: "278 MB" },
    ],
  },
  linux: {
    label: "Linux",
    version: "Ubuntu 20.04+",
    Icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 00-.205.334 1.18 1.18 0 00-.09.41v.019c.002.089.008.179.026.267.035.134.08.2.142.333.057.066.125.132.18.132h.02c.081.066.155.066.218.132.072.066.124.134.18.2l.006.004c.067.066.138.132.203.2.065.066.122.132.18.198.059.07.111.134.168.2.056.066.116.133.172.2.057.066.107.134.166.2l.003.003c.057.066.113.132.166.2.054.066.104.134.163.2.058.066.113.132.166.2.055.066.108.134.166.2.056.066.113.132.169.2.057.066.113.132.166.2.055.066.11.134.166.2.056.066.113.132.169.2.057.066.113.132.166.2.055.066.11.134.166.2.056.066.113.132.169.2.057.066.113.132.166.2.055.066.11.134.166.2.056.066.113.132.169.2.057.066.113.132.166.2.055.066.11.134.166.2.056.066.113.132.169.2.057.066.113.132.166.2.055.066.11.134.166.2.056.066.113.132.169.2.057.066.113.132.166.2.055.066.11.134.166.2.056.066.113.132.169.2.057.066.113.132.166.2.055.066.11.134.166.2.056.066.113.132.169.2.057.066.113.132.166.2.055.066.11.134.166.2.056.066.113.132.169.2.057.066.113.132.166.2.055.066.11.134.166.2.056.066.113.132.169.2.057.066.113.132.166.2.055.066.11.134.166.2.056.066.113.132.169.2.057.066.113.132.166.2.055.066.11.134.166.2.056.066.113.132.169.2.057.066.113.132.166.2.055.066.11.134.166.2.056.066.113.132.169.2.057.066.113.132.166.2.055.066.11.134.166.2.056.066.113.132.169.2.057.066.113.132.166.2.055.066.11.134.166.2.056.066.113.132.169.2.057.066.113.132.166.2.055.066.11.134.166.2.056.066.113.132.169.2.057.066.113.132.166.2.055.066.11.134.166.2.056.066.113.132.169.2.057.066.113.132.166.2.055.066.11.134.166.2.056.066.113.132.169.2.057.066.113.132.166.2.055.066.11.134.166.2.056.066.113.132.169.2.057.066.113.132.166.2.055.066.11.134.166.2c-.003-.066-.003-.066-.003-.132z" />
      </svg>
    ),
    packages: [
      { type: "deb", label: "Debian/Ubuntu (.deb)", size: "265 MB" },
      { type: "rpm", label: "Fedora/RHEL (.rpm)", size: "267 MB" },
    ],
  },
};

// Dashboard card components
const MemberCard = () => (
  <div className="h-full flex flex-col p-4">
    <div className="flex items-center justify-between mb-2">
      <div className="p-1.5 rounded-lg bg-emerald-500/20">
        <Users className="w-3 h-3 text-emerald-400" />
      </div>
      <span className="text-[10px] text-emerald-400 font-medium">+12%</span>
    </div>
    <div className="text-xl font-bold text-white mb-1">2,847</div>
    <div className="text-[11px] text-teal-100/50 mb-3">Active Members</div>
    <div className="flex gap-1.5 mt-auto">
      {[...Array(4)].map((_, i) => (
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-400/30 to-emerald-600/30 border border-white/10 flex items-center justify-center text-[8px] text-white/70" key={i}>
          {String.fromCharCode(65 + i)}
        </div>
      ))}
      <div className="w-5 h-5 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-[8px] text-white/50">
        +9
      </div>
    </div>
  </div>
);

const TransactionCard = () => (
  <div className="h-full flex flex-col p-4">
    <div className="flex items-center justify-between mb-2">
      <div className="p-1.5 rounded-lg bg-emerald-500/20">
        <TrendingUp className="w-3 h-3 text-emerald-400" />
      </div>
      <Activity className="w-3 h-3 text-emerald-400/50" />
    </div>
    <div className="text-xl font-bold text-white mb-1">₱1.2M</div>
    <div className="text-[11px] text-teal-100/50 mb-3">This Month</div>
    <div className="flex items-end gap-1 h-10 mt-auto">
      {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
        <div
          className="flex-1 rounded-t bg-gradient-to-t from-emerald-500/40 to-emerald-400/60"
          key={i}
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  </div>
);

const ReportCard = () => (
  <div className="h-full flex flex-col p-4">
    <div className="flex items-center justify-between mb-2">
      <div className="p-1.5 rounded-lg bg-emerald-500/20">
        <FileText className="w-3 h-3 text-emerald-400" />
      </div>
      <div className="w-4 h-4 rounded-full border-2 border-emerald-400/30 border-t-emerald-400 animate-spin" />
    </div>
    <div className="text-xl font-bold text-white mb-1">847</div>
    <div className="text-[11px] text-teal-100/50 mb-3">Reports Generated</div>
    <div className="space-y-1.5 mt-auto">
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
          <div className="w-3/4 h-full bg-emerald-400/60 rounded-full" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
        <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
          <div className="w-1/2 h-full bg-teal-400/60 rounded-full" />
        </div>
      </div>
    </div>
  </div>
);

const LoanCard = () => (
  <div className="h-full p-4">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-xl bg-emerald-500/20">
          <DollarSign className="w-4 h-4 text-emerald-400" />
        </div>
        <div>
          <div className="text-sm font-semibold text-white">Loan Overview</div>
          <div className="text-xs text-teal-100/50">Active Applications</div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-lg font-bold text-emerald-400">342</div>
        <div className="text-[10px] text-teal-100/40">Pending</div>
      </div>
    </div>
    
    <div className="grid grid-cols-3 gap-3 mt-4">
      <div className="text-center p-2 rounded-xl bg-white/5">
        <div className="text-sm font-bold text-white">₱5.2M</div>
        <div className="text-[10px] text-teal-100/40">Approved</div>
      </div>
      <div className="text-center p-2 rounded-xl bg-white/5">
        <div className="text-sm font-bold text-white">₱2.1M</div>
        <div className="text-[10px] text-teal-100/40">Disbursed</div>
      </div>
      <div className="text-center p-2 rounded-xl bg-white/5">
        <div className="text-sm font-bold text-white">98%</div>
        <div className="text-[10px] text-teal-100/40">Recovery</div>
      </div>
    </div>

    <div className="mt-4 flex items-center gap-2">
      <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
        <div className="w-4/5 h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" />
      </div>
      <span className="text-xs text-emerald-400 font-medium">80%</span>
    </div>
  </div>
);

export default function DownloadSection() {
  const [selectedOS, setSelectedOS] = useState<OS>("windows");
  const [selectedPackage, setSelectedPackage] = useState<PackageType>("exe");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const SelectedOSIcon = OS_META[selectedOS].Icon;

  const currentPackages = OS_META[selectedOS].packages;
  const currentPackage = currentPackages.find(p => p.type === selectedPackage) || currentPackages[0];

  const handleOSSelect = (os: OS) => {
    setSelectedOS(os);
    const defaultPackage = OS_META[os].packages[0].type;
    setSelectedPackage(defaultPackage);
    setIsDropdownOpen(false);
  };

  return (
    <section className="relative z-10 py-24" id="download">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="px-6 md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left content */}
            <div>
              <AnimatedSection animation="fadeUp">
                <motion.div 
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-5 py-2 border border-emerald-500/20 mb-6"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-xs font-bold tracking-widest text-emerald-300">
                    DOWNLOAD
                  </span>
                </motion.div>
              </AnimatedSection>

              <AnimatedSection animation="fadeUp" delay={0.1}>
                <h2 className="text-5xl md:text-6xl font-extrabold leading-tight">
                  Get Started
                  <br />
                  <span className="text-emerald-400">Today</span>
                </h2>
              </AnimatedSection>

              <AnimatedSection animation="fadeUp" delay={0.2}>
                <p className="mt-6 text-base text-teal-100/60 max-w-lg leading-relaxed">
                  Experience unparalleled performance with our native desktop application. 
                  Manage member records, process transactions, generate reports, and receive 
                  real-time notifications—optimized for administrative workflows.
                </p>
              </AnimatedSection>

              <AnimatedSection animation="fadeUp" delay={0.3}>
                <div className="mt-10">
                  <p className="text-sm text-teal-100/50 mb-4">Choose your platform</p>
                  <div className="flex flex-wrap gap-3">
                    {(Object.keys(OS_META) as OS[]).map((os) => {
                      const meta = OS_META[os];
                      const isActive = os === selectedOS;
                      return (
                        <motion.button
                          className={cn(
                            "relative inline-flex items-center gap-3 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300",
                            isActive
                              ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/25"
                              : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
                          )}
                          key={os}
                          onClick={() => handleOSSelect(os)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <meta.Icon className="h-5 w-5" />
                          {meta.label}
                          {isActive && (
                            <motion.div
                              className="absolute inset-0 rounded-xl bg-emerald-400"
                              layoutId="osSelector"
                              style={{ zIndex: -1 }}
                              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fadeUp" delay={0.4}>
                <div className="mt-6 relative">
                  <p className="text-sm text-teal-100/50 mb-3">Select package type</p>
                  <div className="relative">
                    <button
                      className="w-full max-w-xs inline-flex items-center justify-between gap-3 rounded-xl bg-white/5 px-5 py-3 text-sm font-medium text-white border border-white/10 hover:bg-white/10 transition-all duration-200"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-emerald-400">{currentPackage.label}</span>
                        <span className="text-teal-100/40 text-xs">({currentPackage.size})</span>
                      </span>
                      <ChevronDown 
                        className={cn(
                          "h-4 w-4 text-teal-100/60 transition-transform duration-200",
                          isDropdownOpen && "rotate-180"
                        )} 
                      />
                    </button>

                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute top-full left-0 mt-2 w-full max-w-xs rounded-xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden z-50"
                          exit={{ opacity: 0, y: -10 }}
                          initial={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {currentPackages.map((pkg) => (
                            <button
                              className={cn(
                                "w-full flex items-center justify-between px-5 py-3 text-sm transition-all duration-200 hover:bg-white/10",
                                selectedPackage === pkg.type 
                                  ? "bg-emerald-500/20 text-emerald-300" 
                                  : "text-white/70"
                              )}
                              key={pkg.type}
                              onClick={() => {
                                setSelectedPackage(pkg.type);
                                setIsDropdownOpen(false);
                              }}
                            >
                              <span>{pkg.label}</span>
                              <span className="text-xs text-teal-100/40">{pkg.size}</span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fadeUp" delay={0.5}>
                <motion.a
                  className="group mt-8 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-gray-900 font-bold shadow-xl shadow-emerald-500/20 relative overflow-hidden"
                  href={currentPackage.downloadUrl || "#"}
                  download={currentPackage.downloadUrl ? "ECoopSystem.exe" : undefined}
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: '0 0 40px rgba(52, 211, 153, 0.4)',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/30 to-emerald-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <Download className="h-5 w-5" />
                  Download {currentPackage.label}
                  <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </motion.a>
              </AnimatedSection>

              <AnimatedSection animation="fadeUp" delay={0.6}>
                <div className="mt-6 flex items-center gap-4 text-xs text-teal-100/40">
                  <span>{OS_META[selectedOS].version}</span>
                  <span className="w-1 h-1 rounded-full bg-teal-100/40" />
                  <span>{currentPackage.size}</span>
                </div>
              </AnimatedSection>
            </div>

            {/* Right - Mockup */}
            <AnimatedSection animation="scale" delay={0.3}>
              <div className="relative">
                <div className="absolute -inset-8 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 rounded-full blur-3xl" />
                
                <AnimatePresence mode="wait">
                  <motion.div
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="relative"
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    key={selectedOS}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="rounded-3xl overflow-hidden bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl">
                      {/* Window bar */}
                      <div className="flex items-center gap-2 bg-black/50 px-5 py-4 border-b border-white/5">
                        <div className="flex gap-2">
                          <span className="h-3 w-3 rounded-full bg-red-500/70" />
                          <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
                          <span className="h-3 w-3 rounded-full bg-green-500/70" />
                        </div>
                        <div className="flex-1" />
                        <SelectedOSIcon className="h-5 w-5 text-emerald-400/60" />
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        {/* App Header */}
                        <div className="h-20 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-white/5 flex items-center px-5 mb-5">
                          <div className="flex items-center gap-4">
                            <div className="h-11 w-11 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                              <SelectedOSIcon className="h-6 w-6 text-emerald-400" />
                            </div>
                            <div>
                              <div className="text-white font-semibold">E-Cooperative Suite</div>
                              <div className="text-sm text-teal-100/50">v2.4.1 • {OS_META[selectedOS].label}</div>
                            </div>
                          </div>
                        </div>

                        {/* Three Stats Cards */}
                        <div className="grid grid-cols-3 gap-4 mb-5">
                          <motion.div 
                            className="h-36 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 backdrop-blur-sm overflow-hidden"
                            whileHover={{ scale: 1.02, borderColor: 'rgba(52, 211, 153, 0.3)' }}
                          >
                            <MemberCard />
                          </motion.div>
                          <motion.div 
                            className="h-36 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 backdrop-blur-sm overflow-hidden"
                            whileHover={{ scale: 1.02, borderColor: 'rgba(52, 211, 153, 0.3)' }}
                          >
                            <TransactionCard />
                          </motion.div>
                          <motion.div 
                            className="h-36 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 backdrop-blur-sm overflow-hidden"
                            whileHover={{ scale: 1.02, borderColor: 'rgba(52, 211, 153, 0.3)' }}
                          >
                            <ReportCard />
                          </motion.div>
                        </div>

                        {/* Large Feature Card */}
                        <motion.div 
                          className="h-44 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border border-white/5 backdrop-blur-sm overflow-hidden"
                          whileHover={{ scale: 1.01, borderColor: 'rgba(52, 211, 153, 0.2)' }}
                        >
                          <LoanCard />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}