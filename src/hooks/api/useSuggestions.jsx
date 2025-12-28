import { useQuery } from "@tanstack/react-query";
import collectionService from "../../services/collection.service";

export const useSuggestions = (query, searchType = "all") => {
  return useQuery({
    queryKey: ["suggestions", query, searchType],
    queryFn: () => collectionService.getSuggestions(query, searchType),
    enabled: !!query && query.trim().length > 0 && searchType !== "advanced",
    staleTime: 1000 * 60, // 1 minute
    cacheTime: 1000 * 60 * 5,
  });
};
