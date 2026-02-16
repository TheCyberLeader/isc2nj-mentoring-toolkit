import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { getData, setData } from "../utils/localStorage";
import SessionModal from "../components/SessionModal";
import { exportSessionsPDF, exportBlankSessionsPDF } from "../utils/exportPDF";
import { exportAllJSON, readJSONFile, validateImport, applyImport } from "../utils/exportJSON";

const MAX_SESSIONS = 4;
const MAX_MILESTONES = 4;

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export default function Sessions() {
  const profile = getData("profile");
  const [sessions, setSessions] = useState(() => getData("sessions") || []);
  const [milestones, setMilestones] = useState(() => getData("milestones") || []);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSession, setEditingSession] = useState(null);

  // Milestone form state
  const [showMilestoneForm, setShowMilestoneForm] = useState(false);
  const [milestoneForm, setMilestoneForm] = useState({ date: "", achievement: "", nextStep: "" });

  // Delete confirmation
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Import state
  const [importData, setImportData] = useState(null);
  const [importPreview, setImportPreview] = useState(null);
  const [importError, setImportError] = useState(null);
  const fileInputRef = useRef(null);

  if (!profile) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-navy mb-4">Session Log & Progress Tracker</h1>
        <p className="text-dark/60 mb-6">
          Please set up your profile first to start logging sessions.
        </p>
        <Link
          to="/setup"
          className="inline-block bg-accent text-white px-6 py-2.5 rounded-lg font-medium hover:bg-accent/90 transition-colors"
        >
          Set Up Profile
        </Link>
      </div>
    );
  }

  // --- Session handlers ---

  function openAddModal() {
    setEditingSession(null);
    setModalOpen(true);
  }

  function openEditModal(session) {
    setEditingSession(session);
    setModalOpen(true);
  }

  function handleSaveSession(formData) {
    let updated;
    if (editingSession) {
      updated = sessions.map((s) =>
        s.id === editingSession.id ? { ...s, ...formData } : s
      );
    } else {
      const nextNumber =
        sessions.length > 0
          ? Math.max(...sessions.map((s) => s.sessionNumber)) + 1
          : 1;
      const newSession = {
        id: generateId(),
        sessionNumber: nextNumber,
        ...formData,
        createdAt: new Date().toISOString(),
      };
      updated = [...sessions, newSession];
    }
    setSessions(updated);
    setData("sessions", updated);
    setModalOpen(false);
    setEditingSession(null);
  }

  function confirmDeleteSession(id) {
    setDeleteTarget({ type: "session", id });
  }

  function handleDeleteSession() {
    const updated = sessions.filter((s) => s.id !== deleteTarget.id);
    setSessions(updated);
    setData("sessions", updated);
    setDeleteTarget(null);
  }

  // --- Milestone handlers ---

  function handleMilestoneChange(e) {
    const { name, value } = e.target;
    setMilestoneForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleAddMilestone(e) {
    e.preventDefault();
    if (!milestoneForm.achievement.trim()) return;
    const newMilestone = {
      id: generateId(),
      ...milestoneForm,
      achievement: milestoneForm.achievement.trim(),
      nextStep: milestoneForm.nextStep.trim(),
    };
    const updated = [...milestones, newMilestone];
    setMilestones(updated);
    setData("milestones", updated);
    setMilestoneForm({ date: "", achievement: "", nextStep: "" });
    setShowMilestoneForm(false);
  }

  function confirmDeleteMilestone(id) {
    setDeleteTarget({ type: "milestone", id });
  }

  function handleDeleteMilestone() {
    const updated = milestones.filter((m) => m.id !== deleteTarget.id);
    setMilestones(updated);
    setData("milestones", updated);
    setDeleteTarget(null);
  }

  // --- Import handlers ---

  async function handleFileSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    // Reset file input so same file can be re-selected
    e.target.value = "";

    try {
      const data = await readJSONFile(file);
      const result = validateImport(data);
      if (!result.valid) {
        setImportError(result.errors.join(" "));
        return;
      }
      setImportData(data);
      setImportPreview(result.preview);
      setImportError(null);
    } catch (err) {
      setImportError(err.message);
    }
  }

  function handleApplyImport(mode) {
    try {
      applyImport(importData, mode);
      // Reload the page to guarantee all data (including profile, which
      // is not React state) is re-read cleanly from localStorage.
      window.location.reload();
    } catch {
      setImportError("Import failed. The file may be corrupted.");
      setImportData(null);
      setImportPreview(null);
    }
  }

  const nextSessionNumber =
    sessions.length > 0
      ? Math.max(...sessions.map((s) => s.sessionNumber)) + 1
      : 1;

  const sortedSessions = [...sessions].sort(
    (a, b) => a.sessionNumber - b.sessionNumber
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">Session Log</h1>
          <p className="text-dark/60 text-sm mt-1">
            Track your mentoring sessions and milestones.
          </p>
        </div>
        {sessions.length < MAX_SESSIONS && (
          <button
            onClick={openAddModal}
            className="bg-accent text-white px-5 py-2.5 rounded-lg font-medium hover:bg-accent/90 transition-colors text-sm"
          >
            + Add Session
          </button>
        )}
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="font-medium text-navy">
            Session {Math.min(sessions.length, MAX_SESSIONS)} of {MAX_SESSIONS}
          </span>
          <span className="text-dark/50">
            {sessions.length >= MAX_SESSIONS ? "Program complete!" : `${MAX_SESSIONS - sessions.length} remaining`}
          </span>
        </div>
        <div className="w-full h-2.5 bg-light-gray rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-500"
            style={{ width: `${(Math.min(sessions.length, MAX_SESSIONS) / MAX_SESSIONS) * 100}%` }}
          />
        </div>
      </div>

      {/* Session table */}
      {sortedSessions.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-gray-300 py-16 text-center mb-12">
          <p className="text-dark/40 text-lg mb-2">No sessions logged yet</p>
          <p className="text-dark/30 text-sm mb-6">
            Click "Add Session" to log your first mentoring session.
          </p>
          <button
            onClick={openAddModal}
            className="bg-accent text-white px-5 py-2.5 rounded-lg font-medium hover:bg-accent/90 transition-colors text-sm"
          >
            + Add Your First Session
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 mb-12">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-navy text-white text-left">
                <th className="px-4 py-3 font-medium w-12">#</th>
                <th className="px-4 py-3 font-medium w-28">Date</th>
                <th className="px-4 py-3 font-medium">Topics</th>
                <th className="px-4 py-3 font-medium">Action Items</th>
                <th className="px-4 py-3 font-medium w-16 text-center">Rating</th>
                <th className="px-4 py-3 font-medium w-24 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedSessions.map((s, i) => (
                <tr
                  key={s.id}
                  className={i % 2 === 0 ? "bg-white" : "bg-light-gray"}
                >
                  <td className="px-4 py-3 font-bold text-navy">{s.sessionNumber}</td>
                  <td className="px-4 py-3 text-dark/70 whitespace-nowrap">{s.date || "—"}</td>
                  <td className="px-4 py-3 text-dark/80 max-w-xs">
                    <p className="line-clamp-2">{s.topics || "—"}</p>
                  </td>
                  <td className="px-4 py-3 text-dark/80 max-w-xs">
                    <p className="line-clamp-2">{s.actionItems || "—"}</p>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {s.menteeRating ? (
                      <span className="inline-block bg-accent/15 text-accent font-bold px-2 py-0.5 rounded">
                        {s.menteeRating}/5
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <button
                      onClick={() => openEditModal(s)}
                      className="text-isc2-blue hover:text-navy transition-colors mr-3"
                      aria-label={`Edit session ${s.sessionNumber}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDeleteSession(s.id)}
                      className="text-red-400 hover:text-red-600 transition-colors"
                      aria-label={`Delete session ${s.sessionNumber}`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Milestone tracker */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-navy">
            Milestones
            <span className="text-sm font-normal text-dark/40 ml-2">
              ({milestones.length}/{MAX_MILESTONES})
            </span>
          </h2>
          {milestones.length < MAX_MILESTONES && (
            <button
              onClick={() => setShowMilestoneForm(true)}
              className="text-sm font-medium text-accent hover:text-accent/80 transition-colors"
            >
              + Add Milestone
            </button>
          )}
        </div>

        {/* Add milestone form */}
        {showMilestoneForm && (
          <form
            onSubmit={handleAddMilestone}
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
                  value={milestoneForm.date}
                  onChange={handleMilestoneChange}
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
                  value={milestoneForm.achievement}
                  onChange={handleMilestoneChange}
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
                  value={milestoneForm.nextStep}
                  onChange={handleMilestoneChange}
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
                  setShowMilestoneForm(false);
                  setMilestoneForm({ date: "", achievement: "", nextStep: "" });
                }}
                className="text-sm text-dark/50 hover:text-dark transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Milestones list */}
        {milestones.length === 0 && !showMilestoneForm ? (
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
                  onClick={() => confirmDeleteMilestone(m.id)}
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
      </section>

      {/* Export / Import toolbar */}
      <section className="border-t border-light-blue pt-8 mt-4">
        <h2 className="text-lg font-bold text-navy mb-4">Export & Import</h2>
        <div className="flex flex-wrap gap-3 mb-2">
          <button
            onClick={() => exportSessionsPDF(sessions, milestones, profile)}
            className="bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
          >
            Export as PDF
          </button>
          <button
            onClick={exportBlankSessionsPDF}
            className="bg-white border border-gray-300 text-dark px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Export Blank PDF
          </button>
          <button
            onClick={exportAllJSON}
            className="bg-isc2-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-isc2-blue/90 transition-colors"
          >
            Export as JSON
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-white border border-gray-300 text-dark px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Import JSON
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleFileSelect}
            className="hidden"
            aria-label="Import JSON file"
          />
        </div>
        <p className="text-xs text-dark/40">
          Download a blank copy before entering personal information.
        </p>
        {importError && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {importError}
            <button
              onClick={() => setImportError(null)}
              className="ml-3 text-red-500 underline text-xs"
            >
              Dismiss
            </button>
          </div>
        )}
      </section>

      {/* Import preview modal */}
      {importPreview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-bold text-navy mb-4">Import Preview</h3>
            <div className="space-y-2 text-sm mb-6">
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-dark/60">Exported at</span>
                <span className="font-medium">{new Date(importPreview.exportedAt).toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-dark/60">Exported by</span>
                <span className="font-medium capitalize">{importPreview.exportedBy}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-dark/60">Profile included</span>
                <span className="font-medium">{importPreview.hasProfile ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-dark/60">Goals included</span>
                <span className="font-medium">{importPreview.hasGoals ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-dark/60">Sessions</span>
                <span className="font-medium">{importPreview.sessionCount}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-dark/60">Milestones</span>
                <span className="font-medium">{importPreview.milestoneCount}</span>
              </div>
            </div>

            <p className="text-sm text-dark/60 mb-4">
              How would you like to import this data?
            </p>
            <div className="space-y-2 mb-4">
              <button
                onClick={() => handleApplyImport("merge")}
                className="w-full bg-accent text-white py-2.5 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
              >
                Merge with existing data
              </button>
              <button
                onClick={() => handleApplyImport("replace")}
                className="w-full bg-white border border-gray-300 text-dark py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Replace all data
              </button>
            </div>
            <button
              onClick={() => {
                setImportData(null);
                setImportPreview(null);
              }}
              className="w-full text-sm text-dark/50 hover:text-dark transition-colors py-1"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Session modal */}
      {modalOpen && (
        <SessionModal
          session={editingSession}
          nextNumber={nextSessionNumber}
          onSave={handleSaveSession}
          onClose={() => {
            setModalOpen(false);
            setEditingSession(null);
          }}
        />
      )}

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 text-center">
            <p className="text-navy font-medium mb-4">
              Delete this {deleteTarget.type}? This cannot be undone.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={
                  deleteTarget.type === "session"
                    ? handleDeleteSession
                    : handleDeleteMilestone
                }
                className="bg-red-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteTarget(null)}
                className="bg-white border border-gray-300 text-dark px-5 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
