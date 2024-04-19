import React, { useEffect, useRef } from "react";

import { useSelectContext } from "../config/context";
import { clamp } from "@/shared";

const SelectContent = ({ children }: { children: React.ReactNode }) => {
  const {
    isOpen,
    chosenOption,
    setChosenOption,
    setIsOpen,

    hoverIdx,
    setHoverIdx
  } = useSelectContext();
  const selectRef = useRef<HTMLUListElement>();

  useEffect(() => {
    console.log("777");

    const handler = (e: KeyboardEvent) => {
      // if (e.target !== selectRef.current) {
      //   return;
      // }

      switch (e.key) {
        case "Tab":
          setIsOpen((prev) => !prev);
          break;
        case "Enter":
          console.log("e.key", e.key);

          setChosenOption(hoverIdx);

          break;
        case "ArrowUp":
        case "ArrowDown": {
          const newV = e.key === "ArrowUp" ? -1 : 1;

          setHoverIdx((p) =>
            clamp(0, React.Children.count(children) - 1, p + newV)
          );
        }
      }
    };

    document.addEventListener("keydown", handler);

    return () => document.removeEventListener("keydown", handler);
  }, [selectRef, chosenOption, hoverIdx]);

  console.log("currHoverIdx", hoverIdx);
  console.log("currChosenOption", chosenOption);

  return (
    <>
      {isOpen && (
        <ul
          ref={selectRef as React.Ref<HTMLUListElement>}
          className={`absolute top-full right-0 z-30 w-full p-2 bg-white dark:bg-gray-2`}
        >
          {children}
        </ul>
      )}
    </>
  );
};

export default SelectContent;
