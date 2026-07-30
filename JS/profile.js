

/* ============================================================
   STORAGE HELPERS
   ============================================================ */
function readJSON(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    console.warn(`Corrupted "${key}" in localStorage:`, err);
    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.error(`Could not write "${key}":`, err);
    return false;
  }
}
