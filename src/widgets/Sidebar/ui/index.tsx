import { useLocation } from "react-router-dom";

import { IoMoonOutline } from "react-icons/io5";

import { useEffect, useState } from "react";
import SidebarLink from "./SidebarLink";
import SidebarButton from "./SidebarButton";

import { useToggleTheme } from "@/stores/darkTheme/darkTheme";
import { shouldRender } from "../lib/functions";
import { navigationsLinks } from "@/shared";
import LogoutButton from "./LogoutButton";

import { useTranslation } from "react-i18next";
import LanguageButton from "./LanguageButton";

const Sidebar = () => {
  const { pathname } = useLocation();
  const [activeIdx, setActiveIdx] = useState(0);
  const toggleTheme = useToggleTheme((s) => s.toggleTheme);

  useEffect(() => {
    const idx = navigationsLinks.findIndex((v) => pathname === v.href);
    setActiveIdx(idx);
  }, [pathname]);

  const { t } = useTranslation();

  return (
    <div className="hidden md:flex relative flex-col justify-between border-r border-opac-b-1 dark:border-opac-w-1 dark:bg-gray-1">
      <div>
        {navigationsLinks.map((v, i) => (
          <SidebarLink
            key={v.id}
            badgeTitle={t("navigationLinks." + i + "." + v.i18nKey)}
            href={v.href}
            active={shouldRender(pathname, v.href)}
            onClick={() => setActiveIdx(i)}
          >
            {v.icon}
          </SidebarLink>
        ))}
      </div>
      <div>
        <LanguageButton />
        <SidebarButton onClick={toggleTheme}>
          <IoMoonOutline className="w-full h-full" />
        </SidebarButton>
        <LogoutButton />
      </div>

      {activeIdx >= 0 && (
        <div
          style={{ transform: `translateY(${activeIdx * 44}px)` }}
          className={`absolute left-0 top-[8px]  ease-[cubic-bezier(0.22,1,0.36,1)] transition-transform h-9 w-1 bg-blue-7 dark:bg-blue-9 rounded`}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
