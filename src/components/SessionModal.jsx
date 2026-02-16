import { useState, useEffect, useRef } from "react";

export default function SessionModal({ session, nextNumber, onSave, onClose }) {
  const isEdit = !!session;
  const [form, setForm] = useState({
    date: "",
    topics: "",
    actionItems: "",
    menteeRating: "",
    notes: "",
  });

  const backdropRef = useRef(null);

  useEffect(() => {
    if (session) {
      setForm({
        date: session.date || "",
        topics: session.topics || "",
        actionItems: session.actionItems || "",
        menteeRating: session.menteeRating ?? "",
        notes: session.notes || "",
      });
    }
  }, [session]);

  // Close on Escape
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave({
      ...form,
      menteeRating: form.menteeRating ? Number(form.menteeRating) : null,
    });
  }

  function handleBackdropClick(e) {
    if (e.target === backdropRef.current) onClose();
  }

  const sessionNumber = isEdit ? session.sessionNumber : nextNumber;

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={isEdit ? "Edit session" : "Add new session"}
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-navy">
            {isEdit ? "Edit" : "Add"} Session #{sessionNumber}
          </h2>
          <button
            onClick={onClose}
            className="text-dark/40 hover:text-dark transition-colors"
            aria-label="Close modal"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
          {/* Date */}
          <div>
            <label htmlFor="session-date" className="block text-sm font-medium text-navy mb-1">
              Date
            </label>
            <input
              id="session-date"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isc2-blue"
            />
          </div>

          {/* Topics Discussed */}
          <div>
            <label htmlFor="session-topics" className="block text-sm font-medium text-navy mb-1">
              Topics Discussed
            </label>
            <textarea
              id="session-topics"
              name="topics"
              value={form.topics}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isc2-blue resize-y"
            />
          </div>

          {/* Action Items */}
          <div>
            <label htmlFor="session-actions" className="block text-sm font-medium text-navy mb-1">
              Action Items
            </label>
            <textarea
              id="session-actions"
              name="actionItems"
              value={form.actionItems}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isc2-blue resize-y"
            />
          </div>

          {/* Mentee Self-Rating */}
          <div>
            <label className="block text-sm font-medium text-navy mb-2">
              Mentee Self-Rating
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, menteeRating: String(n) }))}
                  className={`w-10 h-10 rounded-lg text-sm font-bold transition-colors ${
                    Number(form.menteeRating) === n
                      ? "bg-accent text-white"
                      : "bg-light-gray text-dark/60 hover:bg-accent/20"
                  }`}
                  aria-label={`Rate ${n} out of 5`}
                >
                  {n}
                </button>
              ))}
            </div>
            <p className="text-xs text-dark/40 mt-1">1 = needs improvement, 5 = excellent</p>
          </div>

          {/* Notes / Reflections */}
          <div>
            <label htmlFor="session-notes" className="block text-sm font-medium text-navy mb-1">
              Notes / Reflections
            </label>
            <textarea
              id="session-notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-isc2-blue resize-y"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="bg-accent text-white px-6 py-2.5 rounded-lg font-medium hover:bg-accent/90 transition-colors"
            >
              {isEdit ? "Update Session" : "Add Session"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-sm text-dark/50 hover:text-dark transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
