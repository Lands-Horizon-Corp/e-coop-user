import React from "react";
import { BarChart3, Bot, Database, Download, Shield, Users } from "lucide-react";
import PageSection from "./PageSection";
import { cx } from "./utils";

export default function HomeHero() {
  return (
    <PageSection id="home" className="relative min-h-screen overflow-hidden">
      {/* outline icons */}
      <div className="pointer-events-none absolute inset-0 opacity-25">
        <Bot className="absolute left-[18%] top-[26%] h-10 w-10 text-emerald-300 animate-float" />
        <Database
          className="absolute right-[18%] top-[22%] h-10 w-10 text-emerald-300 animate-float"
          style={{ animationDelay: "1s" }}
        />
        <BarChart3
          className="absolute right-[16%] top-[35%] h-10 w-10 text-emerald-300 animate-float"
          style={{ animationDelay: "2s" }}
        />
        <Users
          className="absolute right-[22%] bottom-[18%] h-10 w-10 text-emerald-300 animate-float"
          style={{ animationDelay: "1.5s" }}
        />
        <Shield
          className="absolute left-[12%] bottom-[25%] h-10 w-10 text-emerald-300 animate-float"
          style={{ animationDelay: "0.5s" }}
        />
      </div>

      {/* stat cards */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-30 top-10 hidden lg:block animate-float">
          <div className="w-52 rounded-2xl bg-black/20 backdrop-blur-xl shadow-2xl">
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-3xl font-extrabold text-white">25</div>
                  <div className="mt-3 text-xs font-semibold text-emerald-200">
                    New Members
                  </div>
                  <div className="text-xs text-teal-200/60">This Week</div>
                </div>
                <div className="h-11 w-11 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-emerald-300" />
                </div>
              </div>
              <div className="mt-4 text-xs font-semibold text-emerald-300">
                ↑ 12%{" "}
                <span className="text-teal-200/50 font-medium">vs last week</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute right-30 bottom-50 hidden lg:block animate-float"
          style={{ animationDelay: "1.25s" }}
        >
          <div className="w-56 rounded-2xl bg-black/20 backdrop-blur-xl shadow-2xl">
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-3xl font-extrabold text-white">₱150K</div>
                  <div className="mt-3 text-xs font-semibold text-emerald-200">
                    Growth
                  </div>
                  <div className="text-xs text-teal-200/60">This Month</div>
                </div>
                <div className="h-11 w-11 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-emerald-300" />
                </div>
              </div>

              <div className="mt-4 flex items-end gap-1 h-8">
                {[35, 55, 45, 70, 100].map((h, idx) => (
                  <div
                    key={idx}
                    className="flex-1 rounded-t bg-emerald-400/40"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* content */}
      <div className="relative z-10">
        <div className="px-6 md:px-10 pt-32 pb-20">
          <div className="mx-auto max-w-6xl text-center">
            <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/10 px-5 py-2 backdrop-blur">
              <Shield className="h-4 w-4 text-emerald-300" />
              <span className="text-xs font-bold tracking-widest text-emerald-200">
                LANDS HORIZON CORP.
              </span>
            </div>

            <h1 className="mt-10 text-5xl md:text-7xl font-extrabold leading-[1.05]">
              Empowering
              <br />
              Communities Through
              <br />
              <span className="bg-gradient-to-r from-teal-300 via-emerald-300 to-green-300 bg-clip-text text-transparent">
                E-Cooperative Suite
              </span>
            </h1>

            <p className="mt-8 text-base md:text-lg text-teal-100/75 max-w-3xl mx-auto leading-relaxed">
              Cooperative embody the power of community, where shared ownership and
              mutual economic challenges into opportunities for progress and empowerment.
            </p>

            <div className="mt-10 flex justify-center">
              <a
                href="#download"
                className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-gray-900 font-bold shadow-xl shadow-emerald-500/20 hover:bg-gray-100 transition"
              >
                <Download className="h-5 w-5" />
                Download for Windows
              </a>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
              <div>
                <Bot className="mx-auto h-9 w-9 text-emerald-300/90" />
                <div className="mt-4 text-sm font-semibold">
                  AI Enabled Cooperative Banking
                </div>
                <div className="mt-2 text-xs text-teal-100/60">
                  Powered by LLM and Machine Learning
                </div>
              </div>

              <div>
                <Shield className="mx-auto h-9 w-9 text-emerald-300/90" />
                <div className="mt-4 text-sm font-semibold">
                  Advanced Security Implementation
                </div>
                <div className="mt-2 text-xs text-teal-100/60">
                  Enterprise-grade protection
                </div>
              </div>

              <div>
                <Database className="mx-auto h-9 w-9 text-emerald-300/90" />
                <div className="mt-4 text-sm font-semibold">
                  1B+ Transactions Supported
                </div>
                <div className="mt-2 text-xs text-teal-100/60">
                  Can handle billions of transactions with latest state of the art technologies
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageSection>
  );
}
