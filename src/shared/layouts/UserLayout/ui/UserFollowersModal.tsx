import {
  Button,
  ModalContent,
  SearchInput,
  SpinnerLoader,
  reactQueryKeys
} from "@/shared";
import { CSSTransition } from "react-transition-group";

import { IoMdClose } from "react-icons/io";
import { UserPreview } from "@/entities";
import { useState } from "react";
import { getUserFollowers } from "../api/getUserFollowers";
import { useDebouncedValue } from "@/shared/hooks/useDebouncedValue";

import { TbUserSearch } from "react-icons/tb";
import { useInfiniteQueryScroll } from "@/shared/hooks";

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
  // const containerRef = useRef<HTMLElement>();
  const [inputValue, setInputValue] = useState("");
  const [debounced] = useDebouncedValue(inputValue, 400);

  const { ref, query, flattedContent } = useInfiniteQueryScroll(
    (pageParam) => getUserFollowers(pageParam, userId, debounced),
    [reactQueryKeys.userFollowers, userId, debounced]
  );

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

export default UserFollowersModal;
