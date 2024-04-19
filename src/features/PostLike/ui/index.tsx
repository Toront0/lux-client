import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaHeartBroken } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { handleLikePost } from "../api/likePost";
import { useAuthSession } from "@/shared/hooks";

interface IPostLike {
  likesAmount: number;
  postId: number;
  isUserLiked: boolean;
  invalidateQueryKeys?: QueryKey;
}

const PostLike = ({
  likesAmount,
  isUserLiked,
  postId,
  invalidateQueryKeys
}: IPostLike) => {
  const authUser = useAuthSession();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation<
    void,
    unknown,
    { userId: number; postId: number },
    unknown
  >({
    mutationFn: ({ userId, postId }) =>
      handleLikePost(postId, userId, isUserLiked ? "delete" : "add"),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: invalidateQueryKeys
      });
    }
  });

  return (
    <div className="flex text-gray-4 font-medium dark:text-gray-12  gap-2 text-sm ">
      {isUserLiked ? (
        <button
          disabled={isPending}
          onClick={() => mutate({ postId: postId, userId: authUser!.id })}
          className="flex items-center text-white group rounded-full px-2  gap-2 "
        >
          <div className="transition-transform lg:group-hover:scale-[1.2]">
            <FiHeart className="text-xl block lg:group-hover:hidden fill-white " />
            <FaHeartBroken className="text-xl hidden lg:group-hover:block " />
          </div>
          <span className="text-sm">{likesAmount}</span>
        </button>
      ) : (
        <button
          disabled={isPending}
          onClick={() => mutate({ postId: postId, userId: authUser!.id })}
          className={`rounded-full px-2  group  text-black dark:text-white flex items-center gap-2  transition-colors text-xs xl:text-sm `}
        >
          <FiHeart className="text-xl lg:group-hover:[fill-rule:nonzero] lg:group-hover:[fill:black] dark:lg:group-hover:[fill:white] transition-transform lg:group-hover:scale-[1.2]" />
          <span className="text-sm">{likesAmount}</span>
        </button>
      )}

      {/* <FaHeartBroken className="text-xl hidden lg:group-hover:block " /> */}
    </div>
  );
};

export default PostLike;
