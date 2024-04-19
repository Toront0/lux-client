import { queryClient } from "@/app/config/react-query/queryClient";
import { MusicPlaylistPreviewType } from "@/entities";
import { axiosInstance, reactQueryKeys } from "@/shared";
import { PlaylistDetail } from "./getPlaylistInfo";

const fetchPlaylist = async (
  playlistId: string
): Promise<MusicPlaylistPreviewType> => {
  const { data } = await axiosInstance({
    url: `/music-playlists/${playlistId}`,
    withCredentials: true
  });

  return data;
};

export const getPlaylistPreview = async (
  playlistId: string
): Promise<MusicPlaylistPreviewType> => {
  const cache = queryClient.getQueryData([
    reactQueryKeys.playlistPreview
  ]) as PlaylistDetail;

  if (cache.id === +playlistId) {
    return new Promise((res) =>
      res({
        id: cache.id,
        coverImg: cache.coverImg,
        creatorId: cache.creatorId,
        title: cache.title
      })
    );
  }

  return await fetchPlaylist(playlistId);

  console.log("cache", cache);
};
