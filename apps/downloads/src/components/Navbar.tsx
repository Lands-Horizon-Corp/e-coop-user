import React, { useEffect, useState } from "react";

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

export default function Navbar({ logo }: { logo: string }) {
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const handleScroll = () => {
      let current = "home";

      for (const link of LINKS) {
        const el = document.getElementById(link.id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();

        // adjust 140 if your navbar height changes
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
  }, []);

  return (
    <header className="relative z-50">
      <div className="bg-transparent">
        <div className="px-6 md:px-10">
          <div className="h-20 flex items-center">

            {/* LEFT — logo placeholder (keeps layout) */}
            <div className="flex items-center gap-3">
              {/* keep an invisible placeholder so the centered nav stays centered */}
              <img src={logo} alt="eCOOP" className="h-11 w-auto opacity-0" />
            </div>

            {/* fixed logo — this follows the viewport while nav stays in flow */}
            <div className="fixed left-6 top-3 z-50 md:left-10">
              <img src={logo} alt="eCOOP" className="h-11 w-auto" />
            </div>

            {/* CENTER — NAV LINKS */}
            <nav className="hidden md:flex flex-1 items-center justify-center gap-10 text-sm font-semibold text-teal-100/80">
              {LINKS.map((link) => {
                const isActive = active === link.id;

                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    className="relative hover:text-white transition-colors"
                  >
                    <span className={isActive ? "text-white" : ""}>
                      {link.label}
                    </span>

                    {/* active green underline */}
                    {isActive && (
                      <span className="absolute left-0 -bottom-2 h-[2px] w-full bg-emerald-400 rounded-full" />
                    )}
                  </a>
                );
              })}
            </nav>

          </div>
        </div>
      </div>
    </header>
  );
}