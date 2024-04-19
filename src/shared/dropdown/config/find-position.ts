import { DropdownMenuPositionType } from "./types";

export const findDropdownMenuPosition = (
  position: DropdownMenuPositionType
) => {
  switch (position) {
    case "top-right":
      return "bottom-full mb-4 right-0";
    case "top-left":
      return "bottom-full mb-4 -right-2";
    case "bottom-right":
      return "top-full mt-4 right-0";
    case "bottom-left":
      return "top-full mt-4 left-0";
  }
};

export const findTrianglePosition = (position: DropdownMenuPositionType) => {
  switch (position) {
    case "top-right":
      return "-bottom-1 right-1 md:right-2";
    case "bottom-right":
      return "-top-1.5 right-2";
    case "top-left":
      return "-bottom-1 right-1 md:right-2";
  }
};
