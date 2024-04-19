import { axiosInstance, reactQueryKeys } from "@/shared";
import { PostType } from "@/widgets";
import { useQuery } from "@tanstack/react-query";

const fetchPost = async (postId: string): Promise<PostType> => {
  const { data } = await axiosInstance({
    url: `/posts/${postId}`,
    withCredentials: true
  });

  return data;
};

export const useFetchPostDetail = (postId: string) => {
  return useQuery({
    queryKey: [reactQueryKeys.postDetail, postId],
    queryFn: () => fetchPost(postId)
  });
};
