import { createContext, useState, useContext, useRef } from "react";
import { moveLeft, moveRight } from "./sliderMovement";

type SliderContextType = {
  activeSlide: number;
  setNext: () => void;
  setPrevious: () => void;
};

export const SliderContext = createContext({} as SliderContextType);

export default function SliderProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [activeSlide, setActiveSlide] = useState(0);
  const ref = useRef<HTMLDivElement>();

  return (
    <SliderContext.Provider
      value={{
        activeSlide,
        setNext: () => moveRight(setActiveSlide, ref.current),
        setPrevious: () => moveLeft(setActiveSlide, ref.current)
      }}
    >
      <div ref={ref as React.RefObject<HTMLDivElement>}>{children}</div>
    </SliderContext.Provider>
  );
}

export const useSliderContext = () => {
  const ctx = useContext(SliderContext);

  if (!ctx) {
    throw new Error("useSliderContext must be used in the SliderProvider");
  }

  return ctx;
};
