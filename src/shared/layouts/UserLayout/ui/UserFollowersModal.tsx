import {
  Button,
  ModalContent,
  SearchInput,
  SpinnerLoader,
  reactQueryKeys,
  useIntersection
} from "@/shared";
import { CSSTransition } from "react-transition-group";

import { IoMdClose } from "react-icons/io";
import { UserPreview } from "@/entities";
import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getUserFollowers } from "../api/getUserFollowers";
import { useDebouncedValue } from "@/shared/hooks/useDebouncedValue";

import { TbUserSearch } from "react-icons/tb";

interface IUserFollowersModal {
  onClose: () => void;
  isOpen: boolean;
  userId: number;
  userFName: string;
  userLName: string;
}

const UserFollowersModal = ({
  onClose,
  isOpen,
  userFName,
  userLName,
  userId
}: IUserFollowersModal) => {
  const containerRef = useRef<HTMLElement>();
  const [inputValue, setInputValue] = useState("");
  const [debounced] = useDebouncedValue(inputValue, 400);

  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1
  });

  const { data, isLoading, fetchNextPage } = useInfiniteQuery({
    queryKey: [reactQueryKeys.userFollowers, userId, debounced],
    queryFn: ({ pageParam }) => getUserFollowers(pageParam, userId, debounced),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) {
        return undefined;
      }

      return allPages.length;
    }
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry]);

  const content = data?.pages.flatMap((v) => v);

  return (
    <CSSTransition
      timeout={200}
      classNames="my-modal"
      in={isOpen}
      unmountOnExit
    >
      <ModalContent onClose={onClose} isOpen={isOpen}>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <h2 className="text-lg font-semibold  text-gray-2 dark:text-gray-14">
              {userFName} {userLName}
            </h2>
            <span className="text-gray-6 dark:text-gray-9 italic">
              - Подписчики
            </span>
          </div>
          <Button onClick={onClose}>
            <IoMdClose className="w-full h-full" />
          </Button>
        </div>
        <SearchInput
          placeholder="Search..."
          name="search"
          id="search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="mt-2">
          {!isLoading && content?.length === 0 && (
            <div className="h-full text-gray-6 text-sm my-6 dark:text-gray-9 flex-col flex items-center justify-center">
              <TbUserSearch className="text-2xl" />
              <span>No results were found</span>
            </div>
          )}
          {isLoading && (
            <div className="flex justify-center my-4">
              <SpinnerLoader />
            </div>
          )}
          {content?.map((v, i, arr) => {
            if (i === arr.length - 1) {
              return (
                <UserPreview
                  key={v.id}
                  firstName={v.firstName}
                  userId={v.userId}
                  id={v.id}
                  lastName={v.lastName}
                  profileImg={v.profileImg}
                  ref={ref}
                />
              );
            }

            return (
              <UserPreview
                key={v.id}
                firstName={v.firstName}
                userId={v.userId}
                id={v.id}
                lastName={v.lastName}
                profileImg={v.profileImg}
              />
            );
          })}
        </div>
      </ModalContent>
    </CSSTransition>
  );
};

export default UserFollowersModal;
