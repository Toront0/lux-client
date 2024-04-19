import { VideoPreviewType } from "@/entities";
import { axiosInstance } from "@/shared";

export const fetchVideosLoader = async (
  pageParam: number
): Promise<VideoPreviewType[]> => {
  const { data } = await axiosInstance({
    url: `/videos?page=${pageParam}`,
    withCredentials: true
  });

  return data;
};
