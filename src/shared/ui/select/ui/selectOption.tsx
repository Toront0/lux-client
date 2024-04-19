import React, { useEffect } from "react";
import { useSelectContext } from "../config/context";

import { FaCheck } from "react-icons/fa6";

interface ISelectOption extends React.LiHTMLAttributes<HTMLLIElement> {
  idx: number;
  onClick?: () => void;
}

const SelectOption = ({ idx, onClick, ...rest }: ISelectOption) => {
  const { setChosenOption, chosenOption, setChosenValue, hoverIdx } =
    useSelectContext();

  useEffect(() => {
    if (chosenOption === idx) {
      setChosenValue(rest.children as string);
      onClick && onClick();
    }
  }, [chosenOption]);

  const onOptionClick = () => {
    setChosenOption(idx);
    onClick && onClick();
  };

  return (
    <li
      {...rest}
      onClick={onOptionClick}
      className={` text-sm ${
        hoverIdx === idx &&
        hoverIdx !== chosenOption &&
        "bg-opac-b-1 dark:bg-opac-w-1"
      } ${
        idx === chosenOption
          ? "bg-blue-7 text-white"
          : "text-gray-4 dark:text-gray-12 hover:bg-opac-b-1 dark:hover:bg-opac-w-1"
      }  px-2 py-2 rounded flex items-center justify-between`}
    >
      {rest.children}
      {chosenOption === idx && <FaCheck />}
    </li>
  );
};

export default SelectOption;
