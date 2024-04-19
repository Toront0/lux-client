import { UserPreviewType } from "@/entities";
import { axiosInstance } from "@/shared";

export const getUserFollowings = async (
  pageParam: number,
  userId: number,
  search: string
): Promise<UserPreviewType[]> => {
  const { data } = await axiosInstance({
    url: `/users/${userId}/followings?page=${pageParam}&search=${search}`,
    withCredentials: true
  });

  return data;
};
