const STORAGE_KEY = "btc-junioren-v2";

export const loadProgress = () => {
  try {
    const d = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return d || { completed: [], badges: [], name: "" };
  } catch {
    return { completed: [], badges: [], name: "" };
  }
};

export const saveProgress = (data) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
};
