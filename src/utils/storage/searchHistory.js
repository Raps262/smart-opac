import { storage } from "./localStorage";

const STORAGE_KEY = "opac_search_history";
const MAX_HISTORY = 20;

export const searchHistoryManager = {
  getHistory() {
    return storage.get(STORAGE_KEY, []);
  },

  addToHistory(query) {
    if (!query || typeof query !== "string") return;

    const trimmed = query.trim();
    if (!trimmed) return;

    const history = this.getHistory();
    const updated = [
      trimmed,
      ...history.filter((item) => item !== trimmed),
    ].slice(0, MAX_HISTORY);

    storage.set(STORAGE_KEY, updated);
    window.dispatchEvent(new Event("storage-update"));
  },

  removeFromHistory(query) {
    if (!query) return;

    const history = this.getHistory();
    const updated = history.filter((item) => item !== query);

    storage.set(STORAGE_KEY, updated);
    window.dispatchEvent(new Event("storage-update"));
  },

  clearHistory() {
    storage.remove(STORAGE_KEY);
    window.dispatchEvent(new Event("storage-update"));
  },
};
