export default function DeleteConfirm({ type, onConfirm, onCancel }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 text-center">
        <p className="text-navy font-medium mb-4">
          Delete this {type}? This cannot be undone.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="bg-white border border-gray-300 text-dark px-5 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
