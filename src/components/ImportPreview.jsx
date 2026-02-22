export default function ImportPreview({ preview, onApply, onCancel }) {
  return (
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
            <span className="font-medium">{new Date(preview.exportedAt).toLocaleString()}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-gray-100">
            <span className="text-dark/60">Exported by</span>
            <span className="font-medium capitalize">{preview.exportedBy}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-gray-100">
            <span className="text-dark/60">Profile included</span>
            <span className="font-medium">{preview.hasProfile ? "Yes" : "No"}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-gray-100">
            <span className="text-dark/60">Goals included</span>
            <span className="font-medium">{preview.hasGoals ? "Yes" : "No"}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-gray-100">
            <span className="text-dark/60">Sessions</span>
            <span className="font-medium">{preview.sessionCount}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-dark/60">Milestones</span>
            <span className="font-medium">{preview.milestoneCount}</span>
          </div>
        </div>

        <p className="text-sm text-dark/60 mb-4">
          How would you like to import this data?
        </p>
        <div className="space-y-2 mb-4">
          <button
            onClick={() => onApply("merge")}
            className="w-full bg-accent text-white py-2.5 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
          >
            Merge with existing data
          </button>
          <button
            onClick={() => onApply("replace")}
            className="w-full bg-white border border-gray-300 text-dark py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Replace all data
          </button>
        </div>
        <button
          onClick={onCancel}
          className="w-full text-sm text-dark/50 hover:text-dark transition-colors py-1"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
