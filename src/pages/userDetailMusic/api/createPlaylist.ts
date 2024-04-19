import { axiosInstance } from "@/shared";

export const createPlaylist = async (
  title: string,
  coverImg: string,
  songs: number[]
) => {
  const { data } = await axiosInstance({
    url: "/create-playlist",
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    withCredentials: true,
    data: {
      title,
      coverImg,
      songs
    }
  });
  return data;
};
