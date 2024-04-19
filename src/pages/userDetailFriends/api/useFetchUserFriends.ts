import { FriendPreviewType } from "@/entities";
import { axiosInstance } from "@/shared";

export const getUserFriends = async (
  pageParam: number,
  userId: string
): Promise<FriendPreviewType[]> => {
  const { data } = await axiosInstance({
    url: `/users/${userId}/friends?page=${pageParam}`,
    withCredentials: true
  });

  return data;
};
