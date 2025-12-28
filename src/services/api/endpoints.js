export const ENDPOINTS = {
  // Collections
  COLLECTIONS_POPULAR: "/api/v1/collections/popular",       // Ambil koleksi populer
  COLLECTIONS_LATEST: "/api/v1/collections/latest",       // Ambil koleksi terbaru
  COLLECTIONS_DETAILS: (id) => `/api/v1/collections/details/${id}`, // DETAIL KOLEKSI (sesuai backend)
  COLLECTIONS_SEARCH: "/api/v1/collections/search",       // Pencarian koleksi
  COLLECTIONS_SUGGEST: "/api/v1/collections/suggest",     // Suggestion/autocomplete
  COLLECTIONS_FILTERS: "/api/v1/collections/filters",     // Filter opsi untuk koleksi
  COLLECTIONS_VECTORIZE: "/api/v1/collections/vectorize", // Endpoint untuk vectorize koleksi
  COLLECTIONS_RECOMMEND: "/api/v1/collections/recommend", // Rekomendasi berdasarkan koleksi (sesuai backend)

  // Vector
  VECTOR_VECTORIZE: "/api/v1/vectorize",                  // Vectorize umum (misal query text)
};
