import { Dispatch, SetStateAction } from "react";

type SliderCallback = Dispatch<SetStateAction<number>>;

export const changeSlide = (
  cb: SliderCallback,
  slidesLength: number,
  direction: "next" | "previous"
) => {
  if (direction === "next") {
    cb((p) => (p + 1 >= slidesLength ? 0 : p + 1));
  } else {
    cb((p) => (p - 1 < 0 ? slidesLength - 1 : p - 1));
  }
};
