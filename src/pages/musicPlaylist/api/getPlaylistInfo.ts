import { MusicPlaylistPreviewType } from "@/entities";
import { axiosInstance } from "@/shared";

export interface PlaylistDetail extends MusicPlaylistPreviewType {
  creatorId: number;
  creatorFName: string;
  creatorLName: string;
  creatorPImg: string;
}

export const getPlaylistDetail = async (
  playlistID: string
): Promise<PlaylistDetail> => {
  const { data } = await axiosInstance({
    url: `/playlists/${playlistID}`,
    withCredentials: true
  });

  return data;
};
