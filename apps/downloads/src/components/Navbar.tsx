import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type LinkItem = {
  id: string;
  label: string;
};

const LINKS: LinkItem[] = [
  { id: "home", label: "Home" },
  { id: "preview", label: "Preview" },
  { id: "download", label: "Download" },
  { id: "faq", label: "FAQs" },
  { id: "contact", label: "Contact" },
];

interface NavbarProps {
  logo: string;
  isPoliciesPage?: boolean;
}

export default function Navbar({ logo, isPoliciesPage = false }: NavbarProps) {
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    if (isPoliciesPage) return;

    const handleScroll = () => {
      let current = "home";

      for (const link of LINKS) {
        const el = document.getElementById(link.id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();

        if (rect.top <= 140 && rect.bottom >= 140) {
          current = link.id;
          break;
        }
      }

      setActive(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isPoliciesPage]);

  return (
    <header className="relative z-50">
      <div className="bg-transparent">
        <div className="px-6 md:px-10">
          <div className="flex h-20 items-center">

            {/* LEFT — logo placeholder (keeps layout) */}
            <div className="flex items-center gap-3">
              <img alt="eCOOP" className="h-11 w-auto opacity-0" src={logo} />
            </div>

            {/* fixed logo — this follows the viewport while nav stays in flow */}
            <div className="fixed left-6 top-3 z-50 md:left-10">
              <Link to="/">
                <img alt="eCOOP" className="h-11 w-auto" src={logo} />
              </Link>
            </div>

            {/* CENTER — NAV LINKS */}
            <nav className="hidden flex-1 items-center justify-center gap-10 text-sm font-semibold text-teal-100/80 md:flex">
              {isPoliciesPage ? (
                // Policies Page Navigation
                <>
                  <Link
                    className="relative text-white transition-colors hover:text-white"
                    to="/"
                  >
                    Home
                    <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-emerald-400" />
                  </Link>
                  <span className="text-white/30">|</span>
                  <span className="text-white">Policies</span>
                </>
              ) : (
                // Landing Page Navigation
                LINKS.map((link) => {
                  const isActive = active === link.id;

                  return (
                    <a
                      className="relative transition-colors hover:text-white"
                      href={`#${link.id}`}
                      key={link.id}
                    >
                      <span className={isActive ? "text-white" : ""}>
                        {link.label}
                      </span>

                      {isActive && (
                        <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-emerald-400" />
                      )}
                    </a>
                  );
                })
              )}
            </nav>

          </div>
        </div>
      </div>
    </header>
  );
}