import axiosInstance from "./api/axios.config";
import { ENDPOINTS } from "./api/endpoints";

class CollectionService {
  // mengambil koleksi populer
  async getPopular(limit = 5) {
    const res = await axiosInstance.get(ENDPOINTS.COLLECTIONS_POPULAR, {
      params: { limit },
    });
    return res.data;
  }

  // mengambil koleksi terbaru
  async getLatest(limit = 5) {
    const res = await axiosInstance.get(ENDPOINTS.COLLECTIONS_LATEST, {
      params: { limit },
    });
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
    // Debug untuk memastikan parameter terkirim dengan benar
    console.log("CollectionService.search params:", params);

    const res = await axiosInstance.get(ENDPOINTS.COLLECTIONS_SEARCH, {
      params,
    });

    return res.data;
  }

  // mengambil suggestion autocomplete
  async getSuggestions(query, type = "all") {
    const res = await axiosInstance.get(ENDPOINTS.COLLECTIONS_SUGGEST, {
      params: { q: query, search_type: type },
    });
    return res.data?.suggestions || [];
  }

  // mengambil data filter (subject, publisher, document, year)
  async getFilterOptions() {
    const res = await axiosInstance.get(ENDPOINTS.COLLECTIONS_FILTERS);
    return {
      subject_name: res.data.subject_name || [],
      publisher_name: res.data.publisher_name || [],
      document_name: res.data.document_name || [],
      publication_year: res.data.publication_year || [],
    };
  }

  // konversi teks menjadi vektor embedding (DIGANTI: GET → POST)
  async vectorize(texts = []) {
    // Jika tidak ada teks, tidak perlu request ke backend
    if (!Array.isArray(texts) || texts.length === 0) return [];

    /*
      Endpoint vectorize berada di:
      POST /api/vectorize

      Dipisahkan dari collections karena ini proses ML,
      bukan operasi CRUD koleksi.
    */
    const res = await axiosInstance.post(
      ENDPOINTS.VECTOR_VECTORIZE,
      { texts } // payload dikirim dalam body, bukan query param
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
    // Validasi query agar tidak request kosong
    if (!query?.trim()) return [];

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

export default new CollectionService();
