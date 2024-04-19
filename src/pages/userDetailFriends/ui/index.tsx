import { FriendPreview } from "@/entities";

import { getUserFriends } from "../api/useFetchUserFriends";
import { useParams } from "react-router-dom";
import { FriendsSkeleton, reactQueryKeys } from "@/shared";
import { useTranslation } from "react-i18next";
import { useInfiniteQueryScroll } from "@/shared/hooks";

const UserDetailFriends = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  const { query, ref, flattedContent } = useInfiniteQueryScroll(
    (pageParam) => getUserFriends(pageParam, id || "0"),
    [reactQueryKeys.userFriends, id]
  );

  return (
    <div className="max-w-[768px] space-y-2">
      {query.isLoading && <FriendsSkeleton />}
      {!query.isLoading && flattedContent?.length === 0 ? (
        <div className="flex justify-center text-gray-4 dark:text-gray-12 mt-12 text-xl">
          {t("thisUserHasNoFriends")}
        </div>
      ) : (
        flattedContent?.map((f, i, arr) => {
          if (i === arr.length - 1) {
            return (
              <FriendPreview
                key={f.id}
                id={f.id}
                firstName={f.firstName}
                lastName={f.lastName}
                friendId={f.friendId}
                profileImg={f.profileImg}
                ref={ref}
              />
            );
          }

          return (
            <FriendPreview
              key={f.id}
              id={f.id}
              firstName={f.firstName}
              lastName={f.lastName}
              friendId={f.friendId}
              profileImg={f.profileImg}
            />
          );
        })
      )}
    </div>
  );
};

export default UserDetailFriends;
