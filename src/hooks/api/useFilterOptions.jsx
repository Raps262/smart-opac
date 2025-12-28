import { useQuery } from "@tanstack/react-query";
import collectionService from "../../services/collection.service";

export const useFilterOptions = () => {
  return useQuery({
    queryKey: ["filterOptions"],
    queryFn: () => collectionService.getFilterOptions(),
    staleTime: 1000 * 60 * 60, // 1 hour
    cacheTime: 1000 * 60 * 60 * 6, // 6 hours
  });
};
