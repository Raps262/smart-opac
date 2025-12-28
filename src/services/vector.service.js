// src/services/vector.service.js

import apiClient from "./api/axios.config";
import { ENDPOINTS } from "./api/endpoints";

class VectorService {
  /**
   * Komentar: vectorize satu teks, hentikan bila teks kosong
   */
  async vectorizeText(text) {
    if (!text || text.trim() === "") {
      console.warn("Empty text provided for vectorization");
      return [];
    }

    try {
      // Komentar: gunakan endpoint vectorize backend yang benar
      const response = await apiClient.post(ENDPOINTS.VECTOR_VECTORIZE, {
        texts: [text],
      });

      // Komentar: ambil vector pertama dari hasil backend
      return response.data?.vectors?.[0] || [];
    } catch (error) {
      console.error("Error vectorizing text:", error);
      return [];
    }
  }

  /**
   * Komentar: vectorize banyak teks sekaligus
   */
  async vectorizeTexts(texts = []) {
    if (!texts || texts.length === 0) {
      console.warn("Empty texts array provided for vectorization");
      return [];
    }

    try {
      // Komentar: gunakan endpoint vectorize backend yang benar
      const response = await apiClient.post(ENDPOINTS.VECTOR_VECTORIZE, {
        texts,
      });

      // Komentar: kembalikan semua vector hasil SBERT
      return response.data?.vectors || [];
    } catch (error) {
      console.error("Error vectorizing texts:", error);
      return [];
    }
  }

  /**
   * Komentar: hitung cosine similarity dua vector
   */
  calculateSimilarity(vector1, vector2) {
    if (!vector1 || !vector2 || vector1.length !== vector2.length) {
      console.warn("Invalid vectors for similarity calculation");
      return 0;
    }

    try {
      let dotProduct = 0;
      let norm1 = 0;
      let norm2 = 0;

      for (let i = 0; i < vector1.length; i++) {
        dotProduct += vector1[i] * vector2[i];
        norm1 += vector1[i] * vector1[i];
        norm2 += vector2[i] * vector2[i];
      }

      // Komentar: rumus cosine similarity
      return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
    } catch (error) {
      console.error("Error calculating similarity:", error);
      return 0;
    }
  }
}

// Komentar: export instance
export default new VectorService();
