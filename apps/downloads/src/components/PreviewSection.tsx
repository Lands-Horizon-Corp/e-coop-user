import React from "react";
import PageSection from "./PageSection";

export default function PreviewSection() {
  return (
    <PageSection id="preview" className="relative z-10 py-28">
      <div className="px-6 md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="flex justify-center">
            <div className="w-full max-w-5xl">
              <div className="rounded-3xl overflow-hidden bg-black/20 backdrop-blur-xl shadow-2xl">
                <div className="flex items-center gap-2 bg-black/25 px-5 py-3">
                  <div className="flex gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-500/70" />
                    <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
                    <span className="h-3 w-3 rounded-full bg-green-500/70" />
                  </div>
                  <div className="flex-1 text-center text-xs text-white/50">
                    E-Cooperative Suite Dashboard
                  </div>
                </div>

                <div className="p-8">
                  <div className="rounded-2xl bg-black/15 p-6">
                    <div className="h-16 rounded-xl bg-emerald-500/10" />
                    <div className="mt-8 grid grid-cols-3 gap-6">
                      <div className="h-28 rounded-xl bg-emerald-500/10" />
                      <div className="h-28 rounded-xl bg-teal-500/10" />
                      <div className="h-28 rounded-xl bg-green-500/10" />
                    </div>
                    <div className="mt-8 h-40 rounded-xl bg-emerald-500/10" />
                  </div>
                </div>
              </div>

              <p className="mt-10 text-center text-sm text-teal-100/70">
                Seamless access for administrators and members. Desktop power meets mobile
                convenience—manage your cooperative from anywhere.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageSection>
  );
}
