import { axiosInstance } from "@/shared";
import { SongType } from "@/widgets";

export const getPlaylistSongs = async (
  pageParam: number,
  userId: string,
  playlistID: string
): Promise<SongType[]> => {
  const { data } = await axiosInstance({
    url: `/${userId}/music/playlists/${playlistID}?page=${pageParam}`,
    withCredentials: true
  });

  return data;
};
