import { Dispatch, SetStateAction, useState } from "react";

import { SpinnerLoader, reactQueryKeys } from "@/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMusic } from "../api/getMusic";
import { FormData, PossibleFormState } from "../lib/types";

import { IoPlay } from "react-icons/io5";
import { createPlaylist } from "../api/createPlaylist";
import { useInfiniteQueryScroll } from "@/shared/hooks";

interface IAddSongsToPlaylist {
  setCurrentMode: Dispatch<SetStateAction<PossibleFormState>>;
  values: FormData;
  onClose: () => void;
}

const AddSongsToPlaylist = ({
  setCurrentMode,
  values,
  onClose
}: IAddSongsToPlaylist) => {
  const [addedSongsIds, setAddedSongsIds] = useState<number[]>([]);
  const queryClient = useQueryClient();
  const { id } = useParams();

  const { flattedContent } = useInfiniteQueryScroll(
    (pageParam) => getMusic(pageParam, id || "0"),
    [reactQueryKeys.userMusic, id]
  );

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      createPlaylist(values.title, values.coverImg, addedSongsIds),
    onSuccess: () => (
      queryClient.invalidateQueries({
        queryKey: [reactQueryKeys.userMusic, id]
      }),
      queryClient.invalidateQueries({
        queryKey: [reactQueryKeys.userMusicPlaylists, id]
      }),
      onClose()
    )
  });

  // const { ref, entry } = useIntersection({
  //   root: containerRef.current,
  //   threshold: 1
  // });

  // const {
  //   data,
  //   status,

  //   fetchNextPage
  // } = useInfiniteQuery({
  //   queryKey: [reactQueryKeys.userMusic, id],
  //   queryFn: ({ pageParam }) => getMusic(pageParam, id || "0"),
  //   initialPageParam: 0,
  //   getNextPageParam: (lastPage, allPages) => {
  //     if (lastPage.length === 0) {
  //       return undefined;
  //     }

  //     return allPages.length;
  //   }
  // });

  // useEffect(() => {
  //   if (entry?.isIntersecting) {
  //     fetchNextPage();
  //   }
  // }, [entry]);

  // const content = data?.pages.flatMap((v) => v);

  const onAddSong = (songId: number) => {
    if (addedSongsIds.includes(songId)) {
      setAddedSongsIds((prev) => prev.filter((v) => v !== songId));
    } else {
      setAddedSongsIds((prev) => prev.concat(songId));
    }
  };

  return (
    <div className="w-full mt-4">
      {flattedContent?.map((v) => (
        <div key={v.id} className="flex items-center gap-2">
          <button
            onClick={() => onAddSong(v.id)}
            className="w-5 h-5 relative p-0.5 flex items-center justify-center rounded-full border-2 border-gray-4 dark:border-gray-12"
          >
            {addedSongsIds.includes(v.id) && (
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
      <div className="mt-6 flex gap-2">
        <button
          onClick={() => setCurrentMode("general")}
          className="bg-opac-b-2 w-1/2 py-1 rounded dark:bg-opac-w-2 text-gray-4 dark:text-gray-12"
        >
          Назад
        </button>
        <button
          disabled={addedSongsIds.length === 0 || isPending}
          onClick={() => mutate()}
          className="w-1/2 py-1 rounded bg-blue-7 gap-2 justify-center flex items-center disabled:bg-blue-12 disabled:cursor-not-allowed disabled:dark:bg-blue-4 disabled:dark:text-gray-8 text-white text-sm"
        >
          {isPending && <SpinnerLoader className="w-5 h-5" />}
          Создать
        </button>
      </div>
    </div>
  );
};

export default AddSongsToPlaylist;
