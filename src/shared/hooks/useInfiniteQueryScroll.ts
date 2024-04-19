import { useEffect, useRef } from "react";
import { useIntersection } from ".";
import { QueryKey, useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteQueryScroll = <T>(
  fetcher: (pageParam: number) => Promise<Array<T>>,
  reactQueryKeys: QueryKey
) => {
  const containerRef = useRef<HTMLElement>();

  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1
  });

  const query = useInfiniteQuery({
    queryKey: reactQueryKeys,
    queryFn: ({ pageParam }) => fetcher(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!Array.isArray(lastPage)) {
        return undefined;
      }

      if (lastPage.length === 0) {
        return undefined;
      }

      return allPages.length;
    }
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      query.fetchNextPage();
    }
  }, [entry]);

  const flattedContent = query.data?.pages.flatMap((v) => v);

  return { query, containerRef, ref, flattedContent };
};
