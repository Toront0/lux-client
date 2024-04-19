import { queryClient } from "@/app/config/react-query/queryClient";
import { axiosInstance, reactQueryKeys } from "@/shared";

import { UseMutationOptions } from "@tanstack/react-query";

export type OnLikeComment = (
  commentId: number,
  replyToCommentId: number,
  isReply: boolean
) => UseMutationOptions<unknown, Error, void, unknown>;

const insertVideoCommentLike = async (commentId: number) => {
  const { data } = await axiosInstance({
    method: "POST",
    url: "/lvc",
    headers: { "Content-Type": "text/plain" },
    withCredentials: true,
    data: {
      commentId
    }
  });

  return data;
};

const insertVideoCommentReplyLike = async (commentId: number) => {
  const { data } = await axiosInstance({
    method: "POST",
    url: "/lvcr",
    headers: { "Content-Type": "text/plain" },
    withCredentials: true,
    data: {
      commentId
    }
  });

  return data;
};

export const likeVideoComment = (commentId: number, isReply: boolean) => {
  const query: UseMutationOptions = {
    mutationFn: () =>
      isReply
        ? insertVideoCommentReplyLike(commentId)
        : insertVideoCommentLike(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: isReply
          ? [reactQueryKeys.videoCommentReplies]
          : [reactQueryKeys.videoComments]
      });
    }
  };

  return query;
};
