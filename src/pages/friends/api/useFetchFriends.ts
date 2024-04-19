import { FriendPreviewType } from "@/entities";
import { axiosInstance } from "@/shared";

export const getFriends = async (
  pageParam: number,
  userId: number,
  search: string
): Promise<FriendPreviewType[]> => {
  const { data } = await axiosInstance({
    url: `/users/${userId}/friends?page=${pageParam}&search=${search}`,
    withCredentials: true
  });

  return data;
};
