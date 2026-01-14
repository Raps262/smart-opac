import axiosInstance from "./api/axios.config";
import { ENDPOINTS } from "./api/endpoints";

class CollectionService {
  // mengambil koleksi populer
  async getPopular(limit = 5) {
    const res = await axiosInstance.get(
      ENDPOINTS.COLLECTIONS_POPULAR,
      { params: { limit } }
    );
    return res.data;
  }

  // mengambil koleksi terbaru
  async getLatest(limit = 5) {
    const res = await axiosInstance.get(
      ENDPOINTS.COLLECTIONS_LATEST,
      { params: { limit } }
    );
    return res.data;
  }

  // mengambil detail koleksi berdasarkan ID
  async getDetail(id) {
    const url = ENDPOINTS.COLLECTIONS_DETAILS(id);
    const res = await axiosInstance.get(url);
    return res.data;
  }

  // melakukan pencarian koleksi
  async search(params = {}) {
    // komentar: pastikan params dikirim apa adanya
    console.log("CollectionService.search params:", params);

    const res = await axiosInstance.get(
      ENDPOINTS.COLLECTIONS_SEARCH,
      { params }
    );

    return res.data;
  }

  // mengambil suggestion autocomplete
  async getSuggestions(query, type = "all") {
    const res = await axiosInstance.get(
      ENDPOINTS.COLLECTIONS_SUGGEST,
      {
        params: { q: query, search_type: type },
      }
    );

    return res.data?.suggestions || [];
  }

  // mengambil data filter
  async getFilterOptions() {
    const res = await axiosInstance.get(
      ENDPOINTS.COLLECTIONS_FILTERS
    );

    return {
      subject_name: res.data.subject_name || [],
      publisher_name: res.data.publisher_name || [],
      document_name: res.data.document_name || [],
      publication_year: res.data.publication_year || [],
    };
  }

  // konversi teks menjadi vector embedding
  async vectorize(texts = []) {
    // komentar: jika endpoint vectorize tidak tersedia, jangan crash
    if (!ENDPOINTS.VECTOR_VECTORIZE) {
      console.warn("VECTOR_VECTORIZE endpoint tidak tersedia");
      return [];
    }

    // komentar: validasi input
    if (!Array.isArray(texts) || texts.length === 0) {
      return [];
    }

    const res = await axiosInstance.post(
      ENDPOINTS.VECTOR_VECTORIZE,
      { texts }
    );

    return res.data?.vectors || [];
  }

  // mengambil rekomendasi berbasis semantic search
  async getRecommendations({
    query,
    top_k = 10,
    category = null,
    year = null,
  }) {
    // komentar: cegah request kosong
    if (!query || !query.trim()) {
      return [];
    }

    const res = await axiosInstance.get(
      ENDPOINTS.COLLECTIONS_RECOMMEND,
      {
        params: {
          query,
          top_k,
          ...(category && { category }),
          ...(year && { year }),
        },
      }
    );

    return res.data || [];
  }
}

// komentar: export singleton
export default new CollectionService();
