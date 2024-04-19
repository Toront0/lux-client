import { axiosInstance } from "@/shared";
import { PostType } from "@/widgets";

export const getPosts = async (pageParam: number): Promise<PostType[]> => {
  const { data } = await axiosInstance<PostType[]>({
    method: "GET",
    withCredentials: true,
    headers: { "Content-Type": "text/plain" },
    url: `/posts?page=${pageParam}`,
    validateStatus: () => true
  });

  return data;
};
