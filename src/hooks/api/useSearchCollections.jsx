// Komentar: hook ini memastikan pemanggilan API hanya terjadi jika q terisi.

import { useQuery } from "@tanstack/react-query";
import collectionService from "../../services/collection.service";

export const useSearchCollections = (params = {}) => {
  // Komentar: q harus ada dan tidak kosong
  const hasQuery = params.q && String(params.q).trim().length > 0;

  return useQuery({
    queryKey: ["searchCollections", params],

    // Komentar: React Query tidak akan pernah menjalankan queryFn jika enabled = false
    enabled: hasQuery,

    queryFn: () => collectionService.search(params),

    keepPreviousData: true,
  });
};
