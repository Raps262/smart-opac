import { useQuery } from "@tanstack/react-query";
import collectionService from "../../services/collection.service";

export const useLatestCollections = (limit = 6) => {
  return useQuery({
    queryKey: ["latestCollections", limit],
    queryFn: () => collectionService.getLatest(limit),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });
};
