import { axiosInstance } from "@/shared";
import { SongType } from "@/widgets";

export const getMusic = async (
  pageParam: number,
  userId: string
): Promise<SongType[]> => {
  const { data } = await axiosInstance({
    url: `/users/${userId}/music?page=${pageParam}`,
    withCredentials: true
  });

  return data;
};
