import React, { useRef, useState, useEffect } from "react";
import { moveLeft, moveRight } from "./lib/sliderMovement";
import { useSwipe } from "./lib/useSwipe";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface ISlider {
  children: React.ReactNode;
}

const Slider = ({ children }: ISlider) => {
  const [currentPos, setCurrentPos] = useState(0);
  const sliderRef = useRef<HTMLDivElement>();

  const [shouldRenderArrows, setShouldRenderArrows] = useState(false);

  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe(
    () => moveLeft(setCurrentPos, sliderRef.current),
    () => moveRight(setCurrentPos, sliderRef.current)
  );

  useEffect(() => {
    if (sliderRef.current) {
      if (sliderRef.current.scrollWidth > sliderRef.current.offsetWidth) {
        setShouldRenderArrows(true);
      }
    }
  }, [sliderRef.current]);

  return (
    <div className="flex relative overflow-hidden group w-full flex-nowrap">
      {shouldRenderArrows && (
        <button
          onClick={() => moveLeft(setCurrentPos, sliderRef.current)}
          className="absolute w-8 h-8 rounded-full z-20 active:scale-90 bg-opac-b-6 text-white lg:group-hover:flex items-center justify-center hidden top-1/2 left-4 -translate-y-1/2"
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
        className="flex -translate-x-12 flex-nowrap transition-transform duration-300 w-full"
      >
        {children}
      </div>
      {shouldRenderArrows && (
        <button
          onClick={() => moveRight(setCurrentPos, sliderRef.current)}
          className="absolute w-8 h-8 rounded-full z-20 active:scale-90  bg-opac-b-6 text-white items-center justify-center lg:group-hover:flex hidden  top-1/2 right-4 -translate-y-1/2"
        >
          <MdKeyboardArrowRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default Slider;
