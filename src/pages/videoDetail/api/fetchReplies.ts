import { UserCommentType } from "@/entities";
import { axiosInstance } from "@/shared";

export const getCommentReplies = async (
  commentId: number,
  limit: number,
  offset: number
): Promise<UserCommentType[]> => {
  const { data } = await axiosInstance({
    url: `/video-comment-replies/${commentId}?limit=${limit}&offset=${offset}`,
    withCredentials: true
  });

  return data;
};
