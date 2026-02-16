import { getData, setData, clearAll } from "./localStorage";

export function exportAllJSON() {
  const profile = getData("profile");
  const goals = getData("goals");
  const sessions = getData("sessions");
  const milestones = getData("milestones");

  const payload = {
    version: "1.0",
    exportedAt: new Date().toISOString(),
    exportedBy: profile?.role || "unknown",
    profile: profile || null,
    goals: goals || null,
    sessions: sessions || [],
    milestones: milestones || [],
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `mentoring-toolkit-export-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function readJSONFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        resolve(data);
      } catch {
        reject(new Error("Invalid JSON file. Please check the file and try again."));
      }
    };
    reader.onerror = () => reject(new Error("Could not read file."));
    reader.readAsText(file);
  });
}

export function validateImport(data) {
  const errors = [];

  if (!data || typeof data !== "object") {
    return { valid: false, errors: ["File does not contain valid JSON data."] };
  }

  if (!data.version) {
    errors.push("Missing version field.");
  }

  if (data.sessions && !Array.isArray(data.sessions)) {
    errors.push("Sessions data is not in the expected format.");
  }

  if (data.milestones && !Array.isArray(data.milestones)) {
    errors.push("Milestones data is not in the expected format.");
  }

  if (data.profile && typeof data.profile !== "object") {
    errors.push("Profile data is not in the expected format.");
  }

  if (data.goals && typeof data.goals !== "object") {
    errors.push("Goals data is not in the expected format.");
  }

  return {
    valid: errors.length === 0,
    errors,
    preview: {
      exportedAt: data.exportedAt || "Unknown",
      exportedBy: data.exportedBy || "Unknown",
      hasProfile: !!data.profile,
      hasGoals: !!data.goals && Object.values(data.goals).some((v) => v && v !== ""),
      sessionCount: Array.isArray(data.sessions) ? data.sessions.length : 0,
      milestoneCount: Array.isArray(data.milestones) ? data.milestones.length : 0,
    },
  };
}

export function applyImport(data, mode = "merge") {
  if (mode === "replace") {
    // Clear all existing data first, then write imported values
    clearAll();
    if (data.profile) setData("profile", data.profile);
    if (data.goals) setData("goals", data.goals);
    setData("sessions", data.sessions || []);
    setData("milestones", data.milestones || []);
    return;
  }

  // Merge mode
  if (data.profile) {
    const existing = getData("profile");
    if (!existing) {
      setData("profile", data.profile);
    }
  }

  if (data.goals) {
    const existing = getData("goals");
    if (!existing) {
      setData("goals", data.goals);
    }
  }

  // Merge sessions by id — imported sessions with new IDs are added
  if (data.sessions && data.sessions.length > 0) {
    const existing = getData("sessions") || [];
    const existingIds = new Set(existing.map((s) => s.id));
    const newSessions = data.sessions.filter((s) => !existingIds.has(s.id));
    setData("sessions", [...existing, ...newSessions]);
  }

  // Merge milestones by id
  if (data.milestones && data.milestones.length > 0) {
    const existing = getData("milestones") || [];
    const existingIds = new Set(existing.map((m) => m.id));
    const newMilestones = data.milestones.filter((m) => !existingIds.has(m.id));
    setData("milestones", [...existing, ...newMilestones]);
  }
}
