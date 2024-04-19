import { Link, useLocation } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

import { useToggleTheme } from "@/stores/darkTheme/darkTheme";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { navigationsLinks } from "@/shared";
import { MdLanguage, MdKeyboardArrowRight } from "react-icons/md";
import { useState } from "react";

import { IoIosArrowBack } from "react-icons/io";
import { CSSTransition } from "react-transition-group";

interface IMobileNavigation {
  onClose: () => void;
}

const MobileNavigation = ({ onClose }: IMobileNavigation) => {
  const darkTheme = useToggleTheme();
  const [currentMode, setCurrentMode] = useState<"general" | "language">(
    "general"
  );

  const { pathname } = useLocation();

  const { i18n, t } = useTranslation();

  return (
    <div className="fixed top-0 z-40 left-0 w-full h-full bg-white dark:bg-gray-1">
      <div className="flex items-center border-b justify-between border-opac-b-2 dark:border-opac-w-1 h-12 px-2 gap-2 ">
        <div className="flex relative  gap-3">
          <div className="w-[18px]"></div>
          <span className="text-sm  font-bold text-black dark:text-white">
            {t("navigation")}
          </span>
        </div>
        <div className="flex text-black gap-3 text-lg dark:text-white items-center ">
          <button onClick={darkTheme.toggleTheme} className="">
            {darkTheme.activeTheme === "light" ? (
              <IoMoonOutline className="" />
            ) : (
              <IoSunnyOutline className="" />
            )}
          </button>
          <button className="">
            <RiLogoutBoxRLine />
          </button>
        </div>
      </div>
      <div className="px-2 relative ">
        <div
          className={`duration-300 ${
            currentMode === "language" ? "scale-90" : "scale-100"
          } transition-transform`}
        >
          {navigationsLinks.map((v, i) => (
            <Link
              to={v.href}
              className={`flex items-center  my-5  gap-2 ${
                pathname === v.href ||
                (v.href !== "/" && pathname.includes(v.href))
                  ? "text-blue-7 dark:text-blue-10"
                  : "text-gray-4 dark:text-gray-12"
              }`}
              onClick={onClose}
            >
              {v.icon}
              <span className="text-sm text-gray-4 dark:text-gray-12">
                {t("navigationLinks." + i + "." + v.i18nKey)}
              </span>
            </Link>
          ))}
          <button
            className={`flex items-center justify-between w-full my-5  text-gray-4 dark:text-gray-12`}
            onClick={() => setCurrentMode("language")}
          >
            <div className="flex items-center gap-2">
              <MdLanguage className="text-xl" />
              <span className="text-sm text-gray-4 dark:text-gray-12">
                {t("language")}
              </span>
            </div>
            <MdKeyboardArrowRight className="text-xl" />
          </button>
        </div>

        <CSSTransition
          timeout={500}
          classNames="left-in"
          unmountOnExit
          in={currentMode === "language"}
        >
          <div className="absolute  top-0 px-2 left-0 h-full bg-white dark:bg-gray-1 w-full">
            <button
              onClick={() => setCurrentMode("general")}
              className="flex items-center  gap-2"
            >
              <div className="w-[22px] flex justify-end ">
                <IoIosArrowBack className=" text-3xl " />
              </div>
              <span className="text-sm text-gray-4 dark:text-gray-12">
                {t("back")}
              </span>
            </button>
            <div className="mt-4">
              <button
                onClick={() => i18n.changeLanguage("en")}
                className="text-sm text-left my-2 rounded w-full text-gray-4 dark:text-gray-12"
              >
                English
              </button>
              <button
                onClick={() => i18n.changeLanguage("ru")}
                className="text-sm text-left my-2 rounded w-full text-gray-4 dark:text-gray-12"
              >
                Русский
              </button>
            </div>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

export default MobileNavigation;
