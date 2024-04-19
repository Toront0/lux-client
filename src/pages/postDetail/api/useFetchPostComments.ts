import { UserCommentType } from "@/entities";
import { axiosInstance } from "@/shared";

export const getPostComments = async (
  pageParam: number,
  postId: number
): Promise<UserCommentType[]> => {
  const { data } = await axiosInstance({
    url: `/post-comments/${postId}?page=${pageParam}`,
    withCredentials: true
  });

  return data;
};

export const getPostCommentReplies = async (
  parentCommentId: number,
  limit: number,
  offset: number
): Promise<UserCommentType[]> => {
  const { data } = await axiosInstance({
    url: `/post-comment-replies/${parentCommentId}?limit=${limit}&offset=${offset}`,
    withCredentials: true
  });

  return data;
};
