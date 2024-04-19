import { BiMessageDetail } from "react-icons/bi";
import {
  IoGridOutline,
  IoMusicalNotesOutline,
  IoSettingsOutline
} from "react-icons/io5";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { TbFriends } from "react-icons/tb";

export const navigationsLinks = [
  {
    id: 1,
    icon: <IoGridOutline className="text-xl" />,
    href: "/",
    i18nKey: "news"
  },
  {
    id: 2,
    icon: <BiMessageDetail className="text-xl" />,
    href: "/messages",
    i18nKey: "messages"
  },
  {
    id: 3,
    icon: <TbFriends className="text-xl" />,
    href: "/friends",
    i18nKey: "friends"
  },
  {
    id: 5,
    icon: <IoMusicalNotesOutline className="text-xl" />,
    href: "/music",
    i18nKey: "music"
  },
  {
    id: 6,
    icon: <MdOutlineOndemandVideo className="text-xl" />,
    href: "/videos",
    i18nKey: "videos"
  },
  {
    id: 8,
    icon: <IoSettingsOutline className="text-xl" />,
    href: "/settings",
    i18nKey: "settings"
  }
];

export const userNavigationLinks = [
  {
    id: 1,
    href: "",
    i18nKey: "home"
  },
  {
    id: 2,
    href: "/videos",
    i18nKey: "videos"
  },
  {
    id: 3,
    href: "/friends",
    i18nKey: "friends"
  },
  {
    id: 4,
    href: "/music",
    i18nKey: "music"
  }
];
