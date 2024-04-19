import { UserPreview } from "@/entities";
import {
  Button,
  ModalContent,
  SearchInput,
  SpinnerLoader,
  reactQueryKeys
} from "@/shared";
import { useDebouncedValue } from "@/shared/hooks/useDebouncedValue";

import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { TbUserSearch } from "react-icons/tb";
import { CSSTransition } from "react-transition-group";
import { getUserFollowings } from "../api/getUserFollowings";
import { useInfiniteQueryScroll } from "@/shared/hooks";

interface IUserFollowingsModal {
  userFName: string;
  userLName: string;
  userId: number;
  isOpen: boolean;
  onClose: () => void;
}

const UserFollowingsModal = ({
  userFName,
  userId,
  userLName,
  isOpen,
  onClose
}: IUserFollowingsModal) => {
  // const containerRef = useRef<HTMLElement>();
  const [inputValue, setInputValue] = useState("");
  const [debounced] = useDebouncedValue(inputValue, 400);

  const { query, flattedContent, containerRef, ref } = useInfiniteQueryScroll(
    (pageParam) => getUserFollowings(pageParam, userId, debounced),
    [reactQueryKeys.userFollowing, userId, debounced]
  );

  // const { ref, entry } = useIntersection({
  //   root: containerRef.current,
  //   threshold: 1
  // });

  // const { data, status, isLoading, fetchNextPage } = useInfiniteQuery({
  //   queryKey: [reactQueryKeys.userFollowing, userId, debounced],
  //   queryFn: ({ pageParam }) => getUserFollowings(pageParam, userId, debounced),
  //   initialPageParam: 0,
  //   getNextPageParam: (lastPage, allPages) => {
  //     if (lastPage.length === 0) {
  //       return undefined;
  //     }

  //     return allPages.length;
  //   }
  // });

  // useEffect(() => {
  //   if (entry?.isIntersecting) {
  //     fetchNextPage();
  //   }
  // }, [entry]);

  // const content = data?.pages.flatMap((v) => v);

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
              - Подписки
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
        <div
          ref={containerRef as React.RefObject<HTMLDivElement>}
          className="mt-2"
        >
          {!query.isLoading && flattedContent?.length === 0 && (
            <div className="h-full text-gray-6 text-sm my-6 dark:text-gray-9 flex-col flex items-center justify-center">
              <TbUserSearch className="text-2xl" />
              <span>No results were found</span>
            </div>
          )}
          {query.isLoading && (
            <div className="flex justify-center my-4">
              <SpinnerLoader />
            </div>
          )}
          {flattedContent?.map((v, i, arr) => {
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

export default UserFollowingsModal;
