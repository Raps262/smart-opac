import { useQuery } from "@tanstack/react-query";
import collectionService from "../../services/collection.service";

/**
 * Hook untuk mengambil rekomendasi berbasis query
 * @param {string} query - Kata kunci pencarian
 * @param {number} topK - Jumlah maksimal rekomendasi
 * @param {object} options - Additional options (category, year)
 */
export const useRecommendations = (query, topK = 10, options = {}) => {
  const { category = null, year = null } = options;

  return useQuery({
    queryKey: ["recommendations", query, topK, category, year],
    queryFn: () =>
      collectionService.getRecommendations({
        query,
        top_k: topK,
        category,
        year,
      }),
    enabled: !!query && query.trim().length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10,
  });
};
