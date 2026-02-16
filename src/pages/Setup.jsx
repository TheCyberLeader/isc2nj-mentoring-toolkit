import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getData, setData } from "../utils/localStorage";
import { roles } from "../data/roles";

const roleOptions = Object.entries(roles).map(([slug, r]) => ({
  value: slug,
  label: r.label,
}));

export default function Setup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const existing = getData("profile");

  const [form, setForm] = useState({
    name: existing?.name || "",
    email: existing?.email || "",
    role: existing?.role || searchParams.get("role") || "",
    targetRole: existing?.targetRole || "",
    programStartDate: existing?.programStartDate || "",
    partnerName: existing?.partnerName || "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.role) newErrors.role = "Please select your role";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setData("profile", {
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      partnerName: form.partnerName.trim(),
      createdAt: existing?.createdAt || new Date().toISOString(),
    });

    navigate("/");
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-navy mb-2">Profile Setup</h1>
      <p className="text-dark/60 mb-8">
        Set up your profile to personalize your experience. This only takes a
        minute.
      </p>

      <div className="rounded-lg border border-light-blue bg-light-gray p-4 mb-8 text-sm text-dark/70">
        Your name and email are stored only on this device. If you share this
        device, use the Export feature to back up your data before others use
        the app.
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-navy mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isc2-blue ${
              errors.name ? "border-red-400" : "border-gray-300"
            }`}
            placeholder="Your full name"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-navy mb-1">
            Email <span className="text-dark/40 font-normal">(optional)</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isc2-blue"
            placeholder="you@example.com"
          />
        </div>

        {/* Role */}
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-navy mb-1">
            I am a... <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <label
              className={`flex-1 flex items-center justify-center gap-2 rounded-lg border-2 px-4 py-3 text-sm font-medium cursor-pointer transition-colors ${
                form.role === "mentor"
                  ? "border-navy bg-navy text-white"
                  : "border-gray-300 bg-white text-dark hover:border-navy/40"
              }`}
            >
              <input
                type="radio"
                name="role"
                value="mentor"
                checked={form.role === "mentor"}
                onChange={handleChange}
                className="sr-only"
              />
              Mentor
            </label>
            <label
              className={`flex-1 flex items-center justify-center gap-2 rounded-lg border-2 px-4 py-3 text-sm font-medium cursor-pointer transition-colors ${
                form.role === "mentee"
                  ? "border-navy bg-navy text-white"
                  : "border-gray-300 bg-white text-dark hover:border-navy/40"
              }`}
            >
              <input
                type="radio"
                name="role"
                value="mentee"
                checked={form.role === "mentee"}
                onChange={handleChange}
                className="sr-only"
              />
              Mentee
            </label>
          </div>
          {errors.role && (
            <p className="text-red-500 text-xs mt-1">{errors.role}</p>
          )}
        </div>

        {/* Target Role */}
        <div>
          <label htmlFor="targetRole" className="block text-sm font-medium text-navy mb-1">
            Target Cybersecurity Role
          </label>
          <select
            id="targetRole"
            name="targetRole"
            value={form.targetRole}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-isc2-blue"
          >
            <option value="">Select a career track...</option>
            {roleOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Program Start Date */}
        <div>
          <label htmlFor="programStartDate" className="block text-sm font-medium text-navy mb-1">
            Program Start Date
          </label>
          <input
            id="programStartDate"
            name="programStartDate"
            type="date"
            value={form.programStartDate}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isc2-blue"
          />
        </div>

        {/* Partner Name */}
        <div>
          <label htmlFor="partnerName" className="block text-sm font-medium text-navy mb-1">
            {form.role === "mentor" ? "Mentee" : "Mentor"} Name
          </label>
          <input
            id="partnerName"
            name="partnerName"
            type="text"
            value={form.partnerName}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isc2-blue"
            placeholder={`Your ${form.role === "mentor" ? "mentee" : "mentor"}'s name`}
          />
        </div>

        {/* Submit */}
        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            className="bg-accent text-white px-6 py-2.5 rounded-lg font-medium hover:bg-accent/90 transition-colors"
          >
            {existing ? "Update Profile" : "Save & Continue"}
          </button>
          {existing && (
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-sm text-dark/50 hover:text-dark transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
