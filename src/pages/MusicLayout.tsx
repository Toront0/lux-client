import React from "react";

import { Link, useLocation } from "react-router-dom";
import { MusicPlayer } from "@/widgets";

import { useTranslation } from "react-i18next";

const MusicLayout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();

  const countSlashesInURL = (url: string) => {
    let count = 0;

    for (let i = 0; i < url.length; i++) {
      if (count === 2) {
        return count;
      }

      if (url[i] === "/") {
        count++;
      }
    }

    return count;
  };

  const { t } = useTranslation();

  return (
    <div className="w-full h-full bg-body-light dark:bg-black">
      <div className="h-24 max-w-[1440px] mx-auto">
        <h2 className="text-2xl md:text-3xl  px-2 pt-4 font-bold text-black dark:text-white">
          {t("navigationLinks.3.music")}
        </h2>

        <div className="rounded flex px-2 py-2 gap-6">
          <Link
            to="/music"
            className={`text-xs md:text-sm font-medium relative rounded ${
              countSlashesInURL(pathname) === 1
                ? "text-gray-1 dark:text-gray-14"
                : "text-gray-7 dark:text-gray-8"
            }`}
          >
            {t("home")}
            {countSlashesInURL(pathname) === 1 && (
              <div className="absolute bottom-0 w-full h-0.5 left-1/2 -translate-x-1/2 dark:bg-white bg-black"></div>
            )}
          </Link>
          <Link
            to={`/5/music`}
            className={`text-xs md:text-sm font-medium relative rounded ${
              countSlashesInURL(pathname) === 2
                ? "text-gray-1 dark:text-gray-14"
                : "text-gray-7 dark:text-gray-8"
            }`}
          >
            {t("myMusic")}
            {countSlashesInURL(pathname) === 2 && (
              <div className="absolute bottom-0 w-full h-0.5 left-1/2 -translate-x-1/2 dark:bg-white bg-black"></div>
            )}
          </Link>
        </div>
      </div>
      <div className="w-full flex flex-col   h-[calc(100%-96px)]">
        {children}
        <MusicPlayer />
      </div>
    </div>
  );
};

export default MusicLayout;
