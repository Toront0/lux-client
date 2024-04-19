import { axiosInstance } from "@/shared";
import { SongType } from "@/widgets";

export const getMusic = async (pageParam: number): Promise<SongType[]> => {
  const { data } = await axiosInstance({
    url: `/music?page=${pageParam}`,
    withCredentials: true
  });

  return data;
};
