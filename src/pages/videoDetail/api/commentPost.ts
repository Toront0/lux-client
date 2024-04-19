import { queryClient } from "@/app/config/react-query/queryClient";
import { axiosInstance, reactQueryKeys } from "@/shared";
import { UseMutationOptions } from "@tanstack/react-query";

export type OnReply = (
  videoId: number,
  comment: string,
  comment_id: number
) => UseMutationOptions<unknown, Error, void, unknown>;

export const insertCommentReply = async (
  videoId: number,
  content: string,
  commentId: number
) => {
  const res = await axiosInstance({
    method: "POST",
    url: "/video-comment-reply",
    headers: { "Content-Type": "text/plain" },
    withCredentials: true,
    data: {
      videoId,
      content,
      commentId
    }
  });

  if (res.status !== 200) {
    throw new Error("Failed to insert post comment reply");
  }
};

export const replyVideoComment = (
  videoId: number,
  comment: string,
  comment_id: number
) => {
  const query: UseMutationOptions = {
    mutationFn: () => insertCommentReply(videoId, comment, comment_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [reactQueryKeys.videoComments]
      });
      queryClient.invalidateQueries({
        queryKey: [reactQueryKeys.videoCommentReplies, comment_id]
      });
    }
  };

  return query;
};
