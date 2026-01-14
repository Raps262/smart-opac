const rawBase = import.meta.env.VITE_API_BASE_URL ?? "";
const API_PREFIX = (import.meta.env.VITE_API_PREFIX ?? "/api").replace(/\/$/, "");

export const API_CONFIG = {
  BASE_URL: rawBase.replace(/\/$/, ""),
  API_PREFIX,
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 2,
};

const prefixPath = (path) => `${API_CONFIG.API_PREFIX}${path}`;

export const API_ENDPOINTS = {
  COLLECTIONS: {
    POPULAR: prefixPath(`/collections/popular`),
    LATEST: prefixPath(`/collections/latest`),
    DETAILS: (id) => prefixPath(`/collections/details/${id}`),
    SEARCH: prefixPath(`/collections/search`),
    SUGGEST: prefixPath(`/collections/suggest`),
    FILTERS: prefixPath(`/collections/filters`),
    RECOMMEND: prefixPath(`/collections/recommend`),
    VECTORIZE: prefixPath(`/collections/vectorize`),
  },
};
