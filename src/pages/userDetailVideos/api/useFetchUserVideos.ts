import { VideoPreviewType } from "@/entities";
import { axiosInstance } from "@/shared";

export const getUserVideos = async (
  pageParam: number,
  userId: string
): Promise<VideoPreviewType[]> => {
  const { data } = await axiosInstance({
    url: `/users/${userId}/videos?page=${pageParam}`,
    withCredentials: true
  });

  return data;
};
