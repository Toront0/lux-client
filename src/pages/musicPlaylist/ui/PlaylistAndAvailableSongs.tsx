import { reactQueryKeys } from "@/shared";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlaylistAndAvailableSongs } from "../api/getPlaylistAndAvailableSongs";
import { IoPlay } from "react-icons/io5";
import { useIntersection } from "@/shared/hooks";

const PlaylistAndAvailableSongs = () => {
  const containerRef = useRef<HTMLElement>();

  const { playlistId, userId } = useParams();

  const { entry } = useIntersection({
    root: containerRef.current,
    threshold: 1
  });

  const {
    data,

    fetchNextPage
  } = useInfiniteQuery({
    queryKey: [reactQueryKeys.playlistSongs, playlistId],
    queryFn: ({ pageParam }) =>
      getPlaylistAndAvailableSongs(pageParam, playlistId || "0", userId || "0"),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) {
        return undefined;
      }

      return allPages.length;
    }
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry]);

  const content = data?.pages.flatMap((v) => v);

  const [chosenSongs] = useState(() => content);

  console.log(content);

  return (
    <div className=" py-4 h-full">
      {chosenSongs?.map((v) => (
        <div key={v.id} className="flex items-center gap-2">
          <button
            // onClick={() => onCheck(v.id, v.playlistId)}
            className="w-5 h-5 relative p-0.5 my-4 flex items-center justify-center rounded-full border-2 border-gray-4 dark:border-gray-12"
          >
            {v.playlistId && (
              <div className="w-full h-full rounded-full bg-gray-4 dark:bg-gray-12"></div>
            )}
          </button>
          <button className="min-w-[32px] text-white flex items-center justify-center h-8 rounded-full bg-blue-7">
            <IoPlay />
          </button>

          <div className="text-sm text-gray-4 font-medium dark:text-gray-12">
            <span>{v.performer}</span>
            <span className="before:content-['-'] before:mx-2"></span>
            <span>{v.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlaylistAndAvailableSongs;
