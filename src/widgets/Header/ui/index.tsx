import { Link } from "react-router-dom";

import { MobileNavigation } from "@/entities";
import { useState } from "react";
import {} from "@/shared";
import { useAuthSession } from "@/shared/hooks";

const Header = () => {
  const [expandNavMenu, setExpandNavMenu] = useState(false);
  const authUser = useAuthSession();

  return (
    <header className="w-full h-12 relative border-b border-opac-b-2 bg-white dark:bg-gray-1 dark:border-opac-w-1 flex items-center  justify-between px-2">
      {expandNavMenu && (
        <MobileNavigation onClose={() => setExpandNavMenu(false)} />
      )}
      <div className="flex items-center gap-2">
        <div className="relative block md:hidden  z-40">
          <button
            onClick={() => setExpandNavMenu((p) => !p)}
            className=" inline-block"
          >
            <div
              className={`w-[18px] transition-transform ${
                expandNavMenu ? " rotate-45  translate-y-[3px]" : ""
              } my-px h-0.5 bg-black dark:bg-white rounded`}
            ></div>
            <div className={`w-[18px] my-px h-0.5  rounded`}></div>
            <div
              className={`w-[18px] transition-transform ${
                expandNavMenu ? " -rotate-45  -translate-y-[3px]" : ""
              } my-px h-0.5 bg-black dark:bg-white rounded`}
            ></div>
          </button>
        </div>
        <Link
          to="/"
          className="text-sm md:text-base ml-1 font-extrabold text-black dark:text-white"
        >
          LUX
        </Link>
      </div>
      {/* <MusicCanvas key={theme.activeTheme} /> */}

      <div className="flex items-center gap-2">
        {/* <NotificationsDropdown /> */}

        <Link
          to={`/${authUser?.id}`}
          className="w-8 h-8 rounded-full bg-gray-12 dark:bg-gray-4"
        >
          <img
            src={authUser?.profileImg}
            alt="user profile img"
            className="w-full h-full rounded-full object-cover"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
