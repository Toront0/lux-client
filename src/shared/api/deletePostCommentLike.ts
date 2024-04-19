import { queryClient } from "@/app/config/react-query/queryClient";
import { axiosInstance, reactQueryKeys } from "..";
import { UseMutationOptions } from "@tanstack/react-query";

const deletePostCommentLike = async (commentId: number) => {
  const { data } = await axiosInstance({
    method: "POST",
    url: "/delete-lpc",
    headers: { "Content-Type": "text/plain" },
    withCredentials: true,
    data: {
      commentId
    }
  });

  return data;
};

const deletePostCommentReplyLike = async (commentId: number) => {
  const { data } = await axiosInstance({
    method: "POST",
    url: "/delete-lpcr",
    headers: { "Content-Type": "text/plain" },
    withCredentials: true,
    data: {
      commentId
    }
  });

  return data;
};

export const deletelLikePostComment = (commentId: number, isReply: boolean) => {
  const query: UseMutationOptions = {
    mutationFn: () =>
      isReply
        ? deletePostCommentReplyLike(commentId)
        : deletePostCommentLike(commentId),
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
