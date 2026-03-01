import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Link2 } from "lucide-react";
import { allPolicies } from "./all-policies";
import { policyList } from "./policy-list";
import type { Policy, PolicySection } from "./types";

export default function PoliciesPage() {
  const { policyId = "privacy" } = useParams();
  const [activeSection, setActiveSection] = useState<string>("");

  const currentPolicy: Policy = allPolicies.find((p) => p.id === policyId) || allPolicies[0];

  // Track which section is in view while scrolling
  useEffect(() => {
    const handleScroll = () => {
      const sections = currentPolicy.sections.map((s) => ({
        id: s.id,
        element: document.getElementById(s.id),
      }));

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPolicy]);

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
    <div className="min-h-screen bg-[#0a0f1c] pb-20 pt-4 text-gray-200">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* LEFT SIDEBAR - Policy List */}
          <div className="lg:col-span-3">
            <nav className="space-y-1">
              {policyList.map((policy) => {
                const isActive = policyId === policy.id;
                const activeClass = isActive
                  ? "border-emerald-400 border-l-2 bg-emerald-500/20 text-emerald-400"
                  : "text-gray-300 hover:bg-white/5 hover:text-white";
                
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

          {/* CENTER - Content with scrollbar */}
          <div className="h-[calc(100vh-6rem)] overflow-y-auto lg:col-span-6">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8 pr-4"
              initial={{ opacity: 0, y: 20 }}
              key={policyId}
            >
              <div>
                <h1 className="mb-2 text-3xl font-bold text-gray-100">
                  Lands Horizon {currentPolicy.title}
                </h1>
                <div className="my-4 h-px bg-gray-700" />
                <p className="text-sm text-gray-400">
                  Effective Date: {currentPolicy.effectiveDate}
                </p>
              </div>

              <div
                className="text-sm leading-relaxed text-gray-300"
                dangerouslySetInnerHTML={{ __html: currentPolicy.content }}
              />

              <div className="space-y-6">
                {currentPolicy.sections.map((section: PolicySection) => (
                  <motion.section
                    animate={{ opacity: 1 }}
                    className="rounded-xl border border-gray-700 bg-gray-800/30 p-6 transition-colors hover:border-gray-600"
                    id={section.id}
                    initial={{ opacity: 0 }}
                    key={section.id}
                  >
                    <div className="mb-4 flex items-center gap-2">
                      <Link2 className="h-4 w-4 text-emerald-400" />
                      <h2 className="text-lg font-semibold text-gray-100">
                        {section.title}
                      </h2>
                    </div>
                    <div
                      className="text-sm leading-relaxed text-gray-300"
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                  </motion.section>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDEBAR - Table of Contents with active highlighting */}
          <div className="lg:col-span-3">
            <div>
              <h3 className="mb-6 text-base font-semibold text-gray-100">
                In this article
              </h3>
              <nav className="space-y-4">
                {currentPolicy.sections.map((section: PolicySection, index: number) => {
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      className={`block w-full text-left text-sm transition-colors ${
                        isActive
                          ? "font-semibold text-emerald-300"
                          : "text-emerald-400 hover:text-emerald-300"
                      }`}
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