import { useState, forwardRef, useRef } from "react";

import { OnFetchReplies, UserCommentType } from "../config/types";
import { formatTimeAgo } from "@/shared";
import { useTranslation } from "react-i18next";

import { MdKeyboardArrowDown } from "react-icons/md";
import { OnReply } from "@/shared/api/commentPost";
import { QueryKey, useMutation } from "@tanstack/react-query";

import Replies from "./replies";
import { OnLikeComment } from "@/shared/api/likePostComment";

import { CommentInput } from "@/entities";
import LikeComment from "./LikeComment";
import DeleteLikeComment from "./DeleteLikeComment";

interface IUserComment extends UserCommentType {
  commentBelongsToId?: number;
  onReply: OnReply;
  onLikeComment: OnLikeComment;
  onDeleteLikeComment: OnLikeComment;
  invalidateReplies: QueryKey;
  onFetchReplies?: OnFetchReplies;
  parentCommentId?: number;
  invalidateQueryKeys?: QueryKey;
}

const UserComment = forwardRef((props: IUserComment, ref) => {
  const { t, i18n } = useTranslation();
  const [expandReplies, setExpandReplies] = useState(false);
  const [expandReplyInput, setExpandReplyInput] = useState(false);

  const replyInputRef = useRef<HTMLInputElement>();

  const [inputValue, setInputValue] = useState("");

  const { mutate } = useMutation(
    props.onReply(props.commentBelongsToId || 0, inputValue, props.id)
  );

  const handleFetchReplies = async () => {
    setExpandReplies((p) => !p);
  };

  const onToggleReplyInput = () => {
    if (!expandReplyInput) {
      setExpandReplyInput(true);

      replyInputRef.current?.focus();
    } else {
      replyInputRef.current?.focus();
    }
  };

  return (
    <div className="my-6">
      <div ref={ref as React.RefObject<HTMLDivElement>} className="flex  gap-3">
        <div className="min-w-[40px] w-10 h-10 rounded-full bg-gray-12 dark:bg-gray-4">
          <img
            src={props.authorPImg}
            alt={props.authorFName}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div className="w-full">
          <div className="flex items-baseline gap-2">
            <h4 className="text-[13px] font-medium text-gray-2 dark:text-gray-14">
              {props.authorFName} {props.authorLName}
            </h4>
            <span className="text-xs text-gray-7 dark:text-gray-9">
              {formatTimeAgo(props.createdAt, i18n.language)}
            </span>
          </div>
          <p className="text-[9px] md:text-sm mt-0.5 text-gray-4 dark:text-gray-12">
            {props.content}
          </p>
          <div className="mt-2 flex gap-4">
            {props.isRequesterLiked > 0 ? (
              <DeleteLikeComment
                commentBelongsToId={props.commentBelongsToId}
                likesAmount={props.likesAmount}
                repliesAmount={props.repliesAmount}
                onDeleteLikeComment={props.onDeleteLikeComment}
                id={props.id}
              />
            ) : (
              <LikeComment
                commentBelongsToId={props.commentBelongsToId}
                likesAmount={props.likesAmount}
                repliesAmount={props.repliesAmount}
                onLikeComment={props.onLikeComment}
                id={props.id}
              />
            )}
            <button
              onClick={onToggleReplyInput}
              className="text-xs px-2 py-1 rounded hover:bg-opac-b-1 dark:hover:bg-opac-w-1 text-gray-4 dark:text-gray-12"
            >
              {t("reply")}
            </button>
          </div>
          {expandReplyInput && (
            <CommentInput
              value={inputValue}
              id="comment"
              name="comment"
              onSend={() => mutate()}
              onChange={(e) => setInputValue(e.target.value)}
            />
          )}
        </div>
      </div>

      {props.repliesAmount > 0 && (
        <div className="mt-2">
          <button
            onClick={handleFetchReplies}
            className="ml-12 px-3 2xl:hover:bg-blue-14 2xl:dark:hover:bg-blue-3 py-1 rounded flex items-center gap-2 text-blue-8 text-sm"
          >
            <MdKeyboardArrowDown
              className={`text-xl transition-transform ${
                expandReplies ? "rotate-180" : "rotate-0"
              } `}
            />
            {props.repliesAmount} replies
          </button>

          {expandReplies && (
            <Replies
              onReply={props.onReply}
              commentBelongsToId={props.id}
              repliesAmount={props.repliesAmount}
              onDeleteLikeComment={props.onDeleteLikeComment}
              onLikeComment={props.onLikeComment}
              onFetchReplies={props.onFetchReplies}
              repliesQueryKey={props.invalidateReplies}
            />
          )}
        </div>
      )}
    </div>
  );
});

export default UserComment;
