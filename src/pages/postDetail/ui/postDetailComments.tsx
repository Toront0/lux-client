import { UserComment } from "@/entities";
import { reactQueryKeys } from "@/shared";

import {
  getPostCommentReplies,
  getPostComments
} from "../api/useFetchPostComments";

import CommentInput from "./commentInput";
import { replyCommentPost } from "@/shared/api/commentPost";
import { likePostComment } from "@/shared/api/likePostComment";
import { deletelLikePostComment } from "@/shared/api/deletePostCommentLike";
import { useInfiniteQueryScroll } from "@/shared/hooks";

interface IPostDetailComments {
  postId: number;
}

const PostDetailComments = ({ postId }: IPostDetailComments) => {
  const { containerRef, flattedContent, ref } = useInfiniteQueryScroll(
    (pageParam) => getPostComments(pageParam, postId),
    [reactQueryKeys.postComments, postId]
  );

  return (
    <div ref={containerRef as React.RefObject<HTMLDivElement>} className="mt-6">
      <CommentInput postId={postId} />
      <div className="mt-6">
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
                ref={ref}
                commentBelongsToId={postId}
                onReply={replyCommentPost}
                onLikeComment={likePostComment}
                onDeleteLikeComment={deletelLikePostComment}
                isRequesterLiked={v.isRequesterLiked}
                invalidateQueryKeys={[reactQueryKeys.postComments]}
                invalidateReplies={[reactQueryKeys.postCommentReplies, v.id]}
                onFetchReplies={getPostCommentReplies}
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
              commentBelongsToId={postId}
              onReply={replyCommentPost}
              onLikeComment={likePostComment}
              onDeleteLikeComment={deletelLikePostComment}
              isRequesterLiked={v.isRequesterLiked}
              parentCommentId={v.id}
              invalidateQueryKeys={[reactQueryKeys.postComments]}
              invalidateReplies={[reactQueryKeys.postCommentReplies, v.id]}
              onFetchReplies={getPostCommentReplies}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PostDetailComments;
