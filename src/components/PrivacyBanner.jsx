import { useState } from "react";
import { getData, setData } from "../utils/localStorage";

export default function PrivacyBanner() {
  const [dismissed, setDismissed] = useState(
    () => getData("privacyDismissed") === true
  );

  if (dismissed) return null;

  function handleDismiss() {
    setData("privacyDismissed", true);
    setDismissed(true);
  }

  return (
    <div className="bg-navy text-white text-sm print:hidden">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <p className="flex-1">
          All data is stored locally on your device. Nothing is sent to any
          server. Export your data regularly as a backup.
        </p>
        <button
          onClick={handleDismiss}
          className="shrink-0 text-white/70 hover:text-white transition-colors px-2 py-1 rounded text-xs font-medium border border-white/20 hover:border-white/40"
          aria-label="Dismiss privacy notice"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
