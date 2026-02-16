import { useState } from "react";
import { getData } from "../utils/localStorage";
import { roles } from "../data/roles";

const roleSlugs = Object.keys(roles);

function ExternalLink({ href, children, className = "" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-isc2-blue hover:text-navy hover:underline transition-colors ${className}`}
    >
      {children}
    </a>
  );
}

function ResourceSection({ title, items, color }) {
  return (
    <div className="mb-8">
      <h3
        className="text-lg font-bold mb-3"
        style={{ color }}
      >
        {title}
      </h3>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="rounded-lg border border-gray-200 bg-white px-4 py-3 flex items-start justify-between gap-3"
          >
            <div className="min-w-0">
              <ExternalLink href={item.url} className="font-medium text-sm">
                {item.name}
              </ExternalLink>
              {item.note && (
                <p className="text-xs text-dark/50 mt-0.5">{item.note}</p>
              )}
            </div>
            <ExternalLink href={item.url} className="shrink-0 text-dark/30 hover:text-isc2-blue">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </ExternalLink>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Resources() {
  const profile = getData("profile");
  const defaultRole = profile?.targetRole && roles[profile.targetRole] ? profile.targetRole : roleSlugs[0];
  const [activeRole, setActiveRole] = useState(defaultRole);

  const role = roles[activeRole];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-navy mb-1">Resource Library</h1>
      <p className="text-dark/60 text-sm mb-8">
        Curated certifications, practice platforms, and communities for each cybersecurity career track.
      </p>

      {/* Role tabs — desktop */}
      <div className="hidden md:flex flex-wrap gap-2 mb-8">
        {roleSlugs.map((slug) => (
          <button
            key={slug}
            onClick={() => setActiveRole(slug)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeRole === slug
                ? "bg-navy text-white"
                : "bg-light-gray text-dark/60 hover:bg-navy/10 hover:text-navy"
            }`}
          >
            {roles[slug].label}
          </button>
        ))}
      </div>

      {/* Role dropdown — mobile */}
      <div className="md:hidden mb-8">
        <label htmlFor="role-select" className="sr-only">Select a career track</label>
        <select
          id="role-select"
          value={activeRole}
          onChange={(e) => setActiveRole(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-isc2-blue"
        >
          {roleSlugs.map((slug) => (
            <option key={slug} value={slug}>
              {roles[slug].label}
            </option>
          ))}
        </select>
      </div>

      {/* Role content */}
      <div className="rounded-xl border border-gray-200 bg-light-gray p-6 sm:p-8">
        <h2 className="text-xl font-bold text-navy mb-2">{role.label}</h2>
        <p className="text-dark/70 text-sm mb-8">{role.overview}</p>

        <ResourceSection
          title="Key Certifications"
          items={role.certifications}
          color="#0D7377"
        />
        <ResourceSection
          title="Practice Platforms"
          items={role.platforms}
          color="#0D7377"
        />
        <ResourceSection
          title="Communities & Events"
          items={role.communities}
          color="#0D7377"
        />
      </div>
    </div>
  );
}
