import { useQuery } from "@tanstack/react-query";
import collectionService from "../../services/collection.service";

export const useSuggestions = (query, searchType = "all") => {
  const trimmed = (query || "").trim();

  return useQuery({
    queryKey: ["suggestions", trimmed, searchType],
    queryFn: () => collectionService.getSuggestions(trimmed, searchType),
    enabled: trimmed.length >= 1 && searchType !== "advanced",
    staleTime: 1000 * 60, // 1 menit
    gcTime: 1000 * 60 * 5, // 5 menit (React Query v5)
  });
};