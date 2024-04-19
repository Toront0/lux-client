import { Dispatch, SetStateAction } from "react";

type sliderMovementCb = Dispatch<SetStateAction<number>>;

export const moveLeft = (cb: sliderMovementCb, ref?: HTMLDivElement) => {
  if (!ref) return;

  const stepWidth = ref?.offsetWidth;

  cb((p) => Math.max(0, p - stepWidth));
};

export const moveRight = (cb: sliderMovementCb, ref?: HTMLDivElement) => {
  if (!ref) return;

  const stepWidth = ref.offsetWidth;

  const maxWidth = ref.scrollWidth - ref.offsetWidth;

  cb((p) => Math.min(p + stepWidth, maxWidth));
};
