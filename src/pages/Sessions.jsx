import { useState, useRef } from "react";
import { getData, setData } from "../utils/localStorage";
import RequireProfile from "../components/RequireProfile";
import SessionModal from "../components/SessionModal";
import DeleteConfirm from "../components/DeleteConfirm";
import MilestoneSection from "../components/MilestoneSection";
import ImportPreview from "../components/ImportPreview";
import { exportSessionsPDF, exportBlankSessionsPDF } from "../utils/exportPDF";
import { exportAllJSON, readJSONFile, validateImport, applyImport } from "../utils/exportJSON";
import { config } from "../data/config";

const MAX_SESSIONS = config.maxSessions;
const MAX_MILESTONES = config.maxMilestones;

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export default function Sessions() {
  const profile = getData("profile");
  const [sessions, setSessions] = useState(() => getData("sessions") || []);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSession, setEditingSession] = useState(null);

  // Delete confirmation
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Import state
  const [importData, setImportData] = useState(null);
  const [importPreview, setImportPreview] = useState(null);
  const [importError, setImportError] = useState(null);
  const fileInputRef = useRef(null);

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

  function handleDeleteSession() {
    const updated = sessions.filter((s) => s.id !== deleteTarget.id);
    setSessions(updated);
    setData("sessions", updated);
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
    <RequireProfile
      title="Session Log & Progress Tracker"
      message="Please set up your profile first to start logging sessions."
    >
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
                      onClick={() => setDeleteTarget({ type: "session", id: s.id })}
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
      <MilestoneSection maxMilestones={MAX_MILESTONES} />

      {/* Export / Import toolbar */}
      <section className="border-t border-light-blue pt-8 mt-4">
        <h2 className="text-lg font-bold text-navy mb-4">Export & Import</h2>
        <div className="flex flex-wrap gap-3 mb-2">
          <button
            onClick={() => exportSessionsPDF(sessions, getData("milestones") || [], profile)}
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
        <ImportPreview
          preview={importPreview}
          onApply={handleApplyImport}
          onCancel={() => {
            setImportData(null);
            setImportPreview(null);
          }}
        />
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
        <DeleteConfirm
          type="session"
          onConfirm={handleDeleteSession}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
    </RequireProfile>
  );
}
