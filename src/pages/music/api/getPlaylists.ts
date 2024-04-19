import { axiosInstance } from "@/shared";
import { PlaylistPreview } from "../lib/types";

export const getPlaylists = async (): Promise<PlaylistPreview[]> => {
  const { data } = await axiosInstance({
    url: "/playlists",
    withCredentials: true
  });

  return data;
};
