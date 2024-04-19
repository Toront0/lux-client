import { axiosInstance } from "@/shared";

export const deletePlaylist = async (playlistId: number) => {
  const { data } = await axiosInstance({
    method: "POST",
    url: `/delete-playlist/${playlistId}`,
    withCredentials: true,
    headers: { "Content-Type": "text/plain" }
  });

  return data;
};
