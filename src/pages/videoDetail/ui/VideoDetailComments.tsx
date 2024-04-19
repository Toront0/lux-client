import { UserComment, UserCommentType } from "@/entities";
import { axiosInstance, reactQueryKeys } from "@/shared";

import { replyVideoComment } from "../api/commentPost";
import { likeVideoComment } from "../api/likeVideoComment";
import { deletelLikeVideoComment } from "../api/deleteVideoCommentLike";
import VideoDetailCommentsInput from "./VideoDetailCommentsInput";
import { getCommentReplies } from "../api/fetchReplies";
import { useTranslation } from "react-i18next";
import { useInfiniteQueryScroll } from "@/shared/hooks";

const getVideoComments = async (
  pageParam: number,
  videoId: number
): Promise<UserCommentType[]> => {
  const { data } = await axiosInstance({
    url: `/video-comments/${videoId}?page=${pageParam}`,
    withCredentials: true
  });

  return data;
};

interface IVideoDetailComments {
  videoId: number;
}

const VideoDetailComments = ({ videoId }: IVideoDetailComments) => {
  const { t } = useTranslation();

  const { containerRef, ref, flattedContent } = useInfiniteQueryScroll(
    (pageParam) => getVideoComments(pageParam, videoId),
    [reactQueryKeys.videoComments, videoId]
  );

  return (
    <div ref={containerRef as React.RefObject<HTMLDivElement>} className="my-8">
      <h3 className="text-sm md:text-xl text-gray-2 font-bold dark:text-gray-14">
        {t("comments")}
      </h3>
      <VideoDetailCommentsInput videoId={videoId} />

      {flattedContent?.map((v, i, arr) => {
        if (i === arr.length - 1) {
          return (
            <UserComment
              key={v.id}
              id={v.id}
              createdAt={v.createdAt}
              content={v.content}
              authorFName={v.authorFName}
              authorLName={v.authorLName}
              authorId={v.authorId}
              authorPImg={v.authorPImg}
              repliesAmount={v.repliesAmount}
              likesAmount={v.likesAmount}
              commentBelongsToId={videoId}
              onReply={replyVideoComment}
              onLikeComment={likeVideoComment}
              onDeleteLikeComment={deletelLikeVideoComment}
              isRequesterLiked={v.isRequesterLiked}
              onFetchReplies={getCommentReplies}
              invalidateQueryKeys={[reactQueryKeys.videoComments]}
              invalidateReplies={[reactQueryKeys.videoCommentReplies, v.id]}
              ref={ref}
            />
          );
        }

        return (
          <UserComment
            key={v.id}
            id={v.id}
            createdAt={v.createdAt}
            content={v.content}
            authorFName={v.authorFName}
            authorLName={v.authorLName}
            authorId={v.authorId}
            authorPImg={v.authorPImg}
            repliesAmount={v.repliesAmount}
            likesAmount={v.likesAmount}
            commentBelongsToId={videoId}
            onReply={replyVideoComment}
            onLikeComment={likeVideoComment}
            onDeleteLikeComment={deletelLikeVideoComment}
            isRequesterLiked={v.isRequesterLiked}
            onFetchReplies={getCommentReplies}
            invalidateQueryKeys={[reactQueryKeys.videoComments]}
            invalidateReplies={[reactQueryKeys.videoCommentReplies, v.id]}
          />
        );
      })}
    </div>
  );
};

export default VideoDetailComments;
