import React, { useRef, useState } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { useSwipe } from "../lib/useSwipe";
import { moveLeft, moveRight } from "../lib/sliderMovement";

const Slider = ({ children }: { children: React.ReactNode }) => {
  const [currentPos, setCurrentPos] = useState(0);
  const sliderRef = useRef<HTMLDivElement>();

  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe(
    () => moveLeft(setCurrentPos, sliderRef.current),
    () => moveRight(setCurrentPos, sliderRef.current)
  );

  return (
    <div className="">
      <div className="flex relative overflow-hidden group w-full flex-nowrap rounded   ">
        {React.Children.count(children) > 1 && (
          <button
            onClick={() => moveLeft(setCurrentPos, sliderRef.current)}
            className="absolute w-8 h-8 rounded-full z-20 active:scale-90  bg-opac-b-4 dark:bg-opac-w-4 text-white hidden group-hover:flex items-center justify-center  top-1/2 left-4 -translate-y-1/2"
          >
            <MdKeyboardArrowLeft className="w-6 h-6" />
          </button>
        )}
        <div
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onTouchMove={onTouchMove}
          style={{ transform: `translate(-${currentPos}px)` }}
          ref={sliderRef as React.RefObject<HTMLDivElement>}
          className="flex -translate-x-12 transition-transform w-full"
        >
          {children}
        </div>
        {React.Children.count(children) > 1 && (
          <button
            onClick={() => moveRight(setCurrentPos, sliderRef.current)}
            className="absolute w-8 h-8 rounded-full z-20 active:scale-90  bg-opac-b-4 dark:bg-opac-w-4 text-white hidden group-hover:flex items-center justify-center  top-1/2 right-4 -translate-y-1/2"
          >
            <MdKeyboardArrowRight className="w-6 h-6" />
          </button>
        )}
      </div>
      <div className="flex items-center justify-center gap-1.5 mt-4">
        {Array.from({ length: React.Children.count(children) }).map((_, i) => (
          <div
            key={i}
            className={`w-4 h-1 rounded-full ${
              i * (sliderRef.current?.offsetWidth || 0) === currentPos
                ? "bg-gray-4 dark:bg-gray-12"
                : "bg-opac-b-2 dark:bg-opac-w-2"
            } `}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
