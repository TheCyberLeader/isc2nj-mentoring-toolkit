import { NavLink } from "react-router-dom";
import { useState } from "react";
import { config } from "../data/config";

const links = [
  { to: "/", label: "Home" },
  { to: "/setup", label: "Setup" },
  { to: "/goals", label: "Goals" },
  { to: "/sessions", label: "Sessions" },
  { to: "/resources", label: "Resources" },
  { to: "/email-templates", label: "Templates" },
  { to: "/guide", label: "Guide" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-[#E5E7EB] print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-4 shrink-0">
            <img
              src={config.logoHorizontal}
              alt={config.chapterName}
              className="h-10 w-auto"
            />
            <span className="hidden md:block text-sm font-medium text-navy">
              Cybersecurity Mentoring Toolkit
            </span>
          </div>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-navy text-white"
                      : "text-navy/70 hover:bg-navy/10 hover:text-navy"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-md text-navy/70 hover:text-navy hover:bg-navy/10"
            aria-label="Toggle navigation menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-[#E5E7EB]">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? "bg-navy text-white"
                      : "text-navy/70 hover:bg-navy/10 hover:text-navy"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
