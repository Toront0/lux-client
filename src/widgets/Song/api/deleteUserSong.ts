import { axiosInstance } from "@/shared";

export const deleteUserSong = async (songId: number) => {
  const { data } = await axiosInstance({
    url: `/delete-song/${songId}`,
    withCredentials: true,
    method: "POST",
    headers: { "Content-Type": "text/plain" }
  });

  return data;
};
