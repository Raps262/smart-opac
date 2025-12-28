import { useState, useEffect, useCallback } from "react";
import { searchHistoryManager } from "../../utils/storage/searchHistory";

export const useSearchHistory = () => {
  const [history, setHistory] = useState([]);

  const loadHistory = useCallback(() => {
    setHistory(searchHistoryManager.getHistory());
  }, []);

  useEffect(() => {
    loadHistory();

    const handleUpdate = () => loadHistory();
    window.addEventListener("storage-update", handleUpdate);

    return () => window.removeEventListener("storage-update", handleUpdate);
  }, [loadHistory]);

  const addHistory = useCallback((query) => {
    searchHistoryManager.addToHistory(query);
  }, []);

  const removeHistory = useCallback((query) => {
    searchHistoryManager.removeFromHistory(query);
  }, []);

  const clearHistory = useCallback(() => {
    searchHistoryManager.clearHistory();
  }, []);

  return {
    history,
    addHistory,
    removeHistory,
    clearHistory,
  };
};
