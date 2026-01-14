const rawBase = import.meta.env.VITE_API_BASE_URL || "https://api.smart-opac-v1.my.id"; // fallback biar pasti
const API_PREFIX = (import.meta.env.VITE_API_PREFIX ?? "/api").replace(/\/$/, "");

export const API_CONFIG = {
  BASE_URL: rawBase.replace(/\/$/, ""),
  API_PREFIX,
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 2,
};

console.log("=== DEBUG API CONFIG ===");
console.log("VITE_API_BASE_URL dari env:", import.meta.env.VITE_API_BASE_URL);
console.log("BASE_URL final yang dipakai:", API_CONFIG.BASE_URL);
console.log("Full prefix path:", API_PREFIX);

export const STORAGE_KEYS = {
  VECTOR_STORE: "vector-store",
  SEARCH_HISTORY: "search-history",
};

const prefixPath = (path) => `${API_CONFIG.API_PREFIX}${path}`;

export const API_ENDPOINTS = {
  COLLECTIONS: {
    BASE: prefixPath(`/collections`),
    POPULAR: prefixPath(`/collections/popular`),
    LATEST: prefixPath(`/collections/latest`),
    DETAILS: (id) => prefixPath(`/collections/details/${id}`),
    SEARCH: prefixPath(`/collections/search`),
    SUGGEST: prefixPath(`/collections/suggest`),
    FILTERS: prefixPath(`/collections/filters`),
    VECTORIZE: prefixPath(`/collections/vectorize`),
    RECOMMEND: prefixPath(`/collections/recommend`),
  },
  VECTOR: {
    VECTORIZE: prefixPath(`/vectorize`),
  },
};