import { useState } from "react";

import { FriendPreviewType, SearchInput, UserPreview } from "@/entities";
import { getFriends } from "../api/useFetchFriends";

import { useTranslation } from "react-i18next";

import { reactQueryKeys } from "@/shared";

import { TbUserSearch } from "react-icons/tb";

import { FaUserFriends } from "react-icons/fa";
import { useDebouncedValue } from "@/shared/hooks/useDebouncedValue";
import SkeletonLoading from "./skeletonLoading";
import { useInfiniteQueryScroll } from "@/shared/hooks";

const FriendsPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [debounced] = useDebouncedValue(inputValue, 400);

  const { t } = useTranslation();

  const { query, containerRef, flattedContent, ref } =
    useInfiniteQueryScroll<FriendPreviewType>(
      (pageParam) => getFriends(pageParam, 5, debounced),
      [reactQueryKeys.friends, debounced]
    );

  return (
    <div
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className="h-full w-full overflow-y-auto"
    >
      <div className="p-2 md:p-6 h-full max-w-[640px] flex flex-col">
        <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white">
          {t("navigationLinks.2.friends")}
        </h2>
        <div className="w-full">
          <SearchInput
            placeholder={t("findFriend")}
            name="search"
            id="search"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <section className="mt-4 h-full">
          {query.isLoading && <SkeletonLoading />}

          {flattedContent?.length === 0 && debounced.length === 0 && (
            <div className="h-full text-gray-6 dark:text-gray-9 flex-col flex items-center justify-center">
              <FaUserFriends className="text-4xl" />
              <span>You have no friends.</span>
            </div>
          )}
          {/* {1 && <SkeletonLoading />} */}
          {flattedContent?.length === 0 && debounced.length > 0 ? (
            <div className="h-full text-gray-6 dark:text-gray-9 flex-col flex items-center justify-center">
              <TbUserSearch className="text-4xl" />
              <span>{t("noResults")}</span>
            </div>
          ) : (
            flattedContent?.map((f, i, arr) => {
              if (i === arr.length - 1) {
                return (
                  <UserPreview
                    key={f.id}
                    id={f.id}
                    firstName={f.firstName}
                    lastName={f.lastName}
                    profileImg={f.profileImg}
                    userId={f.friendId}
                    ref={ref}
                  />
                );
              }

              return (
                <UserPreview
                  key={f.id}
                  id={f.id}
                  firstName={f.firstName}
                  lastName={f.lastName}
                  profileImg={f.profileImg}
                  userId={f.friendId}
                />
              );
            })
          )}
        </section>
        {/* <div ref={ref}></div> */}
      </div>
    </div>
  );
};

export default FriendsPage;
