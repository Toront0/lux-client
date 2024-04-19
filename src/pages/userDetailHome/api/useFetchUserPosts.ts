import { axiosInstance } from "@/shared";
import { PostType } from "@/widgets";

export const getUserPosts = async (
  pageParam: number,
  userId: string
): Promise<PostType[]> => {
  const { data } = await axiosInstance({
    url: `/users/${userId}/posts?page=${pageParam}`,
    withCredentials: true
  });

  return data;
};
