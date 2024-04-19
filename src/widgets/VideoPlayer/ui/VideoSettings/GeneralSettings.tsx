import { Dispatch, SetStateAction } from "react";

import { IoSpeedometerOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { MenuTypes } from "./VideoSettings";

interface IGeneralSettings {
  setCurrentMode: Dispatch<SetStateAction<MenuTypes>>;
  onClose: () => void;
}

const GeneralSettings = ({ setCurrentMode, onClose }: IGeneralSettings) => {
  return (
    <>
      <button
        data-ignore-outside-click
        onClick={onClose}
        className="flex items-center gap-2 text-sm p-1  rounded hover:bg-opac-w-1 w-full text-gray-12 "
      >
        <IoMdClose className="text-2xl pointer-events-none" />
        <span className=" pointer-events-none">Settings</span>
      </button>
      <div className="mt-2 pt-2 border-t border-opac-w-2">
        <button
          data-ignore-outside-click
          onClick={() => setCurrentMode("speed")}
          className="flex items-center w-full justify-between hover:bg-opac-w-1 p-2 rounded"
        >
          <div className="flex items-center gap-2 text-sm pointer-events-none">
            <IoSpeedometerOutline className="text-xl" />
            Скорость
          </div>
          <MdOutlineKeyboardArrowRight className="text-xl pointer-events-none" />
        </button>
      </div>
    </>
  );
};

export default GeneralSettings;
