import { Link } from "react-router-dom";

import { FriendPreviewType } from "../config/types";
import { forwardRef } from "react";

const FriendPreview = forwardRef(
  ({ friendId, firstName, lastName, profileImg }: FriendPreviewType, ref) => {
    return (
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="flex items-center gap-2 py-2"
      >
        <Link
          to={`/${friendId}`}
          className="w-10 h-10 rounded-full bg-gray-13 dark:bg-gray-3"
        >
          <img src={profileImg} alt={firstName} />
        </Link>
        <div className="">
          <Link
            to={`/${friendId}`}
            className="text-sm font-semibold hover:underline text-gray-2 dark:text-gray-14"
          >
            {firstName} {lastName}
          </Link>
          <h4 className="text-xs text-gray-6 dark:text-gray-9">
            Some status goes here
          </h4>
        </div>
      </div>
    );
  }
);

export default FriendPreview;
