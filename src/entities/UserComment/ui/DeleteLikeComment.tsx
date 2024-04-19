import { OnLikeComment } from "@/shared/api/likePostComment";
import { useMutation } from "@tanstack/react-query";

import { FaHeartBroken } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";

interface IDeleteLikeComment {
  onDeleteLikeComment: OnLikeComment;
  id: number;
  commentBelongsToId?: number;
  repliesAmount: number;
  likesAmount: number;
}

const DeleteLikeComment = (props: IDeleteLikeComment) => {
  const { mutate: deleteLikeComment, isPending: isDeletingLike } = useMutation(
    props.onDeleteLikeComment(props.id, props.repliesAmount >= 0 ? false : true)
  );

  return (
    <button
      disabled={isDeletingLike}
      onClick={() => deleteLikeComment()}
      className="flex items-center text-white group rounded-full px-2  gap-2 "
    >
      <div className="transition-transform lg:group-hover:scale-[1.2]">
        <FiHeart className="text-xl block lg:group-hover:hidden fill-white " />
        <FaHeartBroken className="text-xl hidden lg:group-hover:block " />
      </div>
      <span className="text-sm">{props.likesAmount}</span>
    </button>
  );
};

export default DeleteLikeComment;
