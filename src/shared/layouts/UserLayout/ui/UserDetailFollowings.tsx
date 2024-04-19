import { useState } from "react";
import UserFollowingsModal from "./UserFollowingsModal";

interface IUserDetailFollowings {
  followeesAmount: number;
  userId: number;
  userFName: string;
  userLName: string;
}

const UserDetailFollowings = ({
  followeesAmount,
  userId,
  userFName,
  userLName
}: IUserDetailFollowings) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {isModalOpen && (
        <UserFollowingsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          userFName={userFName}
          userId={userId}
          userLName={userLName}
        />
      )}
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex text-sm text-gray-4 dark:text-gray-12 flex-col items-center"
      >
        <span>
          <strong>{followeesAmount}</strong>
        </span>
        <span>following</span>
      </button>
    </>
  );
};

export default UserDetailFollowings;
