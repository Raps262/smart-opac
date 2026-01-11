import { useCallback } from "react";
import { storage } from "../../utils/storage/localStorage";
import { STORAGE_KEYS } from "../../constants/config";

export const useVectorStore = () => {
  // Mengambil seluruh vector dari storage
  const getStore = useCallback(() => {
    return storage.get(STORAGE_KEYS.VECTOR_STORE, {});
  }, []);

  // Menyimpan vector berdasarkan query
  const saveVector = useCallback(
    (query, vector) => {
      // Komentar: validasi agar query tidak kosong dan vector harus berupa array angka
      if (!query || !Array.isArray(vector)) return false;

      try {
        const store = getStore();
        store[query] = vector;
        storage.set(STORAGE_KEYS.VECTOR_STORE, store);
        return true;
      } catch {
        return false;
      }
    },
    [getStore]
  );

  // Mengambil satu vector berdasarkan query
  const getVector = useCallback(
    (query) => {
      // Komentar: jika query kosong maka langsung gagal
      if (!query) return null;

      const store = getStore();
      return store[query] || null;
    },
    [getStore]
  );

  // Mengecek apakah vector untuk query sudah ada
  const hasVector = useCallback(
    (query) => {
      if (!query) return false;

      const store = getStore();
      return query in store;
    },
    [getStore]
  );

  // Menghapus vector berdasarkan query
  const removeVector = useCallback(
    (query) => {
      if (!query) return false;

      try {
        const store = getStore();
        delete store[query];
        storage.set(STORAGE_KEYS.VECTOR_STORE, store);
        return true;
      } catch {
        return false;
      }
    },
    [getStore]
  );

  // Menghapus seluruh vector
  const clearStore = useCallback(() => {
    try {
      storage.remove(STORAGE_KEYS.VECTOR_STORE);
      return true;
    } catch {
      return false;
    }
  }, []);

  return {
    getStore,
    saveVector,
    getVector,
    hasVector,
    removeVector,
    clearStore,
  };
};
