import { cn } from "@/shared";
import { useDropdownContext } from "../config/context";
import {
  findDropdownMenuPosition,
  findTrianglePosition
} from "../config/find-position";
import { DropdownMenuPositionType } from "../config/types";
import { CSSTransition } from "react-transition-group";

interface IDropdownContent {
  position: DropdownMenuPositionType;
  children: React.ReactNode;
  onlyDarkMode?: boolean;
  className?: string;
}

const DropdownContent = ({
  children,
  position,
  className,
  onlyDarkMode = false
}: IDropdownContent) => {
  const ctx = useDropdownContext();

  return (
    <>
      <CSSTransition
        in={ctx.isOpen}
        classNames="my-node"
        timeout={300}
        unmountOnExit
      >
        <div
          className={cn(
            `absolute ${findDropdownMenuPosition(position)} border z-30 ${
              onlyDarkMode
                ? "border-opac-w-2"
                : "border-opac-b-2 dark:border-opac-w-2"
            }   rounded   w-64`,
            className
          )}
        >
          <div
            className={`relative w-full h-full ${
              onlyDarkMode
                ? "shadow-elev-2-dark"
                : "shadow-elev-2 dark:shadow-elev-2-dark"
            }  rounded`}
          >
            <div
              className={`absolute ${findTrianglePosition(position)} w-3 h-3  ${
                onlyDarkMode
                  ? "bg-gray-1 border-opac-w-2"
                  : "bg-white dark:bg-gray-1 border-opac-b-4 dark:border-opac-w-2"
              }  border  rotate-45`}
            ></div>
            <div
              className={`relative p-2 rounded ${
                onlyDarkMode ? "bg-gray-1" : "bg-white dark:bg-gray-1"
              }  z-10`}
            >
              {children}
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default DropdownContent;
