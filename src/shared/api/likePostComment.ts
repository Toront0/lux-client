import { queryClient } from "@/app/config/react-query/queryClient";
import { axiosInstance, reactQueryKeys } from "..";
import { UseMutationOptions } from "@tanstack/react-query";

export type OnLikeComment = (
  commentId: number,
  isReply: boolean
) => UseMutationOptions<unknown, Error, void, unknown>;

const insertPostCommentLike = async (commentId: number) => {
  const { data } = await axiosInstance({
    method: "POST",
    url: "/lpc",
    headers: { "Content-Type": "text/plain" },
    withCredentials: true,
    data: {
      commentId
    }
  });

  return data;
};

const insertPostCommentReplyLike = async (commentId: number) => {
  const { data } = await axiosInstance({
    method: "POST",
    url: "/lpcr",
    headers: { "Content-Type": "text/plain" },
    withCredentials: true,
    data: {
      commentId
    }
  });

  return data;
};

export const likePostComment = (commentId: number, isReply: boolean) => {
  const query: UseMutationOptions = {
    mutationFn: () =>
      isReply
        ? insertPostCommentReplyLike(commentId)
        : insertPostCommentLike(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: isReply
          ? [reactQueryKeys.postCommentReplies]
          : [reactQueryKeys.postComments]
      });
    }
  };

  return query;
};
