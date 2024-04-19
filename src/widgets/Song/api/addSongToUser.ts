import { axiosInstance } from "@/shared";

export const addSongToUser = async (songId: number) => {
  const { data } = await axiosInstance({
    url: `/add-song/${songId}`,
    withCredentials: true,
    method: "POST",
    headers: { "Content-Type": "text/plain" }
  });

  return data;
};
