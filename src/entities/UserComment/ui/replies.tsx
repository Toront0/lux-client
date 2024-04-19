import { QueryKey, useInfiniteQuery } from "@tanstack/react-query";
import { OnFetchReplies } from "../config/types";
import UserComment from ".";
import { OnReply } from "@/shared/api/commentPost";

import { PiArrowElbowDownRightBold } from "react-icons/pi";
import { OnLikeComment } from "@/shared/api/likePostComment";
import { useTranslation } from "react-i18next";

interface IReplies {
  commentBelongsToId: number;
  onReply: OnReply;
  repliesAmount: number;
  onLikeComment: OnLikeComment;
  onDeleteLikeComment: OnLikeComment;
  repliesQueryKey: QueryKey;
  onFetchReplies?: OnFetchReplies;
}

const Replies = ({
  commentBelongsToId,
  onReply,
  onFetchReplies,
  repliesAmount,
  onDeleteLikeComment,
  onLikeComment,
  repliesQueryKey
}: IReplies) => {
  const { t } = useTranslation();

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: repliesQueryKey,
    queryFn: ({ pageParam }) => {
      const limit = pageParam === 0 ? 10 : 30;

      const offset = pageParam === 0 ? 0 : pageParam === 10 ? 10 : 30;

      return (
        onFetchReplies && onFetchReplies(commentBelongsToId, limit, offset)
      );
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (commentBelongsToId || lastPage?.length === 0) {
        return undefined;
      }

      return allPages.length;
    }
  });

  const repliesContent = data?.pages.flatMap((v) => v);

  console.log("repliesContent", repliesContent);

  return (
    <div className="ml-[52px]">
      {repliesContent?.length !== 0 &&
        repliesContent?.map((v) => (
          <UserComment
            key={v!.id}
            id={v!.id}
            createdAt={v!.createdAt}
            content={v!.content}
            authorFName={v!.authorFName}
            authorLName={v!.authorLName}
            authorId={v!.authorId}
            authorPImg={v!.authorPImg}
            repliesAmount={v!.repliesAmount}
            likesAmount={v!.likesAmount}
            onReply={onReply}
            onDeleteLikeComment={onDeleteLikeComment}
            onLikeComment={onLikeComment}
            isRequesterLiked={v!.isRequesterLiked}
            invalidateReplies={repliesQueryKey}
          />
        ))}
      {repliesContent && repliesContent?.length < repliesAmount && (
        <button
          type="button"
          onClick={() => fetchNextPage()}
          className="flex items-center text-blue-7 gap-2"
        >
          <PiArrowElbowDownRightBold />
          <span className="text-sm  ">{t("moreReplies")}</span>
        </button>
      )}
    </div>
  );
};

export default Replies;
