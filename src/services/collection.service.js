// Komentar: file service untuk semua request koleksi.
// Catatan: axios config dan endpoints tidak disatukan ke file ini.

import axiosInstance from "./api/axios.config";
import { ENDPOINTS } from "./api/endpoints";

class CollectionService {
  // Komentar: mengambil koleksi populer
  async getPopular(limit = 5) {
    const res = await axiosInstance.get(ENDPOINTS.COLLECTIONS_POPULAR, {
      params: { limit },
    });
    return res.data;
  }

  // Komentar: mengambil koleksi terbaru
  async getLatest(limit = 5) {
    const res = await axiosInstance.get(ENDPOINTS.COLLECTIONS_LATEST, {
      params: { limit },
    });
    return res.data;
  }

  // Komentar: mengambil detail berdasarkan ID
  async getDetail(id) {
    const url = ENDPOINTS.COLLECTIONS_DETAILS(id);
    const res = await axiosInstance.get(url);
    return res.data;
  }

  // Komentar: pencarian koleksi
  async search(params = {}) {
    const res = await axiosInstance.get(ENDPOINTS.COLLECTIONS_SEARCH, {
      params,
    });
    return res.data;
  }

  // Komentar: mengambil suggestion autocomplete
  async getSuggestions(query, type = "all") {
    const res = await axiosInstance.get(ENDPOINTS.COLLECTIONS_SUGGEST, {
      params: { q: query, search_type: type },
    });
    return res.data?.suggestions || [];
  }

  // Komentar: mengambil data filter
  async getFilterOptions() {
    const res = await axiosInstance.get(ENDPOINTS.COLLECTIONS_FILTERS);
    return {
      subject_name: res.data.subject_name || [],
      publisher_name: res.data.publisher_name || [],
      document_name: res.data.document_name || [],
      publication_year: res.data.publication_year || [],
    };
  }

  // Komentar: konversi text menjadi vector menggunakan model backend
  async vectorize(texts = []) {
    if (!texts.length) return [];
    const res = await axiosInstance.get(ENDPOINTS.COLLECTIONS_VECTORIZE, {
      params: { texts: JSON.stringify(texts) },
    });
    return res.data?.vectors || [];
  }

  // Komentar: mengambil rekomendasi menggunakan semantic search
  async getRecommendations({
    query,
    top_k = 10,
    category = null,
    year = null,
  }) {
    if (!query?.trim()) return [];

    const res = await axiosInstance.get(ENDPOINTS.COLLECTIONS_RECOMMEND, {
      params: {
        query,
        top_k,
        ...(category && { category }),
        ...(year && { year }),
      },
    });

    return res.data || [];
  }
}

export default new CollectionService();
