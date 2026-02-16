const KEYS = {
  profile: "cmtk_profile",
  goals: "cmtk_goals",
  sessions: "cmtk_sessions",
  milestones: "cmtk_milestones",
  privacyDismissed: "cmtk_privacy_dismissed",
};

export function getData(key) {
  try {
    const raw = localStorage.getItem(KEYS[key] || key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setData(key, value) {
  try {
    localStorage.setItem(KEYS[key] || key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function removeData(key) {
  try {
    localStorage.removeItem(KEYS[key] || key);
    return true;
  } catch {
    return false;
  }
}

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
