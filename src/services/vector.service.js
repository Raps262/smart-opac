import apiClient from "./api/axios.config";
import { ENDPOINTS } from "./api/endpoints";

class VectorService {
  // vectorize satu teks
  async vectorizeText(text) {
    // komentar: validasi input
    if (!text || text.trim() === "") {
      return [];
    }

    // komentar: jika endpoint vectorize belum tersedia
    if (!ENDPOINTS.VECTOR_VECTORIZE) {
      console.warn("VECTOR_VECTORIZE endpoint tidak tersedia");
      return [];
    }

    try {
      const response = await apiClient.post(
        ENDPOINTS.VECTOR_VECTORIZE,
        { texts: [text] }
      );

      // komentar: ambil vector pertama
      return response.data?.vectors?.[0] || [];
    } catch (error) {
      console.error("Error vectorizing text:", error);
      return [];
    }
  }

  // vectorize banyak teks
  async vectorizeTexts(texts = []) {
    // komentar: validasi input
    if (!Array.isArray(texts) || texts.length === 0) {
      return [];
    }

    // komentar: jika endpoint vectorize belum tersedia
    if (!ENDPOINTS.VECTOR_VECTORIZE) {
      console.warn("VECTOR_VECTORIZE endpoint tidak tersedia");
      return [];
    }

    try {
      const response = await apiClient.post(
        ENDPOINTS.VECTOR_VECTORIZE,
        { texts }
      );

      return response.data?.vectors || [];
    } catch (error) {
      console.error("Error vectorizing texts:", error);
      return [];
    }
  }

  // menghitung cosine similarity
  calculateSimilarity(vector1, vector2) {
    // komentar: validasi vector
    if (
      !Array.isArray(vector1) ||
      !Array.isArray(vector2) ||
      vector1.length !== vector2.length
    ) {
      return 0;
    }

    let dotProduct = 0;
    let norm1 = 0;
    let norm2 = 0;

    for (let i = 0; i < vector1.length; i++) {
      dotProduct += vector1[i] * vector2[i];
      norm1 += vector1[i] * vector1[i];
      norm2 += vector2[i] * vector2[i];
    }

    // komentar: rumus cosine similarity
    return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
  }
}

// komentar: export singleton
export default new VectorService();
