import { useQuery } from "@tanstack/react-query";
import collectionService from "../../services/collection.service";

export const usePopularCollections = (limit = 6) => {
  return useQuery({
    queryKey: ["popularCollections", limit],
    queryFn: () => collectionService.getPopular(limit),
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10,
  });
};
