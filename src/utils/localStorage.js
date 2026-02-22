/** Namespaced localStorage keys to avoid collisions with other apps. */
const KEYS = {
  profile: "cmtk_profile",
  goals: "cmtk_goals",
  sessions: "cmtk_sessions",
  milestones: "cmtk_milestones",
  privacyDismissed: "cmtk_privacy_dismissed",
};

/**
 * Read and parse a value from localStorage.
 * @param {string} key - Logical key name (e.g., "profile", "sessions").
 * @returns {any|null} Parsed value, or null if missing/corrupt.
 */
export function getData(key) {
  try {
    const raw = localStorage.getItem(KEYS[key] || key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Serialize and write a value to localStorage.
 * @param {string} key - Logical key name.
 * @param {any} value - Value to store (will be JSON-serialized).
 * @returns {boolean} True if successful.
 */
export function setData(key, value) {
  try {
    localStorage.setItem(KEYS[key] || key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/**
 * Remove a single key from localStorage.
 * @param {string} key - Logical key name.
 * @returns {boolean} True if successful.
 */
export function removeData(key) {
  try {
    localStorage.removeItem(KEYS[key] || key);
    return true;
  } catch {
    return false;
  }
}

/** Remove all app data from localStorage. */
export function clearAll() {
  Object.values(KEYS).forEach((k) => {
    try {
      localStorage.removeItem(k);
    } catch {
      // ignore
    }
  });
}

export { KEYS };
