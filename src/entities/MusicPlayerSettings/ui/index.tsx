import {
  Dropdown,
  DropdownButtonItem,
  DropdownContent,
  DropdownTrigger
} from "@/shared/dropdown";

import { TbRepeatOff } from "react-icons/tb";

import { LiaRandomSolid } from "react-icons/lia";
import { HiDotsVertical } from "react-icons/hi";

const MusicPlayerSettings = () => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <button>
          <HiDotsVertical />
        </button>
      </DropdownTrigger>
      <DropdownContent position="top-right">
        <DropdownButtonItem>
          <LiaRandomSolid />
          <span className="text-sm">Случайный порядок: Откл</span>
        </DropdownButtonItem>
        <DropdownButtonItem>
          <TbRepeatOff />

          <span className="text-sm">Повтор: Откл</span>
        </DropdownButtonItem>
      </DropdownContent>
    </Dropdown>
  );
};

export default MusicPlayerSettings;
