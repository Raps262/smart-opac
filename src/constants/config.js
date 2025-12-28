export const API_CONFIG = {
  BASE_URL: (import.meta.env.VITE_API_URL || "http://127.0.0.1:8000").replace(
    /\/$/,
    ""
  ),
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 2,
};

// src/constants/config.js

export const STORAGE_KEYS = {
  VECTOR_STORE: "vector-store",
  SEARCH_HISTORY: "search-history",
};

export const API_ENDPOINTS = {
  COLLECTIONS: {
    BASE: "/api/collections",
    POPULAR: "/api/collections/popular",
    LATEST: "/api/collections/latest",
    DETAILS: (id) => `/api/collections/details/${id}`,
    SEARCH: "/api/collections/search",
    SUGGEST: "/api/collections/suggest",
    FILTERS: "/api/collections/filters",
    VECTORIZE: "/api/collections/vectorize",
    RECOMMEND: "/api/collections/recommend",
  },
  VECTOR: {
    VECTORIZE: "/vectorize",
  },
};
