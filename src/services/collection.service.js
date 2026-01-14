import axiosInstance from "./api/axios.config";
import { ENDPOINTS } from "./api/endpoints";

class CollectionService {
  // mengambil koleksi populer
  async getPopular(limit = 5) {
    console.log("=== DEBUG: Memanggil getPopular (limit:", limit, ") ===");
    console.log("URL yang dipanggil:", ENDPOINTS.COLLECTIONS_POPULAR);

    try {
      const res = await axiosInstance.get(ENDPOINTS.COLLECTIONS_POPULAR, {
        params: { limit },
      });
      console.log("Data popular berhasil diambil:", res.data);
      return res.data || [];
    } catch (error) {
      console.error("Error saat getPopular:", error.message);
      if (error.response) {
        console.error("Response error dari server:", error.response.data);
      }
      return []; // fallback agar UI tidak crash
    }
  }

  // mengambil koleksi terbaru
  async getLatest(limit = 5) {
    console.log("=== DEBUG: Memanggil getLatest (limit:", limit, ") ===");
    console.log("URL yang dipanggil:", ENDPOINTS.COLLECTIONS_LATEST);

    try {
      const res = await axiosInstance.get(ENDPOINTS.COLLECTIONS_LATEST, {
        params: { limit },
      });
      console.log("Data latest berhasil diambil:", res.data);
      return res.data || [];
    } catch (error) {
      console.error("Error saat getLatest:", error.message);
      if (error.response) {
        console.error("Response error dari server:", error.response.data);
      }
      return [];
    }
  }

  // mengambil detail berdasarkan ID
  async getDetail(id) {
    const url = ENDPOINTS.COLLECTIONS_DETAILS(id);
    console.log("=== DEBUG: Memanggil getDetail (ID:", id, ") ===");
    console.log("URL yang dipanggil:", url);

    try {
      const res = await axiosInstance.get(url);
      console.log("Detail koleksi berhasil:", res.data);
      return res.data;
    } catch (error) {
      console.error("Error getDetail:", error.message);
      return null; // fallback
    }
  }

  // Pencarian koleksi dengan debug log
  async search(params = {}) {
    console.log("=== DEBUG: Memanggil search dengan params:", params);
    console.log("URL yang dipanggil:", ENDPOINTS.COLLECTIONS_SEARCH);

    try {
      const res = await axiosInstance.get(ENDPOINTS.COLLECTIONS_SEARCH, {
        params, // Kirim params langsung
      });
      console.log("Hasil pencarian berhasil:", res.data);
      return res.data;
    } catch (error) {
      console.error("Error search:", error.message);
      if (error.response) {
        console.error("Detail error dari server:", error.response.data);
      }
      return { results: [], total: 0, page: 1, limit: 10 }; // fallback struktur SearchResponse
    }
  }

  // mengambil suggestion autocomplete
  async getSuggestions(query, type = "all") {
    console.log("=== DEBUG: Memanggil getSuggestions (query:", query, ", type:", type, ") ===");
    console.log("URL yang dipanggil:", ENDPOINTS.COLLECTIONS_SUGGEST);

    try {
      const res = await axiosInstance.get(ENDPOINTS.COLLECTIONS_SUGGEST, {
        params: { q: query, search_type: type },
      });
      console.log("Suggestions berhasil:", res.data?.suggestions);
      return res.data?.suggestions || [];
    } catch (error) {
      console.error("Error getSuggestions:", error.message);
      return [];
    }
  }

  // mengambil data filter (untuk dropdown)
  async getFilterOptions() {
    console.log("=== DEBUG: Memanggil getFilterOptions ===");
    console.log("URL yang dipanggil:", ENDPOINTS.COLLECTIONS_FILTERS);

    try {
      const res = await axiosInstance.get(ENDPOINTS.COLLECTIONS_FILTERS);
      console.log("Data filter berhasil:", res.data);
      return {
        subject_name: res.data.subject_name || [],
        publisher_name: res.data.publisher_name || [],
        document_name: res.data.document_name || [],
        publication_year: res.data.publication_year || [],
      };
    } catch (error) {
      console.error("Error getFilterOptions:", error.message);
      return {
        subject_name: [],
        publisher_name: [],
        document_name: [],
        publication_year: [],
      };
    }
  }

  // konversi text menjadi vector menggunakan model backend
  async vectorize(texts = []) {
    if (!texts.length) {
      console.log("Vectorize: texts kosong, return []");
      return [];
    }

    console.log("=== DEBUG: Memanggil vectorize (jumlah texts:", texts.length, ") ===");
    console.log("URL yang dipanggil:", ENDPOINTS.COLLECTIONS_VECTORIZE);

    try {
      const res = await axiosInstance.post(ENDPOINTS.COLLECTIONS_VECTORIZE, { texts }); // Ganti ke POST sesuai backend
      console.log("Vectorize berhasil:", res.data?.vectors?.length, "vectors");
      return res.data?.vectors || [];
    } catch (error) {
      console.error("Error vectorize:", error.message);
      return [];
    }
  }

  // mengambil rekomendasi menggunakan semantic search
  async getRecommendations({
    query,
    top_k = 10,
    category = null,
    year = null,
  }) {
    if (!query?.trim()) {
      console.log("Recommendations: query kosong, return []");
      return [];
    }

    console.log("=== DEBUG: Memanggil getRecommendations (query:", query, ", top_k:", top_k, ") ===");
    console.log("URL yang dipanggil:", ENDPOINTS.COLLECTIONS_RECOMMEND);

    try {
      const params = {
        query,
        top_k,
        ...(category && { subject_name: category }), // sesuaikan dengan param backend
        ...(year && { publication_year: year }),
      };
      const res = await axiosInstance.get(ENDPOINTS.COLLECTIONS_RECOMMEND, { params });
      console.log("Rekomendasi berhasil:", res.data?.length, "items");
      return res.data || [];
    } catch (error) {
      console.error("Error getRecommendations:", error.message);
      return [];
    }
  }
}

export default new CollectionService();