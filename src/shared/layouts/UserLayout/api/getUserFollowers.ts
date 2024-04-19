import { UserPreviewType } from "@/entities";
import { axiosInstance } from "@/shared";

export const getUserFollowers = async (
  pageParam: number,
  userId: number,
  search: string
): Promise<UserPreviewType[]> => {
  const { data } = await axiosInstance({
    url: `/users/${userId}/followers?page=${pageParam}&search=${search}`,
    withCredentials: true
  });

  return data;
};
