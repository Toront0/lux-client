import { queryClient } from "@/app/config/react-query/queryClient";

import { useMutation } from "@tanstack/react-query";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const useDeleteOrAddSong = (fetcher: () => Promise<any>) => {
  const mutate = useMutation({
    mutationFn: fetcher,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          for (let i = 0; i < query.queryKey.length; i++) {
            if (new RegExp("music", "i").test(query.queryKey[i] as string)) {
              return true;
            }
          }

          return false;
        }
      });
    }
  });

  return mutate;
};
