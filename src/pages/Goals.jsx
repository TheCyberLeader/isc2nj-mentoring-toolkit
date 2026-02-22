import { useState, useEffect, useRef, useCallback } from "react";
import { getData, setData } from "../utils/localStorage";
import { roles } from "../data/roles";
import { exportGoalsPDF, exportBlankGoalsPDF } from "../utils/exportPDF";
import RequireProfile from "../components/RequireProfile";

const EMPTY_GOALS = {
  targetJobTitle: "",
  timeline: "",
  currentSkills: "",
  skillsToLearn: "",
  certsPursuing: "",
  networkingGoals: "",
  biggestChallenge: "",
  howMentorCanHelp: "",
  hoursPerWeek: "",
  smart: {
    specific: "",
    measurable: "",
    achievable: "",
    relevant: "",
    timeBound: "",
  },
  lastUpdated: "",
};

const goalFields = [
  { key: "targetJobTitle", label: "Target Role / Job Title", type: "text" },
  { key: "timeline", label: "Timeline to Achieve Goal", type: "text", placeholder: "4 weeks" },
  { key: "currentSkills", label: "Current Skills I Have", type: "textarea" },
  { key: "skillsToLearn", label: "Skills I Need to Develop", type: "textarea" },
  { key: "certsPursuing", label: "Certifications I'm Pursuing", type: "textarea" },
  { key: "networkingGoals", label: "Networking Goals", type: "textarea" },
  { key: "biggestChallenge", label: "Biggest Challenge / Fear", type: "textarea" },
  { key: "howMentorCanHelp", label: "How My Mentor Can Help", type: "textarea" },
  { key: "hoursPerWeek", label: "My Commitment (hrs/week)", type: "number" },
];

const smartFields = [
  { key: "specific", label: "Specific", placeholder: "What exactly do I want to accomplish?" },
  { key: "measurable", label: "Measurable", placeholder: "How will I know when I've achieved it?" },
  { key: "achievable", label: "Achievable", placeholder: "Is this realistic given my resources and constraints?" },
  { key: "relevant", label: "Relevant", placeholder: "Why does this matter to my career goals?" },
  { key: "timeBound", label: "Time-Bound", placeholder: "By end of program (4 weeks)" },
];

export default function Goals() {
  const profile = getData("profile");
  const [form, setForm] = useState(() => {
    const saved = getData("goals");
    return saved ? { ...EMPTY_GOALS, ...saved, smart: { ...EMPTY_GOALS.smart, ...saved?.smart } } : { ...EMPTY_GOALS };
  });
  const [saveStatus, setSaveStatus] = useState(null);
  const timerRef = useRef(null);

  const saveToStorage = useCallback((data) => {
    setData("goals", { ...data, lastUpdated: new Date().toISOString() });
    setSaveStatus("Saved");
    setTimeout(() => setSaveStatus(null), 2000);
  }, []);

  // Debounced auto-save
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      saveToStorage(form);
    }, 500);
    return () => clearTimeout(timerRef.current);
  }, [form, saveToStorage]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSmartChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      smart: { ...prev.smart, [name]: value },
    }));
  }

  return (
    <RequireProfile
      title="Goal-Setting Worksheet"
      message="Please set up your profile first so we can personalize your experience."
    >
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-navy">Goal-Setting Worksheet</h1>
        {saveStatus && (
          <span className="text-xs text-accent font-medium bg-accent/10 px-3 py-1 rounded-full">
            {saveStatus}
          </span>
        )}
      </div>
      <p className="text-dark/60 mb-8">
        Define your cybersecurity career goals. Everything auto-saves as you type.
      </p>

      {/* Pre-fill hint */}
      {profile.targetRole && roles[profile.targetRole] && !form.targetJobTitle && (
        <div className="rounded-lg border border-isc2-blue/30 bg-isc2-blue/5 p-4 mb-8 text-sm text-dark/70">
          Your profile target role is{" "}
          <strong className="text-navy">{roles[profile.targetRole].label}</strong>.
          You can use that as your target job title below.
        </div>
      )}

      <div className="space-y-6">
        {/* Goal fields */}
        {goalFields.map((field) => (
          <div key={field.key}>
            <label
              htmlFor={field.key}
              className="block text-sm font-medium text-navy mb-1"
            >
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={field.key}
                name={field.key}
                value={form[field.key]}
                onChange={handleChange}
                rows={3}
                placeholder={field.placeholder}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isc2-blue resize-y placeholder:text-dark/30"
              />
            ) : (
              <input
                id={field.key}
                name={field.key}
                type={field.type}
                value={form[field.key]}
                onChange={handleChange}
                min={field.type === "number" ? "0" : undefined}
                placeholder={field.placeholder}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isc2-blue placeholder:text-dark/30"
              />
            )}
          </div>
        ))}

        {/* SMART Goal Section */}
        <div className="border-t border-light-blue pt-8 mt-8">
          <h2 className="text-xl font-bold text-navy mb-1">SMART Goal</h2>
          <p className="text-dark/60 text-sm mb-6">
            Break down your primary goal using the SMART framework.
          </p>

          <div className="space-y-5">
            {smartFields.map((field) => (
              <div key={field.key}>
                <label
                  htmlFor={`smart-${field.key}`}
                  className="block text-sm font-medium text-teal mb-1"
                >
                  {field.label}
                </label>
                <textarea
                  id={`smart-${field.key}`}
                  name={field.key}
                  value={form.smart[field.key]}
                  onChange={handleSmartChange}
                  rows={2}
                  placeholder={field.placeholder}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal resize-y placeholder:text-dark/30"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Export buttons */}
      <div className="border-t border-light-blue pt-8 mt-10">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => exportGoalsPDF(form, profile)}
            className="bg-accent text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
          >
            Export as PDF
          </button>
          <button
            onClick={exportBlankGoalsPDF}
            className="bg-white border border-gray-300 text-dark px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Export Blank PDF
          </button>
        </div>
        <p className="text-xs text-dark/40 mt-2">
          Download a blank copy before entering personal information.
        </p>
      </div>

      {/* Last updated */}
      {form.lastUpdated && (
        <p className="text-xs text-dark/40 mt-6 text-right">
          Last saved: {new Date(form.lastUpdated).toLocaleString()}
        </p>
      )}
    </div>
    </RequireProfile>
  );
}
