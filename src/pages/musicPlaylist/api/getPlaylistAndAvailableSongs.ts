import { axiosInstance } from "@/shared";
import { SongType } from "@/widgets";

export interface PlaylistSongType extends SongType {
  playlistId?: number;
}

export const getPlaylistAndAvailableSongs = async (
  pageParam: number,
  playlistId: string,
  userId: string
): Promise<PlaylistSongType[]> => {
  const { data } = await axiosInstance({
    url: `/${userId}/available-songs/playlists/${playlistId}?page=${pageParam}`,
    withCredentials: true
  });

  return data;
};
