import { userNavigationLinks } from "@/shared";
import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useParams } from "react-router-dom";

const links = [
  {
    id: 1,
    href: "",
    title: "Home"
  },
  {
    id: 2,
    href: "/videos",
    title: "Videos"
  },
  {
    id: 3,
    href: "/friends",
    title: "Friends"
  },
  {
    id: 4,
    href: "/music",
    title: "Music"
  }
];

const UserDetailNavigation = ({ userId }: { userId: number }) => {
  const [currentLinkIdx, setCurrentLinkIdx] = useState<null | number>(null);
  const { pathname } = useLocation();

  const { id } = useParams();
  const refs = [
    useRef<HTMLAnchorElement>(),
    useRef<HTMLAnchorElement>(),
    useRef<HTMLAnchorElement>(),
    useRef<HTMLAnchorElement>()
  ];

  const { t } = useTranslation();

  useEffect(() => {
    const currLink = links.findIndex((v) => "/" + id + v.href === pathname);

    setCurrentLinkIdx(currLink === -1 ? 0 : currLink);
  }, [pathname]);

  return (
    <div className="relative w-fit">
      {currentLinkIdx !== null && (
        <div
          style={{
            width: refs[currentLinkIdx].current?.clientWidth + "px",
            transform: `translateX(${refs[currentLinkIdx].current?.offsetLeft}px)`
          }}
          className="absolute transition-all -mt-0.5 top-full h-[3px] rounded bg-blue-8"
        ></div>
      )}
      <div className="relative border-b border-opac-w-1 pb-2.5 flex">
        {userNavigationLinks.map((v, i) => (
          <Link
            key={v.id}
            ref={refs[i] as React.RefObject<HTMLAnchorElement>}
            to={v.href === "" ? "/" + userId : "/" + userId + v.href}
            className="font-medium text-sm text-gray-4 px-3 dark:text-gray-12"
            onClick={() => setCurrentLinkIdx(i)}
          >
            {t("userNavigationLinks." + i + "." + v.i18nKey)}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserDetailNavigation;
