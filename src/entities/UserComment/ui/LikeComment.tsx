import { OnLikeComment } from "@/shared/api/likePostComment";
import { useMutation } from "@tanstack/react-query";

import { FiHeart } from "react-icons/fi";

interface ILikeComment {
  onLikeComment: OnLikeComment;
  id: number;
  commentBelongsToId?: number;
  repliesAmount: number;
  likesAmount: number;
}

const LikeComment = (props: ILikeComment) => {
  const { mutate: likeComment, isPending: isLiking } = useMutation(
    props.onLikeComment(
      props.id,
      props.commentBelongsToId || 0,
      props.repliesAmount >= 0 ? false : true
    )
  );

  return (
    <button
      disabled={isLiking}
      onClick={() => likeComment()}
      className={`rounded-full px-2  group  text-black dark:text-white flex items-center gap-2  transition-colors text-xs xl:text-sm `}
    >
      <FiHeart className="text-xl lg:group-hover:[fill-rule:nonzero] lg:group-hover:[fill:black] dark:lg:group-hover:[fill:white] transition-transform lg:group-hover:scale-[1.2]" />
      <span className="text-sm">{props.likesAmount}</span>
    </button>
  );
};

export default LikeComment;
