import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Link2 } from "lucide-react";
import { allPolicies } from "./all-policies";
import { policyList } from "./policy-list";
import type { Policy } from "./types"; // Add this import

export default function PoliciesPage() {
  const { policyId = "privacy" } = useParams();
  const [activeSection, setActiveSection] = useState<string>("");

  const currentPolicy: Policy = allPolicies.find((p) => p.id === policyId) || allPolicies[0];

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveSection("");
    }, 0);
    return () => clearTimeout(timer);
  }, [policyId]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        behavior: "smooth",
        top: offsetPosition,
      });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1c] pb-20 pt-4 text-white">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* LEFT SIDEBAR - Policy List */}
          <div className="lg:col-span-3">
            <nav className="space-y-1">
              {policyList.map((policy) => {
                const isActive = policyId === policy.id;
                const activeClass = isActive
                  ? "border-emerald-400 border-l-2 bg-emerald-500/20 text-emerald-400"
                  : "text-white/60 hover:bg-white/5 hover:text-white";
                
                return (
                  <Link
                    className={`block rounded-lg px-4 py-3 text-sm transition-all ${activeClass}`}
                    key={policy.id}
                    to={`/policies/${policy.id}`}
                  >
                    {policy.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* CENTER - Content */}
          <div className="lg:col-span-6">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              key={policyId}
            >
              <div>
                <h1 className="mb-2 text-3xl font-bold text-white">
                  Lands Horizon {currentPolicy.title}
                </h1>
                <div className="my-4 h-px bg-white/10" />
                <p className="text-sm text-white/60">
                  Effective Date: {currentPolicy.effectiveDate}
                </p>
              </div>

              <div
                className="text-sm leading-relaxed text-white/80"
                dangerouslySetInnerHTML={{ __html: currentPolicy.content }}
              />

              <div className="space-y-6">
                {currentPolicy.sections.map((section: PolicySection) => ( // Add type here
                  <motion.section
                    animate={{ opacity: 1 }}
                    className="rounded-xl border border-white/10 bg-white/2 p-6 transition-colors hover:border-white/20"
                    id={section.id}
                    initial={{ opacity: 0 }}
                    key={section.id}
                  >
                    <div className="mb-4 flex items-center gap-2">
                      <Link2 className="h-4 w-4 text-emerald-400" />
                      <h2 className="text-lg font-semibold text-white">
                        {section.title}
                      </h2>
                    </div>
                    <div
                      className="text-sm leading-relaxed text-white/70"
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                  </motion.section>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDEBAR - Table of Contents */}
          <div className="lg:col-span-3">
            <div>
              <h3 className="mb-4 text-sm font-semibold text-white">
                In this article
              </h3>
              <nav className="space-y-2">
                {currentPolicy.sections.map((section: PolicySection, index: number) => { // Add types here
                  const isActive = activeSection === section.id;
                  const activeClass = isActive
                    ? "text-emerald-400"
                    : "text-white/50";
                  
                  return (
                    <button
                      className={`block w-full text-left text-xs transition-colors hover:text-emerald-400 ${activeClass}`}
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      type="button"
                    >
                      {index + 1}. {section.title.replace(/^\d+\.\s*/, "")}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add this type if not already in types.ts
interface PolicySection {
  id: string;
  title: string;
  content: string;
}