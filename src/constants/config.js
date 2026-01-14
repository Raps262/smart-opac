const rawBase = import.meta.env.VITE_API_URL ?? "";
const API_PREFIX = (import.meta.env.VITE_API_PREFIX ?? "/api").replace(/\/$/, "");

export const API_CONFIG = {
  BASE_URL: rawBase.replace(/\/$/, ""),
  API_PREFIX,
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 2,
};

export const STORAGE_KEYS = {
  VECTOR_STORE: "vector-store",
  SEARCH_HISTORY: "search-history",
};

const prefixPath = (path) => `${API_CONFIG.API_PREFIX}${path}`;
const fullUrl = (path) => `${API_CONFIG.BASE_URL}${path}`;

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
  // Helpers to get absolute URLs when needed
  ABSOLUTE: {
    COLLECTIONS: {
      BASE: (id = "") => fullUrl(prefixPath(`/collections${id ? `/${id}` : ""}`)),
    },
  },
};
