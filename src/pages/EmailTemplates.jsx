import { useState } from "react";
import { getData } from "../utils/localStorage";
import { emailTemplates } from "../data/emailTemplates";
import { roles } from "../data/roles";
import { config } from "../data/config";

function highlightTokens(text) {
  const parts = text.split(/(\[[A-Z_]+\])/g);
  return parts.map((part, i) =>
    /^\[[A-Z_]+\]$/.test(part) ? (
      <span key={i} className="bg-amber-100 text-amber-800 rounded px-0.5 font-medium">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

function buildTokenMap(profile) {
  if (!profile) return {};
  const map = {};
  if (profile.name) {
    if (profile.role === "mentor") {
      map["[MENTOR_NAME]"] = profile.name;
    } else {
      map["[MENTEE_NAME]"] = profile.name;
    }
  }
  if (profile.partnerName) {
    if (profile.role === "mentor") {
      map["[MENTEE_NAME]"] = profile.partnerName;
    } else {
      map["[MENTOR_NAME]"] = profile.partnerName;
    }
  }
  if (profile.targetRole && roles[profile.targetRole]) {
    map["[TARGET_ROLE]"] = roles[profile.targetRole].label;
  }
  map["[PROGRAM_NAME]"] = config.programName;
  return map;
}

function applyTokens(text, tokenMap) {
  let result = text;
  for (const [token, value] of Object.entries(tokenMap)) {
    result = result.replaceAll(token, value);
  }
  return result;
}

function TemplateCard({ template, profile }) {
  const [body, setBody] = useState(template.body);
  const [subject, setSubject] = useState(template.subject);
  const [copied, setCopied] = useState(null);
  const [filled, setFilled] = useState(false);

  const tokenMap = buildTokenMap(profile);
  const hasTokens = Object.keys(tokenMap).length > 0;

  function handleFill() {
    setSubject((prev) => applyTokens(prev, tokenMap));
    setBody((prev) => applyTokens(prev, tokenMap));
    setFilled(true);
  }

  function handleReset() {
    setSubject(template.subject);
    setBody(template.body);
    setFilled(false);
  }

  async function handleCopy(text, label) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    }
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 bg-light-gray">
        <h3 className="font-bold text-navy">{template.label}</h3>
        <p className="text-xs text-dark/50 mt-0.5">{template.scenario}</p>
      </div>

      <div className="p-5 space-y-4">
        {/* Subject line */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-medium text-dark/50 uppercase tracking-wide">
              Subject
            </label>
            <button
              onClick={() => handleCopy(subject, "subject")}
              className="text-xs text-isc2-blue hover:text-navy transition-colors"
            >
              {copied === "subject" ? "Copied!" : "Copy subject"}
            </button>
          </div>
          <div className="rounded-lg border border-gray-200 bg-light-gray px-3 py-2 text-sm">
            {highlightTokens(subject)}
          </div>
        </div>

        {/* Body */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor={`body-${template.id}`} className="text-xs font-medium text-dark/50 uppercase tracking-wide">
              Body
            </label>
            <button
              onClick={() => handleCopy(body, "body")}
              className="text-xs text-isc2-blue hover:text-navy transition-colors"
            >
              {copied === "body" ? "Copied!" : "Copy body"}
            </button>
          </div>
          <textarea
            id={`body-${template.id}`}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={10}
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-isc2-blue resize-y"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => handleCopy(`Subject: ${subject}\n\n${body}`, "all")}
            className="bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
          >
            {copied === "all" ? "Copied!" : "Copy Full Email"}
          </button>
          {hasTokens && !filled && (
            <button
              onClick={handleFill}
              className="bg-isc2-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-isc2-blue/90 transition-colors"
            >
              Fill from Profile
            </button>
          )}
          {filled && (
            <button
              onClick={handleReset}
              className="text-sm text-dark/50 hover:text-dark transition-colors"
            >
              Reset to Template
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function EmailTemplates() {
  const profile = getData("profile");

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-navy mb-1">Email Templates</h1>
      <p className="text-dark/60 text-sm mb-8">
        Ready-to-use email templates for every stage of the mentoring relationship. Edit, fill from your profile, and copy.
      </p>

      {profile && (
        <div className="rounded-lg border border-isc2-blue/30 bg-isc2-blue/5 p-4 mb-8 text-sm text-dark/70">
          Profile detected &mdash; use the <strong>"Fill from Profile"</strong> button on any template to auto-replace{" "}
          <span className="bg-amber-100 text-amber-800 rounded px-1 text-xs font-medium">[TOKENS]</span>{" "}
          with your saved data.
        </div>
      )}

      <div className="space-y-6">
        {emailTemplates.map((t) => (
          <TemplateCard key={t.id} template={t} profile={profile} />
        ))}
      </div>
    </div>
  );
}
