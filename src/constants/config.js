const BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "";
const API_PREFIX = (import.meta.env.VITE_API_PREFIX || "/api").replace(/\/$/, "");

export const API_CONFIG = {
  BASE_URL,
  API_PREFIX,
};

export const API_ENDPOINTS = {
  COLLECTIONS: {
    POPULAR: `${API_PREFIX}/collections/popular`,
    LATEST: `${API_PREFIX}/collections/latest`,
    DETAILS: (id) => `${API_PREFIX}/collections/details/${id}`,
    SEARCH: `${API_PREFIX}/collections/search`,
    FILTERS: `${API_PREFIX}/collections/filters`,
    SUGGEST: `${API_PREFIX}/collections/suggest`,
    RECOMMEND: `${API_PREFIX}/collections/recommend`,
  },
};
