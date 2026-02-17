import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import PageSection from "./PageSection";
import { cx } from "./utils";

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOpen((v) => !v)}
      className="w-full text-left rounded-2xl bg-black/20 backdrop-blur-xl px-8 py-6 hover:bg-black/25 transition"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-base md:text-lg text-white/90">{q}</span>
        <ChevronDown
          className={cx(
            "h-5 w-5 text-emerald-300 transition-transform",
            open && "rotate-180"
          )}
        />
      </div>
      {open && (
        <p className="mt-4 text-sm md:text-base leading-relaxed text-teal-100/70">
          {a}
        </p>
      )}
    </button>
  );
}

export default function FAQSection() {
  return (
    <PageSection id="faq" className="relative z-10 py-36">
      <div className="px-6 md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div>
              <div className="inline-flex items-center rounded-xl bg-emerald-500 px-5 py-2 text-sm font-bold text-black">
                Frequently Asked Questions
              </div>

              <h3 className="mt-8 text-5xl md:text-5xl font-extrabold leading-tight">
                Can’t find your
                <br />
                question here?
              </h3>

              <p className="mt-6 text-base md:text-lg text-teal-100/60 max-w-2xl">
                Browse all our frequently asked questions or contact us directly.
              </p>

              <a
                href="#contact"
                className="mt-6 inline-flex text-base font-semibold text-emerald-300 hover:text-emerald-200 transition"
              >
                Contact us for more help →
              </a>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-4xl font-bold">Frequently Asked Questions</h4>
                <p className="mt-2 text-xs text-teal-100/55">
                  Here you’ll find the most common questions. Can’t find what you’re looking for?
                  Feel free to contact us directly.
                </p>
              </div>

              <div className="mt-6 space-y-4">
                <FAQItem
                  q="What is E-Cooperative Suite?"
                  a="A digital platform designed to streamline cooperative operations—member management, transactions, reporting, and notifications—across desktop and mobile experiences."
                />
                <FAQItem
                  q="Is my data secure?"
                  a="We apply layered security controls and best practices to protect sensitive cooperative data and ensure secure access."
                />
                <FAQItem
                  q="Who can use e-coop suite?"
                  a="Yes. Members can access services using mobile-friendly interfaces depending on your cooperative’s deployment setup."
                />
                <FAQItem
                  q="How do I request support?"
                  a="Use the Contact section below to message us. Include your cooperative name and what you need help with."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageSection>
  );
}
