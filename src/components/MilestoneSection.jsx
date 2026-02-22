import { useState } from "react";
import { getData, setData } from "../utils/localStorage";
import DeleteConfirm from "./DeleteConfirm";

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export default function MilestoneSection({ maxMilestones }) {
  const [milestones, setMilestones] = useState(() => getData("milestones") || []);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ date: "", achievement: "", nextStep: "" });
  const [deleteId, setDeleteId] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleAdd(e) {
    e.preventDefault();
    if (!form.achievement.trim()) return;
    const newMilestone = {
      id: generateId(),
      ...form,
      achievement: form.achievement.trim(),
      nextStep: form.nextStep.trim(),
    };
    const updated = [...milestones, newMilestone];
    setMilestones(updated);
    setData("milestones", updated);
    setForm({ date: "", achievement: "", nextStep: "" });
    setShowForm(false);
  }

  function handleDelete() {
    const updated = milestones.filter((m) => m.id !== deleteId);
    setMilestones(updated);
    setData("milestones", updated);
    setDeleteId(null);
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-navy">
          Milestones
          <span className="text-sm font-normal text-dark/40 ml-2">
            ({milestones.length}/{maxMilestones})
          </span>
        </h2>
        {milestones.length < maxMilestones && (
          <button
            onClick={() => setShowForm(true)}
            className="text-sm font-medium text-accent hover:text-accent/80 transition-colors"
          >
            + Add Milestone
          </button>
        )}
      </div>

      {/* Add milestone form */}
      {showForm && (
        <form
          onSubmit={handleAdd}
          className="rounded-xl border border-teal/30 bg-teal/5 p-5 mb-6 space-y-4"
        >
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="ms-date" className="block text-sm font-medium text-navy mb-1">
                Date
              </label>
              <input
                id="ms-date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal"
              />
            </div>
            <div>
              <label htmlFor="ms-achievement" className="block text-sm font-medium text-navy mb-1">
                Achievement <span className="text-red-500">*</span>
              </label>
              <input
                id="ms-achievement"
                name="achievement"
                type="text"
                value={form.achievement}
                onChange={handleChange}
                required
                placeholder="e.g., Passed Security+"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal"
              />
            </div>
            <div>
              <label htmlFor="ms-next" className="block text-sm font-medium text-navy mb-1">
                Next Step
              </label>
              <input
                id="ms-next"
                name="nextStep"
                type="text"
                value={form.nextStep}
                onChange={handleChange}
                placeholder="e.g., Start CySA+ prep"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="bg-teal text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-teal/90 transition-colors"
            >
              Save Milestone
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setForm({ date: "", achievement: "", nextStep: "" });
              }}
              className="text-sm text-dark/50 hover:text-dark transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Milestones list */}
      {milestones.length === 0 && !showForm ? (
        <div className="rounded-xl border-2 border-dashed border-gray-300 py-10 text-center">
          <p className="text-dark/40 mb-1">No milestones yet</p>
          <p className="text-dark/30 text-sm">
            Record achievements like certifications earned, interviews landed, or skills mastered.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {milestones.map((m) => (
            <div
              key={m.id}
              className="flex items-start gap-4 rounded-lg border border-gray-200 bg-white p-4"
            >
              <div className="shrink-0 w-2 h-2 rounded-full bg-isc2-green mt-2" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium text-navy">{m.achievement}</p>
                  <span className="text-xs text-dark/40 whitespace-nowrap">{m.date || ""}</span>
                </div>
                {m.nextStep && (
                  <p className="text-sm text-dark/60 mt-1">
                    Next: {m.nextStep}
                  </p>
                )}
              </div>
              <button
                onClick={() => setDeleteId(m.id)}
                className="text-dark/30 hover:text-red-500 transition-colors shrink-0"
                aria-label={`Delete milestone: ${m.achievement}`}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Delete confirmation */}
      {deleteId && (
        <DeleteConfirm
          type="milestone"
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </section>
  );
}
