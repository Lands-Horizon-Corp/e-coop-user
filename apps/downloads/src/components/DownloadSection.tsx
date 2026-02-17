import React, { useState } from "react";
import { BarChart3, Download } from "lucide-react";
import PageSection from "./PageSection";
import { cx } from "./utils";

type OS = "windows" | "macos" | "linux";

const OS_META: Record<
  OS,
  { label: string; Icon: React.FC<React.SVGProps<SVGSVGElement>> }
> = {
  windows: {
    label: "Windows",
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
      </svg>
    ),
  },
  macos: {
    label: "macOS",
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    ),
  },
  linux: {
    label: "Linux",
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12.146 0c-.255 0-.514.05-.76.16-.248.113-.48.282-.68.507-.2.224-.365.503-.48.82-.116.315-.18.664-.18 1.02 0 .355.064.704.18 1.02.115.317.28.595.48.82.2.224.432.393.68.506.492.226 1.028.226 1.52 0 .247-.113.48-.282.68-.507.2-.224.364-.502.48-.82.115-.315.18-.664.18-1.02 0-.355-.065-.704-.18-1.02-.116-.316-.28-.595-.48-.82-.2-.224-.433-.393-.68-.506-.246-.11-.505-.16-.76-.16z" />
        <path d="M7.5 9.76c-.398 0-.78.158-1.06.44-.28.28-.44.663-.44 1.06v4.48c0 .398.158.78.44 1.06.28.282.662.44 1.06.44s.78-.158 1.06-.44c.282-.28.44-.662.44-1.06v-4.48c0-.397-.158-.78-.44-1.06-.28-.282-.662-.44-1.06-.44zm9 0c-.398 0-.78.158-1.06.44-.282.28-.44.663-.44 1.06v4.48c0 .398.158.78.44 1.06.28.282.662.44 1.06.44s.78-.158 1.06-.44c.28-.28.44-.662.44-1.06v-4.48c0-.397-.158-.78-.44-1.06-.28-.282-.662-.44-1.06-.44z" />
      </svg>
    ),
  },
};

export default function DownloadSection() {
  const [selectedOS, setSelectedOS] = useState<OS>("windows");
  const SelectedOSIcon = OS_META[selectedOS].Icon;

  return (
    <PageSection
      id="download"
      className="relative z-10 min-h-screen flex items-center -mt-20 lg:-mt-28"
    >
      <div className="w-full px-6 md:px-10 py-28">
        <div className="mx-auto max-w-8xl">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            {/* left */}
            <div className="lg:ml-24">
              <h2 className="text-6xl md:text-7xl font-extrabold leading-[0.95] tracking-tight">
                DOWNLOAD
                <br />
                FOR DESKTOP
              </h2>

              <p className="mt-8 text-lg md:text-xl leading-relaxed text-teal-100/70 max-w-2xl">
                Experience unparalleled performance with our native desktop application. Manage
                member records, process transactions, generate reports, and receive real-time
                notifications—optimized for administrative workflows.
              </p>

              {/* OS selector */}
              <div className="mt-10 flex flex-wrap gap-4">
                {(Object.keys(OS_META) as OS[]).map((os) => {
                  const meta = OS_META[os];
                  const Active = os === selectedOS;
                  return (
                    <button
                      key={os}
                      onClick={() => setSelectedOS(os)}
                      className={cx(
                        "inline-flex items-center gap-3 rounded-xl px-6 py-4 text-sm font-semibold transition",
                        Active
                          ? "bg-emerald-500 text-black shadow-xl shadow-emerald-500/25"
                          : "bg-white/10 text-white/85 hover:bg-white/15"
                      )}
                    >
                      <meta.Icon className="h-5 w-5" />
                      {meta.label}
                    </button>
                  );
                })}
              </div>

              <a
                href="#"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 text-gray-900 font-extrabold shadow-2xl shadow-emerald-500/20 hover:bg-gray-100 transition"
              >
                <Download className="h-6 w-6" />
                Download for {OS_META[selectedOS].label}
              </a>
            </div>

            {/* right mock */}
            <div className="flex justify-center lg:justify-start relative lg:-ml-24">
              <div className="w-full max-w-[920px] relative z-10 rounded-[2rem] bg-black/20 backdrop-blur-xl shadow-2xl overflow-hidden">
                <div className="flex items-center gap-2 bg-black/25 px-6 py-4">
                  <div className="flex gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-500/70" />
                    <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
                    <span className="h-3 w-3 rounded-full bg-green-500/70" />
                  </div>
                  <div className="flex-1" />
                  <SelectedOSIcon className="h-6 w-6 text-emerald-200/80" />
                </div>

                <div className="p-12 lg:p-16">
                  <div className="h-28 rounded-2xl bg-emerald-500/10" />
                  <div className="mt-10 grid grid-cols-3 gap-8">
                    <div className="h-36 rounded-2xl bg-emerald-500/10" />
                    <div className="h-36 rounded-2xl bg-teal-500/10" />
                    <div className="h-36 rounded-2xl bg-green-500/10" />
                  </div>
                  <div className="mt-10 h-72 rounded-2xl bg-emerald-500/10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageSection>
  );
}
