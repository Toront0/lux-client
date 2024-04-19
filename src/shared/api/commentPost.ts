import { queryClient } from "@/app/config/react-query/queryClient";
import { axiosInstance, reactQueryKeys } from "@/shared";
import { UseMutationOptions } from "@tanstack/react-query";

export type OnReply = (
  postId: number,
  comment: string,
  comment_id: number
) => UseMutationOptions<unknown, Error, void, unknown>;

export const insertCommentReply = async (
  postId: number,
  content: string,
  commentId: number
) => {
  const res = await axiosInstance({
    method: "POST",
    url: "/post-comment-reply",
    headers: { "Content-Type": "text/plain" },
    withCredentials: true,
    data: {
      postId,
      content,
      commentId
    }
  });

  if (res.status !== 200) {
    throw new Error("Failed to insert post comment reply");
  }
};

export const replyCommentPost = (
  postId: number,
  comment: string,
  comment_id: number
) => {
  const query: UseMutationOptions = {
    mutationFn: () => insertCommentReply(postId, comment, comment_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [reactQueryKeys.postComments]
      });
      queryClient.invalidateQueries({
        queryKey: [reactQueryKeys.postDetail]
      });
    }
  };

  return query;
};
