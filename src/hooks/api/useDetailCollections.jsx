import { useQuery } from "@tanstack/react-query";
import collectionService from "../../services/collection.service";

export const useDetailCollections = (id) => {
  return useQuery({
    queryKey: ["detailCollection", id],
    queryFn: () => collectionService.getDetail(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10, // 10 minutes
    cacheTime: 1000 * 60 * 30,
  });
};
