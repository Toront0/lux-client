import { LuUserPlus, LuUserX, LuUserCheck } from "react-icons/lu";

import { onUserAction } from "../../api/currentStatusAction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reactQueryKeys } from "@/shared";
import { useParams } from "react-router-dom";
import { UsersRelations } from "../../lib/types";

interface IUsersCurrentStatus {
  r: UsersRelations;
  userId: number;
}

const UsersCurrentStatus = ({ r, userId }: IUsersCurrentStatus) => {
  const { id } = useParams();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => onUserAction(r, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [reactQueryKeys.userDetail, id]
      });
    }
  });

  return (
    <>
      {r === "" ? (
        <button
          onClick={() => mutate()}
          className="text-xs flex items-center gap-2 font-medium px-3 md:px-2 h-fit py-1.5 rounded bg-blue-7 text-white"
        >
          <LuUserPlus className="text-lg" />
          <span className="hidden md:block">Добавить в друзья</span>
        </button>
      ) : r === "friends" ? (
        <button
          onClick={() => mutate()}
          className="text-xs flex items-center gap-2 font-medium px-3 md:px-2 h-fit py-1.5 rounded bg-blue-7 text-white"
        >
          <LuUserX className="text-lg" />
          <span className="hidden md:block">Удалить из друзей</span>
        </button>
      ) : r === "follower" ? (
        <button
          onClick={() => mutate()}
          className="text-xs flex items-center gap-2 font-medium px-3 md:px-2 h-fit py-1.5 rounded bg-blue-7 text-white"
        >
          <LuUserCheck className="text-lg" />
          <span className="hidden md:block">Принять запрос</span>
        </button>
      ) : (
        <button
          onClick={() => mutate()}
          className="text-xs flex items-center gap-2 font-medium px-3 md:px-2 h-fit py-1.5 rounded bg-blue-7 text-white"
        >
          <LuUserX className="text-lg" />
          <span className="hidden md:block">Отписаться</span>
        </button>
      )}
    </>
  );
};

export default UsersCurrentStatus;
