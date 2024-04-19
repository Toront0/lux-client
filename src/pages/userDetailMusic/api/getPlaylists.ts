import { MusicPlaylistPreviewType } from "@/entities";
import { axiosInstance } from "@/shared";

export const getPlaylists = async (
  userId: string
): Promise<MusicPlaylistPreviewType[]> => {
  const { data } = await axiosInstance({
    url: `/users/${userId}/music-playlists`,
    withCredentials: true
  });

  return data;
};
