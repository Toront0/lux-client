import { useRef, useState } from "react";
import { Link } from "react-router-dom";

interface ISidebarLink {
  children: React.ReactNode;
  href: string;
  active: boolean;
  badgeTitle: string;
  onClick: () => void;
}

const SidebarLink = ({
  children,
  href,
  active,
  badgeTitle,
  onClick
}: ISidebarLink) => {
  const [isHover, setIsHover] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const onMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHover(true);
    }, 300);
  };

  const onMouseLeave = () => {
    setIsHover(false);
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
  };

  return (
    <Link
      to={href}
      onClick={onClick}
      className={`flex my-2 relative items-center ${
        active
          ? "text-blue-7 dark:text-blue-10"
          : "text-gray-5 dark:text-gray-8 hover:bg-opac-b-1 dark:hover:bg-opac-w-1"
      }  gap-2 `}
    >
      {isHover && !active && (
        <div className="absolute left-full top-1/2 ml-4 -translate-y-1/2  py-1 rounded bg-white dark:bg-gray-1 border dark:border-gray-4 border-gray-10 z-40">
          <div className="w-full h-full relative">
            <div className="w-3 h-3 bg-white dark:bg-gray-1 border rotate-45 absolute top-1/2 -translate-y-1/2 -left-[6px] dark:border-gray-4 border-gray-10"></div>
            <div className="relative z-20 bg-white dark:bg-gray-1 px-3">
              <div className="text-sm font-medium">{badgeTitle}</div>
            </div>
          </div>
        </div>
      )}

      <div
        className="py-2  px-4 "
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </div>
    </Link>
  );
};

export default SidebarLink;
