import { useState } from "react";
import UserFollowersModal from "./UserFollowersModal";

interface IUserDetailFollowers {
  followersAmount: number;
  userId: number;
  userFName: string;
  userLName: string;
}

const UserDetailFollowers = ({
  followersAmount,
  userFName,
  userLName,
  userId
}: IUserDetailFollowers) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {isModalOpen && (
        <UserFollowersModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          userFName={userFName}
          userId={userId}
          userLName={userLName}
        />
      )}
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex text-sm border-r border-opac-w-2 px-4 mx-2 text-gray-4 dark:text-gray-12 flex-col items-center"
      >
        <span>
          <strong>{followersAmount}</strong>
        </span>
        <span>followers</span>
      </button>
    </>
  );
};

export default UserDetailFollowers;
