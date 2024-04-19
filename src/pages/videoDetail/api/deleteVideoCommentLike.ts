import { queryClient } from "@/app/config/react-query/queryClient";
import { axiosInstance, reactQueryKeys } from "@/shared";

import { UseMutationOptions } from "@tanstack/react-query";

const deleteVideoCommentLike = async (commentId: number) => {
  const { data } = await axiosInstance({
    method: "POST",
    url: "/delete-lvc",
    headers: { "Content-Type": "text/plain" },
    withCredentials: true,
    data: {
      commentId
    }
  });

  return data;
};

const deleteVideoCommentReplyLike = async (commentId: number) => {
  const { data } = await axiosInstance({
    method: "POST",
    url: "/delete-lvcr",
    headers: { "Content-Type": "text/plain" },
    withCredentials: true,
    data: {
      commentId
    }
  });

  return data;
};

export const deletelLikeVideoComment = (
  commentId: number,
  replyToCommentId: number,
  isReply: boolean
) => {
  const query: UseMutationOptions = {
    mutationFn: () =>
      isReply
        ? deleteVideoCommentReplyLike(commentId)
        : deleteVideoCommentLike(commentId),
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
