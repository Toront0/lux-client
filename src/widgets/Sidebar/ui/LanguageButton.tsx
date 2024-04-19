import { useState } from "react";

import { MdLanguage } from "react-icons/md";
import SidebarButton from "./SidebarButton";

import { useTranslation } from "react-i18next";

import { FaCheck } from "react-icons/fa6";

const LanguageButton = () => {
  const [expandLanguagePicker, setExpandLanguagePicker] = useState(false);

  const { i18n } = useTranslation();

  return (
    <div className="relative">
      {expandLanguagePicker && (
        <div className="absolute bottom-0 z-40 shadow-elev-2 dark:shadow-elev-2-dark text-sm w-64 left-full ml-3 rounded bg-white dark:bg-gray-2 p-3">
          <button
            onClick={() => i18n.changeLanguage("en")}
            className={`block ${
              i18n.language === "en"
                ? "bg-blue-7 text-white"
                : "hover:bg-opac-b-1 dark:text-gray-12 text-gray-4 dark:hover:bg-opac-w-1"
            }   p-2 rounded w-full flex items-center justify-between text-left`}
          >
            English
            {i18n.language === "en" && <FaCheck />}
          </button>
          <button
            onClick={() => i18n.changeLanguage("ru")}
            className={`${
              i18n.language === "ru"
                ? "bg-blue-7 text-white"
                : "hover:bg-opac-b-1 dark:text-gray-12 text-gray-4 dark:hover:bg-opac-w-1"
            }  p-2 rounded w-full flex items-center justify-between text-left`}
          >
            Русский
            {i18n.language === "ru" && <FaCheck />}
          </button>
        </div>
      )}
      <SidebarButton onClick={() => setExpandLanguagePicker((p) => !p)}>
        <MdLanguage className="text-xl" />
      </SidebarButton>
    </div>
  );
};

export default LanguageButton;
